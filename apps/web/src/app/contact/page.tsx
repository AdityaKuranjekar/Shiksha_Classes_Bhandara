import type { Metadata } from 'next'
import { ContactForm } from '@/components/forms/ContactForm'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { MapPin } from 'lucide-react'
import { CONTACT } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact & Admission Enquiry',
  description:
    'Visit Shiksha Classes at Bhandara, Maharashtra. Call us, WhatsApp, or fill the enquiry form. We respond within 24 hours.',
  alternates: { canonical: 'https://shikshaclasses.in/contact' },
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-5 lg:px-8 py-16 lg:py-24">
      <SectionHeader
        eyebrow="Get in Touch"
        heading="Contact & Admission Enquiry"
        subheading="Have a question? Fill the form or reach us directly. Our admissions team responds within 24 hours."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form — takes more space */}
        <div className="lg:col-span-3">
          <ContactForm />
        </div>

        {/* Sidebar — address + map */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate border border-slate-border rounded-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-brass/10 rounded-sm shrink-0">
                <MapPin size={16} className="text-brass" />
              </div>
              <div>
                <p className="text-sm font-medium text-paper mb-1">Our Address</p>
                <p className="text-sm text-quiet leading-relaxed">{CONTACT.address}</p>
              </div>
            </div>
            <a
              href={CONTACT.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-blue-light hover:text-brass transition-colors duration-fast"
            >
              View on Google Maps →
            </a>
          </div>

          {/* Map embed placeholder */}
          <div className="aspect-[4/3] bg-slate border border-slate-border rounded-md overflow-hidden">
            <iframe
              src={`https://maps.google.com/maps?q=Bhandara,Maharashtra&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shiksha Classes location on Google Maps"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
