"use client";

import type { Project } from "@/data/projects";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type ProjectCardProps = {
  project: Project;
  onSelect: (project: Project) => void;
  index?: number;
};

export default function ProjectCard({ project, onSelect, index = 0 }: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onClick={() => onSelect(project)}
      className="bg-white/5 border border-white/10 rounded-xl p-6 cursor-pointer hover:border-accent-purple/50 transition"
    >
      <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-accent-purple/20 text-accent-purple">
        {project.industry}
      </span>
      <h3 className="text-xl font-bold text-text-primary mt-3">{project.title}</h3>
      <p className="text-text-sub mt-2 text-sm leading-relaxed">{project.summary}</p>
    </motion.div>
  );
}
