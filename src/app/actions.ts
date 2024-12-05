"use server";

export async function verifyRecaptcha(token: string) {
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`);
  const data = await response.json();
  return data.success && data.score >= 0.5;
}