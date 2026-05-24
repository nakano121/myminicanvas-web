import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/posts";
import { WaitlistForm } from "@/components/WaitlistForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://myminicanvas.com/blog/${slug}`,
      publishedTime: post.date,
    },
    alternates: { canonical: `https://myminicanvas.com/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="bg-parchment min-h-screen">
      {/* Hero */}
      <div className="relative">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-ink/60" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-coral font-semibold text-sm uppercase tracking-widest">{post.category}</span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-black text-white leading-tight max-w-2xl">{post.title}</h1>
          <div className="flex items-center justify-center gap-3 mt-4 text-white/60 text-sm">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-2xl mx-auto px-6 py-14">
        <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-ink prose-p:text-ink/80 prose-p:leading-relaxed prose-a:text-coral prose-a:no-underline hover:prose-a:underline">
          <MDXRemote source={post.content} />
        </div>

        {/* CTA */}
        <div className="mt-16 bg-coral rounded-3xl p-8 text-center text-white">
          <div className="flex justify-center mb-3">
            <svg className="w-8 h-8 text-white/90" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
            </svg>
          </div>
          <h3 className="text-xl font-black mb-2">Ready to start keeping their stories?</h3>
          <p className="text-white/80 text-sm mb-6">
            My Mini Canvas launches soon. Join the waitlist — free, one email when we&apos;re live.
          </p>
          <WaitlistForm dark />
        </div>

        {/* Back */}
        <div className="mt-10 text-center">
          <Link href="/blog" className="text-muted text-sm hover:text-ink transition-colors no-underline">
            ← Back to all articles
          </Link>
        </div>
      </article>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: {
              "@type": "Organization",
              name: "My Mini Canvas",
              url: "https://myminicanvas.com",
            },
            publisher: {
              "@type": "Organization",
              name: "GOODTECH HLDGS PTE. LTD.",
              url: "https://myminicanvas.com",
            },
            mainEntityOfPage: `https://myminicanvas.com/blog/${slug}`,
          }),
        }}
      />
    </div>
  );
}
