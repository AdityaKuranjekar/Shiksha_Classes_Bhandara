# Low-Fidelity Wireframe — Home Page
### Shiksha Classes · Mobile-First · No Colour · No Styling

---

## Reading Guide

```
┌─────────────┐   = Container / Panel / Card
│             │
└─────────────┘

[  BUTTON  ]       = Clickable button
[ Label ▾  ]       = Dropdown / expandable
─────────────      = Divider / separator
░░░░░░░░░░░        = Image placeholder
████               = Text block (paragraph)
────               = Single-line text (heading/label)
( ○ )              = Radio / indicator dot
[X]                = Checkbox
→                  = Navigation arrow / link
▸                  = List item marker
»                  = CTA / action arrow
```

---
---

# MOBILE WIREFRAME  (375px viewport)

---

## GLOBAL: Sticky Navigation Bar

```
┌─────────────────────────────────────────────┐
│  SHIKSHA CLASSES              [≡ Menu]      │
└─────────────────────────────────────────────┘
```

**Component Hierarchy:**
```
Navbar
├── Logo (text mark)
│   ├── Brand name
│   └── Tagline (hidden on mobile)
└── Hamburger trigger
    └── [Drawer: slides from right]
        ├── Nav links (stacked)
        │   ├── Programs
        │   ├── Results
        │   ├── Resources
        │   ├── Gallery
        │   ├── Blog
        │   ├── Careers
        │   └── Contact
        └── [Enquire Now] — full-width CTA
```

---
---

## SECTION 1 — HERO

```
┌─────────────────────────────────────────────┐
│                                             │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░                                      ░░ │
│  ░░  OVERLINE TEXT                       ░░ │
│  ░░  ──────────────────────              ░░ │
│  ░░                                      ░░ │
│  ░░  Bhandara's Premier                  ░░ │
│  ░░  Coaching for                        ░░ │
│  ░░  JEE, NEET &                         ░░ │
│  ░░  MHT-CET                             ░░ │
│  ░░                                      ░░ │
│  ░░  ████████████████████████████        ░░ │
│  ░░  ████████████████████               ░░ │
│  ░░                                      ░░ │
│  ░░  [    Enquire Now    »   ]           ░░ │
│  ░░                                      ░░ │
│  ░░  [ View Programs ]                   ░░ │
│  ░░                                      ░░ │
└─────────────────────────────────────────────┘
│                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │  500+   │  │   8     │  │  100%   │    │
│  │ Select- │  │ Years   │  │ Results │    │
│  │  ions   │  │         │  │         │    │
│  └─────────┘  └─────────┘  └─────────┘    │
│                                             │
```

**Section Hierarchy:**
```
1. Hero Section
├── 1.1 Background Image (full-bleed, darkened overlay)
│   └── Overlay gradient (bottom-to-top fade for text legibility)
│
├── 1.2 Content Block (positioned over image)
│   ├── 1.2.1 Overline / Eyebrow Label
│   │         "Bhandara · Since 2016"
│   ├── 1.2.2 H1 Headline [HIGHEST PRIORITY]
│   │         "Bhandara's Premier Coaching for JEE, NEET & MHT-CET"
│   ├── 1.2.3 Subheadline / Lead Text
│   │         1–2 lines supporting copy
│   ├── 1.2.4 Primary CTA Button [HIGH PRIORITY]
│   │         "Enquire Now →"
│   └── 1.2.5 Secondary CTA Link
│             "View Programs"
│
└── 1.3 Stats Bar (immediately below hero image)
    ├── Stat 1: Total Selections
    ├── Stat 2: Years of Excellence
    └── Stat 3: [Third stat — e.g., Courses / Selections / Top Ranks]
```

**Content Hierarchy:**
```
Priority 1 → H1 Headline
Priority 2 → Primary CTA ("Enquire Now")
Priority 3 → Subheadline
Priority 4 → Stats Bar (credibility proof)
Priority 5 → Secondary CTA ("View Programs")
Priority 6 → Overline label
```

**Component Hierarchy:**
```
HeroSection
├── HeroImage (background)
│   └── ImageOverlay
├── HeroContent
│   ├── EyebrowLabel
│   ├── HeadlineH1
│   ├── SubheadlineText
│   ├── ButtonPrimary ("Enquire Now")
│   └── ButtonGhost ("View Programs")
└── StatsBar
    └── StatCard × 3
        ├── StatValue (large number)
        └── StatLabel (descriptor)
```

