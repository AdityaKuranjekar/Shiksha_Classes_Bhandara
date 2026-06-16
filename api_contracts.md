# API Contract Documentation — Shiksha Classes
### OpenAPI-Style Reference · All Modules

---

## Conventions

### Base URLs
| Environment | API Base |
|---|---|
| Development | `http://localhost:3001/api` |
| Production | `https://api.shikshaclasses.in/api` |

### Authentication
All `/admin/*` endpoints require a JWT access token in the `Authorization` header.
```
Authorization: Bearer <access_token>
```
- Access tokens expire in **15 minutes**.
- Use `POST /admin/auth/refresh` (via HttpOnly cookie) to obtain a new token.
- Public endpoints have **no auth** but may have **rate limiting**.

### Standard Response Envelope
Every response — success or error — follows this envelope:
```typescript
{
  success: boolean,
  data: T | null,
  error: {
    message: string,
    code?: string,                        // e.g., "VALIDATION_ERROR"
    fields?: Record<string, string>,      // Field-level validation errors
    retryAfter?: number                   // Seconds (rate limit only)
  } | null,
  meta: {
    timestamp: string,                    // ISO 8601
    requestId: string,                    // UUID for log correlation
    pagination?: {
      page: number,
      limit: number,
      total: number,
      totalPages: number,
      hasNextPage: boolean,
      hasPrevPage: boolean
    }
  }
}
```

### HTTP Status Codes Used
| Code | Meaning |
|---|---|
| `200` | OK |
| `201` | Created |
| `204` | No Content (DELETE) |
| `400` | Bad Request / Validation Error |
| `401` | Unauthorized (missing/invalid token) |
| `403` | Forbidden (valid token, insufficient role) |
| `404` | Resource Not Found |
| `409` | Conflict (duplicate slug, duplicate application) |
| `410` | Gone (applying to a closed job) |
| `429` | Rate Limited |
| `500` | Internal Server Error |

### Rate Limits (Public Endpoints)
| Endpoint | Limit |
|---|---|
| `POST /enquiries` | 5 requests / IP / minute |
| `POST /careers/apply` | 3 requests / IP / minute |
| All other public `GET` | 60 requests / IP / minute |

---

## Module 0: Auth

### `POST /admin/auth/login`
Authenticate the admin and return tokens.

**Authorization:** None (public)

**Request Body:**
```typescript
{
  email: string;      // required, valid email format
  password: string;   // required, min 8 chars
}
```

**Response `200`:**
```typescript
{
  data: {
    accessToken: string;   // JWT, 15-min expiry
    admin: {
      id: string;
      name: string;
      email: string;
      role: string;        // "super_admin"
      lastLoginAt: string; // ISO 8601
    }
  }
}
// HttpOnly cookie set: refresh_token (7-day expiry, Secure, SameSite=Strict)
```

**Errors:**
| Status | Code | Condition |
|---|---|---|
| `400` | `VALIDATION_ERROR` | Missing or malformed fields |
| `401` | `UNAUTHORIZED` | Invalid credentials |
| `429` | `RATE_LIMITED` | 5+ failed attempts — account locked |

---

### `POST /admin/auth/refresh`
Issue a new access token using the HttpOnly refresh cookie.

**Authorization:** Refresh token cookie (automatic)

**Request Body:** None

**Response `200`:**
```typescript
{
  data: {
    accessToken: string;
  }
}
```

**Errors:**
| Status | Code | Condition |
|---|---|---|
| `401` | `UNAUTHORIZED` | Cookie missing, expired, or revoked |

---

### `POST /admin/auth/logout`
Invalidate the refresh token server-side and clear the cookie.

**Authorization:** Bearer token

**Response `204`:** No content

---

---

## Module 1: Programs

### `GET /programs`
Retrieve all active programs (public).

**Authorization:** None

**Query Parameters:**
| Param | Type | Required | Description |
|---|---|---|---|
| `includeInactive` | boolean | No | Admin override — ignored on public endpoint |

**Response `200`:**
```typescript
{
  data: Array<{
    slug: string;              // "jee" | "neet" | "mht-cet" | "previse-foundation"
    name: string;
    shortDescription: string;
    targetGrades: string[];
    examsCovered: string[];
    thumbnailSecureUrl: string | null;
    isActive: boolean;
    updatedAt: string;
  }>
}
```

**Validation:** None

---

### `GET /programs/:slug`
Retrieve full details for a single program (public).

**Authorization:** None

