/**
 * Mock API Repository — Leads
 *
 * Simulates the real API contract with realistic async delays.
 * SWAP GUIDE: Replace each function body with:
 *   return api.get<T>(path) / api.post / api.patch / api.del
 *
 * Each function signature matches the real API's request/response shape exactly.
 */

import type {
  Lead,
  LeadStatus,
  PaginatedData,
  ActionResult,
} from "@/lib/api-types";

// Seed data (matches API response shape with _id)
let leads: Lead[] = [
  { _id: "L001", name: "Aarav Sharma", phone: "+91 94230 12345", email: "aarav@gmail.com", grade: "10th Passed", program: "JEE", status: "New", source: "Homepage Hero", message: "Interested in JEE 2026 batch. Looking for details on fees and schedule.", followUpDate: "2026-06-18T00:00:00Z", notes: [], isDuplicate: false, duplicateOfId: null, assignedTo: null, createdAt: "2026-06-17T08:00:00Z", updatedAt: "2026-06-17T08:00:00Z" },
  { _id: "L002", name: "Priya Deshmukh", phone: "+91 98765 43210", email: null, grade: "12th", program: "NEET", status: "Contacted", source: "Program Page — NEET", message: "Wants to join NEET 2026. Mother enquired.", followUpDate: "2026-06-17T10:00:00Z", notes: [{ _id: "N001", content: "Called mother. She will visit tomorrow with Priya.", createdAt: "2026-06-16T14:00:00Z", author: "Admin" }], isDuplicate: false, duplicateOfId: null, assignedTo: null, createdAt: "2026-06-16T10:00:00Z", updatedAt: "2026-06-16T10:00:00Z" },
  { _id: "L003", name: "Rohan Wankhede", phone: "+91 70120 34567", email: null, grade: "11th", program: "MHT-CET", status: "Visit Scheduled", source: "WhatsApp", message: "Interested in MHT-CET foundation.", followUpDate: "2026-06-19T00:00:00Z", notes: [{ _id: "N002", content: "Scheduled visit for 19 Jun 11 AM.", createdAt: "2026-06-17T09:00:00Z", author: "Admin" }], isDuplicate: false, duplicateOfId: null, assignedTo: null, createdAt: "2026-06-15T14:00:00Z", updatedAt: "2026-06-15T14:00:00Z" },
  { _id: "L004", name: "Sneha Kadu", phone: "+91 88889 12345", email: "sneha@gmail.com", grade: "10th", program: "Foundation", status: "Enrolled", source: "Google Search", message: null, followUpDate: null, notes: [], isDuplicate: false, duplicateOfId: null, assignedTo: null, createdAt: "2026-06-10T09:00:00Z", updatedAt: "2026-06-10T09:00:00Z" },
  { _id: "L005", name: "Vivek Thakur", phone: "+91 77770 56789", email: null, grade: "12th", program: "JEE", status: "New", source: "Facebook Ad", message: "JEE Advanced preparation. Already wrote JEE Mains.", followUpDate: null, notes: [], isDuplicate: false, duplicateOfId: null, assignedTo: null, createdAt: "2026-06-17T07:30:00Z", updatedAt: "2026-06-17T07:30:00Z" },
  { _id: "L006", name: "Ananya Bhate", phone: "+91 93456 78901", email: null, grade: "11th", program: "NEET", status: "Contacted", source: "Referral — Student", message: null, followUpDate: null, notes: [{ _id: "N003", content: "Spoke to student directly. Very interested.", createdAt: "2026-06-15T11:00:00Z", author: "Admin" }], isDuplicate: false, duplicateOfId: null, assignedTo: null, createdAt: "2026-06-14T16:00:00Z", updatedAt: "2026-06-14T16:00:00Z" },
  { _id: "L007", name: "Kunal Mishra", phone: "+91 86701 23456", email: null, grade: "10th Passed", program: "JEE", status: "Closed", source: "Homepage Hero", message: null, followUpDate: null, notes: [{ _id: "N004", content: "Went to a different institute.", createdAt: "2026-06-12T09:00:00Z", author: "Admin" }], isDuplicate: false, duplicateOfId: null, assignedTo: null, createdAt: "2026-06-11T10:00:00Z", updatedAt: "2026-06-11T10:00:00Z" },
  { _id: "L008", name: "Riya Patel", phone: "+91 91234 56789", email: null, grade: "12th", program: "NEET", status: "New", source: "Instagram", message: "Looking for NEET crash course for 2026.", followUpDate: "2026-06-16T00:00:00Z", notes: [], isDuplicate: false, duplicateOfId: null, assignedTo: null, createdAt: "2026-06-17T06:00:00Z", updatedAt: "2026-06-17T06:00:00Z" },
  { _id: "L009", name: "Aditya Kolhe", phone: "+91 72345 67890", email: null, grade: "11th", program: "JEE", status: "Visit Scheduled", source: "Contact Page", message: null, followUpDate: "2026-06-20T00:00:00Z", notes: [], isDuplicate: false, duplicateOfId: null, assignedTo: null, createdAt: "2026-06-16T08:00:00Z", updatedAt: "2026-06-16T08:00:00Z" },
  { _id: "L010", name: "Sakshi Jagtap", phone: "+91 89012 34567", email: null, grade: "10th", program: "MHT-CET", status: "Enrolled", source: "Walk-In", message: null, followUpDate: null, notes: [], isDuplicate: false, duplicateOfId: null, assignedTo: null, createdAt: "2026-06-08T10:00:00Z", updatedAt: "2026-06-08T10:00:00Z" },
  { _id: "L011", name: "Mehul Joshi", phone: "+91 96789 01234", email: null, grade: "12th", program: "JEE", status: "New", source: "Google Search", message: "Needs guidance on JEE vs MHT-CET choice.", followUpDate: null, notes: [], isDuplicate: false, duplicateOfId: null, assignedTo: null, createdAt: "2026-06-17T05:00:00Z", updatedAt: "2026-06-17T05:00:00Z" },
  { _id: "L012", name: "Pooja Rane", phone: "+91 84567 89012", email: null, grade: "11th", program: "NEET", status: "Contacted", source: "WhatsApp", message: null, followUpDate: null, notes: [], isDuplicate: false, duplicateOfId: null, assignedTo: null, createdAt: "2026-06-15T12:00:00Z", updatedAt: "2026-06-15T12:00:00Z" },
];

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const LeadsAPI = {
  async list(params: {
    status?: string;
    program?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedData<Lead>> {
    await delay();

    // SWAP: return api.get<PaginatedData<Lead>>(`/admin/leads?${new URLSearchParams(...)}`)

    let filtered = [...leads];
    if (params.status && params.status !== "all") {
      filtered = filtered.filter((l) => l.status === params.status);
    }
    if (params.program && params.program !== "all") {
      filtered = filtered.filter((l) => l.program === params.program);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.name.toLowerCase().includes(q) || l.phone.includes(params.search!)
      );
    }

    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const items = filtered.slice((page - 1) * limit, page * limit);

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  },

  async getById(id: string): Promise<Lead> {
    await delay();
    // SWAP: return api.get<Lead>(`/admin/leads/${id}`)
    const lead = leads.find((l) => l._id === id);
    if (!lead) throw new Error("Lead not found");
    return { ...lead };
  },

  async updateStatus(
    id: string,
    data: { status: LeadStatus; followUpDate?: string | null; assignedTo?: string }
  ): Promise<Lead> {
    await delay();
    // SWAP: return api.patch<Lead>(`/admin/leads/${id}`, data)
    const idx = leads.findIndex((l) => l._id === id);
    if (idx === -1) throw new Error("Lead not found");
    leads[idx] = {
      ...leads[idx],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return { ...leads[idx] };
  },

  async addNote(id: string, content: string): Promise<Lead> {
    await delay();
    // SWAP: return api.post<Lead>(`/admin/leads/${id}/notes`, { content })
    const idx = leads.findIndex((l) => l._id === id);
    if (idx === -1) throw new Error("Lead not found");
    const newNote = {
      _id: `N${Date.now()}`,
      content,
      author: "Admin",
      createdAt: new Date().toISOString(),
    };
    leads[idx] = {
      ...leads[idx],
      notes: [...leads[idx].notes, newNote],
      updatedAt: new Date().toISOString(),
    };
    return { ...leads[idx] };
  },
};
