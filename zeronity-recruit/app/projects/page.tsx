"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import CTAButtons from "@/components/ui/CTAButtons";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectDetail from "@/components/projects/ProjectDetail";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section className="py-24 bg-bg-primary">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading
            label="PROJECTS"
            title="プロジェクト事例"
            subtitle="多様なプロジェクトを通じて、戦略の実現と価値創造を行います"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={setSelectedProject}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <CTAButtons className="justify-center" />
        </div>
      </section>

      <ProjectDetail
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
