# Admin Portal Workflows — Shiksha Classes
### Complete Module Specifications · Single Admin · Production-Grade

---

> [!IMPORTANT]
> Current state: **One super_admin** account. All modules grant full CRUD access to this account.
> The permission column documents the permission flag required — pre-wired for future RBAC expansion.
> Authentication: JWT access token (15-min expiry) + HttpOnly refresh token (7-day expiry).

---

## Auth Layer: Login & Session

### Login Flow
```
Step 1  Admin navigates to /admin/login
Step 2  Enters email + password
Step 3  Client POSTs to POST /api/admin/auth/login
Step 4  Server:
          → Validates credentials (bcrypt compare)
          → Checks isActive = true
          → Checks isLocked = false (brute-force guard)
          → Issues JWT access token (15 min) in response body
          → Sets HttpOnly refresh token cookie (7 days)
          → Updates lastLoginAt
Step 5  Client stores access token in memory (not localStorage)
Step 6  Redirect to /admin/dashboard
```

### Session Persistence
```
On every page load / access token expiry:
  → Client sends GET /api/admin/auth/refresh (cookie sent automatically)
  → Server validates refresh token hash in DB
  → Issues new access token
  → Returns 401 if refresh token invalid → redirect to /admin/login
```

### Logout
```
  → Client calls POST /api/admin/auth/logout
  → Server nullifies refreshTokenHash in DB (server-side invalidation)
  → Clears cookie
  → Redirect to /admin/login
```

### Brute-Force Protection
```
After 5 failed login attempts:
  → Set lockedUntil = now + 15 minutes
  → Return 429 with time remaining
  → After lockout expires, loginAttempts resets to 0
```

---

## Module 1: Dashboard

### Purpose
Gives the admin an at-a-glance operational view of the institute's digital performance. The first screen seen after login.

### Permissions
`dashboard:read` — super_admin only.

### No CRUD operations — read-only aggregated view.

### Data Displayed

| Widget | Data Source | Query |
|---|---|---|
| New Leads (today) | `lead_forms` | `status: 'New', createdAt: { $gte: today }` |
| Total Active Leads | `lead_forms` | `status: { $in: ['New', 'Contacted', 'Visit Scheduled'] }` |
| Leads by Program | `lead_forms` | `$group by program` |
| Pending Follow-Ups | `lead_forms` | `followUpDate: { $lte: now }, status: { $ne: 'Enrolled' }` |
| New Applications | `career_applications` | `status: 'Applied', createdAt: { $gte: last7days }` |
| Published Blogs | `blogs` | `status: 'published', count` |
| Published Resources | `resources` | `status: 'published', count` |
| Total Results Listed | `results` | `isVisible: true, count` |
| Recent Leads Feed | `lead_forms` | Last 5 records, sorted `createdAt: -1` |

### UX Flow
```
1. Admin logs in → lands on /admin/dashboard
2. Dashboard renders 4 stat cards (Today's Leads, Active Pipeline, Pending Follow-ups, New Applications)
3. Below: mini-chart of leads by program (bar chart, last 30 days)
4. Below: "Recent Leads" table — 5 rows — Name, Phone, Program, Status, Time Ago
5. Each row → click → opens /admin/leads/[id] (Lead detail page)
6. Quick action shortcuts: [+ Add Result] [+ Upload Resource] [+ Post Blog]
7. Sidebar persistent nav: Dashboard, Leads, Results, Blog, Resources, Gallery, Careers, Settings
```

### Edge Cases
- If no leads today → stat card shows `0` with a neutral state (not an error).
- If DB query times out → show cached last-known values with a stale data warning badge.
- Dashboard is read-only — no accidental mutations possible.

---

## Module 2: Homepage Manager

### Purpose
Allows the admin to edit all content blocks of the homepage without touching code.

### Permissions
`homepage:read`, `homepage:write`

### CRUD Operations
| Operation | Endpoint | Notes |
|---|---|---|
| Read | `GET /api/admin/homepage` | Returns full `homepage_content` singleton |
| Update | `PUT /api/admin/homepage` | Full or partial update via `$set` |
| Upload Media | `POST /api/admin/media/signature` + Cloudinary | Hero background image, OG image |

### Sections Managed

