# SEO Architecture — Shiksha Classes
### Local SEO · Organic Search · Structured Data · Content Strategy

---

## 0. Priority Keyword Targets

### Primary Keywords (Money Keywords — Direct Conversion Intent)
| Keyword | Target Page | Monthly Search Est. | Competition |
|---|---|---|---|
| JEE coaching in Bhandara | `/programs/jee/` | Medium | Low (local) |
| NEET coaching in Bhandara | `/programs/neet/` | Medium | Low (local) |
| MHT-CET coaching in Bhandara | `/programs/mht-cet/` | Medium | Low (local) |
| Best coaching in Bhandara | `/` | Medium | Low (local) |
| Coaching classes in Bhandara | `/` | Medium | Low (local) |

### Secondary Keywords (Research Intent)
| Keyword | Target Page |
|---|---|
| JEE coaching near Bhandara | `/programs/jee/` |
| NEET classes Bhandara Maharashtra | `/programs/neet/` |
| Foundation classes Bhandara | `/programs/previse-foundation/` |
| JEE results Bhandara | `/results/` |
| Best JEE coaching Vidarbha | `/programs/jee/` |
| Physics coaching Bhandara | `/programs/jee/` |

### Long-Tail Keywords (Content / Blog)
| Keyword | Target Page |
|---|---|
| How to prepare for JEE from Bhandara | `/blog/how-to-prepare-jee-from-bhandara/` |
| NEET 2025 syllabus Maharashtra | `/resources/biology/neet-syllabus-2025/` |
| MHT-CET vs JEE which to choose | `/blog/mht-cet-vs-jee-which-to-choose/` |
| JEE Main 2025 Physics important topics | `/resources/physics/jee-main-important-topics/` |
| NEET coaching fees Bhandara | `/programs/neet/` (FAQ section) |

---

## 1. URL Strategy

### 1.1 Core Principles
- **Lowercase only** — no mixed case, no uppercase.
- **Hyphens as separators** — never underscores, never spaces.
- **Keyword-first slugs** — primary keyword as close to the domain root as possible.
- **No trailing slashes** on internal links (consistency); server canonicalises both.
- **No dates in URLs** — except blog posts where recency is a signal; even then, omit for evergreen content.
- **Maximum depth: 3 levels** — beyond 3 levels, Google crawl budget dilutes.

### 1.2 URL Map

```
shikshaclasses.in/                                        ← Home
shikshaclasses.in/programs/                               ← Programs Hub
shikshaclasses.in/programs/jee/                           ← JEE Landing
shikshaclasses.in/programs/neet/                          ← NEET Landing
shikshaclasses.in/programs/mht-cet/                       ← MHT-CET Landing
shikshaclasses.in/programs/previse-foundation/            ← Foundation Landing
shikshaclasses.in/results/                                ← Results
shikshaclasses.in/resources/                              ← Resources Hub
shikshaclasses.in/resources/physics/                      ← Physics Category
shikshaclasses.in/resources/chemistry/                    ← Chemistry Category
shikshaclasses.in/resources/mathematics/                  ← Mathematics Category
shikshaclasses.in/resources/biology/                      ← Biology Category
shikshaclasses.in/resources/physics/[slug]/               ← Resource Article
shikshaclasses.in/blog/                                   ← Blog Hub
shikshaclasses.in/blog/[slug]/                            ← Blog Post
shikshaclasses.in/gallery/                                ← Gallery
shikshaclasses.in/careers/                                ← Careers Hub
shikshaclasses.in/careers/[slug]/                         ← Job Detail
shikshaclasses.in/contact/                                ← Contact & Location
```

### 1.3 Slug Rules for Dynamic Content

**Blog posts:**
```
Format: /blog/{primary-keyword-phrase}/
Good:   /blog/jee-coaching-tips-bhandara/
Good:   /blog/neet-biology-preparation-strategy/
Bad:    /blog/post-1/                         ← no keyword
Bad:    /blog/2025/06/jee-tips/              ← date in URL (evergreen content)
```

**Resources:**
```
Format: /resources/{subject}/{keyword-rich-title}/
Good:   /resources/physics/newton-laws-formula-sheet-jee/
Good:   /resources/biology/neet-botany-chapter-wise-notes/
Bad:    /resources/doc-1234/
```

**Careers:**
```
Format: /careers/{position-title}-{location}/
Good:   /careers/senior-physics-faculty-bhandara/
Good:   /careers/neet-biology-teacher-bhandara/
```

### 1.4 Redirect Strategy
| Scenario | Action |
|---|---|
| Slug change on a published page | 301 Permanent redirect from old slug |
| Deleted blog post | 410 Gone (not 404 — signals intentional removal) |
| Old `/index.html` or `/home` | 301 → `/` |
| HTTP → HTTPS | 301 (handled by Vercel automatically) |
| `www.shikshaclasses.in` → `shikshaclasses.in` | 301 (set canonical domain in Vercel) |

