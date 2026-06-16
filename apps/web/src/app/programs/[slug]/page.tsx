import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PROGRAMS } from '@/lib/constants'
import { LeadForm } from '@/components/forms/LeadForm'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Badge } from '@/components/ui/Badge'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const program = PROGRAMS.find((p) => p.slug === params.slug)
  if (!program) return {}
  return {
    title: `${program.name} in Bhandara`,
    description: program.shortDescription,
    alternates: { canonical: `https://shikshaclasses.in/programs/${program.slug}` },
  }
}

export default function ProgramPage({ params }: Props) {
  const program = PROGRAMS.find((p) => p.slug === params.slug)
  if (!program) notFound()

  return (
    <div className="mx-auto max-w-xl px-5 lg:px-8 py-16 lg:py-24">
      <div className="mb-4">
        <Badge variant={program.slug as 'jee' | 'neet' | 'mht-cet' | 'previse-foundation'} dot={false}>
          {program.badge}
        </Badge>
      </div>
      <SectionHeader
        heading={`${program.name} in Bhandara`}
        subheading={program.shortDescription}
      />

      {/* Page content will be implemented when API is live */}
      <div className="py-12 text-center text-quiet text-sm border border-dashed border-slate-border rounded-md mb-12">
        Programme details loading from CMS…
      </div>

      {/* Lead form */}
      <div className="max-w-lg mx-auto">
        <h2 className="font-serif text-xl font-light text-paper mb-6 text-center">
          Enquire About {program.name}
        </h2>
        <LeadForm
          source="program_page"
          programSlug={program.slug}
          compact
        />
      </div>
    </div>
  )
}
