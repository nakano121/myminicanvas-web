import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-white/60 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <Image src="/app-icon.png" alt="My Mini Canvas" width={28} height={28} className="rounded-[8px]" />
              <span className="text-white font-semibold text-[17px]">My Mini Canvas</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Capture the story behind every drawing. Record their voice. Build memories that last.
            </p>
            <p className="text-xs mt-4 text-white/35">
              A product by{" "}
              <span className="text-white/50">GOODTECH HLDGS PTE. LTD.</span>
              <br />
              UEN: 202621535H · Singapore
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><FooterLink href="/#features">Features</FooterLink></li>
              <li><FooterLink href="/#how-it-works">How it works</FooterLink></li>
              <li><FooterLink href="/blog">Blog</FooterLink></li>
              <li><FooterLink href="/support">Support</FooterLink></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><FooterLink href="/privacy">Privacy Policy</FooterLink></li>
              <li><FooterLink href="/terms">Terms of Service</FooterLink></li>
            </ul>
            <h3 className="text-white font-semibold text-sm mb-3 mt-5">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:hello@myminicanvas.com"
                  className="hover:text-coral transition-colors"
                >
                  hello@myminicanvas.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:privacy@myminicanvas.com"
                  className="hover:text-coral transition-colors"
                >
                  privacy@myminicanvas.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <p>© {year} GOODTECH HLDGS PTE. LTD. All rights reserved.</p>
          <p>
            myminicanvas.com · Little Art, Big Stories
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="hover:text-coral transition-colors no-underline">
      {children}
    </Link>
  );
}
