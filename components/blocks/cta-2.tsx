"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { TextVariants } from "./projectSection";
import { CTA2Content } from "@/public/constants";
import { useRouter } from "next/navigation";

interface CTA2Props {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export default function CTA2({
  title = CTA2Content.title,
  subtitle = CTA2Content.subtitle,
  buttonText = CTA2Content.buttonText,
}: CTA2Props) {
  const router = useRouter();

  return (
    <main
      className={cn(
        "flex justify-center items-center w-full px-6 py-16 lg:px-0",
      )}
    >
      <motion.div
        variants={TextVariants}
        viewport={{ once: true, amount: 0.5 }}
        whileInView="visible"
        initial="hidden"
        className="relative w-full max-w-4xl overflow-hidden bg-background p-6 sm:p-10 md:p-20
                   border-4 border-black shadow-[10px_10px_0_#000]"
      >
        {" "}
        <div className="absolute inset-0 hidden h-full w-full overflow-hidden md:block">
          <div className="absolute top-1/2 right-[-45%] aspect-square h-[800px] w-[800px] -translate-y-1/2">
            <div className="absolute inset-0 rounded-full bg-black opacity-20"></div>
            <div className="absolute inset-0 scale-[0.8] rounded-full bg-neutral-900 opacity-20"></div>
            <div className="absolute inset-0 scale-[0.6] rounded-full bg-neutral-800 opacity-20"></div>
            <div className="absolute inset-0 scale-[0.4] rounded-full bg-neutral-700 opacity-20"></div>
            <div className="absolute inset-0 scale-[0.2] rounded-full bg-neutral-600 opacity-20"></div>
            <div className="absolute inset-0 scale-[0.1] rounded-full bg-neutral-900 opacity-20"></div>
          </div>
        </div>
        <div className="relative z-10">
          <h1 className="mb-3 text-3xl font-extrabold text-secondary-foreground sm:text-4xl md:text-5xl">
            {title}
          </h1>

          <p className="mb-6 max-w-md text-base font-medium text-secondary-foreground sm:text-lg">
            {subtitle}
          </p>

          <button
            type="button"
            onClick={() => router.push("/contact")}
            className="flex w-full items-center justify-between rounded-full
                       bg-white px-5 py-3 text-black sm:w-[240px]
                       border-4 border-black
                       shadow-[4px_4px_0_#000]
                       active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <span className="font-bold">{buttonText}</span>
            <span className="h-5 w-5 rounded-full bg-black" />
          </button>
        </div>
      </motion.div>
    </main>
  );
}
