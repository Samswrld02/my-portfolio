"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/lib/api";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  return (
    <section id="work" className="mx-auto max-w-4xl px-4 py-16 sm:px-8 sm:py-20">
      <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-[var(--amber)] uppercase">
        Selected work
      </p>
      <h2 className="font-display mb-4 text-3xl sm:text-4xl">
        Projects that show how I think
      </h2>
      <p className="mb-8 max-w-2xl text-lg text-[var(--text)]/90">
        Systems toys and full-stack builds. Open any card for the repo.
      </p>

      {isPending ? <p className="text-[var(--muted)]">Loading projects…</p> : null}
      {isError ? (
        <p className="text-[var(--muted)]">Couldn&apos;t load projects.</p>
      ) : null}
      {data?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}
