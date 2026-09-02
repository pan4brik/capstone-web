import { revalidatePath } from "next/cache";

// The BFF layer. Everything here runs on the Vercel server and talks to the
// FastAPI service server-to-server, so the browser never sees the API origin
// (no CORS) and BFF_SHARED_SECRET stays server-side.

export type Note = { id: string; title: string; body: string };

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8000";
const BFF_SHARED_SECRET = process.env.BFF_SHARED_SECRET;

function writeHeaders(): HeadersInit {
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

export async function createNote(input: {
  title: string;
  body?: string;
}): Promise<{ note: Note } | { error: string }> {
  "use server";
  try {
    const res = await fetch(`${API_BASE_URL}/notes`, {
      method: "POST",
      headers: writeHeaders(),
      body: JSON.stringify({ title: input.title, body: input.body ?? "" }),
    });
    if (!res.ok) return { error: `could not save the note (${res.status})` };
    const note: Note = await res.json();
    revalidatePath("/");
    return { note };
  } catch {
    return { error: "could not reach the service" };
  }
}

export async function askNotes(
  question: string,
): Promise<{ answer: string } | { error: string }> {
  "use server";
  try {
    const res = await fetch(`${API_BASE_URL}/ask`, {
      method: "POST",
      headers: writeHeaders(),
      body: JSON.stringify({ question }),
    });
    if (!res.ok) return { error: `the service returned ${res.status}` };
    return res.json();
  } catch {
    return { error: "could not reach the service" };
  }
}
