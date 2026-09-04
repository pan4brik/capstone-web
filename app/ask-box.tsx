"use client";

import { useState, useTransition } from "react";
import { askNotes } from "@/app/lib/actions";

const TIMEOUT_MS = 20_000;

type AskState =
  | { status: "idle" }
  | { status: "answer"; text: string }
  | { status: "error"; reason: string };

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | { error: string }> {
  return Promise.race([
    promise,
    new Promise<{ error: string }>((resolve) =>
      setTimeout(() => resolve({ error: "the request timed out" }), ms),
    ),
  ]);
}

export function AskBox() {
  const [question, setQuestion] = useState("");
  const [state, setState] = useState<AskState>({ status: "idle" });
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    startTransition(async () => {
      const result = await withTimeout(askNotes(question.trim()), TIMEOUT_MS);
      if ("error" in result) {
        setState({ status: "error", reason: result.error });
        return;
      }
      setState({ status: "answer", text: result.answer });
    });
  }

  return (
    <div className="w-full flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Ask about my notes…"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={isPending}
          className="w-full rounded-[var(--radius-card)] border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]"
        />
        <button
          type="submit"
          disabled={isPending}
          className="self-start rounded-[var(--radius-card)] bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {isPending ? "Asking…" : "Ask"}
        </button>
      </form>
      {state.status === "answer" && (
        <p className="whitespace-pre-wrap text-sm">{state.text}</p>
      )}
      {state.status === "error" && (
        <p className="text-sm text-red-500">{state.reason}</p>
      )}
    </div>
  );
}
