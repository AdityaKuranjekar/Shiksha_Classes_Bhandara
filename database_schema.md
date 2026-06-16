# MongoDB Schema Design — Shiksha Classes
### Production-Grade Mongoose Schemas · All Collections

---

> [!NOTE]
> All schemas use `{ timestamps: true }` which automatically adds `createdAt` and `updatedAt` fields managed by Mongoose.
> All `_id` fields are MongoDB's default `ObjectId` unless stated otherwise.
> All string fields use `trim: true` unless a raw format is required.

---

## 1. `admins`

**Purpose:** Stores admin user accounts. Designed for a single admin today, extensible to a role-based multi-admin system.

```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Admin name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    passwordHash: {
      type: String,
      required: true,
      select: false, // Never returned in queries by default
    },
    role: {
      type: String,
      enum: ['super_admin', 'editor', 'viewer'],
      default: 'super_admin',
      // Currently only 'super_admin' exists. enum pre-wired for future RBAC.
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
    refreshTokenHash: {
      type: String,
      select: false,
      default: null,
      // Stores hashed refresh token to enable server-side logout invalidation.
    },
    passwordResetToken: {
      type: String,
      select: false,
      default: null,
    },
    passwordResetExpiry: {
      type: Date,
      select: false,
      default: null,
    },
    loginAttempts: {
      type: Number,
      default: 0,
      // Brute-force protection: lock account after N failed attempts.
    },
    lockedUntil: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// --- Indexes ---
AdminSchema.index({ email: 1 }, { unique: true });
AdminSchema.index({ isActive: 1 });

// --- Instance Methods ---
AdminSchema.methods.comparePassword = async function (plaintext) {
  return bcrypt.compare(plaintext, this.passwordHash);
};

AdminSchema.methods.isLocked = function () {
  return this.lockedUntil && this.lockedUntil > new Date();
};

// --- Pre-save hook: hash password ---
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  next();
});

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
```

**Relationships:** None (standalone auth collection).

**Future Extensibility:**
- Add `permissions: [String]` array for granular permission flags (e.g., `'results:write'`, `'leads:read'`).
- Add `twoFactorSecret` and `twoFactorEnabled` fields for TOTP 2FA.
- Add `avatar.secureUrl` and `avatar.publicId` for admin profile photos.

---

## 2. `homepage_content`

**Purpose:** Stores all editable sections of the Home page as a single document (singleton pattern). The admin edits the homepage via CMS; the frontend fetches this one document.

```javascript
const HomepageContentSchema = new mongoose.Schema(
  {
    // Singleton guard — only one document of this type should exist.
    _singleton: {
      type: String,
      default: 'homepage',
      unique: true,
      immutable: true,
    },

    // ── Hero Section ───────────────────────────────────────────────
    hero: {
      headline: {
        type: String,
        required: true,
        maxlength: [120, 'Headline cannot exceed 120 characters'],
        default: "Bhandara's Premier JEE, NEET & MHT-CET Coaching",
      },
      subheadline: {
        type: String,
        maxlength: [200, 'Subheadline cannot exceed 200 characters'],
      },
      ctaLabel: {
        type: String,
        default: 'Enquire Now',
        maxlength: 40,
      },
      ctaUrl: {
        type: String,
        default: '/contact',
      },
      backgroundImageSecureUrl: { type: String, default: null },
      backgroundImagePublicId: { type: String, default: null },
    },

    // ── Stats Bar ──────────────────────────────────────────────────
    stats: [
      {
        label: { type: String, required: true, maxlength: 60 },
        // e.g., "Total Selections", "Years of Excellence"
        value: { type: String, required: true, maxlength: 20 },
        // e.g., "500+", "8"
        icon: { type: String, default: null },
        // Icon identifier string for frontend icon library lookup
        order: { type: Number, default: 0 },
      },
    ],

    // ── Marquee / Announcement Banner ─────────────────────────────
    announcement: {
      isVisible: { type: Boolean, default: false },
      text: { type: String, maxlength: [300, 'Announcement too long'] },
      linkLabel: { type: String, maxlength: 40 },
      linkUrl: { type: String },
    },

    // ── Why Shiksha Section ────────────────────────────────────────
    whyShiksha: {
      heading: { type: String, maxlength: 100 },
      body: { type: String, maxlength: 1000 },
      // Markdown or plain text block
      points: [
        {
          title: { type: String, maxlength: 80 },
          description: { type: String, maxlength: 200 },
          icon: { type: String },
          order: { type: Number, default: 0 },
        },
      ],
    },

    // ── SEO Overrides ──────────────────────────────────────────────
    seo: {
      metaTitle: { type: String, maxlength: [70, 'SEO title must be ≤ 70 chars'] },
      metaDescription: { type: String, maxlength: [160, 'Meta description must be ≤ 160 chars'] },
      ogImageSecureUrl: { type: String, default: null },
      ogImagePublicId: { type: String, default: null },
    },
  },
  { timestamps: true }
);

// --- Indexes ---
HomepageContentSchema.index({ _singleton: 1 }, { unique: true });
```

