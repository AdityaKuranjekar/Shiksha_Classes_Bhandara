# Backend Architecture — Shiksha Classes API
### Next.js Route Handlers · Vercel Serverless · MongoDB Atlas · TypeScript

---

## 1. Folder Structure

```
apps/api/
├── src/
│   ├── app/
│   │   └── api/
│   │       ├── admin/
│   │       │   ├── auth/
│   │       │   │   ├── login/
│   │       │   │   │   └── route.ts
│   │       │   │   ├── logout/
│   │       │   │   │   └── route.ts
│   │       │   │   └── refresh/
│   │       │   │       └── route.ts
│   │       │   ├── homepage/
│   │       │   │   └── route.ts
│   │       │   ├── leads/
│   │       │   │   ├── route.ts
│   │       │   │   └── [id]/
│   │       │   │       ├── route.ts
│   │       │   │       └── notes/
│   │       │   │           └── route.ts
│   │       │   ├── results/
│   │       │   │   ├── route.ts
│   │       │   │   ├── reorder/
│   │       │   │   │   └── route.ts
│   │       │   │   └── [id]/
│   │       │   │       └── route.ts
│   │       │   ├── blogs/
│   │       │   │   ├── route.ts
│   │       │   │   └── [id]/
│   │       │   │       └── route.ts
│   │       │   ├── resources/
│   │       │   │   ├── route.ts
│   │       │   │   └── [id]/
│   │       │   │       └── route.ts
│   │       │   ├── gallery/
│   │       │   │   ├── route.ts
│   │       │   │   ├── bulk/
│   │       │   │   │   └── route.ts
│   │       │   │   └── [id]/
│   │       │   │       └── route.ts
│   │       │   ├── career-openings/
│   │       │   │   ├── route.ts
│   │       │   │   └── [id]/
│   │       │   │       └── route.ts
│   │       │   ├── career-applications/
│   │       │   │   ├── route.ts
│   │       │   │   └── [id]/
│   │       │   │       ├── route.ts
│   │       │   │       └── notes/
│   │       │   │           └── route.ts
│   │       │   ├── media/
│   │       │   │   └── signature/
│   │       │   │       └── route.ts
│   │       │   └── settings/
│   │       │       └── route.ts
│   │       │
│   │       ├── enquiries/
│   │       │   └── route.ts              ← Public POST
│   │       ├── careers/
│   │       │   └── apply/
│   │       │       └── route.ts          ← Public POST
│   │       ├── programs/
│   │       │   ├── route.ts              ← Public GET all
│   │       │   └── [slug]/
│   │       │       └── route.ts          ← Public GET one
│   │       ├── results/
│   │       │   └── route.ts              ← Public GET
│   │       ├── resources/
│   │       │   ├── route.ts              ← Public GET list
│   │       │   └── [slug]/
│   │       │       └── route.ts          ← Public GET one
│   │       ├── blog/
│   │       │   ├── route.ts              ← Public GET list
│   │       │   └── [slug]/
│   │       │       └── route.ts          ← Public GET one
│   │       └── revalidate/
│   │           └── route.ts              ← ISR webhook
│   │
│   ├── db/
│   │   ├── connect.ts                    ← Singleton connection pool
│   │   └── models/
│   │       ├── Admin.model.ts
│   │       ├── HomepageContent.model.ts
│   │       ├── Program.model.ts
│   │       ├── Result.model.ts
│   │       ├── Blog.model.ts
│   │       ├── Resource.model.ts
│   │       ├── Gallery.model.ts
│   │       ├── CareerOpening.model.ts
│   │       ├── CareerApplication.model.ts
│   │       ├── LeadForm.model.ts
│   │       └── Settings.model.ts
│   │
│   ├── repositories/
│   │   ├── base.repository.ts            ← Generic base CRUD
│   │   ├── admin.repository.ts
│   │   ├── lead.repository.ts
│   │   ├── result.repository.ts
│   │   ├── blog.repository.ts
│   │   ├── resource.repository.ts
│   │   ├── gallery.repository.ts
│   │   ├── careerOpening.repository.ts
│   │   ├── careerApplication.repository.ts
│   │   └── settings.repository.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── lead.service.ts
│   │   ├── result.service.ts
│   │   ├── blog.service.ts
│   │   ├── resource.service.ts
│   │   ├── gallery.service.ts
│   │   ├── career.service.ts
│   │   ├── media.service.ts              ← Cloudinary signature + destroy
│   │   ├── revalidation.service.ts       ← ISR webhook calls
│   │   └── settings.service.ts
│   │
│   ├── validators/
│   │   ├── schemas/
│   │   │   ├── auth.schema.ts
│   │   │   ├── lead.schema.ts
│   │   │   ├── result.schema.ts
│   │   │   ├── blog.schema.ts
│   │   │   ├── resource.schema.ts
│   │   │   ├── gallery.schema.ts
│   │   │   ├── career.schema.ts
│   │   │   └── settings.schema.ts
│   │   └── validate.ts                   ← Zod parse helper
│   │
│   ├── middleware/
│   │   ├── withAuth.ts                   ← JWT guard middleware
│   │   ├── withRateLimit.ts              ← Upstash rate limiter
│   │   └── compose.ts                    ← Middleware composition helper
│   │
│   ├── lib/
│   │   ├── jwt.ts                        ← Sign / verify / refresh helpers
│   │   ├── cloudinary.ts                 ← Cloudinary SDK config
│   │   ├── response.ts                   ← ApiResponse builder
│   │   ├── errors.ts                     ← Custom error classes
│   │   ├── logger.ts                     ← Structured logger
│   │   └── constants.ts                  ← Enums, static values
│   │
│   └── types/
│       ├── api.types.ts                  ← Request/Response type contracts
│       ├── models.types.ts               ← Mongoose document interfaces
│       └── next.types.ts                 ← Augmented NextRequest types
│
├── .env.local                            ← Local dev secrets (gitignored)
├── .env.example                          ← Committed template
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 2. Database Connection — Serverless-Safe Singleton

```typescript
// src/db/connect.ts

