"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Testimonial = {
  id?: string;
  name: string;
  role?: string;
  content?: string;
  avatar?: string;
};

function getAvatarUrl(seed?: string, size = 64) {
  const name = seed || "User";
  const s = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${s}&size=${size}&background=0D9488&color=fff`;
}

function getTestimonials(count = 3): Testimonial[] {
  const samples: Testimonial[] = [
    {
      name: "Ada Lovelace",
      role: "Frontend Engineer",
      content:
        "SmoothUI made building beautiful UI components fast and enjoyable. The docs are clear and the components are flexible.",
      avatar: "Ada Lovelace",
    },
    {
      name: "Grace Hopper",
      role: "Full Stack Developer",
      content:
        "I shaved hours off my development time using SmoothUI—components fit perfectly with our design system.",
      avatar: "Grace Hopper",
    },
    {
      name: "Linus Torvalds",
      role: "Software Architect",
      content:
        "Stable, well-designed components that just work. Highly recommended for production apps.",
      avatar: "Linus Torvalds",
    },
  ];

  return Array.from({ length: count }, (_, i) => {
    const base = samples[i % samples.length];
    return {
      ...base,
      id: `${base.name.replace(/\s+/g, "-").toLowerCase()}-${i}`,
    };
  });
}

export default function TestimonialsGrid() {
  const [mounted, setMounted] = useState(false);
  const testimonials = useMemo(() => getTestimonials(7), []);
  const [active, setActive] = useState(0);

  useEffect(() => setMounted(true), []);

  const handleNext = useCallback(
    () => setActive((p) => (p + 1) % testimonials.length),
    [testimonials.length]
  );

  const handlePrev = () =>
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  if (!mounted) return null;

  return (
    <section className={cn("bg-muted pb-36 mb-36 md:pb-24 xl:mb-10 ")}>
      <div className="container mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1  gap-4 md:gap-12 lg:grid-cols-2"
        >
          {/* Left */}
          <div className="flex flex-col justify-center">
            <h2 className="text-foreground mb-4 text-4xl font-semibold">
              What Developers Say
            </h2>
            <p className="text-foreground/70 text-lg">
              Join thousands of developers building faster, more beautiful UIs
              with SmoothUI.
            </p>
          </div>

          {/* Right */}
          <div className="relative w-full max-w-md">
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
                    {/* Content */}
                    <p className="text-foreground mb-6 text-lg">{t.content}</p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
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

                      {/* Nav */}
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
