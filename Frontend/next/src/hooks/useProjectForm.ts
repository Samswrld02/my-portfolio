"use client";

import { FormEvent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createProject, updateProject } from "@/lib/api";
import type { Project } from "@/lib/types";

function parseTagsInput(value: string): string[] {
  return value
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

/** Collects title/description/repoUrl/tags and sends create or update to the API. */
export function useProjectForm() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [tags, setTags] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isEditing = editingId !== null;

  function startEdit(project: Project) {
    setEditingId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setRepoUrl(project.repoUrl);
    setTags(project.tags?.join(", ") ?? "");
    setError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setRepoUrl("");
    setTags("");
    setError(null);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const payload = {
      title,
      description,
      repoUrl,
      tags: parseTagsInput(tags),
    };
    try {
      if (editingId !== null) {
        await updateProject(editingId, payload);
      } else {
        await createProject(payload);
      }
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      cancelEdit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSubmitting(false);
    }
  }

  return {
    title,
    description,
    repoUrl,
    tags,
    setTitle,
    setDescription,
    setRepoUrl,
    setTags,
    isEditing,
    editingId,
    startEdit,
    cancelEdit,
    error,
    submitting,
    submit,
  };
}
