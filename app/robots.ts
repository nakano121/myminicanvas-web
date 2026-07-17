import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/pins/", // internal pin-generator tool
      },
    ],
    sitemap: "https://myminicanvas.com/sitemap.xml",
  };
}
