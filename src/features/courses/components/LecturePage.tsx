"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, LockKeyhole } from "lucide-react";
import type { Course } from "../types";
import { useCourseProgress } from "../progress";
import { BackLink, CourseShell, ProgressBar } from "./CourseShell";
import PracticeEditor from "./PracticeEditor";

export default function LecturePage({ course }: { course: Course }) {
  const params = useParams<{ lectureId: string }>();
  const router = useRouter();
  const state = useCourseProgress(course);
  const id = Number(params.lectureId);
  const lesson = course.lessons.find((item) => item.id === id);
  const unlocked = Number.isInteger(id) && state.isUnlocked(id);
  const done = state.completed.includes(id);

  useEffect(() => {
    if (!state.ready) return;
    if (!lesson) router.replace(`/courses/${course.slug}`);
    else if (!unlocked) router.replace(`/courses/${course.slug}`);
  }, [state.ready, lesson, unlocked, router, course.slug]);

  if (!lesson || !state.ready || !unlocked) return <CourseShell><p className="py-20 text-center text-muted-foreground">{state.ready && lesson ? <><LockKeyhole className="mx-auto mb-3"/>This lecture is locked. Complete the previous lecture to continue.</> : "Loading your lesson…"}</p></CourseShell>;

  const previous = id > 1 ? course.lessons[id - 2] : undefined;
  const next = course.lessons[id];
  const finishAndContinue = () => {
    state.complete(id);
    if (next) router.push(`/courses/${course.slug}/lecture/${next.id}`);
    else router.push(`/courses/${course.slug}`);
  };
  return <CourseShell><BackLink href={`/courses/${course.slug}`}>{course.title} course</BackLink><div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]"><article className="min-w-0 space-y-6"><header className="glass-card p-6 md:p-8"><p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">{course.title} · Lecture {id} of {course.lessons.length}</p><h1 className="mb-3 text-3xl md:text-4xl">{lesson.title}</h1><p className="text-muted-foreground">{lesson.summary}</p><div className="mt-6"><ProgressBar value={Math.round((state.count / course.lessons.length) * 100)} label={`${state.count} lectures completed`}/></div></header><section className="glass-card space-y-4 p-6 md:p-8"><h2 className="text-2xl">Lesson</h2><p>{lesson.summary} Start with the smallest working example, then adjust it and observe the result. Understanding the reason behind each choice will help you use this skill in larger projects.</p><h3 className="text-xl">Key idea</h3><p>{lesson.title} fits into the broader {lesson.section.toLowerCase()} stage of learning {course.title}. Prefer clear, maintainable code and check your work in the browser as you go.</p><h3 className="text-xl">Example</h3><pre className="overflow-x-auto rounded-xl border border-border bg-black/50 p-4 text-sm text-red-100"><code>{lesson.example}</code></pre><p>Read the example line by line. Try changing one value or element, then compare the result with the original.</p><h3 className="text-xl">Practice</h3><p>{lesson.practice}</p></section><PracticeEditor course={course.slug}/><div className="flex flex-wrap items-center justify-between gap-3">{previous ? <Link href={`/courses/${course.slug}/lecture/${previous.id}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 py-2.5 hover:bg-secondary"><ArrowLeft size={16}/>Previous Lecture</Link> : <span/>}{done ? <Link href={next ? `/courses/${course.slug}/lecture/${next.id}` : `/courses/${course.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground">{next ? "Next Lecture" : "View Course Completion"}<ArrowRight size={16}/></Link> : <button type="button" onClick={finishAndContinue} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground"><Check size={17}/>{next ? "Mark as Complete & Continue" : "Complete Course"}</button>}</div></article><aside className="h-fit glass-card p-4 lg:sticky lg:top-24"><h2 className="mb-1 text-lg">Your learning</h2><p className="mb-3 text-xs text-muted-foreground">{state.count} / {course.lessons.length} complete</p><div className="max-h-[55vh] space-y-1 overflow-y-auto">{course.lessons.map((item) => {const completed = state.completed.includes(item.id); const available = state.isUnlocked(item.id); return available ? <Link key={item.id} href={`/courses/${course.slug}/lecture/${item.id}`} aria-current={item.id === id ? "step" : undefined} className={`flex items-center gap-2 rounded-lg px-2 py-2 text-xs ${item.id === id ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-secondary"}`}><span className="shrink-0">{completed ? <Check size={14} className="text-primary"/> : <span className="inline-block w-[14px] text-center">{item.id}</span>}</span><span className="truncate">{item.title}</span></Link> : <div key={item.id} aria-label={`Lecture ${item.id} locked`} className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-muted-foreground/60"><LockKeyhole size={14} className="shrink-0"/><span className="truncate">{item.title}</span></div>;})}</div></aside></div></CourseShell>;
}
