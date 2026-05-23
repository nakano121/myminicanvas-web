"use client";

import Link from "next/link";
import { useState } from "react";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-parchment/90 backdrop-blur-md border-b border-coral/10">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-ink no-underline">
          <span className="text-xl">🌙</span>
          <span className="text-[17px] font-semibold tracking-tight">My Mini Canvas</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/support">Support</NavLink>
          <NavLink href="/privacy">Privacy</NavLink>
          <a
            href="#waitlist"
            className="bg-coral text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-coral/90 transition-colors"
          >
            Get Early Access
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-ink/60 hover:text-ink"
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
        <div className="md:hidden border-t border-coral/10 bg-parchment px-6 py-4 flex flex-col gap-4">
          <NavLink href="/blog" onClick={() => setOpen(false)}>Blog</NavLink>
          <NavLink href="/support" onClick={() => setOpen(false)}>Support</NavLink>
          <NavLink href="/privacy" onClick={() => setOpen(false)}>Privacy</NavLink>
          <a
            href="#waitlist"
            onClick={() => setOpen(false)}
            className="bg-coral text-white text-sm font-semibold px-5 py-2.5 rounded-full text-center hover:bg-coral/90 transition-colors"
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
      className="text-sm font-medium text-muted hover:text-coral transition-colors no-underline"
    >
      {children}
    </Link>
  );
}
