import { Metadata } from "next";
import { ProjectsPage, Project as ProjectType } from "@/features/projects";
import { getMetadataForPage, generateStructuredData } from "@/lib/seo/metadata";
import connectDB from "@/lib/server/db";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

const baseMeta = getMetadataForPage("projects");

export const metadata: Metadata = {
  title: baseMeta.title,
  description: baseMeta.description,
  keywords: baseMeta.keywords,
  robots: baseMeta.robots,
  openGraph: {
    title: baseMeta.title,
    description: baseMeta.description,
    url: baseMeta.canonical,
    type: "website",
    images: [
      {
        url: `${baseMeta.canonical}/og-image.avif`,
        width: 1200,
        height: 630,
        alt: baseMeta.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: baseMeta.title,
    description: baseMeta.description,
  },
};

export default async function Page() {
  let data: ProjectType[] = [];

  // Data fetching is deferred to the client component (lazy loading)
  // to prevent large inline JSON payloads in the server response.
  // The client will hit /api/projects on mount.

  const breadcrumbSchema = generateStructuredData("BreadcrumbList", {
    breadcrumbs: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://maazyounas.dev" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://maazyounas.dev/projects" },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProjectsPage initialProjects={data} />
    </>
  );
}