#### 2.1 Hero Section
```
Fields: Headline, Subheadline, CTA Label, CTA URL
Media:  Hero Background Image (Cloudinary upload)
Action: Save → PUT /api/admin/homepage { hero: { ... } }
```

#### 2.2 Stats Bar
```
Actions:
  + Add Stat  → inline form: Label + Value + Icon identifier
  ✏ Edit Stat → inline editable row
  🗑 Delete Stat → confirmation modal before delete
  ↕ Reorder  → drag-and-drop; updates `order` field on all items
```

#### 2.3 Announcement Banner
```
Toggle: Show / Hide (isVisible boolean)
Fields: Announcement text, Link Label, Link URL
When isVisible = false → banner not rendered on site
```

#### 2.4 Why Shiksha Section
```
Fields: Section heading, body paragraph (plain text)
USP Points: add / edit / remove / reorder (same pattern as Stats)
```

#### 2.5 SEO Block
```
Fields: Meta Title, Meta Description, OG Image
Character counters: Title (max 70), Description (max 160)
Preview: rendered Google snippet preview (client-side)
```

### UX Flow
```
1. Admin opens /admin/homepage
2. Page renders all sections as collapsible accordion panels
3. Admin expands a panel → edits inline fields
4. Admin clicks "Save Section" → PATCH sent for that section only (partial update)
5. Success toast: "Homepage updated. Changes live in ~30 min" 
   (ISR revalidation time note — or instant if on-demand revalidation is wired)
6. Media upload: Admin clicks "Upload Image" → 
   a. Client requests signature from POST /api/admin/media/signature
   b. Client uploads directly to Cloudinary
   c. Cloudinary returns secureUrl + publicId
   d. Client stores in form state
   e. Included in next save operation
```

### Edge Cases
- **Unsaved changes guard**: If admin navigates away with unsaved changes → browser `beforeunload` prompt.
- **Image replace**: Uploading a new hero image must delete the old one from Cloudinary using the stored `publicId`. Server calls `cloudinary.uploader.destroy(oldPublicId)` on save.
- **Validation**: All saves run Zod validation server-side. Client shows field-level errors on 400 response.
- **Reorder conflicts**: Drag-and-drop submits the full new `order` array in one PATCH — not individual saves.

---

## Module 3: Results Manager

### Purpose
Add, edit, delete, and arrange student result/topper cards shown on `/results/` and the homepage carousel.

### Permissions
`results:read`, `results:write`, `results:delete`

### CRUD Operations
| Operation | Endpoint | Notes |
|---|---|---|
| List | `GET /api/admin/results?page=&program=&year=` | Paginated, filterable |
| Create | `POST /api/admin/results` | With Cloudinary image |
| Update | `PUT /api/admin/results/[id]` | All fields editable |
| Delete | `DELETE /api/admin/results/[id]` | Also destroys Cloudinary image |
| Reorder | `PATCH /api/admin/results/reorder` | Bulk `priorityWeight` update |
| Toggle Visibility | `PATCH /api/admin/results/[id]` `{ isVisible }` | Soft hide without delete |
| Toggle Featured | `PATCH /api/admin/results/[id]` `{ isFeatured }` | Add/remove from homepage carousel |

### UX Flow

#### List View (`/admin/results`)
```
1. Filter bar: Program (All / JEE / NEET / MHT-CET / Foundation) + Year
2. Results grid: student photo thumbnail, name, score, rank, program badge, year
3. Each card has: ✏ Edit | 👁 Toggle Visible | ⭐ Toggle Featured | 🗑 Delete
4. Top-right: [+ Add Result] button
5. Drag-to-reorder handle on each card (updates priorityWeight on drop)
```

#### Add/Edit Form
```
Fields:
  Student Name (text)
  Program (select: JEE / NEET / MHT-CET / Foundation)
  Exam Name (text: "JEE Main 2025", "NEET UG 2025")
  Score (text: "99.85 Percentile")
  Rank (text, optional)
  Year (text: "2025")
  Testimonial Quote (textarea, optional)
  Student Photo (Cloudinary upload — required)
  Featured toggle
  Visible toggle

Flow:
  1. Admin fills form
  2. Selects photo → client uploads to Cloudinary via signed URL
  3. secureUrl + publicId stored in form state
  4. Admin submits → POST /api/admin/results
  5. Server validates (Zod) + saves to MongoDB
  6. Success → list view refreshes
```

