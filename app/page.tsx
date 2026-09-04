import Link from "next/link";
import { getNotes, type Note } from "@/app/lib/api";
import { siteConfig } from "@/app/config";
import { NoteForm } from "@/app/note-form";
import { AskBox } from "@/app/ask-box";

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
          <h1 className="text-2xl font-semibold">{siteConfig.name}</h1>
          <p className="text-sm text-[var(--color-accent)]">{siteConfig.role}</p>
          <div className="mt-2 flex gap-4 text-sm underline underline-offset-4">
            <a href={siteConfig.apiRepoUrl}>capstone-api</a>
            <a href={siteConfig.webRepoUrl}>capstone-web</a>
            <a href={siteConfig.resumeUrl}>résumé</a>
          </div>
        </header>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-medium">Notes</h2>
          {notes === null ? (
            <p className="rounded-[var(--radius-card)] border border-[var(--color-border)] p-4 text-sm">
              Waking the server — this can take up to a minute on the free tier.{" "}
              <Link href="/" className="underline underline-offset-4">
                Retry
              </Link>
            </p>
          ) : notes.length === 0 ? (
            <p className="text-sm text-zinc-500">No notes yet — add one below.</p>
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
                      <p className="mt-1 text-sm text-zinc-500">{note.body}</p>
                    )}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-zinc-500">
                This is a demo — note data resets periodically.
              </p>
            </>
          )}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-medium">Add a note</h2>
          <NoteForm />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-medium">Ask about my notes</h2>
          <AskBox />
        </section>
      </main>
    </div>
  );
}
