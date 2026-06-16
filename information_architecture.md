# Information Architecture: Shiksha Classes
### Institutional Coaching Website — Bhandara, Maharashtra

---

## 1. Sitemap

```
shikshaclasses.in/
│
├── /                          ← Home
│
├── /programs/                 ← Programs Hub (index)
│   ├── /programs/jee/         ← JEE Preparation
│   ├── /programs/neet/        ← NEET Preparation
│   ├── /programs/mht-cet/     ← MHT-CET Preparation
│   └── /programs/previse-foundation/  ← Previse Foundation
│
├── /results/                  ← Results Showcase
│
├── /resources/                ← Resources Hub (index)
│   ├── /resources/[category]/ ← Category listing (e.g., physics, chemistry)
│   └── /resources/[category]/[slug]/  ← Individual resource article
│
├── /gallery/                  ← Gallery
│
├── /blog/                     ← Blog Hub (index)
│   └── /blog/[slug]/          ← Individual blog post
│
├── /careers/                  ← Careers & Job Openings
│   └── /careers/[job-slug]/   ← Individual job detail page
│
├── /contact/                  ← Contact & Location
│
├── /sitemap.xml               ← Machine-readable sitemap (auto-generated)
└── /robots.txt                ← Crawler instructions
```

---

## 2. Route Hierarchy

### 2.1 Depth Map

| Depth | Path | Type |
|---|---|---|
| 0 | `/` | Home |
| 1 | `/programs/` | Hub — aggregates all program links |
| 2 | `/programs/jee/` | Leaf — JEE Program Landing Page |
| 2 | `/programs/neet/` | Leaf — NEET Program Landing Page |
| 2 | `/programs/mht-cet/` | Leaf — MHT-CET Program Landing Page |
| 2 | `/programs/previse-foundation/` | Leaf — Previse Foundation Landing Page |
| 1 | `/results/` | Leaf — Results Showcase |
| 1 | `/resources/` | Hub — aggregates all resource categories |
| 2 | `/resources/[category]/` | Hub — category listing (e.g., `/resources/physics/`) |
| 3 | `/resources/[category]/[slug]/` | Leaf — individual resource article |
| 1 | `/gallery/` | Leaf — Gallery |
| 1 | `/blog/` | Hub — Blog listing |
| 2 | `/blog/[slug]/` | Leaf — individual blog post |
| 1 | `/careers/` | Hub — all openings |
| 2 | `/careers/[job-slug]/` | Leaf — individual job detail & application |
| 1 | `/contact/` | Leaf — Contact & Location |

### 2.2 Page Purpose & Primary CTA Per Route

| Route | Primary Purpose | Primary CTA |
|---|---|---|
| `/` | First impression, trust, overview | "Enquire Now" |
| `/programs/` | Help visitor self-select a program | Cards → program subpage |
| `/programs/jee/` | Convert JEE-intent visitor | "Apply for JEE Batch" |
| `/programs/neet/` | Convert NEET-intent visitor | "Apply for NEET Batch" |
| `/programs/mht-cet/` | Convert MHT-CET-intent visitor | "Apply for MHT-CET Batch" |
| `/programs/previse-foundation/` | Convert Grade 8–10 parent/student | "Enquire for Foundation" |
| `/results/` | Social proof & credibility | "Join the Next Batch" |
| `/resources/` | Provide free value, build trust | Download / Read Article |
| `/resources/[category]/[slug]/` | Educate visitor | "Download" / "Enquire Now" |
| `/gallery/` | Build emotional connection | "Visit the Campus" → `/contact/` |
| `/blog/` | SEO traffic, expertise signal | Subscribe / Share |
| `/blog/[slug]/` | Educate, earn organic traffic | "Related Programs" → program page |
| `/careers/` | Recruit quality faculty | "Apply Now" |
| `/careers/[job-slug]/` | Capture qualified applicants | Application form submit |
| `/contact/` | Remove friction from enquiry | Call / WhatsApp / Form |

