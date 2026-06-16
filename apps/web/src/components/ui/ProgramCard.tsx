import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Badge } from './Badge'
import { cn, cloudinaryUrl } from '@/lib/utils'
import type { PROGRAMS } from '@/lib/constants'

type ProgramData = (typeof PROGRAMS)[number]

interface ProgramCardProps {
  program: ProgramData
  className?: string
}

export function ProgramCard({ program, className }: ProgramCardProps) {
  return (
    <Link
      href={program.href}
      className={cn(
        'group block bg-slate border border-slate-border rounded-lg p-7',
        'relative overflow-hidden',
        'hover:-translate-y-0.5 hover:border-brass/20 hover:shadow-md',
        'transition-all duration-normal ease-out',
        className
      )}
    >
      {/* Animated brass bottom rule */}
      <span
        className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-brass to-transparent group-hover:w-full transition-all duration-normal ease-out"
        aria-hidden
      />

      {/* Subtle corner glow */}
      <span
        className="absolute top-0 right-0 w-24 h-24 bg-radial opacity-0 group-hover:opacity-100 transition-opacity duration-slow"
        style={{ background: 'radial-gradient(circle at top right, rgba(176,141,87,0.06), transparent 70%)' }}
        aria-hidden
      />

      {/* Badge */}
      <div className="mb-4">
        <Badge variant={program.slug as keyof typeof Badge} dot={false}>
          {program.badge}
        </Badge>
      </div>

      {/* Name */}
      <h3 className="font-serif text-lg font-light text-paper group-hover:text-brass transition-colors duration-fast mb-2">
        {program.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-quiet leading-relaxed mb-5">
        {program.shortDescription}
      </p>

      {/* Subject pills */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {program.subjects.map((s) => (
          <span
            key={s}
            className="px-2 py-0.5 text-xs text-muted bg-slate-raised border border-slate-border rounded-xs"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Target grade */}
      <p className="text-xs text-muted mb-5">{program.targets}</p>

      {/* CTA */}
      <div className="flex items-center gap-1.5 text-sm font-medium text-quiet group-hover:text-brass transition-colors duration-fast">
        Explore Programme
        <ArrowRight
          size={14}
          className="translate-x-0 group-hover:translate-x-1 transition-transform duration-fast"
        />
      </div>
    </Link>
  )
}