Implement in `next.config.ts`:
```typescript
// next.config.ts
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      // Add slug-change redirects here as needed
    ];
  },
};
```

---

## 2. Metadata Strategy

### 2.1 Title Tag Formula

```
{Page-Specific Keyword} | Shiksha Classes Bhandara
```

- Max **60 characters** (renders without truncation in Google SERP).
- Keyword appears **before** the brand name.
- "Bhandara" in every title — local signal.
- Avoid stuffing: each page title targets **one primary keyword**.

### 2.2 Meta Description Formula

```
{Compelling benefit statement with primary keyword} + {Local signal: Bhandara / Vidarbha} + {CTA}
```

- Max **155 characters** (Google truncates at ~160 — stay at 155 for safety).
- Include the primary keyword naturally.
- Must be unique per page — duplicate descriptions are a negative signal.
- Written for **click-through rate** — Google may ignore it for ranking but it controls clicks.

### 2.3 Per-Page Metadata Matrix

#### Home Page (`/`)
```
Title:       Shiksha Classes Bhandara | JEE, NEET & MHT-CET Coaching
             (60 chars)

Description: Bhandara's most trusted coaching institute for JEE, NEET & MHT-CET.
             Expert faculty, small batches, proven results. Enquire for 2025 batch.
             (155 chars)

H1:          Bhandara's Premier Coaching for JEE, NEET & MHT-CET

Keywords in copy (natural use):
  - "JEE coaching Bhandara" in hero
  - "NEET coaching Bhandara" in programs section
  - "coaching institute Bhandara" in about/stats section
```

#### JEE Page (`/programs/jee/`)
```
Title:       JEE Coaching in Bhandara | Shiksha Classes
             (46 chars)

Description: Join Bhandara's best JEE coaching centre. Expert Physics, Chemistry &
             Maths faculty. Small batches, personalised mentoring. Apply for 2025.
             (155 chars)

H1:          JEE Coaching in Bhandara — Shiksha Classes
H2 (sections): JEE Programme Overview | Curriculum | Our JEE Faculty |
               JEE Toppers | Admission & Fees | FAQs
```

#### NEET Page (`/programs/neet/`)
```
Title:       NEET Coaching in Bhandara | Shiksha Classes
             (47 chars)

Description: Top NEET coaching in Bhandara. Expert Biology, Chemistry & Physics
             faculty with a proven track record. Small batches. Enquire now.
             (150 chars)

H1:          NEET Coaching in Bhandara — Shiksha Classes
```

#### MHT-CET Page (`/programs/mht-cet/`)
```
Title:       MHT-CET Coaching in Bhandara | Shiksha Classes
             (50 chars)

Description: Score high in MHT-CET with Bhandara's focused coaching. Tailored
             curriculum, regular tests, experienced faculty. Join 2025 batch.
             (148 chars)

H1:          MHT-CET Coaching in Bhandara — Shiksha Classes
```

#### Foundation Page (`/programs/previse-foundation/`)
```
Title:       Foundation Classes in Bhandara (Class 8-10) | Shiksha Classes
             (63 chars — slightly over, trim if needed)

Description: Build a strong JEE & NEET foundation from Class 8 at Shiksha Classes
             Bhandara. Early preparation, expert guidance. Enquire today.
             (149 chars)

H1:          Previse Foundation — Classes 8, 9 & 10 | Bhandara
```

#### Results Page (`/results/`)
```
Title:       Our Results | JEE, NEET & MHT-CET Toppers | Shiksha Classes Bhandara
             (77 chars — trim: "Results | Shiksha Classes Bhandara Toppers")

Description: See why Bhandara trusts Shiksha Classes. Browse year-wise JEE,
             NEET & MHT-CET topper results with ranks, scores & testimonials.
             (148 chars)

H1:          Our Students' Results — JEE, NEET & MHT-CET
```

#### Resources Hub (`/resources/`)
```
Title:       Free Study Material — Notes, PYQs & Formula Sheets | Shiksha Classes
             (75 chars — trim: "Free JEE NEET Study Material | Shiksha Classes")

Description: Download free Physics, Chemistry, Maths & Biology notes, formula
             sheets, and previous year papers curated by Shiksha Classes faculty.
             (153 chars)

H1:          Free Study Resources — Notes, PYQs & Formula Sheets
```

#### Blog Hub (`/blog/`)
```
Title:       Study Tips & Exam Guidance | Shiksha Classes Blog Bhandara
             (63 chars)

Description: Expert articles on JEE, NEET & MHT-CET preparation — study strategies,
             time tables, subject tips, and exam news from Shiksha Classes Bhandara.
             (155 chars)

H1:          Coaching Insights — Study Tips & Exam Guidance
```

