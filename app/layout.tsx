import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "youcando-it.jp",
  description: "AI経営管理システム",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
