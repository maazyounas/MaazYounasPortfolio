import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Layout from "@/components/layout/Layout";
import CourseOverview from "@/features/courses/components/CourseOverview";
import { courseList, getCourse } from "@/features/courses/data/courses";

type Props = { params: Promise<{ course: string }> };
export function generateStaticParams() { return courseList.map(({ slug }) => ({ course: slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { course: slug } = await params;
  const course = getCourse(slug);
  if (!course) return { title: "Course not found" };
  const title = `${course.title} Course | Muhammad Maaz Younas`;
  const description = course.description;
  return { title: { absolute: title }, description, alternates: { canonical: `/courses/${course.slug}` }, openGraph: { title, description, url: `/courses/${course.slug}`, type: "website" }, twitter: { card: "summary_large_image", title, description } };
}
export default async function CoursePage({ params }: Props) {
  const { course: slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  return <Layout><CourseOverview course={course}/></Layout>;
}
