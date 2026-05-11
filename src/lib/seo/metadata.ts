export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  twitterHandle?: string;
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  robots?: "index,follow" | "noindex,follow" | "index,nofollow" | "noindex,nofollow";
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://maazyounas.dev";
const siteTitle = "Maaz Younas | Full-Stack Developer";
const siteDescription = "Full-stack developer specializing in modern web technologies, cloud solutions, and scalable applications.";

export const defaultMetadata: SeoMetadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "full-stack developer",
    "web development",
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "MongoDB",
    "freelancer",
  ],
  canonical: baseUrl,
  ogType: "website",
  robots: "index,follow",
};

export const pageMetadata: Record<string, SeoMetadata> = {
  home: {
    title: `${siteTitle} | Web Developer & Cloud Solutions Expert`,
    description:
      "Experienced full-stack developer building scalable web applications with Next.js, React, Node.js, and modern cloud technologies.",
    keywords: [
      "full-stack developer",
      "Next.js developer",
      "React developer",
      "web development",
      "freelance developer",
    ],
    canonical: `${baseUrl}/`,
    robots: "index,follow",
  },
  about: {
    title: `About Me | ${siteTitle}`,
    description:
      "Learn about my experience, tech stack, and approach to building robust, scalable web applications.",
    keywords: [
      "about me",
      "developer experience",
      "tech stack",
      "skills",
      "portfolio",
    ],
    canonical: `${baseUrl}/about`,
    robots: "index,follow",
  },
  projects: {
    title: `Projects | ${siteTitle}`,
    description:
      "Explore my portfolio of real-world web development projects built with modern technologies.",
    keywords: ["projects", "portfolio", "case studies", "web applications"],
    canonical: `${baseUrl}/projects`,
    robots: "index,follow",
  },
  contact: {
    title: `Get In Touch | ${siteTitle}`,
    description:
      "Interested in working together? Let's connect. Available for freelance projects and collaborations.",
    keywords: ["contact", "hire", "freelance", "collaboration"],
    canonical: `${baseUrl}/contact`,
    robots: "index,follow",
  },
  admin: {
    title: "Admin Panel",
    description: "Secure admin panel for portfolio management.",
    keywords: ["admin", "panel", "portfolio", "management"],
    canonical: `${baseUrl}/admin`,
    robots: "noindex,nofollow",
  },
};

export function getMetadataForPage(page: keyof typeof pageMetadata): SeoMetadata {
  return pageMetadata[page] || defaultMetadata;
}

export function generateCanonicalUrl(path: string): string {
  return `${baseUrl}${path}`.replace(/\/$/, "") || baseUrl;
}

export function generateStructuredData(
  type: "Organization" | "Person" | "WebSite" | "BreadcrumbList",
  data: Record<string, unknown>,
) {
  const baseStructure = {
    "@context": "https://schema.org",
    "@type": type,
  };

  switch (type) {
    case "Organization":
      return {
        ...baseStructure,
        name: "Maaz Younas",
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description: siteDescription,
        sameAs: [
          "https://github.com/maaz-younas",
          "https://linkedin.com/in/maaz-younas",
          "https://twitter.com/maaz_younas",
        ],
        ...data,
      };
    case "Person":
      return {
        ...baseStructure,
        name: "Maaz Younas",
        url: baseUrl,
        jobTitle: "Full-Stack Developer",
        description: siteDescription,
        ...data,
      };
    case "WebSite":
      return {
        ...baseStructure,
        name: siteTitle,
        url: baseUrl,
        description: siteDescription,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
        ...data,
      };
    case "BreadcrumbList":
      return {
        ...baseStructure,
        itemListElement: data.breadcrumbs,
      };
    default:
      return { ...baseStructure, ...data };
  }
}