#### Contact Page (`/contact/`)
```
Title:       Contact Shiksha Classes Bhandara | Admission Enquiry
             (57 chars)

Description: Visit Shiksha Classes at [Address], Bhandara. Call us, WhatsApp, or
             fill the enquiry form. We respond within 24 hours. Get directions.
             (152 chars)

H1:          Contact & Admission Enquiry — Shiksha Classes Bhandara
```

#### Gallery (`/gallery/`)
```
Title:       Gallery | Shiksha Classes Campus & Events | Bhandara
             (57 chars)

Description: Explore Shiksha Classes Bhandara. See our classrooms, results
             celebrations, events, and campus life through our photo gallery.
             (145 chars)
```

#### Careers (`/careers/`)
```
Title:       Faculty Careers in Bhandara | Shiksha Classes
             (50 chars)

Description: Join Shiksha Classes Bhandara. We are hiring passionate JEE, NEET
             and MHT-CET faculty. View current openings and apply online.
             (147 chars)
```

### 2.4 Open Graph Tags (All Pages)

```html
<!-- Implemented in Next.js generateMetadata() -->
<meta property="og:type"        content="website" />
<meta property="og:site_name"   content="Shiksha Classes Bhandara" />
<meta property="og:title"       content="{page title}" />
<meta property="og:description" content="{page description}" />
<meta property="og:url"         content="https://shikshaclasses.in{pathname}" />
<meta property="og:image"       content="{Cloudinary OG image URL — 1200×630}" />
<meta property="og:locale"      content="en_IN" />

<!-- Twitter / X Cards -->
<meta name="twitter:card"       content="summary_large_image" />
<meta name="twitter:title"      content="{page title}" />
<meta name="twitter:description" content="{page description}" />
<meta name="twitter:image"      content="{Cloudinary OG image URL}" />
```

### 2.5 Next.js `generateMetadata()` Implementation

```typescript
// src/app/programs/[slug]/page.tsx

import type { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const program = await fetchProgram(params.slug);
  const canonicalUrl = `https://shikshaclasses.in/programs/${params.slug}`;

  return {
    title: program.seo?.metaTitle ?? `${program.name} Coaching in Bhandara | Shiksha Classes`,
    description: program.seo?.metaDescription ?? program.shortDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: program.seo?.metaTitle ?? program.name,
      description: program.seo?.metaDescription ?? program.shortDescription,
      url: canonicalUrl,
      siteName: 'Shiksha Classes Bhandara',
      images: [
        {
          url: program.seo?.ogImageSecureUrl ?? 'https://shikshaclasses.in/og-default.jpg',
          width: 1200,
          height: 630,
          alt: `${program.name} at Shiksha Classes Bhandara`,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: program.seo?.metaTitle ?? program.name,
      description: program.seo?.metaDescription,
      images: [program.seo?.ogImageSecureUrl ?? 'https://shikshaclasses.in/og-default.jpg'],
    },
  };
}
```

---

## 3. Structured Data (Schema.org / JSON-LD)

All structured data is injected as `<script type="application/ld+json">` in the page `<head>`. In Next.js App Router, this is placed in each page's layout/component.

### 3.1 Home Page — `EducationalOrganization` + `LocalBusiness`

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "@id": "https://shikshaclasses.in/#organization",
      "name": "Shiksha Classes",
      "alternateName": "Shiksha Classes Bhandara",
      "description": "Premier coaching institute for JEE, NEET, MHT-CET and Foundation courses in Bhandara, Maharashtra.",
      "url": "https://shikshaclasses.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://shikshaclasses.in/logo.png",
        "width": 300,
        "height": 100
      },
      "image": "https://res.cloudinary.com/shiksha-classes/image/upload/shiksha/homepage/og/main-og.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "[Street Address, Bhandara]",
        "addressLocality": "Bhandara",
        "addressRegion": "Maharashtra",
        "postalCode": "441904",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "21.1677",
        "longitude": "79.6478"
      },
      "telephone": "+91-XXXXXXXXXX",
      "email": "enquiries@shikshaclasses.in",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
          "opens": "07:00",
          "closes": "20:00"
        }
      ],
      "priceRange": "₹₹",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash",
      "areaServed": {
        "@type": "City",
        "name": "Bhandara"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Coaching Programs",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "JEE Preparation" } },
          { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "NEET Preparation" } },
          { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "MHT-CET Preparation" } },
          { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Previse Foundation" } }
        ]
      },
      "sameAs": [
        "https://www.facebook.com/shikshaclassesbhandara",
        "https://www.instagram.com/shikshaclassesbhandara",
        "https://www.youtube.com/@shikshaclassesbhandara"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://shikshaclasses.in/#website",
      "url": "https://shikshaclasses.in",
      "name": "Shiksha Classes Bhandara",
      "publisher": { "@id": "https://shikshaclasses.in/#organization" }
    }
  ]
}
```

