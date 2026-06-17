import type { BlogPost, BlogStatus, PaginatedData } from "@/lib/api-types";

let blogs: BlogPost[] = [
  { _id: "B001", title: "How to Crack JEE Main 2026: A Complete Study Plan", slug: "crack-jee-main-2026-study-plan", excerpt: "A comprehensive month-by-month study plan to help you crack JEE Main 2026 with a strong score.", contentMarkdown: "# How to Crack JEE Main 2026\n\nCracking JEE Main requires dedication and the right strategy...", category: "JEE", tags: ["JEE", "Study Plan", "Physics", "Mathematics"], coverImageSecureUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", coverImagePublicId: null, authorName: "Admin", status: "published", viewCount: 1245, publishedAt: "2026-05-15T09:00:00Z", createdAt: "2026-05-14T10:00:00Z", updatedAt: "2026-05-15T09:00:00Z" },
  { _id: "B002", title: "NEET 2026 Biology: High-Yield Topics Every Student Must Cover", slug: "neet-2026-biology-high-yield-topics", excerpt: "Focus on these high-yield biology chapters to maximise your NEET score.", contentMarkdown: "# NEET Biology High-Yield Topics\n\nBiology carries 360 marks in NEET...", category: "NEET", tags: ["NEET", "Biology", "Botany", "Zoology"], coverImageSecureUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400", coverImagePublicId: null, authorName: "Admin", status: "published", viewCount: 892, publishedAt: "2026-05-20T09:00:00Z", createdAt: "2026-05-18T10:00:00Z", updatedAt: "2026-05-20T09:00:00Z" },
  { _id: "B003", title: "MHT-CET vs JEE: Which Should Class 11 Students Prioritize?", slug: "mht-cet-vs-jee-which-to-prioritize", excerpt: "A detailed comparison to help students and parents make the right choice.", contentMarkdown: "# MHT-CET vs JEE\n\nBoth exams test similar concepts...", category: "General", tags: ["MHT-CET", "JEE", "Career Guidance"], coverImageSecureUrl: null, coverImagePublicId: null, authorName: "Admin", status: "draft", viewCount: 0, publishedAt: null, createdAt: "2026-06-10T10:00:00Z", updatedAt: "2026-06-10T10:00:00Z" },
  { _id: "B004", title: "Top 5 Mistakes Students Make While Preparing for NEET", slug: "top-5-neet-preparation-mistakes", excerpt: "Avoid these common pitfalls to maximise your NEET preparation efficiency.", contentMarkdown: "# Top 5 NEET Mistakes\n\n1. Ignoring NCERT...", category: "NEET", tags: ["NEET", "Study Tips", "Mistakes"], coverImageSecureUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", coverImagePublicId: null, authorName: "Admin", status: "published", viewCount: 567, publishedAt: "2026-06-01T09:00:00Z", createdAt: "2026-05-30T10:00:00Z", updatedAt: "2026-06-01T09:00:00Z" },
  { _id: "B005", title: "Physics Formulae You Must Memorize for JEE", slug: "jee-physics-formulae-memorize", excerpt: "A curated list of the most important physics formulae for JEE Main and Advanced.", contentMarkdown: "# JEE Physics Formulae\n\n## Mechanics\n\nF = ma...", category: "JEE", tags: ["JEE", "Physics", "Formulae"], coverImageSecureUrl: null, coverImagePublicId: null, authorName: "Admin", status: "archived", viewCount: 234, publishedAt: null, createdAt: "2026-04-10T10:00:00Z", updatedAt: "2026-04-10T10:00:00Z" },
];

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const BlogsAPI = {
  async list(params: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedData<BlogPost>> {
    await delay();
    // SWAP: return api.get<PaginatedData<BlogPost>>(`/admin/blogs?${new URLSearchParams(...)}`)
    let filtered = [...blogs];
    if (params.status && params.status !== "all") {
      filtered = filtered.filter((b) => b.status === params.status);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter((b) => b.title.toLowerCase().includes(q));
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

  async getById(id: string): Promise<BlogPost> {
    await delay();
    // SWAP: return api.get<BlogPost>(`/admin/blogs/${id}`)
    const blog = blogs.find((b) => b._id === id);
    if (!blog) throw new Error("Blog not found");
    return { ...blog };
  },

  async create(data: Partial<BlogPost>): Promise<BlogPost> {
    await delay(500);
    // SWAP: return api.post<BlogPost>("/admin/blogs", data)
    const newBlog: BlogPost = {
      _id: `B${Date.now()}`,
      title: data.title ?? "",
      slug: data.slug ?? slugify(data.title ?? ""),
      excerpt: data.excerpt ?? "",
      contentMarkdown: data.contentMarkdown ?? "",
      category: data.category ?? "",
      tags: data.tags ?? [],
      coverImageSecureUrl: data.coverImageSecureUrl ?? null,
      coverImagePublicId: data.coverImagePublicId ?? null,
      authorName: data.authorName ?? "Admin",
      status: data.status ?? "draft",
      viewCount: 0,
      publishedAt: data.status === "published" ? new Date().toISOString() : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seo: data.seo,
    };
    blogs.unshift(newBlog);
    return { ...newBlog };
  },

  async update(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
    await delay(400);
    // SWAP: return api.put<BlogPost>(`/admin/blogs/${id}`, data)
    const idx = blogs.findIndex((b) => b._id === id);
    if (idx === -1) throw new Error("Blog not found");
    blogs[idx] = { ...blogs[idx], ...data, updatedAt: new Date().toISOString() };
    return { ...blogs[idx] };
  },

  async patchStatus(id: string, status: BlogStatus): Promise<BlogPost> {
    await delay(250);
    // SWAP: return api.patch<BlogPost>(`/admin/blogs/${id}`, { status })
    const idx = blogs.findIndex((b) => b._id === id);
    if (idx === -1) throw new Error("Blog not found");
    const now = new Date().toISOString();
    blogs[idx] = {
      ...blogs[idx],
      status,
      publishedAt: status === "published" && !blogs[idx].publishedAt ? now : blogs[idx].publishedAt,
      updatedAt: now,
    };
    return { ...blogs[idx] };
  },

  async delete(id: string): Promise<void> {
    await delay(300);
    // SWAP: return api.del(`/admin/blogs/${id}`)
    blogs = blogs.filter((b) => b._id !== id);
  },
};
