import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "My Mini Canvas Terms of Service — your rights and responsibilities when using the app.",
  alternates: { canonical: "https://myminicanvas.com/terms" },
};

const LAST_UPDATED = "23 May 2026";

export default function TermsPage() {
  return (
    <div className="bg-parchment min-h-screen">
      <div className="bg-ink py-16 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-black text-white">Terms of Service</h1>
        <p className="text-white/50 mt-2 text-sm">Last updated: {LAST_UPDATED}</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-10 text-ink/80 leading-relaxed text-[15px]">

        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of My Mini Canvas, a mobile application
          operated by <strong>GOODTECH HLDGS PTE. LTD.</strong> (UEN: 202621535H), Singapore
          (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Company&rdquo;). By downloading or using the App, you agree to these Terms.
        </p>

        <Section title="1. Acceptance of Terms">
          <p>
            By accessing or using My Mini Canvas, you confirm that you are at least 18 years old
            (or the age of majority in your jurisdiction) and that you agree to these Terms. If you
            are using the App on behalf of minors in your care, you take full responsibility for
            their use of the App.
          </p>
        </Section>

        <Section title="2. Licence to use the App">
          <p>
            We grant you a limited, non-exclusive, non-transferable, revocable licence to use My Mini
            Canvas for personal, non-commercial purposes on Apple iOS devices that you own or control,
            subject to these Terms and the Apple Media Services Terms and Conditions.
          </p>
        </Section>

        <Section title="3. Acceptable use">
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use the App for any unlawful purpose or in violation of any applicable law or regulation.</li>
            <li>Attempt to reverse-engineer, decompile, or extract the source code of the App.</li>
            <li>Use the App to store, share, or process content that is illegal, harmful, defamatory, or that violates the rights of others.</li>
            <li>Circumvent any security features of the App.</li>
            <li>Use the App to generate, store, or share content involving the sexual exploitation of minors (CSAM) — any such use will be reported to relevant authorities.</li>
          </ul>
        </Section>

        <Section title="4. Content you create">
          <p>
            All content you create within the App — drawings, voice recordings, stories, notes, and
            illustrations — belongs to you. We make no claim to ownership of your content.
          </p>
          <p>
            Because all content is stored locally on your device, we have no access to it. You are
            solely responsible for any content you create and for compliance with applicable laws
            regarding that content.
          </p>
          <p>
            When you use optional AI features (story generation or illustration generation), content
            is processed by third-party AI providers using your own API key. You are responsible for
            compliance with those providers&apos; terms of service.
          </p>
        </Section>

        <Section title="5. Third-party services">
          <p>
            The App&apos;s optional AI features rely on third-party APIs (Anthropic Claude, OpenAI).
            Your use of these features is governed by the respective providers&apos; terms of service
            and privacy policies. We are not responsible for the actions, content, or policies of
            third-party services.
          </p>
          <p>
            API keys you provide are your responsibility. Keep them secure. We are not liable for
            any costs or consequences arising from unauthorised use of your API keys.
          </p>
        </Section>

        <Section title="6. Disclaimers">
          <p>
            My Mini Canvas is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind,
            express or implied, including but not limited to merchantability, fitness for a particular
            purpose, or non-infringement.
          </p>
          <p>
            We do not guarantee that the App will be error-free, uninterrupted, or that any defects
            will be corrected. AI-generated stories and illustrations are produced by third-party
            models and may be inaccurate, inappropriate, or inconsistent — always review generated
            content before sharing it with your child.
          </p>
          <p>
            Nothing in the App constitutes medical, psychological, developmental, or parenting advice.
            Content in the App and on our website is for informational and entertainment purposes only.
          </p>
        </Section>

        <Section title="7. Limitation of liability">
          <p>
            To the maximum extent permitted by applicable law, the Company shall not be liable for
            any indirect, incidental, special, consequential, or punitive damages arising from your
            use of the App, including but not limited to loss of data, loss of profits, or loss of
            memories stored in the App.
          </p>
          <p>
            Our total liability to you shall not exceed the amount you paid for the App in the
            12 months preceding the claim, or SGD 100, whichever is greater.
          </p>
        </Section>

        <Section title="8. Data and privacy">
          <p>
            Your use of the App is also governed by our{" "}
            <Link href="/privacy" className="text-coral underline">Privacy Policy</Link>, which
            is incorporated into these Terms by reference.
          </p>
        </Section>

        <Section title="9. Governing law">
          <p>
            These Terms are governed by the laws of the Republic of Singapore. Any disputes arising
            from these Terms shall be subject to the exclusive jurisdiction of the courts of Singapore.
          </p>
        </Section>

        <Section title="10. Changes to these Terms">
          <p>
            We may update these Terms from time to time. Material changes will be communicated via
            an in-app notice or by updating the &ldquo;Last updated&rdquo; date above. Continued use of the
            App after any change constitutes acceptance of the updated Terms.
          </p>
        </Section>

        <Section title="11. Contact">
          <p>
            <strong>GOODTECH HLDGS PTE. LTD.</strong><br />
            UEN: 202621535H · Singapore<br />
            <a href="mailto:hello@myminicanvas.com" className="text-coral underline">hello@myminicanvas.com</a>
          </p>
        </Section>

        <div className="pt-6 border-t border-ink/10 text-sm text-muted">
          <Link href="/privacy" className="text-coral hover:underline mr-4">Privacy Policy</Link>
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
      <div className="space-y-3">{children}</div>
    </section>
  );
}
