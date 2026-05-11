import { MetadataRoute } from "next";
import { generateManifest } from "@/lib/seo/sitemap";

export default function manifest(): MetadataRoute.Manifest {
  return generateManifest() as MetadataRoute.Manifest;
}
