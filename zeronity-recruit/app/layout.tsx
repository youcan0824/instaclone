import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";

export const metadata: Metadata = {
  title: "採用情報 | Zeronity株式会社",
  description:
    "Zeronity株式会社の採用情報ページ。新しい世界を起動する仲間を募集しています。",
  openGraph: {
    title: "採用情報 | Zeronity株式会社",
    description:
      "Zeronity株式会社の採用情報ページ。新しい世界を起動する仲間を募集しています。",
    siteName: "Zeronity Recruit",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary font-sans">
        <Header />
        <main className="pt-16 flex-1">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
