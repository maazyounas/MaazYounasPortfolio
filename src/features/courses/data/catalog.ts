import type { CourseSlug } from "../types";

export const catalog = [
  { slug: "html", title: "HTML", subtitle: "Build the structure of the web", description: "Learn HTML from the fundamentals to semantic, accessible and search-friendly page structures. This guided course takes you from your first document to a complete project.", difficulty: "Beginner to advanced", duration: "8–10 hours", lectureCount: 34 },
  { slug: "css", title: "CSS", subtitle: "Style and lay out the web", description: "Learn CSS from basic styling through responsive layouts, Flexbox, Grid, transitions and modern CSS techniques by building practical interfaces.", difficulty: "Beginner to advanced", duration: "12–15 hours", lectureCount: 53 },
  { slug: "javascript", title: "JavaScript", subtitle: "Bring websites to life", description: "Learn JavaScript from fundamentals to DOM programming, asynchronous code, APIs and modern language features through a structured project-based path.", difficulty: "Beginner to advanced", duration: "16–20 hours", lectureCount: 59 },
] satisfies { slug: CourseSlug; title: string; subtitle: string; description: string; difficulty: string; duration: string; lectureCount: number }[];
