"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Rocket, Code, Paintbrush } from "lucide-react";
import NeobruCard from "../ui/neobruCard";
import Image from "next/image";

const features = [
  {
    step: "Step 1",
    title: "Build Faster",
    content:
      "Create your MVP in record time with our pre-built blocks and components.",
    icon: <Rocket className="text-primary h-6 w-6" />,
    image:
      "communication.svg",
  },
  {
    step: "Step 2",
    title: "Customize Easily",
    content:
      "Tailor every component to your needs with our intuitive design system and flexible architecture.",
    icon: <Paintbrush className="text-primary h-6 w-6" />,
    image:
      "team-idea.svg",
  },
  {
    step: "Step 3",
    title: "Deploy Confidently",
    content:
      "Launch your product with confidence using our optimized, responsive, and accessible components.",
    icon: <Code className="text-primary h-6 w-6" />,
    image:
      "idea-launch.svg",
  },
];

export default function FeatureSteps() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (4000 / 100));
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [progress]);

  return (
    <div className={"p-8 md:p-12"}>
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative mx-auto mb-12 max-w-2xl sm:text-center">
          <div className="relative z-10">
            <h2 className="font-geist text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              Build Your MVP in Three Steps
            </h2>
            <p className="font-geist text-foreground/60 mt-3">
              MVPBlocks helps you create, customize, and deploy your product
              faster than ever before.
            </p>
          </div>
        </div>
        <hr className="bg-foreground/30 mx-auto mb-10 h-px w-1/2" />

        <div className="flex flex-col justify-center gap-6 md:grid md:grid-cols-2 lg:gap-0 md:pl-12">
          <div className="order-2 space-y-8 md:order-2 relative">
            {features.map((feature, index) => {
              const isActive = index === currentFeature;

              return (
                <div key={index} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="active-border"
                      className="absolute left-0 top-0 h-full w-[4px] bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 35,
                        delay: 0.36,
                      }}
                    />
                  )}

                  <motion.div
                    className={cn(
                      "flex items-center gap-6 md:gap-8 pl-8 transition-all"
                    )}
                    initial={{ opacity: 0.3, x: -20 }}
                    animate={{
                      opacity: isActive ? 1 : 0.3,
                      x: 0,
                      scale: isActive ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex-1 relative z-10">
                      <h3 className="text-xl font-semibold md:text-2xl">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base">
                        {feature.content}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          <NeobruCard
            className={cn(
              "border-primary  relative order-1 h-[200px] overflow-hidden border-2 md:order-1 md:h-[300px] lg:h-[400px]"
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 overflow-hidden"
                      initial={{ y: 100, opacity: 0, rotateX: -20 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -100, opacity: 0, rotateX: 20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        className="h-full w-full transform object-contain transition-transform hover:scale-105"
                        width={1000}
                        height={500}
                      />
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </NeobruCard>
        </div>
      </div>
    </div>
  );
}
