import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:    string
  error?:    string
  helper?:   string
  required?: boolean
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?:    string
  error?:    string
  helper?:   string
  required?: boolean
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?:    string
  error?:    string
  helper?:   string
  required?: boolean
  options:   { value: string; label: string }[]
  placeholder?: string
}

/* Base field wrapper */
function FieldWrapper({
  label,
  error,
  helper,
  required,
  id,
  children,
}: {
  label?: string; error?: string; helper?: string
  required?: boolean; id?: string; children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className={cn(
            'text-sm font-medium text-quiet tracking-wide',
            required && "after:content-['_*'] after:text-brass"
          )}
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1.5" role="alert">
          <span aria-hidden>⚠</span> {error}
        </p>
      )}
      {helper && !error && (
        <p className="text-xs text-muted">{helper}</p>
      )}
    </div>
  )
}

const baseInputClasses = cn(
  'w-full bg-black/20 border border-slate-border rounded-sm',
  'text-paper text-base placeholder:text-muted font-sans',
  'px-4 py-3 leading-normal',
  'transition-all duration-fast',
  'hover:border-quiet/40 hover:bg-black/25',
  'focus:outline-none focus:border-blue focus:bg-black/30 focus:shadow-blue/20 focus:shadow-[0_0_0_3px]',
  'disabled:opacity-40 disabled:cursor-not-allowed',
)

const errorInputClasses = cn(
  'border-error bg-error/5',
  'focus:border-error focus:shadow-[0_0_0_3px] focus:shadow-error/20'
)

/* ── Input ───────────────────────────────────────────────────── */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helper, required, id, className, ...props }, ref) => {
    const fieldId = id ?? props.name

    return (
      <FieldWrapper label={label} error={error} helper={helper} required={required} id={fieldId}>
        <input
          ref={ref}
          id={fieldId}
          className={cn(
            baseInputClasses,
            error && errorInputClasses,
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          {...props}
        />
      </FieldWrapper>
    )
  }
)
Input.displayName = 'Input'

/* ── Textarea ────────────────────────────────────────────────── */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helper, required, id, className, rows = 4, ...props }, ref) => {
    const fieldId = id ?? props.name

    return (
      <FieldWrapper label={label} error={error} helper={helper} required={required} id={fieldId}>
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          className={cn(
            baseInputClasses,
            'resize-y min-h-[100px] max-h-[300px]',
            error && errorInputClasses,
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
      </FieldWrapper>
    )
  }
)
Textarea.displayName = 'Textarea'

/* ── Select ──────────────────────────────────────────────────── */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helper, required, id, options, placeholder, className, ...props }, ref) => {
    const fieldId = id ?? props.name

    return (
      <FieldWrapper label={label} error={error} helper={helper} required={required} id={fieldId}>
        <select
          ref={ref}
          id={fieldId}
          className={cn(
            baseInputClasses,
            'cursor-pointer appearance-none pr-10',
            '[background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%238B919A\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E")]',
            'bg-no-repeat [background-position:right_16px_center]',
            error && errorInputClasses,
            className
          )}
          aria-invalid={!!error}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-slate text-paper"
            >
              {opt.label}
            </option>
          ))}
        </select>
      </FieldWrapper>
    )
  }
)
Select.displayName = 'Select'
