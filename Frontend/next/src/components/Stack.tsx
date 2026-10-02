function StackItems({
  items,
}: {
  items: { label: string; note?: string }[];
}) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li
          key={item.label}
          className="font-display flex items-baseline justify-between gap-3 border-b border-[var(--text)]/10 pb-2 text-xl last:border-0 last:pb-0"
        >
          <span>{item.label}</span>
          {item.note ? (
            <span className="font-sans text-[0.7rem] font-medium tracking-wide text-[var(--muted)] uppercase">
              {item.note}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-4xl px-4 py-16 sm:px-8 sm:py-20">
      <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-[var(--amber)] uppercase">
        Capabilities
      </p>
      <h2 className="font-display mb-4 text-3xl sm:text-4xl">Stack</h2>
      <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[var(--text)]/90">
        A backend-first toolkit with enough frontend craft to ship polished
        surfaces — plus AI tooling baked into how I work.
      </p>

      <div className="grid overflow-hidden rounded border border-[var(--line)] md:grid-cols-3">
        <div className="relative bg-[rgba(11,18,32,0.95)] bg-gradient-to-br from-[rgba(245,165,36,0.12)] to-transparent p-6 md:row-span-1">
          <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[var(--amber)] to-[var(--coral)]" />
          <p className="mb-4 text-[0.68rem] font-semibold tracking-[0.16em] text-[var(--amber)] uppercase">
            Core — Backend
          </p>
          <StackItems
            items={[
              { label: "Go", note: "favorite" },
              { label: "Echo", note: "APIs" },
              { label: "Laravel", note: "internship" },
              { label: "GORM / SQL", note: "data" },
            ]}
          />
        </div>
        <div className="border-t border-[var(--line)] bg-[rgba(11,18,32,0.95)] p-6 md:border-t-0 md:border-l">
          <p className="mb-4 text-[0.68rem] tracking-[0.16em] text-[var(--muted)] uppercase">
            Frontend
          </p>
          <StackItems
            items={[
              { label: "React", note: "TSX" },
              { label: "TypeScript" },
              { label: "Tailwind CSS" },
              { label: "JavaScript" },
            ]}
          />
        </div>
        <div className="border-t border-[var(--line)] bg-[rgba(11,18,32,0.95)] p-6 md:border-t-0 md:border-l">
          <p className="mb-4 text-[0.68rem] tracking-[0.16em] text-[var(--muted)] uppercase">
            Tooling &amp; AI
          </p>
          <StackItems
            items={[
              { label: "Docker" },
              { label: "Git" },
              { label: "Cursor / agents" },
              { label: "MCP workflows" },
            ]}
          />
        </div>
      </div>

      <p className="mt-6 max-w-2xl text-[var(--muted)]">
        I handcode the critical path, decide architecture myself, and use Cursor
        skills when AI help is useful — then I take the reins again.
      </p>
    </section>
  );
}