**Path Parameters:**
| Param | Type | Required | Description |
|---|---|---|---|
| `slug` | string | Yes | One of: `jee`, `neet`, `mht-cet`, `previse-foundation` |

**Response `200`:**
```typescript
{
  data: {
    slug: string;
    name: string;
    shortDescription: string;
    fullDescription: string;       // Markdown
    targetGrades: string[];
    examsCovered: string[];
    curriculum: Array<{
      subject: string;
      topics: string[];
      order: number;
    }>;
    features: Array<{
      title: string;
      description: string;
      icon: string | null;
      order: number;
    }>;
    faculty: Array<{
      name: string;
      qualification: string;
      experience: string;
      subject: string;
      imageSecureUrl: string | null;
    }>;
    admission: {
      batchStartDate: string | null;
      seatsAvailable: number | null;
      feesDescription: string | null;
      admissionProcess: string | null;
    };
    faqs: Array<{
      question: string;
      answer: string;
      order: number;
    }>;
    heroImageSecureUrl: string | null;
    seo: {
      metaTitle: string | null;
      metaDescription: string | null;
      ogImageSecureUrl: string | null;
    };
    updatedAt: string;
  }
}
```

**Errors:**
| Status | Code | Condition |
|---|---|---|
| `404` | `NOT_FOUND` | Slug not recognized or `isActive: false` |

---

### `PUT /admin/programs/:slug`
Update a program's content (admin only).

**Authorization:** Bearer token

**Path Parameters:**
| Param | Type | Required |
|---|---|---|
| `slug` | string | Yes |

**Request Body (all fields optional — partial update):**
```typescript
{
  name?: string;
  shortDescription?: string;         // max 200 chars
  fullDescription?: string;          // Markdown
  targetGrades?: string[];
  examsCovered?: string[];
  curriculum?: Array<{
    subject: string;                 // required within object
    topics?: string[];
    order?: number;
  }>;
  features?: Array<{
    title: string;                   // required within object, max 80 chars
    description?: string;            // max 200 chars
    icon?: string;
    order?: number;
  }>;
  faculty?: Array<{
    name: string;                    // required
    qualification?: string;
    experience?: string;
    subject?: string;
    imageSecureUrl?: string;
    imagePublicId?: string;
    order?: number;
  }>;
  admission?: {
    batchStartDate?: string;
    seatsAvailable?: number;
    feesDescription?: string;        // max 500 chars
    admissionProcess?: string;       // max 500 chars
  };
  faqs?: Array<{
    question: string;                // required, max 300 chars
    answer: string;                  // required, max 1000 chars
    order?: number;
  }>;
  heroImageSecureUrl?: string;
  heroImagePublicId?: string;
  thumbnailSecureUrl?: string;
  thumbnailPublicId?: string;
  isActive?: boolean;
  seo?: {
    metaTitle?: string;              // max 70 chars
    metaDescription?: string;        // max 160 chars
    ogImageSecureUrl?: string;
    ogImagePublicId?: string;
  };
}
```

**Response `200`:** Updated program document (same shape as `GET /programs/:slug`)

**Errors:**
| Status | Code | Condition |
|---|---|---|
| `400` | `VALIDATION_ERROR` | Field constraint violation |
| `401` | `UNAUTHORIZED` | Missing/invalid token |
| `404` | `NOT_FOUND` | Slug not found |

---

---

## Module 2: Results

### `GET /results`
Retrieve published, visible results (public).

**Authorization:** None

**Query Parameters:**
| Param | Type | Default | Description |
|---|---|---|---|
| `program` | string | — | Filter: `jee` / `neet` / `mht-cet` / `previse-foundation` |
| `year` | string | — | Filter: e.g., `2025` |
| `featured` | boolean | — | If `true`, returns only featured results |
| `page` | number | `1` | Pagination page |
| `limit` | number | `20` | Items per page, max `100` |

**Response `200`:**
```typescript
{
  data: Array<{
    _id: string;
    studentName: string;
    program: string;
    examName: string;
    score: string;
    rank: string | null;
    year: string;
    studentImageSecureUrl: string;
    testimonialQuote: string | null;
    isFeatured: boolean;
    priorityWeight: number;
  }>,
  meta: {
    pagination: { page, limit, total, totalPages, hasNextPage, hasPrevPage }
  }
}
```

---

### `GET /admin/results`
Retrieve all results including hidden (admin).

**Authorization:** Bearer token

**Query Parameters:** Same as public `GET /results` plus:
| Param | Type | Description |
|---|---|---|
| `isVisible` | boolean | Filter by visibility |

**Response `200`:** Same shape, includes `isVisible` and `createdAt` fields.