### 3.2 Program Pages — `Course`

```json
// /programs/jee/
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "@id": "https://shikshaclasses.in/programs/jee/#course",
      "name": "JEE Main & Advanced Coaching",
      "description": "Comprehensive JEE Main and JEE Advanced preparation at Shiksha Classes Bhandara. Expert Physics, Chemistry, and Mathematics faculty with small batches and personalised attention.",
      "url": "https://shikshaclasses.in/programs/jee/",
      "provider": {
        "@type": "EducationalOrganization",
        "@id": "https://shikshaclasses.in/#organization",
        "name": "Shiksha Classes",
        "sameAs": "https://shikshaclasses.in"
      },
      "educationalLevel": "Higher Secondary",
      "teaches": ["Physics", "Chemistry", "Mathematics"],
      "inLanguage": "hi-IN",
      "courseMode": "onsite",
      "availableLanguage": ["Hindi", "English", "Marathi"],
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "onsite",
        "location": {
          "@type": "Place",
          "name": "Shiksha Classes",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bhandara",
            "addressRegion": "Maharashtra",
            "addressCountry": "IN"
          }
        }
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://shikshaclasses.in/" },
        { "@type": "ListItem", "position": 2, "name": "Programs", "item": "https://shikshaclasses.in/programs/" },
        { "@type": "ListItem", "position": 3, "name": "JEE Preparation", "item": "https://shikshaclasses.in/programs/jee/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the fee for JEE coaching at Shiksha Classes Bhandara?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Please contact us directly for the latest fee structure. We offer competitive fees with a focus on quality education. Call +91-XXXXXXXXXX or fill the enquiry form."
          }
        },
        {
          "@type": "Question",
          "name": "How many students are in each JEE batch at Shiksha Classes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We maintain small batches to ensure personalised attention for every student. Please enquire for current batch size and availability."
          }
        },
        {
          "@type": "Question",
          "name": "Does Shiksha Classes offer both JEE Main and JEE Advanced preparation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our JEE programme covers comprehensive preparation for both JEE Main and JEE Advanced, including subject-wise deep dives and full-length test practice."
          }
        }
      ]
    }
  ]
}
```

> Same `Course` schema pattern applies for `/programs/neet/`, `/programs/mht-cet/`, and `/programs/previse-foundation/` with adjusted `name`, `description`, and `teaches` fields.

### 3.3 Results Page — `ItemList`

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      "name": "JEE, NEET & MHT-CET Toppers — Shiksha Classes Bhandara",
      "description": "Students who achieved top ranks in JEE, NEET and MHT-CET after coaching at Shiksha Classes, Bhandara.",
      "url": "https://shikshaclasses.in/results/",
      "numberOfItems": 50,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Person",
            "name": "Priya Deshmukh",
            "description": "99.85 Percentile in JEE Main 2025 — AIR 280",
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "Shiksha Classes",
              "sameAs": "https://shikshaclasses.in"
            }
          }
        }
        // ... dynamically generated from results collection
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://shikshaclasses.in/" },
        { "@type": "ListItem", "position": 2, "name": "Results", "item": "https://shikshaclasses.in/results/" }
      ]
    }
  ]
}
```

### 3.4 Blog Post Pages — `BlogPosting` + `Article`

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": "https://shikshaclasses.in/blog/{slug}/#article",
      "headline": "{blog title}",
      "description": "{excerpt}",
      "image": "{coverImageSecureUrl — 1200×630}",
      "url": "https://shikshaclasses.in/blog/{slug}/",
      "datePublished": "{publishedAt — ISO 8601}",
      "dateModified": "{updatedAt — ISO 8601}",
      "author": {
        "@type": "Organization",
        "name": "Shiksha Classes Editorial Team",
        "url": "https://shikshaclasses.in"
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://shikshaclasses.in/#organization",
        "name": "Shiksha Classes",
        "logo": {
          "@type": "ImageObject",
          "url": "https://shikshaclasses.in/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://shikshaclasses.in/blog/{slug}/"
      },
      "keywords": "{comma-separated tags}",
      "articleSection": "{category}",
      "inLanguage": "en-IN",
      "about": {
        "@type": "EducationalOrganization",
        "@id": "https://shikshaclasses.in/#organization"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://shikshaclasses.in/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://shikshaclasses.in/blog/" },
        { "@type": "ListItem", "position": 3, "name": "{title}", "item": "https://shikshaclasses.in/blog/{slug}/" }
      ]
    }
  ]
}
```

