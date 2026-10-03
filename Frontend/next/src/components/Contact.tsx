export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto flex max-w-4xl flex-wrap items-baseline justify-between gap-4 px-4 py-16 sm:px-8 sm:py-20"
    >
      <div>
        <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-[var(--amber)] uppercase">
          Contact
        </p>
        <h2 className="font-display text-3xl sm:text-4xl">Let&apos;s talk</h2>
      </div>
      <div className="flex flex-wrap gap-4 text-[var(--muted)]">
        <a
          href="https://github.com/Samswrld02"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-[var(--amber)] hover:underline"
        >
          GitHub ↗
        </a>
        <span>|</span>
        <a
          href="mailto:samaljaboury1@gmail.com"
          className="font-medium text-[var(--amber)] hover:underline"
        >
          Email ↗
        </a>
      </div>
    </section>
  );
}