**Relationships:**
- Results (featured toppers on homepage) are fetched live from the `results` collection via a separate query, not embedded here — prevents stale data.
- Programs section on the homepage is fetched from `programs` collection.

**Future Extensibility:**
- Add `testimonials: [{ quote, studentName, program, year, imageSecureUrl }]` sub-array.
- Add `videoSectionUrl` for an embedded YouTube/Cloudinary video highlight.

---

## 3. `programs`

**Purpose:** Stores detailed content for each of the 4 coaching programs. Used to power program landing pages.

```javascript
const FacultyReferenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qualification: { type: String },
  experience: { type: String },
  subject: { type: String },
  imageSecureUrl: { type: String, default: null },
  imagePublicId: { type: String, default: null },
  order: { type: Number, default: 0 },
}, { _id: true });

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true, maxlength: 300 },
  answer: { type: String, required: true, maxlength: 1000 },
  order: { type: Number, default: 0 },
}, { _id: true });

const ProgramSchema = new mongoose.Schema(
  {
    // Stable identifier used in URL: 'jee', 'neet', 'mht-cet', 'previse-foundation'
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      enum: ['jee', 'neet', 'mht-cet', 'previse-foundation'],
    },
    name: {
      type: String,
      required: true,
      // e.g., "JEE Preparation", "Previse Foundation"
    },
    shortDescription: {
      type: String,
      required: true,
      maxlength: [200, 'Short description for cards must be ≤ 200 chars'],
    },
    fullDescription: {
      type: String,
      // Markdown — rendered on program landing page "Overview" tab
    },

    // ── Target Audience ────────────────────────────────────────────
    targetGrades: {
      type: [String],
      // e.g., ['11', '12', 'dropper'] or ['8', '9', '10']
    },
    examsCovered: {
      type: [String],
      // e.g., ['JEE Main', 'JEE Advanced']
    },

    // ── Curriculum ─────────────────────────────────────────────────
    curriculum: [
      {
        subject: { type: String, required: true },
        topics: [{ type: String }],
        order: { type: Number, default: 0 },
      },
    ],

    // ── Key Features / USPs ────────────────────────────────────────
    features: [
      {
        title: { type: String, required: true, maxlength: 80 },
        description: { type: String, maxlength: 200 },
        icon: { type: String },
        order: { type: Number, default: 0 },
      },
    ],

    // ── Faculty (embedded snapshot — not a foreign key reference) ──
    // Snapshot approach chosen intentionally: program page faculty display
    // is editorial and curated independently of any future HR module.
    faculty: [FacultyReferenceSchema],

    // ── Admission Details ──────────────────────────────────────────
    admission: {
      batchStartDate: { type: String },
      // Stored as string for flexibility: "June 2025" or "2025-06-01"
      seatsAvailable: { type: Number, default: null },
      // null = "seats available" shown without a number
      feesDescription: { type: String, maxlength: 500 },
      // Descriptive text — no raw number to avoid confusion / outdated data
      admissionProcess: { type: String, maxlength: 500 },
    },

    // ── FAQs ───────────────────────────────────────────────────────
    faqs: [FAQSchema],

    // ── Hero / Thumbnail ───────────────────────────────────────────
    heroImageSecureUrl: { type: String, default: null },
    heroImagePublicId: { type: String, default: null },
    thumbnailSecureUrl: { type: String, default: null },
    thumbnailPublicId: { type: String, default: null },

    // ── State ──────────────────────────────────────────────────────
    isActive: {
      type: Boolean,
      default: true,
      // false = hidden from public; admin can preview
    },

    // ── SEO ────────────────────────────────────────────────────────
    seo: {
      metaTitle: { type: String, maxlength: 70 },
      metaDescription: { type: String, maxlength: 160 },
      ogImageSecureUrl: { type: String, default: null },
      ogImagePublicId: { type: String, default: null },
    },
  },
  { timestamps: true }
);

// --- Indexes ---
ProgramSchema.index({ slug: 1 }, { unique: true });
ProgramSchema.index({ isActive: 1 });
```

