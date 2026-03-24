"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

type NavItem = {
  href: string;
  label: string;
};

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
};

export default function MobileMenu({ isOpen, onClose, items }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden bg-bg-primary border-b border-white/5"
        >
          <nav className="flex flex-col px-6 py-4 space-y-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="block py-3 text-sm text-text-sub hover:text-text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="px-6 pb-6 flex flex-col gap-3">
            <a
              href="https://jp.indeed.com/cmp/Zeronity%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE/jobs"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-3 rounded-lg bg-gradient-accent text-white text-sm font-semibold"
            >
              Indeed で応募
            </a>
            <a
              href="https://en-gage.net/zeronity/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-3 rounded-lg border border-white/10 text-text-sub text-sm font-semibold hover:text-text-primary transition-colors"
            >
              engage で応募
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
