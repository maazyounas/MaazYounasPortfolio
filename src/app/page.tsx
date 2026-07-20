import { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import dynamic from "next/dynamic";

const DeferredHomeSections = dynamic(() => import("@/components/home/DeferredHomeSections"));
import { HomePageData } from "@/features/home";
import { AboutPageData } from "@/features/about";
import { ContactPageData } from "@/features/contact";
import { Project as ProjectType } from "@/features/projects";
import { getMetadataForPage } from "@/lib/seo/metadata";
import connectDB from "@/lib/server/db";
import About from "@/models/About";
import Contact from "@/models/Contact";
import Home from "@/models/Home";
import Project from "@/models/Project";
import Quote from "@/models/Quote";

export const revalidate = 3600; // 1 hour ISR

const baseMeta = getMetadataForPage("home");

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
  let homeData: HomePageData | null = null;
  let quotes: string[] = [];

  try {
    await connectDB();
    const [homeDataRaw, quotesDataRaw] = await Promise.all([
      Home.findOne().lean(),
      Quote.find().limit(5).lean(),
    ]);

    homeData = (homeDataRaw ? {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(homeDataRaw as any),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _id: String((homeDataRaw as any)._id)
    } : null) as unknown as HomePageData | null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    quotes = ((quotesDataRaw as any[]) || []).map((q) => q.text);
  } catch (error) {
    console.error("Home Page Data Fetch Error:", error);
  }

  return (
    <Layout>
      <div id="home" className="scroll-mt-28">
        <HeroSection initialHomeData={homeData} initialQuotes={quotes} />
      </div>
      <DeferredHomeSections />
    </Layout>
  );
}
