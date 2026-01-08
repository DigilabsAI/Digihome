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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PiCheckLight } from "react-icons/pi";
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

  return (
    <div className="md:flex justify-center pt-20 px-8">
      <div>
        <div className="text-5xl font-medium w-2/3">Contact our sales team</div>
        <div className="py-4 text-gray-500">
          Let&apos;s talk about how Bird can help your team work better.
        </div>

        <div className="bg-[#f6f5f4] md:w-4/5 space-y-6 p-4 rounded-lg my-4">
          {[
            "One flexible tool for your entire company to share knowledge, ship projects, and collaborate.",
            "Enterprise features to securely manage user access and security.",
            "Dedicated support to work with you on your setup and help you build the best plan for your company.",
          ].map((text, i) => (
            <div key={i} className="flex gap-4 border-b last:border-none">
              <PiCheckLight className="text-2xl" />
              <div className="font-normal pb-4 w-80">{text}</div>
            </div>
          ))}
        </div>
      </div>

      {!submitted ? (
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
                    setValue("company_size", v as FormValues["company_size"])
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
                      )
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
              <Checkbox />
              <div className="text-xs font-light md:w-3/4">
                I agree to Bird&apos;s marketing communications
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="text-sm font-light w-full"
            >
              Submit
            </Button>
          </form>
        </NeobruCard>
      ) : (
        <div className="text-xl md:text-2xl flex justify-center px-8">
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
        </div>
      )}
    </div>
  );
}
