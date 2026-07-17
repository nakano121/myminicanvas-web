import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Parenting, Art & Family Memories",
  description:
    "Thoughtful articles for parents who love capturing the little moments. Drawing development, memory keeping, bedtime rituals, and the art of listening to your kids.",
  openGraph: {
    title: "My Mini Canvas Blog — Little Art, Big Stories",
    description:
      "Thoughtful articles for parents who love capturing the little moments.",
    url: "https://myminicanvas.com/blog",
  },
  alternates: { canonical: "https://myminicanvas.com/blog/" },
};

const CATEGORIES = [
  "All",
  "Parenting & Art",
  "Memory Keeping",
  "Practical Guides",
  "Stories & Inspiration",
];

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="bg-parchment min-h-screen">
      {/* Header */}
      <div className="bg-ink py-20 px-6 text-center">
        <span className="text-coral font-semibold text-sm uppercase tracking-widest">The Blog</span>
        <h1 className="mt-3 text-4xl sm:text-5xl font-black text-white leading-tight">
          Little Art, Big Ideas
        </h1>
        <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
          Thinking deeply about children&apos;s creativity, family memory, and the stories that
          make childhood worth keeping.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {posts.length === 0 ? (
          <p className="text-center text-muted py-20">No articles yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-3xl overflow-hidden hover:shadow-md transition-all no-underline flex flex-col"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-semibold text-coral uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h2 className="mt-2 font-bold text-ink text-[17px] leading-snug group-hover:text-coral transition-colors flex-1">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-muted text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-muted/60">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
