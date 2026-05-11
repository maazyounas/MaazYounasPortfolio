/**
 * Image optimization utilities for Next.js
 * - Automatic format selection (WebP, AVIF)
 * - Responsive image sizing
 * - Lazy loading configuration
 * - Cache optimization
 */

export interface OptimizedImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export const imageConfig = {
  deviceSizes: [640, 750, 828, 1080, 1280, 1536],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  formats: ["image/avif", "image/webp"],
  minimumCacheTTL: 60,
};

export function getResponsiveSizes(containerWidth: number): string {
  return `
    (max-width: 640px) ${Math.min(containerWidth, 640)}px,
    (max-width: 1024px) ${Math.min(containerWidth, 1024)}px,
    ${containerWidth}px
  `.trim();
}

export function getImageQuality(priority: boolean = false): number {
  return priority ? 100 : 75;
}

export const responsiveImagePresets = {
  hero: {
    quality: 100,
    priority: true,
    sizes:
      "(max-width: 640px) 640px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, 1920px",
  },
  thumbnail: {
    quality: 75,
    priority: false,
    sizes: "(max-width: 640px) 320px, (max-width: 1024px) 400px, 500px",
  },
  banner: {
    quality: 85,
    priority: true,
    sizes:
      "(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px",
  },
  card: {
    quality: 75,
    priority: false,
    sizes: "(max-width: 640px) 320px, (max-width: 1024px) 400px, 500px",
  },
};

export const imageCacheHeaders = {
  public: "public, max-age=31536000, immutable",
  shared: "public, max-age=604800, stale-while-revalidate=2592000",
  revalidate: "public, max-age=3600, stale-while-revalidate=86400",
};
