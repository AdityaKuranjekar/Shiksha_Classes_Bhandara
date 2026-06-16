import { cn } from '@/lib/utils'

interface CardProps {
  children:  React.ReactNode
  variant?:  'default' | 'raised' | 'featured' | 'accent-blue'
  hover?:    boolean
  padding?:  'none' | 'sm' | 'md' | 'lg'
  className?: string
}

const variantStyles = {
  default:      'bg-slate border border-slate-border',
  raised:       'bg-slate-raised border border-slate-border/80',
  featured:     'bg-slate border-t-2 border-t-brass border-x border-b border-slate-border shadow-brass',
  'accent-blue':'bg-slate border border-blue/25 border-t-2 border-t-blue',
}

const paddingStyles = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
}

export function Card({
  children,
  variant = 'default',
  hover = false,
  padding = 'md',
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-md overflow-hidden',
        variantStyles[variant],
        paddingStyles[padding],
        hover && [
          'cursor-pointer',
          'hover:-translate-y-0.5 hover:shadow-md hover:border-white/20',
          'transition-all duration-normal ease-out',
        ],
        className
      )}
    >
      {children}
    </div>
  )
}

/* Sub-components for composing Card layouts */

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 pt-6 pb-0', className)}>{children}</div>
  )
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('p-6', className)}>{children}</div>
  )
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4 border-t border-slate-border bg-black/10', className)}>
      {children}
    </div>
  )
}

export function CardDivider() {
  return <div className="border-t border-slate-border my-4" />
}
