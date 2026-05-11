import { Metadata } from "next";
import { AboutPage, AboutPageData } from "@/features/about";
import { getMetadataForPage, generateStructuredData } from "@/lib/seo/metadata";
import connectDB from "@/lib/server/db";
import About from "@/models/About";

export const dynamic = "force-dynamic";

const baseMeta = getMetadataForPage("about");

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
  let data: AboutPageData | null = null;

  try {
    await connectDB();
    const rawData = await About.findOne().lean();
    if (rawData) {
      data = {
        tagline: rawData.tagline || '',
        shortIntro: rawData.shortIntro || '',
        bio: rawData.bio || '',
        profileImage: rawData.profileImage || '',
        techStack: (rawData.techStack || []).map((tech: { name?: string; icon?: string }) => ({
          name: tech.name || '',
          icon: tech.icon || ''
        })),
        skills: []
      };
    }
  } catch (error) {
    console.error("About Page Data Fetch Error:", error);
  }

  const personSchema = generateStructuredData("Person", {
    description: data?.bio || baseMeta.description,
    image: data?.profileImage,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <AboutPage initialData={data} />
    </>
  );
}
