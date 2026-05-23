import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

// Per-category fallback images (Unsplash, free to use)
const CATEGORY_IMAGES: Record<string, string> = {
  "Parenting & Art":
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
  "Memory Keeping":
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
  "Practical Guides":
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
  "Stories & Inspiration":
    "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&q=80",
};

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  keywords: string[];
  readTime: string;
  image: string;
}

export interface Post extends PostMeta {
  content: string;
}

export async function getAllPosts(): Promise<PostMeta[]> {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
    const { data } = matter(raw);
    const category = data.category ?? "General";
    return {
      slug,
      title: data.title ?? "",
      excerpt: data.excerpt ?? "",
      date: data.date ?? "",
      category,
      keywords: data.keywords ?? [],
      readTime: data.readTime ?? "5 min read",
      image: data.image ?? CATEGORY_IMAGES[category] ?? CATEGORY_IMAGES["Parenting & Art"],
    } as PostMeta;
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  const filepath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);
  const category = data.category ?? "General";
  return {
    slug,
    title: data.title ?? "",
    excerpt: data.excerpt ?? "",
    date: data.date ?? "",
    category,
    keywords: data.keywords ?? [],
    readTime: data.readTime ?? "5 min read",
    image: data.image ?? CATEGORY_IMAGES[category] ?? CATEGORY_IMAGES["Parenting & Art"],
    content,
  };
}
