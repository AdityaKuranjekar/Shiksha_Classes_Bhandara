import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CareerForm } from '@/components/forms/CareerForm'

export const metadata: Metadata = {
  title: 'Faculty Careers in Bhandara',
  description: 'Join Shiksha Classes Bhandara. We are hiring passionate JEE, NEET and MHT-CET faculty.',
  alternates: { canonical: 'https://shikshaclasses.in/careers' },
}

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-xl px-5 lg:px-8 py-16 lg:py-24">
      <SectionHeader
        eyebrow="Join Our Team"
        heading="Faculty Careers in Bhandara"
        subheading="We are looking for passionate educators who want to make a real difference in students' lives."
      />
      <div className="py-16 text-center text-quiet text-sm border border-dashed border-slate-border rounded-md">
        Job openings loading from API…
      </div>
    </div>
  )
}
