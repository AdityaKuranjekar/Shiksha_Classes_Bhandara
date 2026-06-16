import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Our Results — JEE, NEET & MHT-CET Toppers',
  description: "See Shiksha Classes Bhandara's year-wise JEE, NEET & MHT-CET topper results.",
  alternates: { canonical: 'https://shikshaclasses.in/results' },
}

export default function ResultsPage() {
  return (
    <div className="mx-auto max-w-xl px-5 lg:px-8 py-16 lg:py-24">
      <SectionHeader
        eyebrow="Proven Results"
        heading="Our Students Speak for Themselves"
        subheading="Year-wise results from JEE, NEET and MHT-CET toppers who trained at Shiksha Classes, Bhandara."
        align="center"
      />
      <div className="py-16 text-center text-quiet text-sm border border-dashed border-slate-border rounded-md">
        Results data loading from API…
      </div>
    </div>
  )
}
