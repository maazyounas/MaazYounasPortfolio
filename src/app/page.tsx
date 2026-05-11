import { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/section/ServicesSection";
import AboutSection from "@/page-components/About";
import ContactSection from "@/page-components/Contact";
import ProjectsSection from "@/page-components/Projects";
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

export const dynamic = "force-dynamic";

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
  let aboutData: AboutPageData | null = null;
  let contactData: ContactPageData | null = null;
  let projects: ProjectType[] = [];
  let quotes: string[] = [];

  try {
    await connectDB();
    const [homeDataRaw, aboutDataRaw, contactDataRaw, projectsRaw, quotesDataRaw] = await Promise.all([
      Home.findOne().lean(),
      About.findOne().lean(),
      Contact.findOne().lean(),
      Project.find().sort({ order: 1, createdAt: -1 }).lean(),
      Quote.find().lean(),
    ]);

    homeData = (homeDataRaw ? {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(homeDataRaw as any),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _id: String((homeDataRaw as any)._id)
    } : null) as unknown as HomePageData | null;

    aboutData = aboutDataRaw ? {
      tagline: aboutDataRaw.tagline || '',
      shortIntro: aboutDataRaw.shortIntro || '',
      bio: aboutDataRaw.bio || '',
      profileImage: aboutDataRaw.profileImage || '',
      techStack: (aboutDataRaw.techStack || []).map((tech: { name?: string; icon?: string }) => ({
        name: tech.name || '',
        icon: tech.icon || ''
      })),
      skills: []
    } : null;

    contactData = (contactDataRaw ? {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(contactDataRaw as any),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _id: String((contactDataRaw as any)._id)
    } : null) as unknown as ContactPageData | null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    projects = projectsRaw.map((project: any) => ({
      ...project,
      id: String(project._id),
      _id: String(project._id),
    })) as ProjectType[];

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
      <ServicesSection />
      <AboutSection initialData={aboutData} standalone={false} sectionId="about" />
      <ProjectsSection initialProjects={projects} standalone={false} sectionId="projects" />
      <ContactSection initialData={contactData} standalone={false} sectionId="contact" />
    </Layout>
  );
}
