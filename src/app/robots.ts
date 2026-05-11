import { MetadataRoute } from "next";
import { generateRobots } from "@/lib/seo/sitemap";

export default function robots(): MetadataRoute.Robots {
  return generateRobots();
}
