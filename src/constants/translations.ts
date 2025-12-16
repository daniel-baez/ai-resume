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
    softSkills: string
    certifications: string
    experience_letter: string
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
      softSkills: "Soft Skills",
      education: "Education",
      languages: "Languages",
      certifications: "Professional Certifications",
      experience_letter: "Experience Letter"
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
      subtitle: "Cloud Architect & IoT Expert",
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
      softSkills: "Habilidades Blandas",
      education: "Educación",
      languages: "Idiomas",
      certifications: "Certificaciones Profesionales",
      experience_letter: "Carta de Experiencia"
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
  },
  fr: {
    navigation: {
      about: "À propos",
      experience: "Expérience",
      skills: "Compétences",
      education: "Éducation"
    },
    sections: {
      summary: "Résumé Professionnel",
      experience: "Expérience",
      skills: "Compétences",
      softSkills: "Compétences Humaines",
      education: "Éducation",
      languages: "Langues",
      certifications: "Certifications Professionnelles",
      experience_letter: "Lettre de recommandation"
    },
    actions: {
      downloadResume: "Télécharger CV",
      scheduleMeeting: "Planifier une Réunion",
      contact: "Contact"
    },
    contact: {
      title: "Contact",
      description: "Je vous contacterai le plus tôt possible.",
      name: "Nom",
      email: "Email",
      phone: "Téléphone",
      message: "Message",
      submit: "Envoyer",
      success: "Message envoyé !",
      successDescription: "Je vous contacterai le plus tôt possible.",
      error: "Erreur lors de l'envoi du message",
      errorDescription: "Veuillez réessayer.",
      captchaError: "Erreur lors de la vérification du captcha",
      sendEmailError: "Erreur lors de l'envoi de l'email",
      lengthError: "Le champ dépasse la longueur maximale",
      emailError: "Format d'email invalide",
      phoneError: "Numéro de téléphone invalide"
    },
    pdf: {
      title: "Ingénieur Logiciel",
      subtitle: "Architecte Cloud & Expert en IoT",
      sections: {
        summary: "Résumé",
        experience: "Expérience",
        education: "Éducation",
        technicalSkills: "Compétences Techniques"
      },
      links: {
        linkedin: "LinkedIn",
        github: "GitHub",
        website: "Site Web"
      }
    }
  }
}

export const getTranslations = (lang: Language) => translations[lang.code] 