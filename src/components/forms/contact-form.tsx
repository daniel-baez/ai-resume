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

interface ContactFormProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactForm({ isOpen, onOpenChange }: ContactFormProps) {
  const [captcha, setCaptcha] = useState("")
  const [userCaptcha, setUserCaptcha] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const generateCaptcha = () => {
    const result = Math.random().toString(36).substring(2, 8)
    setCaptcha(result)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userCaptcha.toLowerCase() !== captcha.toLowerCase()) {
      alert("Captcha is incorrect. Please try again.")
      generateCaptcha()
      return
    }
    console.log("Form submitted:", formData)
    onOpenChange(false)
    setFormData({ name: "", email: "", phone: "", message: "" })
    setUserCaptcha("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto bg-white hover:bg-blue-50 text-gray-700 border-gray-300"
          onClick={() => {
            generateCaptcha()
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
          <div className="space-y-2">
            <Label htmlFor="captcha">Captcha: {captcha}</Label>
            <Input id="captcha" value={userCaptcha} onChange={(e) => setUserCaptcha(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Send Message
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}