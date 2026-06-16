import { cn } from '@/lib/utils'
import { PROGRAM_BADGE_STYLES } from '@/lib/constants'

type BadgeVariant =
  | 'default'
  | 'blue'
  | 'brass'
  | 'success'
  | 'warning'
  | 'error'
  | 'muted'
  | 'jee'
  | 'neet'
  | 'mht-cet'
  | 'previse-foundation'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  dot?: boolean
  className?: string
}

const variantStyles: Record<string, string> = {
  default:  'bg-slate-raised text-quiet border-slate-border',
  blue:     'bg-blue/10 text-blue-light border-blue/25',
  brass:    'bg-brass/10 text-brass-light border-brass/25',
  success:  'bg-success/10 text-emerald-400 border-success/25',
  warning:  'bg-warning/10 text-yellow-400 border-warning/25',
  error:    'bg-error/10 text-red-400 border-error/25',
  muted:    'bg-slate-raised text-muted border-slate-border/60',
  ...PROGRAM_BADGE_STYLES,
}

export function Badge({
  children,
  variant = 'default',
  dot = true,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5',
        'text-xs font-semibold tracking-wide border rounded-full whitespace-nowrap',
        variantStyles[variant] ?? variantStyles.default,
        className
      )}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-current opacity-80 shrink-0"
          aria-hidden
        />
      )}
      {children}
    </span>
  )
}
