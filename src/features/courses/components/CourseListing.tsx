"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Clock3, GraduationCap } from "lucide-react";
import { catalog } from "../data/catalog";
import { useCourseProgress } from "../progress";
import { CourseHeading, CourseShell, ProgressBar } from "./CourseShell";

export default function CourseListing() {
  return <CourseShell><CourseHeading eyebrow="Learn at your own pace" title="Web Development Courses" description="Learn web development step by step, from beginner foundations to advanced skills. Build a strong understanding of HTML, CSS and JavaScript with a clear, practical learning path."/><section aria-labelledby="web-development-heading"><div className="mb-6 flex items-center gap-3"><span className="rounded-xl bg-primary/10 p-2 text-primary"><GraduationCap/></span><div><h2 id="web-development-heading" className="text-2xl">Web Development</h2><p className="text-sm text-muted-foreground">Three guided courses to help you build for the web</p></div></div><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{catalog.map((course) => <CourseCard key={course.slug} course={course}/>)}</div></section></CourseShell>;
}

function CourseCard({ course }: { course: (typeof catalog)[number] }) {
  const progress = useCourseProgress(course);
  return <article className="glass-card flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40"><div className="mb-5 flex items-start justify-between"><span className="rounded-lg border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-red-200">{course.difficulty}</span><span className="rounded-xl bg-primary/10 p-2.5 text-primary"><BookOpen/></span></div><h3 className="mb-1 text-2xl">{course.title}</h3><p className="mb-3 text-sm font-medium text-primary">{course.subtitle}</p><p className="mb-5 flex-1 text-sm leading-6 text-muted-foreground">{course.description}</p><div className="mb-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1"><BookOpen size={14}/>{course.lectureCount} lectures</span><span className="inline-flex items-center gap-1"><Clock3 size={14}/>{course.duration}</span></div><ProgressBar value={progress.percent} label={`${progress.count} / ${course.lectureCount} lectures completed`}/><Link href={`/courses/${course.slug}`} className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition hover:brightness-110">{progress.count ? "Continue Course" : "Start Course"}<ArrowRight size={17}/></Link></article>;
}
