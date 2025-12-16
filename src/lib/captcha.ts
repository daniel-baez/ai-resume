export async function getCaptchaToken(): Promise<string> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Window is undefined'));
  }

  return new Promise<string>((resolve, reject) => {
    window.grecaptcha.ready(() => {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (!siteKey) {
        return reject(new Error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set'));
      }

      return window.grecaptcha
        .execute(siteKey, {
          action: "submit",
        })
        .then(resolve)
        .catch(reject);
    });
  });
}

export async function isCaptchaValid(token: string): Promise<boolean> {
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`);
  const data = await response.json();
  const result =  data.success && data.score >= 0.7;
  return result;
}
