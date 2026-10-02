"use client";

import dynamic from "next/dynamic";

const SunsetScene = dynamic(
  () => import("@/components/SunsetScene").then((m) => m.SunsetScene),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #060a12 0%, #0B1220 28%, #1A2744 48%, #4a2c3d 62%, #E85D4C 78%, #F5A524 90%, #FFC9A3 100%)",
        }}
      />
    ),
  },
);

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  // Pause WebGL BEFORE scrolling so the main thread is free
  window.dispatchEvent(new Event("portfolio:scroll-start"));

  const prefersReduce = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReduce) {
    el.scrollIntoView({ behavior: "auto", block: "start" });
    window.dispatchEvent(new Event("portfolio:scroll-end"));
    return;
  }

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    window.removeEventListener("scrollend", finish);
    window.dispatchEvent(new Event("portfolio:scroll-end"));
  };

  window.addEventListener("scrollend", finish, { once: true });
  // Fallback if scrollend isn't fired (older browsers / interrupted scroll)
  window.setTimeout(finish, 1200);

  // Native smooth scroll is compositor-friendly once WebGL is paused
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <header className="relative isolate flex min-h-screen flex-col overflow-hidden px-4 pb-12 pt-5 sm:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full">
        <SunsetScene />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(5,8,20,0.45)] via-transparent to-[rgba(5,8,20,0.25)]" />

      <nav className="z-10 flex flex-wrap justify-end gap-x-5 gap-y-2 text-sm text-[var(--text)]/90">
        {(
          [
            ["about", "About"],
            ["education", "Education"],
            ["stack", "Stack"],
            ["work", "Work"],
            ["ai", "AI"],
            ["contact", "Contact"],
          ] as const
        ).map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className="hover:text-[var(--amber)]"
            onClick={(e) => {
              e.preventDefault();
              scrollToId(id);
            }}
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="z-10 flex flex-1 flex-col justify-center py-16 sm:py-20">
        <div className="max-w-xl">
          <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-[var(--text)] drop-shadow-lg sm:text-6xl md:text-7xl">
            Sam Al Jaboury
          </h1>
          <p className="mt-4 text-lg font-medium text-[var(--text)] sm:text-xl">
            Backend &amp; systems engineer who ships
          </p>
          <p className="mt-2 max-w-md text-[var(--muted)]">
            Bit Academy · MBO 4 Software Engineer (Backend) · React / Laravel
            internship · Go-first · next: Hanze NSE
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("work");
              }}
              className="rounded-lg bg-[var(--amber)] px-5 py-3 text-sm font-semibold text-[#1a1208] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(245,165,36,0.4)]"
            >
              View work
            </a>
            <a
              href="https://github.com/Samswrld02"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-[var(--text)]/50 px-5 py-3 text-sm font-semibold text-[var(--text)] transition hover:-translate-y-0.5"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
