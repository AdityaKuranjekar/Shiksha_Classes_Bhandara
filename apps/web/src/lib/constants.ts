export const SITE_URL = 'https://shikshaclasses.in'
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

export const NAV_LINKS = [
  { label: 'Programs', href: '/programs', hasDropdown: true },
  { label: 'Results',  href: '/results' },
  { label: 'Resources', href: '/resources' },
  { label: 'Gallery',  href: '/gallery' },
  { label: 'Blog',     href: '/blog' },
  { label: 'Careers',  href: '/careers' },
  { label: 'Contact',  href: '/contact' },
] as const

export const PROGRAMS = [
  {
    slug:             'jee',
    name:             'JEE Preparation',
    shortDescription: 'Comprehensive JEE Main & Advanced coaching with expert Physics, Chemistry & Mathematics faculty.',
    targets:          'Classes 11, 12 & Droppers',
    subjects:         ['Physics', 'Chemistry', 'Mathematics'],
    badge:            'JEE',
    href:             '/programs/jee',
  },
  {
    slug:             'neet',
    name:             'NEET Preparation',
    shortDescription: 'Result-oriented NEET UG coaching with dedicated Biology, Chemistry & Physics faculty.',
    targets:          'Classes 11, 12 & Droppers',
    subjects:         ['Biology', 'Chemistry', 'Physics'],
    badge:            'NEET',
    href:             '/programs/neet',
  },
  {
    slug:             'mht-cet',
    name:             'MHT-CET Preparation',
    shortDescription: 'Focused MHT-CET coaching aligned with Maharashtra State Board curriculum.',
    targets:          'Classes 11 & 12',
    subjects:         ['Mathematics', 'Physics', 'Chemistry'],
    badge:            'MHT-CET',
    href:             '/programs/mht-cet',
  },
  {
    slug:             'previse-foundation',
    name:             'Previse Foundation',
    shortDescription: 'Early competitive exam preparation to build a strong academic base for JEE & NEET.',
    targets:          'Classes 8, 9 & 10',
    subjects:         ['Science', 'Mathematics'],
    badge:            'Foundation',
    href:             '/programs/previse-foundation',
  },
] as const

export const GRADES = [
  'Class 8', 'Class 9', 'Class 10',
  'Class 11', 'Class 12', 'Dropper', 'Other',
] as const

export const PROGRAM_OPTIONS = [
  { value: 'jee',                 label: 'JEE (Main & Advanced)' },
  { value: 'neet',                label: 'NEET UG' },
  { value: 'mht-cet',             label: 'MHT-CET' },
  { value: 'previse-foundation',  label: 'Previse Foundation' },
  { value: 'not-sure',            label: 'Not Sure Yet' },
] as const

export const LEAD_SOURCES = {
  HOME_HERO:    'home_hero',
  PROGRAM_PAGE: 'program_page',
  CONTACT_PAGE: 'contact_page',
  BLOG_CTA:     'blog_cta',
  RESULTS_CTA:  'results_cta',
  STICKY_CTA:   'sticky_cta',
} as const

export const CONTACT = {
  phone:    '+91-XXXXXXXXXX',
  email:    'enquiries@shikshaclasses.in',
  whatsapp: '+91XXXXXXXXXX',
  address:  'Main Road, Bhandara, Maharashtra 441904',
  mapUrl:   'https://maps.google.com/?q=Bhandara,Maharashtra',
} as const

export const SOCIAL = {
  facebook:  'https://facebook.com/shikshaclassesbhandara',
  instagram: 'https://instagram.com/shikshaclassesbhandara',
  youtube:   'https://youtube.com/@shikshaclassesbhandara',
} as const

export const PROGRAM_BADGE_STYLES: Record<string, string> = {
  jee:                'bg-blue/10 text-blue-light border-blue/25',
  neet:               'bg-success/10 text-emerald-400 border-success/25',
  'mht-cet':          'bg-brass/10 text-brass-light border-brass/25',
  'previse-foundation':'bg-quiet/10 text-quiet border-quiet/20',
}
