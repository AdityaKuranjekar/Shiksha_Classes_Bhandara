import type { Metadata } from 'next'
import { PROGRAMS } from '@/lib/constants'
import { ProgramCard } from '@/components/ui/ProgramCard'
import { SectionHeader } from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Coaching Programs — JEE, NEET, MHT-CET & Foundation',
  description:
    'Explore all coaching programs at Shiksha Classes Bhandara. Choose from JEE, NEET, MHT-CET, or Previse Foundation courses.',
  alternates: { canonical: 'https://shikshaclasses.in/programs' },
}

export default function ProgramsPage() {
  return (
    <div className="mx-auto max-w-xl px-5 lg:px-8 py-16 lg:py-24">
      <SectionHeader
        eyebrow="Our Programmes"
        heading="Choose Your Path to Excellence"
        subheading="Expert-led coaching for every stage — from foundational classes to competitive exam preparation."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {PROGRAMS.map((program) => (
          <ProgramCard key={program.slug} program={program} />
        ))}
      </div>
    </div>
  )
}
