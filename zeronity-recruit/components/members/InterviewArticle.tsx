"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { interviews } from "@/data/interviews";

export default function InterviewArticle() {
  const [expandedQAs, setExpandedQAs] = useState<Record<string, number | null>>(
    () => Object.fromEntries(interviews.map((iv) => [iv.id, 0]))
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const toggleQA = (interviewId: string, index: number) => {
    setExpandedQAs((prev) => ({
      ...prev,
      [interviewId]: prev[interviewId] === index ? null : index,
    }));
  };

  const selectedInterview = selectedId
    ? interviews.find((iv) => iv.id === selectedId)
    : null;

  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading
          label="INTERVIEW"
          title="メンバーインタビュー"
          subtitle="Zeronityで働くメンバーのリアルな声をお届けします"
        />

        {/* Interview cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviews.map((interview, idx) => (
            <motion.div
              key={interview.id}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-accent-purple/50 transition-colors"
              onClick={() => setSelectedId(interview.id)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {/* Hero image */}
              <div className="relative w-full h-44">
                <Image
                  src={interview.heroImage}
                  alt={interview.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-gradient-accent text-white text-xs font-bold px-2 py-1 rounded">
                    #{String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <h4 className="text-lg font-bold text-text-primary mb-1">
                  {interview.name}
                </h4>
                <p className="text-text-label text-xs mb-3">
                  {interview.profile}
                </p>
                <p className="text-text-sub text-sm leading-relaxed line-clamp-3">
                  {interview.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail modal */}
        <AnimatePresence>
          {selectedInterview && (
            <motion.div
              className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setSelectedId(null)}
              />

              {/* Modal content */}
              <motion.div
                className="relative bg-bg-primary border border-white/10 rounded-2xl max-w-3xl w-full p-6 sm:p-8 mb-8"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 text-text-sub hover:text-white transition-colors cursor-pointer z-10"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* Hero */}
                <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden mb-6">
                  <Image
                    src={selectedInterview.heroImage}
                    alt={selectedInterview.name}
                    fill
                    className="object-cover"
                    sizes="768px"
                  />
                </div>

                {/* Profile */}
                <div className="flex flex-col gap-2 mb-8">
                  <div>
                    <span className="text-xs text-accent-purple font-semibold tracking-wider uppercase">
                      INTERVIEW
                    </span>
                    <h3 className="text-2xl font-bold mt-1">
                      {selectedInterview.name}
                    </h3>
                    <p className="text-text-sub text-sm mt-1">
                      {selectedInterview.profile}
                    </p>
                    <p className="text-text-primary mt-3 text-sm sm:text-base leading-relaxed">
                      {selectedInterview.subtitle}
                    </p>
                  </div>
                </div>

                {/* Q&A */}
                <div className="space-y-3">
                  {selectedInterview.qas.map((qa, i) => {
                    const isOpen = expandedQAs[selectedInterview.id] === i;
                    return (
                      <div
                        key={i}
                        className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleQA(selectedInterview.id, i)}
                          className="w-full text-left px-5 py-4 flex items-start gap-3 cursor-pointer"
                        >
                          <span className="gradient-text font-bold text-base shrink-0">
                            Q{i + 1}
                          </span>
                          <span className="text-text-primary font-semibold text-sm flex-1">
                            {qa.question}
                          </span>
                          <span className="text-text-sub shrink-0 mt-0.5">
                            {isOpen ? (
                              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="4" y1="10" x2="16" y2="10" />
                              </svg>
                            ) : (
                              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="10" y1="4" x2="10" y2="16" />
                                <line x1="4" y1="10" x2="16" y2="10" />
                              </svg>
                            )}
                          </span>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 pl-14">
                                {qa.answer.split("\n\n").map((para, j) => (
                                  <p
                                    key={j}
                                    className="text-text-sub text-sm leading-relaxed mb-3 last:mb-0"
                                  >
                                    {para}
                                  </p>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
