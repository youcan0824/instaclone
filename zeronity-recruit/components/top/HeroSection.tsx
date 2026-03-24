"use client";

import { motion, type Variants } from "framer-motion";
import GeometricShapes from "@/components/ui/GeometricShapes";
import CTAButtons from "@/components/ui/CTAButtons";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      <GeometricShapes />

      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span className="section-label" variants={itemVariants}>
          ZERONITY RECRUITING
        </motion.span>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold font-heading mt-6 leading-tight"
          variants={itemVariants}
        >
          新しい世界を
          <span className="gradient-text">起動</span>
          する
        </motion.h1>

        <motion.p
          className="text-text-label text-lg sm:text-xl mt-4"
          variants={itemVariants}
        >
          - Zero to Infinity -
        </motion.p>

        <motion.p
          className="text-text-sub mt-6 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          スタートアップとしての機動力とコンサルティングファームとしての正確性をあわせたプロジェクトベース型のワークスタイル
        </motion.p>

        <motion.div className="mt-10 flex justify-center" variants={itemVariants}>
          <CTAButtons />
        </motion.div>
      </motion.div>
    </section>
  );
}
