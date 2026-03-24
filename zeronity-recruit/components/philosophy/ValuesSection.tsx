"use client";

import { philosophy } from "@/data/philosophy";
import SectionHeading from "@/components/ui/SectionHeading";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-4xl mx-auto px-4">
        <SectionHeading label="VALUES" title="行動指針" />

        <div ref={ref} className="flex flex-col gap-8 mt-12">
          {philosophy.values.map((value, i) => (
            <motion.div
              key={value.titleEn}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative pl-6"
            >
              {/* Gradient left border */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
                style={{
                  background: "linear-gradient(180deg, #7a00df, #e8380d)",
                }}
              />

              <p className="gradient-text text-xl font-bold">
                {value.titleEn}
              </p>
              <p className="text-lg text-text-primary mt-1">{value.titleJa}</p>
              <p className="text-text-sub mt-2">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
