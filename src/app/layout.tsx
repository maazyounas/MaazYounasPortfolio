import { ReactNode } from "react";
import { Metadata, Viewport } from "next";
import Script from "next/script";
import { Syne, Outfit } from "next/font/google";
import { getMetadataForPage, generateCanonicalUrl, generateStructuredData, pageMetadata, defaultMetadata } from "@/lib/seo/metadata";
import { generateOpenGraphMetadata } from "@/lib/seo/og";
import "./globals.css";
import Providers from "./providers";
import connectDB from "@/lib/server/db";
import GlobalSettings from "@/models/GlobalSettings";


const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://maazyounas.dev";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f13" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: defaultMetadata.title,
    template: "%s | Maaz Younas",
  },
  description: defaultMetadata.description,
  keywords: defaultMetadata.keywords,
  robots: "index,follow",
  authors: [
    {
      name: "Maaz Younas",
      url: baseUrl,
    },
  ],
  creator: "Maaz Younas",
  publisher: "Maaz Younas",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: defaultMetadata.title,
    description: defaultMetadata.description,
    siteName: "Maaz Younas",
    images: [
      {
        url: `${baseUrl}/og-image.avif`,
        width: 1200,
        height: 630,
        alt: defaultMetadata.title,
        type: "image/avif",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultMetadata.title,
    description: defaultMetadata.description,
    images: [`${baseUrl}/og-image.avif`],
    creator: "@maaz_younas",
  },
  icons: {
    icon: [
      { url: "/icon.png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: baseUrl,
    languages: {
      "en-US": baseUrl,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
    other: {
      "msvalidate.01": process.env.MS_VALIDATION || "",
    },
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  let serializedSettings = null;

  try {
    await connectDB();
    const settings = await GlobalSettings.findOne().lean();

    // Transform _id for serialization
    if (settings) {
      serializedSettings = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(settings as any),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _id: String((settings as any)._id)
      };
    }
  } catch (error) {
    console.error("Layout Database Error:", error);
  }

  const structuredData = generateStructuredData("Organization", {
    sameAs: [
      "https://github.com/maaz-younas",
      "https://linkedin.com/in/maaz-younas",
      "https://twitter.com/maaz_younas",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "contact@maazyounas.dev",
      url: `${baseUrl}/contact`,
    },
  });

  return (
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${outfit.variable}`}>
      <head>

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Monitoring and Analytics (will be configured in .env) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="lazyOnload"
            />
            <Script
              id="google-analytics"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        <Providers initialSettings={serializedSettings}>{children}</Providers>
      </body>
    </html>
  );
}