import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    '[DB] MONGODB_URI is not defined. Add it to .env.local'
  );
}

/**
 * Global cache persists across hot reloads in dev and across
 * invocations within the same Lambda container in production.
 * This is the canonical pattern for Mongoose on Vercel Serverless.
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache;
}

if (!global._mongooseCache) {
  global._mongooseCache = { conn: null, promise: null };
}

const cache = global._mongooseCache;

export async function dbConnect(): Promise<Mongoose> {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,   // Fail fast instead of buffering
      maxPoolSize: 10,         // Keep tight — serverless memory budget
      minPoolSize: 1,
      socketTimeoutMS: 10_000,
      connectTimeoutMS: 10_000,
      serverSelectionTimeoutMS: 10_000,
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
```

---

## 3. Repository Pattern

### 3.1 Generic Base Repository

```typescript
// src/repositories/base.repository.ts

import {
  Model,
  Document,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  Types,
} from 'mongoose';

export interface PaginationOptions {
  page: number;   // 1-indexed
  limit: number;  // items per page
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async findById(id: string): Promise<T | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findById(id).lean<T>().exec();
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter).lean<T>().exec();
  }

  async findMany(
    filter: FilterQuery<T> = {},
    options: QueryOptions = {}
  ): Promise<T[]> {
    return this.model.find(filter, null, options).lean<T>().exec();
  }

  async findPaginated(
    filter: FilterQuery<T>,
    pagination: PaginationOptions,
    sort: Record<string, 1 | -1> = { createdAt: -1 }
  ): Promise<PaginatedResult<T>> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.model
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean<T[]>()
        .exec(),
      this.model.countDocuments(filter).exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }

  async create(payload: Partial<T>): Promise<T> {
    const doc = new this.model(payload);
    return (await doc.save()).toObject() as T;
  }

  async updateById(
    id: string,
    update: UpdateQuery<T>
  ): Promise<T | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model
      .findByIdAndUpdate(id, update, { new: true, runValidators: true })
      .lean<T>()
      .exec();
  }

  async deleteById(id: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(id)) return false;
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }

  async exists(filter: FilterQuery<T>): Promise<boolean> {
    const count = await this.model.countDocuments(filter).exec();
    return count > 0;
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }
}
```

### 3.2 Concrete Repository Example — Leads

```typescript
// src/repositories/lead.repository.ts

import { dbConnect } from '@/db/connect';
import { LeadForm } from '@/db/models/LeadForm.model';
import { ILeadForm } from '@/types/models.types';
import { BaseRepository } from './base.repository';

export class LeadRepository extends BaseRepository<ILeadForm> {
  constructor() {
    super(LeadForm);
  }

  /** Ensure DB is connected before any operation */
  private async init() {
    await dbConnect();
  }

  async findRecent(phone: string, withinDays = 30): Promise<ILeadForm | null> {
    await this.init();
    const since = new Date(Date.now() - withinDays * 24 * 60 * 60 * 1000);
    return this.findOne({ phone, createdAt: { $gte: since } });
  }

  async addNote(
    leadId: string,
    note: { content: string; author: string }
  ): Promise<ILeadForm | null> {
    await this.init();
    return this.model
      .findByIdAndUpdate(
        leadId,
        { $push: { notes: { ...note, createdAt: new Date() } } },
        { new: true, runValidators: true }
      )
      .lean<ILeadForm>()
      .exec();
  }

  async getByStatus(
    status: string,
    page: number,
    limit: number
  ) {
    await this.init();
    return this.findPaginated(
      { status },
      { page, limit },
      { createdAt: -1 }
    );
  }

  async getDueDayFollowUps(): Promise<ILeadForm[]> {
    await this.init();
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return this.findMany({
      followUpDate: { $gte: start, $lte: end },
      status: { $nin: ['Enrolled', 'Closed'] },
    });
  }
}

