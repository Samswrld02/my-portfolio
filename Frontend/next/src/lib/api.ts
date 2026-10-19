import type { Project } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = (await res.json()) as { error?: string };
      if (body.error) message = body.error;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

export function fetchProjects() {
  return apiFetch<Project[]>("/api/projects");
}

export function login(username: string, password: string) {
  return apiFetch<{ username: string }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function logout() {
  return apiFetch<{ ok: string }>("/api/auth/logout", { method: "POST" });
}

export function fetchMe() {
  return apiFetch<{ username: string }>("/api/auth/me");
}

export type ProjectWriteInput = {
  title: string;
  description: string;
  repoUrl: string;
  tags: string[];
};

export function createProject(data: ProjectWriteInput) {
  return apiFetch<Project>("/api/projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateProject(id: number, data: ProjectWriteInput) {
  return apiFetch<Project>(`/api/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteProject(id: number) {
  return apiFetch<void>(`/api/projects/${id}`, { method: "DELETE" });
}
