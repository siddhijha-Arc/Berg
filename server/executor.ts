import crypto from 'crypto';

export interface RunCodeOptions {
  code: string;
  language: 'c' | 'cpp';
  stdin?: string;
}

export interface RunCodeResult {
  stdout: string;
  stderr: string;
  compileOutput: string;
  exitCode: number;
  timeMs: number;
  memoryKb: number;
  status: 'Accepted' | 'Compilation Error' | 'Runtime Error' | 'Time Limit Exceeded' | 'Memory Limit Exceeded' | 'Error';
  cacheHit?: boolean;
}

// In-memory cache for executions (10-minute TTL)
interface CacheEntry {
  result: RunCodeResult;
  timestamp: number;
}
const resultCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

// In-flight request coalescing
const inFlightRequests = new Map<string, Promise<RunCodeResult>>();

export function generateCacheKey(language: string, code: string, stdin: string = ''): string {
  const hash = crypto.createHash('sha256');
  hash.update(`${language}:${code}:${stdin}:v1`);
  return hash.digest('hex');
}

/**
 * Execute code via Judge0 CE API
 */
async function callSandboxProvider(language: 'c' | 'cpp', code: string, stdin: string): Promise<RunCodeResult> {
  const rapidApiKey = process.env.RAPIDAPI_KEY;
  const baseUrl = rapidApiKey 
    ? 'https://judge0-ce.p.rapidapi.com/submissions'
    : (process.env.JUDGE0_URL ? `${process.env.JUDGE0_URL}/submissions` : 'https://ce.judge0.com/submissions');

  const judge0Endpoint = `${baseUrl}?base64_encoded=true&wait=true`;

  try {
    const languageId = language === 'c' ? 50 : 54; // C (GCC 9.2.0) or C++ (GCC 9.2.0)
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (rapidApiKey) {
      headers['X-RapidAPI-Key'] = rapidApiKey;
      headers['X-RapidAPI-Host'] = 'judge0-ce.p.rapidapi.com';
    }

    const encodedCode = Buffer.from(code, 'utf-8').toString('base64');
    const encodedStdin = Buffer.from(stdin || '', 'utf-8').toString('base64');

    const postRes = await fetch(judge0Endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        source_code: encodedCode,
        language_id: languageId,
        stdin: encodedStdin,
        cpu_time_limit: 2,
        wall_time_limit: 5,
        memory_limit: 128000,
      }),
    });

    if (postRes.ok) {
      const data = await postRes.json();
      
      const decodeB64 = (b64Str: string) => {
        if (!b64Str) return '';
        try {
          return Buffer.from(b64Str, 'base64').toString('utf-8');
        } catch {
          return b64Str;
        }
      };

      let compileOut = decodeB64(data.compile_output);
      const stdout = decodeB64(data.stdout);
      const stderr = decodeB64(data.stderr);
      const exitCode = data.exit_code ?? 0;
      const timeMs = Math.round((parseFloat(data.time) || 0) * 1000);
      const memoryKb = data.memory || 0;
      const statusId = data.status?.id;

      let status: RunCodeResult['status'] = 'Accepted';
      if (statusId === 6 || compileOut || (stderr && (stderr.includes('error:') || stderr.includes('fatal error:')))) {
        status = 'Compilation Error';
        if (!compileOut && stderr) {
          compileOut = stderr;
        }
      } else if (statusId === 5) {
        status = 'Time Limit Exceeded';
      } else if ((statusId >= 7 && statusId <= 12) || (exitCode !== 0 && !compileOut && statusId !== 6)) {
        status = 'Runtime Error';
      }

      return {
        stdout,
        stderr,
        compileOutput: compileOut,
        exitCode,
        timeMs,
        memoryKb,
        status,
      };
    } else {
      const errText = await postRes.text().catch(() => '');
      return {
        stdout: '',
        stderr: `Execution service error (${postRes.status}). ${errText ? errText.slice(0, 150) : ''}`,
        compileOutput: '',
        exitCode: 1,
        timeMs: 0,
        memoryKb: 0,
        status: 'Error',
      };
    }
  } catch (err: any) {
    return {
      stdout: '',
      stderr: 'Execution sandbox temporarily unreachable. Please retry in a moment.',
      compileOutput: '',
      exitCode: 1,
      timeMs: 0,
      memoryKb: 0,
      status: 'Error',
    };
  }
}

/**
 * Main execution method with Request Coalescing and Cache
 */
export async function runCode(options: RunCodeOptions): Promise<RunCodeResult> {
  const { code, language, stdin = '' } = options;
  const cacheKey = generateCacheKey(language, code, stdin);

  // 1. Check in-memory result cache
  const cached = resultCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return {
      ...cached.result,
      cacheHit: true,
    };
  }

  // 2. Request coalescing (if duplicate request already inflight, share promise)
  if (inFlightRequests.has(cacheKey)) {
    const inflight = inFlightRequests.get(cacheKey)!;
    const res = await inflight;
    return { ...res, cacheHit: true };
  }

  // 3. Launch execution
  const executionPromise = (async () => {
    try {
      const res = await callSandboxProvider(language, code, stdin);
      // Cache only deterministic successful / compile errors (never timeouts or outages)
      if (res.status === 'Accepted' || res.status === 'Compilation Error' || res.status === 'Runtime Error') {
        resultCache.set(cacheKey, { result: res, timestamp: Date.now() });
      }
      return res;
    } finally {
      inFlightRequests.delete(cacheKey);
    }
  })();

  inFlightRequests.set(cacheKey, executionPromise);
  return executionPromise;
}
