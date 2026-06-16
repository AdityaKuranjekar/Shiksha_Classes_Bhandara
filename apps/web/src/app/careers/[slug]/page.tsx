import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CareerForm } from '@/components/forms/CareerForm'
import { Badge } from '@/components/ui/Badge'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Apply — ${params.slug.replace(/-/g, ' ')} | Shiksha Classes`,
    alternates: { canonical: `https://shikshaclasses.in/careers/${params.slug}` },
  }
}

export default function CareerDetailPage({ params }: Props) {
  // In production: fetch job from API by slug; redirect if not found / closed
  const jobId    = 'placeholder-job-id'
  const jobTitle = params.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className="mx-auto max-w-xl px-5 lg:px-8 py-16 lg:py-24">
      {/* Job header */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant="success" dot>Active Opening</Badge>
          <Badge variant="muted" dot={false}>Full-Time</Badge>
          <Badge variant="muted" dot={false}>Bhandara, Maharashtra</Badge>
        </div>
        <h1 className="font-serif text-3xl font-light text-paper mb-3">{jobTitle}</h1>
        <div className="py-10 text-sm text-quiet border border-dashed border-slate-border rounded-md text-center mb-8">
          Job description loading from API…
        </div>
      </div>

      {/* Application form */}
      <div className="bg-slate border border-slate-border rounded-lg p-8">
        <h2 className="font-serif text-xl font-light text-paper mb-6">
          Apply for this Position
        </h2>
        <CareerForm jobId={jobId} jobTitle={jobTitle} />
      </div>
    </div>
  )
}
