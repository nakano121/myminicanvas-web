import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://myminicanvas.com/blog/${post.slug}/`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    {
      url: "https://myminicanvas.com/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://myminicanvas.com/blog/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://myminicanvas.com/privacy/",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://myminicanvas.com/terms/",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://myminicanvas.com/printables/",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://myminicanvas.com/create/",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://myminicanvas.com/support/",
      changeFrequency: "monthly",
      priority: 0.4,
    },
    ...blogEntries,
  ];
}
