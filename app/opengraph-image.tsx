import { ImageResponse } from "next/og";
import { siteConfig } from "@/app/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "#0a0a0a",
          color: "#ededed",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700 }}>{siteConfig.name}</div>
        <div style={{ fontSize: 36, color: "#60a5fa", marginTop: 16 }}>
          {siteConfig.role}
        </div>
        <div style={{ fontSize: 28, color: "#a1a1aa", marginTop: 24 }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    size,
  );
}
