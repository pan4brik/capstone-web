import Link from "next/link";
import { getNotes, type Note } from "@/app/lib/api";
import { siteConfig } from "@/app/config";
import { NoteForm } from "@/app/note-form";
import { AskBox } from "@/app/ask-box";
import { ThemeToggle } from "@/app/theme-toggle";

export const maxDuration = 60;

export default async function Home() {
  let notes: Note[] | null = null;
  try {
    notes = await getNotes();
  } catch {
    notes = null;
  }

  return (
    <div className="flex flex-1 justify-center bg-[var(--color-background)] font-sans">
      <main
        className="flex w-full flex-col gap-8 px-6 py-16"
        style={{ maxWidth: "var(--container-max)" }}
      >
        <header className="flex flex-col gap-1">
          <p className="font-mono text-xs tracking-wide text-[var(--color-accent-text)] uppercase">
            Capstone project
          </p>
          <h1 className="text-2xl font-semibold">{siteConfig.name}</h1>
          <p className="text-sm text-[var(--color-accent-text)]">{siteConfig.role}</p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">{siteConfig.tagline}</p>
          <div className="mt-2 flex items-center justify-between gap-4 text-sm">
            <div className="flex gap-4 underline underline-offset-4">
              <a href={siteConfig.apiRepoUrl}>capstone-api</a>
              <a href={siteConfig.webRepoUrl}>capstone-web</a>
              <a href={siteConfig.resumeUrl}>résumé</a>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="flex flex-col divide-y divide-[var(--color-border)] rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)]">
          <section className="flex flex-col gap-3 p-5">
            <h2 className="text-lg font-medium">Notes</h2>
            {notes === null ? (
              <p className="rounded-[var(--radius-card)] border border-[var(--color-border)] p-4 text-sm">
                Waking the server — this can take up to a minute on the free tier.{" "}
                <Link href="/" className="underline underline-offset-4">
                  Retry
                </Link>
              </p>
            ) : notes.length === 0 ? (
              <p className="text-sm text-[var(--color-muted)]">No notes yet — add one below.</p>
            ) : (
              <>
                <ul className="flex flex-col gap-2">
                  {notes.map((note) => (
                    <li
                      key={note.id}
                      className="rounded-[var(--radius-card)] border border-[var(--color-border)] p-3"
                    >
                      <p className="font-medium">{note.title}</p>
                      {note.body && (
                        <p className="mt-1 text-sm text-[var(--color-muted)]">{note.body}</p>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-[var(--color-muted)]">
                  This is a demo — note data resets periodically.
                </p>
              </>
            )}
          </section>

          <section className="flex flex-col gap-3 p-5">
            <h2 className="text-lg font-medium">Add a note</h2>
            <NoteForm />
          </section>

          <section className="flex flex-col gap-3 p-5">
            <h2 className="text-lg font-medium">Ask about my notes</h2>
            <AskBox />
          </section>
        </div>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">How it&apos;s built</h2>
          <ul className="flex flex-col gap-4">
            <li className="flex gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-card)] border border-[var(--color-border)] text-[var(--color-accent)]">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6 3 12l6 6M15 6l6 6-6 6" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Frontend</p>
                <p className="text-sm text-[var(--color-muted)]">
                  Next.js 16 App Router, React 19, TypeScript. Server-rendered notes list, deployed on Vercel.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-card)] border border-[var(--color-border)] text-[var(--color-accent-2)]">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="6" rx="1.5" />
                  <rect x="4" y="14" width="16" height="6" rx="1.5" />
                  <path d="M8 7h.01M8 17h.01" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Backend</p>
                <p className="text-sm text-[var(--color-muted)]">
                  FastAPI on Render, rate-limited writes, no CORS — the Next.js layer is the only caller.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-card)] border border-[var(--color-border)] text-[var(--color-accent)]">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4c-1.2 0-2.4-.3-3.4-.8L4 20l1-4.8a8.3 8.3 0 0 1-.9-3.7A8.4 8.4 0 0 1 12.6 3 8.4 8.4 0 0 1 21 11.5Z" />
                  <path d="M9 11h.01M12 11h.01M15 11h.01" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Q&amp;A</p>
                <p className="text-sm text-[var(--color-muted)]">
                  POST /ask calls the Gemini API, grounded only in the notes you&apos;ve saved — nothing else.
                </p>
              </div>
            </li>
          </ul>
          <p className="text-xs text-[var(--color-muted)]">21 tests · CI runs on every push via GitHub Actions.</p>
        </section>
      </main>
    </div>
  );
}
