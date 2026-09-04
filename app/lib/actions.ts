"use server";

import { revalidatePath } from "next/cache";
import { API_BASE_URL, writeHeaders, type Note } from "@/app/lib/api";

export async function createNote(input: {
  title: string;
  body?: string;
}): Promise<{ note: Note } | { error: string }> {
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
