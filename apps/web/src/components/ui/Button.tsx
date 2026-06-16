import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'blue' | 'ghost' | 'danger'
type ButtonSize    = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  ButtonVariant
  size?:     ButtonSize
  loading?:  boolean
  fullWidth?: boolean
  children:  React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brass text-ink font-semibold border border-brass hover:bg-brass-light hover:border-brass-light active:bg-brass-dim shadow-sm hover:shadow-brass',
  secondary:
    'bg-transparent text-brass font-medium border border-brass/25 hover:bg-brass/10 hover:border-brass hover:text-brass-light',
  blue:
    'bg-blue text-white font-semibold border border-blue hover:bg-blue-light hover:border-blue-light shadow-sm',
  ghost:
    'bg-transparent text-quiet font-medium border border-transparent hover:bg-white/[0.05] hover:text-paper',
  danger:
    'bg-transparent text-red-400 font-medium border border-red-800/40 hover:bg-red-900/10 hover:border-red-400',
}

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'px-3 py-1.5 text-xs',
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base tracking-wider',
  xl: 'px-10 py-5 text-md tracking-wider',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'rounded-sm transition-all duration-fast',
          'focus-visible:outline-none focus-visible:shadow-focus',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
          'active:translate-y-px',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          loading && 'cursor-wait',
          className
        )}
        {...props}
      >
        {loading && (
          <Loader2
            size={14}
            className="animate-spin-slow shrink-0"
            aria-hidden
          />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