### 3.5 Resource Pages — `LearningResource`

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LearningResource",
      "@id": "https://shikshaclasses.in/resources/{category}/{slug}/#resource",
      "name": "{title}",
      "description": "{description}",
      "url": "https://shikshaclasses.in/resources/{category}/{slug}/",
      "datePublished": "{publishedAt}",
      "dateModified": "{updatedAt}",
      "educationalLevel": "Higher Secondary",
      "learningResourceType": "{category}",
      "teaches": "{subject}",
      "inLanguage": "en-IN",
      "isAccessibleForFree": true,
      "provider": {
        "@type": "EducationalOrganization",
        "@id": "https://shikshaclasses.in/#organization"
      },
      "hasPart": {
        "@type": "MediaObject",
        "contentUrl": "{fileSecureUrl}",
        "encodingFormat": "application/pdf"
      }
    }
  ]
}
```

### 3.6 Careers / Job Posting Pages — `JobPosting`

```json
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "{jobTitle}",
  "description": "{jobDescription — HTML-stripped markdown}",
  "datePosted": "{createdAt — ISO 8601}",
  "validThrough": "{applicationDeadline or +90 days}",
  "employmentType": "{employmentType}",
  "hiringOrganization": {
    "@type": "Organization",
    "@id": "https://shikshaclasses.in/#organization",
    "name": "Shiksha Classes",
    "sameAs": "https://shikshaclasses.in",
    "logo": "https://shikshaclasses.in/logo.png"
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "[Street Address]",
      "addressLocality": "Bhandara",
      "addressRegion": "Maharashtra",
      "postalCode": "441904",
      "addressCountry": "IN"
    }
  },
  "baseSalary": {
    "@type": "MonetaryAmount",
    "currency": "INR",
    "value": {
      "@type": "QuantitativeValue",
      "unitText": "MONTH"
    }
  },
  "url": "https://shikshaclasses.in/careers/{slug}/",
  "directApply": true
}
```

### 3.7 Contact Page — `ContactPage` + `LocalBusiness`

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "name": "Contact Shiksha Classes Bhandara",
      "url": "https://shikshaclasses.in/contact/",
      "description": "Get in touch with Shiksha Classes Bhandara for admission enquiries, directions, and general information.",
      "about": { "@id": "https://shikshaclasses.in/#organization" }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://shikshaclasses.in/#organization",
      "name": "Shiksha Classes",
      "hasMap": "{Google Maps URL}",
      "telephone": "+91-XXXXXXXXXX",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-XXXXXXXXXX",
        "contactType": "admissions",
        "availableLanguage": ["Hindi", "English", "Marathi"],
        "areaServed": "IN"
      }
    }
  ]
}
```

### 3.8 JSON-LD Utility (Next.js)

```typescript
// src/lib/jsonld.ts

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Usage in any page:
// import { JsonLd } from '@/lib/jsonld';
// <JsonLd data={organizationSchema} />
```

---

## 4. Local SEO Strategy

Local SEO is the highest-priority channel — Shiksha Classes competes in a geographically bounded market.

### 4.1 Google Business Profile (GBP) — Critical Foundation

> GBP is the #1 local SEO signal. Must be set up before any other local SEO work.

| Action | Detail |
|---|---|
| Create / claim GBP | Business Name: **Shiksha Classes**, Category: **Test Preparation Center** |
| Secondary categories | **Tutoring Center**, **Educational Institution** |
| NAP consistency | Name, Address, Phone must exactly match what is on the website |
| Description | Keyword-rich 750-character description (JEE, NEET, MHT-CET, Bhandara, coaching) |
| Photos | Upload: exterior, classrooms, toppers celebrations, faculty — minimum 20 photos |
| Q&A | Pre-seed 10 common questions with keyword-rich answers |
| Posts | Weekly GBP posts (result announcements, new resources, batch start dates) |
| Reviews | Actively request reviews from enrolled students/parents — respond to every review |
| Service areas | Bhandara, Gondia, Nagpur (if students travel), Chandrapur |

### 4.2 NAP (Name, Address, Phone) Consistency

The NAP must be **identical** across all platforms:
- Website (footer, contact page)
- Google Business Profile
- Justdial listing
- IndiaMart / Sulekha listings
- Facebook Business Page
- Indian education directories (Shiksha.com, CollegeDekho, etc.)

**Canonical NAP format (decide once, use everywhere):**
```
Name:    Shiksha Classes
Address: [Full Street Address], Bhandara, Maharashtra 441904
Phone:   +91-XXXXXXXXXX
```

### 4.3 Local Keywords in On-Page Content

