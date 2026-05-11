import { ImageResponse } from "next/og";

/**
 * Social media image generation for OpenGraph and Twitter Cards
 */
export async function generateOgImage(
  title: string,
  description: string,
  type: "website" | "article" | "profile" = "website",
) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0f0f13 0%, #1a1a24 100%)",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            maxWidth: "1000px",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              style={{
                fontSize: "36px",
                color: "#d7d7e6",
                margin: 0,
                lineHeight: 1.3,
                fontWeight: 400,
              }}
            >
              {description}
            </p>
          )}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "40px",
            }}
          >
            <div
              style={{
                width: "100px",
                height: "4px",
                background: "linear-gradient(90deg, #ef4444, #be123c)",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateTwitterCard(
  title: string,
  description: string,
  image: string,
) {
  return {
    card: "summary_large_image",
    title,
    description,
    image,
    creator: "@maaz_younas",
  };
}

export function generateOpenGraphMetadata(
  title: string,
  description: string,
  url: string,
  image: string,
  type: "website" | "article" | "profile" = "website",
) {
  return {
    title,
    description,
    type,
    url,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title,
        type: "image/jpeg",
      },
    ],
    siteName: "Maaz Younas | Full-Stack Developer",
    locale: "en_US",
  };
}
