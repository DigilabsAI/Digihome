"use client";

import { cn } from "@/lib/utils";
import { ProjectsBlock } from "./projects-block-shadcnui";
import { NeoButton } from "../ui/neoButton";
import { motion, Variants } from "framer-motion";
import type { Project } from "./projects-block-shadcnui"; // adjust path

export const TextVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
    },
  },
};

export const cardVariants = (delay = 0): Variants => ({
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay,
    },
  },
});

interface ProjectSectionProps {
  projects: Project[];
}

export default function ProjectSection({ projects }: ProjectSectionProps) {
  return (
    <section
      className={cn(
        "pt-16 px-4 sm:px-6 lg:px-8 flex flex-col gap-8 justify-center items-center"
      )}
    >
      {/* Header */}
      <motion.div
        variants={TextVariants}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true, amount: 0.5 }}
        className="relative z-10 text-center"
      >
        <h2 className="font-geist text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
          Our latest work.
        </h2>
        <p className="mt-3 font-geist text-foreground/60">
          We design with real challenges in mind, not just visuals.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 place-content-stretch gap-8 sm:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.title + index}
            variants={cardVariants(index * 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <ProjectsBlock project={project} />
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <NeoButton variant="black" className="w-fit p-2">
        Discover more
      </NeoButton>
    </section>
  );
}
