# Zeronity 採用サイト Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Zeronity株式会社の採用専用サイトをNext.jsで新規構築し、Indeed・engageへの応募誘導を実現する

**Architecture:** Next.js App Router + SSGで静的生成。コンテンツはTypeScriptファイルでデータ管理（CMSなし）。共通レイアウト（Header/Footer/FloatingCTA）を全ページで共有し、Framer Motionでスクロールアニメーションを実装。

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4, Framer Motion, Vercel

**Spec:** `docs/superpowers/specs/2026-03-24-zeronity-recruit-site-design.md`

---

## File Structure

```
zeronity-recruit/
├── app/
│   ├── layout.tsx              # ルートレイアウト（Header/Footer/FloatingCTA/フォント設定）
│   ├── page.tsx                # TOP ページ
│   ├── philosophy/page.tsx     # Philosophy ページ
│   ├── business/page.tsx       # Business ページ
│   ├── projects/page.tsx       # Projects ページ
│   ├── environment/page.tsx    # Environment ページ
│   ├── compensation/page.tsx   # Compensation ページ
│   ├── members/page.tsx        # Members ページ
│   ├── recruit/page.tsx        # Recruit ページ
│   └── globals.css             # Tailwind base + カスタムスタイル
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # ヘッダー（ナビ + エントリーボタン）
│   │   ├── Footer.tsx          # フッター
│   │   ├── FloatingCTA.tsx     # フローティング応募ボタン
│   │   └── MobileMenu.tsx      # モバイルハンバーガーメニュー
│   ├── ui/
│   │   ├── SectionHeading.tsx  # セクション見出し（英字ラベル + 日本語タイトル）
│   │   ├── CTAButtons.tsx      # Indeed/engage CTAボタンペア
│   │   ├── CountUpNumber.tsx   # カウントアップアニメーション数字
│   │   ├── GradientText.tsx    # 紫→赤グラデーションテキスト
│   │   └── GeometricShapes.tsx # 幾何学モチーフ（三角・六角・球体）
│   ├── top/
│   │   ├── HeroSection.tsx     # ファーストビュー
│   │   ├── NumbersSection.tsx  # 数字で見るZeronity
│   │   ├── NavCards.tsx        # コンテンツ導線カード
│   │   └── MessageCTA.tsx      # 締めメッセージ + CTA
│   ├── philosophy/
│   │   ├── PhilosophySection.tsx
│   │   ├── VisionSection.tsx
│   │   └── ValuesSection.tsx
│   ├── business/
│   │   ├── EcosystemDiagram.tsx
│   │   ├── BusinessCreation.tsx
│   │   ├── IndustryScope.tsx
│   │   └── DifferentiationTable.tsx
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   └── ProjectDetail.tsx
│   ├── environment/
│   │   ├── FiveAttractions.tsx
│   │   ├── FreelanceSection.tsx
│   │   ├── DailySchedule.tsx
│   │   ├── CareerPath.tsx
│   │   ├── AlumniStories.tsx
│   │   └── Benefits.tsx
│   ├── compensation/
│   │   ├── SalaryTable.tsx
│   │   └── EvaluationSystem.tsx
│   ├── recruit/
│   │   ├── JobPositions.tsx
│   │   ├── SelectionFlow.tsx
│   │   └── FAQ.tsx
│   └── members/
│       ├── BoardMembers.tsx
│       ├── EmployeeCards.tsx
│       └── CompanyStats.tsx
├── data/
│   ├── company.ts              # 会社基本情報・数字データ
│   ├── philosophy.ts           # Philosophy/Vision/Values データ
│   ├── business.ts             # 事業内容データ
│   ├── projects.ts             # プロジェクト事例データ
│   ├── environment.ts          # 働く環境データ（スケジュール含む）
│   ├── compensation.ts         # 給与・評価制度データ
│   ├── recruit.ts              # 募集職種・選考フロー・FAQ データ
│   └── members.ts              # メンバーデータ
├── public/
│   ├── images/                 # ダミー画像（後で差し替え）
│   └── favicon.ico
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .gitignore
```

---

## Task 1: プロジェクト初期化 + デザインシステム基盤

**Files:**
- Create: `zeronity-recruit/` (プロジェクト全体)
- Create: `zeronity-recruit/app/globals.css`
- Create: `zeronity-recruit/app/layout.tsx`
- Create: `zeronity-recruit/app/page.tsx` (仮)
- Create: `zeronity-recruit/tailwind.config.ts`

- [ ] **Step 1: Next.jsプロジェクトを作成**

```bash
cd "C:/Users/fujin/OneDrive/ドキュメント/ClaudCode_youcando-it.jp"
npx create-next-app@latest zeronity-recruit --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --turbopack
```

- [ ] **Step 2: Framer Motionをインストール**

```bash
cd zeronity-recruit
npm install framer-motion
```

- [ ] **Step 3: Tailwind設定にカスタムカラー・フォントを追加**

`zeronity-recruit/tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0a0a0a",
          secondary: "#111111",
        },
        accent: {
          purple: "#7a00df",
          red: "#e8380d",
        },
        text: {
          primary: "#ffffff",
          sub: "rgba(255,255,255,0.5)",
          label: "rgba(255,255,255,0.4)",
        },
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', '"Inter"', "sans-serif"],
        heading: ['"Inter"', '"Noto Sans JP"', "sans-serif"],
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(90deg, #7a00df, #e8380d)",
        "gradient-hero": "linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #1a0508 80%, #0a0a0a 100%)",
        "gradient-section": "linear-gradient(135deg, #1a0a2e 0%, #0a0a0a 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: globals.cssを設定**

`zeronity-recruit/app/globals.css`:
```css
@import "tailwindcss";

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;600;700&display=swap');

body {
  background-color: #0a0a0a;
  color: #ffffff;
}

