"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-parchment/95 backdrop-blur-md shadow-sm shadow-ink/5 border-b border-ink/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline group">
          <Image
            src="/app-icon.png"
            alt="My Mini Canvas"
            width={32}
            height={32}
            className="rounded-[9px] shadow-sm group-hover:shadow-md transition-shadow"
          />
          <span className="text-[16px] font-bold text-ink tracking-tight">My Mini Canvas</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/support">Support</NavLink>
          <NavLink href="/privacy">Privacy</NavLink>
          <a
            href="/#waitlist"
            className="bg-coral text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-coral-dark transition-colors shadow-sm shadow-coral/25 hover:shadow-md hover:shadow-coral/30"
          >
            Get Early Access
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-ink/60 hover:text-ink transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-parchment/98 backdrop-blur-md border-t border-ink/5 px-6 py-5 flex flex-col gap-5">
          <NavLink href="/blog" onClick={() => setOpen(false)}>Blog</NavLink>
          <NavLink href="/support" onClick={() => setOpen(false)}>Support</NavLink>
          <NavLink href="/privacy" onClick={() => setOpen(false)}>Privacy</NavLink>
          <a
            href="/#waitlist"
            onClick={() => setOpen(false)}
            className="bg-coral text-white text-sm font-bold px-5 py-3 rounded-full text-center hover:bg-coral-dark transition-colors"
          >
            Get Early Access
          </a>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-sm font-medium text-muted hover:text-ink transition-colors no-underline"
    >
      {children}
    </Link>
  );
}
