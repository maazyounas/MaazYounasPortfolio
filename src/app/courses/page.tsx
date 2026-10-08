import type { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import CourseListing from "@/features/courses/components/CourseListing";

const description = "Explore web development courses in HTML, CSS and JavaScript with a practical learning path from beginner foundations to advanced skills.";
export const metadata: Metadata = {
  title: { absolute: "Web Development Courses | Muhammad Maaz Younas" },
  description,
  alternates: { canonical: "/courses" },
  openGraph: { title: "Web Development Courses | Muhammad Maaz Younas", description, url: "/courses", type: "website" },
  twitter: { card: "summary_large_image", title: "Web Development Courses | Muhammad Maaz Younas", description },
};

export default function CoursesPage() { return <Layout><CourseListing/></Layout>; }