.gradient-text {
  background: linear-gradient(90deg, #7a00df, #e8380d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-label {
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
}
```

- [ ] **Step 5: 仮のルートレイアウトとトップページを作成**

`zeronity-recruit/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "採用情報 | Zeronity株式会社",
  description: "Zeronity株式会社の採用情報。スタートアップファームで新しい世界を起動する仲間を募集しています。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-bg-primary text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

`zeronity-recruit/app/page.tsx`:
```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">
        新しい世界を<span className="gradient-text">起動</span>する
      </h1>
    </main>
  );
}
```

- [ ] **Step 6: ビルド確認**

```bash
cd zeronity-recruit
npm run build
```

Expected: ビルド成功、エラーなし

- [ ] **Step 7: dev serverで表示確認**

```bash
npm run dev
```

Expected: localhost:3000 でダークベースにグラデーションテキストが表示される

- [ ] **Step 8: コミット**

```bash
git add zeronity-recruit/
git commit -m "feat: Zeronity採用サイト - プロジェクト初期化 + デザインシステム基盤"
```

---

## Task 2: 共通UIコンポーネント

**Files:**
- Create: `zeronity-recruit/components/ui/SectionHeading.tsx`
- Create: `zeronity-recruit/components/ui/CTAButtons.tsx`
- Create: `zeronity-recruit/components/ui/CountUpNumber.tsx`
- Create: `zeronity-recruit/components/ui/GradientText.tsx`
- Create: `zeronity-recruit/components/ui/GeometricShapes.tsx`

- [ ] **Step 1: SectionHeading コンポーネント**

`zeronity-recruit/components/ui/SectionHeading.tsx`:
```tsx
type Props = {
  label: string;       // 英字ラベル（例: "PHILOSOPHY"）
  title: string;       // 日本語タイトル（例: "理念・ビジョン"）
  subtitle?: string;   // サブタイトル
};

export function SectionHeading({ label, title, subtitle }: Props) {
  return (
    <div className="text-center mb-12">
      <p className="section-label mb-3">{label}</p>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {subtitle && (
        <p className="text-text-sub text-sm md:text-base max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: CTAButtons コンポーネント**

`zeronity-recruit/components/ui/CTAButtons.tsx`:
```tsx
type Props = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function CTAButtons({ size = "md", className = "" }: Props) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 justify-center ${className}`}>
      <a
        href="https://jp.indeed.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={`bg-gradient-accent text-white font-semibold rounded-lg text-center hover:opacity-90 transition-opacity ${sizeClasses[size]}`}
      >
        Indeed で応募する
      </a>
      <a
        href="https://en-gage.net/"
        target="_blank"
        rel="noopener noreferrer"
        className={`border border-white/30 text-white font-semibold rounded-lg text-center hover:border-white/60 transition-colors ${sizeClasses[size]}`}
      >
        engage で応募する
      </a>
    </div>
  );
}
```

- [ ] **Step 3: CountUpNumber コンポーネント**

`zeronity-recruit/components/ui/CountUpNumber.tsx`:
```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
};

export function CountUpNumber({ end, suffix = "", label, duration = 2000 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-center p-6">
      <div className="text-4xl md:text-5xl font-bold gradient-text">
        {count.toLocaleString()}
      </div>
      {suffix && (
        <div className="text-text-label text-sm mt-1">{suffix}</div>
      )}
      <div className="text-text-sub text-sm mt-2">{label}</div>
    </div>
  );
}
```

- [ ] **Step 4: GradientText コンポーネント**

`zeronity-recruit/components/ui/GradientText.tsx`:
```tsx
type Props = {
  children: React.ReactNode;
  className?: string;
};

export function GradientText({ children, className = "" }: Props) {
  return (
    <span className={`gradient-text ${className}`}>{children}</span>
  );
}
```

- [ ] **Step 5: GeometricShapes コンポーネント**

`zeronity-recruit/components/ui/GeometricShapes.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";

export function GeometricShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 三角形 */}
      <motion.div
        className="absolute top-[10%] left-[5%] w-16 h-16 border-2 border-accent-purple/30"
        style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* 六角形 */}
      <motion.div
        className="absolute top-[20%] right-[10%] w-20 h-20 border-2 border-accent-red/20"
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
        animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* 球体 */}
      <motion.div
        className="absolute bottom-[15%] left-[15%] w-12 h-12 rounded-full border-2 border-accent-purple/25"
        animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* 菱形 */}
      <motion.div
        className="absolute bottom-[25%] right-[20%] w-14 h-14 border-2 border-accent-red/15 rotate-45"
        animate={{ y: [0, 12, 0], rotate: [45, 55, 45] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* 小さな円 */}
      <motion.div
        className="absolute top-[60%] left-[50%] w-8 h-8 rounded-full border border-accent-purple/20"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
```

- [ ] **Step 6: ビルド確認**

```bash
cd zeronity-recruit && npm run build
```

Expected: ビルド成功

- [ ] **Step 7: コミット**

```bash
git add zeronity-recruit/components/ui/
git commit -m "feat: 共通UIコンポーネント（SectionHeading, CTAButtons, CountUp, GradientText, GeometricShapes）"
```

---

## Task 3: レイアウト（Header / Footer / FloatingCTA / MobileMenu）

**Files:**
- Create: `zeronity-recruit/components/layout/Header.tsx`
- Create: `zeronity-recruit/components/layout/Footer.tsx`
- Create: `zeronity-recruit/components/layout/FloatingCTA.tsx`
- Create: `zeronity-recruit/components/layout/MobileMenu.tsx`
- Modify: `zeronity-recruit/app/layout.tsx`

- [ ] **Step 1: Header コンポーネント**

`zeronity-recruit/components/layout/Header.tsx`:
```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";

const navItems = [
  { href: "/philosophy", label: "Philosophy" },
  { href: "/business", label: "Business" },
  { href: "/projects", label: "Projects" },
  { href: "/environment", label: "Environment" },
  { href: "/compensation", label: "Compensation" },
  { href: "/members", label: "Members" },
  { href: "/recruit", label: "Recruit" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ctaOpen, setCtaOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold font-heading tracking-wider">
          Zeronity
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-text-sub hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Entry Button (Desktop) */}
        <div className="hidden lg:block relative">
          <button
            onClick={() => setCtaOpen(!ctaOpen)}
            className="bg-gradient-accent text-white text-sm font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            エントリー
          </button>
          {ctaOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-bg-secondary border border-white/10 rounded-lg shadow-xl overflow-hidden">
              <a
                href="https://jp.indeed.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-sm hover:bg-white/5 transition-colors"
              >
                Indeed で応募
              </a>
              <a
                href="https://en-gage.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-sm hover:bg-white/5 transition-colors border-t border-white/5"
              >
                engage で応募
              </a>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="メニュー"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} items={navItems} />
    </header>
  );
}
```

- [ ] **Step 2: MobileMenu コンポーネント**

`zeronity-recruit/components/layout/MobileMenu.tsx`:
```tsx
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  items: { href: string; label: string }[];
};

export function MobileMenu({ isOpen, onClose, items }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-bg-primary border-t border-white/5"
        >
          <nav className="flex flex-col px-4 py-4 gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="text-text-sub hover:text-white py-3 border-b border-white/5 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4">
              <a
                href="https://jp.indeed.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-accent text-white text-center font-semibold py-3 rounded-lg"
              >
                Indeed で応募する
              </a>
              <a
                href="https://en-gage.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 text-white text-center font-semibold py-3 rounded-lg"
              >
                engage で応募する
              </a>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Footer コンポーネント**

`zeronity-recruit/components/layout/Footer.tsx`:
```tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Company Info */}
          <div>
            <p className="text-lg font-bold font-heading mb-2">Zeronity Inc.</p>
            <p className="text-text-label text-sm">
              東京都新宿区四谷3-11 岡崎ビル4F
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-text-sub">
            <a href="https://www.0-i.co.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              コーポレートサイト
            </a>
            <Link href="/recruit" className="hover:text-white transition-colors">
              募集要項
            </Link>
            <a href="https://www.0-i.co.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              プライバシーポリシー
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Facebook
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center text-text-label text-xs">
          &copy; {new Date().getFullYear()} Zeronity Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: FloatingCTA コンポーネント**

