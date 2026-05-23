import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://myminicanvas.com"),
  title: {
    default: "My Mini Canvas — Little Art, Big Stories",
    template: "%s | My Mini Canvas",
  },
  description:
    "The app that captures your child's drawings and the story behind them. Record their voice, generate bedtime stories, and preserve family memories — privately, on your device.",
  keywords: [
    "children drawing app",
    "kids art memory app",
    "capture kids artwork",
    "toddler art app",
    "family memory app",
    "bedtime stories",
    "kids drawing stories",
    "preserve children art",
    "children voice recording",
    "family keepsake app",
  ],
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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
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
                "Capture children's drawings alongside their voice explanation. Turn art into bedtime stories. Keep every memory privately on your device.",
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
