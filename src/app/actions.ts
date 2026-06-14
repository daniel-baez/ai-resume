"use server";

import { Resend } from 'resend';
import { isCaptchaValid } from '@/lib/captcha';
import { isEmail } from 'validator';
import { saveContactMessage, updateMessageSentStatus } from '@/lib/firebase-service';
import { getTranslations, TranslationKeys } from '@/constants/translations';
import { Language } from '@/constants/i18n';

const resend = new Resend(process.env.RESEND_API_KEY);

interface FormDataObject {
  name: string;
  email: string;
  message: string;
}

async function validateAndProcessFormData(formData: FormDataObject, t: TranslationKeys) {
  const { name, email, message } = formData;

  // Validate email
  if (!isEmail(email)) {
    throw t.contact.emailError;
  }

  // Validate lengths
  if (name.length > 200 || email.length > 200 || message.length > 1000) {
    throw t.contact.lengthError;
  }
}

export async function verifyAndSendEmail(token: string, formData: FormDataObject, lang: Language): Promise<boolean | string> {
  const t = getTranslations(lang);

  // Validate reCAPTCHA token
  if (!(await isCaptchaValid(token))) {
    console.log("Error validating captcha");
    return t.contact.captchaError;
  }

  // Validate form data (throws an error if the data is not valid)
  try {
    await validateAndProcessFormData(formData, t);
  } catch (error) {
    console.log("Error validating form data", error);
    return error as string
  }

  // Save to Firebase first
  let messageId: string | undefined;
  try {
    messageId = await saveContactMessage({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });
  } catch (error) {
    console.log("Error saving contact message", error);
    // return t.contact.saveMessageError;
  }

  // Send email if reCAPTCHA is verified
  try {
    await resend.emails.send({
      from: "Contact <contact@baezdaniel.cl>",
      to: ["daniel@baezdaniel.cl"],
      subject: "New Contact Form Submission",
      html: `<p>Name: ${formData.name}</p>
             <p>Email: ${formData.email}</p>
             <p>Message: ${formData.message}</p>`,
    });
    // Update Firebase document with sent_at timestamp
    if (messageId) {
      await updateMessageSentStatus(messageId);
    }

    return true;
  } catch (error) {
    console.log("Error sending email", error);
    return t.contact.sendEmailError;
  }
}
