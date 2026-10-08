import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Layout from "@/components/layout/Layout";
import LecturePage from "@/features/courses/components/LecturePage";
import { courseList, getCourse } from "@/features/courses/data/courses";

type Props = { params: Promise<{ course: string; lectureId: string }> };
export function generateStaticParams() { return courseList.flatMap(({ slug, lessons }) => lessons.map(({ id }) => ({ course: slug, lectureId: String(id) }))); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { course: slug, lectureId } = await params;
  const course = getCourse(slug);
  const lesson = course?.lessons.find(({ id }) => id === Number(lectureId));
  if (!course || !lesson) return { title: "Lecture not found", robots: { index: false } };
  const title = `${lesson.title} — ${course.title} Course | Muhammad Maaz Younas`;
  return { title: { absolute: title }, description: lesson.summary, alternates: { canonical: `/courses/${course.slug}/lecture/${lesson.id}` }, openGraph: { title, description: lesson.summary, url: `/courses/${course.slug}/lecture/${lesson.id}`, type: "article" }, twitter: { card: "summary_large_image", title, description: lesson.summary }, robots: { index: false, follow: true } };
}
export default async function CourseLecture({ params }: Props) {
  const { course: slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  return <Layout><LecturePage course={course}/></Layout>;
}
