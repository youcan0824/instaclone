"use client";

import { industries, specialties } from "@/data/business";
import SectionHeading from "@/components/ui/SectionHeading";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function IndustryScope() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading label="SCOPE" title="多様な業界・領域で挑む" />

        <div ref={ref} className="space-y-12">
          {/* Industries */}
          <div>
            <h3 className="text-text-sub text-sm font-semibold uppercase tracking-widest mb-4">
              業界
            </h3>
            <div className="flex flex-wrap gap-3">
              {industries.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                  className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-text-primary"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Specialties */}
          <div>
            <h3 className="text-text-sub text-sm font-semibold uppercase tracking-widest mb-4">
              専門領域
            </h3>
            <div className="flex flex-wrap gap-3">
              {specialties.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.07 }}
                  className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-text-primary"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
