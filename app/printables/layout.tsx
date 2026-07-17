import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Drawing Prompts & Colouring Pages for Kids — My Mini Canvas",
  description:
    "Free printable drawing prompts and colouring pages for toddlers and preschoolers — perfect for rainy days. Then turn their drawing into a personalised bedtime story.",
  alternates: { canonical: "https://myminicanvas.com/printables/" },
  openGraph: {
    title: "Free Drawing Prompts for Little Artists",
    description:
      "Printable drawing prompts & colouring pages for kids — print, draw, then turn it into a bedtime story.",
    url: "https://myminicanvas.com/printables/",
    type: "website",
  },
};

export default function PrintablesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