// Singleton export — reused across route handlers in the same Lambda container
export const leadRepository = new LeadRepository();
```

---

## 4. Service Layer

The service layer owns **all business logic**. Route handlers are thin — they parse the request, call a service method, and return the response. Services call repositories; repositories call Mongoose.

```typescript
// src/services/lead.service.ts

import { leadRepository } from '@/repositories/lead.repository';
import { CreateLeadDto, UpdateLeadStatusDto } from '@/validators/schemas/lead.schema';
import { AppError } from '@/lib/errors';
import { HTTP_STATUS } from '@/lib/constants';

export const LeadService = {
  /**
   * Create a new admission enquiry lead.
   * Handles duplicate detection before insert.
   */
  async create(data: CreateLeadDto) {
    const existing = await leadRepository.findRecent(data.phone, 30);

    const lead = await leadRepository.create({
      ...data,
      isDuplicate: !!existing,
      duplicateOfId: existing?._id ?? null,
      status: 'New',
    });

    return lead;
  },

  async getAll(query: {
    status?: string;
    program?: string;
    page: number;
    limit: number;
  }) {
    const filter: Record<string, unknown> = {};
    if (query.status) filter.status = query.status;
    if (query.program) filter.program = query.program;

    return leadRepository.findPaginated(
      filter,
      { page: query.page, limit: query.limit },
      { createdAt: -1 }
    );
  },

  async getById(id: string) {
    const lead = await leadRepository.findById(id);
    if (!lead) {
      throw new AppError('Lead not found', HTTP_STATUS.NOT_FOUND);
    }
    return lead;
  },

  async updateStatus(id: string, dto: UpdateLeadStatusDto) {
    const lead = await leadRepository.findById(id);
    if (!lead) {
      throw new AppError('Lead not found', HTTP_STATUS.NOT_FOUND);
    }

    const updated = await leadRepository.updateById(id, {
      status: dto.status,
      ...(dto.followUpDate && { followUpDate: dto.followUpDate }),
      ...(dto.assignedTo && { assignedTo: dto.assignedTo }),
    });

    return updated;
  },

  async addNote(id: string, content: string, author = 'Admin') {
    const lead = await leadRepository.findById(id);
    if (!lead) {
      throw new AppError('Lead not found', HTTP_STATUS.NOT_FOUND);
    }
    return leadRepository.addNote(id, { content, author });
  },
};
```

---

## 5. Validation Layer

All validation uses **Zod**. Schemas live in `validators/schemas/`. A single `validate()` helper wraps parsing and converts Zod errors into structured API errors.

### 5.1 Validation Helper

```typescript
// src/validators/validate.ts

import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '@/lib/errors';

export function validate<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    // Convert Zod's flat error tree into a readable field-error map
    const fieldErrors = result.error.flatten().fieldErrors;
    const formatted = Object.entries(fieldErrors).reduce(
      (acc, [field, messages]) => {
        acc[field] = messages?.[0] ?? 'Invalid value';
        return acc;
      },
      {} as Record<string, string>
    );
    throw new ValidationError('Validation failed', formatted);
  }

  return result.data;
}
```

### 5.2 Schema Examples

```typescript
// src/validators/schemas/lead.schema.ts

import { z } from 'zod';

const PROGRAMS = ['jee', 'neet', 'mht-cet', 'previse-foundation', 'not-sure'] as const;
const GRADES = ['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'Dropper', 'Other'] as const;
const SOURCES = ['home_hero', 'program_page', 'contact_page', 'blog_cta', 'results_cta', 'sticky_cta', 'other'] as const;

export const CreateLeadSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  grade: z.enum(GRADES, { errorMap: () => ({ message: 'Select a valid grade' }) }),
  program: z.enum(PROGRAMS, { errorMap: () => ({ message: 'Select a valid program' }) }),
  message: z.string().max(500).optional(),
  source: z.enum(SOURCES).default('other'),
  programPageSource: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  referrerUrl: z.string().url().optional().or(z.literal('')),
});

export type CreateLeadDto = z.infer<typeof CreateLeadSchema>;

export const UpdateLeadStatusSchema = z.object({
  status: z.enum(['New', 'Contacted', 'Visit Scheduled', 'Enrolled', 'Closed']),
  followUpDate: z.string().datetime().optional(),
  assignedTo: z.string().max(100).optional(),
});

