"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { deleteProject as apiDeleteProject } from "@/lib/api";

/** Confirms and sends DELETE /api/projects/:id, then refreshes the list. */
export function useDeleteProject() {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function deleteProject(id: number, title: string) {
    if (!window.confirm(`Delete “${title}”?`)) return;
    setError(null);
    setDeletingId(id);
    try {
      await apiDeleteProject(id);
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  return { deleteProject, deletingId, error };
}