Every program page must contain these phrases naturally in body copy:

```
JEE coaching in Bhandara
JEE classes in Bhandara
Best JEE coaching Bhandara
JEE preparation Bhandara Maharashtra
JEE coaching centre near Bhandara
```

Similarly for NEET and MHT-CET. The pattern: always `{program} coaching in Bhandara`.

### 4.4 Local Landing Page Signals Checklist

Each program page must contain:
- [ ] City name "Bhandara" in the `<h1>` tag
- [ ] City name in the first 100 words of body copy
- [ ] Physical address in the admission/contact section of the page
- [ ] Phone number as a click-to-call `tel:` link
- [ ] Google Maps embed on the Contact page (not on program pages — keeps focus)
- [ ] "Coaching in Bhandara" or variant in at least 2 `<h2>` or `<h3>` headings

### 4.5 Local Citations (Directory Listings)

Submit to these directories with consistent NAP:

| Directory | Priority |
|---|---|
| Google Business Profile | 🔴 Critical |
| Justdial | 🔴 Critical |
| Sulekha | 🟡 High |
| IndiaMART | 🟡 High |
| Shiksha.com | 🟡 High |
| CollegeDekho | 🟡 High |
| AskLaila | 🟢 Medium |
| Facebook Business | 🟡 High |
| YouTube Channel | 🟡 High |

---

## 5. Blog Content Strategy

The blog serves dual purposes: **organic SEO traffic** (long-tail keywords) and **trust-building** with parents and students.

### 5.1 Content Pillars

```
Pillar 1: JEE Preparation (targets JEE-related long-tail keywords)
Pillar 2: NEET Preparation (targets NEET-related keywords)
Pillar 3: MHT-CET Guidance (Maharashtra-specific exam content)
Pillar 4: Study Skills & Habits (cross-audience, high engagement)
Pillar 5: Local / Institute News (local signals, parent trust)
```

### 5.2 Foundational Blog Posts (Publish First — High SEO Value)

These are "pillar posts" — long-form (1500–3000 words), keyword-rich, linkworthy:

| Post Title | Target Keyword | Pillar |
|---|---|---|
| How to Crack JEE from Bhandara: A Complete Guide | jee coaching bhandara guide | JEE |
| NEET Preparation Strategy for Class 11 Students | neet preparation strategy class 11 | NEET |
| MHT-CET vs JEE: Which Should Maharashtra Students Choose? | mht-cet vs jee maharashtra | MHT-CET |
| Complete JEE Syllabus 2025: Subject-wise Breakdown | jee syllabus 2025 | JEE |
| Top 10 NEET Mistakes Students Make | neet mistakes students | NEET |
| How to Make a Study Timetable for JEE | study timetable jee preparation | Study Skills |
| NEET Biology: How to Score 360/360 | neet biology perfect score | NEET |
| MHT-CET 2025: Paper Pattern, Marking Scheme & Strategy | mht-cet 2025 paper pattern | MHT-CET |
| Physics Formula Sheet for JEE: All You Need | physics formula sheet jee | JEE |
| Bhandara Students Who Cracked IIT: Their Story | jee coaching success bhandara | Local |

### 5.3 Supporting Blog Posts (Publish Monthly)

Shorter (600–1000 words), specific, answer single questions:

| Post Title | Target Keyword |
|---|---|
| JEE Main vs JEE Advanced: Key Differences | jee main vs advanced difference |
| How to Revise Chemistry for NEET in 30 Days | neet chemistry revision 30 days |
| Best Books for JEE Physics 2025 | best books jee physics 2025 |
| MHT-CET Maths: Important Chapters to Focus On | mht-cet maths important chapters |
| NEET 2025 Exam Date and Registration | neet 2025 exam date |
| How to Improve Speed in JEE Paper | improve speed jee exam |
| Organic Chemistry for NEET: Complete Notes | organic chemistry neet notes |

### 5.4 Blog SEO Rules

Every blog post must have:
- [ ] Target keyword in `<title>`, `<h1>`, first paragraph, and at least 2 `<h2>` headings.
- [ ] Minimum 1 internal link to a program page relevant to the topic.
- [ ] Minimum 1 internal link to a resource or related blog post.
- [ ] End-of-article CTA linking to the relevant program enquiry.
- [ ] `BlogPosting` JSON-LD structured data (see §3.4).
- [ ] Author is "Shiksha Classes Editorial Team" (consistent entity).
- [ ] Cover image with Cloudinary `t_blog_cover_hero` transform for OG.
- [ ] Meta description written for click-through, not just keyword inclusion.

---

## 6. Internal Linking Strategy

### 6.1 Link Authority Flow

