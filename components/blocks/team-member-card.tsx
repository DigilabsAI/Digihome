import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, User2, Twitter } from "lucide-react";
import { VercelCard } from "../ui/vercel-card";
import NeobruCard from "../ui/neobruCard";

export type TeamMember = {
  name: string;
  bio: string;
  role: string;
  department?: string;
  image: string;
  skills: string[];
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
};

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <VercelCard className="relative h-full min-w-52 max-w-xs overflow-hidden border border-black/[0.4] bg-card backdrop-blur-xl transition-shadow duration-500">
      <div className="relative z-10 px-6">
        {/* Avatar */}
        <div className="mb-4 flex justify-center">
          <div className="relative w-full transform transition-transform duration-300 hover:scale-105">
            <NeobruCard className="relative h-44 w-full overflow-hidden p-1 md:p-0 bg-card/80">
              <div className="relative h-full w-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover aspect-square"
                  priority
                />
              </div>
            </NeobruCard>
          </div>
        </div>

        {/* Info */}
        <div className="text-center">
          <h3 className="mb-0.5 text-xl font-semibold tracking-tight text-secondary-foreground">
            {member.name}
          </h3>

          <Badge
            variant="secondary"
            className="mb-2 text-xs uppercase tracking-wide text-muted-foreground"
          >
            {member.role}
          </Badge>

          {/* Bio */}
          <p className="mb-4 max-w-xs mx-auto text-sm leading-relaxed text-secondary-foreground/90">
            {member.bio}
          </p>

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
          <div className="flex justify-center gap-1">
            {member.social.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-none border-2 border-background bg-secondary-foreground text-background hover:border-secondary-foreground hover:text-primary transition-colors duration-300"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
              </a>
            )}

            {member.social.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-none border-2 border-background bg-secondary-foreground text-background hover:border-secondary-foreground hover:text-primary transition-colors duration-300"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
              </a>
            )}

            {member.social.github && (
              <a
                href={member.social.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-none border-2 border-background bg-secondary-foreground text-background hover:border-secondary-foreground hover:text-primary transition-colors duration-300"
                >
                  <Github className="h-4 w-4" />
                </Button>
              </a>
            )}

            {member.social.website && (
              <a
                href={member.social.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-none border-2 border-background bg-secondary-foreground text-background hover:border-secondary-foreground hover:text-primary transition-colors duration-300"
                >
                  <User2 className="h-4 w-4" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </VercelCard>
  );
}

export default TeamMemberCard;
