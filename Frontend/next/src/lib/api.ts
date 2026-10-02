import type { Project } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path} (${res.status})`);
  }

  return res.json() as Promise<T>;
}

export function fetchProjects() {
  return apiGet<Project[]>("/api/projects");
}
