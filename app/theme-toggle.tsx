"use client";

import { useState } from "react";

export function ThemeToggle() {
  // Lazy initializer reads the attribute the pre-hydration script in layout.tsx
  // already set on <html>. This legitimately differs from the server-rendered
  // default (no data-theme, since localStorage isn't available server-side),
  // so aria-pressed below is exempted from the hydration-mismatch check —
  // same reasoning as the suppressHydrationWarning on <html> itself.
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.getAttribute("data-theme") === "dark",
  );

  function toggle() {
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setIsDark(next === "dark");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      suppressHydrationWarning
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-foreground)] hover:border-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2"
    >
      <svg
        className="theme-icon-sun"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
      </svg>
      <svg
        className="theme-icon-moon"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.8 6.8 0 0 0 10.7 10.7Z" />
      </svg>
    </button>
  );
}
