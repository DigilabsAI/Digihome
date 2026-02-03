"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsTrigger,
  TagsValue,
  TagsList,
} from "@/components/kibo-ui/tags";
import { CheckIcon, PlusIcon } from "lucide-react";

import { PiCheckLight } from "react-icons/pi";
import NeobruCard from "../ui/neobruCard";
import { submitJoinForm } from "@/lib/actions/joinFormAction";
import Loader from "../ui/loader";
import { TextVariants } from "./projectSection";
import Link from "next/link";

const defaultCompanySizeOptions = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "Project Manager",
  "UI/UX Designer",
  "Technical Writer",
  "DevOps Engineer",
  "QA / Tester",
];
const defaultHelpOptions = [
  "Social media",
  "Friend or colleague",
  "Search engine",
  "Events",
];

export const FormSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  school: z.string().min(1, "School is required"),
  position: z
    .array(z.string())
    .min(1, "At least one role/position must be selected"),
  refferer: z
    .array(z.string())
    .min(1, "Please select at least one way you found us"),
  reason: z.string().min(1, "Motivation is required"),
});

type FormValues = z.infer<typeof FormSchema>;

export default function JoinForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [companySizeOptions, setCompanySizeOptions] = useState(
    defaultCompanySizeOptions,
  );
  const [companySizeTags, setCompanySizeTags] = useState<string[]>([]);
  const [companySizeInput, setCompanySizeInput] = useState("");

  const [helpOptions, setHelpOptions] = useState(defaultHelpOptions);
  const [helpTags, setHelpTags] = useState<string[]>([]);
  const [helpInput, setHelpInput] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      school: "",
      position: [],
      refferer: [],
      reason: "",
    },
  });

  const handleTagChange = (
    selected: string[],
    field: "position" | "refferer",
  ) => {
    setValue(field, selected);
    if (field === "position") setCompanySizeTags(selected);
    else setHelpTags(selected);
  };

  const handleCreateTag = (newTag: string, field: "position" | "refferer") => {
    if (!newTag.trim()) return;

    if (field === "position") {
      if (!companySizeOptions.includes(newTag)) {
        setCompanySizeOptions((prev) => [...prev, newTag]);
      }
      const updated = [...companySizeTags, newTag];
      setCompanySizeTags(updated);
      setValue("position", updated);
      setCompanySizeInput("");
    } else {
      if (!helpOptions.includes(newTag)) {
        setHelpOptions((prev) => [...prev, newTag]);
      }
      const updated = [...helpTags, newTag];
      setHelpTags(updated);
      setValue("refferer", updated);
      setHelpInput("");
    }
  };
  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      const result = await submitJoinForm(data);

      if (result?.success === true) {
        setSubmitted(true);
        toast.success("Form submitted successfully");
        return;
      }

      reset();
      setCompanySizeTags([]);
      setHelpTags([]);
      toast.error(result?.error || "Something went wrong");
    } catch {
      reset();
      setCompanySizeTags([]);
      setHelpTags([]);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {" "}
      {!submitted ? (
        <motion.div
          variants={TextVariants}
          animate="visible"
          initial="hidden"
          className="md:flex justify-center pt-20 pb-16 px-8"
        >
          <div>
            <div className="text-5xl font-medium w-2/3">
              Contact our sales team
            </div>
            <div className="py-3 text-gray-500">
              Let&apos;s talk about how Bird can help your team work better.
            </div>

            <div className="bg-[#f6f5f4] md:w-4/5 space-y-6 p-4 rounded-lg my-4">
              {[
                "One flexible tool for your entire company to share knowledge, ship projects, and collaborate.",
                "Enterprise features to securely manage user access and security.",
                "Dedicated support to work with you on your setup and help you build the best plan for your company.",
                "Dedicated support to work with you on your setup and help you build the best plan for your company.",
              ].map((text, i) => (
                <div key={i} className="flex gap-4 border-b last:border-none">
                  <PiCheckLight className="text-2xl" />
                  <div className="font-normal pb-4 w-80 ">{text}</div>
                </div>
              ))}
            </div>
          </div>

          <NeobruCard className="p-6">
            {loading && <Loader />}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4  w-full md:w-96 "
            >
              <div>
                <label className="text-sm">Fullname</label>
                <Input {...register("full_name")} placeholder="John Doe" />
                {errors.full_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.full_name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm">Working email</label>
                <Input
                  {...register("email")}
                  placeholder="johndoe@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm">Current/Last School Attended</label>
                <Input {...register("school")} placeholder="EVSU" />
                {errors.school && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.school.message}
                  </p>
                )}
              </div>

              {/* ROLE */}
              <div className="w-full">
                <label className="text-sm">Role / Position</label>
                {errors.position && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.position.message}
                  </p>
                )}

                <Tags className="max-w-full">
                  <TagsTrigger>
                    {companySizeTags.map((tag) => (
                      <TagsValue
                        key={tag}
                        onRemove={() =>
                          handleTagChange(
                            companySizeTags.filter((t) => t !== tag),
                            "position",
                          )
                        }
                      >
                        {tag}
                      </TagsValue>
                    ))}
                  </TagsTrigger>

                  <TagsContent>
                    <TagsInput
                      placeholder="Type or select..."
                      value={companySizeInput}
                      onValueChange={setCompanySizeInput}
                    />

                    <TagsList>
                      <TagsEmpty>
                        <button
                          type="button"
                          className="mx-auto flex items-center gap-2"
                          onClick={() =>
                            handleCreateTag(companySizeInput, "position")
                          }
                        >
                          <PlusIcon size={14} /> Create: {companySizeInput}
                        </button>
                      </TagsEmpty>

                      <TagsGroup>
                        {companySizeOptions.map((tag) => (
                          <TagsItem
                            key={tag}
                            value={tag}
                            onSelect={() =>
                              handleTagChange(
                                companySizeTags.includes(tag)
                                  ? companySizeTags.filter((t) => t !== tag)
                                  : [...companySizeTags, tag],
                                "position",
                              )
                            }
                          >
                            {tag}
                            {companySizeTags.includes(tag) && (
                              <CheckIcon size={14} />
                            )}
                          </TagsItem>
                        ))}
                      </TagsGroup>
                    </TagsList>
                  </TagsContent>
                </Tags>
              </div>

              {/* REFERRER */}
              <div className="w-full">
                <label className="text-sm">How did you find us?</label>
                {errors.refferer && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.refferer.message}
                  </p>
                )}

                <Tags className="max-w-full">
                  <TagsTrigger>
                    {helpTags.map((tag) => (
                      <TagsValue
                        key={tag}
                        onRemove={() =>
                          handleTagChange(
                            helpTags.filter((t) => t !== tag),
                            "refferer",
                          )
                        }
                      >
                        {tag}
                      </TagsValue>
                    ))}
                  </TagsTrigger>

                  <TagsContent>
                    <TagsInput
                      placeholder="Type or select..."
                      value={helpInput}
                      onValueChange={setHelpInput}
                    />

                    <TagsList>
                      <TagsEmpty>
                        <button
                          type="button"
                          className="mx-auto flex items-center gap-2"
                          onClick={() => handleCreateTag(helpInput, "refferer")}
                        >
                          <PlusIcon size={14} /> Create: {helpInput}
                        </button>
                      </TagsEmpty>

                      <TagsGroup>
                        {helpOptions.map((tag) => (
                          <TagsItem
                            key={tag}
                            value={tag}
                            onSelect={() =>
                              handleTagChange(
                                helpTags.includes(tag)
                                  ? helpTags.filter((t) => t !== tag)
                                  : [...helpTags, tag],
                                "refferer",
                              )
                            }
                          >
                            {tag}
                            {helpTags.includes(tag) && <CheckIcon size={14} />}
                          </TagsItem>
                        ))}
                      </TagsGroup>
                    </TagsList>
                  </TagsContent>
                </Tags>
              </div>

              <div>
                <label className="text-sm">
                  Tell us your motivation on joining.
                </label>
                <Textarea
                  className="min-h-[80px]"
                  {...register("reason")}
                  placeholder="to gain experience and ..."
                />
                {errors.reason && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.reason.message}
                  </p>
                )}
              </div>

              <p className="text-xs text-foreground/60">
                By submitting this form you agree to our{" "}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  privacy policy
                </a>
                .
              </p>

              <Button
                type="submit"
                disabled={loading}
                className="w-full text-sm font-light"
              >
                Submit
              </Button>
            </form>
          </NeobruCard>
        </motion.div>
      ) : (
        <div className="text-xl md:text-2xl h-screen w-full flex items-center justify-center px-8">
          <motion.div
            className="text-center"
            variants={TextVariants}
            viewport={{ once: true, amount: 0.5 }}
            whileInView="visible"
            initial="hidden"
          >
            <Image
              src="/MessyDoodle.svg"
              alt="logo"
              width={400}
              height={400}
              className="mx-auto"
            />
            <div className="text-gray-500 font-light py-10 max-w-lg">
              Your application has been successfully submitted. Digilabs will
              reach out to you soon with further information.
            </div>
             <Link
             prefetch={false}
            href={"/profile/update"}
            className="bg-foreground text-background hover:bg-foreground/90 block w-full lg:w-24 text-base rounded-lg py-2 px-4 text-center font-medium transition-all duration-200"
          >
            Refresh
          </Link>
          </motion.div>
        </div>
      )}
    </>
  );
}