```
Home (highest authority)
  │
  ├── /programs/jee/
  │     └── /results/ (filter=jee)
  │     └── /resources/physics/
  │     └── /resources/mathematics/
  │     └── /contact/
  │
  ├── /programs/neet/
  │     └── /results/ (filter=neet)
  │     └── /resources/biology/
  │     └── /resources/chemistry/
  │
  ├── /results/
  │     └── /programs/jee/, /programs/neet/, /programs/mht-cet/
  │
  ├── /resources/
  │     └── All resource slugs
  │     └── Program pages (contextual)
  │
  └── /blog/
        └── Program pages (contextual)
        └── Resource articles (contextual)
        └── /results/ (when discussing outcomes)
```

### 6.2 Rule Table

| From Page | Must Link To | Reason |
|---|---|---|
| Every blog post | 1 relevant program page | Drive conversion from content |
| Every blog post | 1–2 resource pages | Reduce bounce, add value |
| Every resource page | 1 relevant program page | Contextual upsell |
| Every program page | `/results/?filter={program}` | Social proof |
| Every program page | 2–3 relevant resource pages | Depth signal |
| `/results/` | All 4 program pages | Conversion from proof page |
| `/contact/` | Nowhere (exit page) | Keep conversion focus |
| Home | All top-level pages | Authority distribution |

### 6.3 Anchor Text Rules

| Pattern | Status | Example |
|---|---|---|
| Exact match | Use sparingly (1–2 per page max) | "JEE coaching in Bhandara" |
| Partial match | Preferred | "our JEE preparation programme" |
| Branded | Always safe | "Shiksha Classes JEE batch" |
| Generic | Avoid | "click here", "learn more" |
| Descriptive | Preferred | "Physics formula sheets for JEE" |

### 6.4 Related Posts Widget (Blog)

Every blog post shows 3 related posts based on shared `tags`. This creates a mesh of internal links across the blog, improving crawl depth and time-on-site.

```typescript
// In blog post page — fetch related posts by matching tags
const related = await BlogService.getRelated(blog.tags, blog._id, 3);
```

---

## 7. Sitemap Generation

### 7.1 Dynamic Sitemap in Next.js App Router

```typescript
// src/app/sitemap.ts

import { MetadataRoute } from 'next';
import { dbConnect } from '@/lib/db';
import Blog from '@/db/models/Blog.model';
import Resource from '@/db/models/Resource.model';
import CareerOpening from '@/db/models/CareerOpening.model';

const BASE_URL = 'https://shikshaclasses.in';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await dbConnect();

  // Static routes — always present
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/programs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/programs/jee`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/programs/neet`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/programs/mht-cet`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/programs/previse-foundation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/results`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/resources/physics`,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/resources/chemistry`,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/resources/mathematics`,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/resources/biology`,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ];

  // Dynamic blog posts
  const blogs = await Blog.find(
    { status: 'published' },
    { slug: 1, updatedAt: 1 }
  ).lean();

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified: blog.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Dynamic resource articles
  const resources = await Resource.find(
    { status: 'published' },
    { slug: 1, subject: 1, updatedAt: 1 }
  ).lean();

  const resourceRoutes: MetadataRoute.Sitemap = resources.map((res) => ({
    url: `${BASE_URL}/resources/${res.subject.toLowerCase()}/${res.slug}`,
    lastModified: res.updatedAt,
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  // Dynamic active job postings
  const jobs = await CareerOpening.find(
    { status: 'active' },
    { slug: 1, updatedAt: 1 }
  ).lean();

  const careerRoutes: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${BASE_URL}/careers/${job.slug}`,
    lastModified: job.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes, ...resourceRoutes, ...careerRoutes];
}
```

### 7.2 Sitemap Priority Guide

| Page Type | Priority | Change Frequency |
|---|---|---|
| Home | 1.0 | weekly |
| Program pages | 0.9 | monthly |
| Results, Contact | 0.8 | monthly |
| Blog hub, Resources hub | 0.7 | weekly |
| Resource category pages | 0.6 | weekly |
| Blog posts | 0.6 | monthly |
| Gallery, Careers | 0.5–0.6 | monthly |
| Individual resources | 0.5 | yearly |
| Job postings | 0.5 | monthly |

### 7.3 Sitemap Index (if > 50,000 URLs)

At current scale, a single sitemap suffices. If the blog or resources grow beyond 50,000 URLs, split into:
```
/sitemap.xml          ← sitemap index
/sitemap-static.xml   ← static pages
/sitemap-blog.xml     ← blog posts
/sitemap-resources.xml ← resource articles
```

---

## 8. Robots.txt Strategy

```txt
# robots.txt — shikshaclasses.in

User-agent: *

# Allow all public content
Allow: /

# Block all API routes — not meant for indexing
Disallow: /api/

