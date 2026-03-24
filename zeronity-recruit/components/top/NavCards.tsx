"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const navCardData = [
  {
    href: "/philosophy",
    label: "PHILOSOPHY",
    title: "理念・ビジョン",
    description: "私たちが大切にしていること",
  },
  {
    href: "/business",
    label: "BUSINESS",
    title: "事業内容",
    description: "3事業のエコシステム",
  },
  {
    href: "/projects",
    label: "PROJECTS",
    title: "プロジェクト事例",
    description: "実際の支援プロジェクト",
  },
  {
    href: "/environment",
    label: "ENVIRONMENT",
    title: "働く環境",
    description: "キャリア・福利厚生",
  },
  {
    href: "/members",
    label: "MEMBERS",
    title: "メンバー紹介",
    description: "ボード・社員の声",
  },
  {
    href: "/recruit",
    label: "RECRUIT",
    title: "募集要項",
    description: "職種・選考フロー・FAQ",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function NavCards() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {navCardData.map((card) => (
            <motion.div key={card.href} variants={cardVariants}>
              <Link
                href={card.href}
                className="group block bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-transparent hover:bg-white/[0.07] relative overflow-hidden"
              >
                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ padding: "1px", background: "linear-gradient(135deg, #7a00df, #e8380d)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }} />

                <span className="section-label">{card.label}</span>
                <h3 className="text-lg font-bold text-text-primary mt-2">
                  {card.title}
                </h3>
                <p className="text-text-sub text-sm mt-2">
                  {card.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