export type UpdateLeadStatusDto = z.infer<typeof UpdateLeadStatusSchema>;

export const AddLeadNoteSchema = z.object({
  content: z.string().trim().min(1).max(500),
});
```

```typescript
// src/validators/schemas/auth.schema.ts

import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Enter a valid email').toLowerCase(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginDto = z.infer<typeof LoginSchema>;
```

```typescript
// src/validators/schemas/result.schema.ts

import { z } from 'zod';

const PROGRAMS = ['jee', 'neet', 'mht-cet', 'previse-foundation'] as const;

export const CreateResultSchema = z.object({
  studentName: z.string().trim().min(2).max(100),
  program: z.enum(PROGRAMS),
  examName: z.string().trim().min(2).max(100),
  score: z.string().trim().min(1).max(50),
  rank: z.string().max(50).optional(),
  year: z.string().regex(/^\d{4}$/, 'Year must be 4 digits'),
  studentImageSecureUrl: z.string().url('Image URL is required'),
  studentImagePublicId: z.string().min(1, 'Image public ID is required'),
  testimonialQuote: z.string().max(500).optional(),
  isFeatured: z.boolean().default(false),
  isVisible: z.boolean().default(true),
  priorityWeight: z.number().int().default(0),
});

export type CreateResultDto = z.infer<typeof CreateResultSchema>;

export const ReorderResultsSchema = z.object({
  orderedIds: z.array(z.string()).min(1),
});
```

---

## 6. Error Handling

### 6.1 Custom Error Classes

```typescript
// src/lib/errors.ts

export enum ErrorCode {
  VALIDATION_ERROR    = 'VALIDATION_ERROR',
  NOT_FOUND           = 'NOT_FOUND',
  UNAUTHORIZED        = 'UNAUTHORIZED',
  FORBIDDEN           = 'FORBIDDEN',
  CONFLICT            = 'CONFLICT',
  RATE_LIMITED        = 'RATE_LIMITED',
  INTERNAL_ERROR      = 'INTERNAL_ERROR',
  BAD_REQUEST         = 'BAD_REQUEST',
  GONE                = 'GONE',
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode = 500,
    code: ErrorCode = ErrorCode.INTERNAL_ERROR
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true; // Distinguish from programmer errors
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  public readonly fields: Record<string, string>;

  constructor(message: string, fields: Record<string, string> = {}) {
    super(message, 400, ErrorCode.VALIDATION_ERROR);
    this.name = 'ValidationError';
    this.fields = fields;
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, ErrorCode.NOT_FOUND);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401, ErrorCode.UNAUTHORIZED);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403, ErrorCode.FORBIDDEN);
    this.name = 'ForbiddenError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, ErrorCode.CONFLICT);
    this.name = 'ConflictError';
  }
}

export class RateLimitError extends AppError {
  constructor(retryAfterSeconds?: number) {
    super('Too many requests. Please try again later.', 429, ErrorCode.RATE_LIMITED);
    this.name = 'RateLimitError';
    if (retryAfterSeconds) {
      // Attach retry info for the response layer to pick up
      (this as any).retryAfter = retryAfterSeconds;
    }
  }
}
```

### 6.2 Centralized Error Handler

```typescript
// src/lib/errors.ts  (continued)

import { NextResponse } from 'next/server';
import { ApiResponse } from './response';
import { logger } from './logger';
import { ZodError } from 'zod';
import mongoose from 'mongoose';

export function handleError(error: unknown): NextResponse {
  // ── Known operational errors ─────────────────────────────────────
  if (error instanceof ValidationError) {
    return ApiResponse.error(error.message, 400, {
      code: error.code,
      fields: error.fields,
    });
  }

  if (error instanceof AppError && error.isOperational) {
    const extra: Record<string, unknown> = { code: error.code };
    if ((error as any).retryAfter) {
      extra.retryAfter = (error as any).retryAfter;
    }
    return ApiResponse.error(error.message, error.statusCode, extra);
  }

  // ── Zod errors (should be caught by validate() first, but safety net) ──
  if (error instanceof ZodError) {
    const fields = error.flatten().fieldErrors;
    return ApiResponse.error('Validation failed', 400, {
      code: ErrorCode.VALIDATION_ERROR,
      fields,
    });
  }

  // ── Mongoose errors ───────────────────────────────────────────────
  if (error instanceof mongoose.Error.CastError) {
    return ApiResponse.error('Invalid ID format', 400, {
      code: ErrorCode.BAD_REQUEST,
    });
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const fields = Object.keys(error.errors).reduce(
      (acc, key) => ({ ...acc, [key]: error.errors[key].message }),
      {} as Record<string, string>
    );
    return ApiResponse.error('Database validation failed', 400, {
      code: ErrorCode.VALIDATION_ERROR,
      fields,
    });
  }

  // MongoDB duplicate key
  if ((error as any)?.code === 11000) {
    const field = Object.keys((error as any).keyPattern ?? {})[0] ?? 'field';
    return ApiResponse.error(`Duplicate value for '${field}'`, 409, {
      code: ErrorCode.CONFLICT,
    });
  }

  // ── Unknown / programmer errors ───────────────────────────────────
  logger.error('Unhandled error', error);
  return ApiResponse.error(
    process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : (error as Error)?.message ?? 'Unknown error',
    500,
    { code: ErrorCode.INTERNAL_ERROR }
  );
}
```

---

## 7. Response Structure

Every API response — success or failure — follows the same envelope. This gives the frontend a single contract to program against.

### 7.1 Response Envelope

```typescript
// src/lib/response.ts

