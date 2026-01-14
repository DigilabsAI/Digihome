"use client"
import { ProjectsBlock } from '@/components/blocks/projects-block-shadcnui'
import { cardVariants } from '@/components/blocks/projectSection'
import { projects} from "@/public/constants"
import { motion } from 'framer-motion'


export default function AboutPage() {
  return (
    <div className="flex h-screen justify-center items-center">
    
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
    </div>
  )
}
