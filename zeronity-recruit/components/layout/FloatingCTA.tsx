"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function FloatingCTA() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2 mb-2"
          >
            <a
              href="https://jp.indeed.com/cmp/Zeronity%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE/jobs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-bg-secondary border border-white/10 text-sm font-semibold text-text-primary shadow-xl hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              Indeed で応募
            </a>
            <a
              href="https://en-gage.net/zeronity/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-bg-secondary border border-white/10 text-sm font-semibold text-text-primary shadow-xl hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              engage で応募
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        aria-label="エントリーメニューを開く"
        className="w-14 h-14 rounded-full bg-gradient-accent flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  );
}
