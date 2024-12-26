// src/components/forms/contact-form.tsx
"use client"

import { useState } from "react"
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

interface ContactFormProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactForm({ isOpen, onOpenChange }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = await getCaptchaToken();
    if (!token) {
      toast({
        title: "Failed to get captcha token",
        description: "Please try again.",
        variant: "destructive",
      })
      return onOpenChange(false)
    }

    const success = await verifyAndSendEmail(token, formData);
    if (!success) {
      toast({
        title: "Failed to send email",
        description: "Please try again.",
        variant: "destructive",
      })
      return onOpenChange(false)
    }

    console.log("Form submitted:", formData, token)
    toast({
      title: "Email sent successfully!",
      description: "I'll get back to you as soon as possible.",
    })
    onOpenChange(false)
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto bg-white hover:bg-blue-50 text-gray-700 border-gray-300"
          onClick={() => {
            onOpenChange(true)
          }}
        >
          <Mail className="mr-2 h-4 w-4" /> Contact Me
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Get in Touch</DialogTitle>
          <DialogDescription>
            I&apos;d love to hear from you! Fill out this form and I&apos;ll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Send Message
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}