---

### `POST /admin/results`
Create a new topper result card.

**Authorization:** Bearer token

**Request Body:**
```typescript
{
  studentName: string;              // required, min 2, max 100
  program: string;                  // required: "jee"|"neet"|"mht-cet"|"previse-foundation"
  examName: string;                 // required, e.g., "JEE Main 2025"
  score: string;                    // required, e.g., "99.85 Percentile"
  rank?: string;                    // optional, e.g., "AIR 312"
  year: string;                     // required, 4-digit string, e.g., "2025"
  studentImageSecureUrl: string;    // required, valid URL (from Cloudinary upload)
  studentImagePublicId: string;     // required, Cloudinary public_id
  testimonialQuote?: string;        // max 500 chars
  isFeatured?: boolean;             // default: false
  isVisible?: boolean;              // default: true
  priorityWeight?: number;          // integer, default: 0
}
```

**Response `201`:**
```typescript
{
  data: {
    _id: string;
    studentName: string;
    // ... full result document
  }
}
```

**Errors:**
| Status | Code | Condition |
|---|---|---|
| `400` | `VALIDATION_ERROR` | Missing required fields or format violations |
| `401` | `UNAUTHORIZED` | — |

---

### `PUT /admin/results/:id`
Update an existing result card.

**Authorization:** Bearer token

**Path Parameters:** `id` — MongoDB ObjectId

**Request Body:** All fields from `POST` body (all optional for update)

**Response `200`:** Updated result document

**Errors:**
| Status | Code | Condition |
|---|---|---|
| `400` | `VALIDATION_ERROR` | Constraint violations |
| `404` | `NOT_FOUND` | ID not found |

---

### `PATCH /admin/results/reorder`
Bulk-update priority weights for drag-and-drop reordering.

**Authorization:** Bearer token

**Request Body:**
```typescript
{
  orderedIds: string[];   // required, array of result _id strings in desired order
}
```

**Behavior:** Assigns `priorityWeight = (orderedIds.length - index)` to each document in a single `bulkWrite`.

**Response `200`:**
```typescript
{ data: { updated: number } }
```

---

### `PATCH /admin/results/:id`
Toggle `isVisible` or `isFeatured` on a single result.

**Authorization:** Bearer token

**Request Body:**
```typescript
{
  isVisible?: boolean;
  isFeatured?: boolean;
}
```

**Response `200`:** Updated result document

---

### `DELETE /admin/results/:id`
Delete a result and destroy its Cloudinary image.

**Authorization:** Bearer token

**Response `204`:** No content

**Side Effects:** Server calls `cloudinary.uploader.destroy(studentImagePublicId)`.

**Errors:**
| Status | Code | Condition |
|---|---|---|
| `404` | `NOT_FOUND` | ID not found |

---

---

## Module 3: Blogs

### `GET /blog`
Retrieve published blog posts (public).

**Authorization:** None

**Query Parameters:**
| Param | Type | Default | Description |
|---|---|---|---|
| `category` | string | — | Filter by category slug |
| `tag` | string | — | Filter by tag |
| `q` | string | — | Text search across title and excerpt |
| `page` | number | `1` | |
| `limit` | number | `10` | Max `50` |

**Response `200`:**
```typescript
{
  data: Array<{
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    tags: string[];
    coverImageSecureUrl: string | null;
    authorName: string;
    publishedAt: string;
    viewCount: number;
  }>,
  meta: { pagination: { ... } }
}
```

---

### `GET /blog/:slug`
Retrieve a single published blog post (public).

**Authorization:** None

**Path Parameters:** `slug` — blog post slug

**Response `200`:**
```typescript
{
  data: {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    contentMarkdown: string;
    category: string;
    tags: string[];
    coverImageSecureUrl: string | null;
    authorName: string;
    publishedAt: string;
    viewCount: number;
    seo: {
      metaTitle: string | null;
      metaDescription: string | null;
      ogImageSecureUrl: string | null;
    };
  }
}
```

**Side Effect:** Increments `viewCount` via a fire-and-forget `$inc` update.

**Errors:**
| Status | Code | Condition |
|---|---|---|
| `404` | `NOT_FOUND` | Slug not found or status !== `published` |

---

### `GET /admin/blogs`
Retrieve all blog posts including drafts (admin).

**Authorization:** Bearer token

**Query Parameters:** Same as public plus:
| Param | Type | Description |
|---|---|---|
| `status` | string | `draft` / `published` / `archived` |

---

### `POST /admin/blogs`
Create a new blog post (saved as draft by default).

