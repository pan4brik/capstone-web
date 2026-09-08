# capstone-web

A Next.js (App Router) frontend for
[capstone-api](https://github.com/pan4brik/capstone-api). The home page fetches
the notes list from the backend on the server and renders it. One page,
TypeScript, Tailwind.

**Live:** https://capstone.pobemas.com/

## Features

- Server-rendered notes list, fetched from the backend on each request.
- Add a note (client form, calls a Server Action).
- Ask a question grounded only in the stored notes, answered via the Gemini
  API (`/ask`, backend-side).
- Résumé link, source links to both repos.

## Architecture

```
Browser ──HTTP──▶ Next.js on Vercel
                   ├─ RSC: server-side fetch  ─────▶ FastAPI /notes        (GET, list)
                   └─ Server Actions ────────────────▶ FastAPI /notes       (POST, create)
                                                     └▶ FastAPI /ask        (POST, LLM)
                                                          └─ httpx ────────▶ Gemini REST
FastAPI on Render ── repository interface ──▶ in-memory (v1)
```

Browser talks only to Vercel — no CORS. `GEMINI_API_KEY` lives only on Render;
`BFF_SHARED_SECRET` (optional) is set on both Vercel and Render.

## Requirements

- Node.js 20 or newer — check with `node --version`. If your system version is
  older, install a current one with nvm, fnm, or Volta (all cross-platform).
- pnpm. The repo pins an exact pnpm version in `package.json` (the
  `packageManager` field), so the most reliable way is Corepack, which ships
  with Node:

      corepack enable pnpm      # may need sudo on Linux

  If that fails, install it directly: `npm install -g pnpm`.

## Run it

Start the backend first — it must be reachable at `http://localhost:8000`
(see capstone-api). If it isn't, the home page still renders, with a
"waking the server" fallback in place of the notes list.

    git clone https://github.com/pan4brik/capstone-web.git
    cd capstone-web
    pnpm install
    pnpm dev

Open http://localhost:3000.

For a production build: `pnpm build`, then `pnpm start`.

## Configuration

- `API_BASE_URL` — origin of the capstone-api backend. Defaults to
  `http://localhost:8000`.
- `BFF_SHARED_SECRET` — sent as `X-BFF-Secret` on backend requests, if set.
- `NEXT_PUBLIC_SITE_URL` — used as `metadataBase` for OG tags. Defaults to
  `http://localhost:3000`.
- `RESUME_URL` — direct URL (must answer `200` with the file, not a redirect)
  that `/resume` is rewritten to. Read at build time by `next.config.ts`, so
  it must be set in Vercel *before* deploying — with it unset, `/resume` falls
  back to `public/resume.pdf`, which is git-ignored and therefore absent in a
  clean checkout, so production would 404. Locally, either set it or keep a
  copy at `public/resume.pdf`. The PDF is kept out of the repo (personal data)
  and lives in Vercel Blob instead.

## Operating this

Notes for running the live deployment unattended over long stretches (e.g.
between interviews):

- **Env vars:** Render — `GEMINI_API_KEY`, `BFF_SHARED_SECRET`. Vercel —
  `API_BASE_URL`, `BFF_SHARED_SECRET`, `RESUME_URL`.
- **Update the résumé:** upload the new PDF in the Vercel dashboard
  (Storage → Blob), then point `RESUME_URL` at its URL and redeploy. The
  file is deliberately not in the repo — `next.config.ts` rewrites `/resume`
  to `RESUME_URL`.
- **Spend cap:** the app-side `slowapi` limit on `/ask` (shared with
  `POST /notes`) is the hard bound. Also: Google Cloud console → IAM & Admin →
  Quotas → the Gemini API request override; Billing → Budgets & alerts
  (notify-only). Check monthly. Model is pinned to `gemini-flash-lite-latest`
  (see [capstone-api's README](https://github.com/pan4brik/capstone-api) for
  the manual fallback if that model is ever deprecated).
- **Warm before a demo/interview:** hit
  `https://capstone-api-f54u.onrender.com/health` once, ~1 minute ahead — Render's
  free tier cold-starts after inactivity.
- **Reseed:** restart the Render service — notes are in-memory and reset on
  restart.
- **Rotate the BFF secret:** change `BFF_SHARED_SECRET` in Render **and**
  Vercel together, then redeploy both.