import { NextResponse } from 'next/server';

/** The standard response envelope for all API endpoints */
export interface ApiEnvelope<T = unknown> {
  success: boolean;
  data: T | null;
  error: {
    message: string;
    code?: string;
    fields?: Record<string, string>; // Validation errors
    retryAfter?: number;             // Rate limit errors
  } | null;
  meta: {
    timestamp: string;               // ISO 8601
    requestId: string;               // For log correlation
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

export class ApiResponse {
  /** 200 / 201 success responses */
  static success<T>(
    data: T,
    statusCode = 200,
    meta: Partial<ApiEnvelope['meta']> = {}
  ): NextResponse<ApiEnvelope<T>> {
    const envelope: ApiEnvelope<T> = {
      success: true,
      data,
      error: null,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID(),
        ...meta,
      },
    };
    return NextResponse.json(envelope, { status: statusCode });
  }

  /** Error responses */
  static error(
    message: string,
    statusCode = 500,
    extras: Partial<{
      code: string;
      fields: Record<string, string>;
      retryAfter: number;
    }> = {}
  ): NextResponse<ApiEnvelope<null>> {
    const envelope: ApiEnvelope<null> = {
      success: false,
      data: null,
      error: {
        message,
        ...extras,
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID(),
      },
    };

    const response = NextResponse.json(envelope, { status: statusCode });

    if (extras.retryAfter) {
      response.headers.set('Retry-After', String(extras.retryAfter));
    }

    return response;
  }
}
```

### 7.2 Response Examples

**Success — Single resource:**
```json
{
  "success": true,
  "data": {
    "_id": "685a1b...",
    "studentName": "Priya Deshmukh",
    "score": "99.72 Percentile",
    "program": "jee",
    "year": "2025"
  },
  "error": null,
  "meta": {
    "timestamp": "2025-06-01T10:00:00.000Z",
    "requestId": "a3b1c2d4-..."
  }
}
```

**Success — Paginated list:**
```json
{
  "success": true,
  "data": [ ... ],
  "error": null,
  "meta": {
    "timestamp": "2025-06-01T10:00:00.000Z",
    "requestId": "f8e2...",
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 87,
      "totalPages": 5,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

**Validation error:**
```json
{
  "success": false,
  "data": null,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "fields": {
      "phone": "Enter a valid 10-digit Indian mobile number",
      "program": "Select a valid program"
    }
  },
  "meta": {
    "timestamp": "2025-06-01T10:00:01.000Z",
    "requestId": "c4d5..."
  }
}
```

**Rate limit error:**
```json
{
  "success": false,
  "data": null,
  "error": {
    "message": "Too many requests. Please try again later.",
    "code": "RATE_LIMITED",
    "retryAfter": 60
  },
  "meta": {
    "timestamp": "2025-06-01T10:00:02.000Z",
    "requestId": "e7f8..."
  }
}
```

---

## 8. Middleware

### 8.1 JWT Auth Guard

```typescript
// src/middleware/withAuth.ts

import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/jwt';
import { ApiResponse } from '@/lib/response';
import { UnauthorizedError } from '@/lib/errors';
import { handleError } from '@/lib/errors';

export type RouteHandler = (
  req: NextRequest,
  context: { params: Record<string, string>; adminId: string }
) => Promise<NextResponse>;

export function withAuth(handler: RouteHandler) {
  return async (
    req: NextRequest,
    context: { params: Record<string, string> }
  ): Promise<NextResponse> => {
    try {
      const authHeader = req.headers.get('Authorization');

      if (!authHeader?.startsWith('Bearer ')) {
        throw new UnauthorizedError('Missing or malformed Authorization header');
      }

      const token = authHeader.slice(7);
      const payload = verifyAccessToken(token);
      // verifyAccessToken throws UnauthorizedError internally on invalid/expired token

      return handler(req, { ...context, adminId: payload.sub });
    } catch (error) {
      return handleError(error);
    }
  };
}
```

### 8.2 Rate Limiter

```typescript
// src/middleware/withRateLimit.ts

import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { handleError } from '@/lib/errors';
import { RateLimitError } from '@/lib/errors';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Public endpoint limiter: 5 requests per IP per minute
const publicLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  prefix: 'rl:public',
});

export type SimpleHandler = (req: NextRequest, context?: any) => Promise<NextResponse>;

export function withRateLimit(
  handler: SimpleHandler,
  limiter = publicLimiter
) {
  return async (req: NextRequest, context?: any): Promise<NextResponse> => {
    try {
      // Prefer CF-Connecting-IP (Vercel Edge), then X-Forwarded-For, then unknown
      const ip =
        req.headers.get('cf-connecting-ip') ??
        req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
        'anonymous';

      const { success, reset } = await limiter.limit(ip);

      if (!success) {
        const retryAfter = Math.ceil((reset - Date.now()) / 1000);
        throw new RateLimitError(retryAfter);
      }

      return handler(req, context);
    } catch (error) {
      return handleError(error);
    }
  };
}
```

### 8.3 Middleware Composition

```typescript
// src/middleware/compose.ts

/**
 * Compose middleware wrappers right-to-left.
 * Usage: compose(withAuth, withRateLimit)(handler)
 */
export function compose<T extends (...args: any[]) => any>(
  ...middlewares: Array<(handler: T) => T>
): (handler: T) => T {
  return (handler: T) =>
    middlewares.reduceRight((acc, middleware) => middleware(acc), handler);
}
```

### 8.4 Route Handler — Full Example

```typescript
// src/app/api/enquiries/route.ts

import { NextRequest } from 'next/server';
import { validate } from '@/validators/validate';
import { CreateLeadSchema } from '@/validators/schemas/lead.schema';
import { LeadService } from '@/services/lead.service';
import { ApiResponse } from '@/lib/response';
import { handleError } from '@/lib/errors';
import { withRateLimit } from '@/middleware/withRateLimit';

// Plain async function — decorated below
async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const dto = validate(CreateLeadSchema, body);
    const lead = await LeadService.create(dto);
    return ApiResponse.success(
      { id: lead._id },
      201
    );
  } catch (error) {
    return handleError(error);
  }
}

// Apply rate limiting: 5 enquiries per IP per minute
export const POST_handler = withRateLimit(POST);
export { POST_handler as POST };
```

```typescript
// src/app/api/admin/leads/route.ts

import { NextRequest } from 'next/server';
import { withAuth } from '@/middleware/withAuth';
import { LeadService } from '@/services/lead.service';
import { ApiResponse } from '@/lib/response';
import { handleError } from '@/lib/errors';

async function GET(
  req: NextRequest,
  context: { params: {}; adminId: string }
) {
  try {
    const { searchParams } = new URL(req.url);
    const result = await LeadService.getAll({
      status: searchParams.get('status') ?? undefined,
      program: searchParams.get('program') ?? undefined,
      page: Number(searchParams.get('page') ?? 1),
      limit: Math.min(Number(searchParams.get('limit') ?? 20), 100),
    });

    return ApiResponse.success(result.data, 200, {
      pagination: {
        page: result.page,
        limit: 20,
        total: result.total,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}

export const GET_handler = withAuth(GET);
export { GET_handler as GET };
```

---

## 9. JWT Utility

```typescript
// src/lib/jwt.ts

import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import { UnauthorizedError } from './errors';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

interface TokenPayload extends JwtPayload {
  sub: string;       // Admin MongoDB _id
  role: string;
}

export function signAccessToken(adminId: string, role: string): string {
  return jwt.sign(
    { sub: adminId, role },
    ACCESS_SECRET,
    { expiresIn: '15m', issuer: 'shiksha-api', audience: 'shiksha-admin' }
  );
}

export function signRefreshToken(adminId: string): string {
  return jwt.sign(
    { sub: adminId },
    REFRESH_SECRET,
    { expiresIn: '7d', issuer: 'shiksha-api', audience: 'shiksha-admin' }
  );
}

export function verifyAccessToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, ACCESS_SECRET, {
      issuer: 'shiksha-api',
      audience: 'shiksha-admin',
    }) as TokenPayload;
  } catch {
    throw new UnauthorizedError('Invalid or expired access token');
  }
}

export function verifyRefreshToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, REFRESH_SECRET, {
      issuer: 'shiksha-api',
      audience: 'shiksha-admin',
    }) as TokenPayload;
  } catch {
    throw new UnauthorizedError('Invalid or expired refresh token');
  }
}
```

---

## 10. Cloudinary Service

```typescript
// src/services/media.service.ts

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export type UploadFolder =
  | 'shiksha/results'
  | 'shiksha/gallery'
  | 'shiksha/blogs'
  | 'shiksha/resources'
  | 'shiksha/resumes'
  | 'shiksha/homepage';

export const MediaService = {
  /**
   * Generate a signed upload payload.
   * Client uses this to upload directly to Cloudinary (bypasses serverless 4.5MB limit).
   */
  generateSignature(folder: UploadFolder, resourceType: 'image' | 'raw' = 'image') {
    const timestamp = Math.floor(Date.now() / 1000);
    const params: Record<string, string | number> = {
      folder,
      timestamp,
      // Enforce file size limit at Cloudinary level
      ...(resourceType === 'image' && { transformation: 'q_auto,f_auto' }),
    };

    const signature = cloudinary.utils.api_sign_request(
      params,
      process.env.CLOUDINARY_API_SECRET!
    );

    return {
      signature,
      timestamp,
      apiKey: process.env.CLOUDINARY_API_KEY!,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
      folder,
    };
  },

  /**
   * Destroy an asset from Cloudinary by its publicId.
   * Called server-side when deleting a result, blog, gallery item, or resource.
   */
  async destroy(
    publicId: string,
    resourceType: 'image' | 'raw' = 'image'
  ): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    } catch (error) {
      // Log but don't throw — MongoDB record deletion should still proceed
      console.error(`[Cloudinary] Failed to destroy asset: ${publicId}`, error);
    }
  },
};
```

---

## 11. Revalidation Service

```typescript
// src/services/revalidation.service.ts

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL!;
const REVALIDATE_TOKEN = process.env.REVALIDATE_SECRET_TOKEN!;

type RevalidatablePath =
  | '/'
  | '/results'
  | '/blog'
  | '/resources'
  | '/gallery'
  | '/programs'
  | string; // Dynamic paths like /blog/[slug]

export const RevalidationService = {
  /**
   * Notify the frontend Next.js app to purge and re-generate specific paths.
   * Fire-and-forget — does not block the admin API response.
   */
  async revalidate(paths: RevalidatablePath[]): Promise<void> {
    try {
      await fetch(`${WEB_URL}/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-revalidate-token': REVALIDATE_TOKEN,
        },
        body: JSON.stringify({ paths }),
      });
    } catch (error) {
      // Non-critical: log and move on. ISR time-based fallback will catch it.
      console.error('[Revalidation] Failed to revalidate paths:', paths, error);
    }
  },
};
```

---

## 12. Logger

```typescript
// src/lib/logger.ts

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
}

