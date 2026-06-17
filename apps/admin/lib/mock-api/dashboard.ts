import type { DashboardStats } from "@/lib/api-types";
import { LeadsAPI } from "./leads";
import { BlogsAPI } from "./blogs";
import { ResourcesAPI } from "./resources";
import { ResultsAPI } from "./results";
import { CareersAPI } from "./careers";

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const DashboardAPI = {
  async getStats(): Promise<DashboardStats> {
    await delay(600); // Simulate parallel data fetching delay

    // In a real app, this would be an aggregation endpoint or parallel fetch
    const [leadsData, blogsData, resourcesData, resultsData, appsData] = await Promise.all([
      LeadsAPI.list({ limit: 1000 }),
      BlogsAPI.list({ limit: 1000, status: "published" }),
      ResourcesAPI.list({ limit: 1000, status: "published" }),
      ResultsAPI.list({ limit: 1000, visibility: "visible" }),
      CareersAPI.listApplications({ limit: 1000, status: "Applied" }),
    ]);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayLeads = leadsData.items.filter(
      (l) => new Date(l.createdAt) >= todayStart
    ).length;

    const activePipeline = leadsData.items.filter(
      (l) => !["Enrolled", "Closed"].includes(l.status)
    ).length;

    const pendingFollowUps = leadsData.items.filter(
      (l) => l.followUpDate && new Date(l.followUpDate) <= todayStart && !["Enrolled", "Closed"].includes(l.status)
    ).length;

    const enrolledLeads = leadsData.items.filter(
      (l) => l.status === "Enrolled"
    ).length;

    return {
      todayLeads,
      activePipeline,
      pendingFollowUps,
      enrolledLeads,
      publishedBlogs: blogsData.items.length,
      publishedResources: resourcesData.items.length,
      totalResults: resultsData.items.length,
      newApplications: appsData.items.length,
      leadsChartData: [
        { date: "Jun 1", JEE: 3, NEET: 2, "MHT-CET": 1, Foundation: 0 },
        { date: "Jun 3", JEE: 2, NEET: 4, "MHT-CET": 2, Foundation: 1 },
        { date: "Jun 5", JEE: 5, NEET: 3, "MHT-CET": 1, Foundation: 0 },
        { date: "Jun 7", JEE: 4, NEET: 2, "MHT-CET": 3, Foundation: 2 },
        { date: "Jun 9", JEE: 6, NEET: 5, "MHT-CET": 2, Foundation: 1 },
        { date: "Jun 11", JEE: 3, NEET: 4, "MHT-CET": 1, Foundation: 0 },
        { date: "Jun 13", JEE: 7, NEET: 3, "MHT-CET": 4, Foundation: 1 },
        { date: "Jun 15", JEE: 5, NEET: 6, "MHT-CET": 2, Foundation: 2 },
        { date: "Jun 17", JEE: 4, NEET: 3, "MHT-CET": 1, Foundation: 0 },
      ],
      recentLeads: leadsData.items.slice(0, 5),
    };
  },
};