### Edge Cases
- **Delete guard**: Deleting a featured result that appears in the homepage carousel must warn: _"This result is featured on the homepage. Deleting it will remove it from the carousel. Proceed?"_
- **Image delete on result delete**: `DELETE` API must call `cloudinary.uploader.destroy(publicId)` before removing MongoDB record. If Cloudinary call fails — log error but still delete MongoDB record (stale Cloudinary asset is non-critical).
- **Duplicate detection**: No automated guard — admin is responsible for checking before adding.
- **Year filter mismatch**: If admin enters "25" instead of "2025" — Zod regex validation `/^\d{4}$/` rejects on save.

---

## Module 4: Blog Manager

### Purpose
Full CRUD for blog posts with Markdown editing, status management, and SEO control.

### Permissions
`blog:read`, `blog:write`, `blog:delete`, `blog:publish`

### CRUD Operations
| Operation | Endpoint | Notes |
|---|---|---|
| List | `GET /api/admin/blogs?page=&status=&category=` | Paginated |
| Create | `POST /api/admin/blogs` | Saved as `draft` by default |
| Read | `GET /api/admin/blogs/[id]` | Full document for editor |
| Update | `PUT /api/admin/blogs/[id]` | Full update |
| Delete | `DELETE /api/admin/blogs/[id]` | Destroys cover image from Cloudinary |
| Publish | `PATCH /api/admin/blogs/[id]` `{ status: 'published' }` | Sets `publishedAt` to now |
| Unpublish | `PATCH /api/admin/blogs/[id]` `{ status: 'draft' }` | Reverts to draft |
| Archive | `PATCH /api/admin/blogs/[id]` `{ status: 'archived' }` | Hidden from public |

### UX Flow

#### List View (`/admin/blog`)
```
1. Status tabs: All | Drafts | Published | Archived
2. Category filter dropdown
3. Search bar (title search)
4. Table rows: Cover thumbnail, Title, Category, Status badge, Views, Published Date, Actions
5. Actions: ✏ Edit | Publish/Unpublish toggle | 👁 Preview | 🗑 Delete
6. Top-right: [+ New Post] button
```

#### Blog Editor (`/admin/blog/[id]/edit` or `/admin/blog/new`)
```
Layout: Two-panel (editor left, preview right — collapsible on mobile)

Panels:
  LEFT — Editor:
    Title input (large)
    Slug (auto-generated from title; editable with warning if post is live)
    Excerpt (textarea, char counter)
    Category select
    Tags (comma-separated input with pill display)
    Cover Image (Cloudinary upload)
    Author Name (pre-filled with admin name; editable)
    Markdown Content Editor (with toolbar: Bold, Italic, H2, H3, Link, Image, List)

  RIGHT — Live Preview:
    Renders Markdown as HTML in real-time

  BOTTOM BAR:
    [Save Draft] [Publish] [Preview Live →] [SEO Settings ▾]

  SEO Drawer (slides up from bottom):
    Meta Title (char counter 0/70)
    Meta Description (char counter 0/160)
    OG Image (Cloudinary upload)
    Google snippet preview (rendered)
```

### Edge Cases
- **Slug conflict on publish**: If slug already exists for another post → show inline error "This slug is already in use. Please choose a different slug."
- **Editing live post slug**: Warn: _"Changing the slug of a published post will break existing links. A 301 redirect is recommended."_
- **Unsaved changes**: `beforeunload` guard on editor.
- **Cover image on delete**: Server must destroy Cloudinary image before deleting blog document.
- **View count increment**: `viewCount++` happens via a fire-and-forget server call on public page load — not in the admin module.

---

## Module 5: Resources Manager

### Purpose
Upload and manage study materials — PDFs, formula sheets, notes, and article-style resources.

### Permissions
`resources:read`, `resources:write`, `resources:delete`, `resources:publish`