**Authorization:** Bearer token

**Request Body:**
```typescript
{
  title: string;                  // required, max 150 chars
  slug?: string;                  // auto-generated from title if omitted
  excerpt: string;                // required, max 300 chars
  contentMarkdown: string;        // required
  category: string;               // required: "Study Tips"|"Exam News"|"Career Guidance"|"Institute Updates"|"Subject Deep-Dives"
  tags?: string[];                // optional
  coverImageSecureUrl?: string;
  coverImagePublicId?: string;
  authorName?: string;            // default: "Shiksha Classes Editorial Team"
  status?: "draft" | "published"; // default: "draft"
  seo?: {
    metaTitle?: string;           // max 70 chars
    metaDescription?: string;     // max 160 chars
    ogImageSecureUrl?: string;
    ogImagePublicId?: string;
  };
}
```

**Response `201`:** Created blog document

**Errors:**
| Status | Code | Condition |
|---|---|---|
| `409` | `CONFLICT` | Slug already exists |

---

### `PUT /admin/blogs/:id`
Update a blog post (full or partial).

**Authorization:** Bearer token

**Request Body:** All fields from `POST` (all optional)

**Response `200`:** Updated document

**Errors:**
| Status | Code | Condition |
|---|---|---|
| `409` | `CONFLICT` | New slug conflicts with an existing post |
| `404` | `NOT_FOUND` | ID not found |

---

### `PATCH /admin/blogs/:id`
Change publication status.

**Authorization:** Bearer token

**Request Body:**
```typescript
{
  status: "draft" | "published" | "archived";
}
```

**Behavior:**
- `published`: Sets `publishedAt = now` if not already set.
- `draft` / `archived`: Does not clear `publishedAt`.

**Response `200`:** Updated document (status + publishedAt fields)

---

### `DELETE /admin/blogs/:id`
Delete a blog post and destroy its cover image from Cloudinary.

**Authorization:** Bearer token

**Response `204`:** No content

---

---

## Module 4: Resources

### `GET /resources`
Retrieve published resources (public).

**Authorization:** None

**Query Parameters:**
| Param | Type | Default | Description |
|---|---|---|---|
| `category` | string | — | `Formula Sheets` / `Previous Year Papers` / `Notes` / `Study Guides` / `Revision Checklists` |
| `subject` | string | — | `Physics` / `Chemistry` / `Mathematics` / `Biology` / `General` |
| `program` | string | — | Program slug filter |
| `featured` | boolean | — | Return only featured resources |
| `q` | string | — | Text search |
| `page` | number | `1` | |
| `limit` | number | `20` | Max `100` |

**Response `200`:**
```typescript
{
  data: Array<{
    _id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    subject: string;
    targetPrograms: string[];
    fileSecureUrl: string | null;
    fileType: "pdf" | "image" | "none";
    thumbnailSecureUrl: string | null;
    isFeatured: boolean;
    downloadCount: number;
    publishedAt: string;
  }>,
  meta: { pagination: { ... } }
}
```

---

### `GET /resources/:slug`
Retrieve a single published resource (public).

**Authorization:** None

**Response `200`:**
```typescript
{
  data: {
    _id: string;
    title: string;
    slug: string;
    description: string;
    contentMarkdown: string | null;
    category: string;
    subject: string;
    targetPrograms: string[];
    fileSecureUrl: string | null;
    fileType: string;
    thumbnailSecureUrl: string | null;
    isFeatured: boolean;
    downloadCount: number;
    viewCount: number;
    publishedAt: string;
    seo: {
      metaTitle: string | null;
      metaDescription: string | null;
    };
  }
}
```

---

### `POST /admin/resources`
Create a new resource.

**Authorization:** Bearer token

**Request Body:**
```typescript
{
  title: string;                    // required, max 150 chars
  slug?: string;                    // auto-generated if omitted
  description: string;              // required, max 400 chars
  contentMarkdown?: string;         // optional article body
  category: string;                 // required (enum)
  subject: string;                  // required (enum)
  targetPrograms?: string[];        // default: ["all"]
  fileSecureUrl?: string;           // Cloudinary PDF URL
  filePublicId?: string;
  fileType?: "pdf" | "image" | "none";  // default: "none"
  thumbnailSecureUrl?: string;
  thumbnailPublicId?: string;
  isFeatured?: boolean;             // default: false
  status?: "draft" | "published";   // default: "draft"
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}
```

**Validation Rule:** `fileSecureUrl` and `contentMarkdown` cannot both be null — at least one must be present.