function log(level: LogLevel, message: string, data?: unknown) {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...(data !== undefined && { data }),
  };

  // In production on Vercel, stdout is captured by log drains.
  // JSON format enables structured queries in Vercel Log Drains / Datadog.
  if (process.env.NODE_ENV === 'production') {
    console[level === 'error' ? 'error' : 'log'](JSON.stringify(entry));
  } else {
    // Readable dev format
    console[level === 'error' ? 'error' : 'log'](
      `[${entry.timestamp}] [${level.toUpperCase()}] ${message}`,
      data ?? ''
    );
  }
}

export const logger = {
  info: (message: string, data?: unknown) => log('info', message, data),
  warn: (message: string, data?: unknown) => log('warn', message, data),
  error: (message: string, data?: unknown) => log('error', message, data),
  debug: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV !== 'production') log('debug', message, data);
  },
};
```

---

## 13. Constants

```typescript
// src/lib/constants.ts

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  GONE: 410,
  RATE_LIMITED: 429,
  INTERNAL_ERROR: 500,
} as const;

export const PROGRAMS = ['jee', 'neet', 'mht-cet', 'previse-foundation'] as const;
export type ProgramSlug = typeof PROGRAMS[number];

export const LEAD_STATUSES = ['New', 'Contacted', 'Visit Scheduled', 'Enrolled', 'Closed'] as const;
export const APPLICATION_STATUSES = ['Applied', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Rejected'] as const;
export const BLOG_STATUSES = ['draft', 'published', 'archived'] as const;
export const RESOURCE_STATUSES = ['draft', 'published', 'archived'] as const;

export const CLOUDINARY_FOLDERS = {
  RESULTS: 'shiksha/results',
  GALLERY: 'shiksha/gallery',
  BLOGS: 'shiksha/blogs',
  RESOURCES: 'shiksha/resources',
  RESUMES: 'shiksha/resumes',
  HOMEPAGE: 'shiksha/homepage',
} as const;

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100,
} as const;
```

---

## 14. Environment Variables

```bash
# .env.example
# ─────────────────────────────────────────────────────────────────
# Copy this file to .env.local for local development.
# Set all variables in Vercel Dashboard → Project Settings → Environment Variables.
# Never commit .env.local to version control.
# ─────────────────────────────────────────────────────────────────

