import { Language } from "./i18n"

type TranslationKeys = {
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
      errorDescription: "Please try again."
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
      errorDescription: "Por favor, inténtalo de nuevo."
    }
  },
  fr: {
    navigation: {
      about: "À propos",
      experience: "Expérience",
      skills: "Compétences",
      education: "Formation"
    },
    sections: {
      summary: "Résumé Professionnel",
      experience: "Expérience",
      skills: "Compétences",
      education: "Formation",
      languages: "Langues",
      certifications: "Certifications Professionnelles"
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
      success: "Email envoyé avec succès!",
      successDescription: "Je vous contacterai le plus tôt possible.",
      error: "Erreur lors de l'envoi de l'email",
      errorDescription: "Veuillez réessayer."
    }
  }
}

export const getTranslations = (lang: Language) => translations[lang.code] 