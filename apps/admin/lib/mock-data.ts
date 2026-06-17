// Mock data for Shiksha Classes Admin Portal
// All data is static — replace with real API calls for production

export type LeadStatus = "New" | "Contacted" | "Visit Scheduled" | "Enrolled" | "Closed";
export type Program = "JEE" | "NEET" | "MHT-CET" | "Foundation";
export type BlogStatus = "draft" | "published" | "archived";
export type ResourceCategory = "Formula Sheet" | "PYQ" | "Notes" | "Study Guide" | "Revision Checklist";
export type Subject = "Physics" | "Chemistry" | "Mathematics" | "Biology" | "General";
export type CareerStatus = "active" | "paused" | "closed";
export type ApplicationStatus = "Applied" | "Under Review" | "Shortlisted" | "Interview Scheduled" | "Selected" | "Rejected";
export type GalleryCategory = "Classrooms" | "Events" | "Results Celebrations" | "Campus Life" | "Faculty" | "Awards";

// ─── LEADS ───────────────────────────────────────────────────────────────────
export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  grade: string;
  program: Program;
  status: LeadStatus;
  source: string;
  message?: string;
  followUpDate?: string;
  notes: { content: string; createdAt: string; author: string }[];
  createdAt: string;
  isDuplicate?: boolean;
}

export const mockLeads: Lead[] = [
  { id: "L001", name: "Aarav Sharma", phone: "+91 94230 12345", email: "aarav@gmail.com", grade: "10th Passed", program: "JEE", status: "New", source: "Homepage Hero", message: "Interested in JEE 2026 batch. Looking for details on fees and schedule.", followUpDate: "2026-06-18", notes: [], createdAt: "2026-06-17T08:00:00Z" },
  { id: "L002", name: "Priya Deshmukh", phone: "+91 98765 43210", grade: "12th", program: "NEET", status: "Contacted", source: "Program Page — NEET", message: "Wants to join NEET 2026. Mother enquired.", followUpDate: "2026-06-17T10:00:00Z", notes: [{ content: "Called mother. She will visit tomorrow with Priya.", createdAt: "2026-06-16T14:00:00Z", author: "Admin" }], createdAt: "2026-06-16T10:00:00Z" },
  { id: "L003", name: "Rohan Wankhede", phone: "+91 70120 34567", grade: "11th", program: "MHT-CET", status: "Visit Scheduled", source: "WhatsApp", message: "Interested in MHT-CET foundation. Has doubts about subjects.", followUpDate: "2026-06-19", notes: [{ content: "Scheduled visit for 19 Jun 11 AM.", createdAt: "2026-06-17T09:00:00Z", author: "Admin" }], createdAt: "2026-06-15T14:00:00Z" },
  { id: "L004", name: "Sneha Kadu", phone: "+91 88889 12345", grade: "10th", program: "Foundation", status: "Enrolled", source: "Google Search", notes: [], createdAt: "2026-06-10T09:00:00Z" },
  { id: "L005", name: "Vivek Thakur", phone: "+91 77770 56789", grade: "12th", program: "JEE", status: "New", source: "Facebook Ad", message: "JEE Advanced preparation. Already wrote JEE Mains.", notes: [], createdAt: "2026-06-17T07:30:00Z" },
  { id: "L006", name: "Ananya Bhate", phone: "+91 93456 78901", grade: "11th", program: "NEET", status: "Contacted", source: "Referral — Student", notes: [{ content: "Spoke to student directly. Very interested.", createdAt: "2026-06-15T11:00:00Z", author: "Admin" }], createdAt: "2026-06-14T16:00:00Z" },
  { id: "L007", name: "Kunal Mishra", phone: "+91 86701 23456", grade: "10th Passed", program: "JEE", status: "Closed", source: "Homepage Hero", notes: [{ content: "Went to a different institute.", createdAt: "2026-06-12T09:00:00Z", author: "Admin" }], createdAt: "2026-06-11T10:00:00Z" },
  { id: "L008", name: "Riya Patel", phone: "+91 91234 56789", grade: "12th", program: "NEET", status: "New", source: "Instagram", message: "Looking for NEET crash course for 2026.", followUpDate: "2026-06-16", notes: [], createdAt: "2026-06-17T06:00:00Z" },
  { id: "L009", name: "Aditya Kolhe", phone: "+91 72345 67890", grade: "11th", program: "JEE", status: "Visit Scheduled", source: "Contact Page", notes: [], followUpDate: "2026-06-20", createdAt: "2026-06-16T08:00:00Z" },
  { id: "L010", name: "Sakshi Jagtap", phone: "+91 89012 34567", grade: "10th", program: "MHT-CET", status: "Enrolled", source: "Walk-In", notes: [], createdAt: "2026-06-08T10:00:00Z" },
  { id: "L011", name: "Mehul Joshi", phone: "+91 96789 01234", grade: "12th", program: "JEE", status: "New", source: "Google Search", message: "Needs guidance on JEE vs MHT-CET choice.", notes: [], createdAt: "2026-06-17T05:00:00Z" },
  { id: "L012", name: "Pooja Rane", phone: "+91 84567 89012", grade: "11th", program: "NEET", status: "Contacted", source: "WhatsApp", notes: [], createdAt: "2026-06-15T12:00:00Z" },
];

