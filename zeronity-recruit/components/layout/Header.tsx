"use client";

import { useState } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const navItems = [
  { href: "/philosophy", label: "Philosophy" },
  { href: "/business", label: "Business" },
  { href: "/projects", label: "Projects" },
  { href: "/environment", label: "Environment" },
  { href: "/compensation", label: "Compensation" },
  { href: "/members", label: "Members" },
  { href: "/recruit", label: "Recruit" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [entryOpen, setEntryOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight font-heading">
          Zeronity
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-text-sub hover:text-text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {/* Entry dropdown */}
          <div className="relative">
            <button
              onClick={() => setEntryOpen(!entryOpen)}
              onBlur={() => setTimeout(() => setEntryOpen(false), 150)}
              className="px-5 py-2 rounded-full bg-gradient-accent text-sm font-semibold text-white cursor-pointer"
            >
              エントリー
            </button>
            {entryOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-bg-secondary border border-white/10 shadow-xl overflow-hidden">
                <a
                  href="https://jp.indeed.com/cmp/Zeronity%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE/jobs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-sm text-text-sub hover:bg-white/5 hover:text-text-primary transition-colors"
                >
                  Indeed で応募
                </a>
                <a
                  href="https://en-gage.net/zeronity/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-sm text-text-sub hover:bg-white/5 hover:text-text-primary transition-colors"
                >
                  engage で応募
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-text-sub hover:text-text-primary transition-colors cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} items={navItems} />
    </header>
  );
}
