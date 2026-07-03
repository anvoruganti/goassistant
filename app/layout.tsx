// Root layout — fonts, global metadata, and page shell for the landing page.
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { GeistSans } from "geist/font/sans";
import { Inter, JetBrains_Mono } from "next/font/google";
import { seoDefaults, siteConfig } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: seoDefaults.title,
  description: seoDefaults.description,
  openGraph: {
    title: seoDefaults.ogTitle,
    description: seoDefaults.ogDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seoDefaults.ogTitle,
    description: seoDefaults.ogDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-navy font-body text-offwhite">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
