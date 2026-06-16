import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  heading: string
  subheading?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12',
        align === 'center' && 'text-center',
        className
      )}
    >
      {eyebrow && (
        <span className="block text-xs font-semibold tracking-widest uppercase text-brass mb-3">
          {eyebrow}
        </span>
      )}

      <h2 className={cn(
        'font-serif font-light text-paper leading-tight',
        'text-2xl sm:text-3xl'
      )}>
        {heading}
      </h2>

      {/* Brass accent rule */}
      <div
        className={cn(
          'mt-4 h-0.5 w-20',
          'bg-gradient-to-r from-brass to-transparent',
          align === 'center' && 'mx-auto'
        )}
        aria-hidden
      />

      {subheading && (
        <p className={cn(
          'mt-4 text-md font-light text-quiet leading-relaxed max-w-prose',
          align === 'center' && 'mx-auto'
        )}>
          {subheading}
        </p>
      )}
    </div>
  )
}
