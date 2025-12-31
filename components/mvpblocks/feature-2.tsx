"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MotionNeobruCard } from "../ui/neobruCard";
import { TextVariants } from "../uitripled/projectSection";

type WorkflowItem = {
  title?: string;
  content?: string;
  image?: string;
};

interface WorkflowProps {
  workflow: WorkflowItem[];
}

export default function FeatureSteps({ workflow }: WorkflowProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    if (!inView || !workflow.length) return;

    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (4000 / 50)); // faster: 2s per slide
      } else {
        setCurrentFeature((prev) => (prev + 1) % workflow.length);
        setProgress(0);
      }
    }, 15);

    return () => clearInterval(timer);
  }, [progress, inView, workflow.length]);

  if (!workflow.length) return null;

  return (
    <div ref={ref} className={cn("px-8 md:px-12")}>
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative mx-auto mb-8 max-w-2xl sm:text-center">
          <motion.div
           variants={TextVariants}
            viewport={{ once: true, amount: 0.5 }}
            whileInView="visible"
            initial="hidden"
          className="relative z-10">
            <h2 className="font-geist text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
            How we solve problems.
            </h2>
            <p className="font-geist text-foreground/60 mt-3">
              MVPBlocks helps you create, customize, and deploy your product
              faster than ever before.
            </p>
          </motion.div>
        </div>
        <hr className="bg-foreground/30 mx-auto mb-8 h-px w-1/2" />

        <div className="flex flex-col justify-center gap-6 md:grid md:grid-cols-2 lg:gap-0 md:pl-12">
          {/* Left steps */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="order-2 space-y-8 md:order-2 relative"
          >
            {workflow.map((work: WorkflowItem, index: number) => {
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
                        {work.title}
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base">
                        {work.content}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* Right image card */}
          <MotionNeobruCard
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className={cn(
              "border-primary relative order-1 h-[200px] overflow-hidden border-2 md:order-1 md:h-[300px] lg:h-[400px]"
            )}
          >
            <AnimatePresence mode="wait">
              {workflow.map(
                (work: WorkflowItem, index: number) =>
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
                        src={work.image!}
                        alt={work.title!}
                        className="h-full w-full transform object-contain transition-transform hover:scale-105"
                        width={1000}
                        height={500}
                      />
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </MotionNeobruCard>
        </div>
      </div>
    </div>
  );
}
