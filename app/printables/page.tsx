import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/AppStoreButton";

export const metadata: Metadata = {
  // Keyword-rich for Pinterest/Google search (parents search these exact phrases).
  title: "Free Drawing Prompts & Colouring Pages for Kids — My Mini Canvas",
  description:
    "Free printable drawing prompts and colouring pages for toddlers and preschoolers — perfect for rainy days. Then turn their drawing into a personalised bedtime story.",
  alternates: { canonical: "https://myminicanvas.com/printables" },
  openGraph: {
    title: "Free Drawing Prompts for Little Artists",
    description:
      "Printable drawing prompts & colouring pages for kids — print, draw, then turn it into a bedtime story.",
    url: "https://myminicanvas.com/printables",
    type: "website",
  },
};

const PROMPTS: { emoji: string; title: string; prompt: string }[] = [
  { emoji: "🐉", title: "A friendly monster", prompt: "Draw a monster who's actually very kind. What's its name? What does it eat for breakfast?" },
  { emoji: "🌳", title: "Your dream treehouse", prompt: "Draw the treehouse you'd build if you could. Who lives there with you?" },
  { emoji: "🚀", title: "If you could fly", prompt: "Where would you go first? Draw the very first place you'd visit." },
  { emoji: "🌊", title: "Bottom of the ocean", prompt: "Draw what you think is hiding at the very bottom of the sea." },
  { emoji: "🦸", title: "Family of superheroes", prompt: "Draw your whole family as superheroes. What is everyone's secret power?" },
  { emoji: "🎨", title: "The silliest creature", prompt: "Draw the silliest creature you can imagine. Ten legs? Wings? A favourite hat?" },
];

export default function PrintablesPage() {
  return (
    <section className="bg-parchment">
      {/* Hero (hidden when printing) */}
      <div className="print:hidden relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-honey/20 rounded-full blur-[140px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 pt-20 pb-10 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink leading-tight tracking-tight">
            Free drawing prompts for{" "}
            <em className="not-italic text-coral">little artists</em>
          </h1>
          <p className="mt-5 text-lg text-muted leading-relaxed max-w-xl mx-auto">
            Print one out, hand over the crayons, and watch what their imagination does.
            Then — the magic part — turn their drawing into a personalised bedtime story.
          </p>
          <p className="mt-4 text-sm text-muted/70">
            Tap a card, then <strong>Print</strong> or <strong>Save as PDF</strong> for your little one. Free, forever.
          </p>
        </div>
      </div>

      {/* Prompt cards */}
      <div className="max-w-5xl mx-auto px-6 pb-8 grid grid-cols-1 sm:grid-cols-2 gap-6 print:block print:px-0">
        {PROMPTS.map((p) => (
          <article
            key={p.title}
            className="bg-white rounded-3xl border border-ink/8 shadow-sm overflow-hidden flex flex-col print:break-after-page print:border-0 print:shadow-none print:rounded-none"
          >
            <div className="px-6 pt-6 pb-4">
              <div className="text-3xl mb-2" aria-hidden>{p.emoji}</div>
              <h2 className="font-display text-2xl font-semibold text-ink">{p.title}</h2>
              <p className="mt-2 text-muted leading-relaxed">{p.prompt}</p>
            </div>
            {/* Draw-here area */}
            <div className="mx-6 mb-4 flex-1 min-h-[260px] rounded-2xl border-2 border-dashed border-coral/30 flex items-end justify-center">
              <span className="text-coral/40 text-sm font-medium mb-3">draw here ✏️</span>
            </div>
            {/* Branded footer — travels onto every printed fridge sheet */}
            <div className="px-6 pb-5 flex items-center justify-between text-xs">
              <span className="text-muted/60">Made for {p.title.toLowerCase()} · My Mini Canvas</span>
              <span className="text-coral font-semibold">myminicanvas.com</span>
            </div>
          </article>
        ))}
      </div>

      {/* Funnel CTA (hidden when printing) */}
      <div className="print:hidden bg-coral">
        <div className="max-w-2xl mx-auto px-6 py-16 text-center text-white">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight">
            Loved what they drew?
          </h2>
          <p className="mt-4 text-white/80 text-lg leading-relaxed">
            Snap it, let them tell you about it, and My Mini Canvas turns it into a
            personalised bedtime story and watercolour illustration — in their own words.
          </p>
          <div className="mt-8 flex justify-center">
            <AppStoreButton variant="light" />
          </div>
          <p className="mt-4 text-white/55 text-sm">Free to start · No account · Private on your device</p>
          <p className="mt-8 text-sm">
            <Link href="/" className="text-white/80 underline underline-offset-4 hover:text-white">
              See how My Mini Canvas works →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