---

## 3. Navigation Structure

### 3.1 Primary Navigation (Header)

The primary navigation appears on all pages. On mobile it collapses to a hamburger menu. The order is designed to match the mental model of a prospective student/parent: "What programs? → Proof of results → Free resources → Who are you? → Contact."

```
[ Logo: SHIKSHA CLASSES ]                    [ Enquire Now ← Sticky CTA Button ]

Nav Links (left-to-right priority):
  Programs ▾       Results       Resources       Gallery       Blog       Careers       Contact
  │
  └─ Dropdown:
       ○ JEE Preparation
       ○ NEET Preparation
       ○ MHT-CET Preparation
       ○ Previse Foundation
       ─────────────────────
       → View All Programs
```

**Design Rules:**
- "Enquire Now" button is always visible — right end on desktop, bottom-pinned sticky bar on mobile.
- "Programs" is the only dropdown. All other links are direct.
- Active page state is indicated with an underline accent in `#B08D57` (Brass).
- On mobile, the nav order collapses to: Programs → Results → Resources → Contact (most important 4 visible, rest in "More").

### 3.2 Secondary Navigation (In-Page / Contextual)

These appear within pages to help users go deeper without returning to the header.

| Page | Contextual Nav Elements |
|---|---|
| `/programs/jee/` | Tab bar: Overview / Curriculum / Faculty / Topper Testimonials / Fee & Admissions |
| `/programs/neet/` | Tab bar: Overview / Curriculum / Faculty / Topper Testimonials / Fee & Admissions |
| `/programs/mht-cet/` | Tab bar: same pattern |
| `/programs/previse-foundation/` | Tab bar: same pattern |
| `/results/` | Filter bar: All / JEE / NEET / MHT-CET / Foundation + Year filter |
| `/resources/` | Subject sidebar: All / Physics / Chemistry / Mathematics / Biology / General |
| `/resources/[category]/[slug]/` | Breadcrumb: Home > Resources > [Category] > [Title] |
| `/blog/` | Category pill filter: All / Study Tips / Exam News / Career Guidance |
| `/blog/[slug]/` | Breadcrumb + Related Posts widget |
| `/careers/` | Filter tabs: All / Faculty / Counselling / Administration |

### 3.3 Breadcrumb Trail (All Depth-2+ Pages)

Breadcrumbs serve both UX wayfinding and SEO. Format:

```
Home  >  Programs  >  JEE Preparation
Home  >  Resources  >  Physics  >  Newton's Laws — Complete Formula Sheet
Home  >  Blog  >  How to Crack NEET in 6 Months
Home  >  Careers  >  Senior Physics Faculty
```

---

## 4. Footer Structure

The footer is a trust-reinforcing zone. It appears on all pages and is structured in 4 columns + bottom legal bar.

```
┌───────────────────────────────────────────────────────┐
│  SHIKSHA CLASSES                                      │
│  Premier Coaching for JEE, NEET & MHT-CET            │
│  Bhandara, Maharashtra                                │
│  📞  [Phone Number]                                   │
│  ✉   [Email Address]                                  │
│  WhatsApp Chat →                                      │
├───────────────┬──────────────┬────────────┬───────────┤
│  PROGRAMS     │  QUICK LINKS │  RESOURCES │  CONNECT  │
│               │              │            │           │
│  JEE          │  Home        │  Physics   │  Facebook │
│  NEET         │  Results     │  Chemistry │  YouTube  │
│  MHT-CET      │  Gallery     │  Maths     │  Instagram│
│  Foundation   │  Blog        │  Biology   │  Twitter  │
│               │  Careers     │  All Notes │           │
│               │  Contact     │            │           │
├───────────────┴──────────────┴────────────┴───────────┤
│  © 2025 Shiksha Classes, Bhandara. All rights reserved.│
│  Privacy Policy    Terms of Use                       │
└───────────────────────────────────────────────────────┘
```

