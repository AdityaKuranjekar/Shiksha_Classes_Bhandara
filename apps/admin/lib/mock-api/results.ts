import type { Result, PaginatedData } from "@/lib/api-types";

let results: Result[] = [
  { _id: "RES001", studentName: "Arjun Mehta", score: "99.85 Percentile", rank: "AIR 342", program: "JEE", examName: "JEE Main 2025", year: "2025", testimonialQuote: "Shiksha Classes gave me the foundation I needed.", studentImageSecureUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200", studentImagePublicId: "sample1", isVisible: true, isFeatured: true, priorityWeight: 100, createdAt: "2026-06-01T10:00:00Z" },
  { _id: "RES002", studentName: "Kavya Nair", score: "715/720", rank: "AIR 156", program: "NEET", examName: "NEET UG 2025", year: "2025", testimonialQuote: "The faculty support was incredible throughout my journey.", studentImageSecureUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200", studentImagePublicId: "sample2", isVisible: true, isFeatured: true, priorityWeight: 95, createdAt: "2026-06-01T10:05:00Z" },
  { _id: "RES003", studentName: "Rahul Chaudhari", score: "98.5 Percentile", rank: null, program: "MHT-CET", examName: "MHT-CET 2025", year: "2025", testimonialQuote: null, studentImageSecureUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200", studentImagePublicId: "sample3", isVisible: true, isFeatured: false, priorityWeight: 80, createdAt: "2026-06-01T10:10:00Z" },
  { _id: "RES004", studentName: "Shreya Joshi", score: "680/720", rank: "AIR 512", program: "NEET", examName: "NEET UG 2025", year: "2025", testimonialQuote: null, studentImageSecureUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200", studentImagePublicId: "sample4", isVisible: true, isFeatured: true, priorityWeight: 90, createdAt: "2026-06-01T10:15:00Z" },
  { _id: "RES005", studentName: "Vikram Patil", score: "99.2 Percentile", rank: "State Rank 8", program: "JEE", examName: "JEE Main 2025", year: "2025", testimonialQuote: null, studentImageSecureUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200", studentImagePublicId: "sample5", isVisible: true, isFeatured: false, priorityWeight: 85, createdAt: "2026-06-01T10:20:00Z" },
  { _id: "RES006", studentName: "Aditi Kulkarni", score: "97.8 Percentile", rank: null, program: "MHT-CET", examName: "MHT-CET 2024", year: "2024", testimonialQuote: null, studentImageSecureUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200", studentImagePublicId: "sample6", isVisible: true, isFeatured: false, priorityWeight: 70, createdAt: "2026-06-01T10:25:00Z" },
  { _id: "RES007", studentName: "Nikhil Borkar", score: "665/720", rank: null, program: "NEET", examName: "NEET UG 2024", year: "2024", testimonialQuote: null, studentImageSecureUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200", studentImagePublicId: "sample7", isVisible: false, isFeatured: false, priorityWeight: 60, createdAt: "2026-06-01T10:30:00Z" },
  { _id: "RES008", studentName: "Prachi Desai", score: "99.6 Percentile", rank: "AIR 210", program: "JEE", examName: "JEE Main 2024", year: "2024", testimonialQuote: null, studentImageSecureUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200", studentImagePublicId: "sample8", isVisible: true, isFeatured: false, priorityWeight: 75, createdAt: "2026-06-01T10:35:00Z" },
];

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const ResultsAPI = {
  async list(params: {
    program?: string;
    year?: string;
    visibility?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedData<Result>> {
    await delay();
    let filtered = [...results];
    
    if (params.program && params.program !== "all") {
      filtered = filtered.filter((r) => r.program === params.program);
    }
    if (params.year && params.year !== "all") {
      filtered = filtered.filter((r) => r.year === params.year);
    }
    if (params.visibility === "visible") {
      filtered = filtered.filter((r) => r.isVisible);
    } else if (params.visibility === "hidden") {
      filtered = filtered.filter((r) => !r.isVisible);
    }
    
    // Sort by priorityWeight descending
    filtered.sort((a, b) => b.priorityWeight - a.priorityWeight);

    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    return {
      items: filtered.slice((page - 1) * limit, page * limit),
      pagination: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 },
    };
  },

  async getById(id: string): Promise<Result> {
    await delay();
    const res = results.find((r) => r._id === id);
    if (!res) throw new Error("Result not found");
    return { ...res };
  },

  async create(data: Partial<Result>): Promise<Result> {
    await delay(500);
    const newRes: Result = {
      _id: `RES${Date.now()}`,
      studentName: data.studentName ?? "",
      program: data.program ?? "JEE",
      examName: data.examName ?? "",
      score: data.score ?? "",
      rank: data.rank ?? null,
      year: data.year ?? new Date().getFullYear().toString(),
      studentImageSecureUrl: data.studentImageSecureUrl ?? "",
      studentImagePublicId: data.studentImagePublicId ?? "",
      testimonialQuote: data.testimonialQuote ?? null,
      isFeatured: data.isFeatured ?? false,
      isVisible: data.isVisible ?? true,
      priorityWeight: data.priorityWeight ?? 0,
      createdAt: new Date().toISOString(),
    };
    results.unshift(newRes);
    return { ...newRes };
  },

  async update(id: string, data: Partial<Result>): Promise<Result> {
    await delay(400);
    const idx = results.findIndex((r) => r._id === id);
    if (idx === -1) throw new Error("Result not found");
    results[idx] = { ...results[idx], ...data };
    return { ...results[idx] };
  },

  async patch(id: string, data: Partial<Result>): Promise<Result> {
    await delay(250);
    const idx = results.findIndex((r) => r._id === id);
    if (idx === -1) throw new Error("Result not found");
    results[idx] = { ...results[idx], ...data };
    return { ...results[idx] };
  },

  async delete(id: string): Promise<void> {
    await delay(300);
    results = results.filter((r) => r._id !== id);
  },
};
