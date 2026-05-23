import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",        // Static HTML export — works on Cloudflare Pages with zero adapter setup
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    unoptimized: true,     // Required for static export; Unsplash serves its own CDN-optimised URLs
  },
  trailingSlash: true,     // Cloudflare Pages expects index.html per directory
};

export default nextConfig;
