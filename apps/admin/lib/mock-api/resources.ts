import type { Resource, ResourceStatus, PaginatedData } from "@/lib/api-types";

let resources: Resource[] = [
  { _id: "R001", title: "Physics Formula Sheet — Mechanics & Thermodynamics", slug: "physics-formula-sheet-mechanics", description: "A complete formula sheet covering all mechanics and thermodynamics chapters for JEE & NEET.", contentMarkdown: null, category: "Formula Sheet", subject: "Physics", targetPrograms: ["JEE", "NEET", "MHT-CET"], fileSecureUrl: "https://example.com/physics-formula.pdf", fileType: "pdf", thumbnailSecureUrl: null, isFeatured: true, downloadCount: 342, status: "published", publishedAt: "2026-05-01T09:00:00Z", createdAt: "2026-04-28T10:00:00Z" },
  { _id: "R002", title: "Chemistry PYQ 2019–2024 — Organic Chemistry", slug: "chemistry-pyq-organic-2019-2024", description: "Previous year questions from 2019 to 2024 with detailed solutions for Organic Chemistry.", contentMarkdown: null, category: "PYQ", subject: "Chemistry", targetPrograms: ["JEE", "NEET"], fileSecureUrl: "https://example.com/chem-pyq.pdf", fileType: "pdf", thumbnailSecureUrl: null, isFeatured: true, downloadCount: 518, status: "published", publishedAt: "2026-04-15T09:00:00Z", createdAt: "2026-04-12T10:00:00Z" },
  { _id: "R003", title: "Mathematics Notes — Calculus Complete", slug: "mathematics-notes-calculus", description: "Handwritten-style typed notes covering all calculus topics with examples.", contentMarkdown: null, category: "Notes", subject: "Mathematics", targetPrograms: ["JEE", "MHT-CET"], fileSecureUrl: "https://example.com/math-calculus.pdf", fileType: "pdf", thumbnailSecureUrl: null, isFeatured: false, downloadCount: 201, status: "published", publishedAt: "2026-05-10T09:00:00Z", createdAt: "2026-05-08T10:00:00Z" },
  { _id: "R004", title: "Biology Revision Checklist — Class 11 NCERT", slug: "biology-revision-checklist-class-11", description: "A chapter-by-chapter revision checklist to ensure complete NCERT Biology coverage.", contentMarkdown: null, category: "Revision Checklist", subject: "Biology", targetPrograms: ["NEET"], fileSecureUrl: "https://example.com/bio-check.pdf", fileType: "pdf", thumbnailSecureUrl: null, isFeatured: false, downloadCount: 289, status: "published", publishedAt: "2026-05-18T09:00:00Z", createdAt: "2026-05-16T10:00:00Z" },
  { _id: "R005", title: "JEE Advanced 2023 Paper with Solutions", slug: "jee-advanced-2023-paper-solutions", description: "Complete JEE Advanced 2023 Paper 1 & 2 with detailed step-by-step solutions.", contentMarkdown: null, category: "PYQ", subject: "General", targetPrograms: ["JEE"], fileSecureUrl: null, fileType: "none", thumbnailSecureUrl: null, isFeatured: false, downloadCount: 0, status: "draft", publishedAt: null, createdAt: "2026-06-12T10:00:00Z" },
  { _id: "R006", title: "Study Guide — How to Use NCERT Effectively for NEET", slug: "study-guide-ncert-for-neet", description: "A proven strategy guide for extracting maximum value from NCERT books for NEET.", contentMarkdown: "Read the book.", category: "Study Guide", subject: "General", targetPrograms: ["NEET"], fileSecureUrl: null, fileType: "none", thumbnailSecureUrl: null, isFeatured: true, downloadCount: 412, status: "published", publishedAt: "2026-06-01T09:00:00Z", createdAt: "2026-05-30T10:00:00Z" },
];

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const ResourcesAPI = {
  async list(params: {
    status?: string;
    category?: string;
    subject?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedData<Resource>> {
    await delay();
    let filtered = [...resources];
    
    if (params.status && params.status !== "all") {
      filtered = filtered.filter((r) => r.status === params.status);
    }
    if (params.category && params.category !== "all") {
      filtered = filtered.filter((r) => r.category === params.category);
    }
    if (params.subject && params.subject !== "all") {
      filtered = filtered.filter((r) => r.subject === params.subject);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter((r) => r.title.toLowerCase().includes(q));
    }
    
    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    return {
      items: filtered.slice((page - 1) * limit, page * limit),
      pagination: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 },
    };
  },

  async getById(id: string): Promise<Resource> {
    await delay();
    const res = resources.find((r) => r._id === id);
    if (!res) throw new Error("Resource not found");
    return { ...res };
  },

  async create(data: Partial<Resource>): Promise<Resource> {
    await delay(500);
    const newRes: Resource = {
      _id: `R${Date.now()}`,
      title: data.title ?? "",
      slug: data.slug ?? slugify(data.title ?? ""),
      description: data.description ?? "",
      contentMarkdown: data.contentMarkdown ?? null,
      category: data.category ?? "Notes",
      subject: data.subject ?? "General",
      targetPrograms: data.targetPrograms ?? [],
      fileSecureUrl: data.fileSecureUrl ?? null,
      fileType: data.fileType ?? "none",
      thumbnailSecureUrl: data.thumbnailSecureUrl ?? null,
      isFeatured: data.isFeatured ?? false,
      downloadCount: 0,
      status: data.status ?? "draft",
      publishedAt: data.status === "published" ? new Date().toISOString() : null,
      createdAt: new Date().toISOString(),
    };
    resources.unshift(newRes);
    return { ...newRes };
  },

  async update(id: string, data: Partial<Resource>): Promise<Resource> {
    await delay(400);
    const idx = resources.findIndex((r) => r._id === id);
    if (idx === -1) throw new Error("Resource not found");
    resources[idx] = { ...resources[idx], ...data };
    return { ...resources[idx] };
  },

  async patch(id: string, data: Partial<Resource>): Promise<Resource> {
    await delay(250);
    const idx = resources.findIndex((r) => r._id === id);
    if (idx === -1) throw new Error("Resource not found");
    
    let updateData = { ...data };
    if (data.status && data.status === "published" && !resources[idx].publishedAt) {
      updateData.publishedAt = new Date().toISOString();
    }
    
    resources[idx] = { ...resources[idx], ...updateData };
    return { ...resources[idx] };
  },

  async delete(id: string): Promise<void> {
    await delay(300);
    resources = resources.filter((r) => r._id !== id);
  },
};
