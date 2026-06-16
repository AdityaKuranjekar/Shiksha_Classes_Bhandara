'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, Phone, MessageCircle } from 'lucide-react'
import { contactFormSchema, type ContactFormValues } from '@/lib/validators/forms'
import { GRADES, PROGRAM_OPTIONS, API_URL, CONTACT } from '@/lib/constants'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface ContactFormProps {
  className?: string
}

const gradeOptions   = GRADES.map(g  => ({ value: g,   label: g }))
const programOptions = PROGRAM_OPTIONS.map(p => ({ value: p.value, label: p.label }))

export function ContactForm({ className }: ContactFormProps) {
  const [submitted, setSubmitted]     = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormValues) => {
    setServerError(null)
    try {
      const res = await fetch(`${API_URL}/api/enquiries`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          ...data,
          source: 'contact_page',
          referrerUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error?.message ?? 'Submission failed. Please try again.')
      }

      setSubmitted(true)
      reset()
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-10 gap-4 bg-success/5 border border-success/20 rounded-md min-h-[320px]">
        <CheckCircle2 size={48} className="text-emerald-400" />
        <div>
          <p className="text-lg font-serif font-light text-paper mb-2">Message Received!</p>
          <p className="text-sm text-quiet max-w-xs">
            Thank you for reaching out. Our admissions team will contact you within 24 hours.
          </p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs text-muted hover:text-quiet underline underline-offset-2 transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <div className={cn('space-y-8', className)}>
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5"
        aria-label="Contact and admission enquiry form"
      >
        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            placeholder="Your name"
            required
            autoComplete="name"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            required
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        {/* Phone */}
        <Input
          label="Mobile Number"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          placeholder="10-digit mobile number"
          required
          autoComplete="tel"
          error={errors.phone?.message}
          helper="We'll WhatsApp you on this number"
          {...register('phone')}
        />

        {/* Grade + Program */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Current Class"
            placeholder="Select your class"
            required
            options={gradeOptions}
            error={errors.grade?.message}
            {...register('grade')}
          />
          <Select
            label="Programme of Interest"
            placeholder="Select a programme"
            required
            options={programOptions}
            error={errors.program?.message}
            {...register('program')}
          />
        </div>

        {/* Message */}
        <Textarea
          label="Your Message"
          placeholder="Ask us anything — fees, batch timings, admission process…"
          rows={4}
          required
          error={errors.message?.message}
          helper="Min 10 characters · Max 600 characters"
          {...register('message')}
        />

        {/* Server error */}
        {serverError && (
          <p className="text-xs text-red-400 bg-error/5 border border-error/20 rounded-sm px-3 py-2" role="alert">
            {serverError}
          </p>
        )}

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          fullWidth
        >
          {isSubmitting ? 'Sending…' : 'Send Message'}
        </Button>

        <p className="text-xs text-muted text-center">
          We typically respond within 24 hours. You may also reach us directly below.
        </p>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-ink px-4 text-xs text-muted uppercase tracking-widest">
            Or reach us directly
          </span>
        </div>
      </div>

      {/* Direct contact options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a
          href={`tel:${CONTACT.phone}`}
          className={cn(
            'flex items-center gap-3 px-5 py-4 rounded-sm',
            'bg-slate border border-slate-border',
            'hover:border-quiet/30 hover:bg-slate-raised',
            'transition-all duration-fast group'
          )}
        >
          <div className="p-2 bg-blue/10 rounded-sm">
            <Phone size={16} className="text-blue-light" />
          </div>
          <div>
            <p className="text-xs text-muted mb-0.5">Call us</p>
            <p className="text-sm font-medium text-paper group-hover:text-brass transition-colors">
              {CONTACT.phone}
            </p>
          </div>
        </a>

        <a
          href={`https://wa.me/${CONTACT.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex items-center gap-3 px-5 py-4 rounded-sm',
            'bg-slate border border-slate-border',
            'hover:border-emerald-800/40 hover:bg-slate-raised',
            'transition-all duration-fast group'
          )}
        >
          <div className="p-2 bg-success/10 rounded-sm">
            <MessageCircle size={16} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-muted mb-0.5">WhatsApp</p>
            <p className="text-sm font-medium text-paper group-hover:text-emerald-400 transition-colors">
              Chat with us
            </p>
          </div>
        </a>
      </div>
    </div>
  )
}
