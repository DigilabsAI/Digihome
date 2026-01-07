"use client";

import { Users, Star, ArrowRight, Play, Award, Target } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { VercelCard } from "../ui/vercel-card";
import { easeOut, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { MotionNeobruCard } from "../ui/neobruCard";
import { NeoButton } from "../ui/neoButton";

interface Hero3Props {
  heading?: string;
  description?: string;
  reviews?: {
    count: number;
    avatars: {
      src: string;
      alt: string;
    }[];
    rating?: number;
  };
  totalClients?: string;
  totalProjects?: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const cardVariants = (duration = 0, rotate = 5): Variants => ({
  initial: {
    rotate: rotate,
  },

  animate: {
    y: [5, -5],
    rotate: rotate,
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "reverse",
    },
  },

  hover: {
    y: 0,
    rotate: 0, // no tilt
    scale: 1.01, // scale up
    transition: {
      duration: 0.3, // no animation
    },
  },
});

const Hero3 = ({
  heading,
  description,
  reviews,
  totalClients,
  totalProjects,
}: Hero3Props) => {
  const MotionAvatar = motion.create(Avatar);

  return (
    <section className="min-h-screen flex items-center justify-center py-24 lg:py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container grid items-start gap-10 lg:grid-cols-2 lg:gap-20"
      >
        <div className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left">
          <h1 className="mb-6 text-4xl font-bold text-pretty lg:text-6xl xl:text-7xl">
            {heading}
          </h1>
          <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
            {description}
          </p>

          <div className="mb-8 flex w-fit flex-col items-center gap-4 sm:flex-row">
            <span className="inline-flex items-center -space-x-4">
              {reviews?.avatars.map((avatar, index) => (
                <MotionAvatar
                  variants={itemVariants}
                  whileHover={{ scale: 1.01, y: -10 }}
                  transition={{
                    ease: easeOut,
                    duration: 0.1,
                  }}
                  key={index}
                  className="size-12 border-2 transform transition-transform duration-200 hover:-translate-y-2 hover:scale-110"
                >
                  <AvatarImage src={avatar.src} alt={avatar.alt} />
                </MotionAvatar>
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
                  {reviews?.rating?.toFixed(1)}
                </span>
              </div>
              <p className="text-left font-medium text-muted-foreground">
                from {reviews?.count}+ reviews
              </p>
            </div>
          </div>
          <NeoButton className="flex justify-center gap-4 px-12 py-2 " >
           Let's Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </NeoButton>
        </div>

        <VercelCard glowEffect className=" overflow-hidden p-2">
          <div className="flex relative ">
            <MotionNeobruCard
              variants={cardVariants(2)}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="absolute top-0 right-0 md:right-12 transform-gpu "
            >
              <div className="flex items-start gap-0.5 md:gap-1.5 pr-2 md:pr-6 text-foreground">
                <Award   className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-primary" aria-hidden="true" />
              <span className="text-[0.5rem] sm:text-xs font-medium uppercase tracking-wider ">
                  Projects
                </span>
              </div>
            <p className="text-sm md:text-2xl font-bold text-foreground tabular-nums">
                {totalProjects}
              </p>
               <p className="text-[0.5rem] sm:text-xs text-foreground/50">Delivered</p>
            </MotionNeobruCard>
            <MotionNeobruCard
              variants={cardVariants(4, -5)}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="absolute bottom-4 left-5 md:left-20
            transform-gpu 
           "
            >
              <div className="flex items-start gap-0.5 md:gap-1.5 pr-2 md:pr-6 text-foreground">
                <Users
                  className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-primary"
                  aria-hidden="true"
                />
                <span className="text-[0.5rem] sm:text-xs font-medium uppercase tracking-wider ">
                  Clients
                </span>
              </div>
              <p className="text-sm md:text-2xl font-bold text-foreground tabular-nums">
                {totalClients}
              </p>
              <p className="text-[0.5rem] sm:text-xs text-foreground/50">Trusted Partners</p>
            </MotionNeobruCard>
            <Image
              src="/MessyDoodle.svg"
              alt="placeholder hero"
              width={1200}
              height={800}
              className="max-h-[600px] w-full rounded-md object-cover lg:max-h-[800px] filter dark:invert"
            />
          </div>
        </VercelCard>
      </motion.div>
    </section>
  );
};

export { Hero3 };
