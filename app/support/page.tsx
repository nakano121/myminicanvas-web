import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with My Mini Canvas — FAQ, troubleshooting, and contact information.",
  alternates: { canonical: "https://myminicanvas.com/support" },
};

const FAQ = [
  {
    q: "Is My Mini Canvas available now?",
    a: "We're launching on iPhone and iPad very soon. Join the waitlist at myminicanvas.com to be first to know.",
  },
  {
    q: "Does the app require an internet connection?",
    a: "For basic use — capturing drawings, recording voice, and storing memories — no internet connection is needed. AI story generation and illustration features require an internet connection.",
  },
  {
    q: "Where is my data stored?",
    a: "Drawings, voice recordings, stories, and illustrations are stored on your device only. Optional AI features route the minimum necessary text through our secure server — never your drawings or audio. We have no persistent access to your content.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. My Mini Canvas requires no account, no email registration, no sign-in. Just install and start capturing.",
  },
  {
    q: "How does the AI story generation work?",
    a: "When you tap 'Create Story', the drawing's title and your child's voice transcription (but never their name) is sent via our secure server to Anthropic's Claude AI. The story is returned and saved locally on your device. No API key required — we handle that.",
  },
  {
    q: "Do I need my own API key?",
    a: "No. AI story generation, illustration, and read-aloud are powered by our server — you don't need an Anthropic or OpenAI account. Basic memory capture (drawing + voice + notes) works completely offline.",
  },
  {
    q: "Can I export my memories?",
    a: "Yes. You can export individual memories as a beautiful storybook PDF, or export all memories at once as a Memory Book PDF from Settings. Share via AirDrop, email, or print.",
  },
  {
    q: "Is the app COPPA compliant?",
    a: "Yes. We never collect children's personal information. All data stays on your device. Voice is processed on-device using Apple's on-device speech recognition. See our Privacy Policy for full details.",
  },
  {
    q: "The app locked me out — what do I do?",
    a: "My Mini Canvas uses Face ID or Touch ID to protect your memories. If biometrics fail, use your device passcode. You can disable App Lock in Settings within the app.",
  },
  {
    q: "I found a bug or have a feature request",
    a: "We'd love to hear from you. Email us at hello@myminicanvas.com with as much detail as possible and we'll get back to you promptly.",
  },
];

export default function SupportPage() {
  return (
    <div className="bg-parchment min-h-screen">
      <div className="bg-ink py-16 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-black text-white">Support</h1>
        <p className="text-white/60 mt-2 text-base">We&apos;re here to help.</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14">
        {/* Contact first */}
        <div className="bg-coral rounded-3xl p-8 text-white mb-14 text-center">
          <div className="text-3xl mb-3">💌</div>
          <h2 className="text-xl font-black mb-2">Get in touch</h2>
          <p className="text-white/80 text-sm mb-5">
            Can&apos;t find your answer below? We respond to every email, usually within one business day.
          </p>
          <a
            href="mailto:hello@myminicanvas.com"
            className="inline-block bg-white text-coral font-bold text-sm px-7 py-3 rounded-full hover:bg-white/90 transition-colors"
          >
            hello@myminicanvas.com
          </a>
        </div>

        {/* FAQ */}
        <h2 className="text-2xl font-black text-ink mb-8">Frequently asked questions</h2>
        <div className="space-y-4">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group bg-white rounded-2xl px-6 py-5 cursor-pointer"
            >
              <summary className="font-bold text-ink text-[15px] flex items-center justify-between gap-4 list-none">
                <span>{item.q}</span>
                <span className="text-coral text-xl font-light group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-muted text-[15px] leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>

        {/* Privacy note */}
        <div className="mt-14 text-center text-sm text-muted">
          For privacy-related enquiries:{" "}
          <a href="mailto:privacy@myminicanvas.com" className="text-coral hover:underline">
            privacy@myminicanvas.com
          </a>
        </div>
      </div>
    </div>
  );
}