// ─── BLOGS ───────────────────────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: BlogStatus;
  author: string;
  coverImage?: string;
  contentMarkdown: string;
  metaTitle?: string;
  metaDescription?: string;
  views: number;
  publishedAt?: string;
  createdAt: string;
}

export const mockBlogs: BlogPost[] = [
  { id: "B001", title: "How to Crack JEE Main 2026: A Complete Study Plan", slug: "crack-jee-main-2026-study-plan", excerpt: "A comprehensive month-by-month study plan to help you crack JEE Main 2026 with a strong score.", category: "JEE", tags: ["JEE", "Study Plan", "Physics", "Mathematics"], status: "published", author: "Admin", coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", contentMarkdown: "# How to Crack JEE Main 2026\n\nCracking JEE Main requires dedication and the right strategy...", views: 1245, publishedAt: "2026-05-15T09:00:00Z", createdAt: "2026-05-14T10:00:00Z" },
  { id: "B002", title: "NEET 2026 Biology: High-Yield Topics Every Student Must Cover", slug: "neet-2026-biology-high-yield-topics", excerpt: "Focus on these high-yield biology chapters to maximise your NEET score.", category: "NEET", tags: ["NEET", "Biology", "Botany", "Zoology"], status: "published", author: "Admin", coverImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400", contentMarkdown: "# NEET Biology High-Yield Topics\n\nBiology carries 360 marks in NEET...", views: 892, publishedAt: "2026-05-20T09:00:00Z", createdAt: "2026-05-18T10:00:00Z" },
  { id: "B003", title: "MHT-CET vs JEE: Which Should Class 11 Students Prioritize?", slug: "mht-cet-vs-jee-which-to-prioritize", excerpt: "A detailed comparison to help students and parents make the right choice.", category: "General", tags: ["MHT-CET", "JEE", "Career Guidance"], status: "draft", author: "Admin", contentMarkdown: "# MHT-CET vs JEE\n\nBoth exams test similar concepts...", views: 0, createdAt: "2026-06-10T10:00:00Z" },
  { id: "B004", title: "Top 5 Mistakes Students Make While Preparing for NEET", slug: "top-5-neet-preparation-mistakes", excerpt: "Avoid these common pitfalls to maximise your NEET preparation efficiency.", category: "NEET", tags: ["NEET", "Study Tips", "Mistakes"], status: "published", author: "Admin", coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", contentMarkdown: "# Top 5 NEET Mistakes\n\n1. Ignoring NCERT...", views: 567, publishedAt: "2026-06-01T09:00:00Z", createdAt: "2026-05-30T10:00:00Z" },
  { id: "B005", title: "Physics Formulae You Must Memorize for JEE", slug: "jee-physics-formulae-memorize", excerpt: "A curated list of the most important physics formulae for JEE Main and Advanced.", category: "JEE", tags: ["JEE", "Physics", "Formulae"], status: "archived", author: "Admin", views: 234, createdAt: "2026-04-10T10:00:00Z" },
];

// ─── RESOURCES ────────────────────────────────────────────────────────────────
export interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: ResourceCategory;
  subject: Subject;
  programs: Program[];
  status: "draft" | "published";
  isFeatured: boolean;
  fileUrl?: string;
  thumbnailUrl?: string;
  downloads: number;
  publishedAt?: string;
  createdAt: string;
}

export const mockResources: Resource[] = [
  { id: "R001", title: "Physics Formula Sheet — Mechanics & Thermodynamics", slug: "physics-formula-sheet-mechanics", description: "A complete formula sheet covering all mechanics and thermodynamics chapters for JEE & NEET.", category: "Formula Sheet", subject: "Physics", programs: ["JEE", "NEET", "MHT-CET"], status: "published", isFeatured: true, downloads: 342, publishedAt: "2026-05-01T09:00:00Z", createdAt: "2026-04-28T10:00:00Z" },
  { id: "R002", title: "Chemistry PYQ 2019–2024 — Organic Chemistry", slug: "chemistry-pyq-organic-2019-2024", description: "Previous year questions from 2019 to 2024 with detailed solutions for Organic Chemistry.", category: "PYQ", subject: "Chemistry", programs: ["JEE", "NEET"], status: "published", isFeatured: true, downloads: 518, publishedAt: "2026-04-15T09:00:00Z", createdAt: "2026-04-12T10:00:00Z" },
  { id: "R003", title: "Mathematics Notes — Calculus Complete", slug: "mathematics-notes-calculus", description: "Handwritten-style typed notes covering all calculus topics with examples.", category: "Notes", subject: "Mathematics", programs: ["JEE", "MHT-CET"], status: "published", isFeatured: false, downloads: 201, publishedAt: "2026-05-10T09:00:00Z", createdAt: "2026-05-08T10:00:00Z" },
  { id: "R004", title: "Biology Revision Checklist — Class 11 NCERT", slug: "biology-revision-checklist-class-11", description: "A chapter-by-chapter revision checklist to ensure complete NCERT Biology coverage.", category: "Revision Checklist", subject: "Biology", programs: ["NEET"], status: "published", isFeatured: false, downloads: 289, publishedAt: "2026-05-18T09:00:00Z", createdAt: "2026-05-16T10:00:00Z" },
  { id: "R005", title: "JEE Advanced 2023 Paper with Solutions", slug: "jee-advanced-2023-paper-solutions", description: "Complete JEE Advanced 2023 Paper 1 & 2 with detailed step-by-step solutions.", category: "PYQ", subject: "General", programs: ["JEE"], status: "draft", isFeatured: false, downloads: 0, createdAt: "2026-06-12T10:00:00Z" },
  { id: "R006", title: "Study Guide — How to Use NCERT Effectively for NEET", slug: "study-guide-ncert-for-neet", description: "A proven strategy guide for extracting maximum value from NCERT books for NEET.", category: "Study Guide", subject: "General", programs: ["NEET"], status: "published", isFeatured: true, downloads: 412, publishedAt: "2026-06-01T09:00:00Z", createdAt: "2026-05-30T10:00:00Z" },
];

// ─── RESULTS ─────────────────────────────────────────────────────────────────
export interface Result {
  id: string;
  studentName: string;
  score: string;
  rank?: string;
  program: Program;
  examName: string;
  year: string;
  testimonial?: string;
  imageUrl: string;
  isVisible: boolean;
  isFeatured: boolean;
  priorityWeight: number;
}

export const mockResults: Result[] = [
  { id: "RES001", studentName: "Arjun Mehta", score: "99.85 Percentile", rank: "AIR 342", program: "JEE", examName: "JEE Main 2025", year: "2025", testimonial: "Shiksha Classes gave me the foundation I needed.", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200", isVisible: true, isFeatured: true, priorityWeight: 100 },
  { id: "RES002", studentName: "Kavya Nair", score: "715/720", rank: "AIR 156", program: "NEET", examName: "NEET UG 2025", year: "2025", testimonial: "The faculty support was incredible throughout my journey.", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200", isVisible: true, isFeatured: true, priorityWeight: 95 },
  { id: "RES003", studentName: "Rahul Chaudhari", score: "98.5 Percentile", program: "MHT-CET", examName: "MHT-CET 2025", year: "2025", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200", isVisible: true, isFeatured: false, priorityWeight: 80 },
  { id: "RES004", studentName: "Shreya Joshi", score: "680/720", rank: "AIR 512", program: "NEET", examName: "NEET UG 2025", year: "2025", imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200", isVisible: true, isFeatured: true, priorityWeight: 90 },
  { id: "RES005", studentName: "Vikram Patil", score: "99.2 Percentile", rank: "State Rank 8", program: "JEE", examName: "JEE Main 2025", year: "2025", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200", isVisible: true, isFeatured: false, priorityWeight: 85 },
  { id: "RES006", studentName: "Aditi Kulkarni", score: "97.8 Percentile", program: "MHT-CET", examName: "MHT-CET 2024", year: "2024", imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200", isVisible: true, isFeatured: false, priorityWeight: 70 },
  { id: "RES007", studentName: "Nikhil Borkar", score: "665/720", program: "NEET", examName: "NEET UG 2024", year: "2024", imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200", isVisible: false, isFeatured: false, priorityWeight: 60 },
  { id: "RES008", studentName: "Prachi Desai", score: "99.6 Percentile", rank: "AIR 210", program: "JEE", examName: "JEE Main 2024", year: "2024", imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200", isVisible: true, isFeatured: false, priorityWeight: 75 },
];

// ─── GALLERY ──────────────────────────────────────────────────────────────────
export interface GalleryImage {
  id: string;
  imageUrl: string;
  caption?: string;
  altText: string;
  category: GalleryCategory;
  eventName?: string;
  dateTaken?: string;
  isVisible: boolean;
  isFeatured: boolean;
  order: number;
}

export const mockGallery: GalleryImage[] = [
  { id: "G001", imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600", caption: "Students in a Physics lecture", altText: "Students attentively listening to a physics lecture in classroom", category: "Classrooms", isVisible: true, isFeatured: true, order: 1 },
  { id: "G002", imageUrl: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600", caption: "Annual Results Day 2025", altText: "Students celebrating their JEE and NEET results on Results Day 2025", category: "Results Celebrations", eventName: "Results Day 2025", isVisible: true, isFeatured: true, order: 1 },
  { id: "G003", imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600", caption: "Science Lab session", altText: "Students conducting practical experiments in the science laboratory", category: "Classrooms", isVisible: true, isFeatured: false, order: 2 },
  { id: "G004", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600", caption: "Annual Seminar 2025", altText: "Faculty and students at the Shiksha Classes Annual Seminar 2025", category: "Events", eventName: "Annual Seminar 2025", isVisible: true, isFeatured: false, order: 1 },
  { id: "G005", imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600", caption: "Campus Life", altText: "Students relaxing and studying together in the campus common area", category: "Campus Life", isVisible: true, isFeatured: false, order: 1 },
  { id: "G006", imageUrl: "https://images.unsplash.com/photo-1598618443855-232ee0f819f6?w=600", caption: "Faculty Workshop", altText: "Shiksha Classes faculty members at a professional development workshop", category: "Faculty", isVisible: true, isFeatured: false, order: 1 },
  { id: "G007", imageUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=600", caption: "Best Coaching Institute Award 2024", altText: "Shiksha Classes receiving Best Coaching Institute Award 2024", category: "Awards", eventName: "Awards Ceremony 2024", isVisible: true, isFeatured: true, order: 1 },
  { id: "G008", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600", caption: "Interactive classroom session", altText: "Students interacting with faculty during an interactive classroom session", category: "Classrooms", isVisible: true, isFeatured: false, order: 3 },
];

// ─── CAREERS ─────────────────────────────────────────────────────────────────
export interface JobOpening {
  id: string;
  title: string;
  slug: string;
  department: string;
  subject: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  experienceRequired: string;
  employmentType: string;
  programs: Program[];
  status: CareerStatus;
  applicationCount: number;
  applicationDeadline?: string;
  createdAt: string;
}

export const mockJobOpenings: JobOpening[] = [
  { id: "J001", title: "Physics Faculty — JEE/NEET", slug: "physics-faculty-jee-neet", department: "Academic", subject: "Physics", description: "We're looking for an experienced Physics faculty member to teach JEE and NEET students.", responsibilities: ["Conduct engaging lectures for JEE/NEET batches", "Prepare study material and tests", "Provide personalized mentoring"], qualifications: ["B.Tech/M.Sc Physics", "2+ years teaching experience"], experienceRequired: "2-5 years", employmentType: "Full-Time", programs: ["JEE", "NEET"], status: "active", applicationCount: 8, applicationDeadline: "2026-07-15", createdAt: "2026-06-01T09:00:00Z" },
  { id: "J002", title: "Chemistry Faculty — NEET Specialist", slug: "chemistry-faculty-neet", department: "Academic", subject: "Chemistry", description: "Seeking a chemistry expert specializing in NEET organic and inorganic chemistry.", responsibilities: ["Teach organic & inorganic chemistry", "Create question banks", "Analyze student performance"], qualifications: ["M.Sc Chemistry or B.Tech Chemical Engineering", "NEET teaching background preferred"], experienceRequired: "1-3 years", employmentType: "Full-Time", programs: ["NEET", "MHT-CET"], status: "active", applicationCount: 5, createdAt: "2026-06-05T09:00:00Z" },
  { id: "J003", title: "Academic Counselor", slug: "academic-counselor", department: "Administration", subject: "General", description: "Handle student and parent inquiries, manage the admissions pipeline.", responsibilities: ["Handle lead follow-ups", "Schedule visits", "Manage admissions"], qualifications: ["Bachelor's degree", "Good communication skills"], experienceRequired: "0-2 years", employmentType: "Full-Time", programs: ["JEE", "NEET", "MHT-CET", "Foundation"], status: "paused", applicationCount: 12, createdAt: "2026-05-15T09:00:00Z" },
];

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  experience: string;
  coverNote?: string;
  resumeUrl: string;
  status: ApplicationStatus;
  appliedAt: string;
  notes: { content: string; createdAt: string }[];
  statusHistory: { status: ApplicationStatus; note?: string; changedAt: string }[];
}

export const mockApplications: Application[] = [
  { id: "A001", jobId: "J001", jobTitle: "Physics Faculty — JEE/NEET", applicantName: "Dr. Suresh Verma", email: "suresh.verma@gmail.com", phone: "+91 98765 11111", experience: "4 years", coverNote: "Passionate about physics education and student mentoring.", resumeUrl: "#", status: "Shortlisted", appliedAt: "2026-06-05T10:00:00Z", notes: [{ content: "Strong resume. Schedule demo lecture.", createdAt: "2026-06-08T09:00:00Z" }], statusHistory: [{ status: "Applied", changedAt: "2026-06-05T10:00:00Z" }, { status: "Under Review", changedAt: "2026-06-07T09:00:00Z" }, { status: "Shortlisted", changedAt: "2026-06-08T09:00:00Z" }] },
  { id: "A002", jobId: "J001", jobTitle: "Physics Faculty — JEE/NEET", applicantName: "Anil Kapoor", email: "anil.k@hotmail.com", phone: "+91 77777 22222", experience: "2 years", resumeUrl: "#", status: "Applied", appliedAt: "2026-06-10T12:00:00Z", notes: [], statusHistory: [{ status: "Applied", changedAt: "2026-06-10T12:00:00Z" }] },
  { id: "A003", jobId: "J002", jobTitle: "Chemistry Faculty — NEET Specialist", applicantName: "Meena Sharma", email: "meena.s@gmail.com", phone: "+91 88888 33333", experience: "3 years", coverNote: "5 years of NEET chemistry coaching. Strong in organic chemistry.", resumeUrl: "#", status: "Interview Scheduled", appliedAt: "2026-06-06T09:00:00Z", notes: [], statusHistory: [{ status: "Applied", changedAt: "2026-06-06T09:00:00Z" }, { status: "Under Review", changedAt: "2026-06-08T10:00:00Z" }, { status: "Shortlisted", changedAt: "2026-06-10T09:00:00Z" }, { status: "Interview Scheduled", changedAt: "2026-06-12T09:00:00Z" }] },
  { id: "A004", jobId: "J003", jobTitle: "Academic Counselor", applicantName: "Ravi Patil", email: "ravi.p@gmail.com", phone: "+91 99999 44444", experience: "1 year", resumeUrl: "#", status: "Rejected", appliedAt: "2026-05-20T10:00:00Z", notes: [{ content: "Not the right fit. Communication skills need improvement.", createdAt: "2026-05-25T09:00:00Z" }], statusHistory: [{ status: "Applied", changedAt: "2026-05-20T10:00:00Z" }, { status: "Rejected", changedAt: "2026-05-25T09:00:00Z" }] },
];

// ─── DASHBOARD STATS ──────────────────────────────────────────────────────────
export const dashboardStats = {
  todayLeads: 5,
  activePipeline: 23,
  pendingFollowUps: 3,
  newApplications: 2,
  publishedBlogs: mockBlogs.filter(b => b.status === "published").length,
  publishedResources: mockResources.filter(r => r.status === "published").length,
  totalResults: mockResults.filter(r => r.isVisible).length,
  enrolledLeads: mockLeads.filter(l => l.status === "Enrolled").length,
};

export const leadsChartData = [
  { date: "Jun 1", JEE: 3, NEET: 2, "MHT-CET": 1, Foundation: 0 },
  { date: "Jun 3", JEE: 2, NEET: 4, "MHT-CET": 2, Foundation: 1 },
  { date: "Jun 5", JEE: 5, NEET: 3, "MHT-CET": 1, Foundation: 0 },
  { date: "Jun 7", JEE: 4, NEET: 2, "MHT-CET": 3, Foundation: 2 },
  { date: "Jun 9", JEE: 6, NEET: 5, "MHT-CET": 2, Foundation: 1 },
  { date: "Jun 11", JEE: 3, NEET: 4, "MHT-CET": 1, Foundation: 0 },
  { date: "Jun 13", JEE: 7, NEET: 3, "MHT-CET": 4, Foundation: 1 },
  { date: "Jun 15", JEE: 5, NEET: 6, "MHT-CET": 2, Foundation: 2 },
  { date: "Jun 17", JEE: 4, NEET: 3, "MHT-CET": 1, Foundation: 0 },
];

export const programColors: Record<string, string> = {
  JEE: "#2A8FD4",
  NEET: "#C9A46E",
  "MHT-CET": "#3D8E6B",
  Foundation: "#9B72CF",
};
