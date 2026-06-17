import type { JobOpening, CareerApplication, CareerStatus, ApplicationStatus, PaginatedData } from "@/lib/api-types";

let openings: JobOpening[] = [
  { _id: "J001", title: "Physics Faculty — JEE/NEET", slug: "physics-faculty-jee-neet", department: "Academic", subject: "Physics", jobDescription: "We're looking for an experienced Physics faculty member to teach JEE and NEET students.", responsibilities: ["Conduct engaging lectures for JEE/NEET batches", "Prepare study material and tests", "Provide personalized mentoring"], qualifications: ["B.Tech/M.Sc Physics", "2+ years teaching experience"], experienceRequired: "2-5 years", employmentType: "Full-Time", programsAssigned: ["JEE", "NEET"], status: "active", applicationCount: 8, applicationDeadline: "2026-07-15", location: "Bhandara, Maharashtra", createdAt: "2026-06-01T09:00:00Z" },
  { _id: "J002", title: "Chemistry Faculty — NEET Specialist", slug: "chemistry-faculty-neet", department: "Academic", subject: "Chemistry", jobDescription: "Seeking a chemistry expert specializing in NEET organic and inorganic chemistry.", responsibilities: ["Teach organic & inorganic chemistry", "Create question banks", "Analyze student performance"], qualifications: ["M.Sc Chemistry or B.Tech Chemical Engineering", "NEET teaching background preferred"], experienceRequired: "1-3 years", employmentType: "Full-Time", programsAssigned: ["NEET", "MHT-CET"], status: "active", applicationCount: 5, applicationDeadline: null, location: "Bhandara, Maharashtra", createdAt: "2026-06-05T09:00:00Z" },
  { _id: "J003", title: "Academic Counselor", slug: "academic-counselor", department: "Administration", subject: "General", jobDescription: "Handle student and parent inquiries, manage the admissions pipeline.", responsibilities: ["Handle lead follow-ups", "Schedule visits", "Manage admissions"], qualifications: ["Bachelor's degree", "Good communication skills"], experienceRequired: "0-2 years", employmentType: "Full-Time", programsAssigned: ["JEE", "NEET", "MHT-CET", "Foundation"], status: "paused", applicationCount: 12, applicationDeadline: null, location: "Bhandara, Maharashtra", createdAt: "2026-05-15T09:00:00Z" },
];