**Footer Anchors (SEO-Rich Text):**
- Tagline: "Shiksha Classes — Bhandara's most trusted JEE, NEET & MHT-CET coaching centre."
- Address rendered as proper `<address>` HTML tag for Local SEO.

---

## 5. Internal Linking Strategy

Internal links strengthen SEO by distributing page authority and helping crawlers discover all routes. They also serve conversion by presenting the right next step to each type of visitor.

### 5.1 Hub → Leaf Links (Content Hub Model)

Every Hub page links extensively to its children. Every child links back to the Hub and sideways to siblings.

```
/programs/        →  /programs/jee/
                  →  /programs/neet/
                  →  /programs/mht-cet/
                  →  /programs/previse-foundation/

/programs/jee/    →  /results/?filter=jee           (See JEE toppers)
                  →  /resources/mathematics/         (Prep resources for JEE)
                  →  /resources/physics/
                  →  /contact/                       (Enquire CTA)
                  →  /programs/                      (← back to Hub)
                  →  /programs/neet/                 (sibling — "Also considering NEET?")

/resources/       →  /resources/physics/
                  →  /resources/chemistry/
                  →  /resources/mathematics/
                  →  /resources/biology/

/resources/[slug]/ → /programs/jee/                 (Contextual: "This resource helps JEE students")
                   → /resources/[category]/          (← back to category)
                   → 3 related resources (slug links)

/blog/[slug]/     →  Relevant /programs/ page
                  →  Relevant /resources/ articles
                  →  /results/                       (when discussing exam outcomes)
                  →  /contact/                       (end-of-article CTA)
```

### 5.2 Home Page → Key Destination Links

The Home page acts as the primary link distributor. Every important page receives at least one link from `/`.

| Home Page Section | Links To |
|---|---|
| Hero CTA | `/contact/` |
| Program Grid | `/programs/jee/`, `/programs/neet/`, `/programs/mht-cet/`, `/programs/previse-foundation/` |
| Toppers Section | `/results/` |
| Free Resources Section | `/resources/` |
| Latest Blog Posts | `/blog/` + 2 most recent `/blog/[slug]/` |
| Careers Banner | `/careers/` |
| Sticky Enquiry Widget | `/contact/` |

### 5.3 Results → Conversion Links

The Results page is a high-trust, high-intent page. Links from it push visitors toward conversion.

```
/results/   →  /programs/jee/       (filter CTA: "Prepare for JEE like them")
            →  /programs/neet/
            →  /programs/mht-cet/
            →  /contact/            ("Join the next batch")
```

### 5.4 Contextual Inline Link Rules

| Context | Rule |
|---|---|
| Any mention of "JEE" in blog/resources | Link to `/programs/jee/` |
| Any mention of "NEET" | Link to `/programs/neet/` |
| Any mention of "MHT-CET" | Link to `/programs/mht-cet/` |
| Any mention of "Bhandara" | Link to `/contact/` (local SEO reinforcement) |
| Any mention of "results" or "selections" | Link to `/results/` |
| First mention of a subject (Physics etc.) | Link to `/resources/physics/` |
| Any mention of faculty/teaching | Link to `/careers/` if in recruitment context |
| End of every blog post | Link to 1 relevant program + "Enquire Now" → `/contact/` |

### 5.5 Orphan Prevention Checklist

Every page must receive at least one inbound link from another page. Verified targets:

| Page | Receives Link From |
|---|---|
| `/gallery/` | Home → Gallery section, Footer, Blog posts |
| `/careers/[job-slug]/` | `/careers/` listing, Footer |
| `/contact/` | Home hero, every program CTA, every blog post, Footer, Nav |

---

## 6. SEO Content Structure

### 6.1 URL Conventions

- All lowercase, hyphen-separated slugs.
- No trailing query strings for filterable pages (filters applied client-side or via query params that are **not** indexed — use `canonical` tags).
- Descriptive, keyword-rich slugs where possible.