**Response `201`:** Created resource document

---

### `PUT /admin/resources/:id`
Update a resource.

**Authorization:** Bearer token

**Request Body:** Same fields as `POST` (all optional)

**Side Effect:** If `fileSecureUrl` changes, server destroys the old `filePublicId` from Cloudinary.

**Response `200`:** Updated document

---

### `PATCH /admin/resources/:id`
Toggle visibility/featured status or change publication state.

**Authorization:** Bearer token

**Request Body:**
```typescript
{
  status?: "draft" | "published" | "archived";
  isFeatured?: boolean;
}
```

**Response `200`:** Updated document

---

### `DELETE /admin/resources/:id`
Delete resource and destroy associated Cloudinary assets.

**Authorization:** Bearer token

**Side Effects:** Destroys both `filePublicId` (PDF) and `thumbnailPublicId` (image) from Cloudinary.

**Response `204`:** No content

---

---

## Module 5: Gallery

### `GET /gallery`
Retrieve visible gallery images (public).

**Authorization:** None

**Query Parameters:**
| Param | Type | Description |
|---|---|---|
| `category` | string | `Classrooms` / `Events` / `Results Celebrations` / `Campus Life` / `Faculty` / `Awards` |
| `featured` | boolean | Only featured images |

**Response `200`:**
```typescript
{
  data: Array<{
    _id: string;
    caption: string | null;
    altText: string;
    imageSecureUrl: string;
    thumbnailSecureUrl: string | null;
    category: string;
    eventName: string | null;
    takenAt: string | null;
    isFeatured: boolean;
    order: number;
  }>
}
```

---

### `POST /admin/gallery`
Upload a single gallery image record (after Cloudinary upload).

**Authorization:** Bearer token

**Request Body:**
```typescript
{
  altText: string;              // required, max 200 chars
  imageSecureUrl: string;       // required, valid URL
  imagePublicId: string;        // required
  thumbnailSecureUrl?: string;
  caption?: string;             // max 200 chars
  category: string;             // required (enum)
  eventName?: string;
  takenAt?: string;             // ISO 8601 date
  isFeatured?: boolean;         // default: false
  order?: number;               // default: 0
}
```

**Response `201`:** Created gallery document

---

### `POST /admin/gallery/bulk`
Upload multiple gallery image records in one request.

**Authorization:** Bearer token

**Request Body:**
```typescript
{
  images: Array<{
    altText: string;            // required per image
    imageSecureUrl: string;     // required
    imagePublicId: string;      // required
    thumbnailSecureUrl?: string;
    caption?: string;
    category: string;           // required — shared or per-image
    eventName?: string;
    takenAt?: string;
    order?: number;
  }>
}
```

**Validation:** Max 20 images per bulk request. Each image validated individually. Returns per-item status on partial failure.

**Response `207` (Multi-Status):**
```typescript
{
  data: {
    succeeded: number;
    failed: number;
    results: Array<{
      index: number;
      success: boolean;
      id?: string;              // MongoDB _id if succeeded
      error?: string;           // Error message if failed
    }>
  }
}
```

---

### `PUT /admin/gallery/:id`
Update a gallery image's metadata.

**Authorization:** Bearer token

**Request Body:**
```typescript
{
  altText?: string;
  caption?: string;
  category?: string;
  eventName?: string;
  takenAt?: string;
  isFeatured?: boolean;
  isVisible?: boolean;
  order?: number;
}
```

**Response `200`:** Updated document

---

### `PATCH /admin/gallery/reorder`
Reorder images within a category.

**Authorization:** Bearer token

**Request Body:**
```typescript
{
  category: string;           // required — reorder is scoped to one category
  orderedIds: string[];       // IDs in desired order
}
```

**Response `200`:** `{ data: { updated: number } }`

---

### `DELETE /admin/gallery/:id`
Delete a gallery image and destroy from Cloudinary.

**Authorization:** Bearer token

**Response `204`:** No content

---

---

## Module 6: Careers

### `GET /careers`
Retrieve active job openings (public).

**Authorization:** None

**Query Parameters:**
| Param | Type | Description |
|---|---|---|
| `department` | string | `Academic Faculty` / `Counselling` / `Administration` / `Operations` |

**Response `200`:**
```typescript
{
  data: Array<{
    _id: string;
    title: string;
    slug: string;
    department: string;
    subject: string | null;
    programsAssigned: string[];
    experienceRequired: string | null;
    employmentType: string;
    location: string;
    applicationDeadline: string | null;
    createdAt: string;
  }>
}
```

