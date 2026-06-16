import Link from 'next/link'
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { PROGRAMS, CONTACT, SOCIAL } from '@/lib/constants'

const quickLinks = [
  { label: 'Home',    href: '/' },
  { label: 'Results', href: '/results' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog',    href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

const resourceLinks = [
  { label: 'Physics',     href: '/resources/physics' },
  { label: 'Chemistry',   href: '/resources/chemistry' },
  { label: 'Mathematics', href: '/resources/mathematics' },
  { label: 'Biology',     href: '/resources/biology' },
  { label: 'All Resources', href: '/resources' },
]

export function Footer() {
  return (
    <footer className="bg-slate border-t border-slate-border mt-auto">
      <div className="mx-auto max-w-xl px-5 lg:px-8 pt-14 pb-8">

        {/* 4-column grid */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">

          {/* Col 1 — Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-block font-serif text-xl font-light tracking-tight text-paper hover:text-brass transition-colors duration-fast mb-3"
            >
              Shiksha <span className="text-brass">Classes</span>
            </Link>
            <p className="text-sm text-quiet leading-relaxed mb-5">
              Bhandara&apos;s most trusted coaching institute for JEE, NEET & MHT-CET.
            </p>

            {/* Contact details */}
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="flex items-center gap-2.5 text-quiet hover:text-paper transition-colors duration-fast group"
                >
                  <Phone size={14} className="text-muted group-hover:text-brass transition-colors" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2.5 text-quiet hover:text-paper transition-colors duration-fast group"
                >
                  <Mail size={14} className="text-muted group-hover:text-brass transition-colors" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-quiet hover:text-brass transition-colors duration-fast group"
                >
                  <MessageCircle size={14} className="text-muted group-hover:text-brass transition-colors" />
                  WhatsApp Chat
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-quiet hover:text-paper transition-colors duration-fast group"
                >
                  <MapPin size={14} className="text-muted group-hover:text-brass transition-colors mt-0.5 shrink-0" />
                  <span>{CONTACT.address}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2 — Programs */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-muted mb-4">
              Programmes
            </h3>
            <ul className="space-y-2.5">
              {PROGRAMS.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={p.href}
                    className="text-sm text-quiet hover:text-paper transition-colors duration-fast"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Quick Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-muted mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-quiet hover:text-paper transition-colors duration-fast"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Resources + Social */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-muted mb-4">
              Study Resources
            </h3>
            <ul className="space-y-2.5 mb-8">
              {resourceLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-quiet hover:text-paper transition-colors duration-fast"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-xs font-semibold tracking-widest uppercase text-muted mb-3">
              Follow Us
            </h3>
            <div className="flex items-center gap-2">
              {[
                { href: SOCIAL.facebook,  Icon: Facebook,  label: 'Facebook' },
                { href: SOCIAL.instagram, Icon: Instagram, label: 'Instagram' },
                { href: SOCIAL.youtube,   Icon: Youtube,   label: 'YouTube' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 text-muted hover:text-paper hover:bg-white/[0.06] rounded-sm transition-colors duration-fast"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Shiksha Classes, Bhandara. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted">
            <Link href="/privacy-policy" className="hover:text-quiet transition-colors duration-fast">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="hover:text-quiet transition-colors duration-fast">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
