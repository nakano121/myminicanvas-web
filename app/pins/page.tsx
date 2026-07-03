"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";

type Theme = { bg: string; kicker: string; hook: string; sub: string; pill: string; url: string; brand: string };

const THEMES: Record<string, Theme> = {
  cream: { bg: "bg-parchment", kicker: "text-coral", hook: "text-ink", sub: "text-muted", pill: "bg-coral text-white", url: "text-coral", brand: "text-ink/70" },
  coral: { bg: "bg-coral", kicker: "text-white/70", hook: "text-white", sub: "text-white/90", pill: "bg-white text-coral", url: "text-white", brand: "text-white/80" },
  sage: { bg: "bg-sage", kicker: "text-white/70", hook: "text-white", sub: "text-white/90", pill: "bg-white text-sage", url: "text-white", brand: "text-white/80" },
};

type Pin = { theme: keyof typeof THEMES; emoji: string; kicker: string; hook: string; sub: string; cta: string; board: string; link: string };

const PINS: Pin[] = [
  { theme: "cream", emoji: "🎨", kicker: "Free Printable", hook: "Free drawing prompts for little artists", sub: "Print one out, hand over the crayons, and watch what their imagination does.", cta: "Free download →", board: "Free Kids Drawing Prompts", link: "/printables" },
  { theme: "coral", emoji: "🐉", kicker: "Free Printable · Drawing Prompt", hook: "Draw a friendly monster.", sub: "What's its name? What does it eat for breakfast?", cta: "Free download →", board: "Free Kids Drawing Prompts", link: "/printables" },
  { theme: "sage", emoji: "🌳", kicker: "Free Printable · Drawing Prompt", hook: "Draw your dream treehouse.", sub: "Who lives there with you?", cta: "Free download →", board: "Free Kids Drawing Prompts", link: "/printables" },
  { theme: "cream", emoji: "🚀", kicker: "Free Printable · Drawing Prompt", hook: "If you could fly, where would you go first?", sub: "Draw the very first place you'd visit.", cta: "Free download →", board: "Free Kids Drawing Prompts", link: "/printables" },
  { theme: "coral", emoji: "🌊", kicker: "Free Printable · Drawing Prompt", hook: "What's hiding at the bottom of the ocean?", sub: "Draw what's down there in the deep.", cta: "Free download →", board: "Free Kids Drawing Prompts", link: "/printables" },
  { theme: "sage", emoji: "🦸", kicker: "Free Printable · Drawing Prompt", hook: "Draw your family as superheroes.", sub: "What is everyone's secret power?", cta: "Free download →", board: "Free Kids Drawing Prompts", link: "/printables" },
  { theme: "cream", emoji: "🖍️", kicker: "Keep the Story", hook: "The fridge keeps the drawing. Nothing keeps the voice.", sub: "Turn today's drawing into their bedtime story — in their own words.", cta: "Make one free →", board: "Kids Art Keepsake Ideas", link: "/create" },
  { theme: "coral", emoji: "✨", kicker: "Made with My Mini Canvas", hook: "Their drawing becomes their bedtime story.", sub: "A personalised watercolour storybook, in their own little voice. Free to start.", cta: "Make one free →", board: "Kids Art Keepsake Ideas", link: "/create" },
  { theme: "sage", emoji: "💛", kicker: "For Parents", hook: "Don't throw away their art. Keep the story.", sub: "What to actually do with your kids' drawings (besides the guilt).", cta: "Read the guide →", board: "Kids Art Keepsake Ideas", link: "/blog/what-to-do-with-kids-drawings" },
];

// The 1000×1500 card (rendered at natural size; exported by html-to-image).
function PinArt({ p, innerRef }: { p: Pin; innerRef: React.RefObject<HTMLDivElement | null> }) {
  const t = THEMES[p.theme];
  return (
    <div ref={innerRef} className={`relative overflow-hidden flex flex-col ${t.bg}`} style={{ width: 1000, height: 1500 }}>
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[460px] h-[460px] rounded-full bg-black/5 blur-3xl pointer-events-none" />
      <div className="flex items-center gap-4 px-20 pt-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/app-icon.png" alt="" width={64} height={64} className="rounded-2xl shadow" />
        <span className={`font-bold ${t.brand}`} style={{ fontSize: 34 }}>My Mini Canvas</span>
      </div>
      <div className="flex-1 flex flex-col justify-center px-20">
        <div style={{ fontSize: 96 }} className="mb-6" aria-hidden>{p.emoji}</div>
        <div className={`font-bold uppercase tracking-[0.2em] mb-8 ${t.kicker}`} style={{ fontSize: 26 }}>{p.kicker}</div>
        <h2 className={`font-display font-semibold ${t.hook}`} style={{ fontSize: 88, lineHeight: 1.05 }}>{p.hook}</h2>
        <p className={`mt-10 ${t.sub}`} style={{ fontSize: 36, lineHeight: 1.4 }}>{p.sub}</p>
      </div>
      <div className="px-20 pb-24">
        <span className={`inline-block font-bold rounded-full ${t.pill}`} style={{ fontSize: 30, padding: "20px 40px" }}>{p.cta}</span>
        <div className={`mt-8 font-semibold ${t.url}`} style={{ fontSize: 34 }}>myminicanvas.com · Free on the App Store</div>
      </div>
    </div>
  );
}

function PinRow({ p, index }: { p: Pin; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [busy, setBusy] = useState(false);

  async function download() {
    if (!ref.current) return;
    setBusy(true);
    try {
      const dataUrl = await toPng(ref.current, { width: 1000, height: 1500, pixelRatio: 2, cacheBust: true });
      const a = document.createElement("a");
      a.download = `mmc-pin-${index + 1}.png`;
      a.href = dataUrl;
      a.click();
    } catch (e) {
      alert("Export failed — try again. " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 flex items-center gap-3 text-sm text-gray-800" style={{ width: 400 }}>
        <span className="font-bold whitespace-nowrap">Pin {index + 1}</span>
        <button
          onClick={download}
          disabled={busy}
          className="ml-auto bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full disabled:opacity-50"
        >
          {busy ? "Rendering…" : "⬇ Download PNG"}
        </button>
      </div>
      <div className="text-xs text-gray-600 mb-2" style={{ width: 400 }}>
        Board: <strong>{p.board}</strong> · Link: <strong>myminicanvas.com{p.link}</strong>
      </div>
      {/* scaled preview (400×600 on screen); the ref card stays 1000×1500 for export */}
      <div className="ring-1 ring-black/15 overflow-hidden" style={{ width: 400, height: 600 }}>
        <div style={{ transform: "scale(0.4)", transformOrigin: "top left" }}>
          <PinArt p={p} innerRef={ref} />
        </div>
      </div>
    </div>
  );
}

export default function PinsPage() {
  return (
    <div className="min-h-screen bg-gray-300 py-10">
      <div className="max-w-[1000px] mx-auto px-5 mb-8 text-sm text-gray-800">
        <p className="font-bold text-base">🎨 Pin generator (internal — not indexed, not linked)</p>
        <p className="mt-1">
          Click <strong>⬇ Download PNG</strong> on any card — it saves a perfect <strong>1000×1500</strong> (2× = 2000×3000) image, no
          screenshotting. Then upload it to Pinterest using the <strong>board + link</strong> shown under each card, with the title/description
          from your content kit. Post 1–3/day, spaced.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-items-center">
        {PINS.map((p, i) => (
          <PinRow key={i} p={p} index={i} />
        ))}
      </div>
    </div>
  );
}
