"use client";

import { useCallback, useEffect, useState } from "react";
import type { CourseProgress, CourseSlug, ProgressMap } from "./types";
import { catalog } from "./data/catalog";

const KEY = "maaz-courses-progress-v1";
function readProgress(): ProgressMap {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) || "{}");
    if (!parsed || typeof parsed !== "object") return {};
    const raw = parsed as Record<string, unknown>;
    const clean: ProgressMap = {};
    for (const course of catalog) {
      const value = raw[course.slug];
      if (!value || typeof value !== "object") continue;
      const entry = value as { completed?: unknown; completedAt?: unknown };
      if (!Array.isArray(entry.completed)) continue;
      const ids = new Set(entry.completed.filter((id): id is number => Number.isInteger(id) && id >= 1 && id <= course.lectureCount));
      const completed: number[] = [];
      for (let id = 1; ids.has(id); id += 1) completed.push(id);
      clean[course.slug] = { completed, ...(typeof entry.completedAt === "string" ? { completedAt: entry.completedAt } : {}) };
    }
    return clean;
  } catch { return {}; }
}

export function useCourseProgress(course: { slug: CourseSlug; lessons?: { id: number }[]; lectureCount?: number }) {
  const [map, setMap] = useState<ProgressMap>({});
  const [ready, setReady] = useState(false);
  const total = course.lessons?.length ?? course.lectureCount ?? 0;

  useEffect(() => { setMap(readProgress()); setReady(true); }, []);

  const progress: CourseProgress = map[course.slug] ?? { completed: [] };
  const completed = progress.completed.filter((id) => Number.isInteger(id) && id >= 1 && id <= total);
  const count = completed.length;
  const percent = total ? Math.round((count / total) * 100) : 0;
  const nextId = Math.min(count + 1, total);
  const isUnlocked = (id: number) => id === 1 || completed.includes(id - 1) || completed.includes(id);

  const complete = useCallback((id: number) => {
    const currentCourse = map[course.slug] ?? { completed: [] };
    if (id < 1 || id > total || !(id === 1 || currentCourse.completed.includes(id - 1))) return;
    const nextCompleted = [...new Set([...currentCourse.completed, id])].sort((a, b) => a - b);
    const next = { ...map, [course.slug]: { completed: nextCompleted, ...(nextCompleted.length === total ? { completedAt: currentCourse.completedAt ?? new Date().toISOString() } : {}) } };
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage may be unavailable */ }
    setMap(next);
  }, [map, course.slug, total]);

  return { ready, completed, count, percent, nextId, isUnlocked, complete, completedAt: progress.completedAt };
}