---

### `GET /careers/:slug`
Retrieve full job details (public).

**Authorization:** None

**Response `200`:**
```typescript
{
  data: {
    _id: string;
    title: string;
    slug: string;
    department: string;
    subject: string | null;
    programsAssigned: string[];
    jobDescription: string;         // Markdown
    responsibilities: string[];
    qualifications: string[];
    experienceRequired: string | null;
    employmentType: string;
    location: string;
    applicationDeadline: string | null;
    status: string;
  }
}
```

**Errors:**
| Status | Code | Condition |
|---|---|---|
| `404` | `NOT_FOUND` | Slug not found |
| `410` | `GONE` | Opening exists but `status !== "active"` |

---

### `POST /careers/apply`
Submit a job application (public).

**Authorization:** None
**Rate Limit:** 3 requests / IP / minute

**Request Body:**
```typescript
{
  jobId: string;                  // required, valid MongoDB ObjectId
  applicantName: string;          // required, max 100 chars
  email: string;                  // required, valid email
  phone: string;                  // required, 10-digit Indian mobile
  currentLocation?: string;       // max 100 chars
  yearsOfExperience?: number;     // 0–50
  coverNote?: string;             // max 600 chars
  resumeSecureUrl: string;        // required, Cloudinary PDF URL
  resumePublicId: string;         // required
  utmSource?: string;
}
```

**Validation Rules:**
- `jobId` must reference an existing `CareerOpening` with `status: "active"`.
- Same `email` + `jobId` combination cannot apply twice → `409 CONFLICT`.
- `resumeSecureUrl` must be a valid URL; PDF type enforced at Cloudinary upload level.

**Response `201`:**
```typescript
{
  data: {
    applicationId: string;
    message: "Application submitted successfully."
  }
}
```

**Side Effect:** Increments `career_openings.applicationCount` atomically.

**Errors:**
| Status | Code | Condition |
|---|---|---|
| `400` | `VALIDATION_ERROR` | Missing/invalid fields |
| `404` | `NOT_FOUND` | `jobId` does not exist |
| `409` | `CONFLICT` | Duplicate application from same email |
| `410` | `GONE` | Job is closed/paused |
| `429` | `RATE_LIMITED` | Submission rate exceeded |

---

### `POST /admin/career-openings`
Create a new job opening.

**Authorization:** Bearer token

**Request Body:**
```typescript
{
  title: string;                  // required, max 120 chars
  slug?: string;                  // auto-generated if omitted
  department: string;             // required (enum)
  subject?: string;
  programsAssigned?: string[];    // program slugs
  jobDescription: string;         // required, Markdown
  responsibilities?: string[];
  qualifications?: string[];
  experienceRequired?: string;
  employmentType?: string;        // default: "Full-Time"
  applicationDeadline?: string;   // ISO 8601 date
  status?: "active" | "paused";   // default: "active"
}
```

**Response `201`:** Created opening document

---

### `PUT /admin/career-openings/:id`
Update a job opening.

**Authorization:** Bearer token

**Request Body:** All fields from `POST` (all optional)

**Response `200`:** Updated document

---

### `PATCH /admin/career-openings/:id`
Change opening status.

**Authorization:** Bearer token

**Request Body:**
```typescript
{
  status: "active" | "paused" | "closed";
}
```

**Response `200`:** Updated document

---

### `DELETE /admin/career-openings/:id`
Delete a job opening.

**Authorization:** Bearer token

**Validation:** Cannot delete if `applicationCount > 0`. Returns `409 CONFLICT` with message: _"Set status to 'closed' instead."_

**Response `204`:** No content

---

### `GET /admin/career-applications`
List all applications (admin).

**Authorization:** Bearer token

**Query Parameters:**
| Param | Type | Description |
|---|---|---|
| `jobId` | string | Filter by opening |
| `status` | string | Filter by pipeline status |
| `page` | number | default `1` |
| `limit` | number | default `20`, max `100` |

**Response `200`:**
```typescript
{
  data: Array<{
    _id: string;
    jobId: string;
    jobTitleSnapshot: string;
    applicantName: string;
    email: string;
    phone: string;
    currentLocation: string | null;
    yearsOfExperience: number | null;
    resumeSecureUrl: string;
    status: string;
    appliedAt: string;
    statusHistory: Array<{
      status: string;
      changedAt: string;
      note: string | null;
    }>;
  }>,
  meta: { pagination: { ... } }
}
```

---

### `PATCH /admin/career-applications/:id`
Advance application pipeline status.

