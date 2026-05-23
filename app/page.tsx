import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, type PostMeta } from "@/lib/posts";
import { WaitlistForm } from "@/components/WaitlistForm";
import { AppPreview } from "@/components/AppPreview";

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
      <TrustTicker />
      <AppPreview />
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

function PhoneScreen() {
  const waveHeights = [3, 5, 8, 4, 10, 6, 9, 4, 7, 5, 8, 3, 6, 9, 5, 7, 4, 6];
  return (
    <div className="relative w-[270px] mx-auto">
      {/* Ground shadow */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-6 bg-ink/15 blur-2xl rounded-full" />

      {/* Phone frame */}
      <div className="relative bg-ink rounded-[3.2rem] p-[10px] shadow-2xl shadow-ink/40 animate-float">
        {/* Screen */}
        <div className="bg-parchment rounded-[2.6rem] overflow-hidden h-[550px] flex flex-col">

          {/* Dynamic island */}
          <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
            <div className="w-[112px] h-[30px] bg-ink rounded-full" />
          </div>

          {/* App UI */}
          <div className="flex-1 px-4 pb-4 flex flex-col gap-2.5 overflow-hidden">

            {/* App header */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-[9px] text-muted font-medium tracking-wide uppercase">Good evening</p>
                <p className="text-[13px] font-bold text-ink">Mia&apos;s Canvas</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-coral flex items-center justify-center shadow-sm shadow-coral/40">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>

            {/* Drawing card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex-1 min-h-0">
              {/* Drawing area */}
              <div className="bg-honey-light h-[130px] flex items-center justify-center relative overflow-hidden">
                <svg viewBox="0 0 140 100" className="w-36 h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Sky bg */}
                  <rect width="140" height="100" fill="#FEF0D4"/>
                  {/* Sun */}
                  <circle cx="22" cy="20" r="11" fill="#F0A130" opacity="0.75"/>
                  <line x1="22" y1="5" x2="22" y2="1" stroke="#F0A130" strokeWidth="2" opacity="0.5"/>
                  <line x1="33" y1="9" x2="36" y2="6" stroke="#F0A130" strokeWidth="2" opacity="0.5"/>
                  {/* Cloud */}
                  <ellipse cx="100" cy="18" rx="14" ry="8" fill="white" opacity="0.9"/>
                  <circle cx="92" cy="16" r="7" fill="white" opacity="0.9"/>
                  <circle cx="108" cy="14" r="8" fill="white" opacity="0.9"/>
                  {/* Rocket */}
                  <ellipse cx="118" cy="30" rx="5" ry="14" fill="#E8572D"/>
                  <circle cx="118" cy="16" r="5" fill="#C03E18"/>
                  <path d="M113 44 C113 48 118 52 123 48" fill="#F0A130"/>
                  <rect x="108" y="32" width="5" height="10" rx="1" fill="#C03E18"/>
                  <rect x="123" y="32" width="5" height="10" rx="1" fill="#C03E18"/>
                  {/* Ground */}
                  <rect y="80" width="140" height="20" fill="#6B9678"/>
                  {/* House body */}
                  <rect x="28" y="50" width="68" height="34" fill="#FAF4EB" stroke="#E8572D" strokeWidth="1.5"/>
                  {/* Roof */}
                  <polygon points="20,52 62,20 104,52" fill="#C03E18"/>
                  {/* Door */}
                  <rect x="50" y="65" width="24" height="19" rx="12 12 0 0" fill="#241F1C" opacity="0.7"/>
                  {/* Windows */}
                  <rect x="34" y="58" width="14" height="12" rx="2" fill="#F0A130" opacity="0.8"/>
                  <rect x="76" y="58" width="14" height="12" rx="2" fill="#F0A130" opacity="0.8"/>
                  {/* Chimney */}
                  <rect x="78" y="28" width="8" height="20" fill="#6D6058"/>
                  <circle cx="82" cy="24" r="4" fill="white" opacity="0.45"/>
                  <circle cx="85" cy="19" r="3" fill="white" opacity="0.3"/>
                </svg>
              </div>

              {/* Card info */}
              <div className="p-3">
                <p className="text-[11px] font-bold text-ink">A house with a rocket</p>
                <p className="text-[10px] text-muted mt-0.5">Mia, age 4 · Today</p>

                {/* Voice waveform */}
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-6 h-6 bg-coral/12 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-coral" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zm7 11a7 7 0 0 1-14 0H3a9 9 0 0 0 8 8.94V22H8v2h8v-2h-3v-1.06A9 9 0 0 0 21 12z"/>
                    </svg>
                  </div>
                  <div className="flex items-end gap-[2px] h-4 flex-1">
                    {waveHeights.map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-coral rounded-full"
                        style={{ height: `${Math.min(h * 1.3, 14)}px`, opacity: 0.35 + (i % 4) * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Story preview */}
            <div className="bg-coral rounded-xl p-3 flex-shrink-0">
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-3 h-3 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <p className="text-[10px] font-bold text-white">Bedtime story ready</p>
              </div>
              <p className="text-[9px] text-white/75 leading-relaxed line-clamp-2">
                Once upon a time, there was a little house who dreamed of touching the stars...
              </p>
            </div>

            {/* Bottom tab bar */}
            <div className="flex justify-around items-center pt-1 flex-shrink-0 border-t border-ink/5">
              {[
                { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Home", active: true },
                { icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", label: "Gallery", active: false },
                { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", label: "Stories", active: false },
                { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z", label: "Settings", active: false },
              ].map((tab) => (
                <div key={tab.label} className="flex flex-col items-center gap-0.5">
                  <svg
                    className={`w-4 h-4 ${tab.active ? "text-coral" : "text-muted/50"}`}
                    fill="none" stroke="currentColor" strokeWidth={tab.active ? 2.5 : 1.8} viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                  </svg>
                  {tab.active && <div className="w-1 h-1 rounded-full bg-coral" />}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-parchment">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-honey/20 rounded-full blur-[140px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-coral/10 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-20 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left: copy */}
          <div className="flex flex-col gap-7 lg:pr-8">
            {/* Badge */}
            <div className="animate-fade-slide-up">
              <div className="inline-flex items-center gap-2 bg-honey/20 border border-honey/30 rounded-full px-4 py-1.5 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-honey animate-pulse" />
                <span className="text-ink/70">Coming soon to iPhone &amp; iPad</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-slide-up delay-100 font-display text-5xl sm:text-6xl lg:text-[4.2rem] font-semibold text-ink leading-[1.08] tracking-tight">
              The story they tell about their drawing{" "}
              <em className="not-italic text-coral">is the part worth keeping.</em>
            </h1>

            {/* Subheadline */}
            <p className="animate-fade-slide-up delay-200 text-lg text-muted leading-relaxed max-w-[480px]">
              My Mini Canvas captures your child&apos;s voice alongside every drawing —
              then turns it into a bedtime story and a keepsake book.
              Privately. On your device. No cloud required.
            </p>

            {/* CTAs */}
            <div className="animate-fade-slide-up delay-300 flex flex-col sm:flex-row gap-4 items-start">
              <a
                href="#waitlist"
                className="bg-coral text-white font-bold text-base px-8 py-4 rounded-full hover:bg-coral-dark active:scale-95 transition-all shadow-lg shadow-coral/30 whitespace-nowrap"
              >
                Get Early Access — It&apos;s Free
              </a>
              <a
                href="#how-it-works"
                className="flex items-center gap-2 text-muted font-medium text-base hover:text-ink transition-colors pt-1"
              >
                See how it works
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

            {/* Social proof micro-line */}
            <p className="animate-fade-slide-up delay-400 text-sm text-muted/70">
              🔒 No account needed &nbsp;·&nbsp; 📱 100% on-device &nbsp;·&nbsp; 🆓 Free to join waitlist
            </p>
          </div>

          {/* Right: phone */}
          <div className="flex justify-center lg:justify-end animate-fade-slide-up delay-300 relative">
            <div className="relative">
              <PhoneScreen />

              {/* Voice badge */}
              <div className="absolute -left-12 top-24 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-3 border border-black/[0.06] animate-fade-slide-up delay-600 min-w-[160px]">
                <div className="w-9 h-9 bg-coral/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-coral" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zm7 11a7 7 0 0 1-14 0H3a9 9 0 0 0 8 8.94V22H8v2h8v-2h-3v-1.06A9 9 0 0 0 21 12z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-ink leading-tight">Voice recorded</p>
                  <div className="mt-1.5 flex items-end gap-[2px] h-4">
                    {[3,6,4,9,5,8,4,7,5,9,4,6,3,8,5,7].map((h, i) => (
                      <div
                        key={i}
                        className="w-[3px] bg-coral rounded-full"
                        style={{ height: `${Math.min(h * 1.4, 14)}px`, opacity: 0.4 + (i % 3) * 0.18 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Story badge */}
              <div className="absolute -right-10 bottom-36 bg-white rounded-2xl shadow-xl p-3 max-w-[186px] border border-black/[0.06] animate-fade-slide-up delay-700">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-5 h-5 bg-sage/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-sage" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <p className="text-[11px] font-bold text-sage">Story ready</p>
                </div>
                <p className="text-[10px] text-muted leading-snug">
                  &ldquo;Once upon a time, a little house learned it could fly to the moon...&rdquo;
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── TRUST TICKER ─────────────────────────── */

function TrustTicker() {
  const items = [
    { icon: "🔒", text: "No accounts ever" },
    { icon: "📱", text: "Stays on your device" },
    { icon: "🎙️", text: "Voice never leaves device" },
    { icon: "👶", text: "No child data transmitted" },
    { icon: "☁️", text: "No cloud required" },
    { icon: "🛡️", text: "COPPA-aware design" },
    { icon: "✓", text: "GDPR-friendly" },
    { icon: "🇸🇬", text: "Singapore-based company" },
  ];
  const doubled = [...items, ...items];

  return (
    <div className="bg-ink py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-7 text-white/55 text-sm font-medium">
            <span>{item.icon}</span>
            <span>{item.text}</span>
            <span className="ml-5 text-white/15">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── FEATURES ─────────────────────────── */

function Features() {
  const features: { icon: React.ReactNode; accent: string; title: string; desc: string }[] = [
    {
      icon: (
        <svg className="w-6 h-6 text-coral" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      accent: "bg-coral",
      title: "Photograph the drawing",
      desc: "Snap it from your camera roll or take one now. Any crayon scribble or finger-paint masterpiece — if they made it, it matters.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-honey" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      accent: "bg-honey",
      title: "Record their voice",
      desc: "Hit record as they explain what they drew. A three-year-old's narration of their scribble is the funniest, purest thing you'll ever hear.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      accent: "bg-sage",
      title: "AI writes a bedtime story",
      desc: "Claude AI reads their description and writes a personalised story — featuring their own character, details, and world.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-coral" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      accent: "bg-coral",
      title: "Generate an illustration",
      desc: "AI brings the story to life with a storybook illustration. The kind they'd hang on a gallery wall, if galleries had walls for four-year-olds.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-honey" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
        </svg>
      ),
      accent: "bg-honey",
      title: "Read it at bedtime",
      desc: "Dim the room. The app reads the story aloud with word-by-word highlighting. No screen-time guilt — it's their story.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      accent: "bg-sage",
      title: "Export a keepsake PDF",
      desc: "Export a beautiful storybook PDF — or your entire Memory Book — to share with grandparents, print, or treasure forever.",
    },
  ];

  return (
    <section id="features" className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-coral font-semibold text-sm uppercase tracking-widest">What it does</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold text-ink leading-tight mt-4">
            Everything you need.
            <br />
            Nothing you don&apos;t.
          </h2>
          <p className="mt-5 text-muted text-lg max-w-lg mx-auto leading-relaxed">
            No subscriptions to manage. No cloud accounts to create. Just you, your child, and their art.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-parchment rounded-3xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`h-[3px] ${f.accent}`} />
              <div className="p-7">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-ink/5">
                  {f.icon}
                </div>
                <h3 className="font-bold text-ink text-lg mb-2.5">{f.title}</h3>
                <p className="text-muted text-[15px] leading-relaxed">{f.desc}</p>
              </div>
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
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Photograph any drawing",
      desc: "From a crayon masterpiece to a finger-paint abstract — it doesn't matter what it is. It matters that they made it.",
    },
    {
      n: "02",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      title: "Record what they say",
      desc: "One tap, then let them talk. The \"it's a rocket but also a dog\" explanation you'll want to remember in twenty years.",
    },
    {
      n: "03",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Watch a story appear",
      desc: "My Mini Canvas turns their words into a warm, personal bedtime story — ready to read aloud, share, or export as a beautiful PDF.",
    },
  ];

  return (
    <section id="how-it-works" className="py-28 px-6 bg-parchment-warm">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-coral font-semibold text-sm uppercase tracking-widest">How it works</span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold text-ink leading-tight">
            Three steps.
            <br />
            One memory that lasts forever.
          </h2>
        </div>

        {/* Steps with connecting lines */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[3.25rem] left-[calc(33.333%+1rem)] right-[calc(33.333%+1rem)] h-[2px]">
            <div className="w-full h-full border-t-2 border-dashed border-coral/25" />
          </div>

          {steps.map((step, i) => (
            <div key={step.n} className="relative flex flex-col">
              {/* Ghost number */}
              <div className="font-display text-[6rem] font-bold text-coral/8 leading-none select-none absolute -top-8 -left-4 pointer-events-none">
                {step.n}
              </div>

              {/* Icon circle */}
              <div className="relative w-14 h-14 bg-coral rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-coral/25 flex-shrink-0 z-10">
                {step.icon}
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-parchment-warm border-2 border-coral/30 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-coral">{i + 1}</span>
                </div>
              </div>

              <h3 className="font-bold text-ink text-xl mb-3 relative z-10">{step.title}</h3>
              <p className="text-muted text-[15px] leading-relaxed relative z-10">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── PRIVACY BADGE ─────────────────────────── */

function PrivacyBadge() {
  const badges = [
    "No accounts required",
    "No child data transmitted",
    "Voice stays on device",
    "COPPA-aware design",
    "GDPR-friendly",
  ];

  return (
    <section className="py-24 px-6 bg-sage">
      <div className="max-w-4xl mx-auto text-center text-white">
        {/* Shield icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15 rounded-2xl mb-8">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-5 leading-tight">
          Your family&apos;s memories stay<br />with your family.
        </h2>
        <p className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          No accounts. No cloud sync. No AI training on your child&apos;s data.
          No analytics tracking. Everything lives on your device, under your control.
          When you delete a memory, it&apos;s gone — not archived somewhere else.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-2 bg-white/15 text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20"
            >
              <svg className="w-3.5 h-3.5 text-white/80" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {badge}
            </span>
          ))}
        </div>

        <Link href="/privacy" className="text-white/60 underline underline-offset-4 text-sm hover:text-white transition-colors">
          Read our full Privacy Policy →
        </Link>
      </div>
    </section>
  );
}

/* ─────────────────────────── TESTIMONIALS ─────────────────────────── */

function Testimonials() {
  const quotes = [
    {
      quote:
        "She explained a purple blob for four minutes straight. I had no idea what she was saying, but I recorded every second. Now I know it was a princess who could breathe underwater.",
      author: "Parent of a 4-year-old",
      rating: 5,
    },
    {
      quote:
        "We exported a PDF storybook for his third birthday. His grandparents cried. He was very proud of the dragon. It was a house.",
      author: "Parent of a 3-year-old",
      rating: 5,
    },
    {
      quote:
        "The bedtime reading feature is genuinely magical. He asked to hear his own story three nights in a row.",
      author: "Parent of a 5-year-old",
      rating: 5,
    },
  ];

  return (
    <section className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-coral font-semibold text-sm uppercase tracking-widest">Early families</span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold text-ink leading-tight">
            What parents are saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <div
              key={q.author}
              className="bg-parchment rounded-3xl p-8 hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: q.rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-honey" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              {/* Opening quote mark */}
              <p className="font-display text-6xl text-coral/20 leading-none -mb-2">&ldquo;</p>

              <p className="text-ink/80 text-[15px] leading-relaxed flex-1">{q.quote}</p>

              <p className="mt-6 text-coral text-sm font-semibold">— {q.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── BLOG PREVIEW ─────────────────────────── */

const CATEGORY_COLORS: Record<string, string> = {
  "Parenting & Art": "bg-coral",
  "Memory Keeping": "bg-honey",
  "Practical Guides": "bg-sage",
  "Stories & Inspiration": "bg-ink",
};

function BlogPreview({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) return null;

  return (
    <section className="py-28 px-6 bg-parchment">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-coral font-semibold text-sm uppercase tracking-widest">From the blog</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-ink">
              For parents who love to think
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-coral hover:text-coral-dark transition-colors no-underline"
          >
            All articles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-3xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 no-underline flex flex-col"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2 h-2 rounded-full ${CATEGORY_COLORS[post.category] ?? "bg-muted"}`} />
                  <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
                <h3 className="font-bold text-ink text-[16px] leading-snug group-hover:text-coral transition-colors flex-1">
                  {post.title}
                </h3>
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

        <div className="mt-8 text-center sm:hidden">
          <Link href="/blog" className="text-coral font-semibold text-sm no-underline">
            See all articles →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FINAL CTA ─────────────────────────── */

function FinalCTA() {
  return (
    <section id="waitlist" className="py-28 px-6 bg-coral relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-ink/10 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center text-white relative">
        {/* Moon icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-8">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
          </svg>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight mb-5">
          The drawing fades.
          <br />
          The story shouldn&apos;t.
        </h2>

        <p className="text-white/75 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          My Mini Canvas is launching on iPhone and iPad soon.
          Join the waitlist — free, one email when we&apos;re live.
        </p>

        <WaitlistForm dark />

        <p className="mt-5 text-white/45 text-xs">
          No spam. One email when we launch. Unsubscribe anytime.
        </p>

        <div className="mt-12 inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-6 py-3.5">
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          <div className="text-left">
            <p className="text-white/55 text-xs">Coming soon to the</p>
            <p className="text-white font-bold text-sm tracking-wide">App Store</p>
          </div>
        </div>
      </div>
    </section>
  );
}
