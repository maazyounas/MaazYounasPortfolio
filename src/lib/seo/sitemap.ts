import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://maazyounas.dev";

export function generateSitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  return staticPages;
}

export function generateRobots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/_next", "/static"],
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

export function generateManifest(): Record<string, unknown> {
  return {
    name: "Maaz Younas | Full-Stack Developer",
    short_name: "Maaz Younas",
    description:
      "Full-stack developer specializing in modern web technologies and scalable solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f13",
    theme_color: "#ef4444",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["business", "productivity"],
    shortcuts: [
      {
        name: "View Projects",
        short_name: "Projects",
        description: "View my portfolio projects",
        url: "/projects",
        icons: [
          { src: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
        ],
      },
      {
        name: "Get In Touch",
        short_name: "Contact",
        description: "Contact me for collaboration",
        url: "/contact",
        icons: [
          { src: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
        ],
      },
    ],
  };
}
