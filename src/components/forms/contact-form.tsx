// src/components/forms/contact-form.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getCaptchaToken } from "@/lib/captcha"
import { verifyAndSendEmail } from "@/app/actions"
import { toast } from "@/hooks/use-toast"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics'
import { getTranslations } from "@/constants/translations"
import { Language } from "@/constants/i18n"

interface ContactFormProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  currentLang: Language
}

export function ContactForm({ isOpen, onOpenChange, currentLang }: ContactFormProps) {
  const { trackEvent } = useGoogleAnalytics()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const t = getTranslations(currentLang)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const emailInput = document.getElementById("email")
        const phoneInput = document.getElementById("phone")

        // get the width of the email input
        const emailWidth = emailInput?.offsetWidth
        // set the width of the phone input to the width of the email input
        if (phoneInput) {
          phoneInput.style.width = `${emailWidth}px`
        }
      })
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, phone: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const token = await getCaptchaToken();
    if (!token) {
      toast({
        title: t.contact.error,
        description: t.contact.errorDescription,
        variant: "destructive",
      })
      setIsLoading(false)
      return onOpenChange(false)
    }

    const success = await verifyAndSendEmail(token, formData);
    if (!success) {
      toast({
        title: t.contact.error,
        description: t.contact.errorDescription,
        variant: "destructive",
      })
      setIsLoading(false)
      return onOpenChange(false)
    }

    toast({
      title: t.contact.success,
      description: t.contact.successDescription,
    })
    onOpenChange(false)
    setFormData({ name: "", email: "", phone: "", message: "" })
    setIsLoading(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (open) {
      trackEvent({
        action: 'open',
        category: 'contact',
        label: 'contact_form_open'
      });
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto bg-white hover:bg-blue-50 text-gray-700 border-gray-300">
          <Mail className="mr-2 h-4 w-4" /> {t.actions.contact}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t.contact.title}</DialogTitle>
          <DialogDescription>{t.contact.description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t.contact.name}</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required maxLength={200} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t.contact.email}</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required maxLength={200} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t.contact.phone}</Label>
            <PhoneInput
              country={'us'}
              value={formData.phone}
              onChange={handlePhoneChange}
              inputProps={{
                id: 'phone',
                name: 'phone',
                required: true,
                maxLength: 200,
              }}
              containerClass="phone-input-container"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{t.contact.message}</Label>
            <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={5} maxLength={1000} />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : t.contact.submit}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}