### CRUD Operations
| Operation | Endpoint | Notes |
|---|---|---|
| List | `GET /api/admin/resources?page=&category=&subject=&status=` | Paginated |
| Create | `POST /api/admin/resources` | With optional file upload |
| Update | `PUT /api/admin/resources/[id]` | All fields |
| Delete | `DELETE /api/admin/resources/[id]` | Destroys file + thumbnail from Cloudinary |
| Toggle Featured | `PATCH /api/admin/resources/[id]` `{ isFeatured }` | Homepage strip |
| Publish/Draft | `PATCH /api/admin/resources/[id]` `{ status }` | |

### UX Flow

#### List View (`/admin/resources`)
```
1. Filter row: Category | Subject | Status | Target Program
2. Search bar (title search)
3. Table/grid: Thumbnail, Title, Category, Subject, Status, Downloads, Featured toggle, Actions
4. Actions: ✏ Edit | 📥 Download (preview PDF) | 👁 Toggle visible | 🗑 Delete
5. [+ Add Resource] button
```

#### Add/Edit Form
```
Fields:
  Title
  Slug (auto-generated)
  Description (textarea)
  Category (select: Formula Sheet / PYQ / Notes / Study Guide / Revision Checklist)
  Subject (select: Physics / Chemistry / Mathematics / Biology / General)
  Target Programs (multi-select checkboxes)
  Content Body (Markdown editor — optional, for article-style resources)
  File Upload (PDF — Cloudinary, optional)
  Thumbnail (Cloudinary image, optional)
  Featured toggle
  Status (Draft / Published)
  SEO block (meta title, description)
```

### Edge Cases
- **Resource with no file**: A resource can be article-only (no PDF). Both `fileSecureUrl` and `contentMarkdown` cannot be null simultaneously — server enforces: at least one must be present.
- **Replace PDF**: Uploading a new PDF must destroy the old Cloudinary file using the stored `filePublicId`.
- **Download count accuracy**: `downloadCount` is incremented server-side when the download endpoint is hit. Not managed in this module — only displayed.
- **Featured limit**: No hard cap on featured count — admin curates manually. Recommend showing a warning if >6 resources are featured (homepage strip typically shows 3–6).

---

## Module 6: Gallery Manager

### Purpose
Upload, organise, and manage all gallery images across categories.

### Permissions
`gallery:read`, `gallery:write`, `gallery:delete`

### CRUD Operations
| Operation | Endpoint | Notes |
|---|---|---|
| List | `GET /api/admin/gallery?category=` | All images |
| Upload (single) | `POST /api/admin/gallery` | One image + metadata |
| Bulk Upload | `POST /api/admin/gallery/bulk` | Multiple images in one request batch |
| Update | `PUT /api/admin/gallery/[id]` | Caption, altText, category, eventName |
| Delete | `DELETE /api/admin/gallery/[id]` | Destroys Cloudinary image |
| Toggle Visible | `PATCH /api/admin/gallery/[id]` `{ isVisible }` | |
| Toggle Featured | `PATCH /api/admin/gallery/[id]` `{ isFeatured }` | |
| Reorder | `PATCH /api/admin/gallery/reorder` | Bulk `order` update within category |

### UX Flow

#### Gallery Grid (`/admin/gallery`)
```
1. Category tabs: All | Classrooms | Events | Results Celebrations | Campus Life | Faculty | Awards
2. Grid view (3-col desktop, 2-col tablet, 1-col mobile)
3. Each image card: Thumbnail, Caption snippet, Category badge, Visible toggle, Featured star
4. Actions on hover: ✏ Edit | 🗑 Delete
5. Drag-to-reorder within category view
6. [+ Upload Image] button → opens upload modal
7. [Bulk Upload] button → allows selecting multiple files at once
```

#### Upload Modal
```
Step 1: Drop zone or file picker (accepts .jpg, .jpeg, .png, .webp)
Step 2: Image preview rendered client-side immediately
Step 3: Fields to fill:
  - Caption (optional)
  - Alt Text (required — placeholder suggested from filename)
  - Category (select)
  - Event Name (optional)
  - Date Taken (date picker, optional)
  - Featured toggle
Step 4: [Upload & Save] → 
  a. Client gets Cloudinary signature
  b. Client uploads to Cloudinary
  c. secureUrl + publicId + thumbnailSecureUrl sent to API
  d. MongoDB record created
Step 5: Success → gallery grid refreshes with new image
```

