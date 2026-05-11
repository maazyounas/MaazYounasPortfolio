import { Metadata } from "next";
import { ProjectDetailsPage } from "@/features/projects";
import connectDB from "@/lib/server/db";
import Project from "@/models/Project";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    await connectDB();
    const project = await Project.findById(id).lean();

    if (!project) {
      return {
        title: "Project Not Found | Maaz Younas",
      };
    }

    return {
      title: `${project.title} | Maaz Younas Projects`,
      description: project.description.substring(0, 160),
      openGraph: {
        title: project.title,
        description: project.description.substring(0, 160),
        images: project.image ? [{ url: project.image }] : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: project.title,
        description: project.description.substring(0, 160),
        images: project.image ? [project.image] : [],
      },
    };
  } catch (error) {
    return {
      title: "Project Details | Maaz Younas",
    };
  }
}

export async function generateStaticParams() {
  try {
    await connectDB();
    const projects = await Project.find({ visible: true }).select("_id").lean();
    return projects.map((project) => ({
      id: String(project._id),
    }));
  } catch (error) {
    return [];
  }
}

export default function Page() {
  return <ProjectDetailsPage />;
}
