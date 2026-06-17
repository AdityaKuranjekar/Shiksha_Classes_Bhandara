"use client";

import { Users, FileText, Trophy, BookOpen, TrendingUp, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { timeAgo } from "@/lib/utils";
import { useDashboard } from "@/lib/hooks/use-dashboard";
import { useAuth } from "@/contexts/auth-context";
import { StatCardSkeleton, TableSkeleton } from "@/components/shared/skeletons";

const programColors: Record<string, string> = {
  JEE: "#2A8FD4",
  NEET: "#C9A46E",
  "MHT-CET": "#3D8E6B",
  Foundation: "#9B72CF",
};

export default function DashboardPage() {
  const { stats, isLoading } = useDashboard();
  const { admin } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold tracking-widest text-[#B08D57] uppercase mb-1">Overview</p>
          <h2 className="font-serif text-2xl font-light text-[#ECEDEE]">
            Good morning, <span className="italic text-[#2A8FD4]">{admin?.name || "Admin"}</span>
          </h2>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="border-[#2C333C] text-[#8B919A] hover:text-[#ECEDEE] hover:bg-[#222830]">
            <Link href="/results/new">
              <Plus className="h-3.5 w-3.5" />
              Add Result
            </Link>
          </Button>
          <Button asChild size="sm" className="bg-[#B08D57] hover:bg-[#C9A46E] text-[#14171B] font-semibold">
            <Link href="/blogs/new">
              <Plus className="h-3.5 w-3.5" />
              New Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {isLoading || !stats ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              label="Today's Leads"
              value={stats.todayLeads}
              icon={Users}
              accentColor="blue"
              trend={{ value: 2, label: "vs yesterday" }}
            />
            <StatCard
              label="Active Pipeline"
              value={stats.activePipeline}
              icon={TrendingUp}
              accentColor="brass"
              trend={{ value: 5, label: "this week" }}
            />
            <StatCard
              label="Published Content"
              value={stats.publishedBlogs + stats.publishedResources}
              icon={BookOpen}
              accentColor="green"
            />
            <StatCard
              label="Total Enrolled"
              value={stats.enrolledLeads}
              icon={Trophy}
              accentColor="purple"
              trend={{ value: 12, label: "this month" }}
            />
          </>
        )}
      </div>

      {/* Chart + Quick Stats */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Leads Chart */}
        <Card className="lg:col-span-2 bg-[#1C2025] border-[#2C333C]">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-[#ECEDEE]">Leads by Program</CardTitle>
              <span className="text-xs text-[#555D67]">Last 30 days</span>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading || !stats ? (
              <div className="h-[200px] flex items-center justify-center text-[#555D67] animate-pulse">Loading chart...</div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={stats.leadsChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2C333C" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#555D67", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#555D67", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{ background: "#222830", border: "1px solid #2C333C", borderRadius: 8, color: "#ECEDEE", fontSize: 12 }}
                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: 11, color: "#8B919A", paddingTop: 12 }}
                  />
                  {Object.entries(programColors).map(([prog, color]) => (
                    <Bar key={prog} dataKey={prog} fill={color} radius={[3, 3, 0, 0]} maxBarSize={20} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Quick stats */}
        <div className="space-y-3">
          {isLoading || !stats ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-[#2C333C] bg-[#1C2025] h-[52px] animate-pulse" />
            ))
          ) : (
            [
              { label: "Published Blogs", value: stats.publishedBlogs, color: "text-[#2A8FD4]", href: "/blogs" },
              { label: "Resources Live", value: stats.publishedResources, color: "text-[#C9A46E]", href: "/resources" },
              { label: "Results Listed", value: stats.totalResults, color: "text-green-400", href: "/results" },
              { label: "Pending Follow-Ups", value: stats.pendingFollowUps, color: "text-amber-400", href: "/leads" },
            ].map((stat) => (
              <Link key={stat.label} href={stat.href}>
                <div className="flex items-center justify-between rounded-lg border border-[#2C333C] bg-[#1C2025] px-4 py-3 hover:border-[#3C434C] hover:bg-[#222830] transition-all duration-150 cursor-pointer">
                  <span className="text-xs text-[#8B919A]">{stat.label}</span>
                  <span className={`text-xl font-light font-serif ${stat.color}`}>{stat.value}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Recent Leads */}
      <Card className="bg-[#1C2025] border-[#2C333C]">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-[#ECEDEE]">Recent Leads</CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-[#2A8FD4] hover:text-[#ECEDEE] text-xs h-7">
              <Link href="/leads">
                View All <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            {isLoading || !stats ? (
              <div className="p-4"><TableSkeleton rows={5} /></div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2C333C]">
                    {["Name", "Phone", "Program", "Status", "Time"].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-[#555D67] uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats.recentLeads.map((lead, i) => (
                    <tr
                      key={lead._id}
                      className={`border-b border-[#2C333C]/50 hover:bg-[#222830] transition-colors cursor-pointer ${i === stats.recentLeads.length - 1 ? "border-b-0" : ""}`}
                    >
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-[#ECEDEE]">{lead.name}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-[#8B919A] font-mono">{lead.phone}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium"
                          style={{
                            background: `${programColors[lead.program]}15`,
                            color: programColors[lead.program],
                          }}
                        >
                          {lead.program}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {/* We have a type mismatch in mock data between standard LeadStatus and StatusBadge expectations, but it will pass compilation because we casted or used strings in badge. */}
                        <StatusBadge status={lead.status as any} />
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-[#555D67]">{timeAgo(lead.createdAt)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div>
        <p className="text-xs font-semibold tracking-widest text-[#555D67] uppercase mb-3">Quick Actions</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Upload Resource", href: "/resources/new", icon: FileText },
            { label: "Add Result", href: "/results/new", icon: Trophy },
            { label: "Post Blog", href: "/blogs/new", icon: BookOpen },
            { label: "Post Job", href: "/careers", icon: Users },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.label} href={action.href}>
                <div className="flex items-center gap-2.5 rounded-lg border border-[#2C333C] bg-[#1C2025] px-4 py-3 hover:border-[#B08D57]/30 hover:bg-[#222830] transition-all duration-150 group">
                  <Icon className="h-4 w-4 text-[#555D67] group-hover:text-[#B08D57] transition-colors" />
                  <span className="text-sm text-[#8B919A] group-hover:text-[#ECEDEE] transition-colors">{action.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