#### Bulk Upload Flow
```
1. Admin selects multiple files
2. Upload modal shows file queue (each file as a row)
3. Admin fills shared fields: Category (applies to all), Event Name (optional)
4. Each file gets individual caption/alt input row
5. [Upload All] → sequential or parallel upload to Cloudinary
6. Progress bar per file
7. On complete → all records saved to MongoDB
```

### Edge Cases
- **File size limit**: Enforce max 5MB per image client-side. Server rejects over-limit files with 413.
- **Invalid file type**: Only image MIME types accepted. PDF or video rejected with clear error message.
- **Bulk upload partial failure**: If 3 of 5 images fail — show per-file status. Successfully uploaded images are saved. Failed images are flagged for retry.
- **Delete featured image**: Warn if image is featured (shown on homepage strip).
- **Alt text enforcement**: `altText` is required — cannot save/upload without it. Accessibility + SEO requirement.

---

## Module 7: Careers Manager

### Purpose
Manage job openings and review/process incoming applications.

### Sub-modules: **Openings** and **Applications** (two tabs).

### Permissions
`careers:read`, `careers:write`, `careers:delete`, `applications:read`, `applications:write`

### CRUD Operations

#### Openings
| Operation | Endpoint | Notes |
|---|---|---|
| List | `GET /api/admin/career-openings` | All openings |
| Create | `POST /api/admin/career-openings` | New job post |
| Update | `PUT /api/admin/career-openings/[id]` | Edit details |
| Delete | `DELETE /api/admin/career-openings/[id]` | Only if no applications exist |
| Toggle Status | `PATCH /api/admin/career-openings/[id]` `{ status }` | active / closed / paused |

#### Applications
| Operation | Endpoint | Notes |
|---|---|---|
| List | `GET /api/admin/career-applications?jobId=&status=` | Filterable |
| View | `GET /api/admin/career-applications/[id]` | Full applicant detail |
| Update Status | `PATCH /api/admin/career-applications/[id]` `{ status, note }` | Advances pipeline |
| Add Note | `PATCH /api/admin/career-applications/[id]/notes` | Internal note |
| Delete | `DELETE /api/admin/career-applications/[id]` | Also destroys resume from Cloudinary |

### UX Flow

#### Openings Tab (`/admin/careers/openings`)
```
1. List of all openings: Title, Department, Status badge, Application Count, Deadline, Actions
2. Status filter: All | Active | Paused | Closed
3. Actions: ✏ Edit | Toggle Status | 🗑 Delete
4. Click on title → opens Application list for that job
5. [+ Post New Opening] button
```

#### Job Opening Form
```
Fields:
  Job Title
  Slug (auto-generated)
  Department (select)
  Subject (text, for faculty roles)
  Programs Assigned (multi-select)
  Job Description (Markdown editor)
  Responsibilities (dynamic list — add/remove bullet items)
  Qualifications (dynamic list)
  Experience Required (text)
  Employment Type (select)
  Application Deadline (date picker, optional)
  Status (active / paused)
```

#### Applications Tab (`/admin/careers/applications`)
```
1. Dropdown: "Filter by Opening" → selects a job
2. Status filter tabs: All | Applied | Under Review | Shortlisted | Interview Scheduled | Selected | Rejected
3. Table: Name, Email, Phone, Experience, Applied Date, Status badge, Actions
4. Actions: 👁 View Details | Advance Status | 🗑 Delete
```

#### Applicant Detail View
```
Left panel:
  - Name, email, phone, location, experience
  - Applied for: [Job Title] on [Date]
  - Cover Note (if any)
  - Resume: [Preview PDF button] [Download PDF button]
  - Status history timeline (visual, all past status changes with notes)

Right panel:
  - Status pipeline: horizontal steps (Applied → Under Review → Shortlisted → Interview Scheduled → Selected/Rejected)
  - Current step highlighted
  - [Advance Status] dropdown → select next status + optional note
  - Internal Notes textarea
  - [Save Note] button
```

