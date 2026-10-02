export function AiWorkflow() {
  const cards = [
    {
      title: "I decide the architecture",
      body: "Layers, boundaries, repository contracts, migration strategy — those calls stay mine before any agent runs.",
    },
    {
      title: "Skills for focused AI help",
      body: "I use Cursor skills so agents follow my Echo/Laravel conventions instead of inventing random patterns.",
    },
    {
      title: "Handcode where it counts",
      body: "Concurrency, auth, data integrity, tricky UI — I write and review that myself. AI can draft; I take the reins.",
    },
    {
      title: "Human gate on every merge",
      body: "AI-assisted review is welcome. Shipping is still my decision.",
    },
  ];

  return (
    <section id="ai" className="mx-auto max-w-4xl px-4 py-16 sm:px-8 sm:py-20">
      <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-[var(--amber)] uppercase">
        Workflow
      </p>
      <h2 className="font-display mb-4 text-3xl sm:text-4xl">
        AI as a tool — I still take the reins
      </h2>
      <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[var(--text)]/90">
        I still{" "}
        <em className="font-semibold not-italic text-[var(--amber)]">handcode</em> the
        important parts. I decide architecture and take over wherever judgment
        matters. AI speeds me up through{" "}
        <em className="font-semibold not-italic text-[var(--amber)]">Cursor skills</em>{" "}
        — it does not replace my craft.
      </p>
      <div className="grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
        {cards.map((card) => (
          <article
            key={card.title}
            className="bg-[rgba(11,18,32,0.95)] p-5 sm:p-6"
          >
            <h3 className="font-display mb-2 text-lg">{card.title}</h3>
            <p className="text-[var(--muted)]">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
