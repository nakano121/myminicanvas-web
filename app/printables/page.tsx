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

/* ------------------------------------------------------------------ */
/* Colouring-page line art — bold, simple outlines built for crayons.  */
/* Each is a 1:1 SVG that scales to fill its card / the printed page.   */
/* ------------------------------------------------------------------ */
const svgProps = {
  viewBox: "0 0 200 200",
  width: "100%",
  height: "100%",
  preserveAspectRatio: "xMidYMid meet" as const,
  fill: "none",
  stroke: "#2A2A2A",
  strokeWidth: 4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ColSun() {
  const rays = Array.from({ length: 12 }).map((_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    return (
      <line key={i} x1={100 + 54 * Math.cos(a)} y1={100 + 54 * Math.sin(a)} x2={100 + 80 * Math.cos(a)} y2={100 + 80 * Math.sin(a)} />
    );
  });
  return (
    <svg {...svgProps}>
      {rays}
      <circle cx="100" cy="100" r="46" />
      <circle cx="85" cy="93" r="3.5" fill="#2A2A2A" stroke="none" />
      <circle cx="115" cy="93" r="3.5" fill="#2A2A2A" stroke="none" />
      <path d="M82 112 Q100 128 118 112" />
    </svg>
  );
}

function ColHouse() {
  return (
    <svg {...svgProps}>
      <path d="M38 92 L100 44 L162 92" />
      <rect x="54" y="92" width="92" height="72" rx="2" />
      <rect x="88" y="122" width="24" height="42" rx="1" />
      <circle cx="106" cy="144" r="1.6" fill="#2A2A2A" stroke="none" />
      <rect x="64" y="106" width="18" height="18" rx="1" />
      <rect x="118" y="106" width="18" height="18" rx="1" />
      <path d="M64 115 H82 M73 106 V124" />
      <path d="M118 115 H136 M127 106 V124" />
      <circle cx="160" cy="42" r="13" />
    </svg>
  );
}

function ColRocket() {
  return (
    <svg {...svgProps}>
      <path d="M100 28 C122 50 126 92 120 122 L80 122 C74 92 78 50 100 28 Z" />
      <circle cx="100" cy="72" r="13" />
      <path d="M80 112 L60 138 L80 128" />
      <path d="M120 112 L140 138 L120 128" />
      <path d="M88 122 C90 144 96 154 100 164 C104 154 110 144 112 122" />
      <path d="M42 52 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" />
      <path d="M158 92 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 z" />
    </svg>
  );
}

function ColFish() {
  return (
    <svg {...svgProps}>
      <path d="M40 104 C60 74 120 74 146 104 C120 134 60 134 40 104 Z" />
      <path d="M146 104 L176 84 L171 104 L176 124 Z" />
      <circle cx="70" cy="96" r="4" fill="#2A2A2A" stroke="none" />
      <path d="M96 80 Q112 104 96 128" />
      <circle cx="56" cy="60" r="5" />
      <circle cx="44" cy="46" r="3.5" />
      <path d="M28 156 Q44 148 60 156 T92 156 T124 156 T156 156 T184 156" />
    </svg>
  );
}

function ColFlower() {
  const petals = Array.from({ length: 8 }).map((_, i) => {
    const a = (i * 45 * Math.PI) / 180;
    const cx = 100 + 30 * Math.cos(a);
    const cy = 84 + 30 * Math.sin(a);
    return <ellipse key={i} cx={cx} cy={cy} rx="13" ry="20" transform={`rotate(${i * 45} ${cx} ${cy})`} />;
  });
  return (
    <svg {...svgProps}>
      {petals}
      <circle cx="100" cy="84" r="17" />
      <path d="M100 101 L100 176" />
      <path d="M100 140 C80 130 68 140 66 153 C85 156 98 151 100 140" />
      <path d="M100 124 C120 114 132 124 134 137 C115 140 102 135 100 124" />
    </svg>
  );
}

function ColButterfly() {
  return (
    <svg {...svgProps}>
      <ellipse cx="100" cy="106" rx="6" ry="34" />
      <path d="M97 74 C92 60 86 56 82 52" />
      <path d="M103 74 C108 60 114 56 118 52" />
      <circle cx="81" cy="51" r="2.6" fill="#2A2A2A" stroke="none" />
      <circle cx="119" cy="51" r="2.6" fill="#2A2A2A" stroke="none" />
      <path d="M94 90 C58 60 38 76 44 100 C41 118 62 122 94 108 Z" />
      <path d="M94 112 C68 118 56 136 70 150 C85 158 94 140 94 122 Z" />
      <path d="M106 90 C142 60 162 76 156 100 C159 118 138 122 106 108 Z" />
      <path d="M106 112 C132 118 144 136 130 150 C115 158 106 140 106 122 Z" />
      <circle cx="66" cy="92" r="6" />
      <circle cx="134" cy="92" r="6" />
    </svg>
  );
}

const COLOURING: { emoji: string; title: string; art: React.ReactNode }[] = [
  { emoji: "☀️", title: "Sunny day", art: <ColSun /> },
  { emoji: "🏠", title: "My little house", art: <ColHouse /> },
  { emoji: "🚀", title: "Rocket to space", art: <ColRocket /> },
  { emoji: "🐟", title: "Happy little fish", art: <ColFish /> },
  { emoji: "🌸", title: "Big bright flower", art: <ColFlower /> },
  { emoji: "🦋", title: "Butterfly", art: <ColButterfly /> },
];

export default function PrintablesPage() {
  const [printing, setPrinting] = useState<string | null>(null);

  function printCard(id: string) {
    setPrinting(id);
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
          @page { margin: 1.4cm; }
          /* hide the site chrome (Nav <header> + <footer>) and non-target cards */
          header, footer { display: none !important; }
          .print-hide { display: none !important; }
          .pcard { display: none !important; }
          /* break the printed card out of the grid + max-width container */
          .cards-grid { display: block !important; max-width: none !important; margin: 0 !important; padding: 0 !important; gap: 0 !important; }
          .pcard.print-me {
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
          }
          .pcard.print-me .draw-area {
            height: 520px !important;   /* fixed, page-safe (no vh overflow) */
            min-height: 0 !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            flex: none !important;
          }
        }
      `}</style>

      {/* Hero */}
      <div className="print-hide relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-honey/20 rounded-full blur-[140px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 pt-20 pb-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink leading-tight tracking-tight">
            Free printables for{" "}
            <em className="not-italic text-coral">little artists</em>
          </h1>
          <p className="mt-5 text-lg text-muted leading-relaxed max-w-xl mx-auto">
            Drawing prompts to spark an idea, and ready-made colouring pages for quieter afternoons.
            Then — the magic part — turn what they make into a personalised bedtime story.
          </p>
          <p className="mt-4 text-sm text-muted/70">
            <strong>Tap any card</strong> to print it (or save it as a PDF). Free, forever.
          </p>
        </div>
      </div>

      {/* Section: Drawing prompts */}
      <div className="print-hide max-w-5xl mx-auto px-6 pt-4 pb-3">
        <h2 className="font-display text-2xl font-semibold text-ink">Drawing prompts</h2>
        <p className="text-muted text-sm mt-1">A blank canvas and a little spark of an idea.</p>
      </div>
      <div className="cards-grid max-w-5xl mx-auto px-6 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {PROMPTS.map((p, i) => {
          const id = `p${i}`;
          return (
            <div
              key={p.title}
              role="button"
              tabIndex={0}
              onClick={() => printCard(id)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); printCard(id); } }}
              className={`pcard bg-white rounded-3xl border border-ink/8 shadow-sm overflow-hidden flex flex-col cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 ${printing === id ? "print-me" : ""}`}
            >
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-3xl" aria-hidden>{p.emoji}</div>
                  <span className="print-hide text-xs font-semibold text-coral bg-coral/10 rounded-full px-3 py-1 whitespace-nowrap">🖨️ Tap to print</span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-ink mt-2">{p.title}</h3>
                <p className="mt-2 text-muted leading-relaxed">{p.prompt}</p>
              </div>
              <div className="draw-area mx-6 mb-4 flex-1 min-h-[260px] rounded-2xl border-2 border-dashed border-coral/30 flex items-end justify-center">
                <span className="print-hide text-coral/40 text-sm font-medium mb-3">draw here ✏️</span>
              </div>
              <div className="px-6 pb-5 flex items-end justify-between gap-4">
                <div className="text-xs leading-snug">
                  <p className="font-semibold text-ink/80">Turn this drawing into a bedtime story</p>
                  <p className="text-muted/60 mt-0.5">Scan the code · myminicanvas.com</p>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/qr-create.svg" alt="Scan to make a bedtime story with My Mini Canvas" width={52} height={52} className="w-[52px] h-[52px] shrink-0" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Section: Colouring pages */}
      <div className="print-hide max-w-5xl mx-auto px-6 pt-8 pb-3">
        <h2 className="font-display text-2xl font-semibold text-ink">Colouring pages</h2>
        <p className="text-muted text-sm mt-1">Prefer to colour? Print a ready-made outline and hand over the crayons.</p>
      </div>
      <div className="cards-grid max-w-5xl mx-auto px-6 pb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {COLOURING.map((c, i) => {
          const id = `c${i}`;
          return (
            <div
              key={c.title}
              role="button"
              tabIndex={0}
              onClick={() => printCard(id)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); printCard(id); } }}
              className={`pcard bg-white rounded-3xl border border-ink/8 shadow-sm overflow-hidden flex flex-col cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 ${printing === id ? "print-me" : ""}`}
            >
              <div className="px-6 pt-6 pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-3xl" aria-hidden>{c.emoji}</div>
                  <span className="print-hide text-xs font-semibold text-coral bg-coral/10 rounded-full px-3 py-1 whitespace-nowrap">🖨️ Tap to print</span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-ink mt-2">{c.title}</h3>
                <p className="print-hide mt-1 text-sm text-muted">Colour it in — then bring it to life.</p>
              </div>
              <div className="draw-area mx-6 mb-4 flex-1 min-h-[260px] rounded-2xl border border-ink/5 flex items-center justify-center p-5">
                {c.art}
              </div>
              <div className="px-6 pb-5 flex items-end justify-between gap-4">
                <div className="text-xs leading-snug">
                  <p className="font-semibold text-ink/80">Bring this to life as a bedtime story</p>
                  <p className="text-muted/60 mt-0.5">Scan the code · myminicanvas.com</p>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/qr-create.svg" alt="Scan to make a bedtime story with My Mini Canvas" width={52} height={52} className="w-[52px] h-[52px] shrink-0" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Funnel CTA */}
      <div className="print-hide bg-coral">
        <div className="max-w-2xl mx-auto px-6 py-16 text-center text-white">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight">
            Loved what they made?
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
