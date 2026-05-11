import { MetadataRoute } from "next";
import { generateSitemap } from "@/lib/seo/sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return generateSitemap();
}