`zeronity-recruit/components/layout/FloatingCTA.tsx`:
```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingCTA() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-48 bg-bg-secondary border border-white/10 rounded-lg shadow-xl overflow-hidden mb-2"
          >
            <a
              href="https://jp.indeed.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 text-sm hover:bg-white/5 transition-colors"
            >
              Indeed で応募
            </a>
            <a
              href="https://en-gage.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 text-sm hover:bg-white/5 transition-colors border-t border-white/5"
            >
              engage で応募
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="bg-gradient-accent text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
        aria-label="応募する"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      </button>
    </div>
  );
}
```

- [ ] **Step 5: layout.tsx にHeader/Footer/FloatingCTAを統合**

`zeronity-recruit/app/layout.tsx` を更新:
```tsx
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import "./globals.css";

export const metadata: Metadata = {
  title: "採用情報 | Zeronity株式会社",
  description: "Zeronity株式会社の採用情報。スタートアップファームで新しい世界を起動する仲間を募集しています。",
  openGraph: {
    title: "採用情報 | Zeronity株式会社",
    description: "スタートアップファームで新しい世界を起動する仲間を募集しています。",
    siteName: "Zeronity Recruit",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-bg-primary text-text-primary font-sans antialiased">
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
```

- [ ] **Step 6: ビルド確認**

```bash
cd zeronity-recruit && npm run build
```

Expected: ビルド成功

- [ ] **Step 7: コミット**

```bash
git add zeronity-recruit/components/layout/ zeronity-recruit/app/layout.tsx
git commit -m "feat: レイアウト（Header, Footer, FloatingCTA, MobileMenu）"
```

---

## Task 4: コンテンツデータファイル

**Files:**
- Create: `zeronity-recruit/data/company.ts`
- Create: `zeronity-recruit/data/philosophy.ts`
- Create: `zeronity-recruit/data/business.ts`
- Create: `zeronity-recruit/data/projects.ts`
- Create: `zeronity-recruit/data/environment.ts`
- Create: `zeronity-recruit/data/compensation.ts`
- Create: `zeronity-recruit/data/recruit.ts`
- Create: `zeronity-recruit/data/members.ts`

- [ ] **Step 1: company.ts（会社基本情報 + 数字データ）**

`zeronity-recruit/data/company.ts`:
```typescript
export const companyInfo = {
  name: "Zeronity株式会社",
  nameEn: "Zeronity Inc.",
  address: "東京都新宿区四谷3-11 岡崎ビル4F",
  founded: "2017年11月28日",
  capital: "5000万円（資本準備金含む）",
  ceo: "代表取締役 加藤寛大",
  employees: 67,
  corporateUrl: "https://www.0-i.co.jp/",
  businesses: ["人材教育事業", "業務支援事業", "環境開発事業"],
};

export const companyNumbers = [
  { end: 67, suffix: "名", label: "従業員数" },
  { end: 95, suffix: "%", label: "20-30代比率" },
  { end: 500, suffix: "名+", label: "累計支援人材" },
  { end: 2017, suffix: "年設立", label: "創業" },
];
```

- [ ] **Step 2: philosophy.ts**

`zeronity-recruit/data/philosophy.ts`:
```typescript
export const philosophy = {
  statement: "一人ひとりが、本当に好きなことを通して新しい可能性が輝く世界を創り出し続ける",
  vision: {
    title: "スタートアップファームの共創",
    titleEn: "BUILDING A STARTUP HUB WHERE NEW IDEAS SPARK AND A WHOLE NEW WORLD COMES TO LIFE.",
    description: "すべての人が新しい価値を創造し、全く新しい世の中を生み出せる世界を創っていきたいと考えています。スタートアップとしての機動力とコンサルティングファームとしての正確性をあわせたプロジェクトベース型のワークスタイルでイノベーションを共創し続けます。",
  },
  values: [
    {
      titleEn: "Respect & Reflection",
      titleJa: "他者への敬意と自己の深い内省",
      description: "常に謙虚に人のいい所を発見し、自分の課題を真摯に見つめ進化し続ける",
    },
    {
      titleEn: "Proactive & Payforward",
      titleJa: "取りに行き、次に受け継ぐ",
      description: "しがみついてすべての仕事を盗む。いいものは次世代に残す",
    },
    {
      titleEn: "Challenge & Commitment",
      titleJa: "大胆な挑戦と実現への約束",
      description: "未来へのリスクをとって即行動。約束したら必ずやり抜く",
    },
    {
      titleEn: "Instant & Zone",
      titleJa: "一瞬一秒への全集中",
      description: "人生は一瞬。今この瞬間に全力になれ。自分の生き様をさぼるな",
    },
    {
      titleEn: "Heartful & Smart",
      titleJa: "強い熱意と高い知性",
      description: "理想は高く、現実は固く。目的を持ち、戦略的に考える。",
    },
  ],
};
```

- [ ] **Step 3: business.ts**

