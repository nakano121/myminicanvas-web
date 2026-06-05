import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "My Mini Canvas Privacy Policy — how we protect your family's data. GDPR, COPPA, CCPA, and PDPA compliant.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://myminicanvas.com/privacy" },
};

const LAST_UPDATED = "4 June 2026";

export default function PrivacyPage() {
  return (
    <div className="bg-parchment min-h-screen">
      <div className="bg-ink py-16 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-black text-white">Privacy Policy</h1>
        <p className="text-white/50 mt-2 text-sm">Last updated: {LAST_UPDATED}</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-10 text-ink/80 leading-relaxed">

        <p className="text-lg font-medium text-ink">
          Your family&apos;s memories are private. That&apos;s not a promise — it&apos;s the architecture.
          Drawings, voice recordings, and stories are stored on your device. AI features
          use a secure My Mini Canvas server — only when you explicitly ask, and only
          the minimum text required.
        </p>

        <Section title="1. Who we are">
          <p>
            My Mini Canvas is a mobile application developed and operated by{" "}
            <strong>GOODTECH HLDGS PTE. LTD.</strong>, a company incorporated in Singapore
            (UEN: 202621535H) (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Company&rdquo;).
          </p>
          <p>
            For privacy-related enquiries, contact us at{" "}
            <a href="mailto:privacy@myminicanvas.com" className="text-coral underline">
              privacy@myminicanvas.com
            </a>.
          </p>
        </Section>

        <Section title="2. What data we collect — and what we don't">
          <h3 className="font-bold text-ink text-lg mt-4 mb-2">Data stored on your device</h3>
          <p>
            All memories — drawings, voice recordings, stories, illustrations, and parent notes —
            are stored exclusively on your device using Apple&apos;s SwiftData framework. We have
            no access to this data. It is not transmitted to our servers.
          </p>

          <h3 className="font-bold text-ink text-lg mt-4 mb-2">Data we do not collect</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>We do not collect children&apos;s names, birthdates, photographs, or any other personal information about minors.</li>
            <li>We do not create user accounts or user profiles.</li>
            <li>We do not use advertising identifiers (IDFA, GAID, or equivalent).</li>
            <li>We do not conduct behavioural analytics or cross-app tracking.</li>
            <li>We do not sell your data to any third party, ever.</li>
          </ul>

          <h3 className="font-bold text-ink text-lg mt-4 mb-2">Voice recognition</h3>
          <p>
            The App uses Apple&apos;s on-device Speech Recognition (<code>SFSpeechRecognizer</code>)
            with <code>requiresOnDeviceRecognition = true</code>. Audio is processed locally on your
            device and is never transmitted to Apple or any third party for transcription purposes.
          </p>

          <h3 className="font-bold text-ink text-lg mt-4 mb-2">Draw Together (optional feature)</h3>
          <p>
            The App includes a built-in drawing canvas powered by Apple&apos;s PencilKit framework.
            Drawings created on this canvas are stored only on your device and are never transmitted
            to any external service. PencilKit processing is entirely on-device.
          </p>

          <h3 className="font-bold text-ink text-lg mt-4 mb-2">AI features — how they work</h3>
          <p>
            My Mini Canvas offers optional AI features (story generation, illustration, and
            read-aloud). These features route through a secure My Mini Canvas server
            (hosted on Cloudflare&apos;s infrastructure) before reaching the underlying AI providers.
            We operate this server so you never need accounts with any AI provider.
          </p>
          <p>
            Our server holds no persistent user data — it processes each request and discards it.
            The only information retained is an anonymous per-device usage counter (no name,
            no email, no account) used to enforce monthly rate limits.
          </p>

          <h3 className="font-bold text-ink text-lg mt-4 mb-2">AI Story Generation (optional)</h3>
          <p>
            When you generate a story, the drawing&apos;s title, the child&apos;s spoken transcript
            (if provided), the parent&apos;s note (if provided), and a resized thumbnail of the
            drawing are transmitted via our server to <strong>Anthropic&apos;s Claude API</strong>.
            The child&apos;s name is never transmitted.
            See Anthropic&apos;s Privacy Policy at{" "}
            <a href="https://www.anthropic.com/privacy" className="text-coral underline" target="_blank" rel="noopener noreferrer">
              anthropic.com/privacy
            </a>.
          </p>

          <h3 className="font-bold text-ink text-lg mt-4 mb-2">AI Illustration Generation (optional)</h3>
          <p>
            When you generate an illustration, a text prompt derived from the drawing title and
            story is transmitted via our server to <strong>OpenAI&apos;s image generation API</strong>.
            No drawing image, no child audio, and no personal identifiers are transmitted. The
            generated image is reviewed by the parent before saving to the device. See OpenAI&apos;s
            Privacy Policy at{" "}
            <a href="https://openai.com/privacy" className="text-coral underline" target="_blank" rel="noopener noreferrer">
              openai.com/privacy
            </a>.
          </p>

          <h3 className="font-bold text-ink text-lg mt-4 mb-2">AI Read-Aloud (optional)</h3>
          <p>
            When you use Read Aloud, the saved story text is transmitted via our server to
            <strong> ElevenLabs&apos; text-to-speech API</strong> (primary) or{" "}
            <strong>Google&apos;s Gemini text-to-speech API</strong> (fallback) to generate a narrated audio file.
            Only the story text is sent — no child audio, no drawings, no personal identifiers.
            See ElevenLabs&apos; Privacy Policy at{" "}
            <a href="https://elevenlabs.io/privacy" className="text-coral underline" target="_blank" rel="noopener noreferrer">
              elevenlabs.io/privacy
            </a>{" "}
            and Google&apos;s Privacy Policy at{" "}
            <a href="https://policies.google.com/privacy" className="text-coral underline" target="_blank" rel="noopener noreferrer">
              policies.google.com/privacy
            </a>.
          </p>
        </Section>

        <Section title="3. Children's privacy (COPPA compliance)">
          <p>
            My Mini Canvas is designed to be used by parents and caregivers on behalf of their
            children. The App is not directed to children under 13 and children do not use it
            independently — a parent or guardian controls all interactions. We do not knowingly
            collect personal information from children under 13.
          </p>
          <p>
            In compliance with the Children&apos;s Online Privacy Protection Act (COPPA):
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>We do not collect a child&apos;s name, photograph, voice recording, or any other personal identifier via our servers.</li>
            <li>All voice recordings, drawings (including Draw Together canvas drawings), stories, and illustrations are stored locally on the parent&apos;s device.</li>
            <li>We do not transmit any children&apos;s content to AI services without explicit parental opt-in at the time of each action (see Section 2).</li>
            <li>No AI processing occurs without the parent actively initiating it. AI features are always opt-in, never automatic.</li>
            <li>Voice recognition uses Apple&apos;s on-device framework only — child audio is never sent to any server.</li>
          </ul>
          <p>
            If you believe a child under 13 has provided us with personal information without
            appropriate parental consent, please contact us at{" "}
            <a href="mailto:privacy@myminicanvas.com" className="text-coral underline">
              privacy@myminicanvas.com
            </a>.
          </p>
        </Section>

        <Section title="4. iCloud Backup">
          <p>
            Your device&apos;s standard iCloud Backup settings may include data stored by My Mini Canvas
            (drawings, stories, voice recordings). This is governed by Apple&apos;s iCloud Terms of Service
            and Privacy Policy. You can exclude our App from iCloud Backup in iOS Settings → [Your Name] →
            iCloud → Manage Storage.
          </p>
        </Section>

        <Section title="5. Data deletion">
          <p>
            All data is stored on your device. You may delete individual memories within the App at
            any time. Deleting the App from your device removes all associated data. Because we hold
            no data on our servers, there is no account deletion process required on our end.
          </p>
        </Section>

        <Section title="6. Your rights (GDPR, CCPA, PDPA)">
          <p>
            Depending on your jurisdiction, you may have rights including access, rectification,
            erasure, and portability. As we hold no personal data about you or your children on our
            servers, most of these rights are exercised directly on your device via the App.
          </p>
          <p>
            For questions about your rights under GDPR (EU/EEA), CCPA (California), PDPA
            (Singapore, Thailand), or any other applicable privacy law, contact us at{" "}
            <a href="mailto:privacy@myminicanvas.com" className="text-coral underline">
              privacy@myminicanvas.com
            </a>.
          </p>
          <p>
            Under CCPA: we do not sell, share, or disclose personal information for cross-context
            behavioural advertising. There is no need to opt out — we simply don&apos;t do it.
          </p>
        </Section>

        <Section title="7. Security">
          <p>
            Data stored on your device is protected by your device&apos;s security model (Face ID,
            Touch ID, passcode). We recommend enabling App Lock within the App and keeping your
            device&apos;s operating system up to date.
          </p>
          <p>
            AI requests are routed through our Cloudflare Workers server over HTTPS. The server
            authenticates each request using an anonymous device token (SHA-256 of your device&apos;s
            vendor identifier — no personal information). API keys for Anthropic, OpenAI, and
            Google are stored exclusively as server-side secrets and never transmitted to or
            stored on your device.
          </p>
        </Section>

        <Section title="8. Analytics and advertising">
          <p>
            My Mini Canvas contains no third-party analytics SDKs, advertising networks, or
            tracking libraries. We use no cookies, pixels, fingerprinting, or any other tracking
            mechanism.
          </p>
        </Section>

        <Section title="9. Changes to this policy">
          <p>
            We may update this Privacy Policy from time to time. Material changes will be communicated
            via an in-app notice or by updating the &ldquo;Last updated&rdquo; date above. Continued use of
            the App after any change constitutes acceptance of the updated policy.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            <strong>GOODTECH HLDGS PTE. LTD.</strong><br />
            UEN: 202621535H · Singapore<br />
            Privacy enquiries:{" "}
            <a href="mailto:privacy@myminicanvas.com" className="text-coral underline">
              privacy@myminicanvas.com
            </a><br />
            General:{" "}
            <a href="mailto:hello@myminicanvas.com" className="text-coral underline">
              hello@myminicanvas.com
            </a>
          </p>
        </Section>

        <div className="pt-6 border-t border-ink/10 text-sm text-muted">
          <Link href="/terms" className="text-coral hover:underline mr-4">Terms of Service</Link>
          <Link href="/support" className="text-coral hover:underline">Support</Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-black text-ink mb-3">{title}</h2>
      <div className="space-y-3 text-[15px]">{children}</div>
    </section>
  );
}
