"use client";

import { Users, Star, ArrowRight, Play, Award, Target } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import NeobruCard from "./ui/neobruCard";
import { VercelCard } from "./ui/vercel-card";

interface Hero3Props {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
      className?: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  reviews?: {
    count: number;
    avatars: {
      src: string;
      alt: string;
    }[];
    rating?: number;
  };
}

const Hero3 = ({
  heading = "Blocks built with Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  buttons = {
    primary: {
      text: "Sign Up",
      url: "https://www.shadcnblocks.com",
    },
    secondary: {
      text: "Get Started",
      url: "https://www.shadcnblocks.com",
    },
  },
  reviews = {
    count: 40,
    rating: 4.9,
    avatars: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
        alt: "Avatar 1",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
        alt: "Avatar 2",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
        alt: "Avatar 3",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
        alt: "Avatar 4",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
        alt: "Avatar 5",
      },
    ],
  },
}: Hero3Props) => {
  return (
    <section className="min-h-screen flex items-center py-12 lg:py-24">
      <div className="container grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left">
          <h1 className="mb-6 text-4xl font-bold text-pretty lg:text-6xl xl:text-7xl">
            {heading}
          </h1>
          <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
            {description}
          </p>

          <div className="mb-8 flex w-fit flex-col items-center gap-4 sm:flex-row">
            <span className="inline-flex items-center -space-x-4">
              {reviews.avatars.map((avatar, index) => (
                <Avatar
                  key={index}
                  className="size-12 border-2 transform transition-transform duration-200 hover:-translate-y-2 hover:scale-110"
                >
                  <AvatarImage src={avatar.src} alt={avatar.alt} />
                </Avatar>
              ))}
            </span>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="size-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="mr-1 font-semibold">
                  {reviews.rating?.toFixed(1)}
                </span>
              </div>
              <p className="text-left font-medium text-muted-foreground">
                from {reviews.count}+ reviews
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col justify-center gap-2  sm:flex-row lg:justify-start">
            <Button size="lg" className="group gap-2">
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="group gap-2">
              <Play className="h-4 w-4" />
              Watch Demo
            </Button>
          </div>
        </div>

        <VercelCard glowEffect className=" overflow-hidden p-2">
          <div className="flex relative ">
            <NeobruCard
              className="absolute top-0 right-0 md:right-12  transform-gpu transition-transform duration-300
              rotate-12 hover:rotate-0 hover:scale-105"
            >
              <div className="flex items-start gap-0.5 md:gap-1.5 pr-2 md:pr-6 text-foreground">
                <Award className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-wider ">
                  Projects
                </span>
              </div>
              <p className="text-lg md:text-2xl font-bold text-foreground tabular-nums">
                52+
              </p>
              <p className="text-xs text-foreground/50">Delivered</p>
            </NeobruCard>
            <NeobruCard
              className="absolute bottom-4 left-4 md:left-20
            transform-gpu transition-transform duration-300
            -rotate-6 hover:rotate-0 hover:scale-105"
            >
              <div className="flex items-start gap-0.5 md:gap-1.5 pr-2 md:pr-6 text-foreground">
                <Users
                  className="h-3.5 w-3.5 text-primary"
                  aria-hidden="true"
                />
                <span className="text-xs font-medium uppercase tracking-wider ">
                  Clients
                </span>
              </div>
              <p className="text-lg md:text-2xl font-bold text-foreground tabular-nums">
                40+
              </p>
              <p className="text-xs text-foreground/50">Trusted Partners</p>
            </NeobruCard>
            <Image
              src="/MessyDoodle.svg"
              alt="placeholder hero"
              width={1200}
              height={800}
              className="max-h-[600px] w-full rounded-md object-cover lg:max-h-[800px] filter dark:invert"
            />
          </div>
        </VercelCard>
      </div>
    </section>
  );
};

export { Hero3 };
