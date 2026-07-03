import type { Metadata } from "next";

// Internal tool — not indexed, not linked from nav.
export const metadata: Metadata = {
  title: "Pin Generator (internal)",
  robots: { index: false, follow: false },
};

export default function PinsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