# ── App ───────────────────────────────────────────────────────────
NODE_ENV=development
# Options: development | production | test

NEXT_PUBLIC_API_URL=http://localhost:3001
# The base URL of THIS API application.
# In production: https://api.shikshaclasses.in

NEXT_PUBLIC_WEB_URL=http://localhost:3000
# The public-facing frontend Next.js app URL.
# In production: https://shikshaclasses.in
# Used by RevalidationService to call the ISR webhook.

NEXT_PUBLIC_ADMIN_URL=http://localhost:3002
# The admin portal URL.
# In production: https://admin.shikshaclasses.in

# ── MongoDB Atlas ─────────────────────────────────────────────────
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/shiksha?retryWrites=true&w=majority
# Full connection string from Atlas → Connect → Drivers.
# Use a dedicated DB user with read/write access ONLY to the shiksha database.
# Do NOT use the Atlas admin user.

# ── JWT Secrets ───────────────────────────────────────────────────
JWT_ACCESS_SECRET=<generate-with: openssl rand -hex 64>
# Min 64 chars. Used to sign 15-minute access tokens.

JWT_REFRESH_SECRET=<generate-with: openssl rand -hex 64>
# Different secret from ACCESS_SECRET. Signs 7-day refresh tokens.

# ── Cloudinary ────────────────────────────────────────────────────
CLOUDINARY_CLOUD_NAME=shiksha-classes
CLOUDINARY_API_KEY=<from Cloudinary Dashboard>
CLOUDINARY_API_SECRET=<from Cloudinary Dashboard>
# API Secret is server-side ONLY. Never expose to client.

