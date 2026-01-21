"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FacebookIcon, Mail, Phone, Send } from "lucide-react";
import { motion, Variants } from "framer-motion";
import NeobruCard from "../ui/neobruCard";

const FormSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  job_title: z.string().optional(),
  company_name: z.string(),
  help: z.enum([
    "Evaluate Bird for my company",
    "Learn More",
    "Get a Quote",
    "How to use Bird",
    "Other",
  ]),
  company_size: z.enum([
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000+",
  ]),
  info: z.string(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      company_name: "",
      help: "Learn More",
      company_size: "1-10",
      info: "",
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      setLoading(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      setSubmitted(true);
      toast.success("Message sent successfully");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const iconVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-6 pt-24">
      <div className="grid gap-10 md:grid-cols-2 items-start">
        <motion.div
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6  bg-background/50 px-6  pb-6 backdrop-blur"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/70">
            <span className="h-2 w-2 rounded-full bg-primary/80" />
            Response within 24 hours
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              Tell us about your project
            </h3>
            <p className="text-sm text-foreground/70">
              Please use the contact details below to get in touch with our
              team.{" "}
            </p>
          </div>

          <div className="grid gap-1 text-sm">
            <div className="flex gap-3 rounded-none border p-3">
              <Mail className="h-4 w-4 mt-0.5" />
              <div>
                <p className="font-medium">Email</p>
                <a
                  href="mailto:devajofdigilabs@gmail.com"
                  target="_blank"
                  className="underline hover:text-primary"
                >
                  devajofdigilabs@gmail.com
                </a>
              </div>
            </div>
            <div className="flex gap-3 rounded-none border p-3">
              <Mail className="h-4 w-4 mt-0.5" />
              <div>
                <p className="font-medium">Alternative Email</p>
                <a
                  href="mailto:devajofdigilabs@gmail.com"
                  target="_blank"
                  className="underline hover:text-primary"
                >
                  devajofdigilabs@gmail.com
                </a>
              </div>
            </div>
            <div className="flex gap-3  rounded-none border p-3">
              <FacebookIcon className="h-4 w-4 mt-0.5" />
              <div>
                <p className="font-medium">Facebook</p>
                <a
                  href="mailto:devajofdigilabs@gmail.com"
                  target="_blank"
                  className="underline hover:text-primary"
                >
                  devajofdigilabs@gmail.com
                </a>
              </div>
            </div>
            <div className="flex gap-3  rounded-none border p-3">
              <FacebookIcon className="h-4 w-4 mt-0.5" />
              <div>
                <p className="font-medium">Alternative Facebook</p>
                <a
                  href="mailto:devajofdigilabs@gmail.com"
                  target="_blank"
                  className="underline hover:text-primary"
                >
                  devajofdigilabs@gmail.com
                </a>
              </div>
            </div>
            <div className="flex gap-3  rounded-none border p-3">
              <Phone className="h-4 w-4 mt-0.5" />
              <div>
                <p className="font-medium">Phone</p>
                <a href="tel:+639123456789">+63 912 345 6789</a>
              </div>
            </div>
          </div>
        </motion.div>

        {!submitted ? (
          <motion.div
            variants={iconVariants}
            initial="hidden"
            animate="visible"
          >
            <NeobruCard className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="md:flex gap-6">
                  <div className="w-full">
                    <label className="text-sm">First name *</label>
                    <Input {...register("first_name")} />
                  </div>

                  <div className="w-full">
                    <label className="text-sm">Last name *</label>
                    <Input {...register("last_name")} />
                  </div>
                </div>

                <div>
                  <label className="text-sm">Work email *</label>
                  <Input {...register("email")} />
                </div>

                <div>
                  <label className="text-sm">Company name *</label>
                  <Input {...register("company_name")} />
                </div>

                <div className="flex items-center justify-evenly gap-6 md:flex-nowrap flex-wrap">
                  <div className="w-full">
                    <label className="text-sm">Company size *</label>
                    <Select
                      value={watch("company_size")}
                      onValueChange={(v) =>
                        setValue(
                          "company_size",
                          v as FormValues["company_size"],
                        )
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["1-10", "11-50", "51-200", "501-1000", "1000+"].map(
                          (v) => (
                            <SelectItem key={v} value={v}>
                              {v}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full">
                    <label className="text-sm">How can we help?</label>
                    <Select
                      value={watch("help")}
                      onValueChange={(v) =>
                        setValue("help", v as FormValues["help"])
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Evaluate Bird for my company",
                          "Learn More",
                          "Get a Quote",
                          "How to use Bird",
                          "Other",
                        ].map((v) => (
                          <SelectItem key={v} value={v}>
                            {v}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm">Anything else?</label>
                  <Textarea style={{ height: "100px" }} {...register("info")} />
                </div>

                <div className="flex gap-4 items-center">
                  <p className="text-xs text-foreground/60">
                    By submitting this form you agree to our{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      //TODO: Update privacy policy link
                      href="#"
                      className="text-foreground underline decoration-border/70 underline-offset-4 transition-colors hover:text-primary"
                    >
                      privacy policy
                    </a>
                    .
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="text-sm font-light w-full"
                >
                  Submit
                  <Send
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              </form>
            </NeobruCard>
          </motion.div>
        ) : (
          <motion.div
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            className="text-xl md:text-2xl flex justify-center px-8"
          >
            <div className="w-80 text-center">
              <Image
                src="/assets/MeditatingDoodle.svg"
                alt="logo"
                width={1000}
                height={1000}
                className="mx-auto"
              />
              <div className="text-gray-500 font-light py-10">
                We&apos;ve received your inquiry and will contact you shortly.
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
