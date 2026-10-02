export function About() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-4 py-16 sm:px-8 sm:py-20">
      <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-[var(--amber)] uppercase">
        About
      </p>
      <h2 className="font-display mb-4 text-3xl sm:text-4xl">
        Building systems that stay simple, fast, and reliable
      </h2>
      <p className="max-w-2xl text-lg leading-relaxed text-[var(--text)]/90">
        I&apos;m a junior engineer at{" "}
        <em className="font-semibold not-italic text-[var(--amber)]">Bit Academy</em> on
        the{" "}
        <em className="font-semibold not-italic text-[var(--amber)]">
          MBO 4 Software Engineer — Backend
        </em>{" "}
        track, currently interning on a{" "}
        <em className="font-semibold not-italic text-[var(--amber)]">React</em> frontend
        and{" "}
        <em className="font-semibold not-italic text-[var(--amber)]">Laravel</em> backend.
        Outside work I go deep on{" "}
        <em className="font-semibold not-italic text-[var(--amber)]">Go</em> and Echo —
        concurrency, APIs, and infrastructure that holds up. Next step:{" "}
        <em className="font-semibold not-italic text-[var(--amber)]">Hanze NSE</em>.
      </p>
    </section>
  );
}