`zeronity-recruit/data/business.ts`:
```typescript
export const ecosystem = {
  businesses: [
    {
      name: "人材教育",
      nameEn: "Education",
      description: "次世代起業家にむけたO2O型教育事業。累計500名超の支援実績。",
      mission: "人材の発掘と変革の支援",
    },
    {
      name: "業務支援",
      nameEn: "Consulting",
      description: "企業から依頼を受けた受託型コンサルティング事業。経営戦略〜実行支援まで幅広く支援。",
      mission: "企業拡大と変革の支援",
    },
    {
      name: "環境開発",
      nameEn: "Space",
      description: "起業家＆投資家向けのオフィス開発・賃貸事業。",
      mission: "イノベーション環境の構築",
    },
  ],
};

export const functionalAreas = [
  "経営戦略", "事業開発", "人事組織", "マーケティング", "プロダクト開発", "ファイナンス",
];

export const industries = [
  "ヘルスケア", "金融", "IT", "製造業", "通信・ハイテク", "公共・官公庁",
];

export const specialties = [
  "戦略", "IT戦略・マネジメント", "財務・会計", "人事", "M&A", "マーケティング",
];

export const differentiation = {
  headers: ["", "Zeronity", "コンサルファーム", "スタートアップ"],
  rows: [
    {
      category: "目的",
      zeronity: "中長期の成長を支える「仕組み強化」",
      consul: "要望に応じた成果提供が主",
      startup: "短期的な急成長に囚われがち",
    },
    {
      category: "アプローチ",
      zeronity: "リーン検証サイクルを組み込む",
      consul: "明確な戦略を念入りに作り込むが実行に時間がかかる",
      startup: "高速な検証を数多くこなすが論点が不明確になりがち",
    },
    {
      category: "スタンス",
      zeronity: "経営層の視点で目の前のタスクを推進",
      consul: "I型人材が専門領域に特化",
      startup: "幅広いスキルを持つが専門的知見が不足",
    },
    {
      category: "リソース",
      zeronity: "スタートアップネットワークを活用",
      consul: "研修や知見共有による専門人材",
      startup: "強固な創業チームや技術活用",
    },
  ],
};
```

- [ ] **Step 4: projects.ts**

`zeronity-recruit/data/projects.ts`:
```typescript
export type Project = {
  id: string;
  industry: string;
  industryTag: string;
  title: string;
  summary: string;
  background: string;
  support: string;
  result: string;
  team: string;
  experiences: {
    role: string;
    name: string;
    position: string;
    challenge: string;
    growth: string;
  }[];
};

export const projects: Project[] = [
  {
    id: "pharma-marketing",
    industry: "ヘルスケア",
    industryTag: "外資製薬 × マーケティング × 大企業",
    title: "新規事業立ち上げに伴う戦略立案・マーケティング支援",
    summary: "患者支援サービスの新規事業コンセプト策定からマネタイズモデル構築まで",
    background: "患者支援には、企業視点ではなく顧客視点のビジネスモデルが必要だが、従来のアプローチでは十分に対応できていなかった。",
    support: "デザイン思考を活用し、顧客の課題を抽出。リーンスタートアップ手法で仮説検証を行い、最適な事業モデルを設計。",
    result: "市場ニーズに基づく事業コンセプトとマネタイズモデルを確立しプロトタイピングで具体化。持続可能なサービスモデルを構築。",
    team: "マネジャー1名、シニアアソシエイト1名、アソシエイト2名",
    experiences: [
      {
        role: "マネジャー",
        name: "Kさん",
        position: "プロジェクト全体の方針設計、進捗管理、クライアントとの折衝、メンバーの育成",
        challenge: "不確実性の高い状況の中で、限られた時間の中で取り組むべきことの優先順位をつけて意思決定を行うことが求められた。",
        growth: "抽象度の高い課題に対して構造的に方針を描く力を高めた。多様なステークホルダーと合意形成を図るファシリテーション力も強化された。",
      },
      {
        role: "メンバー",
        name: "Fさん",
        position: "顧客課題のリサーチ、データ分析、ビジネスモデル設計をサポート",
        challenge: "顧客視点のビジネスモデル設計において、既存の枠組みにとらわれず新たな価値を見出すことが求められ、仮説検証の繰り返しが必要だった。",
        growth: "デザイン思考やリーンスタートアップの実践を通じ、課題発見力と仮説検証スキルを向上。顧客ニーズへの深い理解力を養った。",
      },
    ],
  },
  {
    id: "it-public-policy",
    industry: "IT",
    industryTag: "外資IT × 経営戦略 × 大企業",
    title: "公共政策チームの戦略・企画支援",
    summary: "デジタルプラットフォーム企業の公共政策チームにおける対外関係強化プロジェクト",
    background: "デジタルプラットフォームを運営する公共政策チームにおいて、政府や自治体との連携業務を担う人材が不足。対外関係の強化に課題があった。",
    support: "政策動向を調査・分析し、事業リスクや機会の可視化を支援。あわせて行政・自治体との関係構築や情報発信活動をサポート。",
    result: "10件以上の政策関連プロジェクトを推進。対外連携の体制強化と、行政・パートナーとの信頼関係を深化。",
    team: "マネジャー3名、コンサルタント3名、アソシエイト7名",
    experiences: [
      {
        role: "マネジャー",
        name: "Oさん",
        position: "プロジェクト全体の方針設計、進捗管理・実行、クライアントおよび関係機関との連携調整、メンバーマネジメント",
        challenge: "複数プロジェクトが同時並行で進行し、関係者が多岐にわたるため、ステークホルダー間の調整や優先順位付けが特に難易度の高い業務だった。",
        growth: "多様な立場の関係者の意図を読み取りつつ、全員が同じ方向を向けるような構想力・合意形成力が身についた。",
      },
      {
        role: "メンバー",
        name: "Nさん",
        position: "政策リサーチ・分析、連携企画に必要な資料作成",
        challenge: "公共政策に関する知識が浅い中で、政府や業界団体を巻き込むための調査・資料作成を任され、情報の正確性と説得力を両立させる難しさを実感した。",
        growth: "リサーチ業務から成果物の品質管理まで一貫して携わることで、スピード感と精度の両立、マルチタスクの実行力が養われた。",
      },
    ],
  },
];
```

- [ ] **Step 5: environment.ts**

