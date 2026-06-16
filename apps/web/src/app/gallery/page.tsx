import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Gallery — Campus & Events',
  description: 'Explore Shiksha Classes Bhandara. See our classrooms, events, and campus life.',
  alternates: { canonical: 'https://shikshaclasses.in/gallery' },
}

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-xl px-5 lg:px-8 py-16 lg:py-24">
      <SectionHeader
        eyebrow="Campus & Events"
        heading="Life at Shiksha Classes"
        subheading="A glimpse into our classrooms, result celebrations, and campus life in Bhandara."
        align="center"
      />
      <div className="py-16 text-center text-quiet text-sm border border-dashed border-slate-border rounded-md">
        Gallery loading from API…
      </div>
    </div>
  )
}
