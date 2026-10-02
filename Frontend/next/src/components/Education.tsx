export function Education() {
  return (
    <section
      id="education"
      className="mx-auto max-w-4xl px-4 py-16 sm:px-8 sm:py-20"
    >
      <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-[var(--amber)] uppercase">
        Education
      </p>
      <h2 className="font-display mb-8 text-3xl sm:text-4xl">Schooling</h2>
      <div className="grid gap-5">
        <article className="border-l-2 border-[var(--amber)]/40 py-1 pl-4 transition hover:border-[var(--amber)]">
          <p className="mb-1 text-xs font-semibold tracking-[0.12em] text-[var(--amber)] uppercase">
            Current
          </p>
          <h3 className="font-display text-xl sm:text-2xl">
            Bit Academy — MBO 4 Software Engineer
          </h3>
          <p className="mt-2 max-w-xl text-[var(--muted)]">
            Backend track. Server-side design, APIs, databases, Docker, Git.
            Internship: React + TypeScript frontend, Laravel backend.
          </p>
        </article>
        <article className="border-l-2 border-[var(--amber)]/40 py-1 pl-4 transition hover:border-[var(--amber)]">
          <p className="mb-1 text-xs font-semibold tracking-[0.12em] text-[var(--amber)] uppercase">
            Next
          </p>
          <h3 className="font-display text-xl sm:text-2xl">Hanze — NSE</h3>
          <p className="mt-2 max-w-xl text-[var(--muted)]">
            Continuing into Hanze NSE to deepen systems fundamentals while
            keeping a shipping mindset on Go / Laravel / React work.
          </p>
        </article>
      </div>
    </section>
  );
}