**Relationships:**
- `results` collection references `programSlug` — allows filtering results by program.
- `lead_forms` collection has `program` field matching these slugs.

**Future Extensibility:**
- Add `batchSchedule: [{ day, time, mode }]` for timetable display.
- Add `demoVideoUrl` for a program intro reel.
- Add `syllabusFileSecureUrl` for downloadable PDF syllabus.

---

## 4. `results`

**Purpose:** Stores individual student achievement cards (toppers) shown on the Results page and homepage carousel.

```javascript
const ResultSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
      maxlength: 100,
    },
    program: {
      type: String,
      required: true,
      enum: ['jee', 'neet', 'mht-cet', 'previse-foundation'],
      // Lowercase slug — matches programs.slug
    },
    examName: {
      type: String,
      required: true,
      // e.g., "JEE Main", "JEE Advanced", "NEET UG", "MHT-CET"
    },
    score: {
      type: String,
      required: true,
      // Flexible string: "99.85 Percentile", "680/720", "185/200"
    },
    rank: {
      type: String,
      default: null,
      // e.g., "AIR 312", "State Rank 8", null if not applicable
    },
    year: {
      type: String,
      required: true,
      match: [/^\d{4}$/, 'Year must be a 4-digit string'],
      // e.g., "2025"
    },
    studentImageSecureUrl: {
      type: String,
      required: [true, 'Student photo is required'],
    },
    studentImagePublicId: {
      type: String,
      required: true,
    },
    testimonialQuote: {
      type: String,
      default: null,
      maxlength: [500, 'Testimonial cannot exceed 500 characters'],
    },

    // ── Display Controls ───────────────────────────────────────────
    isFeatured: {
      type: Boolean,
      default: false,
      // true = shown in homepage carousel and top of /results/
    },
    priorityWeight: {
      type: Number,
      default: 0,
      // Higher weight = shown earlier. Admin can drag-and-drop to reorder.
    },
    isVisible: {
      type: Boolean,
      default: true,
      // false = hidden without deletion (admin can toggle)
    },
  },
  { timestamps: true }
);

// --- Indexes ---
ResultSchema.index({ program: 1, year: -1, priorityWeight: -1 });
ResultSchema.index({ isFeatured: 1, priorityWeight: -1 });
ResultSchema.index({ year: 1 });
ResultSchema.index({ isVisible: 1 });
```

**Relationships:**
- `program` field is a slug-based soft reference to `programs.slug` (not a foreign key — intentional; results are historical and must survive program config changes).

**Future Extensibility:**
- Add `collegeAdmitted` (e.g., "IIT Bombay — CSE") for richer social proof.
- Add `videoTestimonialUrl` (Cloudinary video or YouTube link).
- Add `batchYear` (the academic year the student studied at Shiksha Classes, distinct from the exam year).

---

## 5. `blogs`

**Purpose:** Full blog post storage for the `/blog/` hub and individual post pages.