---
---

## SECTION 2 — PROGRAMS

```
┌─────────────────────────────────────────────┐
│                                             │
│  OVERLINE: OUR PROGRAMMES                  │
│  ───────────────────────                   │
│                                             │
│  Choose Your Path to                        │
│  Excellence                                 │
│                                             │
│  ████████████████████████                  │
│  ████████████████                          │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │                                     │   │
│  │  [ JEE BADGE ]                      │   │
│  │                                     │   │
│  │  JEE Preparation                    │   │
│  │  ─────────────                      │   │
│  │  ████████████████████████           │   │
│  │  ████████████████                   │   │
│  │                                     │   │
│  │  ▸ Physics · Chemistry · Maths      │   │
│  │  ▸ Classes 11, 12 & Droppers        │   │
│  │                                     │   │
│  │  [ Explore JEE →             ]      │   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │                                     │   │
│  │  [ NEET BADGE ]                     │   │
│  │                                     │   │
│  │  NEET Preparation                   │   │
│  │  ──────────────                     │   │
│  │  ████████████████████████           │   │
│  │  ████████████████                   │   │
│  │                                     │   │
│  │  ▸ Biology · Chemistry · Physics    │   │
│  │  ▸ Classes 11, 12 & Droppers        │   │
│  │                                     │   │
│  │  [ Explore NEET →            ]      │   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  [ MHT-CET BADGE ]                  │   │
│  │  MHT-CET Preparation                │   │
│  │  ████████████████████████           │   │
│  │  ▸ Maths · Physics · Chemistry      │   │
│  │  [ Explore MHT-CET →         ]      │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  [ FOUNDATION BADGE ]               │   │
│  │  Previse Foundation                 │   │
│  │  ████████████████████████           │   │
│  │  ▸ Classes 8, 9 & 10               │   │
│  │  [ Explore Foundation →      ]      │   │
│  └─────────────────────────────────────┘   │
│                                             │
│          [ View All Programs ]              │
│                                             │
└─────────────────────────────────────────────┘
```

**Section Hierarchy:**
```
2. Programs Section
├── 2.1 Section Header
│   ├── 2.1.1 Overline label ("Our Programmes")
│   ├── 2.1.2 H2 Section Heading
│   └── 2.1.3 Section subtext
│
├── 2.2 Programs Grid [CORE CONTENT]
│   ├── Program Card 1 — JEE
│   ├── Program Card 2 — NEET
│   ├── Program Card 3 — MHT-CET
│   └── Program Card 4 — Previse Foundation
│
└── 2.3 Footer Link
    └── "View All Programs →"
```

**Content Hierarchy (per Program Card):**
```
Priority 1 → Program Name (H3)
Priority 2 → Short Description
Priority 3 → Subject list (bullets)
Priority 4 → Target Grade
Priority 5 → CTA ("Explore JEE →")
Priority 6 → Program Badge label
```

**Component Hierarchy:**
```
ProgramsSection
├── SectionHeader
│   ├── EyebrowLabel
│   ├── HeadlineH2
│   └── SubheadlineText
├── ProgramGrid
│   └── ProgramCard × 4
│       ├── ProgramBadge
│       ├── ProgramName (H3)
│       ├── ProgramDescription
│       ├── FeatureList
│       │   └── ListItem × 2
│       └── ButtonSecondary ("Explore →")
└── ViewAllLink
```

---
---

## SECTION 3 — RESULTS

```
┌─────────────────────────────────────────────┐
│                                             │
│  OVERLINE: PROVEN RESULTS                  │
│  ────────────────────────                  │
│                                             │
│  Our Students                               │
│  Speak for Themselves                       │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  [ All ]  [ JEE ]  [ NEET ]  [ CET]│   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ← Swipeable carousel →                    │
│                                             │
│  ┌──────────────┐  ┌──────────────┐        │
│  │              │  │              │        │
│  │  ░░░░░░░░░   │  │  ░░░░░░░░░   │        │
│  │  (  Photo )  │  │  (  Photo )  │        │
│  │              │  │              │        │
│  │  99.85%ile   │  │  680 / 720   │        │
│  │  ─────────   │  │  ─────────   │        │
│  │  AIR 280     │  │  State Rk 4  │        │
│  │              │  │  ─────────   │        │
│  │  Priya D.    │  │  Rahul S.    │        │
│  │  JEE Main    │  │  NEET UG     │        │
│  │  2025        │  │  2025        │        │
│  │              │  │              │        │
│  └──────────────┘  └──────────────┘        │
│                                             │
│           ○ ● ○ ○ ○                         │
│           (page dots)                       │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │ "The faculty here prepared me for     │ │
│  │  JEE in a way no YouTube channel      │ │
│  │  ever could. Small batch size         │ │
│  │  meant individual attention."         │ │
│  │                                       │ │
│  │  — Priya Deshmukh, AIR 280, JEE 2025 │ │
│  └───────────────────────────────────────┘ │
│                                             │
│       [ See All Results »       ]           │
│                                             │
└─────────────────────────────────────────────┘
```

