"use client";

import { useState } from "react";
import Link from "next/link";
import { AppStoreButton } from "@/components/AppStoreButton";

const PROMPTS: { emoji: string; title: string; prompt: string }[] = [
  { emoji: "🐉", title: "A friendly monster", prompt: "Draw a monster who's actually very kind. What's its name? What does it eat for breakfast?" },
  { emoji: "🌳", title: "Your dream treehouse", prompt: "Draw the treehouse you'd build if you could. Who lives there with you?" },
  { emoji: "🚀", title: "If you could fly", prompt: "Where would you go first? Draw the very first place you'd visit." },
  { emoji: "🌊", title: "Bottom of the ocean", prompt: "Draw what you think is hiding at the very bottom of the sea." },
  { emoji: "🦸", title: "Family of superheroes", prompt: "Draw your whole family as superheroes. What is everyone's secret power?" },
  { emoji: "🎨", title: "The silliest creature", prompt: "Draw the silliest creature you can imagine. Ten legs? Wings? A favourite hat?" },
];

export default function PrintablesPage() {
  const [printing, setPrinting] = useState<number | null>(null);

  function printCard(i: number) {
    setPrinting(i);
    // let the .print-me class apply before the print dialog reads styles
    setTimeout(() => {
      window.print();
      setPrinting(null);
    }, 60);
  }

  return (
    <section className="bg-parchment">
      {/* print rules: show ONLY the tapped card, hide everything else */}
      <style>{`
        @media print {
          .print-hide { display: none !important; }
          .pcard { display: none !important; }
          .pcard.print-me { display: flex !important; box-shadow: none !important; border: none !important; }
          .pcard.print-me .draw-area { min-height: 60vh !important; }
          @page { margin: 1.4cm; }
        }
      `}</style>

      {/* Hero */}
      <div className="print-hide relative overflow-hidden">
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
            <strong>Tap any card</strong> to print it (or save it as a PDF) for your little one. Free, forever.
          </p>
        </div>
      </div>

      {/* Prompt cards — each is a button that prints itself */}
      <div className="max-w-5xl mx-auto px-6 pb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {PROMPTS.map((p, i) => (
          <div
            key={p.title}
            role="button"
            tabIndex={0}
            onClick={() => printCard(i)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); printCard(i); } }}
            className={`pcard bg-white rounded-3xl border border-ink/8 shadow-sm overflow-hidden flex flex-col cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 ${printing === i ? "print-me" : ""}`}
          >
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-start justify-between gap-3">
                <div className="text-3xl" aria-hidden>{p.emoji}</div>
                <span className="print-hide text-xs font-semibold text-coral bg-coral/10 rounded-full px-3 py-1 whitespace-nowrap">🖨️ Tap to print</span>
              </div>
              <h2 className="font-display text-2xl font-semibold text-ink mt-2">{p.title}</h2>
              <p className="mt-2 text-muted leading-relaxed">{p.prompt}</p>
            </div>
            <div className="draw-area mx-6 mb-4 flex-1 min-h-[260px] rounded-2xl border-2 border-dashed border-coral/30 flex items-end justify-center">
              <span className="print-hide text-coral/40 text-sm font-medium mb-3">draw here ✏️</span>
            </div>
            <div className="px-6 pb-5 flex items-center justify-between text-xs">
              <span className="text-muted/60">A drawing prompt from My Mini Canvas</span>
              <span className="text-coral font-semibold">myminicanvas.com</span>
            </div>
          </div>
        ))}
      </div>

      {/* Funnel CTA */}
      <div className="print-hide bg-coral">
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
