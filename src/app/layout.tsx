import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hassan & Jana | Katb Kitab",
  description: "We joyfully invite you to the katb kitab of Hassan Diaa & Jana Malek",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Hassan & Jana | Katb Kitab",
    description: "We joyfully invite you to the katb kitab of Hassan Diaa & Jana Malek — June 6th, Islamic Center of Irvine.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hassan & Jana | Katb Kitab",
    description: "We joyfully invite you to the katb kitab of Hassan Diaa & Jana Malek — June 6th, Islamic Center of Irvine.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Amiri:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        {/* Preload the monogram and the verse calligraphy so they're in cache by the time their fade-in animations start */}
        <link rel="preload" as="image" href="/jh-mark.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/wa-mn-aayatehe-T-012.svg" fetchPriority="high" />
      </head>
      <body className="font-sans bg-warm-bg text-text-primary">
        {children}
      </body>
    </html>
  );
}
