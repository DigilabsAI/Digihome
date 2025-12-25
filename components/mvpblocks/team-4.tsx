"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import NeobruCard from "../ui/neobruCard";
import TeamMemberCard, { TeamMember } from "./team-member-card";

type SocialMediaLinks = {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  email?: string;
  dribbble?: string;
};

type TeamMemberx = {
  id: number;
  name: string;
  role: string;
  email?: string;
  bio?: string;
  image: string;
  backgroundColor?: string;
  socialMedia?: SocialMediaLinks;
  expertise?: string[];
  department?: string;
};

type TeamSectionProps = {
  title?: string;
  subtitle?: string;
  teamMembers: TeamMember[];
  backgroundColor?: string;
  textColor?: string;
  secondaryColor?: string;
  className?: string;
};

type Department =
  | "all"
  | "management"
  | "product"
  | "design"
  | "marketing"
  | "sales"
  | "customer"
  | "operations";

export interface ElegantTeamProps extends TeamSectionProps {
  departments?: Array<{
    id: Department;
    label: string;
  }>;
}

export const elegantTeamMembers: TeamMember[] = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "Visionary leader with 15+ years in tech",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    skills: ["Strategy", "Leadership", "Innovation"],
    gradient: "from-white/10 via-white/5 to-transparent",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "#",
    },
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "Full-stack architect and AI enthusiast",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    skills: ["AI/ML", "Architecture", "Cloud"],
    gradient: "from-white/12 via-white/5 to-transparent",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "michael@example.com",
    },
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Design",
    bio: "Creative mind behind beautiful interfaces",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    skills: ["UI/UX", "Branding", "Motion"],
    gradient: "from-white/12 via-white/5 to-transparent",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "emily@example.com",
    },
  },
  {
    name: "David Park",
    department: "management",
    role: "Lead Developer",
    bio: "Code wizard and performance optimizer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    skills: ["React", "TypeScript", "Performance"],
    gradient: "from-foreground/12 via-foreground/5 to-transparent",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "david@example.com",
    },
  },
];

export default function Team4({
  title = "Meet the team that makes the magic happen",
  subtitle = "Meet our diverse team of world-class creators, designers, and problem solvers.",
  teamMembers = elegantTeamMembers,
  backgroundColor = "#ffffff",
  textColor = "#000000",
  secondaryColor = "#666666",
  className,
  departments = [
    { id: "all", label: "View all" },
    { id: "management", label: "Management" },
    { id: "product", label: "Product" },
    { id: "design", label: "Design" },
    { id: "marketing", label: "Marketing" },
    { id: "sales", label: "Sales" },
    { id: "customer", label: "Customer Success" },
    { id: "operations", label: "Operations" },
  ],
}: ElegantTeamProps) {
  const [activeDepartment, setActiveDepartment] = useState<Department>("all");

  // Filter team members by department
  const filteredTeamMembers =
    activeDepartment === "all"
      ? teamMembers
      : teamMembers.filter(
          (member) =>
            member.department?.toLowerCase() === activeDepartment ||
            member.role?.toLowerCase().includes(activeDepartment)
        );

  // Split the title to apply italic styling to "magic"
  const titleParts = title.split(/(magic)/);

  return (
    <section
      className={cn("w-full py-16", className)}
      style={{ backgroundColor, color: textColor }}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl leading-tight md:text-5xl">
            {titleParts.map((part, index) =>
              part.toLowerCase() === "magic" ? (
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
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setActiveDepartment(dept.id)}
              className={cn(
                "rounded-none px-4 py-2 text-sm font-medium transition-colors",
                activeDepartment === dept.id
                  ? "bg-gray-900 text-white"
                  : "border border-gray-200 bg-white text-gray-800 hover:bg-gray-100"
              )}
            >
              {dept.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 place-items-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredTeamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <Card className="inline-flex flex-col items-center gap-6 rounded-3xl border border-border/60 bg-card/80 px-10 py-8 shadow-[0_20px_70px_-30px_rgba(15,23,42,0.6)] backdrop-blur-xl">
            <h3 className="text-2xl font-semibold">Join Our Amazing Team</h3>
            <p className="max-w-xl text-sm text-[var(--muted-foreground)]">
              We&apos;re always looking for talented people to join our mission
            </p>
            <Button
              size="lg"
              className="group relative overflow-hidden rounded-full bg-primary px-10 py-6 text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-300 hover:translate-y-[-2px]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative font-medium">View Open Positions</span>
              <span className="relative ml-2">→</span>
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