**Section Hierarchy:**
```
3. Results Section
├── 3.1 Section Header
│   ├── 3.1.1 Overline label
│   └── 3.1.2 H2 Section Heading
│
├── 3.2 Filter Tabs [controls carousel]
│   ├── Tab: All
│   ├── Tab: JEE
│   ├── Tab: NEET
│   └── Tab: MHT-CET
│
├── 3.3 Topper Carousel [CORE CONTENT]
│   ├── Result Card × N (scrollable, 2 visible on mobile)
│   │   ├── Student Photo
│   │   ├── Score (primary metric)
│   │   ├── Rank (secondary metric)
│   │   ├── Student Name
│   │   └── Exam + Year
│   └── Pagination Dots
│
├── 3.4 Featured Testimonial Quote
│   ├── Quote text
│   └── Attribution (name, rank, year)
│
└── 3.5 CTA Link
    └── "See All Results →"
```

**Content Hierarchy (per Result Card):**
```
Priority 1 → Score / Percentile (largest, most credible)
Priority 2 → Rank (AIR / State)
Priority 3 → Student Photo (face = trust)
Priority 4 → Student Name
Priority 5 → Exam Name + Year
```

**Component Hierarchy:**
```
ResultsSection
├── SectionHeader
│   ├── EyebrowLabel
│   └── HeadlineH2
├── FilterTabBar
│   └── FilterTab × 4 (All / JEE / NEET / MHT-CET)
├── ResultCarousel
│   ├── CarouselTrack
│   │   └── ResultCard × N
│   │       ├── StudentPhoto (circular)
│   │       ├── ScoreDisplay (primary)
│   │       ├── RankDisplay (secondary)
│   │       ├── StudentName
│   │       └── ExamLabel
│   └── CarouselDots
├── TestimonialQuote
│   ├── QuoteText
│   └── Attribution
└── CTALink ("See All Results")
```

---
---

## SECTION 4 — RESOURCES

```
┌─────────────────────────────────────────────┐
│                                             │
│  OVERLINE: FREE STUDY MATERIAL             │
│  ────────────────────────────              │
│                                             │
│  Notes, Sheets & Papers                     │
│  From Our Faculty — Free                    │
│                                             │
│  [ Physics ][ Chemistry ][ Maths ][ Bio ] ← scroll │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │   │
│  │  (Resource Thumbnail)               │   │
│  │                                     │   │
│  │  [ FORMULA SHEET ] [ PHYSICS ]      │   │
│  │                                     │   │
│  │  Newton's Laws — Complete           │   │
│  │  Formula Sheet for JEE              │   │
│  │  ──────────────────────             │   │
│  │  ████████████████████████           │   │
│  │  ████████████                       │   │
│  │                                     │   │
│  │  ↓ 2,341 downloads                  │   │
│  │                                     │   │
│  │  [ Download PDF ]   [ Read → ]      │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  [ PREVIOUS YEAR ] [ NEET ]         │   │
│  │  NEET 2024 Chemistry                │   │
│  │  Previous Year Paper                │   │
│  │  ████████████████████████           │   │
│  │  ↓ 1,820 downloads                  │   │
│  │  [ Download PDF ]   [ Read → ]      │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  [ NOTES ] [ MATHEMATICS ]          │   │
│  │  Integral Calculus — Revision       │   │
│  │  Checklist                          │   │
│  │  ████████████████████████           │   │
│  │  ↓ 987 downloads                    │   │
│  │  [ Download PDF ]   [ Read → ]      │   │
│  └─────────────────────────────────────┘   │
│                                             │
│       [ Browse All Resources »  ]           │
│                                             │
└─────────────────────────────────────────────┘
```