`zeronity-recruit/data/environment.ts`:
```typescript
export const fiveAttractions = [
  { title: "Purpose", titleJa: "理念・目的", description: "「新しい世界を起動する」というビジョンのもと、事業が持続的に生まれるような新たなエコシステム「スタートアップファーム」を構築しています。" },
  { title: "Job", titleJa: "仕事・キャリア", description: "多様な業界・専門領域・組織規模のクライアントに対して、新規事業の立ち上げ・グロースを経営層に近い立場から支援します。" },
  { title: "People", titleJa: "人", description: "志をもちスキルやマインドの優れたメンバーと働ける環境があります。起業家やスタートアップとのネットワークでキャリアの可能性を広げます。" },
  { title: "Support", titleJa: "支援体制", description: "一人ひとりのキャリアビジョンや成長フェーズにあわせたメンタリングやスキルアップの機会が得られます。" },
  { title: "Privilege", titleJa: "給与/福利厚生", description: "役割と成果に応じた納得感のある報酬制度・評価が整備されています。フリーランスのような柔軟な働き方と安定した収入を両立できます。" },
];

export const freelanceAttractions = [
  { title: "自分のチームを構築", description: "教育事業部との連携で優秀な人材を確保。サポート体制を活用し効率的なメンバーのスキルアップを実現。" },
  { title: "キャリア・資産形成を加速", description: "起業やスタートアップ経営も視野に入れたキャリア設計支援。不動産・事業投資の学習機会あり。" },
  { title: "プライベートの充実", description: "チームメンバーとの長期的な関係構築が可能。柔軟な働き方の選択肢でライフスタイルに合わせた働き方が可能。" },
];

export type ScheduleEntry = { time: string; activity: string };

export const dailySchedules: Record<string, { title: string; description: string; entries: ScheduleEntry[] }> = {
  junior: {
    title: "若手メンバー",
    description: "情報収集・分析や資料作成を担当し、クライアントとのやりとりにも積極的に関わります。",
    entries: [
      { time: "10:00", activity: "出社・始業：オフィスでの作業開始" },
      { time: "10:00-12:00", activity: "競合リサーチ：新規事業の競合サービスをリサーチ" },
      { time: "12:00-13:00", activity: "お昼休憩" },
      { time: "13:00-14:30", activity: "資料作成：競合調査の結果を取りまとめた資料を作成" },
      { time: "14:30-15:30", activity: "レビューMTG・資料修正" },
      { time: "15:30-17:00", activity: "クライアントMTG：競合調査結果を報告" },
      { time: "17:30-18:00", activity: "チームMTG：課題やネクストアクション・役割分担を議論" },
      { time: "18:00-18:30", activity: "フィードバック：マネジャーからのフィードバック" },
      { time: "18:30-19:00", activity: "顧客インタビュー：ニーズ調査をオンラインで実施" },
      { time: "19:00-20:00", activity: "社内勉強会：マーケティング講座の受講" },
      { time: "20:00", activity: "終業：業務の振り返り＆明日の準備" },
    ],
  },
  manager: {
    title: "プロジェクトマネージャー",
    description: "プロジェクト統括やクライアント対応を行い、必要に応じてリレーション構築や人材育成を担います。",
    entries: [
      { time: "10:00", activity: "始業：リモートワークでの作業開始" },
      { time: "10:00-11:30", activity: "資料作成：新規事業立案PJのクライアント向け資料作成" },
      { time: "11:30-13:00", activity: "出社・お昼休憩：メンバーとの交流も兼ねたランチ会" },
      { time: "13:00-15:00", activity: "クライアント経営層向けワークショップ実施" },
      { time: "15:00-16:00", activity: "チームMTG：ワークショップ振り返り" },
      { time: "16:00-17:00", activity: "採用面談：候補者2名と面談実施" },
      { time: "17:00-18:30", activity: "クライアントMTG + チームMTG" },
      { time: "18:30-20:30", activity: "クライアントとの会食" },
      { time: "20:30", activity: "終業：メンバーの日報・メール確認" },
    ],
  },
  corporate: {
    title: "コーポレートスタッフ",
    description: "総務・人事・法務など、組織に必要なバックオフィス業務を幅広く担います。",
    entries: [
      { time: "10:00", activity: "出社・始業：作業開始" },
      { time: "10:00-11:30", activity: "法務関連：契約書作成・リーガルチェック、弁護士との協議" },
      { time: "11:30-12:30", activity: "お昼休憩：メンバーと意見交換" },
      { time: "13:00-15:00", activity: "人事関連：採用計画の検討" },
      { time: "15:00-16:00", activity: "人事採用MTG：候補者評価、採用方針の議論" },
      { time: "16:00-17:00", activity: "資料作成・作業：採用資料の更新、業務効率化施策検討" },
      { time: "17:00-18:00", activity: "事業部横断MTG：組織課題の共有・解決策検討" },
      { time: "18:00-19:00", activity: "経理：請求書処理・予算管理" },
      { time: "19:00", activity: "終業：業務の振り返り＆明日の準備" },
    ],
  },
};

export const careerLevels = [
  { level: "アナリスト", description: "リサーチやデータ分析によりプロジェクトの基礎データを整理・提供" },
  { level: "アソシエート", description: "データ収集や分析を行い、実行支援を担当" },
  { level: "シニアアソシエート", description: "詳細な分析や調査を実施し、レポートやプレゼン資料作成をサポート" },
  { level: "マネジャー", description: "プロジェクトの計画・実行を主導し、チームメンバーの指導と進捗管理" },
  { level: "シニアマネジャー", description: "クライアントへの戦略的提案とプロジェクト推進をリード" },
  { level: "ディレクター", description: "クライアントとの関係構築、プロジェクトの全体戦略を決定" },
];

export const alumniStories = [
  {
    name: "Tさん",
    before: "Business Creator",
    after: "フリーコンサル・不動産投資家",
    story: "新卒でZeronityに入社。大手不動産向け新規事業開発支援、地方行政向け長期グランドデザイン策定等に携わり、経営スキルと知識を獲得。その後、独立し多様な企業支援や投資事業を展開。",
  },
  {
    name: "Fさん",
    before: "起業家",
    after: "Business Creator・起業家",
    story: "エンタメ教育コミュニティ、シェアハウス等の立ち上げを経てZeronityに参画。外資系製薬会社マーケティング戦略・サービスコンセプト検証支援やWEBマーケティング支援などを経験。",
  },
  {
    name: "Sさん",
    before: "Business Creator",
    after: "起業家（広告会社設立）",
    story: "学生時代にZeronityにて業務支援事業に従事する傍ら、自身のプロジェクト立ち上げに取り組み、広告会社を設立。「1兆円のグローバル企業を創る」を人生のビジョンに経営中。",
  },
];

export const benefits = [
  { category: "Work Style", items: ["スーパーフレックス制度", "週休2日制"] },
  { category: "Private Life", items: ["産休・育休", "介護休業"] },
  { category: "Other Support", items: ["コンサルタント研修", "新規事業開発研修", "資格手当"] },
];

export const cultureEvents = ["全社キックオフミーティング", "社内コミュニケーション補助費"];
```

- [ ] **Step 6: compensation.ts**

`zeronity-recruit/data/compensation.ts`:
```typescript
export const salaryTable = [
  { stage: "Executive", class: "A", title: "ディレクター / プリンシパル", range: "1,200万円〜" },
  { stage: "管理職", class: "B", title: "シニアマネジャー", range: "1,020万〜1,140万円" },
  { stage: "管理職", class: "C", title: "マネジャー", range: "840万〜960万円" },
  { stage: "Standard", class: "A", title: "シニアアソシエート", range: "660万〜780万円" },
  { stage: "Standard", class: "B", title: "アソシエート", range: "480万〜600万円" },
  { stage: "Standard", class: "C", title: "アナリスト", range: "300万〜420万円" },
];

export const evaluationProcess = [
  { step: "目標設定", timing: "4月 / 10月" },
  { step: "中間経過確認", timing: "7月 / 1月" },
  { step: "自己評価", timing: "9月 / 3月" },
  { step: "評価面談・フィードバック", timing: "10月 / 4月" },
];

export const evaluationAxes = [
  { name: "プロセス評価", description: "行動特性（コンピテンシー）" },
  { name: "リザルト評価", description: "個人成果" },
  { name: "業績", description: "企業業績" },
];
```