```javascript
const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      // e.g., "how-to-crack-neet-in-6-months"
      // Auto-generated from title on creation; admin can override.
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: [300, 'Excerpt cannot exceed 300 characters'],
      // Short summary shown on /blog/ listing cards
    },
    contentMarkdown: {
      type: String,
      required: [true, 'Blog content is required'],
      // Full Markdown body
    },
    category: {
      type: String,
      required: true,
      enum: ['Study Tips', 'Exam News', 'Career Guidance', 'Institute Updates', 'Subject Deep-Dives'],
    },
    tags: {
      type: [String],
      default: [],
      // e.g., ["JEE", "Physics", "Mechanics"]
      // Used for related posts and tag-cloud filtering
    },
    coverImageSecureUrl: {
      type: String,
      default: null,
    },
    coverImagePublicId: {
      type: String,
      default: null,
    },
    authorName: {
      type: String,
      default: 'Shiksha Classes Editorial Team',
      maxlength: 100,
      // Kept as a plain string — not a foreign key to admins collection.
      // Keeps blog content independent of admin account changes.
    },

    // ── Publication Control ────────────────────────────────────────
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    publishedAt: {
      type: Date,
      default: null,
      // Set when status transitions from 'draft' → 'published'
    },
    scheduledAt: {
      type: Date,
      default: null,
      // Future: scheduled publishing support
    },

    // ── SEO ────────────────────────────────────────────────────────
    seo: {
      metaTitle: { type: String, maxlength: 70 },
      metaDescription: { type: String, maxlength: 160 },
      canonicalUrl: { type: String, default: null },
      ogImageSecureUrl: { type: String, default: null },
      ogImagePublicId: { type: String, default: null },
    },

    // ── Engagement Metrics (passive, no user logins) ───────────────
    viewCount: {
      type: Number,
      default: 0,
      // Incremented server-side on each page visit
    },
  },
  { timestamps: true }
);

// --- Indexes ---
BlogSchema.index({ slug: 1 }, { unique: true });
BlogSchema.index({ status: 1, publishedAt: -1 });
BlogSchema.index({ category: 1, status: 1 });
BlogSchema.index({ tags: 1 });
BlogSchema.index({ viewCount: -1 });
// Text index for admin search
BlogSchema.index({ title: 'text', excerpt: 'text', tags: 'text' });
```

**Relationships:**
- Contextual links to `programs` are editorial (inline Markdown links), not foreign keys.
- `resources` cross-linking is handled via Markdown content.

**Future Extensibility:**
- Add `relatedResourceIds: [ObjectId]` for curated "Read Also" resource links.
- Add `relatedProgramSlugs: [String]` for contextual program promotion at end of post.
- Add `commentCount` and external Disqus/commenting integration.

---

## 6. `resources`

**Purpose:** Stores study materials — formula sheets, notes, PYQs, downloadable PDFs. Powers the `/resources/` hub.