**Section Hierarchy:**
```
4. Resources Section
├── 4.1 Section Header
│   ├── 4.1.1 Overline label
│   ├── 4.1.2 H2 Heading
│   └── 4.1.3 Value proposition line
│
├── 4.2 Subject Filter Pills [horizontally scrollable on mobile]
│   ├── Physics
│   ├── Chemistry
│   ├── Mathematics
│   └── Biology
│
├── 4.3 Resource Cards List [CORE CONTENT — 3 featured resources]
│   └── ResourceCard × 3
│       ├── Thumbnail image
│       ├── Category badge
│       ├── Subject badge
│       ├── Resource title
│       ├── Short description
│       ├── Download count
│       ├── Download CTA
│       └── Read CTA
│
└── 4.4 Browse All CTA
    └── "Browse All Resources →"
```

**Content Hierarchy (per Resource Card):**
```
Priority 1 → Resource Title
Priority 2 → Download CTA (conversion action)
Priority 3 → Category + Subject badges (scanability)
Priority 4 → Download count (social proof)
Priority 5 → Short description
Priority 6 → Read link
Priority 7 → Thumbnail
```

**Component Hierarchy:**
```
ResourcesSection
├── SectionHeader
│   ├── EyebrowLabel
│   ├── HeadlineH2
│   └── ValuePropositionText
├── SubjectFilterPills
│   └── FilterPill × 4 (scrollable)
├── ResourceCardList
│   └── ResourceCard × 3
│       ├── ResourceThumbnail
│       ├── BadgeGroup
│       │   ├── CategoryBadge
│       │   └── SubjectBadge
│       ├── ResourceTitle
│       ├── ResourceDescription
│       ├── DownloadCount
│       └── ActionGroup
│           ├── ButtonDownload ("↓ Download PDF")
│           └── LinkRead ("Read →")
└── BrowseAllCTA
```

---
---

## SECTION 5 — TESTIMONIALS

```
┌─────────────────────────────────────────────┐
│                                             │
│  OVERLINE: WHAT PARENTS SAY                │
│  ──────────────────────────                │
│                                             │
│  Trusted by Families                        │
│  Across Bhandara                            │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │                                     │   │
│  │  " ████████████████████████████     │   │
│  │    ████████████████████████████     │   │
│  │    ████████████████████████████     │   │
│  │    ██████████████████ "             │   │
│  │                                     │   │
│  │  ─────────────────────────          │   │
│  │                                     │   │
│  │  ░░░  Anita Sharma                  │   │
│  │       Parent of JEE 2025 student    │   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ← [ prev ]              [ next ] →         │
│                                             │
│           ● ○ ○ ○                           │
│                                             │
│  ─────────────────────────────────────     │
│                                             │
│  ┌──────────────┐  ┌──────────────┐        │
│  │              │  │              │        │
│  │  [ PARENT ]  │  │ [ STUDENT ]  │        │
│  │              │  │              │        │
│  │  " ████████  │  │ " ████████   │        │
│  │    ████████  │  │   ████████   │        │
│  │    ████ "    │  │   ████ "     │        │
│  │              │  │              │        │
│  │  ─────────   │  │  ─────────   │        │
│  │  Name        │  │  Name        │        │
│  │  Parent of   │  │  JEE 2024    │        │
│  │  NEET batch  │  │  Student     │        │
│  └──────────────┘  └──────────────┘        │
│                                             │
└─────────────────────────────────────────────┘
```

**Section Hierarchy:**
```
5. Testimonials Section
├── 5.1 Section Header
│   ├── 5.1.1 Overline label ("What Parents Say")
│   └── 5.1.2 H2 Heading
│
├── 5.2 Featured Testimonial [HERO QUOTE — large, prominent]
│   ├── Quote text (large, full-width)
│   ├── Divider rule
│   └── Attribution block
│       ├── Avatar photo
│       ├── Name
│       └── Role (Parent of / Student, batch year)
│
├── 5.3 Carousel Navigation
│   ├── Previous arrow
│   ├── Next arrow
│   └── Pagination dots
│
└── 5.4 Secondary Testimonial Grid [2 smaller quotes below]
    ├── TestimonialMiniCard (Parent voice)
    └── TestimonialMiniCard (Student voice)
```

