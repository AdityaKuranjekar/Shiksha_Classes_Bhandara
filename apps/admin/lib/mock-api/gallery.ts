import type { GalleryImage, GalleryCategory } from "@/lib/api-types";

let gallery: GalleryImage[] = [
  { _id: "G001", imageSecureUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600", imagePublicId: "sample1", caption: "Students in a Physics lecture", altText: "Students attentively listening to a physics lecture in classroom", category: "Classrooms", eventName: null, takenAt: null, isVisible: true, isFeatured: true, order: 1, createdAt: "2026-06-01T10:00:00Z" },
  { _id: "G002", imageSecureUrl: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600", imagePublicId: "sample2", caption: "Annual Results Day 2025", altText: "Students celebrating their JEE and NEET results on Results Day 2025", category: "Results Celebrations", eventName: "Results Day 2025", takenAt: null, isVisible: true, isFeatured: true, order: 1, createdAt: "2026-06-01T10:05:00Z" },
  { _id: "G003", imageSecureUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600", imagePublicId: "sample3", caption: "Science Lab session", altText: "Students conducting practical experiments in the science laboratory", category: "Classrooms", eventName: null, takenAt: null, isVisible: true, isFeatured: false, order: 2, createdAt: "2026-06-01T10:10:00Z" },
  { _id: "G004", imageSecureUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600", imagePublicId: "sample4", caption: "Annual Seminar 2025", altText: "Faculty and students at the Shiksha Classes Annual Seminar 2025", category: "Events", eventName: "Annual Seminar 2025", takenAt: null, isVisible: true, isFeatured: false, order: 1, createdAt: "2026-06-01T10:15:00Z" },
  { _id: "G005", imageSecureUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600", imagePublicId: "sample5", caption: "Campus Life", altText: "Students relaxing and studying together in the campus common area", category: "Campus Life", eventName: null, takenAt: null, isVisible: true, isFeatured: false, order: 1, createdAt: "2026-06-01T10:20:00Z" },
  { _id: "G006", imageSecureUrl: "https://images.unsplash.com/photo-1598618443855-232ee0f819f6?w=600", imagePublicId: "sample6", caption: "Faculty Workshop", altText: "Shiksha Classes faculty members at a professional development workshop", category: "Faculty", eventName: null, takenAt: null, isVisible: true, isFeatured: false, order: 1, createdAt: "2026-06-01T10:25:00Z" },
  { _id: "G007", imageSecureUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=600", imagePublicId: "sample7", caption: "Best Coaching Institute Award 2024", altText: "Shiksha Classes receiving Best Coaching Institute Award 2024", category: "Awards", eventName: "Awards Ceremony 2024", takenAt: null, isVisible: true, isFeatured: true, order: 1, createdAt: "2026-06-01T10:30:00Z" },
  { _id: "G008", imageSecureUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600", imagePublicId: "sample8", caption: "Interactive classroom session", altText: "Students interacting with faculty during an interactive classroom session", category: "Classrooms", eventName: null, takenAt: null, isVisible: true, isFeatured: false, order: 3, createdAt: "2026-06-01T10:35:00Z" },
];

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const GalleryAPI = {
  async list(category?: string): Promise<{ data: GalleryImage[] }> {
    await delay();
    let filtered = [...gallery];
    if (category && category !== "all") {
      filtered = filtered.filter((g) => g.category === category);
    }
    // Sort by order
    filtered.sort((a, b) => a.order - b.order);
    return { data: filtered };
  },

  async create(data: Partial<GalleryImage>): Promise<GalleryImage> {
    await delay(500);
    const newImg: GalleryImage = {
      _id: `G${Date.now()}`,
      imageSecureUrl: data.imageSecureUrl ?? "",
      imagePublicId: data.imagePublicId ?? "",
      thumbnailSecureUrl: data.thumbnailSecureUrl ?? null,
      caption: data.caption ?? null,
      altText: data.altText ?? "",
      category: data.category ?? "Classrooms",
      eventName: data.eventName ?? null,
      takenAt: data.takenAt ?? null,
      isVisible: data.isVisible ?? true,
      isFeatured: data.isFeatured ?? false,
      order: gallery.length + 1,
      createdAt: new Date().toISOString(),
    };
    gallery.push(newImg);
    return { ...newImg };
  },

  async patch(id: string, data: Partial<GalleryImage>): Promise<GalleryImage> {
    await delay(250);
    const idx = gallery.findIndex((g) => g._id === id);
    if (idx === -1) throw new Error("Image not found");
    gallery[idx] = { ...gallery[idx], ...data };
    return { ...gallery[idx] };
  },

  async delete(id: string): Promise<void> {
    await delay(300);
    gallery = gallery.filter((g) => g._id !== id);
  },
};
