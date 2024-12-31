"use server";

import { Resend } from 'resend';
import { isCaptchaValid } from '@/lib/captcha';
import { isEmail } from 'validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { saveContactMessage, updateMessageSentStatus } from '@/lib/firebase-service';

const resend = new Resend(process.env.RESEND_API_KEY);

interface FormDataObject {
  name: string;
  email: string;
  phone: string;
  message: string;
}

async function validateAndProcessFormData(formData: FormDataObject) {
  const { name, email, phone, message } = formData;

  // Validate email
  if (!isEmail(email)) {
    throw new Error('Invalid email format');
  }

  // Validate phone number
  const phoneNumber = parsePhoneNumberFromString(phone);
  if (!phoneNumber || !phoneNumber.isValid()) {
    throw new Error('Invalid phone number');
  }

  // Validate lengths
  if (name.length > 200 || email.length > 200 || phone.length > 200 || message.length > 1000) {
    throw new Error('Input exceeds maximum length');
  }
}

export async function verifyAndSendEmail(token: string, formData: FormDataObject) {
  // if the phone number doesn't start with +, prepend +
  if (!formData.phone.startsWith("+")) {
    formData.phone = `+${formData.phone}`;
  }

  // Validate reCAPTCHA token
  if (!(await isCaptchaValid(token))) {
    console.error("Failed to verify captcha");
    return false;
  }

  // Validate form data
  try {
    await validateAndProcessFormData(formData);
  } catch (error) {
    console.error("Failed to validate form data", error);
    return false;
  }

  // Save to Firebase first
  const messageId = await saveContactMessage({
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    message: formData.message,
  });

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
    // Update Firebase document with sent_at timestamp
    await updateMessageSentStatus(messageId);

    return true;
  } catch (error) {
    console.error("Failed to send email", error);
    return false;
  }
}