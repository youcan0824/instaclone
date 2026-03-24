"use client";

import { ecosystem } from "@/data/business";
import SectionHeading from "@/components/ui/SectionHeading";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function EcosystemDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading label="ECOSYSTEM" title="事業開発のエコシステム" />

        <div ref={ref} className="relative">
          {/* Connecting arrows between cards */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 -translate-y-1/2 z-0">
            <div className="flex items-center justify-between px-16">
              <div
                className="flex-1 h-px mx-4"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(122,0,223,0.4), rgba(232,56,13,0.4), transparent)",
                }}
              />
            </div>
          </div>

          {/* Circular arrow indicators */}
          <div className="hidden md:flex justify-around absolute top-1/2 left-0 right-0 -translate-y-1/2 z-10 pointer-events-none px-4">
            <div className="w-1/3" />
            <div className="flex items-center justify-center w-8">
              <span className="text-white/30 text-2xl">&rarr;</span>
            </div>
            <div className="w-1/3" />
            <div className="flex items-center justify-center w-8">
              <span className="text-white/30 text-2xl">&rarr;</span>
            </div>
            <div className="w-1/3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
            {ecosystem.map((item, i) => (
              <motion.div
                key={item.nameEn}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
              >
                <span className="section-label">{item.nameEn}</span>
                <h3 className="font-bold text-xl text-text-primary mt-2">
                  {item.name}
                </h3>
                <p className="gradient-text text-sm font-semibold mt-1">
                  {item.mission}
                </p>
                <p className="text-text-sub text-sm mt-3 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Circular flow indicator below cards */}
          <div className="flex justify-center mt-8">
            <div
              className="px-6 py-2 rounded-full text-xs text-white/40 border border-white/10"
            >
              Education &rarr; Consulting &rarr; Development &rarr; Education
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