| Page | Final URL |
|---|---|
| Home | `shikshaclasses.in/` |
| Programs Hub | `shikshaclasses.in/programs/` |
| JEE | `shikshaclasses.in/programs/jee/` |
| NEET | `shikshaclasses.in/programs/neet/` |
| MHT-CET | `shikshaclasses.in/programs/mht-cet/` |
| Foundation | `shikshaclasses.in/programs/previse-foundation/` |
| Results | `shikshaclasses.in/results/` |
| Resources Hub | `shikshaclasses.in/resources/` |
| Resource Category | `shikshaclasses.in/resources/physics/` |
| Resource Article | `shikshaclasses.in/resources/physics/newton-laws-formula-sheet/` |
| Gallery | `shikshaclasses.in/gallery/` |
| Blog Hub | `shikshaclasses.in/blog/` |
| Blog Post | `shikshaclasses.in/blog/how-to-crack-neet-2025/` |
| Careers Hub | `shikshaclasses.in/careers/` |
| Job Detail | `shikshaclasses.in/careers/senior-physics-faculty-bhandara/` |
| Contact | `shikshaclasses.in/contact/` |

### 6.2 Title & Meta Description Matrix

| Page | `<title>` Tag | Meta Description |
|---|---|---|
| Home | `Shiksha Classes Bhandara — JEE, NEET & MHT-CET Coaching` | `Join Bhandara's most trusted coaching institute for JEE, NEET, MHT-CET & Foundation. Expert faculty, proven results, personalised guidance.` |
| Programs Hub | `Programs — JEE, NEET, MHT-CET & Foundation \| Shiksha Classes` | `Explore our carefully designed programmes for JEE Main & Advanced, NEET, MHT-CET and Previse Foundation. Find the right course for your goal.` |
| JEE | `JEE Coaching in Bhandara — Shiksha Classes` | `Result-oriented JEE Main & Advanced coaching in Bhandara. Small batches, expert Physics, Chemistry & Maths faculty. Enquire for 2025 batch.` |
| NEET | `NEET Coaching in Bhandara — Shiksha Classes` | `Comprehensive NEET preparation in Bhandara with expert Biology, Chemistry & Physics faculty. Proven track record of top ranks. Join us.` |
| MHT-CET | `MHT-CET Coaching in Bhandara — Shiksha Classes` | `Score high in MHT-CET with Bhandara's top coaching institute. Focused curriculum, regular tests, and expert mentoring.` |
| Foundation | `Previse Foundation — Classes 8, 9 & 10 \| Shiksha Classes` | `Build a strong academic foundation for JEE & NEET from Classes 8–10 with Shiksha Classes Bhandara. Early head-start for competitive exams.` |
| Results | `Our Results — JEE, NEET, MHT-CET Toppers \| Shiksha Classes` | `See why Bhandara trusts Shiksha Classes. Browse our year-wise JEE, NEET & MHT-CET topper results with ranks and scores.` |
| Resources Hub | `Free Study Resources — Notes, PYQs & Formula Sheets \| Shiksha Classes` | `Download free Physics, Chemistry, Maths & Biology notes, formula sheets, and previous year papers curated by Shiksha Classes faculty.` |
| Gallery | `Gallery — Campus & Events \| Shiksha Classes Bhandara` | `Take a peek inside Shiksha Classes Bhandara. See our classrooms, events, toppers celebrations, and campus life.` |
| Blog | `Study Tips & Exam Guidance Blog \| Shiksha Classes Bhandara` | `Expert articles on JEE, NEET & MHT-CET preparation strategy, time management, subject tips and latest exam news from Shiksha Classes.` |
| Careers | `Faculty & Staff Careers — Shiksha Classes Bhandara` | `Join our team. We are hiring passionate faculty for JEE, NEET & MHT-CET coaching. View current openings at Shiksha Classes Bhandara.` |
| Contact | `Contact & Location — Shiksha Classes Bhandara` | `Reach out to Shiksha Classes Bhandara. Get directions, call us, WhatsApp us, or fill the admission enquiry form. We reply within 24 hours.` |

