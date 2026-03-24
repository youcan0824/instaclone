"use client";

import { differentiation } from "@/data/business";
import SectionHeading from "@/components/ui/SectionHeading";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function DifferentiationTable() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading label="DIFFERENTIATION" title="Zeronityの強み" />

        {/* Desktop table */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="hidden md:block overflow-x-auto"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {differentiation.headers.map((header, i) => (
                  <th
                    key={header || "category"}
                    className={`px-6 py-4 text-left text-sm font-semibold uppercase tracking-widest ${
                      i === 1
                        ? "text-white"
                        : "text-text-sub"
                    }`}
                    style={
                      i === 1
                        ? {
                            background:
                              "linear-gradient(135deg, rgba(122,0,223,0.2), rgba(232,56,13,0.2))",
                            borderRadius: "8px 8px 0 0",
                          }
                        : undefined
                    }
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {differentiation.rows.map((row, rowIdx) => (
                <tr
                  key={row.category}
                  className="border-t border-white/5"
                >
                  <td className="px-6 py-4 text-text-sub font-medium">
                    {row.category}
                  </td>
                  <td
                    className="px-6 py-4 text-text-primary font-bold"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(122,0,223,0.1), rgba(232,56,13,0.1))",
                      borderRadius:
                        rowIdx === differentiation.rows.length - 1
                          ? "0 0 8px 8px"
                          : undefined,
                    }}
                  >
                    {row.zeronity}
                  </td>
                  <td className="px-6 py-4 text-text-sub">
                    {row.consul}
                  </td>
                  <td className="px-6 py-4 text-text-sub">
                    {row.startup}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile card view */}
        <div className="md:hidden space-y-6">
          {differentiation.rows.map((row, i) => (
            <motion.div
              key={row.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-5"
            >
              <h3 className="text-text-sub text-sm font-semibold uppercase tracking-widest mb-3">
                {row.category}
              </h3>
              <div className="space-y-2">
                <div
                  className="rounded-lg px-4 py-2.5 font-bold text-text-primary"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(122,0,223,0.15), rgba(232,56,13,0.15))",
                  }}
                >
                  <span className="text-xs text-white/50 block">Zeronity</span>
                  {row.zeronity}
                </div>
                <div className="rounded-lg px-4 py-2.5 text-text-sub bg-white/5">
                  <span className="text-xs text-white/40 block">
                    コンサルファーム
                  </span>
                  {row.consul}
                </div>
                <div className="rounded-lg px-4 py-2.5 text-text-sub bg-white/5">
                  <span className="text-xs text-white/40 block">
                    スタートアップ
                  </span>
                  {row.startup}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
