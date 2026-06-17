/**
 * API Response Types — Shiksha Admin Portal
 * Mirrors the standard envelope defined in backend_architecture.md §7
 */

// ─── Standard Envelope ────────────────────────────────────────────────────────
export interface ApiPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiEnvelope<T = unknown> {
  success: boolean;
  data: T | null;
  error: {
    message: string;
    code?: string;
    fields?: Record<string, string>;
    retryAfter?: number;
  } | null;
  meta: {
    timestamp: string;
    requestId: string;
    pagination?: ApiPagination;
  };
}

// ─── Typed API Error ──────────────────────────────────────────────────────────
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status: number,
    public readonly fields?: Record<string, string>,
    public readonly retryAfter?: number
  ) {
    super(message);
    this.name = "ApiError";
  }

  get isValidationError() {
    return this.code === "VALIDATION_ERROR";
  }
  get isUnauthorized() {
    return this.code === "UNAUTHORIZED";
  }
  get isNotFound() {
    return this.code === "NOT_FOUND";
  }
  get isConflict() {
    return this.code === "CONFLICT";
  }
  get isRateLimited() {
    return this.code === "RATE_LIMITED";
  }
}

// ─── Domain Types — mirroring API contract shapes ─────────────────────────────

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Visit Scheduled"
  | "Enrolled"
  | "Closed";

export type BlogStatus = "draft" | "published" | "archived";

export type ResourceStatus = "draft" | "published" | "archived";

export type CareerStatus = "active" | "paused" | "closed";

export type ApplicationStatus =
  | "Applied"
  | "Under Review"
  | "Shortlisted"
  | "Interview Scheduled"
  | "Selected"
  | "Rejected";

export type GalleryCategory =
  | "Classrooms"
  | "Events"
  | "Results Celebrations"
  | "Campus Life"
  | "Faculty"
  | "Awards";

export type Program = "JEE" | "NEET" | "MHT-CET" | "Foundation";

// ─── Lead ─────────────────────────────────────────────────────────────────────
export interface LeadNote {
  _id: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface Lead {
  _id: string;
  name: string;
  phone: string;
  email: string | null;
  grade: string;
  program: string;
  message: string | null;
  source: string;
  status: LeadStatus;
  assignedTo: string | null;
  followUpDate: string | null;
  isDuplicate: boolean;
  duplicateOfId: string | null;
  notes: LeadNote[];
  createdAt: string;
  updatedAt: string;
}

// ─── Blog ─────────────────────────────────────────────────────────────────────
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentMarkdown: string;
  category: string;
  tags: string[];
  coverImageSecureUrl: string | null;
  coverImagePublicId: string | null;
  authorName: string;
  status: BlogStatus;
  viewCount: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  seo?: {
    metaTitle: string | null;
    metaDescription: string | null;
  };
}

// ─── Resource ─────────────────────────────────────────────────────────────────
export interface Resource {
  _id: string;
  title: string;
  slug: string;
  description: string;
  contentMarkdown: string | null;
  category: string;
  subject: string;
  targetPrograms: string[];
  fileSecureUrl: string | null;
  fileType: "pdf" | "image" | "none";
  thumbnailSecureUrl: string | null;
  isFeatured: boolean;
  downloadCount: number;
  status: ResourceStatus;
  publishedAt: string | null;
  createdAt: string;
}

// ─── Result ───────────────────────────────────────────────────────────────────
export interface Result {
  _id: string;
  studentName: string;
  program: string;
  examName: string;
  score: string;
  rank: string | null;
  year: string;
  studentImageSecureUrl: string;
  studentImagePublicId: string;
  testimonialQuote: string | null;
  isFeatured: boolean;
  isVisible: boolean;
  priorityWeight: number;
  createdAt: string;
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
export interface GalleryImage {
  _id: string;
  imageSecureUrl: string;
  imagePublicId: string;
  thumbnailSecureUrl: string | null;
  caption: string | null;
  altText: string;
  category: GalleryCategory;
  eventName: string | null;
  takenAt: string | null;
  isFeatured: boolean;
  isVisible: boolean;
  order: number;
  createdAt: string;
}

// ─── Career Opening ───────────────────────────────────────────────────────────
export interface JobOpening {
  _id: string;
  title: string;
  slug: string;
  department: string;
  subject: string | null;
  programsAssigned: string[];
  jobDescription: string;
  responsibilities: string[];
  qualifications: string[];
  experienceRequired: string | null;
  employmentType: string;
  location: string;
  applicationCount: number;
  applicationDeadline: string | null;
  status: CareerStatus;
  createdAt: string;
}

// ─── Career Application ───────────────────────────────────────────────────────
export interface CareerApplication {
  _id: string;
  jobId: string;
  jobTitleSnapshot: string;
  applicantName: string;
  email: string;
  phone: string;
  currentLocation: string | null;
  yearsOfExperience: number | null;
  resumeSecureUrl: string;
  coverNote: string | null;
  status: ApplicationStatus;
  appliedAt: string;
  statusHistory: Array<{
    status: ApplicationStatus;
    changedAt: string;
    note: string | null;
  }>;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────
export interface DashboardStats {
  todayLeads: number;
  activePipeline: number;
  pendingFollowUps: number;
  publishedBlogs: number;
  publishedResources: number;
  totalResults: number;
  enrolledLeads: number;
  newApplications: number;
  leadsChartData: Array<{
    date: string;
    JEE: number;
    NEET: number;
    "MHT-CET": number;
    Foundation: number;
  }>;
  recentLeads: Lead[];
}

// ─── Settings ─────────────────────────────────────────────────────────────────
export interface SiteSettings {
  instituteName: string;
  tagline: string | null;
  address: {
    line1: string;
    line2: string | null;
    city: string;
    state: string;
    pincode: string;
  };
  phone: { primary: string; secondary: string | null };
  email: { enquiries: string; careers: string };
  whatsappNumber: string;
  googleMapsEmbedUrl: string | null;
  socialLinks: {
    facebook: string | null;
    instagram: string | null;
    youtube: string | null;
    twitter: string | null;
    linkedin: string | null;
  };
  seoDefaults: {
    metaTitleSuffix: string;
    defaultMetaDescription: string | null;
    googleSiteVerificationToken: string | null;
  };
  analytics: {
    googleAnalyticsId: string | null;
    googleTagManagerId: string | null;
    facebookPixelId: string | null;
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
  updatedAt: string;
}

// ─── Media Signature ──────────────────────────────────────────────────────────
export interface CloudinarySignature {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
}

// ─── Admin ────────────────────────────────────────────────────────────────────
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLoginAt: string;
}

// ─── Paginated Wrapper ─────────────────────────────────────────────────────────
export interface PaginatedData<T> {
  items: T[];
  pagination: ApiPagination;
}

// ─── Server Action Result ─────────────────────────────────────────────────────
export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  fields?: Record<string, string>;
}
