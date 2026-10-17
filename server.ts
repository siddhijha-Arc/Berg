import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { z } from 'zod';
import { runCode } from './server/executor.ts';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '64kb' }));

// Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// In-memory sliding window rate limiter
interface RateLimitBucket {
  timestamps: number[];
}
const ipBuckets = new Map<string, RateLimitBucket>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  let bucket = ipBuckets.get(ip);
  if (!bucket) {
    bucket = { timestamps: [] };
    ipBuckets.set(ip, bucket);
  }

  // Filter timestamps older than 1 hour
  bucket.timestamps = bucket.timestamps.filter(t => now - t < 3600 * 1000);

  // Check burst: max 5 requests in last 10 seconds
  const burstCount = bucket.timestamps.filter(t => now - t < 10 * 1000).length;
  if (burstCount >= 5) {
    const oldestBurst = bucket.timestamps.find(t => now - t < 10 * 1000) || now;
    const retryAfter = Math.ceil((10000 - (now - oldestBurst)) / 1000);
    return { allowed: false, retryAfter: Math.max(retryAfter, 1) };
  }

  // Check sustained: max 30 requests in last 1 hour
  if (bucket.timestamps.length >= 30) {
    const oldestHour = bucket.timestamps[0];
    const retryAfter = Math.ceil((3600000 - (now - oldestHour)) / 1000);
    return { allowed: false, retryAfter: Math.max(retryAfter, 1) };
  }

  bucket.timestamps.push(now);
  return { allowed: true, retryAfter: 0 };
}

// Zod Schema for Run Request
const RunRequestSchema = z.object({
  language: z.enum(['c', 'cpp'] as const),
  code: z.string().min(1, 'Code cannot be empty').max(20480, 'Code exceeds maximum size of 20 KB'),
  stdin: z.string().max(10240, 'Stdin exceeds maximum size of 10 KB').optional().default(''),
  turnstileToken: z.string().optional(),
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    service: 'Berg Stateless Cloud Compiler',
  });
});

// Execute Code Endpoint
app.post('/api/run', async (req: Request, res: Response): Promise<void> => {
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.socket.remoteAddress || '127.0.0.1';

  // 1. Rate Limiting Check
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', rateLimit.retryAfter.toString());
    res.status(429).json({
      error: 'Rate limit exceeded. Please wait before running again.',
      retryAfter: rateLimit.retryAfter,
    });
    return;
  }

  // 2. Input Validation via Zod
  const parseResult = RunRequestSchema.safeParse(req.body);
  if (!parseResult.success) {
    const errorMsg = parseResult.error.issues.map((e: z.ZodIssue) => e.message).join(', ');
    res.status(400).json({ error: errorMsg });
    return;
  }

  const { language, code, stdin, turnstileToken } = parseResult.data;

  // 3. Optional Cloudflare Turnstile Verification if configured
  if (process.env.TURNSTILE_SECRET_KEY && turnstileToken) {
    try {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: clientIp,
        }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        res.status(403).json({ error: 'Turnstile verification failed' });
        return;
      }
    } catch {
      // Proceed gracefully if verification service fails
    }
  }

  // 4. Execute Code via Stateless Executor
  try {
    const result = await runCode({
      language,
      code,
      stdin,
    });

    res.setHeader('Cache-Control', 'no-store');
    res.json(result);
  } catch (err: any) {
    res.status(500).json({
      error: 'An internal error occurred while executing the code. Please try again.',
    });
  }
});

// Mount Vite middleware in development
async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Berg Cloud Compiler server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
