import { z } from 'zod'
import { GRADES, PROGRAM_OPTIONS } from '@/lib/constants'

const gradeValues   = GRADES.map(g => g) as [string, ...string[]]
const programValues = PROGRAM_OPTIONS.map(p => p.value) as [string, ...string[]]

/* ── Shared Field Schemas ────────────────────────────────────── */

const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name is too long')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters')

const phoneSchema = z
  .string()
  .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number')

const emailSchema = z
  .string()
  .email('Enter a valid email address')

const emailOptionalSchema = z
  .union([
    z.string().email('Enter a valid email address'),
    z.literal(''),
  ])
  .optional()

/* ── Lead / Enquiry Form ─────────────────────────────────────── */

export const leadFormSchema = z.object({
  name:     nameSchema,
  phone:    phoneSchema,
  email:    emailOptionalSchema,
  grade:    z.enum(gradeValues, { errorMap: () => ({ message: 'Select your current class' }) }),
  program:  z.enum(programValues, { errorMap: () => ({ message: 'Select a programme' }) }),
  message:  z.string().max(500, 'Message is too long').optional(),
  source:   z.string().optional(),
})

export type LeadFormValues = z.infer<typeof leadFormSchema>

/* ── Contact Form ────────────────────────────────────────────── */

export const contactFormSchema = z.object({
  name:     nameSchema,
  phone:    phoneSchema,
  email:    emailSchema,
  grade:    z.enum(gradeValues, { errorMap: () => ({ message: 'Select your current class' }) }),
  program:  z.enum(programValues, { errorMap: () => ({ message: 'Select a programme' }) }),
  message:  z.string().min(10, 'Message is too short').max(600, 'Message is too long'),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

/* ── Career Application Form ─────────────────────────────────── */

export const careerFormSchema = z.object({
  applicantName:       nameSchema,
  email:               emailSchema,
  phone:               phoneSchema,
  currentLocation:     z.string().max(100).optional(),
  yearsOfExperience:   z
    .number({ invalid_type_error: 'Enter a number' })
    .int()
    .min(0, 'Cannot be negative')
    .max(50, 'Value seems too high')
    .optional(),
  subjectSpecialisation: z.string().max(100).optional(),
  coverNote:           z.string().max(600, 'Cover note is too long').optional(),
  // resumeSecureUrl and resumePublicId are added after Cloudinary upload — not part of RHF schema
})

export type CareerFormValues = z.infer<typeof careerFormSchema>
