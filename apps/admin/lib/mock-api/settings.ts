import type { SiteSettings } from "@/lib/api-types";

let settings: SiteSettings = {
  instituteName: "Shiksha Classes",
  tagline: "Premier JEE, NEET & MHT-CET Coaching in Bhandara",
  address: {
    line1: "Main Road",
    line2: null,
    city: "Bhandara",
    state: "Maharashtra",
    pincode: "441904",
  },
  phone: {
    primary: "+91 94230 12345",
    secondary: null,
  },
  email: {
    enquiries: "enquiry@shikshaclasses.in",
    careers: "careers@shikshaclasses.in",
  },
  whatsappNumber: "+91 94230 12345",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=...",
  socialLinks: {
    facebook: "https://facebook.com/shikshaclassesbhandara",
    instagram: "https://instagram.com/shikshaclasses",
    youtube: "",
    twitter: "",
    linkedin: "",
  },
  seoDefaults: {
    metaTitleSuffix: "Shiksha Classes Bhandara",
    defaultMetaDescription: "Premier coaching for JEE, NEET, MHT-CET in Bhandara. Expert faculty, proven results.",
    googleSiteVerificationToken: "",
  },
  analytics: {
    googleAnalyticsId: "",
    googleTagManagerId: "",
    facebookPixelId: "",
  },
  features: {
    showAnnouncementBanner: true,
    enableBlog: true,
    enableGallery: true,
    enableCareers: true,
    maintenanceMode: false,
  },
  legal: {
    privacyPolicyUrl: "",
    termsOfUseUrl: "",
    copyrightYear: 2026,
  },
  updatedAt: new Date().toISOString(),
};

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const SettingsAPI = {
  async get(): Promise<SiteSettings> {
    await delay();
    return { ...settings };
  },

  async update(data: Partial<SiteSettings>): Promise<SiteSettings> {
    await delay(500);
    // Deep merge for nested objects (simplified for mock)
    settings = {
      ...settings,
      ...data,
      address: { ...settings.address, ...(data.address ?? {}) },
      phone: { ...settings.phone, ...(data.phone ?? {}) },
      email: { ...settings.email, ...(data.email ?? {}) },
      socialLinks: { ...settings.socialLinks, ...(data.socialLinks ?? {}) },
      seoDefaults: { ...settings.seoDefaults, ...(data.seoDefaults ?? {}) },
      analytics: { ...settings.analytics, ...(data.analytics ?? {}) },
      features: { ...settings.features, ...(data.features ?? {}) },
      legal: { ...settings.legal, ...(data.legal ?? {}) },
      updatedAt: new Date().toISOString(),
    };
    return { ...settings };
  },
};
