import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "My Mini Canvas — Little Art, Big Stories",
  description:
    "The app that captures your child's drawings and the story behind them. Record their voice, generate bedtime stories, and keep memories forever — privately on your device.",
};

export default async function HomePage() {
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <Hero />
      <TrustBar />
      <Features />
      <HowItWorks />
      <PrivacyBadge />
      <Testimonials />
      <BlogPreview posts={posts} />
      <FinalCTA />
    </>
  );
}

/* ─────────────────────────── HERO ─────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-parchment pt-20 pb-24 px-6">
      {/* Warm gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-honey/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-coral/12 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-honey/20 text-honey-700 border border-honey/30 rounded-full px-4 py-1.5 text-sm font-medium">
            <span>🌙</span>
            <span className="text-ink/70">Coming soon to iPhone &amp; iPad</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-ink leading-[1.05] max-w-4xl">
            The story they tell about
            <br />
            their drawing{" "}
            <span className="text-coral">is the part worth keeping.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted max-w-2xl leading-relaxed">
            My Mini Canvas captures your child&apos;s voice alongside every drawing —
            then turns it into a bedtime story, a keepsake book, or a memory you&apos;ll
            treasure forever. Privately. On your device. No cloud required.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <a
              href="#waitlist"
              className="bg-coral text-white font-bold text-base px-8 py-4 rounded-full hover:bg-coral/90 active:scale-95 transition-all shadow-lg shadow-coral/30"
            >
              Get Early Access — It&apos;s Free
            </a>
            <a
              href="#how-it-works"
              className="text-muted font-medium text-base hover:text-ink transition-colors"
            >
              See how it works ↓
            </a>
          </div>

          {/* App mockup placeholder */}
          <div className="mt-8 relative">
            <div className="w-64 sm:w-72 h-[520px] sm:h-[580px] bg-white rounded-[3rem] shadow-2xl shadow-ink/20 border-8 border-ink/10 flex items-center justify-center overflow-hidden relative">
              {/* Screen content mock */}
              <div className="absolute inset-0 bg-gradient-to-b from-parchment to-coral-light/30 flex flex-col items-center justify-center gap-4 p-6">
                <div className="w-16 h-16 bg-coral/15 rounded-2xl flex items-center justify-center text-3xl">🎨</div>
                <div className="w-full h-40 bg-white/80 rounded-2xl shadow-sm flex items-center justify-center">
                  <span className="text-5xl">🏠</span>
                </div>
                <div className="w-full space-y-2">
                  <div className="h-4 bg-ink/10 rounded-full" />
                  <div className="h-4 bg-ink/10 rounded-full w-3/4" />
                  <div className="h-4 bg-coral/20 rounded-full w-1/2" />
                </div>
                <div className="flex gap-2 w-full">
                  <div className="flex-1 h-10 bg-coral rounded-xl" />
                  <div className="flex-1 h-10 bg-sage/30 rounded-xl" />
                </div>
              </div>
            </div>
            {/* Floating badges */}
            <div className="absolute -left-4 top-16 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 text-sm font-medium">
              <span>🎙️</span> <span className="text-ink">Voice recorded</span>
            </div>
            <div className="absolute -right-4 bottom-24 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 text-sm font-medium">
              <span>✨</span> <span className="text-ink">Story ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── TRUST BAR ─────────────────────────── */