```javascript
const ResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Resource title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: [400, 'Description cannot exceed 400 characters'],
    },
    contentMarkdown: {
      type: String,
      default: null,
      // Optional rich article body — for "blog-style" resource pages
    },
    category: {
      type: String,
      required: true,
      enum: ['Formula Sheets', 'Previous Year Papers', 'Notes', 'Study Guides', 'Revision Checklists'],
    },
    subject: {
      type: String,
      required: true,
      enum: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'General'],
      // General = cross-subject (e.g., "Time Management Guide")
    },
    targetPrograms: {
      type: [String],
      enum: ['jee', 'neet', 'mht-cet', 'previse-foundation', 'all'],
      default: ['all'],
      // Allows filtering: "Show Physics resources relevant to JEE"
    },

    // ── File Attachment ────────────────────────────────────────────
    fileSecureUrl: {
      type: String,
      default: null,
      // Cloudinary PDF URL — null means article-only (no download)
    },
    filePublicId: {
      type: String,
      default: null,
    },
    fileType: {
      type: String,
      enum: ['pdf', 'image', 'none'],
      default: 'none',
    },

    // ── Thumbnail ──────────────────────────────────────────────────
    thumbnailSecureUrl: { type: String, default: null },
    thumbnailPublicId: { type: String, default: null },

    // ── Display Controls ───────────────────────────────────────────
    isFeatured: {
      type: Boolean,
      default: false,
      // Featured resources appear in the homepage "Free Resources" strip
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    publishedAt: {
      type: Date,
      default: null,
    },

    // ── Engagement ─────────────────────────────────────────────────
    downloadCount: {
      type: Number,
      default: 0,
    },
    viewCount: {
      type: Number,
      default: 0,
    },

    // ── SEO ────────────────────────────────────────────────────────
    seo: {
      metaTitle: { type: String, maxlength: 70 },
      metaDescription: { type: String, maxlength: 160 },
    },
  },
  { timestamps: true }
);

// --- Indexes ---
ResourceSchema.index({ slug: 1 }, { unique: true });
ResourceSchema.index({ category: 1, subject: 1, status: 1 });
ResourceSchema.index({ targetPrograms: 1, status: 1 });
ResourceSchema.index({ isFeatured: 1, status: 1 });
ResourceSchema.index({ downloadCount: -1 });
ResourceSchema.index({ title: 'text', description: 'text' });
```

**Relationships:**
- `targetPrograms` soft-references `programs.slug` values.

**Future Extensibility:**
- Add `difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] }`.
- Add `relatedResourceIds: [ObjectId]` for "You may also like" section.
- Add `videoUrl` for video-based study resources.

---

## 7. `gallery`

**Purpose:** Stores all gallery images (classrooms, events, celebrations, campus). Powers the `/gallery/` page.

```javascript
const GallerySchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      trim: true,
      maxlength: [200, 'Caption cannot exceed 200 characters'],
    },
    altText: {
      type: String,
      required: [true, 'Alt text is required for accessibility and SEO'],
      trim: true,
      maxlength: 200,
      // e.g., "Students celebrating JEE results at Shiksha Classes Bhandara 2025"
    },
    imageSecureUrl: {
      type: String,
      required: true,
    },
    imagePublicId: {
      type: String,
      required: true,
    },

    // ── Cloudinary variants (generated by Cloudinary transformations) ──
    thumbnailSecureUrl: {
      type: String,
      default: null,
      // 400×300 version for gallery grid
    },

    category: {
      type: String,
      required: true,
      enum: ['Classrooms', 'Events', 'Results Celebrations', 'Campus Life', 'Faculty', 'Awards'],
    },

    // ── Display Controls ───────────────────────────────────────────
    isVisible: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      // Featured images appear in homepage gallery preview strip
    },
    order: {
      type: Number,
      default: 0,
      // Manual ordering within category
    },

    // ── Metadata ───────────────────────────────────────────────────
    takenAt: {
      type: Date,
      default: null,
      // Optional event date — used for sorting "newest events first"
    },
    eventName: {
      type: String,
      default: null,
      // e.g., "JEE Results Day 2025"
    },
  },
  { timestamps: true }
);

// --- Indexes ---
GallerySchema.index({ category: 1, isVisible: 1, order: 1 });
GallerySchema.index({ isFeatured: 1, isVisible: 1 });
GallerySchema.index({ takenAt: -1 });
```

**Future Extensibility:**
- Add `mediaType: { enum: ['image', 'video'] }` and `videoSecureUrl` to support video clips.
- Add `albumId: ObjectId` for grouping images into named albums.

---

## 8. `career_openings`

**Purpose:** Stores active (and past) faculty/staff job openings listed on `/careers/`.

