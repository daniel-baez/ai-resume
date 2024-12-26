"use server";

import { Resend } from 'resend';
import { isCaptchaValid } from '@/lib/captcha';

const resend = new Resend(process.env.RESEND_API_KEY);

interface FormDataObject {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function verifyAndSendEmail(token: string, formData: FormDataObject) {
  // Validate reCAPTCHA token
  const isValid = await isCaptchaValid(token);
  if (!isValid) {
    console.error("Failed to verify captcha");
    return false;
  }

  // Send email if reCAPTCHA is verified
  try {
    await resend.emails.send({
      from: "Contact <contact@baezdaniel.cl>",
      to: ["daniel@baezdaniel.cl"],
      subject: "New Contact Form Submission",
      html: `<p>Name: ${formData.name}</p>
             <p>Email: ${formData.email}</p>
             <p>Phone: ${formData.phone}</p>
             <p>Message: ${formData.message}</p>`,
    });
    return true;
  } catch (error) {
    console.error("Failed to send email", error);
    return false;
  }
}