# ── Upstash Redis (Rate Limiting) ─────────────────────────────────
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=<from Upstash Dashboard>
# Used exclusively for sliding-window rate limiting on public endpoints.
# Free tier is sufficient for this scale.

# ── ISR Revalidation ──────────────────────────────────────────────
REVALIDATE_SECRET_TOKEN=<generate-with: openssl rand -hex 32>
# Shared secret between API and Frontend for the /api/revalidate webhook.
# Must match REVALIDATE_SECRET_TOKEN in the frontend's .env.

# ── CORS ─────────────────────────────────────────────────────────
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3002
# Comma-separated list of origins allowed to call the API.
# In production: https://shikshaclasses.in,https://admin.shikshaclasses.in

# ── Admin Seed (first-run only) ───────────────────────────────────
SEED_ADMIN_EMAIL=admin@shikshaclasses.in
SEED_ADMIN_PASSWORD=<strong-password>
# Used only by the one-time DB seed script. Remove after seeding.
```

### Variable Ownership Map

| Variable | API App | Frontend | Admin Portal |
|---|---|---|---|
| `MONGODB_URI` | ✅ Server | ❌ | ❌ |
| `JWT_ACCESS_SECRET` | ✅ Server | ❌ | ❌ |
| `JWT_REFRESH_SECRET` | ✅ Server | ❌ | ❌ |
| `CLOUDINARY_API_SECRET` | ✅ Server | ❌ | ❌ |
| `CLOUDINARY_CLOUD_NAME` | ✅ Server | ❌ | ✅ Client (for upload widget) |
| `CLOUDINARY_API_KEY` | ✅ Server | ❌ | ✅ Client (for upload widget) |
| `UPSTASH_REDIS_REST_URL` | ✅ Server | ❌ | ❌ |
| `UPSTASH_REDIS_REST_TOKEN` | ✅ Server | ❌ | ❌ |
| `REVALIDATE_SECRET_TOKEN` | ✅ Server | ✅ Server | ❌ |
| `NEXT_PUBLIC_API_URL` | ❌ | ✅ Client | ✅ Client |
| `NEXT_PUBLIC_WEB_URL` | ✅ Server | ✅ Client | ✅ Client |

---

## 15. Layered Call Stack Summary

```
HTTP Request
     │
     ▼
Route Handler   (src/app/api/.../route.ts)
     │  Parses req.json() / searchParams
     │  Calls validate() with Zod schema
     │  Catches all errors → handleError()
     │
     ▼
Service Layer   (src/services/*.service.ts)
     │  Owns all business logic
     │  Orchestrates multiple repositories
     │  Throws AppError / ConflictError / NotFoundError
     │
     ▼
Repository      (src/repositories/*.repository.ts)
     │  Abstracts all DB queries
     │  Calls dbConnect() before every operation
     │  Returns lean POJO documents
     │
     ▼
Mongoose Model  (src/db/models/*.model.ts)
     │
     ▼
MongoDB Atlas
```

---

*Document version: 1.0 — Backend Architecture · Pre-Implementation*
*Shiksha Classes, Bhandara — 2025*
