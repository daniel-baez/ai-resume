import { Language } from "./i18n"

export type TranslationKeys = {
  navigation: {
    about: string
    experience: string
    skills: string
    education: string
  }
  sections: {
    summary: string
    experience: string
    skills: string
    education: string
    languages: string
    certifications: string
  }
  actions: {
    downloadResume: string
    scheduleMeeting: string
    contact: string
  }
  contact: {
    title: string
    description: string
    name: string
    email: string
    phone: string
    message: string
    submit: string
    success: string
    successDescription: string
    error: string
    errorDescription: string
    captchaError: string
    sendEmailError: string
    lengthError: string
    emailError: string
    phoneError: string
  }
  pdf: {
    title: string
    subtitle: string
    sections: {
      summary: string
      experience: string
      education: string
      technicalSkills: string
    }
    links: {
      linkedin: string
      github: string
      website: string
    }
  }
}

const translations: Record<string, TranslationKeys> = {
  en: {
    navigation: {
      about: "About",
      experience: "Experience",
      skills: "Skills",
      education: "Education"
    },
    sections: {
      summary: "Professional Summary",
      experience: "Experience",
      skills: "Skills",
      education: "Education",
      languages: "Languages",
      certifications: "Professional Certifications"
    },
    actions: {
      downloadResume: "Download Resume",
      scheduleMeeting: "Schedule a Meeting",
      contact: "Contact"
    },
    contact: {
      title: "Get in Touch",
      description: "I'd love to hear from you! Fill out this form and I'll get back to you as soon as possible.",
      name: "Name",
      email: "Email",
      phone: "Phone Number",
      message: "Message",
      submit: "Send Message",
      success: "Email sent successfully!",
      successDescription: "I'll get back to you as soon as possible.",
      error: "Failed to send email",
      errorDescription: "Please try again.",
      captchaError: "Error verifying captcha",
      sendEmailError: "Error sending email",
      lengthError: "Input exceeds maximum length",
      emailError: "Invalid email format",
      phoneError: "Invalid phone number"
    },
    pdf: {
      title: "Software Engineer",
      subtitle: "Architect Cloud & IoT Expert",
      sections: {
        summary: "Summary",
        experience: "Experience",
        education: "Education",
        technicalSkills: "Technical Skills"
      },
      links: {
        linkedin: "LinkedIn",
        github: "GitHub",
        website: "Website"
      }
    }
  },
  es: {
    navigation: {
      about: "Sobre mí",
      experience: "Experiencia",
      skills: "Habilidades",
      education: "Educación"
    },
    sections: {
      summary: "Resumen Profesional",
      experience: "Experiencia",
      skills: "Habilidades",
      education: "Educación",
      languages: "Idiomas",
      certifications: "Certificaciones Profesionales"
    },
    actions: {
      downloadResume: "Descargar CV",
      scheduleMeeting: "Agendar Reunión",
      contact: "Contacto"
    },
    contact: {
      title: "Contacto",
      description: "¡Me encantaría saber de ti! Completa este formulario y te responderé lo antes posible.",
      name: "Nombre",
      email: "Correo",
      phone: "Teléfono",
      message: "Mensaje",
      submit: "Enviar Mensaje",
      success: "¡Mensaje enviado!",
      successDescription: "Te responderé lo antes posible.",
      error: "Error al enviar el mensaje",
      errorDescription: "Por favor, inténtalo de nuevo.",
      captchaError: "Error al validar el captcha",
      sendEmailError: "Error al enviar el correo",
      lengthError: "El input excede el máximo de caracteres",
      emailError: "Formato de correo inválido",
      phoneError: "Número de teléfono inválido"
    },
    pdf: {
      title: "Ingeniero de Software",
      subtitle: "Architecto Cloud & experto en IoT",
      sections: {
        summary: "Resumen",
        experience: "Experiencia",
        education: "Educación",
        technicalSkills: "Habilidades Técnicas"
      },
      links: {
        linkedin: "LinkedIn",
        github: "GitHub",
        website: "Sitio Web"
      }
    }
  }
}

export const getTranslations = (lang: Language) => translations[lang.code] 