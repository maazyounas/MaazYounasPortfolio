"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { LazySection } from "@/components/ui/LazySection";

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

const DeferredHomeSections = () => {
  return (
    <>
      <LazySection minHeight="28rem">
        <Suspense fallback={sectionFallback("28rem")}>
          <ServicesSection />
        </Suspense>
      </LazySection>

      <LazySection minHeight="40rem">
        <Suspense fallback={sectionFallback("40rem")}>
          <AboutSection
            initialData={null}
            standalone={false}
            sectionId="about"
          />
        </Suspense>
      </LazySection>

      <LazySection minHeight="42rem">
        <Suspense fallback={sectionFallback("42rem")}>
          <ProjectsSection
            initialProjects={[]}
            standalone={false}
            sectionId="projects"
          />
        </Suspense>
      </LazySection>

      <LazySection minHeight="42rem">
        <Suspense fallback={sectionFallback("42rem")}>
          <ContactSection
            initialData={null}
            standalone={false}
            sectionId="contact"
          />
        </Suspense>
      </LazySection>
    </>
  );
};

export default DeferredHomeSections;
