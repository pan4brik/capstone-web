# capstone-web

A Next.js (App Router) frontend for
[capstone-api](https://github.com/pan4brik/capstone-api). The home page fetches
the notes list from the backend on the server and renders it. One page,
TypeScript, Tailwind.

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
