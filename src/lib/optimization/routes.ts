/**
 * Next.js route segment configuration for performance
 * - Static generation (SSG) with revalidation
 * - Server-side rendering (SSR) with caching
 * - Route-level optimization
 */

export const dynamicParams = {
  static: {
    revalidate: 3600,
    dynamic: "force-static",
  },
  ssg: {
    revalidate: 86400,
    dynamic: "force-static",
  },
  isr: {
    revalidate: 300,
    dynamic: "force-dynamic",
  },
  revalidateOnDemand: {
    revalidate: 0,
    dynamic: "force-dynamic",
  },
};

export const cacheHeaders = {
  immutable: "public, max-age=31536000, immutable",
  longTerm: "public, max-age=604800, stale-while-revalidate=2592000",
  standard: "public, max-age=3600, stale-while-revalidate=86400",
  short: "public, max-age=300, stale-while-revalidate=3600",
  noCache: "no-cache, no-store, must-revalidate",
  private: "private, max-age=3600, stale-while-revalidate=86400",
};

export const routeConfig = {
  home: {
    ...dynamicParams.isr,
    description: "Home page with hero section and featured projects",
  },
  about: {
    ...dynamicParams.isr,
    description: "About page with tech stack and experience",
  },
  projects: {
    ...dynamicParams.isr,
    description: "Projects listing with dynamic project details",
  },
  projectDetail: {
    ...dynamicParams.isr,
    description: "Individual project pages with detailed information",
  },
  contact: {
    ...dynamicParams.revalidateOnDemand,
    description: "Contact page with form",
  },
  admin: {
    revalidate: false,
    dynamic: "force-dynamic",
    description: "Admin panel requiring authentication",
  },
};
