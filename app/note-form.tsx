"use client";

import { useState, useTransition } from "react";
import { createNote } from "@/app/lib/actions";

export function NoteForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("title is required");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await createNote({ title: title.trim(), body: body.trim() });
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setTitle("");
      setBody("");
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] p-4"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isPending}
        className="w-full rounded-[var(--radius-card)] border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]"
      />
      <textarea
        placeholder="Body (optional)"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        disabled={isPending}
        rows={3}
        className="w-full rounded-[var(--radius-card)] border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded-[var(--radius-card)] bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {isPending ? "Adding…" : "Add note"}
      </button>
    </form>
  );
}
