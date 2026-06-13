const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;

const OWNER = "daniel_baez";

export function getDownloadDateSuffix(date = new Date()): string {
  const year = date.getFullYear();
  const month = MONTHS[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}_${month}_${day}`;
}

export function buildResumeDownloadFilename(
  lang: string,
  date = new Date()
): string {
  return `${OWNER}-resume-${lang}_${getDownloadDateSuffix(date)}.pdf`;
}

export function buildCertificateDownloadFilename(
  slug: string,
  date = new Date()
): string {
  return `${OWNER}-certificate-${slug}_${getDownloadDateSuffix(date)}.pdf`;
}

export function buildExperienceLetterDownloadFilename(
  slug: string,
  date = new Date()
): string {
  return `${OWNER}-experience-letter-${slug}_${getDownloadDateSuffix(date)}.pdf`;
}
