'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2 } from 'lucide-react'
import { leadFormSchema, type LeadFormValues } from '@/lib/validators/forms'
import { GRADES, PROGRAM_OPTIONS, API_URL } from '@/lib/constants'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface LeadFormProps {
  source?:       string
  programSlug?:  string
  className?:    string
  compact?:      boolean   // compact=true hides message field
}

const gradeOptions   = GRADES.map(g  => ({ value: g,   label: g }))
const programOptions = PROGRAM_OPTIONS.map(p => ({ value: p.value, label: p.label }))

export function LeadForm({
  source = 'home_hero',
  programSlug,
  className,
  compact = false,
}: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      program: (programSlug as LeadFormValues['program']) ?? '' as LeadFormValues['program'],
      source,
    },
  })

  const onSubmit = async (data: LeadFormValues) => {
    setServerError(null)
    try {
      const res = await fetch(`${API_URL}/api/enquiries`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          ...data,
          source,
          programPageSource: source === 'program_page' ? programSlug : undefined,
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
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className={cn(
        'flex flex-col items-center justify-center text-center p-8 gap-4',
        'bg-success/5 border border-success/20 rounded-md',
        className
      )}>
        <CheckCircle2 size={40} className="text-emerald-400" />
        <div>
          <p className="text-base font-semibold text-paper mb-1">
            Enquiry Received!
          </p>
          <p className="text-sm text-quiet">
            Thank you. Our team will contact you within 24 hours.
          </p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs text-muted hover:text-quiet underline underline-offset-2 mt-2 transition-colors"
        >
          Submit another enquiry
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn('flex flex-col gap-4', className)}
      aria-label="Admission enquiry form"
    >
      {/* Name */}
      <Input
        label="Full Name"
        placeholder="Your name"
        required
        error={errors.name?.message}
        {...register('name')}
      />

      {/* Phone */}
      <Input
        label="Mobile Number"
        type="tel"
        inputMode="numeric"
        maxLength={10}
        placeholder="10-digit mobile number"
        required
        error={errors.phone?.message}
        {...register('phone')}
      />

      {/* Grade + Program — 2 col on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Current Class"
          placeholder="Select class"
          required
          options={gradeOptions}
          error={errors.grade?.message}
          {...register('grade')}
        />
        <Select
          label="Programme of Interest"
          placeholder="Select programme"
          required
          options={programOptions}
          error={errors.program?.message}
          {...register('program')}
        />
      </div>

      {/* Optional message */}
      {!compact && (
        <Textarea
          label="Message (optional)"
          placeholder="Any questions or specific requirements..."
          rows={3}
          error={errors.message?.message}
          helper="Max 500 characters"
          {...register('message')}
        />
      )}

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
        className="mt-1"
      >
        {isSubmitting ? 'Sending…' : 'Send Enquiry'}
      </Button>

      <p className="text-xs text-muted text-center">
        By submitting, you agree to be contacted by our admissions team.
      </p>
    </form>
  )
}
