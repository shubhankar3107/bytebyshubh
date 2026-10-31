import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

/* =========================================
   SITE CONFIGURATION
========================================= */

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const siteName = "Byte by Shubh";

const siteDescription =
  "A curious mind exploring artificial intelligence, software engineering, automation and emerging technology. Discover Shubh's experiments and the journey of building JARVIS.";

/* =========================================
   SEO METADATA
========================================= */

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Byte by Shubh — Building Tomorrow, One Byte at a Time",
    template: "%s | Byte by Shubh",
  },

  description: siteDescription,

  applicationName: siteName,

  authors: [
    {
      name: "Shubhankar Singh",
    },
  ],

  creator: "Shubhankar Singh",
  publisher: siteName,

  keywords: [
    "Byte by Shubh",
    "Shubhankar Singh",
    "Shubh",
    "Artificial Intelligence",
    "Applied AI",
    "AI Engineering",
    "Software Engineering",
    "Machine Learning",
    "AI Agents",
    "Automation",
    "JARVIS",
    "Technology",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName,
    title: "Byte by Shubh — Building Tomorrow",
    description: siteDescription,
  },

  twitter: {
    card: "summary",
    title: "Byte by Shubh — Building Tomorrow",
    description: siteDescription,
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
};

/* =========================================
   VIEWPORT CONFIGURATION
========================================= */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080b10",
  colorScheme: "dark",
};

/* =========================================
   STRUCTURED DATA — JSON-LD
========================================= */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,

      name: "Shubhankar Singh",
      alternateName: "Shubh",

      url: siteUrl,

      description:
        "Technology enthusiast exploring artificial intelligence, software engineering, automation and emerging technologies.",

      knowsAbout: [
        "Artificial Intelligence",
        "Applied AI Engineering",
        "Software Engineering",
        "Machine Learning",
        "AI Agents",
        "Automation",
      ],
    },

    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,

      name: "Byte by Shubh",
      alternateName: "Byte by Shubh — Building Tomorrow",

      url: siteUrl,

      description: siteDescription,

      author: {
        "@id": `${siteUrl}/#person`,
      },

      inLanguage: "en-IN",
    },
  ],
};

/* =========================================
   ROOT LAYOUT
========================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />

        {children}
      </body>
    </html>
  );
}