export type CourseSlug = "html" | "css" | "javascript";

export interface Lesson {
  id: number;
  title: string;
  section: string;
  summary: string;
  example: string;
  practice: string;
}

export interface Course {
  slug: CourseSlug;
  title: string;
  subtitle: string;
  description: string;
  difficulty: string;
  duration: string;
  skills: string[];
  outcomes: string[];
  lessons: Lesson[];
}

export interface CourseProgress {
  completed: number[];
  completedAt?: string;
}

export type ProgressMap = Partial<Record<CourseSlug, CourseProgress>>;