```javascript
const CareerOpeningSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      maxlength: [120, 'Job title cannot exceed 120 characters'],
      // e.g., "Senior Physics Faculty — JEE"
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      // e.g., "senior-physics-faculty-jee-bhandara"
    },
    department: {
      type: String,
      required: true,
      enum: ['Academic Faculty', 'Counselling', 'Administration', 'Operations'],
    },
    subject: {
      type: String,
      default: null,
      // Relevant for Academic Faculty; null for admin roles
    },
    programsAssigned: {
      type: [String],
      enum: ['jee', 'neet', 'mht-cet', 'previse-foundation', 'all'],
      default: [],
    },
    jobDescription: {
      type: String,
      required: true,
      // Markdown — rendered on job detail page
    },
    responsibilities: {
      type: [String],
      // Bullet list of key duties
    },
    qualifications: {
      type: [String],
      // Bullet list of required qualifications
    },
    experienceRequired: {
      type: String,
      // e.g., "Minimum 3 years in IIT-JEE coaching"
    },
    employmentType: {
      type: String,
      enum: ['Full-Time', 'Part-Time', 'Contract'],
      default: 'Full-Time',
    },
    location: {
      type: String,
      default: 'Bhandara, Maharashtra',
      // Hard-coded default; kept as field for future multi-branch
    },
    status: {
      type: String,
      enum: ['active', 'closed', 'paused'],
      default: 'active',
    },
    applicationDeadline: {
      type: Date,
      default: null,
      // null = rolling applications
    },
    // Internal — not shown publicly
    applicationCount: {
      type: Number,
      default: 0,
      // Denormalized counter; incremented on each application submit
    },
  },
  { timestamps: true }
);

// --- Indexes ---
CareerOpeningSchema.index({ slug: 1 }, { unique: true });
CareerOpeningSchema.index({ status: 1, createdAt: -1 });
CareerOpeningSchema.index({ department: 1, status: 1 });
```

**Relationships:**
- `career_applications.jobId` → `career_openings._id` (one-to-many).

**Future Extensibility:**
- Add `salaryRange: { min: Number, max: Number, currency: String }` when salary disclosure is desired.

---

## 9. `career_applications`

**Purpose:** Stores all job applications submitted via `/careers/[job-slug]/`.

```javascript
const CareerApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CareerOpening',
      required: [true, 'Job reference is required'],
    },
    // Denormalized snapshot — job title at time of application
    // Prevents broken references if the job post is later edited/deleted
    jobTitleSnapshot: {
      type: String,
      required: true,
    },

    applicantName: {
      type: String,
      required: [true, 'Applicant name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Provide a valid 10-digit Indian mobile number'],
    },
    currentLocation: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    yearsOfExperience: {
      type: Number,
      min: 0,
      max: 50,
    },
    coverNote: {
      type: String,
      maxlength: [600, 'Cover note cannot exceed 600 characters'],
      default: null,
    },

    // ── Resume File ────────────────────────────────────────────────
    resumeSecureUrl: {
      type: String,
      required: [true, 'Resume upload is required'],
    },
    resumePublicId: {
      type: String,
      required: true,
    },

    // ── Pipeline Status ────────────────────────────────────────────
    status: {
      type: String,
      enum: ['Applied', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Rejected'],
      default: 'Applied',
    },
    statusHistory: [
      {
        status: { type: String },
        changedAt: { type: Date, default: Date.now },
        note: { type: String, maxlength: 300 },
        // Internal note at time of status change
      },
    ],

    // ── Internal Notes ─────────────────────────────────────────────
    internalNotes: {
      type: String,
      default: null,
      maxlength: 1000,
    },

    // ── Source Tracking ────────────────────────────────────────────
    utmSource: { type: String, default: null },
    // e.g., "naukri", "facebook", "direct"
  },
  { timestamps: true }
);

// --- Indexes ---
CareerApplicationSchema.index({ jobId: 1, status: 1, createdAt: -1 });
CareerApplicationSchema.index({ email: 1 });
CareerApplicationSchema.index({ status: 1 });
// Compound index for common admin query: all apps for a job, sorted by date
CareerApplicationSchema.index({ jobId: 1, createdAt: -1 });
```

**Relationships:**
- `jobId` → `career_openings._id` (populated via `.populate('jobId')` in queries).
- `career_openings.applicationCount` is incremented atomically on insert.

