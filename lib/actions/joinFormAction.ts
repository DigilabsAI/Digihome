"use server";

import { z } from "zod";
import nodemailer from 'nodemailer';
import { getCurrentUser } from "./userAction";
import { render } from "@react-email/render";
import JoinFormSubmissionEmail from "@/lib/emailTemplates/join-submission-email";
import DigilabsWelcomeEmail from "../emailTemplates/welcome-email";

const FormSchema = z.object({
  full_name: z.string(),
  email: z.string().email(),
  school: z.string(),
  position: z.array(z.string()),
  refferer: z.array(z.string()),
  reason: z.string(),
});

export async function submitJoinForm(data: z.infer<typeof FormSchema>) {
  const { supabase, user } = await getCurrentUser();


  const recipients =
    process.env.EMAIL_RECIPIENTS?.split(",").map(e => e.trim()) ?? [];

  if (recipients.length === 0) {
    throw new Error("No email recipients configured");
  }

  const { data: request, error } = await supabase
    .from("organization_join_requests")
    .insert({
      user_id: user.id,
      full_name: data.full_name,
      reason: data.reason,
      email: data.email,
      school: data.school,
      referrers: data.refferer ?? [],
      positions: data.position,
    })
    .select()
    .single();


  try {

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = await render(
      JoinFormSubmissionEmail({
        fullName: data.full_name,
        email: data.email,
        school: data.school,
        positions: data.position,
        referrers: data.refferer ?? [],
        reason: data.reason,
      })
    );

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      bcc: recipients,
      subject: "Join Form Submission",
      html,
    });


    return {
      success: true,
      error: null
    };

  } catch (err) {

    return {
      success: false,
      error: "Opps! Something went wrong."
    };
  }
}


export async function updateRequestStatusAction({
  id,
  status,
  email,
  fullname,
}: {
  id: string;
  status: "approved" | "rejected" | "pending",
  email: string,
  fullname: string;
}) {
  const { supabase } = await getCurrentUser();

  const { data, error } = await supabase
    .from("organization_join_requests")
    .update({ status })
    .eq("id", id)
    .select("user_id")
    .single();

  if (error) throw error;
  if (!data?.user_id) throw new Error("No user_id returned");

  const newRole = status === "approved" ? "member" : "non-member";

  const { error: userError } = await supabase
    .from("users")
    .update({ role: newRole })
    .eq("id", data.user_id);

  if (userError) throw userError;

  if (status === "approved") {
    try {
      const recipients =
        process.env.EMAIL_RECIPIENTS?.split(",").map((e) => e.trim()) ?? [];

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const html = await render(DigilabsWelcomeEmail({
        userFirstname: fullname.split(" ")[0],
      }));

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        bcc: recipients,
        subject: "Welcome to Digilabs",
        html,
      });
    } catch (err) {
      console.error("Email error:", err);
    }
  }
};