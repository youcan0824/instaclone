"use client";

import Image from "next/image";
import { philosophy } from "@/data/philosophy";
import SectionHeading from "@/components/ui/SectionHeading";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const characters = philosophy.statement.split("");

  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading
          label="PHILOSOPHY"
          title="私たちが大切にしていること"
        />

        <div className="mt-8 mb-12">
          <Image src="/images/pdf-p5.png" alt="新しい世界を起動する -Zero to Infinity-" width={960} height={540} className="rounded-xl w-full h-auto" />
        </div>

        <div ref={ref} className="text-center mt-12">
          <motion.p
            className="text-2xl md:text-3xl font-bold text-text-primary leading-relaxed"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.03,
                },
              },
            }}
          >
            {characters.map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
