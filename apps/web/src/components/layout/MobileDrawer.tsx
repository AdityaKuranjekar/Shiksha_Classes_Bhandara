'use client'

import Link from 'next/link'
import { X, ChevronRight } from 'lucide-react'
import { NAV_LINKS, PROGRAMS, CONTACT, SOCIAL } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Facebook, Instagram, Youtube } from 'lucide-react'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
  pathname: string
}

export function MobileDrawer({ open, onClose, pathname }: MobileDrawerProps) {
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-[300] bg-black/75 backdrop-blur-xs transition-opacity duration-normal',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden
      />

      {/* Drawer panel */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 z-[400] w-80 max-w-[90vw] bg-slate border-l border-slate-border',
          'flex flex-col shadow-2xl transition-transform duration-normal ease-decel',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-slate-border shrink-0">
          <span className="font-serif text-base font-light text-paper">
            Shiksha <span className="text-brass">Classes</span>
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-quiet hover:text-paper hover:bg-white/[0.06] rounded-sm transition-colors duration-fast"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto py-4">
          {/* Direct links */}
          {NAV_LINKS.filter(l => !l.hasDropdown).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                'flex items-center justify-between px-6 py-3.5 text-sm font-medium transition-colors duration-fast',
                isActive(link.href)
                  ? 'text-paper bg-white/[0.04] border-r-2 border-brass'
                  : 'text-quiet hover:text-paper hover:bg-white/[0.04]'
              )}
            >
              {link.label}
              <ChevronRight size={14} className="text-muted" />
            </Link>
          ))}

          {/* Programs group */}
          <div className="mt-2 pt-2 border-t border-slate-border/60">
            <p className="px-6 py-2 text-xs font-semibold tracking-widest uppercase text-muted">
              Programs
            </p>
            {PROGRAMS.map((p) => (
              <Link
                key={p.slug}
                href={p.href}
                onClick={onClose}
                className="flex flex-col px-6 py-3 hover:bg-white/[0.04] transition-colors duration-fast group"
              >
                <span className="text-sm font-medium text-quiet group-hover:text-paper transition-colors">
                  {p.name}
                </span>
                <span className="text-xs text-muted">{p.targets}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-border px-6 py-5 space-y-4">
          {/* CTA */}
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center w-full py-3 text-sm font-semibold tracking-wide bg-brass text-ink rounded-sm hover:bg-brass-light transition-colors duration-fast"
          >
            Enquire Now
          </Link>

          {/* Contact details */}
          <div className="space-y-1.5 text-xs text-quiet">
            <p>📞 <a href={`tel:${CONTACT.phone}`} className="hover:text-paper transition-colors">{CONTACT.phone}</a></p>
            <p>💬 <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-brass transition-colors">Chat on WhatsApp</a></p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="p-2 text-muted hover:text-paper hover:bg-white/[0.06] rounded-sm transition-colors duration-fast">
              <Facebook size={16} />
            </a>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="p-2 text-muted hover:text-paper hover:bg-white/[0.06] rounded-sm transition-colors duration-fast">
              <Instagram size={16} />
            </a>
            <a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
              className="p-2 text-muted hover:text-paper hover:bg-white/[0.06] rounded-sm transition-colors duration-fast">
              <Youtube size={16} />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
