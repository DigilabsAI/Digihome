"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { TextVariants } from "./projectSection";

export type Testimonial = {
  id: string;
  name: string;
  role?: string;
  content?: string;
  avatar?: string;
};

export interface TestimonialsGridProps {
  testimonials: Testimonial[];
  initialActive?: number;
}

function getAvatarUrl(seed?: string, size = 64) {
  const name = seed || "User";
  const s = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${s}&size=${size}&background=0D9488&color=fff`;
}

export default function TestimonialsGrid({
  testimonials,
  initialActive = 0,
}: TestimonialsGridProps) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(initialActive);

  useEffect(() => setMounted(true), []);

  const handleNext = useCallback(
    () => setActive((p) => (p + 1) % testimonials?.length),
    [testimonials?.length]
  );

  const handlePrev = useCallback(
    () => setActive((p) => (p - 1 + testimonials?.length) % testimonials?.length),
    [testimonials?.length]
  );

  if (!mounted) return null;

  return (
    <section className={cn("bg-muted pt-8 pb-36 mb-36 md:pb-24 xl:mb-20")}>
      <div className="container mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
         className="grid grid-cols-1 gap-4 md:gap-4 place-items-center"
        >
          {/* Left */}
          <motion.div
            variants={TextVariants}
            viewport={{ once: true, amount: 0.5 }}
            whileInView="visible"
            initial="hidden"
            className="flex flex-col justify-center text-center"
          >
            <h2 className="text-foreground  mb-4 text-4xl font-semibold">
              Voices from our Partners.
            </h2>
            <p className="text-foreground/70 text-lg">
             Experiences from people who have worked and grown with us.
            </p>
          </motion.div>

          {/* Right */}
          <motion.div
            variants={TextVariants}
            viewport={{ once: true, amount: 0.5 }}
            whileInView="visible"
            initial="hidden"
            className="relative w-full max-w-md"
          >
            <AnimatePresence>
              {testimonials.map((t, index) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{
                    opacity: index === active ? 1 : 0,
                    scale: index === active ? 1 : 0.95,
                    y: index === active ? 0 : 30,
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: -30 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={`absolute inset-0 ${
                    index === active ? "z-10" : "z-0"
                  }`}
                >
                  <div className="rounded-2xl border bg-background px-6 py-6 shadow-lg">
                    <p className="text-foreground mb-6 text-lg">{t.content}</p>

                    <div className="flex items-center gap-2 flex-col md:flex-row justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8 ring-1 ring-foreground/10">
                          <AvatarImage
                            src={getAvatarUrl(t.avatar, 64)}
                            alt={t.name}
                          />
                          <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div>
                          <div className="text-foreground font-semibold">
                            {t.name}
                          </div>
                          <span className="text-muted-foreground text-sm">
                            {t.role}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={handlePrev}
                          className="flex h-9 w-9 items-center justify-center rounded-full border bg-background shadow transition hover:scale-110"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={handleNext}
                          className="flex h-9 w-9 items-center justify-center rounded-full border bg-background shadow transition hover:scale-110"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