**Content Hierarchy:**
```
Priority 1 → Quote text (the actual words — most trust-building)
Priority 2 → Attribution (Name + Role — credibility source)
Priority 3 → Avatar photo (face = trust)
Priority 4 → Section label ("Parent" / "Student")
```

**Component Hierarchy:**
```
TestimonialsSection
├── SectionHeader
│   ├── EyebrowLabel
│   └── HeadlineH2
├── FeaturedTestimonial
│   ├── QuoteText (large)
│   ├── AttributionDivider
│   └── Attribution
│       ├── AvatarPhoto
│       ├── PersonName
│       └── PersonRole
├── CarouselControls
│   ├── PrevButton
│   ├── PaginationDots
│   └── NextButton
└── MiniTestimonialGrid
    └── MiniTestimonialCard × 2
        ├── CategoryLabel ("Parent" / "Student")
        ├── QuoteText (truncated)
        ├── Divider
        └── Attribution (name + context)
```

---
---

## SECTION 6 — CONTACT & FINAL CTA

```
┌─────────────────────────────────────────────┐
│                                             │
│  OVERLINE: ENQUIRE NOW                     │
│  ─────────────────────                     │
│                                             │
│  Take the First Step                        │
│  Towards Your Goal                          │
│                                             │
│  ████████████████████████                  │
│  ████████████████                          │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  ENQUIRY FORM                       │   │
│  │                                     │   │
│  │  ┌───────────────────────────────┐  │   │
│  │  │  Full Name                    │  │   │
│  │  └───────────────────────────────┘  │   │
│  │                                     │   │
│  │  ┌───────────────────────────────┐  │   │
│  │  │  Phone Number                 │  │   │
│  │  └───────────────────────────────┘  │   │
│  │                                     │   │
│  │  ┌───────────────────────────────┐  │   │
│  │  │  Current Class / Grade     ▾  │  │   │
│  │  └───────────────────────────────┘  │   │
│  │                                     │   │
│  │  ┌───────────────────────────────┐  │   │
│  │  │  Program of Interest       ▾  │  │   │
│  │  └───────────────────────────────┘  │   │
│  │                                     │   │
│  │  [    Send Enquiry »           ]    │   │
│  │                                     │   │
│  │  By submitting, you agree to be    │   │
│  │  contacted by our team.            │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ─────────────────────────────────────     │
│                                             │
│  OR REACH US DIRECTLY                       │
│                                             │
│  📞  [+91 XXXXXXXXXX]                      │
│                                             │
│  💬  [Chat on WhatsApp →]                  │
│                                             │
│  📍  [Street, Bhandara, Maharashtra]        │
│      [View on Google Maps →]               │
│                                             │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░  [ Google Maps Embed ]              ░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                             │
└─────────────────────────────────────────────┘
```

**Section Hierarchy:**
```
6. Contact Section
├── 6.1 Section Header
│   ├── 6.1.1 Overline ("Enquire Now")
│   ├── 6.1.2 H2 Heading
│   └── 6.1.3 Supporting text
│
├── 6.2 Enquiry Form [HIGHEST CONVERSION PRIORITY]
│   ├── Full Name field
│   ├── Phone Number field
│   ├── Grade / Class dropdown
│   ├── Program of Interest dropdown
│   ├── Submit CTA button ("Send Enquiry →")
│   └── Consent note (legal)
│
├── 6.3 Divider ("OR REACH US DIRECTLY")
│
├── 6.4 Direct Contact Options
│   ├── Phone (click-to-call)
│   ├── WhatsApp (click-to-chat)
│   └── Physical Address + Maps link
│
└── 6.5 Google Maps Embed
    └── Interactive map (Bhandara branch pin)
```

**Content Hierarchy:**
```
Priority 1 → Enquiry Form (conversion)
Priority 2 → Phone number (immediate contact)
Priority 3 → WhatsApp (preferred channel for many)
Priority 4 → H2 Heading
Priority 5 → Physical address
Priority 6 → Google Maps embed
Priority 7 → Supporting copy
```

**Component Hierarchy:**
```
ContactSection
├── SectionHeader
│   ├── EyebrowLabel
│   ├── HeadlineH2
│   └── SupportingText
├── EnquiryForm
│   ├── FormField — Name (text input)
│   ├── FormField — Phone (tel input)
│   ├── FormField — Grade (select dropdown)
│   ├── FormField — Program (select dropdown)
│   ├── ButtonPrimary ("Send Enquiry →")
│   └── ConsentText
├── OrDivider
├── DirectContactList
│   ├── ContactItem — Phone
│   │   ├── Icon
│   │   ├── Phone number (tel: link)
│   │   └── Label
│   ├── ContactItem — WhatsApp
│   │   ├── Icon
│   │   ├── CTA link
│   │   └── Label
│   └── ContactItem — Address
│       ├── Icon
│       ├── Address text
│       └── "View on Maps" link
└── MapEmbed (Google Maps iframe)
```