### Edge Cases
- **Delete opening with applications**: Prevent deletion. Show: _"This opening has 5 applications. Close the opening instead of deleting it."_ Status can be set to `closed`.
- **Resume preview**: PDF is opened in-app using a PDF viewer iframe (Cloudinary's built-in `/fl_attachment` transform or browser native PDF render). Never a direct download link in the table.
- **Duplicate application**: Public API blocks re-submission from the same email for the same job. If somehow duplicates exist — admin table shows them both with a "Duplicate" badge.
- **Closed opening applications**: Public form blocks submissions when `status !== 'active'`. If a user somehow submits to a closed job — API returns 410 Gone.

---

## Module 8: Lead Manager

### Purpose
The CRM heart of the admin portal. View, manage, and advance all admission enquiry leads through the sales pipeline.

### Permissions
`leads:read`, `leads:write`

### CRUD Operations
| Operation | Endpoint | Notes |
|---|---|---|
| List | `GET /api/admin/leads?status=&program=&page=` | Paginated, filtered |
| View | `GET /api/admin/leads/[id]` | Full lead detail |
| Update Status | `PATCH /api/admin/leads/[id]` `{ status }` | Pipeline advance |
| Add Note | `PATCH /api/admin/leads/[id]/notes` | Thread note |
| Set Follow-Up | `PATCH /api/admin/leads/[id]` `{ followUpDate }` | Calendar date |
| Delete | `DELETE /api/admin/leads/[id]` | Soft-delete / hard-delete |

> Note: Leads are never created by admin — only by the public enquiry form. Admin manages them.

### UX Flow

#### Lead Inbox (`/admin/leads`)
```
1. Top: 5 status count badges → [New: 12] [Contacted: 8] [Visit Scheduled: 3] [Enrolled: 45] [Closed: 102]
2. Active status tab highlighted
3. Filter row: Program | Grade | Source | Date Range | Search by name/phone
4. Table: Name, Phone, Program, Grade, Source, Follow-Up Date, Status badge, Time Ago, Actions
5. Rows are colour-coded:
   - Red background tint: follow-up date is past-due
   - Amber: follow-up due today
   - Normal: no follow-up or future date
6. Actions: 👁 View | Advance Status | ⏰ Set Follow-Up
7. Row click → Lead Detail panel slides in (or navigates to /admin/leads/[id])
```

#### Lead Detail View
```
Left panel — Lead Info:
  - Name, Phone (click-to-call link), Email
  - Program, Grade, Message
  - Source (e.g., "Program Page — JEE")
  - UTM data if present
  - Submitted: [date/time]
  - Duplicate flag if isDuplicate = true → link to original lead

Right panel — CRM Actions:
  - Status pipeline (visual steps)
  - [Move to Next Status] primary button
  - [Mark as Closed] secondary button (with reason input)
  - Assigned To (text field — counselor name)
  - Follow-Up Date (date + time picker)
  - Notes thread:
      - Existing notes (oldest first, like a chat)
      - New note textarea + [Add Note] button
```

#### Follow-Up View (`/admin/leads?followup=today`)
```
Special filtered view: only leads where followUpDate = today (or past-due)
Sorted by urgency: past-due first, then today's
Used as daily morning check for the counselor
```

### Edge Cases
- **Duplicate leads**: If `isDuplicate = true`, show a banner in the lead detail: _"This may be a duplicate of [Lead: Rahul Sharma, 12 Jun]. View original →"_. Admin can decide which to keep.
- **Phone click-to-call**: The phone number renders as `<a href="tel:+91XXXXXXXXXX">`. On mobile, this triggers the dialler. On desktop, falls back to copy-to-clipboard.
- **Bulk status update**: Select multiple leads via checkboxes → bulk "Mark as Contacted" action. Applies same status to all selected.
- **Sensitive data**: Lead data (name, phone) is never exported or displayed in URLs. All access is authenticated.
- **Lead source integrity**: `source` field is set by the API at submission time — admin cannot edit it. Ensures tracking accuracy.

---

## Module 9: Settings

### Purpose
Manage all site-wide configuration — contact details, social links, SEO defaults, analytics, and feature flags.

### Permissions
`settings:read`, `settings:write` — super_admin only.

### CRUD Operations
| Operation | Endpoint | Notes |
|---|---|---|
| Read | `GET /api/admin/settings` | Returns full settings singleton |
| Update | `PUT /api/admin/settings` | Full or partial update |
| Upload OG Image | Cloudinary sign + upload | Default OG image |

### UX Flow

#### Settings Page (`/admin/settings`)
```
Organized as vertical tabs or accordion sections:

Tab 1 — Institute Info:
  Institute Name, Tagline
  Address: Line1, Line2, City, State, Pincode
  Phone Primary, Phone Secondary
  Email: Enquiries, Careers
  WhatsApp Number
  Google Maps Embed URL
  [Save Institute Info]

Tab 2 — Social Media:
  Facebook URL
  Instagram URL
  YouTube URL
  Twitter/X URL
  LinkedIn URL
  [Save Social Links]

Tab 3 — SEO Defaults:
  Meta Title Suffix (preview: "JEE Coaching Bhandara | Shiksha Classes")
  Default Meta Description (char counter 0/160)
  Default OG Image (Cloudinary upload)
  Google Site Verification Token
  [Save SEO Defaults]

Tab 4 — Analytics:
  Google Analytics ID (G-XXXXXXXXXX format)
  Google Tag Manager ID
  Facebook Pixel ID
  [Save Analytics]

Tab 5 — Feature Flags:
  Toggle switches (large, labeled):
    Show Announcement Banner: [ON/OFF]
    Enable Blog Section: [ON/OFF]
    Enable Gallery: [ON/OFF]
    Enable Careers Page: [ON/OFF]
    Maintenance Mode: [ON/OFF] ← red/dangerous toggle with confirmation modal
  [Save Feature Flags]

Tab 6 — Legal:
  Privacy Policy URL
  Terms of Use URL
  Copyright Year (auto-filled with current year)
  [Save Legal Links]
```

### Edge Cases
- **Maintenance Mode toggle**: Enabling Maintenance Mode shows a bold confirmation modal: _"This will make the entire public website inaccessible to visitors. Are you absolutely sure?"_ — requires typing "CONFIRM" before enabling.
- **Analytics ID format**: Google Analytics ID validated client-side against `/^G-[A-Z0-9]+$/`. Invalid format shows inline error before save.
- **Settings fetch caching**: Frontend caches settings for 5 minutes (React Query / SWR). After save, cache is manually invalidated.
- **Maps embed URL sanitisation**: The Google Maps embed URL is sanitised server-side. Only `https://www.google.com/maps/embed?pb=...` format accepted.

---

## Cross-Module: Revalidation Workflow

When the admin saves content in Homepage Manager, Results Manager, Blog Manager, or Resources Manager — the public Next.js frontend must update. This is handled via **on-demand ISR revalidation**.

```
Admin saves content
      ↓
PUT /api/admin/[module] (backend API)
      ↓
Backend saves to MongoDB
      ↓
Backend calls Frontend revalidation webhook:
  POST https://shikshaclasses.in/api/revalidate
  Headers: { 'x-revalidate-token': REVALIDATE_SECRET }
  Body: { paths: ['/results', '/'] }
      ↓
Next.js frontend re-generates the affected static pages
      ↓
Admin sees toast: "Saved. Public site updated."
```

Paths triggered per module:
| Module | Revalidation Paths |
|---|---|
| Homepage Manager | `/` |
| Results Manager | `/results`, `/` |
| Blog Manager | `/blog`, `/blog/[slug]` |
| Resources Manager | `/resources`, `/resources/[category]/[slug]` |
| Gallery Manager | `/gallery` |
| Programs Manager | `/programs`, `/programs/[slug]` |

---

## Permission Matrix (Future RBAC Reference)

| Permission Flag | Dashboard | Homepage | Results | Blog | Resources | Gallery | Careers | Leads | Settings |
|---|---|---|---|---|---|---|---|---|---|
| `super_admin` | ✅ All | ✅ All | ✅ All | ✅ All | ✅ All | ✅ All | ✅ All | ✅ All | ✅ All |
| `editor` (future) | ✅ Read | ✅ Write | ✅ Write | ✅ Publish | ✅ Publish | ✅ Write | ❌ | ✅ Read | ❌ |
| `viewer` (future) | ✅ Read | ✅ Read | ✅ Read | ✅ Read | ✅ Read | ✅ Read | ✅ Read | ✅ Read | ❌ |

---

*Document version: 1.0 — Admin Workflows, Pre-Implementation Phase*
*Shiksha Classes, Bhandara, Maharashtra — 2025*
