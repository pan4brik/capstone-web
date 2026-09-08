import Link from "next/link";
import { getNotes, type Note } from "@/app/lib/api";
import { siteConfig } from "@/app/config";
import { NoteForm } from "@/app/note-form";
import { AskBox } from "@/app/ask-box";

export const maxDuration = 60;

export default async function Home() {
  let notes: Note[] | null = null;
  try {
    notes = await getNotes();
  } catch {
    notes = null;
  }

  return (
    <main id="content" className="flex-1">
      <section className="section hero" data-od-id="hero">
        <div className="container hero-center">
          <p className="eyebrow">Capstone project</p>
          <h1 className="h1">A notes app that can answer questions about your notes.</h1>
          <p className="lead">
            Built by {siteConfig.name} — Next.js on the front end, FastAPI and Gemini on the
            back end. Try it below, or read the source.
          </p>
          <div className="hero-cta">
            <a href="#demo" className="btn btn-primary" data-od-id="hero-cta-primary">
              Try the live demo
            </a>
            <a
              href={siteConfig.webRepoUrl}
              target="_blank"
              rel="noopener"
              className="btn btn-secondary"
            >
              View source
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="demo" data-od-id="demo">
        <div className="container">
          <div className="row-between" style={{ marginBottom: 28, flexWrap: "wrap" }}>
            <h2 className="h2">Add a note, then ask about it.</h2>
            <span className="tag tag-accent2">● Live · calls the deployed backend</span>
          </div>
          <div className="card">
            <div className="demo-block">
              <h3 className="h3" style={{ marginBottom: 14 }}>
                Notes
              </h3>
              {notes === null ? (
                <p className="notes-item" style={{ marginTop: 4 }}>
                  Waking the server — this can take up to a minute on the free tier.{" "}
                  <Link
                    href="/"
                    style={{ textDecoration: "underline", textUnderlineOffset: 4 }}
                  >
                    Retry
                  </Link>
                </p>
              ) : notes.length === 0 ? (
                <p className="meta" style={{ marginTop: 10 }}>
                  No notes yet — add one below.
                </p>
              ) : (
                <>
                  <ul
                    className="stack"
                    style={{ gap: 10, listStyle: "none", margin: 0, padding: 0 }}
                  >
                    {notes.map((note) => (
                      <li key={note.id} className="notes-item">
                        <p style={{ margin: 0, fontWeight: 500 }}>{note.title}</p>
                        {note.body && (
                          <p className="meta" style={{ margin: "4px 0 0" }}>
                            {note.body}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                  <p className="meta" style={{ marginTop: 10 }}>
                    This is a demo — note data resets periodically.
                  </p>
                </>
              )}
            </div>

            <div className="demo-block">
              <h3 className="h3" style={{ marginBottom: 16 }}>
                Add a note
              </h3>
              <NoteForm />
            </div>

            <div className="demo-block">
              <h3 className="h3" style={{ marginBottom: 16 }}>
                Ask about my notes
              </h3>
              <AskBox />
            </div>
          </div>
        </div>
      </section>

      <section className="section" data-od-id="stack">
        <div className="container stack" style={{ gap: 48 }}>
          <div style={{ maxWidth: "40ch" }}>
            <p className="eyebrow">How it&apos;s built</p>
            <h2 className="h2">Three pieces, one small app.</h2>
          </div>
          <div className="grid-3">
            <div className="feature">
              <div className="feature-mark">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 6 3 12l6 6M15 6l6 6-6 6" />
                </svg>
              </div>
              <h3 className="h3">Frontend</h3>
              <p>
                Next.js 16 App Router, React 19, TypeScript. Server-rendered notes list,
                deployed on Vercel.
              </p>
            </div>
            <div className="feature">
              <div className="feature-mark alt">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="4" width="16" height="6" rx="1.5" />
                  <rect x="4" y="14" width="16" height="6" rx="1.5" />
                  <path d="M8 7h.01M8 17h.01" />
                </svg>
              </div>
              <h3 className="h3">Backend</h3>
              <p>
                FastAPI on Render, rate-limited writes, no CORS — the Next.js layer is the only
                caller.
              </p>
            </div>
            <div className="feature">
              <div className="feature-mark">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4c-1.2 0-2.4-.3-3.4-.8L4 20l1-4.8a8.3 8.3 0 0 1-.9-3.7A8.4 8.4 0 0 1 12.6 3 8.4 8.4 0 0 1 21 11.5Z" />
                  <path d="M9 11h.01M12 11h.01M15 11h.01" />
                </svg>
              </div>
              <h3 className="h3">Q&amp;A</h3>
              <p>
                POST /ask calls the Gemini API, grounded only in the notes you&apos;ve saved —
                nothing else.
              </p>
            </div>
          </div>
          <p className="meta" style={{ textAlign: "center" }}>
            21 tests · CI runs on every push via GitHub Actions.
          </p>
        </div>
      </section>
    </main>
  );
}