- [ ] **Step 7: recruit.ts**

`zeronity-recruit/data/recruit.ts`:
```typescript
export const positions = [
  {
    category: "コンサルタント",
    title: "新規事業開発コンサルタント",
    target: "新卒・キャリア共通",
    description: "経営戦略〜実行支援まで幅広く支援を行います。",
  },
  {
    category: "コーポレートスタッフ",
    title: "人事",
    target: "キャリア",
    description: "採用・人材育成、労務管理、組織開発などを担当。",
  },
  {
    category: "コーポレートスタッフ",
    title: "経理・財務",
    target: "キャリア",
    description: "経理業務、予算管理、資金調達を行います。",
  },
  {
    category: "コーポレートスタッフ",
    title: "総務",
    target: "キャリア",
    description: "オフィス管理、事務サポート、法務・コンプライアンスが主な業務です。",
  },
  {
    category: "コーポレートスタッフ",
    title: "広報",
    target: "キャリア",
    description: "社外広報、社内広報が主な業務です。",
  },
  {
    category: "コーポレートスタッフ",
    title: "情報システム",
    target: "キャリア",
    description: "ITインフラ管理、セキュリティ対策を担当します。",
  },
  {
    category: "コーポレートスタッフ",
    title: "開発（エンジニアリング）",
    target: "キャリア",
    description: "システム開発、技術選定・アーキテクチャ設計、DevOps/インフラ管理。",
  },
];

export type SelectionStep = { label: string };

export const selectionFlows: Record<string, { title: string; steps: SelectionStep[] }> = {
  newgrad: {
    title: "新卒採用",
    steps: [
      { label: "書類選考" },
      { label: "面接（1〜2回）" },
      { label: "インターンシップ内定" },
      { label: "最終面接" },
      { label: "オファー" },
    ],
  },
  career: {
    title: "キャリア採用",
    steps: [
      { label: "書類選考" },
      { label: "カジュアル面談" },
      { label: "プレゼンテーション面接" },
      { label: "最終面接" },
      { label: "オファー面談" },
    ],
  },
  freelance: {
    title: "フリーコンサル",
    steps: [
      { label: "カジュアル面談" },
      { label: "スキルシート確認" },
      { label: "条件面談" },
      { label: "契約" },
    ],
  },
};

export const faqs = [
  { question: "どのような経歴の方が在籍していますか？", answer: "コンサルティングファーム出身、メガベンチャー出身、スタートアップ出身、官公庁出身、起業家など、多種多様なバックグラウンドを持ったメンバーが活躍しています。" },
  { question: "プロジェクトにはどのようにアサインされますか？", answer: "案件状況やプロジェクト特性、本人の能力・適性および希望等を考慮した上でアサインしています。" },
  { question: "副業は可能ですか？", answer: "副業は要申請としています。起業を目指すメンバーに対しては、起業支援制度を用意しています。" },
  { question: "就業時の服装の指定はありますか？", answer: "クライアント先のルールに合わせていただきますが、社内はTPOに合っていれば原則自由です。" },
  { question: "オンライン面接は可能ですか？", answer: "可能ですが、入社時のギャップを解消するため、選考プロセスのどこかでオフィスに来ていただくことを推奨しております。" },
  { question: "どんなスキル・能力を重視しますか？", answer: "どの組織でも通用するポータブルスキルと、固有の専門性を兼ね備えた人材を求めています。また、価値観を非常に重視しています。" },
  { question: "プレゼンテーション面接とは何ですか？", answer: "事前にお伝えするテーマに対してプレゼンテーションをしていただきます。テーマは、志望理由、入社後のキャリア形成、会社にどのような貢献ができるか等です。" },
  { question: "インターンシップではどのようなことが経験できますか？", answer: "業務支援事業の一員として経営戦略〜実行支援まで幅広く支援を行っていただきます。まずは、リサーチや資料作成から挑戦していただきます。" },
];
```

- [ ] **Step 8: members.ts**

`zeronity-recruit/data/members.ts`:
```typescript
export const boardMembers = [
  {
    name: "加藤 寛大",
    nameEn: "Kanta Kato",
    role: "代表取締役 CEO",
    message: "Zeronityは新しい世界を起動する全ての起業を支援するスタートアップファームです。一瞬一秒全ての時間を挑戦に充ててほしい。何かに本気で打ち込みたいと思ったら是非足を運んでみてください。あなたのアイディアや見識・人脈と、我々の持つ知見やネットワークを組み合わせ、可能性有る未来を共に創りましょう。",
    image: "/images/placeholder-ceo.jpg",
  },
  {
    name: "小川 隆太",
    nameEn: "Ryuta Ogawa",
    role: "取締役 COO",
    message: "環境のせいにせず、結果を出すことに本気で向き合えるか。Zeronityでは、事業の成長と共に個人も進化できる環境があります。自ら考え、行動し、未来を創る。さまざまなバックグラウンドを持つ多彩なメンバーと共に、スピード感のある環境で、変化を恐れず挑戦できる仲間を求めています。",
    image: "/images/placeholder-coo.jpg",
  },
  {
    name: "眞田 志帆",
    nameEn: "Shiho Sanada",
    role: "執行役",
    message: "自分の枠を超え、まだ見ぬ未来に飛び込むこと。Zeronityでは、その一歩を尊重し、支え合える仲間がいます。経験や肩書きではなく、意思と行動が未来をつくる。多様な価値観が交わる中で、自分らしい挑戦をカタチにし、全く新しい価値を共に創っていきましょう。",
    image: "/images/placeholder-exec.jpg",
  },
];

export const companyStats = {
  employees: 67,
  ageDistribution: [
    { label: "20代", percentage: 46 },
    { label: "30代", percentage: 49 },
    { label: "40代", percentage: 4.8 },
  ],
};
```

- [ ] **Step 9: ビルド確認**

```bash
cd zeronity-recruit && npm run build
```

Expected: ビルド成功（データファイルはインポートされていないがコンパイルエラーなし）

- [ ] **Step 10: コミット**

```bash
git add zeronity-recruit/data/
git commit -m "feat: コンテンツデータファイル（全8ページ分のテキスト・構造データ）"
```

---

## Task 5: TOP ページ実装

