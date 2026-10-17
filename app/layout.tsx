import AnimationBootstrap from "./components/AnimationBootstrap";
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const siteUrl = "https://sanbanyakitori.com";
const siteName = "San Ban Yakitori";
const siteDescription =
  "Live yakitori catering for birthdays, private events, parties, and special celebrations across Orange County, Los Angeles, and Southern California.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "San Ban Yakitori | Yakitori Catering in Orange County & Los Angeles",
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "yakitori catering",
    "Orange County yakitori catering",
    "Los Angeles yakitori catering",
    "Japanese catering Orange County",
    "Japanese catering Los Angeles",
    "private event catering",
    "birthday catering",
    "live grill catering",
    "binchotan charcoal yakitori",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      {
        url: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
        sizes: "48x48 32x32 16x16",
      },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "San Ban Yakitori | Yakitori Catering in Orange County & Los Angeles",
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/gallery/_DSC0996.jpg",
        width: 1200,
        height: 800,
        alt: "Yakitori grilling over flame and smoke",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "San Ban Yakitori | Yakitori Catering in Orange County & Los Angeles",
    description: siteDescription,
    images: ["/gallery/_DSC0996.jpg"],
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
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Caterer",
  "@id": `${siteUrl}/#business`,
  name: siteName,
  url: siteUrl,
  email: "bookings@sanbanyakitori.com",
  description: siteDescription,
  image: [
    `${siteUrl}/logo2.png`,
    `${siteUrl}/gallery/_DSC0996.jpg`,
    `${siteUrl}/gallery/_DSC0771.jpg`,
    `${siteUrl}/gallery/_DSC0888.jpg`,
  ],
  logo: `${siteUrl}/logo2.png`,
  sameAs: ["https://instagram.com/sanbanyakitori"],
  servesCuisine: ["Japanese", "Yakitori"],
  areaServed: [
    {
      "@type": "AdministrativeArea",
      name: "Orange County, CA",
    },
    {
      "@type": "AdministrativeArea",
      name: "Los Angeles, CA",
    },
    {
      "@type": "AdministrativeArea",
      name: "Southern California",
    },
  ],
  serviceType: [
    "Yakitori catering",
    "Live yakitori catering",
    "Japanese catering",
    "Private event catering",
    "Birthday catering",
    "Special event catering",
    "Pop-up catering",
    "Party catering",
    "Live grill catering",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Yakitori Catering Experiences",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Live yakitori catering for private events in Orange County and Los Angeles",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Japanese charcoal-grilled skewers for birthdays, parties, and pop-ups",
        },
      },
    ],
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "bookings@sanbanyakitori.com",
    contactType: "booking inquiries",
    areaServed: "US-CA",
    availableLanguage: ["English"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var root=document.documentElement;root.classList.add("animations-ready");var fallback=window.setTimeout(function(){root.classList.remove("animations-ready")},5000);window.addEventListener("animations-initialized",function(){window.clearTimeout(fallback)},{once:true})})();`,
          }}
        />
      </head>
      <body className="bg-[#0c0a09] text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <AnimationBootstrap />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
