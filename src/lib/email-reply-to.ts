/**
 * Builds a Resend `replyTo` value so a reply goes to the form submitter,
 * not the verified From mailbox (`contact@baezdaniel.cl`).
 *
 * Resend accepts `email@example.com` or `Name <email@example.com>`.
 * Newlines and angle brackets in the display name are stripped so they
 * cannot break the header or 422 the send.
 */
export function formatReplyTo(name: string, email: string): string {
  const mailbox = email.trim();
  const displayName = name
    .replace(/[\r\n<>"\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!displayName) {
    return mailbox;
  }

  return `${displayName} <${mailbox}>`;
}
