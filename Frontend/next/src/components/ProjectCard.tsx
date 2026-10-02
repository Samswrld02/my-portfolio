import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.repoUrl}
      target="_blank"
      rel="noreferrer"
      className="group relative grid gap-2 border-b border-[var(--line)] py-6 pl-4 text-[var(--text)] no-underline transition first:border-t sm:grid-cols-[1fr_auto] sm:items-start"
    >
      <span className="absolute top-6 bottom-6 left-0 w-[3px] rounded bg-transparent transition group-hover:bg-[var(--amber)] group-hover:shadow-[0_0_14px_rgba(245,165,36,0.5)]" />
      <div>
        <h3 className="font-display text-2xl transition group-hover:text-[var(--amber)]">
          {project.title}
          <span className="ml-1 text-sm opacity-55">↗</span>
        </h3>
        <p className="mt-1 max-w-xl text-[var(--muted)]">{project.description}</p>
      </div>
      {project.tags?.length ? (
        <p className="pt-1 text-[0.7rem] tracking-wider text-[var(--muted)] uppercase">
          {project.tags.join(" · ")}
        </p>
      ) : null}
    </a>
  );
}
