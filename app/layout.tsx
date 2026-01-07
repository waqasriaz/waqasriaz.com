import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://waqasriaz.com"),
  title: {
    default: "Waqas Riaz - Software Developer & Product Builder",
    template: "%s | Waqas Riaz",
  },
  description:
    "Software Developer & Product Builder. Creator of Houzez and Homey WordPress themes. Web development, mobile apps, and consulting services.",
  keywords: [
    "software developer",
    "product builder",
    "houzez",
    "homey",
    "wordpress themes",
    "real estate",
    "web development",
  ],
  authors: [{ name: "Waqas Riaz" }],
  creator: "Waqas Riaz",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://waqasriaz.com",
    siteName: "Waqas Riaz",
    title: "Waqas Riaz - Software Developer & Product Builder",
    description:
      "Creator of Houzez and Homey WordPress themes, powering 60,000+ websites worldwide.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Waqas Riaz - Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Waqas Riaz - Software Developer",
    description: "Creator of Houzez & Homey. Building digital products that scale.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