**Files:**
- Create: `zeronity-recruit/components/top/HeroSection.tsx`
- Create: `zeronity-recruit/components/top/NumbersSection.tsx`
- Create: `zeronity-recruit/components/top/NavCards.tsx`
- Create: `zeronity-recruit/components/top/MessageCTA.tsx`
- Modify: `zeronity-recruit/app/page.tsx`

- [ ] **Step 1: HeroSection を実装**

`zeronity-recruit/components/top/HeroSection.tsx`:
ファーストビューにキャッチコピー「新しい世界を起動する」+ 幾何学モチーフ + CTAボタン。背景は `bg-gradient-hero`、`GeometricShapes` を配置。Framer Motionで文字のフェードイン。

- [ ] **Step 2: NumbersSection を実装**

`zeronity-recruit/components/top/NumbersSection.tsx`:
`companyNumbers` データを `CountUpNumber` コンポーネントで4列グリッド表示。

- [ ] **Step 3: NavCards を実装**

`zeronity-recruit/components/top/NavCards.tsx`:
6枚のカード（3×2グリッド）。各カードは `Link` でページ遷移。ホバーで `border-gradient` エフェクト。

- [ ] **Step 4: MessageCTA を実装**

`zeronity-recruit/components/top/MessageCTA.tsx`:
締めメッセージ + `CTAButtons` コンポーネント。グラデーション背景。

- [ ] **Step 5: page.tsx を統合**

`zeronity-recruit/app/page.tsx` に全セクションをインポートして配置。

- [ ] **Step 6: dev serverで表示確認**

```bash
cd zeronity-recruit && npm run dev
```

Expected: トップページの4セクションが表示される

- [ ] **Step 7: コミット**

```bash
git add zeronity-recruit/components/top/ zeronity-recruit/app/page.tsx
git commit -m "feat: TOPページ（Hero, Numbers, NavCards, MessageCTA）"
```

---

## Task 6: Philosophy ページ実装

**Files:**
- Create: `zeronity-recruit/components/philosophy/PhilosophySection.tsx`
- Create: `zeronity-recruit/components/philosophy/VisionSection.tsx`
- Create: `zeronity-recruit/components/philosophy/ValuesSection.tsx`
- Create: `zeronity-recruit/app/philosophy/page.tsx`

- [ ] **Step 1: PhilosophySection** — タイポグラフィアニメーション（Framer Motion `staggerChildren`）で理念テキストが文字ごとに出現

- [ ] **Step 2: VisionSection** — ビジョンテキスト + エコシステム概念図（CSS/SVGで3事業の循環）

- [ ] **Step 3: ValuesSection** — 5つのバリューカード。`useInView` でスクロール時に1つずつフェードイン

- [ ] **Step 4: page.tsx に統合**

- [ ] **Step 5: ビルド確認 + コミット**

```bash
cd zeronity-recruit && npm run build
git add zeronity-recruit/components/philosophy/ zeronity-recruit/app/philosophy/
git commit -m "feat: Philosophyページ（理念・ビジョン・バリュー）"
```

---

## Task 7: Business ページ実装

**Files:**
- Create: `zeronity-recruit/components/business/EcosystemDiagram.tsx`
- Create: `zeronity-recruit/components/business/BusinessCreation.tsx`
- Create: `zeronity-recruit/components/business/IndustryScope.tsx`
- Create: `zeronity-recruit/components/business/DifferentiationTable.tsx`
- Create: `zeronity-recruit/app/business/page.tsx`

- [ ] **Step 1: EcosystemDiagram** — 3事業の循環モデル図（CSS円形レイアウト + 矢印アニメーション）

- [ ] **Step 2: BusinessCreation** — 経営戦略→事業別→機能別の階層図 + 6つの機能領域カード

- [ ] **Step 3: IndustryScope** — 業界・専門領域・組織規模のタグクラウド表示

- [ ] **Step 4: DifferentiationTable** — `differentiation` データの比較表。Zeronity列をグラデーションハイライト

- [ ] **Step 5: page.tsx に統合 + ビルド確認 + コミット**

```bash
cd zeronity-recruit && npm run build
git add zeronity-recruit/components/business/ zeronity-recruit/app/business/
git commit -m "feat: Businessページ（エコシステム・事業内容・差別化）"
```

---

## Task 8: Projects ページ実装

**Files:**
- Create: `zeronity-recruit/components/projects/ProjectCard.tsx`
- Create: `zeronity-recruit/components/projects/ProjectDetail.tsx`
- Create: `zeronity-recruit/app/projects/page.tsx`

- [ ] **Step 1: ProjectCard** — 業界タグ + タイトル + 概要のカード。クリックで詳細展開

- [ ] **Step 2: ProjectDetail** — モーダルまたはアコーディオンで詳細表示（背景・課題→支援→成果→チーム→経験談）

- [ ] **Step 3: page.tsx に統合** — `projects` データをカード2列グリッドで表示 + `CTAButtons` を末尾に

- [ ] **Step 4: ビルド確認 + コミット**

```bash
cd zeronity-recruit && npm run build
git add zeronity-recruit/components/projects/ zeronity-recruit/app/projects/
git commit -m "feat: Projectsページ（事例カード・詳細表示）"
```

---

## Task 9: Environment ページ実装

**Files:**
- Create: `zeronity-recruit/components/environment/FiveAttractions.tsx`
- Create: `zeronity-recruit/components/environment/FreelanceSection.tsx`
- Create: `zeronity-recruit/components/environment/DailySchedule.tsx`
- Create: `zeronity-recruit/components/environment/CareerPath.tsx`
- Create: `zeronity-recruit/components/environment/AlumniStories.tsx`
- Create: `zeronity-recruit/components/environment/Benefits.tsx`
- Create: `zeronity-recruit/app/environment/page.tsx`

- [ ] **Step 1: FiveAttractions** — 5つの魅力カード（アイコン + タイトル + 説明）

- [ ] **Step 2: FreelanceSection** — フリーコンサル向け3つの訴求カード

- [ ] **Step 3: DailySchedule** — タブ切り替え（若手/PM/コーポレート）+ タイムライン形式

- [ ] **Step 4: CareerPath** — 階段状ビジュアル（アナリスト→ディレクター）+ 複線型キャリア分岐図

- [ ] **Step 5: AlumniStories** — 3名のBefore→Afterカード

- [ ] **Step 6: Benefits** — アイコン付きリスト + カルチャーイベント

- [ ] **Step 7: page.tsx に統合 + ビルド確認 + コミット**

```bash
cd zeronity-recruit && npm run build
git add zeronity-recruit/components/environment/ zeronity-recruit/app/environment/
git commit -m "feat: Environmentページ（5つの魅力・スケジュール・キャリアパス・福利厚生）"
```

