"use server";
import Error from "next/error";
import * as sgMail from "@sendgrid/mail";

sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

type SendEmail = {
  fromEmail: string;
  toEmail: string;
  subject?: string;
  html: string;
};

export async function sendEmail({
  fromEmail,
  html,
  subject,
  toEmail,
}: SendEmail) {
  try {
    const msg = {
      to: toEmail,
      from: fromEmail,
      subject: subject,
      html: html,
    };
    await sgMail.send(msg);
    console.log("sent");
    return true;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
