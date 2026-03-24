"use client";

import type { Project } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";

type ProjectDetailProps = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-bg-secondary border border-white/10 rounded-2xl max-w-3xl w-full mx-auto p-8 overflow-y-auto max-h-[90vh] relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-text-sub hover:text-text-primary transition text-2xl leading-none"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Industry tag */}
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-accent-purple/20 text-accent-purple">
              {project.industry}
            </span>

            {/* Title */}
            <h2 className="text-2xl font-bold text-text-primary mt-3">
              {project.title}
            </h2>

            {/* Area */}
            <p className="text-text-sub text-sm mt-1">{project.area}</p>

            {/* Background */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-text-primary mb-2">
                背景・課題
              </h3>
              <p className="text-text-sub leading-relaxed">
                {project.background}
              </p>
            </div>

            {/* Scope */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-text-primary mb-2">
                支援内容
              </h3>
              <ul className="list-disc list-inside text-text-sub space-y-1">
                {project.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Outcome */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-text-primary mb-2">
                成果
              </h3>
              <p className="text-text-sub leading-relaxed">
                {project.outcome}
              </p>
            </div>

            {/* Experiences */}
            {project.experiences.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">
                  メンバーの経験談
                </h3>
                <div className="flex flex-col gap-4">
                  {project.experiences.map((exp) => (
                    <div
                      key={exp.name}
                      className="bg-white/5 border border-white/10 rounded-xl p-5"
                    >
                      <p className="text-sm font-semibold text-accent-purple">
                        {exp.role} / {exp.name}
                      </p>
                      <p className="text-text-sub mt-2 leading-relaxed text-sm">
                        {exp.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