**Authorization:** Bearer token

**Request Body:**
```typescript
{
  status: "Under Review" | "Shortlisted" | "Interview Scheduled" | "Selected" | "Rejected";
  note?: string;                  // max 300 chars — appended to statusHistory
}
```

**Response `200`:** Updated application document

---

---

## Module 7: Leads

### `POST /enquiries`
Submit a public admission enquiry.

**Authorization:** None
**Rate Limit:** 5 requests / IP / minute

**Request Body:**
```typescript
{
  name: string;                   // required, min 2, max 100 chars
  phone: string;                  // required, regex: /^[6-9]\d{9}$/
  email?: string;                 // optional, valid email
  grade: string;                  // required: "Class 8"|"Class 9"|"Class 10"|"Class 11"|"Class 12"|"Dropper"|"Other"
  program: string;                // required: "jee"|"neet"|"mht-cet"|"previse-foundation"|"not-sure"
  message?: string;               // max 500 chars
  source?: string;                // "home_hero"|"program_page"|"contact_page"|"blog_cta"|"results_cta"|"sticky_cta"|"other"
  programPageSource?: string;     // program slug if source = "program_page"
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrerUrl?: string;
}
```

**Response `201`:**
```typescript
{
  data: {
    message: "Thank you! We will contact you within 24 hours."
  }
}
```

Note: `_id` is intentionally not returned to the public. Prevents enumeration.

**Errors:**
| Status | Code | Condition |
|---|---|---|
| `400` | `VALIDATION_ERROR` | Missing required fields or format violations |
| `429` | `RATE_LIMITED` | Rate limit exceeded |

---

### `GET /admin/leads`
Retrieve all leads with filtering and pagination.

**Authorization:** Bearer token

**Query Parameters:**
| Param | Type | Description |
|---|---|---|
| `status` | string | Pipeline status filter |
| `program` | string | Program slug filter |
| `source` | string | Source filter |
| `grade` | string | Grade filter |
| `isDuplicate` | boolean | Show only duplicate leads |
| `followupToday` | boolean | Show leads with follow-up due today |
| `search` | string | Searches name and phone (partial match) |
| `dateFrom` | string | ISO date — filter by `createdAt` range start |
| `dateTo` | string | ISO date — filter by `createdAt` range end |
| `page` | number | default `1` |
| `limit` | number | default `20`, max `100` |

**Response `200`:**
```typescript
{
  data: Array<{
    _id: string;
    name: string;
    phone: string;
    email: string | null;
    grade: string;
    program: string;
    message: string | null;
    source: string;
    status: string;
    assignedTo: string | null;
    followUpDate: string | null;
    isDuplicate: boolean;
    duplicateOfId: string | null;
    notes: Array<{
      _id: string;
      content: string;
      author: string;
      createdAt: string;
    }>;
    createdAt: string;
    updatedAt: string;
  }>,
  meta: { pagination: { ... } }
}
```

---

### `GET /admin/leads/:id`
Retrieve a single lead (full detail).

**Authorization:** Bearer token

**Response `200`:** Full lead document (same fields as list, no pagination)

**Errors:**
| Status | Code | Condition |
|---|---|---|
| `404` | `NOT_FOUND` | Lead not found |

---

### `PATCH /admin/leads/:id`
Update lead status, follow-up date, or assigned counselor.

**Authorization:** Bearer token

**Request Body:**
```typescript
{
  status?: "New" | "Contacted" | "Visit Scheduled" | "Enrolled" | "Closed";
  followUpDate?: string;          // ISO 8601 datetime, or null to clear
  assignedTo?: string;            // Counselor name, max 100 chars
}
```

**Response `200`:** Updated lead document

---

### `POST /admin/leads/:id/notes`
Add an internal note to a lead.

**Authorization:** Bearer token

**Request Body:**
```typescript
{
  content: string;               // required, min 1, max 500 chars
}
```

**Response `200`:** Updated lead document with new note appended

---

---

## Module 8: Settings

### `GET /settings`
Retrieve public-safe settings (contact info, social links, feature flags).

**Authorization:** None

**Response `200`:**
```typescript
{
  data: {
    instituteName: string;
    tagline: string | null;
    address: {
      line1: string;
      line2: string | null;
      city: string;
      state: string;
      pincode: string;
    };
    phone: {
      primary: string;
      secondary: string | null;
    };
    email: {
      enquiries: string;
      careers: string;
    };
    whatsappNumber: string;
    googleMapsEmbedUrl: string | null;
    socialLinks: {
      facebook: string | null;
      instagram: string | null;
      youtube: string | null;
      twitter: string | null;
      linkedin: string | null;
    };
    features: {
      showAnnouncementBanner: boolean;
      enableBlog: boolean;
      enableGallery: boolean;
      enableCareers: boolean;
      maintenanceMode: boolean;
    };
    legal: {
      privacyPolicyUrl: string | null;
      termsOfUseUrl: string | null;
      copyrightYear: number;
    };
  }
}
```

