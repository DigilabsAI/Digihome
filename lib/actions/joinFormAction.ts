"use server";

import { z } from "zod";
import nodemailer from 'nodemailer';
import { getCurrentUser } from "./userAction";


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
      school: data.school,
      referrers: data.refferer ?? [],
      positions: data.position,
    })
    .select()
    .single();

  if (error) throw error;


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

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      bcc: recipients,
      subject: "Join Form Submission",
      html: `
    <h1>Join Form</h1>
    <p>Full Name: ${data.full_name}</p>
    <p>Email: ${data.email}</p>
    <p>School: ${data.school}</p>
    <p>Position: ${data.position.join(", ")}</p>
    <p>Referrer: ${data.refferer.join(", ")}</p>
    <p>Reason: ${data.reason}</p>
  `,
    });

    return {
      success: true,
      error: null
    };

  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: "Opps! Something went wrong."
    };
  }
}
