import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowRight } from 'lucide-react'
import { Badge } from './Badge'
import { cn, formatDate, cloudinaryUrl } from '@/lib/utils'

interface BlogCardProps {
  post: {
    _id:                 string
    title:               string
    slug:                string
    excerpt:             string
    category:            string
    coverImageSecureUrl?: string | null
    authorName:          string
    publishedAt:         string
    viewCount:           number
  }
  className?: string
  layout?: 'vertical' | 'horizontal'
}

export function BlogCard({
  post,
  className,
  layout = 'vertical',
}: BlogCardProps) {
  const coverUrl = post.coverImageSecureUrl
    ? cloudinaryUrl(post.coverImageSecureUrl, 't_blog_cover_card')
    : null

  if (layout === 'horizontal') {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          'group flex gap-5 bg-slate border border-slate-border rounded-md overflow-hidden',
          'hover:border-slate-border/80 hover:shadow-md hover:-translate-y-px',
          'transition-all duration-normal ease-out',
          className
        )}
      >
        {/* Thumbnail */}
        {coverUrl && (
          <div className="relative w-36 shrink-0 overflow-hidden">
            <Image
              src={coverUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-slower"
            />
          </div>
        )}
        <div className="flex flex-col justify-center py-4 pr-5">
          <Badge variant="blue" dot={false} className="mb-2 self-start">
            {post.category}
          </Badge>
          <h3 className="text-sm font-semibold text-paper leading-snug group-hover:text-brass transition-colors duration-fast line-clamp-2">
            {post.title}
          </h3>
          <p className="text-xs text-muted mt-1.5">{formatDate(post.publishedAt)}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group flex flex-col bg-slate border border-slate-border rounded-md overflow-hidden',
        'hover:border-slate-border/80 hover:shadow-md hover:-translate-y-0.5',
        'transition-all duration-normal ease-out',
        className
      )}
    >
      {/* Cover image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-raised">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-slower"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-muted">Shiksha Classes</span>
          </div>
        )}

        {/* Category overlay */}
        <div className="absolute top-3 left-3">
          <Badge variant="blue" dot={false}>{post.category}</Badge>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-sans text-base font-semibold text-paper leading-snug group-hover:text-brass transition-colors duration-fast mb-2 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm text-quiet leading-relaxed line-clamp-3 mb-4 flex-1">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-border/60">
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <Clock size={12} />
            {formatDate(post.publishedAt)}
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-quiet group-hover:text-brass transition-colors duration-fast">
            Read
            <ArrowRight
              size={12}
              className="translate-x-0 group-hover:translate-x-1 transition-transform duration-fast"
            />
          </span>
        </div>
      </div>
    </Link>
  )
}