Note: `analytics`, `seoDefaults.googleSiteVerificationToken`, and `seoDefaults.ogImagePublicId` are **never** returned to the public endpoint.

---

### `GET /admin/settings`
Retrieve full settings including analytics and SEO tokens.

**Authorization:** Bearer token

**Response `200`:** Full settings document including:
```typescript
{
  data: {
    // ... all public fields above, plus:
    seoDefaults: {
      metaTitleSuffix: string;
      defaultMetaDescription: string | null;
      defaultOgImageSecureUrl: string | null;
      googleSiteVerificationToken: string | null;
    };
    analytics: {
      googleAnalyticsId: string | null;
      googleTagManagerId: string | null;
      facebookPixelId: string | null;
    };
    updatedAt: string;
  }
}
```

---

### `PUT /admin/settings`
Update site settings (partial update via `$set`).

**Authorization:** Bearer token

**Request Body:** Any combination of the following sections (all optional — only provided fields are updated):
```typescript
{
  instituteName?: string;                   // max 100 chars
  tagline?: string;                         // max 200 chars
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    pincode?: string;                       // 6-digit regex
  };
  phone?: {
    primary?: string;
    secondary?: string | null;
  };
  email?: {
    enquiries?: string;                     // valid email
    careers?: string;                       // valid email
  };
  whatsappNumber?: string;
  googleMapsEmbedUrl?: string;              // must match Google Maps embed domain
  socialLinks?: {
    facebook?: string | null;               // valid URL or null
    instagram?: string | null;
    youtube?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
  };
  seoDefaults?: {
    metaTitleSuffix?: string;
    defaultMetaDescription?: string;        // max 160 chars
    defaultOgImageSecureUrl?: string;
    defaultOgImagePublicId?: string;
    googleSiteVerificationToken?: string;
  };
  analytics?: {
    googleAnalyticsId?: string;             // regex: /^G-[A-Z0-9]+$/
    googleTagManagerId?: string;            // regex: /^GTM-[A-Z0-9]+$/
    facebookPixelId?: string;              // numeric string
  };
  features?: {
    showAnnouncementBanner?: boolean;
    enableBlog?: boolean;
    enableGallery?: boolean;
    enableCareers?: boolean;
    maintenanceMode?: boolean;
  };
  legal?: {
    privacyPolicyUrl?: string | null;
    termsOfUseUrl?: string | null;
    copyrightYear?: number;
  };
}
```

**Response `200`:** Full updated settings document

---

## Module: Media Signature

### `POST /admin/media/signature`
Generate a Cloudinary signed upload payload. Client uses this to upload directly to Cloudinary.

**Authorization:** Bearer token

**Request Body:**
```typescript
{
  folder: string;    // required: one of the approved Cloudinary folders
                     // "shiksha/results" | "shiksha/gallery" | "shiksha/blogs"
                     // "shiksha/resources" | "shiksha/resumes" | "shiksha/homepage"
  resourceType?: "image" | "raw";  // default: "image"
}
```

**Validation:** `folder` must be in the approved allowlist — prevents uploads to arbitrary paths.

**Response `200`:**
```typescript
{
  data: {
    signature: string;    // HMAC-SHA256 signature
    timestamp: number;    // Unix timestamp (seconds)
    apiKey: string;       // Cloudinary API key (safe to expose)
    cloudName: string;
    folder: string;
  }
}
```

---

## Module: ISR Revalidation Webhook

### `POST /api/revalidate` *(on Frontend app, not API app)*
Called by the API after admin content saves to purge static cache.

**Authorization:** `x-revalidate-token` header (shared secret)

**Request Body:**
```typescript
{
  paths: string[];    // e.g., ["/results", "/", "/blog/how-to-crack-neet"]
}
```

**Response `200`:**
```typescript
{
  revalidated: true;
  paths: string[];
}
```

**Errors:**
| Status | Condition |
|---|---|
| `401` | Missing or invalid revalidate token |
| `500` | Next.js revalidation internal error |

---

*Document version: 1.0 — API Contract · Pre-Implementation*
*Shiksha Classes, Bhandara — 2025*
