// The BFF layer. Everything here runs on the Vercel server and talks to the
// FastAPI service server-to-server, so the browser never sees the API origin
// (no CORS) and BFF_SHARED_SECRET stays server-side.

export type Note = { id: string; title: string; body: string };

export const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8000";
export const BFF_SHARED_SECRET = process.env.BFF_SHARED_SECRET;

export function writeHeaders(): HeadersInit {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (BFF_SHARED_SECRET) headers["X-BFF-Secret"] = BFF_SHARED_SECRET;
  return headers;
}

// RSC helper — called from the server component that renders the list.
export async function getNotes(): Promise<Note[]> {
  const res = await fetch(`${API_BASE_URL}/notes`, { cache: "no-store" });
  if (!res.ok) throw new Error(`GET /notes failed: ${res.status}`);
  return res.json();
}
