// Dynamic OG image — thesis-led social share card without external image assets.
import { ImageResponse } from "next/og";
import { seoDefaults, siteConfig } from "@/content/site";

export const runtime = "edge";
export const alt = seoDefaults.ogTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          backgroundColor: "#0B1220",
          color: "#F4F6FB",
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            marginBottom: 24,
            color: "#7FB7FF",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 32,
            lineHeight: 1.4,
            maxWidth: 900,
            color: "#F4F6FB",
          }}
        >
          {seoDefaults.ogDescription}
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 20,
            color: "#2952E3",
          }}
        >
          {siteConfig.domain}
        </div>
      </div>
    ),
    { ...size },
  );
}
