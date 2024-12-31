"use server";

import { Resend } from 'resend';
import { isCaptchaValid } from '@/lib/captcha';
import { isEmail } from 'validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { saveContactMessage, updateMessageSentStatus } from '@/lib/firebase-service';
import { getTranslations, TranslationKeys } from '@/constants/translations';
import { Language } from '@/constants/i18n';

const resend = new Resend(process.env.RESEND_API_KEY);

interface FormDataObject {
  name: string;
  email: string;
  phone: string;
  message: string;
}

async function validateAndProcessFormData(formData: FormDataObject, t: TranslationKeys) {
  const { name, email, phone, message } = formData;

  // Validate email
  if (!isEmail(email)) {
    throw new Error(t.contact.emailError);
  }

  // Validate phone number
  const phoneNumber = parsePhoneNumberFromString(phone);
  if (!phoneNumber || !phoneNumber.isValid()) {
    throw new Error(t.contact.phoneError);
  }

  // Validate lengths
  if (name.length > 200 || email.length > 200 || phone.length > 200 || message.length > 1000) {
    throw new Error(t.contact.lengthError);
  }
}

export async function verifyAndSendEmail(token: string, formData: FormDataObject, lang: Language): Promise<boolean | Error> {
  const t = getTranslations(lang);

  // if the phone number doesn't start with +, prepend +
  if (!formData.phone.startsWith("+")) {
    formData.phone = `+${formData.phone}`;
  }

  // Validate reCAPTCHA token
  if (!(await isCaptchaValid(token))) {
    console.log("Error validating captcha", token);
    return new Error (t.contact.captchaError);
  }

  // Validate form data (throws an error if the data is not valid)
  try {
    await validateAndProcessFormData(formData, t);
  } catch (error) {
    console.log("Error validating form data", error);
    return error as Error
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
    console.log("Error sending email", error);
    return new Error(t.contact.sendEmailError, { cause: error });
  }
}
