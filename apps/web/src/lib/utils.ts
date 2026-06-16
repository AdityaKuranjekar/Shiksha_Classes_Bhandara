import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format a date for display */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

/** Truncate text to N words */
export function truncateWords(text: string, maxWords: number): string {
  const words = text.split(' ')
  if (words.length <= maxWords) return text
  return words.slice(0, maxWords).join(' ') + '…'
}

/** Build a Cloudinary transformation URL */
export function cloudinaryUrl(
  secureUrl: string,
  transform: string
): string {
  if (!secureUrl) return ''
  return secureUrl.replace('/upload/', `/upload/${transform}/`)
}

/** Generate a URL slug from a string */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
