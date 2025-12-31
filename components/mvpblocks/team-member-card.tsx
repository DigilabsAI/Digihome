import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { VercelCard } from "../ui/vercel-card";
import NeobruCard from "../ui/neobruCard";

export type TeamMember = {
  name: string;
  bio: string;
  role: string;
  department?: string;
  image: string;
  skills: string[];
  gradient: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    email?: string;
  };
};

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <VercelCard className="relative h-full min-w-52 max-w-xs overflow-hidden border border-black/[0.4] bg-card backdrop-blur-xl transition-shadow duration-500">
      <div className="relative z-10 px-6">
        {/* Avatar */}
        <div className="mb-4 flex justify-center">
          <motion.div
            className="relative w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <NeobruCard className="relative h-40 w-full overflow-hidden p-0 bg-card/80">
              <motion.div
                className="relative h-full w-full"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </NeobruCard>
          </motion.div>
        </div>

        {/* Info */}
        <div className="text-center">
          <h3 className="mb-1 text-xl font-semibold tracking-tight text-secondary-foreground">
            {member.name}
          </h3>

          <Badge
            variant="secondary"
            className="mb-2 text-xs uppercase tracking-wide text-muted-foreground"
          >
            {member.role}
          </Badge>

          {/* Skills */}
          <div className="mb-4 flex flex-wrap justify-center gap-1.5">
            {member.skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="border-border/60 bg-white/5 text-xs text-muted-foreground hover:bg-white/10"
              >
                • {skill}
              </Badge>
            ))}
          </div>

          {/* Socials */}
          <div className="flex justify-center">
            {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
              <Button
                key={i}
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-none border-2 border-background bg-secondary-foreground text-background hover:border-secondary-foreground hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </VercelCard>
  );
}

export default TeamMemberCard;
