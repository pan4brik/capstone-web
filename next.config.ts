import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Serve the résumé at /resume. In production RESUME_URL points at an
    // off-repo copy (Vercel Blob); locally it falls back to public/resume.pdf.
    return [
      { source: "/resume", destination: process.env.RESUME_URL ?? "/resume.pdf" },
    ];
  },
};

export default nextConfig;
