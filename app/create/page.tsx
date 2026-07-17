import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/AppStoreButton";

export const metadata: Metadata = {
  title: "Make your own — My Mini Canvas",
  description:
    "Someone turned their child's drawing into a personalised bedtime story and a watercolour illustration. Make your own tonight — free, private, no account.",
  alternates: { canonical: "https://myminicanvas.com/create/" },
  openGraph: {
    title: "A child drew something. It became a story.",
    description:
      "Turn your little one's drawing into a personalised bedtime story and a watercolour illustration — free, on your device.",
    url: "https://myminicanvas.com/create",
    type: "website",
  },
};

export default function CreatePage() {
  return (
    <section className="relative overflow-hidden bg-parchment min-h-[80vh]">
      {/* Soft background blobs (match homepage hero) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-honey/20 rounded-full blur-[140px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[460px] h-[460px] bg-coral/10 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-6 pt-20 pb-28 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-sage/15 border border-sage/30 rounded-full px-4 py-1.5 text-sm font-medium mb-7">
          <span className="w-2 h-2 rounded-full bg-sage" />
          <span className="text-ink/70">Someone shared a little masterpiece with you</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.6rem] font-semibold text-ink leading-[1.08] tracking-tight">
          A child drew something.{" "}
          <em className="not-italic text-coral">It became a story.</em>
        </h1>

        <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl mx-auto">
          Your child is drawing something today, too — and explaining it in a voice that
          won&apos;t sound like this forever. Capture it tonight: their drawing becomes a
          bedtime story and a watercolour illustration, read together before sleep.
          Free, private, no account.
        </p>

        {/* Three steps */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
          {[
            { n: "1", t: "Snap the drawing", d: "One photo of whatever they made today — before it gets lost." },
            { n: "2", t: "Let them explain it", d: "Tap record and let that little voice tell you what it is." },
            { n: "3", t: "Out comes a storybook", d: "A bedtime story and a painted illustration, ready to read together." },
          ].map((s) => (
            <div key={s.n} className="bg-white rounded-3xl p-6 shadow-sm border border-ink/5">
              <div className="w-9 h-9 rounded-full bg-coral text-white font-bold flex items-center justify-center mb-4">
                {s.n}
              </div>
              <h3 className="font-bold text-ink text-[15px] mb-1.5">{s.t}</h3>
              <p className="text-muted text-sm leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <AppStoreButton />
          <p className="text-muted/70 text-sm">
            Free to start · No account · Memories stay on your device
          </p>
        </div>

        {/* Soft footer link */}
        <p className="mt-14 text-sm text-muted/70">
          Curious how it works?{" "}
          <Link href="/" className="text-coral font-semibold hover:underline">
            See the whole story →
          </Link>
        </p>
      </div>
    </section>
  );
}