let applications: CareerApplication[] = [
  { _id: "A001", jobId: "J001", jobTitleSnapshot: "Physics Faculty — JEE/NEET", applicantName: "Dr. Suresh Verma", email: "suresh.verma@gmail.com", phone: "+91 98765 11111", currentLocation: "Nagpur", yearsOfExperience: 4, coverNote: "Passionate about physics education and student mentoring.", resumeSecureUrl: "https://example.com/resume.pdf", status: "Shortlisted", appliedAt: "2026-06-05T10:00:00Z", statusHistory: [{ status: "Applied", changedAt: "2026-06-05T10:00:00Z", note: null }, { status: "Under Review", changedAt: "2026-06-07T09:00:00Z", note: null }, { status: "Shortlisted", changedAt: "2026-06-08T09:00:00Z", note: "Strong resume. Schedule demo lecture." }] },
  { _id: "A002", jobId: "J001", jobTitleSnapshot: "Physics Faculty — JEE/NEET", applicantName: "Anil Kapoor", email: "anil.k@hotmail.com", phone: "+91 77777 22222", currentLocation: "Bhandara", yearsOfExperience: 2, coverNote: null, resumeSecureUrl: "https://example.com/resume.pdf", status: "Applied", appliedAt: "2026-06-10T12:00:00Z", statusHistory: [{ status: "Applied", changedAt: "2026-06-10T12:00:00Z", note: null }] },
  { _id: "A003", jobId: "J002", jobTitleSnapshot: "Chemistry Faculty — NEET Specialist", applicantName: "Meena Sharma", email: "meena.s@gmail.com", phone: "+91 88888 33333", currentLocation: "Pune", yearsOfExperience: 3, coverNote: "5 years of NEET chemistry coaching. Strong in organic chemistry.", resumeSecureUrl: "https://example.com/resume.pdf", status: "Interview Scheduled", appliedAt: "2026-06-06T09:00:00Z", statusHistory: [{ status: "Applied", changedAt: "2026-06-06T09:00:00Z", note: null }, { status: "Under Review", changedAt: "2026-06-08T10:00:00Z", note: null }, { status: "Shortlisted", changedAt: "2026-06-10T09:00:00Z", note: null }, { status: "Interview Scheduled", changedAt: "2026-06-12T09:00:00Z", note: "Scheduled for 18th Jun" }] },
  { _id: "A004", jobId: "J003", jobTitleSnapshot: "Academic Counselor", applicantName: "Ravi Patil", email: "ravi.p@gmail.com", phone: "+91 99999 44444", currentLocation: "Bhandara", yearsOfExperience: 1, coverNote: null, resumeSecureUrl: "https://example.com/resume.pdf", status: "Rejected", appliedAt: "2026-05-20T10:00:00Z", statusHistory: [{ status: "Applied", changedAt: "2026-05-20T10:00:00Z", note: null }, { status: "Rejected", changedAt: "2026-05-25T09:00:00Z", note: "Not the right fit. Communication skills need improvement." }] },
];

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const CareersAPI = {
  // ─── Openings ────────────────────────────────────────────────────────────────
  async listOpenings(): Promise<{ data: JobOpening[] }> {
    await delay();
    return { data: [...openings] };
  },

  async createOpening(data: Partial<JobOpening>): Promise<JobOpening> {
    await delay(500);
    const newObj: JobOpening = {
      _id: `J${Date.now()}`,
      title: data.title ?? "",
      slug: data.slug ?? slugify(data.title ?? ""),
      department: data.department ?? "",
      subject: data.subject ?? null,
      programsAssigned: data.programsAssigned ?? [],
      jobDescription: data.jobDescription ?? "",
      responsibilities: data.responsibilities ?? [],
      qualifications: data.qualifications ?? [],
      experienceRequired: data.experienceRequired ?? null,
      employmentType: data.employmentType ?? "Full-Time",
      location: data.location ?? "Bhandara, Maharashtra",
      applicationCount: 0,
      applicationDeadline: data.applicationDeadline ?? null,
      status: data.status ?? "active",
      createdAt: new Date().toISOString(),
    };
    openings.unshift(newObj);
    return { ...newObj };
  },

  async patchOpening(id: string, data: Partial<JobOpening>): Promise<JobOpening> {
    await delay(300);
    const idx = openings.findIndex((j) => j._id === id);
    if (idx === -1) throw new Error("Job not found");
    openings[idx] = { ...openings[idx], ...data };
    return { ...openings[idx] };
  },

  async deleteOpening(id: string): Promise<void> {
    await delay(300);
    const job = openings.find((j) => j._id === id);
    if (job && job.applicationCount > 0) {
      throw new Error("Cannot delete opening with applications. Set status to closed instead.");
    }
    openings = openings.filter((j) => j._id !== id);
  },

  // ─── Applications ────────────────────────────────────────────────────────────
  async listApplications(params: {
    jobId?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedData<CareerApplication>> {
    await delay();
    let filtered = [...applications];
    
    if (params.jobId && params.jobId !== "all") {
      filtered = filtered.filter((a) => a.jobId === params.jobId);
    }
    if (params.status && params.status !== "all") {
      filtered = filtered.filter((a) => a.status === params.status);
    }

    // Sort by newest
    filtered.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());

    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    return {
      items: filtered.slice((page - 1) * limit, page * limit),
      pagination: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 },
    };
  },

  async patchApplicationStatus(
    id: string,
    status: ApplicationStatus,
    note?: string
  ): Promise<CareerApplication> {
    await delay(300);
    const idx = applications.findIndex((a) => a._id === id);
    if (idx === -1) throw new Error("Application not found");
    
    applications[idx] = {
      ...applications[idx],
      status,
      statusHistory: [
        ...applications[idx].statusHistory,
        { status, changedAt: new Date().toISOString(), note: note ?? null }
      ]
    };
    return { ...applications[idx] };
  }
};
