"use client";

import { industries, specialties, orgScales } from "@/data/business";
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

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div>
            <h3 className="text-text-sub text-sm font-semibold uppercase tracking-widest mb-4">業界</h3>
            <div className="flex flex-col gap-2">
              {industries.map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, delay: i * 0.07 }} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary">{item}</motion.div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-text-sub text-sm font-semibold uppercase tracking-widest mb-4">専門領域</h3>
            <div className="flex flex-col gap-2">
              {specialties.map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, delay: 0.3 + i * 0.07 }} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary">{item}</motion.div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-text-sub text-sm font-semibold uppercase tracking-widest mb-4">組織規模</h3>
            <div className="flex flex-col gap-2">
              {orgScales.map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, delay: 0.6 + i * 0.07 }} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary">{item}</motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