### 6.3 Heading Hierarchy (H1 → H2 → H3) Per Key Page

#### Home Page
```
H1: Bhandara's Premier Coaching for JEE, NEET & MHT-CET
  H2: Our Programs
    H3: JEE Preparation
    H3: NEET Preparation
    H3: MHT-CET Preparation
    H3: Previse Foundation
  H2: Our Results Speak
    H3: [Topper Name] — JEE Main 2025
    ...
  H2: Free Study Resources
  H2: What Our Students Say
  H2: Find Us in Bhandara
```

#### JEE Program Page
```
H1: JEE Coaching in Bhandara — Shiksha Classes
  H2: Programme Overview
  H2: Curriculum & Exam Pattern
    H3: JEE Main — Syllabus & Pattern
    H3: JEE Advanced — Syllabus & Pattern
  H2: Our JEE Faculty
    H3: [Faculty Name] — Physics
  H2: JEE Toppers from Shiksha Classes
  H2: Admission & Fees
  H2: Frequently Asked Questions
```

#### Results Page
```
H1: Our Students' Results — JEE, NEET & MHT-CET
  H2: JEE 2025 Selections
  H2: NEET 2025 Selections
  H2: MHT-CET 2025 Selections
  H2: Foundation Programme Achievers
```

#### Resources Page
```
H1: Free Study Material — Notes, PYQs & Formula Sheets
  H2: Physics Resources
    H3: [Resource Title]
  H2: Chemistry Resources
  H2: Mathematics Resources
  H2: Biology Resources
```

### 6.4 JSON-LD Structured Data Per Page

| Page | Schema Types |
|---|---|
| Home | `EducationalOrganization`, `LocalBusiness`, `BreadcrumbList` |
| All Program pages | `Course`, `EducationalOrganization`, `BreadcrumbList`, `FAQPage` |
| Results | `ItemList` (one per topper), `BreadcrumbList` |
| Resources `[slug]` | `Article` or `LearningResource`, `BreadcrumbList` |
| Blog `[slug]` | `BlogPosting`, `Author`, `BreadcrumbList` |
| Careers `[job-slug]` | `JobPosting`, `BreadcrumbList` |
| Contact | `LocalBusiness`, `ContactPoint`, `BreadcrumbList` |

### 6.5 Keyword Targeting Strategy

| Target Keyword Cluster | Primary Page | Supporting Pages |
|---|---|---|
| "Coaching in Bhandara" | `/` | `/contact/`, `/programs/` |
| "JEE coaching Bhandara" | `/programs/jee/` | `/`, `/results/` |
| "NEET coaching Bhandara" | `/programs/neet/` | `/`, `/results/` |
| "MHT-CET coaching Bhandara" | `/programs/mht-cet/` | `/`, `/results/` |
| "Foundation classes Bhandara" | `/programs/previse-foundation/` | `/` |
| "JEE result Bhandara" | `/results/` | `/programs/jee/` |
| "Free JEE notes download" | `/resources/` | `/resources/physics/`, `/resources/mathematics/` |
| "NEET formula sheet" | `/resources/[slug]` | `/resources/chemistry/` |
| "Best coaching in Vidarbha" | `/` | `/programs/`, `/results/` |
| "Physics teacher job Bhandara" | `/careers/[job-slug]` | `/careers/` |

### 6.6 Robots & Crawlability Rules

```
# robots.txt
User-agent: *
Allow: /

Disallow: /api/
Disallow: /admin/
Disallow: /admin-portal/

Sitemap: https://shikshaclasses.in/sitemap.xml
```

**Sitemap contents** — all public routes including:
- Static pages (Home, Programs Hub, Results, Gallery, Resources, Blog, Careers, Contact)
- All program subpages
- All resource articles (dynamically generated from DB)
- All blog posts (dynamically generated from DB)
- All active job postings (dynamically generated from DB)