**Validation Rule:** Prevent duplicate applications from the same email for the same job:
```javascript
// Enforced at application layer before insert:
const exists = await CareerApplication.findOne({ jobId, email });
if (exists) throw new ConflictError('You have already applied for this position.');
```

---

## 10. `lead_forms`

**Purpose:** Captures all admission enquiry submissions from any entry point on the public site.

```javascript
const LeadNoteSchema = new mongoose.Schema({
  content: { type: String, required: true, maxlength: 500 },
  author: { type: String, default: 'Admin' },
  createdAt: { type: Date, default: Date.now },
}, { _id: true });

const LeadFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Provide a valid 10-digit Indian mobile number'],
    },
    email: {
      type: String,
      default: null,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Provide a valid email'],
      sparse: true, // Allows null + unique-like behaviour without duplicate null conflicts
    },
    grade: {
      type: String,
      required: [true, 'Current class/grade is required'],
      enum: ['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'Dropper', 'Other'],
    },
    program: {
      type: String,
      required: [true, 'Program of interest is required'],
      enum: ['jee', 'neet', 'mht-cet', 'previse-foundation', 'not-sure'],
    },
    message: {
      type: String,
      default: null,
      maxlength: [500, 'Message cannot exceed 500 characters'],
    },

    // ── Source Tracking ────────────────────────────────────────────
    source: {
      type: String,
      enum: [
        'home_hero',          // Home page hero form
        'program_page',       // Inline form on program subpage
        'contact_page',       // /contact/ full form
        'blog_cta',           // End-of-blog CTA
        'results_cta',        // /results/ CTA
        'sticky_cta',         // Floating sticky CTA button
        'other',
      ],
      default: 'other',
    },
    programPageSource: {
      type: String,
      default: null,
      // If source = 'program_page', which program slug triggered it
    },
    utmSource: { type: String, default: null },
    utmMedium: { type: String, default: null },
    utmCampaign: { type: String, default: null },
    referrerUrl: { type: String, default: null },

    // ── CRM Pipeline ───────────────────────────────────────────────
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Visit Scheduled', 'Enrolled', 'Closed'],
      default: 'New',
    },
    assignedTo: {
      type: String,
      default: null,
      // Counselor name — string for now; future: ObjectId ref to admins
    },
    followUpDate: {
      type: Date,
      default: null,
      // Admin can set a follow-up reminder date
    },
    notes: [LeadNoteSchema],
    // Thread of internal counselor notes per lead

    // ── Duplicate Detection ────────────────────────────────────────
    isDuplicate: {
      type: Boolean,
      default: false,
      // Set by application layer if same phone submitted within 30 days
    },
    duplicateOfId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LeadForm',
      default: null,
    },
  },
  { timestamps: true }
);

// --- Indexes ---
LeadFormSchema.index({ status: 1, createdAt: -1 });
LeadFormSchema.index({ phone: 1, createdAt: -1 });
LeadFormSchema.index({ program: 1, status: 1 });
LeadFormSchema.index({ source: 1 });
LeadFormSchema.index({ followUpDate: 1, status: 1 });
// Compound for duplicate detection query
LeadFormSchema.index({ phone: 1 });
```

**Duplicate Detection Logic (Application Layer):**
```javascript
// Before saving a new lead, check for recent submission from same phone
const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
const existing = await LeadForm.findOne({
  phone: newLead.phone,
  createdAt: { $gte: thirtyDaysAgo }
}).sort({ createdAt: -1 });

if (existing) {
  newLead.isDuplicate = true;
  newLead.duplicateOfId = existing._id;
}
// Save anyway — don't block the user; admin can filter by isDuplicate
```

---

## 11. `settings`

**Purpose:** Singleton collection storing site-wide configuration — contact info, social links, SEO defaults, feature flags.

