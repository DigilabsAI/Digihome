"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";


export interface ProjectLinks {
  demo?: string;
  github?: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  links: ProjectLinks;
}

export interface ProjectsBlockProps {
  project: Project;
}


export function ProjectsBlock({ project }: ProjectsBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mx-auto h-full max-w-lg overflow-hidden rounded-none border-secondary-foreground bg-card transition-all duration-300 hover:border-primary/50 group">
        <div className="relative aspect-video overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover grayscale transition-opacity focus-visible:outline-none"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />

          <div className="absolute inset-0 flex items-end justify-center gap-4 bg-gradient-to-t from-card via-card/60 to-transparent pb-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {project.links.demo && (
              <motion.a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-primary p-3 text-primary-foreground shadow-lg shadow-primary/50"
              >
                <ExternalLink className="h-5 w-5" />
              </motion.a>
            )}

            {project.links.github && (
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-secondary p-3 text-secondary-foreground shadow-lg"
              >
                <Github className="h-5 w-5" />
              </motion.a>
            )}
          </div>
        </div>

        <div className="p-6">
          <h3 className="mb-2 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
            {project.title}
          </h3>

          <p className="mb-4 line-clamp-2 text-muted-foreground">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}