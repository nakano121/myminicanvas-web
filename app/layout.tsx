import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://myminicanvas.com"),
  title: {
    default: "My Mini Canvas — Turn Kids' Drawings Into Bedtime Stories",
    template: "%s | My Mini Canvas",
  },
  description:
    "Turn your child's drawing into a personalised bedtime story and watercolour illustration in minutes. My Mini Canvas captures their voice, generates the story, and keeps every memory privately on your device.",
  keywords: [
    "turn drawing into story",
    "child drawing bedtime story",
    "kids artwork story generator",
    "photograph drawing story app",
    "storybook maker",
    "personalized kids story",
    "children drawing app",
    "toddler art keepsake",
    "what to do with kids drawings",
    "kids art keepsake ideas",
    "how to save children's artwork",
    "family memory app",
    "read aloud children",
    "watercolor illustration kids",
    "kids voice recording",
  ],
  other: {
    // Pinterest site-claim verification
    "p:domain_verify": "8c47f8bcdd7b992435f67c101643597a",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://myminicanvas.com",
    siteName: "My Mini Canvas",
    title: "My Mini Canvas — Little Art, Big Stories",
    description:
      "Record the story your child tells about their drawing. Turn it into a bedtime story. Keep it forever.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "My Mini Canvas — Little Art, Big Stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Mini Canvas — Little Art, Big Stories",
    description:
      "Record the story your child tells about their drawing. Turn it into a bedtime story. Keep it forever.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "https://myminicanvas.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${fraunces.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "My Mini Canvas",
              operatingSystem: "iOS",
              applicationCategory: "LifestyleApplication",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/ComingSoon",
              },
              description:
                "Turn your child's drawing into a personalised bedtime story and watercolour illustration. Photograph the drawing, record their voice, and My Mini Canvas generates a bedtime story in minutes — privately on your device.",
              publisher: {
                "@type": "Organization",
                name: "GOODTECH HLDGS PTE. LTD.",
                url: "https://myminicanvas.com",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
