import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CTAProps {
  heading:    string
  subheading?: string
  primaryLabel:  string
  primaryHref:   string
  secondaryLabel?: string
  secondaryHref?:  string
  variant?: 'brass' | 'blue' | 'dark'
  align?: 'left' | 'center'
  className?: string
}

const variantMap = {
  brass: {
    wrap:   'bg-brass/[0.06] border border-brass/20',
    primary:'bg-brass text-ink font-semibold hover:bg-brass-light',
    secondary: 'text-brass hover:text-brass-light border-b border-brass/40 hover:border-brass',
  },
  blue: {
    wrap:   'bg-blue/[0.06] border border-blue/20',
    primary:'bg-blue text-white font-semibold hover:bg-blue-light',
    secondary: 'text-blue-light hover:text-paper border-b border-blue/40 hover:border-blue',
  },
  dark: {
    wrap:   'bg-slate border border-slate-border',
    primary:'bg-brass text-ink font-semibold hover:bg-brass-light',
    secondary: 'text-quiet hover:text-paper border-b border-quiet/30 hover:border-quiet',
  },
}

export function CTA({
  heading,
  subheading,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant = 'dark',
  align = 'center',
  className,
}: CTAProps) {
  const styles = variantMap[variant]

  return (
    <div
      className={cn(
        'rounded-lg px-8 py-10 sm:px-12 sm:py-14',
        styles.wrap,
        align === 'center' && 'text-center',
        className
      )}
    >
      <h2 className={cn(
        'font-serif font-light text-paper leading-snug',
        'text-2xl sm:text-3xl mb-3',
      )}>
        {heading}
      </h2>

      {subheading && (
        <p className={cn(
          'text-quiet text-base leading-relaxed mb-8 max-w-prose',
          align === 'center' && 'mx-auto'
        )}>
          {subheading}
        </p>
      )}

      <div className={cn(
        'flex flex-wrap items-center gap-4',
        align === 'center' && 'justify-center'
      )}>
        <Link
          href={primaryHref}
          className={cn(
            'inline-flex items-center gap-2 px-6 py-3 text-sm rounded-sm transition-colors duration-fast shadow-sm',
            styles.primary
          )}
        >
          {primaryLabel}
          <ArrowRight size={16} />
        </Link>

        {secondaryLabel && secondaryHref && (
          <Link
            href={secondaryHref}
            className={cn(
              'inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-fast pb-px',
              styles.secondary
            )}
          >
            {secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  )
}
