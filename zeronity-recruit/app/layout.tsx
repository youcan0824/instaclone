import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "採用情報 | Zeronity株式会社",
  description:
    "Zeronity株式会社の採用情報ページ。新しい世界を起動する仲間を募集しています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary font-sans">
        {children}
      </body>
    </html>
  );
}
