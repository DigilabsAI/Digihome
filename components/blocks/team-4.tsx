"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import TeamMemberCard, { TeamMember } from "./team-member-card";
import { VercelCard } from "../ui/vercel-card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Department } from "@/public/constants";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { TextVariants } from "./projectSection";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: 24,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

export interface ElegantTeamProps {
  title?: string;
  subtitle?: string;
  teamMembers?: TeamMember[];
  backgroundColor?: string;
  textColor?: string;
  secondaryColor?: string;
  className?: string;
  departments?: { id: Department; label: string }[];
}

export default function Team4({
  title,
  subtitle,
  teamMembers,
  backgroundColor = "#ffffff",
  textColor = "#000000",
  secondaryColor = "#666666",
  className,
  departments,
}: ElegantTeamProps) {
  const [activeDepartment, setActiveDepartment] =
    useState<Department>("management");

 const filteredTeamMembers = teamMembers?.filter((member) =>
  member.department?.some((dept) => dept.toLowerCase() === activeDepartment) 
);


  const titleParts = title?.split(/(magic)/i);

  return (
    <section
      className={cn("w-full py-16", className)}
      style={{ backgroundColor, color: textColor }}
    >
      <div className="container mx-auto max-w-6xl px-2">
        <motion.div
          variants={TextVariants}
          viewport={{ once: true, amount: 0.5 }}
          whileInView="visible"
          initial="hidden"
          className="mb-8 text-center"
        >
          <h2 className="mb-4 font-serif text-4xl leading-tight md:text-5xl">
            {titleParts?.map((part, index) =>
              part.toLowerCase() === "digilabs" ? (
                <span key={index} className="italic">
                  {part}
                </span>
              ) : (
                <span key={index}>{part}</span>
              )
            )}
          </h2>
          <p
            className="mx-auto max-w-3xl text-base"
            style={{ color: secondaryColor }}
          >
            {subtitle}
          </p>
        </motion.div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {departments?.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setActiveDepartment(dept.id)}
              className={cn(
                "rounded-none px-4 py-2 text-sm font-medium transition-colors",
                activeDepartment === dept.id
                  ? "bg-secondary-foreground text-white"
                  : "border border-gray-200 bg-white text-gray-800 hover:bg-gray-100"
              )}
            >
              {dept.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            whileInView="visible"
            key={activeDepartment}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 items-stretch justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {filteredTeamMembers?.map((member) => (
              <motion.div key={member.name} variants={itemVariants}>
                <TeamMemberCard member={member} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDepartment} 
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="mt-4 sm:mt-8 text-center"
          >
            <VercelCard className="mx-auto w-[318px] sm:w-auto flex flex-col items-center gap-8 sm:gap-12 border-2 border-black/[0.4] bg-card/80 px-6 sm:px-10 py-6 sm:py-8 sm:max-w-full overflow-hidden text-center shadow-lg shadow-muted/10 backdrop-blur-md">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">
               Join our growing team.
              </h3>

              <p className="text-sm sm:text-base md:text-lg text-secondary-foreground/80">
               Collaborate, learn, and create.
              </p>

              <Button
                size="lg"
                className="group relative mt-2 sm:mt-4 w-full sm:w-80 md:w-96 rounded-none overflow-hidden border-[3px] border-black bg-black px-6 py-4 sm:py-6 text-base font-semibold uppercase text-white shadow-[5px_5px_0_#000] transition-all duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-black/90 hover:border-black/90 hover:shadow-[7px_7px_0_#000] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none"
              >
                <span className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-500 group-hover:left-full" />
                <span className="relative flex items-center justify-center gap-2">
                  View Open Positions
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Button>
            </VercelCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
