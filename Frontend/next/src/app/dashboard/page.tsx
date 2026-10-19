"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { useProjectForm } from "@/hooks/useProjectForm";
import { useDeleteProject } from "@/hooks/useDeleteProject";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading, logout } = useAuth();
  const form = useProjectForm();
  const { deleteProject, deletingId, error: deleteError } = useDeleteProject();

  const { data, isPending, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || !isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center text-[var(--muted)]">
        Checking session…
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,165,36,0.16)_0%,_transparent_55%)]"
      />

      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-8">
        <header className="mb-10 flex items-center justify-between">
          <h1 className="font-display text-2xl sm:text-3xl">Dashboard</h1>
          <button
            type="button"
            onClick={() => void logout()}
            className="text-sm text-[var(--muted)] transition hover:text-[var(--amber)]"
          >
            Logout
          </button>
        </header>

        <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-[var(--amber)] uppercase">
          Manage
        </p>
        <h2 className="font-display text-3xl sm:text-4xl">Your projects</h2>
        <p className="mt-2 mb-8 max-w-xl text-[var(--muted)]">
          Add a repo, edit copy, or remove a card from the site.
        </p>

        <form
          onSubmit={form.submit}
          className="space-y-5 rounded-xl border border-[var(--line)] bg-[rgba(5,8,20,0.45)] p-6"
        >
          <label className="block">
            <span className="mb-1.5 block text-sm text-[var(--muted)]">Title</span>
            <input
              type="text"
              value={form.title}
              onChange={(e) => form.setTitle(e.target.value)}
              placeholder="Enter project title"
              className="w-full rounded-lg border border-[var(--line)] bg-[var(--navy)] px-3 py-2.5 text-[var(--text)] outline-none transition focus:border-[var(--amber)]"
              required
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-[var(--muted)]">Description</span>
            <textarea
              value={form.description}
              onChange={(e) => form.setDescription(e.target.value)}
              placeholder="Brief description of the project…"
              rows={3}
              className="w-full resize-y rounded-lg border border-[var(--line)] bg-[var(--navy)] px-3 py-2.5 text-[var(--text)] outline-none transition focus:border-[var(--amber)]"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-[var(--muted)]">GitHub URL</span>
            <input
              type="url"
              value={form.repoUrl}
              onChange={(e) => form.setRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repo"
              className="w-full rounded-lg border border-[var(--line)] bg-[var(--navy)] px-3 py-2.5 text-[var(--text)] outline-none transition focus:border-[var(--amber)]"
              required
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-[var(--muted)]">Tags</span>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => form.setTags(e.target.value)}
              placeholder="Go, Echo, Redis"
              className="w-full rounded-lg border border-[var(--line)] bg-[var(--navy)] px-3 py-2.5 text-[var(--text)] outline-none transition focus:border-[var(--amber)]"
            />
            <span className="mt-1 block text-xs text-[var(--muted)]">
              Comma-separated — saved in the database and shown on portfolio cards.
            </span>
          </label>

          {form.error ? <p className="text-sm text-[var(--coral)]">{form.error}</p> : null}

          <div className="flex flex-wrap items-center justify-end gap-3">
            {form.isEditing ? (
              <button
                type="button"
                onClick={form.cancelEdit}
                className="rounded-lg border border-[var(--line)] px-4 py-2.5 text-sm text-[var(--muted)] transition hover:text-[var(--text)]"
              >
                Cancel
              </button>
            ) : null}
            <button
              type="submit"
              disabled={form.submitting}
              className="rounded-lg bg-[var(--amber)] px-5 py-2.5 text-sm font-semibold text-[#1a1208] shadow-[0_10px_28px_rgba(245,165,36,0.35)] transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              {form.submitting
                ? "Saving…"
                : form.isEditing
                  ? "Save changes"
                  : "Add project"}
            </button>
          </div>
        </form>

        <section className="mt-12">
          <p className="mb-4 text-xs font-semibold tracking-[0.14em] text-[var(--amber)] uppercase">
            Live on site
          </p>

          {isPending ? <p className="text-[var(--muted)]">Loading projects…</p> : null}
          {isError ? (
            <p className="text-[var(--muted)]">Couldn&apos;t load projects.</p>
          ) : null}
          {deleteError ? <p className="mb-3 text-sm text-[var(--coral)]">{deleteError}</p> : null}

          {data?.length === 0 ? (
            <p className="text-[var(--muted)]">No projects yet. Add one above.</p>
          ) : null}

          <ul>
            {data?.map((project) => (
              <li
                key={project.id}
                className="group relative grid gap-3 border-b border-[var(--line)] py-6 pl-4 first:border-t sm:grid-cols-[1fr_auto] sm:items-start"
              >
                <span className="absolute top-6 bottom-6 left-0 w-[3px] rounded bg-[var(--amber)]/70 shadow-[0_0_14px_rgba(245,165,36,0.35)]" />
                <div>
                  <h3 className="font-display text-2xl">{project.title}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{project.repoUrl}</p>
                  {project.description ? (
                    <p className="mt-1 max-w-xl text-[var(--muted)]">{project.description}</p>
                  ) : null}
                  {project.tags?.length ? (
                    <p className="mt-2 text-[0.7rem] tracking-wider text-[var(--muted)] uppercase">
                      {project.tags.join(" · ")}
                    </p>
                  ) : null}
                </div>
                <div className="flex gap-4 pt-1 text-sm">
                  <button
                    type="button"
                    onClick={() => form.startEdit(project)}
                    className="text-[var(--amber)] transition hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    disabled={deletingId === project.id}
                    onClick={() => void deleteProject(project.id, project.title)}
                    className="text-[var(--muted)] transition hover:text-[var(--coral)] disabled:opacity-50"
                  >
                    {deletingId === project.id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
