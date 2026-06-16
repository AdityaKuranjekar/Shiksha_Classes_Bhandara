import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://shikshaclasses.in'),
  title: {
    default: 'Shiksha Classes Bhandara | JEE, NEET & MHT-CET Coaching',
    template: '%s | Shiksha Classes Bhandara',
  },
  description:
    "Bhandara's most trusted coaching institute for JEE, NEET & MHT-CET. Expert faculty, small batches, proven results. Enquire for 2025 batch.",
  keywords: [
    'JEE coaching Bhandara',
    'NEET coaching Bhandara',
    'MHT-CET coaching Bhandara',
    'coaching classes Bhandara',
    'Shiksha Classes',
  ],
  authors: [{ name: 'Shiksha Classes' }],
  creator: 'Shiksha Classes',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Shiksha Classes Bhandara',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en-IN"
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <body className="bg-ink text-paper font-sans min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
