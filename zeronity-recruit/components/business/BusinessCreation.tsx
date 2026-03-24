"use client";

import { functionalAreas } from "@/data/business";
import SectionHeading from "@/components/ui/SectionHeading";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function BusinessCreation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const hierarchy = [
    { label: "経営戦略", level: 0 },
    { label: "事業別戦略", level: 1 },
    { label: "機能別戦略", level: 2 },
  ];

  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading
          label="BUSINESS CREATION"
          title="戦略策定から実行支援まで"
        />

        {/* Strategy hierarchy */}
        <div ref={ref} className="flex flex-col items-center gap-4 mb-16">
          {hierarchy.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="flex flex-col items-center"
            >
              <div
                className="px-8 py-3 rounded-lg border border-white/10 text-text-primary font-bold text-center"
                style={{
                  width: `${220 + item.level * 60}px`,
                  background:
                    i === 0
                      ? "linear-gradient(135deg, rgba(122,0,223,0.15), rgba(232,56,13,0.15))"
                      : "rgba(255,255,255,0.05)",
                }}
              >
                {item.label}
              </div>
              {i < hierarchy.length - 1 && (
                <span className="text-white/30 text-lg my-1">&darr;</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Functional area tags */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {functionalAreas.map((area, i) => (
            <motion.div
              key={area}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              className="relative bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-center text-text-primary font-medium overflow-hidden"
            >
              {area}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{
                  background: "linear-gradient(90deg, #7a00df, #e8380d)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