function TrustBar() {
  const items = [
    { icon: "🔒", label: "No accounts ever" },
    { icon: "📱", label: "Stays on your phone" },
    { icon: "🎙️", label: "Voice never leaves device" },
    { icon: "👶", label: "No child data shared" },
    { icon: "☁️", label: "No cloud required" },
  ];

  return (
    <section className="bg-ink py-5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-white/70 text-sm">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FEATURES ─────────────────────────── */

function Features() {
  const features = [
    {
      icon: "📸",
      title: "Photograph the drawing",
      desc: "Snap it from your camera roll or take one right now. The drawing is the anchor — everything else builds from it.",
    },
    {
      icon: "🎙️",
      title: "Record their voice",
      desc: "Hit record as they explain what they drew. A three-year-old's narration of their scribble is the funniest, purest thing you'll ever hear.",
    },
    {
      icon: "✨",
      title: "AI turns it into a bedtime story",
      desc: "Claude AI reads their description and writes a personalised story — featuring their own character, their own details, their own world.",
    },
    {
      icon: "🖼️",
      title: "Generate an illustration",
      desc: "AI brings the story to life with a storybook illustration. The kind they'd hang on a gallery wall if galleries had walls for four-year-olds.",
    },
    {
      icon: "🌙",
      title: "Read it to them at bedtime",
      desc: "Dim the room. The app reads the story aloud with word-by-word highlighting. No screen-time guilt — it's their story.",
    },
    {
      icon: "📖",
      title: "Export a keepsake PDF",
      desc: "Export a beautiful storybook PDF — or your entire Memory Book — to share with grandparents, print, or treasure forever.",
    },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-coral font-semibold text-sm uppercase tracking-widest">Features</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-ink leading-tight">
            Everything you need.
            <br />
            Nothing you don&apos;t.
          </h2>
          <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
            No subscriptions to manage. No cloud accounts to create. No complicated setup.
            Just you, your child, and their art.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-parchment rounded-3xl p-7 hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-ink text-lg mb-2">{f.title}</h3>
              <p className="text-muted text-[15px] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── HOW IT WORKS ─────────────────────────── */

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Photograph any drawing",
      desc: "From a crayon masterpiece to a finger-paint abstract. It doesn't matter what it is — it matters that they made it.",
    },
    {
      n: "02",
      title: "Record what they say about it",
      desc: "One tap, then let them talk. The 'that's a rocket but it's also a dog' explanation you'll want to remember in twenty years.",
    },
    {
      n: "03",
      title: "Watch a story appear",
      desc: "My Mini Canvas turns their description into a warm, personal bedtime story — ready to read, share, or export as a beautiful PDF.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-parchment">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-coral font-semibold text-sm uppercase tracking-widest">How it works</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-ink leading-tight">
            Three steps. Two minutes.
            <br />
            One memory that lasts forever.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.n} className="relative">
              <div className="text-7xl font-black text-coral/10 leading-none mb-4">{step.n}</div>
              <h3 className="font-bold text-ink text-xl mb-3">{step.title}</h3>
              <p className="text-muted text-[15px] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── PRIVACY BADGE ─────────────────────────── */

function PrivacyBadge() {
  return (
    <section className="py-20 px-6 bg-sage">
      <div className="max-w-4xl mx-auto text-center text-white">
        <div className="text-4xl mb-6">🔒</div>
        <h2 className="text-3xl sm:text-4xl font-black mb-4">
          Your family&apos;s memories stay with your family.
        </h2>
        <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
          No accounts. No cloud sync. No AI training on your child&apos;s data.
          No analytics tracking. Everything lives on your device, under your control.
          When you delete a memory, it&apos;s gone — not archived somewhere else.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "No accounts required",
            "No child data transmitted",
            "Voice stays on device",
            "COPPA compliant design",
            "GDPR-friendly",
          ].map((badge) => (
            <span
              key={badge}
              className="bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full"
            >
              ✓ {badge}
            </span>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/privacy" className="text-white/70 underline underline-offset-4 text-sm hover:text-white transition-colors">
            Read our full Privacy Policy →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── TESTIMONIALS ─────────────────────────── */

function Testimonials() {
  const quotes = [
    {
      quote:
        "She explained a purple blob for four minutes straight. I had no idea what she was saying but I recorded every second. Now I know it was a princess who could breathe underwater.",
      author: "Parent of a 4-year-old",
    },
    {
      quote:
        "We exported a PDF storybook for his third birthday. His grandparents cried. He was very proud of the dragon (it was a house).",
      author: "Parent of a 3-year-old",
    },
    {
      quote:
        "The bedtime reading feature is genuinely magical. He asked to hear his own story three nights in a row.",
      author: "Parent of a 5-year-old",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-coral font-semibold text-sm uppercase tracking-widest">Early users</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-ink">What parents are saying</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <div key={q.author} className="bg-parchment rounded-3xl p-7">
              <p className="text-ink/80 text-[15px] leading-relaxed mb-5 italic">
                &ldquo;{q.quote}&rdquo;
              </p>
              <p className="text-coral text-sm font-semibold">— {q.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── BLOG PREVIEW ─────────────────────────── */

interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

function BlogPreview({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) return null;
  return (
    <section className="py-24 px-6 bg-parchment">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-coral font-semibold text-sm uppercase tracking-widest">From the blog</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black text-ink">For parents who love to think</h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-coral hover:text-coral/80 transition-colors no-underline"
          >
            All articles →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-3xl p-6 hover:shadow-md transition-shadow no-underline"
            >
              <span className="text-xs font-semibold text-coral uppercase tracking-wider">{post.category}</span>
              <h3 className="mt-2 font-bold text-ink text-[16px] leading-snug group-hover:text-coral transition-colors">
                {post.title}
              </h3>
              <p className="mt-2 text-muted text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
              <p className="mt-4 text-xs text-muted/60">{post.date}</p>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link href="/blog" className="text-coral font-semibold text-sm no-underline">
            See all articles →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FINAL CTA / WAITLIST ─────────────────────────── */

function FinalCTA() {
  return (
    <section id="waitlist" className="py-24 px-6 bg-coral">
      <div className="max-w-3xl mx-auto text-center text-white">
        <div className="text-4xl mb-6">🌙</div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4">
          The drawing fades.
          <br />
          The story shouldn&apos;t.
        </h2>
        <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          My Mini Canvas is launching on iPhone and iPad soon.
          Join the waitlist and be first to know — plus get exclusive early access.
        </p>

        {/* Waitlist form — simple mailto fallback until a form backend is wired */}
        <form
          action="mailto:hello@myminicanvas.com"
          method="post"
          encType="text/plain"
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            required
            className="flex-1 px-5 py-4 rounded-full bg-white text-ink placeholder-muted/60 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            className="bg-ink text-white font-bold px-7 py-4 rounded-full hover:bg-ink/90 active:scale-95 transition-all whitespace-nowrap"
          >
            Join Waitlist
          </button>
        </form>

        <p className="mt-5 text-white/50 text-xs">
          No spam. We&apos;ll only email you when we launch. Unsubscribe anytime.
        </p>

        {/* App Store badge coming soon */}
        <div className="mt-10 inline-flex items-center gap-3 bg-white/10 rounded-2xl px-6 py-3">
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          <div className="text-left">
            <p className="text-white/60 text-xs">Coming soon to the</p>
            <p className="text-white font-bold text-sm">App Store</p>
          </div>
        </div>
      </div>
    </section>
  );
}
