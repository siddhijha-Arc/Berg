# Berg — Stateless Cloud C/C++ Compiler

A production-ready, fully cloud-based, **stateless** online C/C++ compiler and VS Code-inspired code editor adhering strictly to the **Slush Design Constitution** (`design.md`).

## 🚀 Key Features

1. **Slush Design System**:
   - Palette: Sky Wash (`#dceeff`), Paper White (`#ffffff`), Carbon (`#000000`), Electric Blue (`#4da2ff`), Mint Pop (`#55db9c`), Sunburst (`#ffd731`), Voltage Violet (`#5c4ade`).
   - Hand-cut 1.5px/2px solid black sticker borders with flat `0 4px 0 #000000` sticker drop shadows.
   - 1600px pill buttons and 20–40px rounded cards. Zero gradients.
   - Typography: **Antonio** for bold display headlines, **Plus Jakarta Sans / Inter** for UI, and **JetBrains Mono** for the code editor and console.

2. **VS Code-Like Stateless Editor**:
   - In-memory multi-tab file management (`main.cpp`, `utils.h`, `solution.c`, etc.) with add tab, rename, and close tab.
   - Language selector with instant C17 and C++20 starter templates.
   - Real-time keyboard shortcuts: `Ctrl+Enter` to Run, `Ctrl+S` to Download file, `Ctrl+/` to toggle comments, `Ctrl+\`` to toggle terminal.
   - Open files directly from your computer and download files to disk (browser-side only).
   - Settings drawer: font size (11–18px), tab size (2, 4), word wrap, minimap toggle.
   - Error line jumping: clicking compile/runtime error messages navigates directly to the line in the editor!

3. **Stateless Cloud Execution & Security**:
   - Single endpoint `POST /api/run` with strict Zod validation (20 KB code limit, 10 KB stdin limit).
   - Rate limiting: sliding window limit (5 runs per 10s, 30 per hour) with `Retry-After` header and live UI countdown.
   - Request coalescing: duplicate requests in-flight run once and share the result.
   - Result caching with SHA-256 fingerprinting (10-minute TTL).
   - Zero storage of submitted code or personal data on the server.
   - Sandbox limits: 2s CPU time, 128 MB RAM, capped output.

---

## 🛠 Local Setup (For Beginners)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*Note: The app runs out-of-the-box with free public sandboxes even without extra keys.*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deployment to Vercel

1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com).
3. Click **Add New Project** and select this repository.
4. (Optional) In the Environment Variables section, add:
   - `RAPIDAPI_KEY` (from RapidAPI Judge0)
   - `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN` (from Upstash Console)
   - `TURNSTILE_SECRET_KEY` (from Cloudflare Turnstile)
5. Click **Deploy**.
