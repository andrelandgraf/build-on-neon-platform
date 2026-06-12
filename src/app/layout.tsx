import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Build on Neon Platform",
  description:
    "A showcase of real apps built on the Neon platform — Postgres, Auth, Functions, Object Storage, and the AI Gateway. This page's content lives in Neon Postgres and its screenshots stream from Neon Object Storage, served straight from Vercel.",
  metadataBase: new URL("https://build-on-neon-platform.vercel.app"),
  openGraph: {
    title: "Build on Neon Platform",
    description:
      "Real apps built on Neon — Postgres, Auth, Functions, Object Storage, AI Gateway.",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
