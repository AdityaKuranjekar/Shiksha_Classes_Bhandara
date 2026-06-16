'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { ChevronDown, Menu } from 'lucide-react'
import { MobileDrawer } from './MobileDrawer'
import { NAV_LINKS, PROGRAMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled]     = useState(false)
  const [drawerOpen, setDrawerOpen]  = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  /* Scroll detection */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  /* Lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-[200] h-16 transition-all duration-normal',
          scrolled
            ? 'bg-ink/95 backdrop-blur-md border-b border-slate-border/80 shadow-sm'
            : 'bg-ink/80 backdrop-blur-sm border-b border-slate-border/40'
        )}
      >
        <div className="mx-auto max-w-xl h-full flex items-center justify-between px-5 lg:px-8">

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-lg font-light tracking-tight text-paper hover:text-brass transition-colors duration-fast shrink-0"
          >
            Shiksha <span className="text-brass">Classes</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div key={link.href} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-sm transition-colors duration-fast',
                      isActive(link.href)
                        ? 'text-paper'
                        : 'text-quiet hover:text-paper hover:bg-white/[0.04]'
                    )}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        'transition-transform duration-fast',
                        dropdownOpen && 'rotate-180'
                      )}
                    />
                  </button>

                  {/* Programs Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-slate border border-slate-border rounded-md shadow-lg overflow-hidden animate-fade-in">
                      <div className="p-1">
                        {PROGRAMS.map((p) => (
                          <Link
                            key={p.slug}
                            href={p.href}
                            onClick={() => setDropdownOpen(false)}
                            className="flex flex-col px-4 py-3 rounded-sm hover:bg-white/[0.04] transition-colors duration-fast group"
                          >
                            <span className="text-sm font-medium text-paper group-hover:text-brass transition-colors duration-fast">
                              {p.name}
                            </span>
                            <span className="text-xs text-quiet mt-0.5 line-clamp-1">
                              {p.targets}
                            </span>
                          </Link>
                        ))}
                        <div className="h-px bg-slate-border/60 my-1" />
                        <Link
                          href="/programs"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-2.5 text-xs font-semibold text-brass hover:text-brass-light tracking-wider uppercase transition-colors duration-fast"
                        >
                          View All Programs →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium rounded-sm transition-colors duration-fast',
                    isActive(link.href)
                      ? 'text-paper after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-brass after:rounded-full'
                      : 'text-quiet hover:text-paper hover:bg-white/[0.04]'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right: CTA + Mobile Trigger */}
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold tracking-wide bg-brass text-ink rounded-sm hover:bg-brass-light transition-colors duration-fast shadow-sm"
            >
              Enquire Now
            </Link>

            <button
              className="lg:hidden p-2 text-quiet hover:text-paper hover:bg-white/[0.06] rounded-sm transition-colors duration-fast"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer so content doesn't hide under fixed nav */}
      <div className="h-16" aria-hidden />

      {/* Mobile Drawer */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        pathname={pathname}
      />
    </>
  )
}