---
---

## GLOBAL: Footer

```
┌─────────────────────────────────────────────┐
│                                             │
│  SHIKSHA CLASSES                            │
│  ─────────────────                          │
│  Bhandara's Premier Coaching Institute      │
│                                             │
│  📞  +91 XXXXXXXXXX                        │
│  ✉   enquiries@...                         │
│  💬  WhatsApp →                            │
│                                             │
│  ─────────────────────────────────────     │
│                                             │
│  PROGRAMMES          QUICK LINKS            │
│  ───────────         ──────────             │
│  JEE Prep            Home                   │
│  NEET Prep           Results                │
│  MHT-CET             Gallery                │
│  Foundation          Blog                   │
│                      Careers                │
│                      Contact                │
│                                             │
│  STUDY RESOURCES     FOLLOW US              │
│  ────────────────    ──────────             │
│  Physics             Facebook               │
│  Chemistry           Instagram              │
│  Mathematics         YouTube                │
│  Biology                                    │
│                                             │
│  ─────────────────────────────────────     │
│                                             │
│  © 2025 Shiksha Classes, Bhandara           │
│  Privacy Policy · Terms of Use             │
│                                             │
└─────────────────────────────────────────────┘
```

---
---

# DESKTOP WIREFRAME NOTES (1024px+)

The following changes apply to desktop layout. All sections remain the same content — layout shifts only.

```
DESKTOP LAYOUT CHANGES:
─────────────────────────────────────────────────────────────

Section 1 — HERO
  Mobile:  Stacked (image full-bleed, content overlaid, stats below)
  Desktop: Two-column — content left (50%), image right (50%), stats below

Section 2 — PROGRAMS
  Mobile:  Single column card stack
  Desktop: 2×2 grid (JEE + NEET top row | MHT-CET + Foundation bottom row)

Section 3 — RESULTS
  Mobile:  Carousel with 2 visible cards
  Desktop: Grid of 4 cards visible, no carousel — tabs still filter

Section 4 — RESOURCES
  Mobile:  Single column card stack
  Desktop: 3 resource cards in a row

Section 5 — TESTIMONIALS
  Mobile:  Single featured quote + 2 mini below
  Desktop: Large featured quote left + 3 mini cards stacked right

Section 6 — CONTACT
  Mobile:  Form stacked → direct contact → map (full width)
  Desktop: Two-column — Form left (60%) | Direct contact + map right (40%)

Footer:
  Mobile:  2-column link grid
  Desktop: 4-column link grid with logo/description left-aligned
```

---
---

# PAGE HIERARCHY SUMMARY

```
HOME PAGE — SECTION ORDER & PURPOSE

  ┌── 0. Navbar                (Persistent navigation, sticky)
  │
  ├── 1. Hero                  [Purpose: Capture attention, communicate value, generate enquiry]
  │        Enquiry intent: PRIMARY — direct CTA in hero
  │
  ├── 2. Programs              [Purpose: Help visitor self-select; route to deep pages]
  │        Enquiry intent: SECONDARY — each card links to program page with own form
  │
  ├── 3. Results               [Purpose: Build credibility before deeper commitment]
  │        Enquiry intent: TERTIARY — "See All Results" links to /results/ with CTA
  │
  ├── 4. Resources             [Purpose: Demonstrate expertise; attract non-ready visitors]
  │        Enquiry intent: SOFT — builds trust, may return later
  │
  ├── 5. Testimonials          [Purpose: Final trust nudge for hesitant parents]
  │        Enquiry intent: SECONDARY — emotional push before contact section
  │
  ├── 6. Contact               [Purpose: Final conversion; lowest-friction enquiry point]
  │        Enquiry intent: PRIMARY — form is the last thing before footer
  │
  └── Footer                   (Navigation utility, local SEO address, social links)
```

---

*Wireframe version: 1.0 · Mobile-First · Low Fidelity*
*Shiksha Classes Home Page — Pre-Design Phase*