# Block admin portal (separate domain — but rule here as safety net)
Disallow: /admin/

# Block internal Next.js paths
Disallow: /_next/

# Block search result pages with query params (prevent thin content indexing)
Disallow: /results?*
Disallow: /resources?*
Disallow: /blog?*
Disallow: /gallery?*

# Block utility pages
Disallow: /404
Disallow: /500

# Crawl rate hint (optional — Googlebot ignores but others respect)
Crawl-delay: 1

# Sitemap declaration
Sitemap: https://shikshaclasses.in/sitemap.xml
```

> **Note on query params:** Filter states (e.g., `/results?program=jee`) are rendered client-side via JS. The base URLs (`/results/`, `/resources/`) are the canonical, indexable pages. The `Disallow: /results?*` prevents Google from indexing duplicate thin-content variants.

---

## 9. Canonical Tags

```typescript
// In every page's generateMetadata():
alternates: {
  canonical: `https://shikshaclasses.in${pathname}`,
}

// Next.js renders:
<link rel="canonical" href="https://shikshaclasses.in/programs/jee/" />
```

**Canonical Rules:**
| Scenario | Canonical Points To |
|---|---|
| Program page | `https://shikshaclasses.in/programs/{slug}/` |
| Blog post | `https://shikshaclasses.in/blog/{slug}/` |
| Resource with query params | Base URL without params |
| Results filter states | `https://shikshaclasses.in/results/` |
| Paginated blog/resources | First page URL (no `?page=2` indexing) |

---

## 10. Core Web Vitals — SEO Performance Checklist

Google uses Core Web Vitals as a ranking signal. Target scores:

| Metric | Target | Implementation |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | Preload hero image; use `t_homepage_hero` transform at `q_60`; priority `loading` on LCP image |
| INP (Interaction to Next Paint) | < 200ms | Avoid heavy JS on initial load; defer non-critical scripts |
| CLS (Cumulative Layout Shift) | < 0.1 | Always set explicit `width` + `height` on `<img>` tags; no late-loading web fonts |

**Image implementation (Next.js):**
```tsx
import Image from 'next/image';

// Hero image — LCP element — priority=true
<Image
  src={cloudinaryUrl(hero.backgroundImageSecureUrl, 't_homepage_hero')}
  alt="Shiksha Classes Bhandara coaching institute"
  width={2560}
  height={1440}
  priority={true}      // ← Preloads immediately
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// Gallery images — lazy loaded
<Image
  src={cloudinaryUrl(img.imageSecureUrl, 't_gallery_grid')}
  alt={img.altText}
  width={600}
  height={450}
  loading="lazy"
/>
```

---

## 11. Hreflang (Future)

Currently, all content is in English with Hindi/Marathi spoken at the institute. If a Hindi-language version of the site is added:

```html
<link rel="alternate" hreflang="en-IN" href="https://shikshaclasses.in/programs/jee/" />
<link rel="alternate" hreflang="hi-IN" href="https://shikshaclasses.in/hi/programs/jee/" />
<link rel="alternate" hreflang="x-default" href="https://shikshaclasses.in/programs/jee/" />
```

For now, use `<html lang="en-IN">` in the root layout to signal English targeting India.

---

## 12. SEO Execution Roadmap

### Month 1 — Foundation
- [ ] Set up Google Search Console + verify via DNS token
- [ ] Set up Google Analytics 4
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Claim and complete Google Business Profile
- [ ] Submit NAP to Justdial, Sulekha, IndiaMart
- [ ] Publish all 4 program pages with full structured data
- [ ] Publish contact page with LocalBusiness schema
- [ ] Set canonical tags on all pages

### Month 2 — Content Launch
- [ ] Publish 5 foundational blog posts (pillar content)
- [ ] Publish 10 resources (formula sheets, PYQs)
- [ ] Populate results page (minimum 20 toppers)
- [ ] Upload 20+ gallery images with keyword-rich alt text
- [ ] Request Google Reviews from 5+ enrolled families

### Month 3 — Velocity
- [ ] Publish 4 blog posts (weekly cadence)
- [ ] Publish 4 new resources
- [ ] Create Google Business Profile weekly posts
- [ ] Begin link building: share resources in local Facebook groups, college groups
- [ ] Reach out to local news sites for mentions

### Month 4–6 — Growth
- [ ] Monitor Search Console for impressions on target keywords
- [ ] Identify pages getting impressions but low CTR → optimise meta descriptions
- [ ] Identify keywords where position is 5–15 → strengthen those pages
- [ ] Continue 4 blog posts/month
- [ ] Collect and publish more results + testimonials

---

*Document version: 1.0 — SEO Architecture · Pre-Implementation*
*Shiksha Classes, Bhandara — 2025*