**Canonical tags** — all filter variations of `/results/` and `/resources/` that may produce query params will point `canonical` to the base URL to prevent duplicate content indexing.

---

## 7. User Journeys

### 7.1 Student Journey — "I know I want JEE coaching"

```
Trigger: Google search "JEE coaching in Bhandara"

Step 1  →  Lands on /programs/jee/   (high-intent landing page)
           Reads: Overview, Curriculum, Faculty
Step 2  →  Clicks "JEE Toppers from Shiksha Classes"
           Scrolls: In-page toppers section or links to /results/?filter=jee
Step 3  →  Returns to /programs/jee/
           Reads: Fees & Admission section
Step 4  →  Clicks "Apply for JEE Batch" CTA
           Fills: Enquiry form (inline on page or /contact/ redirect)
Step 5  →  Form submitted → thank you state → WhatsApp follow-up offered

Exit: Enquiry captured → Admin pipeline
```

### 7.2 Student Journey — "I'm exploring, not sure which exam"

```
Trigger: Google search "best coaching Bhandara" or referral link

Step 1  →  Lands on / (Home)
           Sees: Hero, stat board, program grid
Step 2  →  Clicks "Programs" nav link → /programs/
           Reads: All 4 program cards with short descriptions
Step 3  →  Clicks on "NEET Preparation" → /programs/neet/
           Reads: Overview, curriculum
Step 4  →  Sees internal link → "Also considering MHT-CET?"
           Navigates to /programs/mht-cet/
Step 5  →  Scrolls to results section on MHT-CET page → links to /results/
Step 6  →  Convincced by results → returns to /programs/mht-cet/
           Clicks "Apply for MHT-CET Batch"
Step 7  →  Fills enquiry form

Exit: Enquiry captured
```

### 7.3 Resource-Led Discovery Journey — "I want free study material"

```
Trigger: Google search "NEET Biology formula sheet PDF"

Step 1  →  Lands on /resources/biology/neet-biology-complete-formula-sheet/
           Downloads resource (perceived value exchange)
Step 2  →  Sees inline contextual link → "Preparing for NEET? See our NEET Coaching"
           Clicks → /programs/neet/
Step 3  →  Reads program details, convinceed by faculty profiles & results
Step 4  →  Clicks "Apply for NEET Batch" → Enquiry form

Exit: Enquiry captured (user came via free resource → trust established)
```

---

## 8. Parent Journeys

### 8.1 Parent Journey — "Evaluating institutes for my child's JEE prep"

```
Trigger: Word of mouth / local awareness / Facebook ad

Step 1  →  Lands on / (Home)
           Sees: Stat board ("500+ selections, 8 years"), toppers carousel
Step 2  →  Clicks "Our Results" → /results/
           Filters: JEE / Year 2025
           Sees: Real student photos with ranks and percentage
Step 3  →  Trusts results → wants to understand the method
           Clicks program card → /programs/jee/
           Reads: Curriculum, faculty qualifications, batch size info
Step 4  →  Still wants social proof → clicks Gallery → /gallery/
           Sees: Classroom infrastructure, events, award ceremonies
Step 5  →  Confident → clicks "Enquire Now" (sticky button or footer CTA)
           Navigates → /contact/
           Fills: Enquiry form (adds phone for callback)

Exit: Enquiry captured with parent contact number → Admin logs callback
```

### 8.2 Parent Journey — "My child is in Class 9, thinking ahead"

```
Trigger: Relative mentioned Shiksha Classes' Foundation program

Step 1  →  Lands on / (Home) via WhatsApp referral link
           Sees: Program grid → notices "Previse Foundation"
Step 2  →  Clicks → /programs/previse-foundation/
           Reads: Grade range (8–10), early advantage messaging,
                  curriculum alignment with JEE/NEET topics
Step 3  →  Reads "Testimonials" tab — parent quotes specifically
Step 4  →  Clicks "Enquire for Foundation" CTA → Enquiry form

Exit: Enquiry captured (Foundation batch enquiry flagged in DB)
```

