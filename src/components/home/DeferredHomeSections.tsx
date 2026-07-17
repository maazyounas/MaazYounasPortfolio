"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import type { AboutPageData } from "@/features/about";
import type { ContactPageData } from "@/features/contact";
import type { Project as ProjectType } from "@/features/projects";

const ServicesSection = dynamic(
  () => import("@/components/section/ServicesSection"),
  { ssr: false },
);

const AboutSection = dynamic(() => import("@/page-components/About"), {
  ssr: false,
});

const ProjectsSection = dynamic(() => import("@/page-components/Projects"), {
  ssr: false,
});

const ContactSection = dynamic(() => import("@/page-components/Contact"), {
  ssr: false,
});

const sectionFallback = (minHeight = "32rem") => (
  <div
    className="section-padding relative overflow-hidden"
    style={{ minHeight }}
    aria-hidden="true"
  />
);

interface DeferredHomeSectionsProps {
  aboutData: AboutPageData | null;
  contactData: ContactPageData | null;
  projects: ProjectType[];
}

const DeferredHomeSections = ({
  aboutData,
  contactData,
  projects,
}: DeferredHomeSectionsProps) => {
  return (
    <>
      <Suspense fallback={sectionFallback("28rem")}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={sectionFallback("40rem")}>
        <AboutSection
          initialData={aboutData}
          standalone={false}
          sectionId="about"
        />
      </Suspense>
      <Suspense fallback={sectionFallback("42rem")}>
        <ProjectsSection
          initialProjects={projects}
          standalone={false}
          sectionId="projects"
        />
      </Suspense>
      <Suspense fallback={sectionFallback("42rem")}>
        <ContactSection
          initialData={contactData}
          standalone={false}
          sectionId="contact"
        />
      </Suspense>
    </>
  );
};

export default DeferredHomeSections;