---

## Task 10: Compensation ページ実装

**Files:**
- Create: `zeronity-recruit/components/compensation/SalaryTable.tsx`
- Create: `zeronity-recruit/components/compensation/EvaluationSystem.tsx`
- Create: `zeronity-recruit/app/compensation/page.tsx`

- [ ] **Step 1: SalaryTable** — `salaryTable` データの表。Executive行をグラデーションハイライト

- [ ] **Step 2: EvaluationSystem** — 3軸図（プロセス×リザルト×業績）+ 評価サイクルのステップ表示

- [ ] **Step 3: page.tsx に統合 + ビルド確認 + コミット**

```bash
cd zeronity-recruit && npm run build
git add zeronity-recruit/components/compensation/ zeronity-recruit/app/compensation/
git commit -m "feat: Compensationページ（給与テーブル・評価制度）"
```

---

## Task 11: Recruit ページ実装

**Files:**
- Create: `zeronity-recruit/components/recruit/JobPositions.tsx`
- Create: `zeronity-recruit/components/recruit/SelectionFlow.tsx`
- Create: `zeronity-recruit/components/recruit/FAQ.tsx`
- Create: `zeronity-recruit/app/recruit/page.tsx`

- [ ] **Step 1: JobPositions** — コンサルタント + コーポレートスタッフ6職種をカード表示

- [ ] **Step 2: SelectionFlow** — タブ切り替え（新卒/キャリア/フリーコンサル）+ ステップ形式ビジュアル（矢印つなぎ）

- [ ] **Step 3: FAQ** — アコーディオン形式。`AnimatePresence` でアニメーション

- [ ] **Step 4: page.tsx に統合** — 末尾に大きなCTAセクション（`CTAButtons size="lg"`）

- [ ] **Step 5: ビルド確認 + コミット**

```bash
cd zeronity-recruit && npm run build
git add zeronity-recruit/components/recruit/ zeronity-recruit/app/recruit/
git commit -m "feat: Recruitページ（募集職種・選考フロー・FAQ・CTA）"
```

---

## Task 12: Members ページ実装

**Files:**
- Create: `zeronity-recruit/components/members/BoardMembers.tsx`
- Create: `zeronity-recruit/components/members/EmployeeCards.tsx`
- Create: `zeronity-recruit/components/members/CompanyStats.tsx`
- Create: `zeronity-recruit/app/members/page.tsx`

- [ ] **Step 1: BoardMembers** — 3名の大きめプロフィールカード（写真 + 役職 + メッセージ）

- [ ] **Step 2: EmployeeCards** — ダミー社員カード（写真 + 名前 + 職種 + コメント）。後から差し替え前提

- [ ] **Step 3: CompanyStats** — 年代比率のドーナツチャート（CSS `conic-gradient`）+ 従業員数

- [ ] **Step 4: page.tsx に統合 + ビルド確認 + コミット**

```bash
cd zeronity-recruit && npm run build
git add zeronity-recruit/components/members/ zeronity-recruit/app/members/
git commit -m "feat: Membersページ（ボードメンバー・社員紹介・統計）"
```

---

## Task 13: SEO・メタデータ・構造化データ

**Files:**
- Modify: 各 `page.tsx` にメタデータ追加
- Create: `zeronity-recruit/app/sitemap.ts`
- Create: `zeronity-recruit/app/robots.ts`

- [ ] **Step 1: 各ページに `metadata` export を追加**

各 `page.tsx` ファイルに個別のタイトル・description・OGPを設定:
```typescript
export const metadata: Metadata = {
  title: "理念・ビジョン | 採用情報 | Zeronity株式会社",
  description: "Zeronityが大切にしている理念・ビジョン・バリューをご紹介します。",
};
```

- [ ] **Step 2: sitemap.ts を作成**

```typescript
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://recruit.0-i.co.jp";
  const pages = ["", "/philosophy", "/business", "/projects", "/environment", "/compensation", "/members", "/recruit"];
  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page === "" ? 1 : 0.8,
  }));
}
```

- [ ] **Step 3: robots.ts を作成**

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://recruit.0-i.co.jp/sitemap.xml",
  };
}
```

- [ ] **Step 4: Recruitページに構造化データ（JobPosting schema）を追加**

`recruit/page.tsx` の `<head>` に JSON-LD を追加。

- [ ] **Step 5: ビルド確認 + コミット**

```bash
cd zeronity-recruit && npm run build
git add zeronity-recruit/
git commit -m "feat: SEO（メタデータ・sitemap・robots・構造化データ）"
```

---

## Task 14: レスポンシブ最終調整 + ビルド検証

**Files:**
- Modify: 各コンポーネントのレスポンシブ調整
- Create: `zeronity-recruit/public/images/` (プレースホルダー画像)

- [ ] **Step 1: プレースホルダー画像を配置**

`public/images/` に各メンバー用のダミー画像（SVGプレースホルダー）を作成。

- [ ] **Step 2: モバイル表示の確認・調整**

dev serverで各ページのモバイル表示（375px幅）を確認。グリッドが1列に折り返すこと、フォントサイズが適切であること、タッチターゲットが十分な大きさであることを確認。

- [ ] **Step 3: タブレット表示の確認・調整**

768px幅で中間レイアウトが適切であることを確認。

- [ ] **Step 4: 本番ビルド + Lighthouse確認**

```bash
cd zeronity-recruit && npm run build && npm run start
```

Lighthouse Performance 90+ を確認。

- [ ] **Step 5: .gitignore を確認**

`zeronity-recruit/.gitignore` に `.next/`, `node_modules/`, `.env*.local` が含まれていることを確認。

- [ ] **Step 6: 最終コミット**

```bash
git add zeronity-recruit/
git commit -m "feat: レスポンシブ最終調整 + プレースホルダー画像 + ビルド検証完了"
```

---

## Summary

| Task | 内容 | 推定ファイル数 |
|------|------|---------------|
| 1 | プロジェクト初期化 + デザインシステム | 5 |
| 2 | 共通UIコンポーネント | 5 |
| 3 | レイアウト（Header/Footer/CTA） | 5 |
| 4 | コンテンツデータファイル | 8 |
| 5 | TOP ページ | 5 |
| 6 | Philosophy ページ | 4 |
| 7 | Business ページ | 5 |
| 8 | Projects ページ | 3 |
| 9 | Environment ページ | 7 |
| 10 | Compensation ページ | 3 |
| 11 | Recruit ページ | 4 |
| 12 | Members ページ | 4 |
| 13 | SEO・メタデータ | 3 |
| 14 | レスポンシブ + ビルド検証 | - |
| **Total** | | **~61 files** |
