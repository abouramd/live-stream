import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Watch Live - Live Sports Streaming Platform",
  description: "Watch live sports matches in real-time. Stream football, basketball, tennis, and more with multiple high-quality sources.",
  keywords: ["live sports", "streaming", "football", "basketball", "sports matches", "live events"],
  authors: [
    {
      name: "Abdelhay Bouramdane",
      url: "https://github.com/abouramd",
    },
  ],
  creator: "Abdelhay Bouramdane",
  publisher: "Watch Live",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://live-stream-snowy.vercel.app",
    title: "Watch Live - Live Sports Streaming Platform",
    description: "Watch live sports matches in real-time. Stream football, basketball, tennis, and more.",
    siteName: "Watch Live",
    images: [
      {
        url: "https://live-stream-snowy.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Watch Live - Sports Streaming",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Watch Live - Live Sports Streaming",
    description: "Watch live sports matches in real-time with multiple streaming sources.",
    images: ["https://live-stream-snowy.vercel.app/og-image.png"],
  },
  alternates: {
    canonical: "https://live-stream-snowy.vercel.app",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