```javascript
const SettingsSchema = new mongoose.Schema(
  {
    // Singleton guard
    _singleton: {
      type: String,
      default: 'site_settings',
      unique: true,
      immutable: true,
    },

    // ── Institute Details ──────────────────────────────────────────
    instituteName: {
      type: String,
      default: 'Shiksha Classes',
      maxlength: 100,
    },
    tagline: {
      type: String,
      maxlength: 200,
    },
    address: {
      line1: { type: String, maxlength: 200 },
      line2: { type: String, maxlength: 200 },
      city: { type: String, default: 'Bhandara' },
      state: { type: String, default: 'Maharashtra' },
      pincode: { type: String, match: [/^\d{6}$/, 'Invalid pincode'] },
    },
    phone: {
      primary: { type: String },
      secondary: { type: String, default: null },
    },
    email: {
      enquiries: { type: String },
      careers: { type: String },
    },
    whatsappNumber: {
      type: String,
      // Used for wa.me/ links
    },
    googleMapsEmbedUrl: {
      type: String,
      // Full <iframe> src URL for the embedded map
    },

    // ── Social Media Links ─────────────────────────────────────────
    socialLinks: {
      facebook: { type: String, default: null },
      instagram: { type: String, default: null },
      youtube: { type: String, default: null },
      twitter: { type: String, default: null },
      linkedin: { type: String, default: null },
    },

    // ── Global SEO Defaults ────────────────────────────────────────
    seoDefaults: {
      metaTitleSuffix: {
        type: String,
        default: '| Shiksha Classes Bhandara',
      },
      defaultMetaDescription: {
        type: String,
        maxlength: 160,
      },
      defaultOgImageSecureUrl: { type: String, default: null },
      defaultOgImagePublicId: { type: String, default: null },
      googleSiteVerificationToken: { type: String, default: null },
    },

    // ── Feature Flags ──────────────────────────────────────────────
    features: {
      showAnnouncementBanner: { type: Boolean, default: false },
      enableBlog: { type: Boolean, default: true },
      enableGallery: { type: Boolean, default: true },
      enableCareers: { type: Boolean, default: true },
      maintenanceMode: { type: Boolean, default: false },
    },

    // ── Analytics ─────────────────────────────────────────────────
    analytics: {
      googleAnalyticsId: { type: String, default: null },
      // e.g., "G-XXXXXXXXXX"
      googleTagManagerId: { type: String, default: null },
      facebookPixelId: { type: String, default: null },
    },

    // ── Legal ──────────────────────────────────────────────────────
    legal: {
      privacyPolicyUrl: { type: String, default: null },
      termsOfUseUrl: { type: String, default: null },
      copyrightYear: { type: Number, default: new Date().getFullYear() },
    },
  },
  { timestamps: true }
);

// --- Index ---
SettingsSchema.index({ _singleton: 1 }, { unique: true });
```

**Access Pattern:**
```javascript
// Always fetch using upsert to guarantee document exists
const settings = await Settings.findOneAndUpdate(
  { _singleton: 'site_settings' },
  { $setOnInsert: { _singleton: 'site_settings' } },
  { upsert: true, new: true, setDefaultsOnInsert: true }
);
```

**Future Extensibility:**
- Add `emailConfig: { provider, apiKey }` for integrated transactional email.
- Add `razorpayConfig` section when online fee payment is introduced.
- Add `branches: [{ name, address, phone }]` for multi-branch expansion.

---

## Summary: Collections & Index Map

| Collection | Approx. Document Count | Primary Query Patterns |
|---|---|---|
| `admins` | 1–5 | By email (auth), by isActive |
| `homepage_content` | 1 (singleton) | By `_singleton` key |
| `programs` | 4 | By slug, by isActive |
| `results` | 50–500 | By program + year + weight, by isFeatured |
| `blogs` | 10–500 | By status + publishedAt, by category, text search |
| `resources` | 20–1000 | By category + subject + status, by isFeatured |
| `gallery` | 20–500 | By category + isVisible + order, by isFeatured |
| `career_openings` | 1–20 | By status, by slug |
| `career_applications` | 10–500 | By jobId + status, by email |
| `lead_forms` | 100–10000 | By status + createdAt, by phone, by program |
| `settings` | 1 (singleton) | By `_singleton` key |
