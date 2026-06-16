'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, Upload, X, FileText } from 'lucide-react'
import { careerFormSchema, type CareerFormValues } from '@/lib/validators/forms'
import { API_URL } from '@/lib/constants'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface CareerFormProps {
  jobId:    string
  jobTitle: string
  className?: string
}

interface ResumeUpload {
  file:          File
  secureUrl:     string
  publicId:      string
  uploading:     boolean
  error?:        string
}

export function CareerForm({ jobId, jobTitle, className }: CareerFormProps) {
  const [submitted, setSubmitted]   = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [resume, setResume]         = useState<ResumeUpload | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CareerFormValues>({
    resolver: zodResolver(careerFormSchema),
  })

  /* ── Resume Cloudinary Upload ────────────────────────────── */
  const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      setResume({ file, secureUrl: '', publicId: '', uploading: false, error: 'Only PDF files are allowed.' })
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setResume({ file, secureUrl: '', publicId: '', uploading: false, error: 'File must be under 5 MB.' })
      return
    }

    setResume({ file, secureUrl: '', publicId: '', uploading: true })

    try {
      // 1. Get signed payload from API
      const sigRes = await fetch(`${API_URL}/api/admin/media/signature`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ folder: 'shiksha/resumes', resourceType: 'raw' }),
      })
      if (!sigRes.ok) throw new Error('Could not initiate upload.')
      const { data: sig } = await sigRes.json()

      // 2. Upload directly to Cloudinary
      const formData = new FormData()
      formData.append('file',         file)
      formData.append('api_key',      sig.apiKey)
      formData.append('timestamp',    String(sig.timestamp))
      formData.append('signature',    sig.signature)
      formData.append('folder',       sig.folder)
      formData.append('resource_type','raw')

      const clRes = await fetch(
        `https://api.cloudinary.com/v1_1/${sig.cloudName}/raw/upload`,
        { method: 'POST', body: formData }
      )
      if (!clRes.ok) throw new Error('Upload to Cloudinary failed.')
      const clData = await clRes.json()

      setResume({
        file,
        secureUrl: clData.secure_url,
        publicId:  clData.public_id,
        uploading: false,
      })
    } catch (err) {
      setResume(prev => prev
        ? { ...prev, uploading: false, error: err instanceof Error ? err.message : 'Upload failed.' }
        : null
      )
    }
  }

  /* ── Form Submit ─────────────────────────────────────────── */
  const onSubmit = async (data: CareerFormValues) => {
    setServerError(null)

    if (!resume?.secureUrl) {
      setServerError('Please upload your resume before submitting.')
      return
    }

    try {
      const res = await fetch(`${API_URL}/api/careers/apply`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          ...data,
          jobId,
          resumeSecureUrl: resume.secureUrl,
          resumePublicId:  resume.publicId,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        const code = body?.error?.code
        if (code === 'CONFLICT') {
          throw new Error('You have already applied for this position with this email address.')
        }
        if (code === 'GONE') {
          throw new Error('This job opening is no longer accepting applications.')
        }
        throw new Error(body?.error?.message ?? 'Submission failed. Please try again.')
      }

      setSubmitted(true)
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 gap-4 bg-success/5 border border-success/20 rounded-md">
        <CheckCircle2 size={40} className="text-emerald-400" />
        <div>
          <p className="text-base font-semibold text-paper mb-1">Application Submitted!</p>
          <p className="text-sm text-quiet">
            Thank you for applying for the <strong className="text-paper font-medium">{jobTitle}</strong> position.
            We will review your application and be in touch.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn('flex flex-col gap-5', className)}
      aria-label={`Application form for ${jobTitle}`}
    >
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          placeholder="Your name"
          required
          error={errors.applicantName?.message}
          {...register('applicantName')}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          required
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      {/* Phone + Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Mobile Number"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          placeholder="10-digit mobile"
          required
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Input
          label="Current Location"
          placeholder="City, State"
          error={errors.currentLocation?.message}
          {...register('currentLocation')}
        />
      </div>

      {/* Experience + Subject */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Years of Experience"
          type="number"
          min={0}
          max={50}
          placeholder="e.g. 3"
          error={errors.yearsOfExperience?.message}
          {...register('yearsOfExperience', { valueAsNumber: true })}
        />
        <Input
          label="Subject Specialisation"
          placeholder="e.g. Physics"
          error={errors.subjectSpecialisation?.message}
          {...register('subjectSpecialisation')}
        />
      </div>

      {/* Cover Note */}
      <Textarea
        label="Cover Note (optional)"
        placeholder="Tell us why you'd be a great fit for this role…"
        rows={4}
        error={errors.coverNote?.message}
        helper="Max 600 characters"
        {...register('coverNote')}
      />

      {/* Resume Upload */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-quiet tracking-wide after:content-['_*'] after:text-brass">
          Resume (PDF)
        </label>

        {resume?.secureUrl ? (
          /* Uploaded state */
          <div className="flex items-center gap-3 px-4 py-3 bg-success/5 border border-success/20 rounded-sm">
            <FileText size={16} className="text-emerald-400 shrink-0" />
            <span className="text-sm text-paper flex-1 truncate">{resume.file.name}</span>
            <button
              type="button"
              onClick={() => setResume(null)}
              className="p-1 text-muted hover:text-paper transition-colors"
              aria-label="Remove resume"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          /* Upload area */
          <label
            className={cn(
              'flex flex-col items-center justify-center gap-2 px-6 py-8',
              'border border-dashed border-slate-border rounded-sm',
              'cursor-pointer hover:border-blue/50 hover:bg-blue/[0.03]',
              'transition-colors duration-fast',
              resume?.error && 'border-error/40 bg-error/5'
            )}
          >
            <Upload size={20} className="text-muted" />
            <div className="text-center">
              <p className="text-sm text-quiet">
                {resume?.uploading ? 'Uploading…' : 'Click to upload resume'}
              </p>
              <p className="text-xs text-muted mt-0.5">PDF only · Max 5 MB</p>
            </div>
            <input
              type="file"
              accept=".pdf"
              className="sr-only"
              onChange={handleResumeChange}
              disabled={resume?.uploading}
            />
          </label>
        )}

        {resume?.error && (
          <p className="text-xs text-red-400" role="alert">⚠ {resume.error}</p>
        )}
      </div>

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
        loading={isSubmitting || resume?.uploading}
        fullWidth
      >
        {isSubmitting ? 'Submitting…' : 'Submit Application'}
      </Button>

      <p className="text-xs text-muted text-center">
        Your information is kept confidential and used only for recruitment purposes.
      </p>
    </form>
  )
}
