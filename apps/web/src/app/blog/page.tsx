import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Blog — Study Tips & Exam Guidance',
  description: 'Expert articles on JEE, NEET & MHT-CET preparation from Shiksha Classes Bhandara.',
  alternates: { canonical: 'https://shikshaclasses.in/blog' },
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-xl px-5 lg:px-8 py-16 lg:py-24">
      <SectionHeader
        eyebrow="Coaching Insights"
        heading="Study Tips & Exam Guidance"
        subheading="Expert articles on JEE, NEET & MHT-CET preparation — strategies, tips, and exam news."
      />
      <div className="py-16 text-center text-quiet text-sm border border-dashed border-slate-border rounded-md">
        Blog posts loading from API…
      </div>
    </div>
  )
}
