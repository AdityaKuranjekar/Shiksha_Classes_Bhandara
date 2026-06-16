import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Free Study Material — Notes, PYQs & Formula Sheets',
  description: 'Download free Physics, Chemistry, Maths & Biology notes, formula sheets, and previous year papers from Shiksha Classes.',
  alternates: { canonical: 'https://shikshaclasses.in/resources' },
}

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-xl px-5 lg:px-8 py-16 lg:py-24">
      <SectionHeader
        eyebrow="Free Study Material"
        heading="Notes, Sheets & Papers — From Our Faculty"
        subheading="Download carefully curated resources for JEE, NEET and MHT-CET preparation, completely free."
      />
      <div className="py-16 text-center text-quiet text-sm border border-dashed border-slate-border rounded-md">
        Resources loading from API…
      </div>
    </div>
  )
}
