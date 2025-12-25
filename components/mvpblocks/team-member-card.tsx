import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Sparkles, Twitter } from "lucide-react";
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
    <div>
      <VercelCard className="relative  overflow-hidden border border-black/[0.4] bg-card h-full min-w-52 max-w-xs backdrop-blur-xl transition-shadow duration-500">
        <div className="relative z-10 px-6">
          {/* Avatar Section */}
          <div className="mb-4 flex justify-center">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <NeobruCard className="relative overflow-hidden w-full p-0 md:p-0 bg-card/80">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="h-40 w-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </NeobruCard>
            </motion.div>
          </div>

          {/* Info Section */}
          <div className="text-center">
            <h3 className="mb-1 text-xl font-semibold tracking-tight text-secondary-foreground">
              {member.name}
            </h3>
            <Badge
              variant="secondary"
              className="mb-2  text-xs uppercase tracking-wide text-muted-foreground backdrop-blur"
            >
              {member.role}
            </Badge>

            {/* Skills */}
            <div className="mb-4 flex flex-wrap justify-center gap-1.5">
              {member.skills.map((skill, idx) => (
                <div key={skill}>
                  <Badge
                    variant="outline"
                    className="border-border/60 bg-white/5 text-xs text-[var(--muted-foreground)] transition-colors hover:bg-white/10"
                  >
                    {"• " + skill}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex justify-center ">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Github, label: "GitHub" },
                { icon: Mail, label: "Email" },
              ].map((social, idx) => (
                <div key={social.label}>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 border rounded-none border-secondary-foreground bg-white/5 text-secondary-foreground transition-colors hover:text-secondary-foreground/80"
                  >
                    <div>
                      <social.icon className="h-4 w-4" aria-hidden />
                    </div>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </VercelCard>
    </div>
  );
}

export default TeamMemberCard;