### 8.3 Parent Journey — "Verifying legitimacy of the institute"

```
Trigger: Child mentioned Shiksha Classes, parent is cautious

Step 1  →  Direct URL / search "Shiksha Classes Bhandara reviews"
           Lands on / (Home)
Step 2  →  Scrolls page entirely → reads testimonials, topper photos
Step 3  →  Clicks Gallery → /gallery/
           Sees: Infrastructure, events, team photos
Step 4  →  Clicks Blog → /blog/
           Reads 1–2 posts → confirms expertise and professionalism
Step 5  →  Clicks Contact → /contact/
           Sees: Physical address, Google Maps embed, phone number
           Calls directly (does not fill form)

Exit: Call captured at reception → admin logs manually if needed
```

---

## 9. Enquiry Journeys

### 9.1 Enquiry Entry Points (All Surfaces)

| Entry Point | Location | Data Collected |
|---|---|---|
| Hero CTA form | `/` inline | Name, Phone, Program, Grade |
| Sticky floating button | All pages (mobile bottom bar) | Redirects to `/contact/` |
| Program page CTA form | `/programs/[slug]/` inline | Name, Phone, Grade, auto-fills Program |
| Results page CTA | `/results/` — "Join the next batch" button | Redirects to `/contact/` |
| Blog post end CTA | `/blog/[slug]/` | Redirects to `/contact/` or inline mini-form |
| Contact page full form | `/contact/` | Name, Phone, Email, Grade, Program, Message |
| WhatsApp button | Footer + Contact page | Opens WhatsApp chat with pre-filled message |

### 9.2 Enquiry Form Field Specification

| Field | Type | Required | Notes |
|---|---|---|---|
| Full Name | Text | Yes | Min 2 chars |
| Phone Number | Tel | Yes | 10-digit Indian mobile validation |
| Email | Email | No | Optional — used for follow-up PDFs |
| Current Grade / Class | Select | Yes | Options: Class 8, 9, 10, 11, 12, Dropper |
| Program of Interest | Select | Yes | JEE / NEET / MHT-CET / Foundation / Not Sure |
| Message | Textarea | No | Optional additional context |

### 9.3 Post-Submission Flow (Frontend)

```
User submits form
      ↓
Client-side Zod validation passes
      ↓
POST /api/enquiries
      ↓
Server stores in MongoDB (status = "New")
      ↓
Frontend shows: Inline success state
  "Thank you, [Name]! We will call you within 24 hours."
  [ Chat with us on WhatsApp → ] button appears

Optional: Email/WhatsApp notification triggered to admin
```

### 9.4 Admin Enquiry Pipeline (Backend Lifecycle)

```
[New]  →  [Contacted]  →  [Visit Scheduled]  →  [Enrolled]
                                                       ↑
                                              [Closed / Not Interested]
```

Each status change is timestamped. Notes thread per enquiry allows counselors to log call outcomes.

---

## 10. Careers Journey

### 10.1 Applicant Journey

```
Trigger: LinkedIn post / college noticeboard / job portal referral

Step 1  →  Lands on /careers/
           Sees: All active openings (title, subject, experience required)
Step 2  →  Clicks on opening → /careers/senior-physics-faculty-bhandara/
           Reads: Full job description, requirements, responsibilities
Step 3  →  Clicks "Apply Now" — in-page application form opens
           Fills: Name, Phone, Email, uploads Resume PDF
Step 4  →  Submits → success state shown
           Resume uploaded to Cloudinary (PDF), record saved in MongoDB

Exit: Application captured → Admin reviews in Careers Dashboard
```

---

*Document version: 1.0 — Information Architecture, Pre-Design Phase*
*Shiksha Classes, Bhandara, Maharashtra — 2025*
