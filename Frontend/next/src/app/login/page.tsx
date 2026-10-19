"use client";

import { useLoginForm } from "@/hooks/useLoginForm";

export default function LoginPage() {
  const {
    username,
    password,
    setUsername,
    setPassword,
    error,
    submitting,
    submit,
  } = useLoginForm();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,165,36,0.18)_0%,_transparent_55%)]"
      />
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-16">
        <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-[var(--amber)] uppercase">
          Admin
        </p>
        <h1 className="font-display text-4xl">Sign in</h1>
        <p className="mt-2 text-[var(--muted)]">
          Manage the projects shown on your portfolio.
        </p>

        <form
          onSubmit={submit}
          className="mt-8 space-y-5 rounded-xl border border-[var(--line)] bg-[rgba(5,8,20,0.55)] p-6"
        >
          <label className="block">
            <span className="mb-1.5 block text-sm text-[var(--muted)]">Username</span>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-[var(--line)] bg-[var(--navy)] px-3 py-2.5 text-[var(--text)] outline-none transition focus:border-[var(--amber)]"
              required
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-[var(--muted)]">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[var(--line)] bg-[var(--navy)] px-3 py-2.5 text-[var(--text)] outline-none transition focus:border-[var(--amber)]"
              required
            />
          </label>

          {error ? <p className="text-sm text-[var(--coral)]">{error}</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-[var(--amber)] px-5 py-3 text-sm font-semibold text-[#1a1208] shadow-[0_10px_28px_rgba(245,165,36,0.35)] transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
