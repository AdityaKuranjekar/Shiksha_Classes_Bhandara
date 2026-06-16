import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}`,
    alternates: { canonical: `https://shikshaclasses.in/blog/${params.slug}` },
  }
}

export default function BlogPostPage({ params }: Props) {
  // In production: fetch post from API by slug

  return (
    <div className="mx-auto max-w-xl px-5 lg:px-8 py-16 lg:py-24">
      <article className="max-w-prose mx-auto">
        <div className="py-16 text-center text-quiet text-sm border border-dashed border-slate-border rounded-md">
          Blog post &ldquo;{params.slug}&rdquo; loading from API…
        </div>
      </article>
    </div>
  )
}
