"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, ChevronRight, FileText, User, Users, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/shared/status-badge";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { mockJobOpenings, mockApplications, type CareerStatus, type ApplicationStatus } from "@/lib/mock-data";
import { formatDate, timeAgo } from "@/lib/utils";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const APP_STATUSES: ApplicationStatus[] = ["Applied", "Under Review", "Shortlisted", "Interview Scheduled", "Selected", "Rejected"];

export default function CareersPage() {
  const [openings, setOpenings] = useState(mockJobOpenings);
  const [applications, setApplications] = useState(mockApplications);
  const [filterJob, setFilterJob] = useState("all");
  const [filterAppStatus, setFilterAppStatus] = useState<ApplicationStatus | "all">("all");
  const [deleteOpeningId, setDeleteOpeningId] = useState<string | null>(null);

  const filteredApps = applications.filter((a) => {
    const matchJob = filterJob === "all" || a.jobId === filterJob;
    const matchStatus = filterAppStatus === "all" || a.status === filterAppStatus;
    return matchJob && matchStatus;
  });

  const toggleJobStatus = (id: string) => {
    setOpenings((prev) => prev.map((j) => {
      if (j.id !== id) return j;
      const next: CareerStatus = j.status === "active" ? "paused" : "active";
      toast.success(`Job "${j.title}" ${next === "active" ? "activated" : "paused"}.`);
      return { ...j, status: next };
    }));
  };

  const advanceApplication = (id: string) => {
    const order: ApplicationStatus[] = ["Applied", "Under Review", "Shortlisted", "Interview Scheduled", "Selected"];
    setApplications((prev) => prev.map((a) => {
      if (a.id !== id) return a;
      const idx = order.indexOf(a.status as ApplicationStatus);
      if (idx === -1 || idx >= order.length - 1) return a;
      const next = order[idx + 1];
      toast.success(`${a.applicantName} moved to "${next}"`);
      return { ...a, status: next };
    }));
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="openings">
        <TabsList className="mb-4">
          <TabsTrigger value="openings">
            <FileText className="h-3.5 w-3.5 mr-1.5" />
            Openings ({openings.length})
          </TabsTrigger>
          <TabsTrigger value="applications">
            <Users className="h-3.5 w-3.5 mr-1.5" />
            Applications ({applications.length})
          </TabsTrigger>
        </TabsList>

        {/* ─── Openings Tab ─── */}
        <TabsContent value="openings" className="space-y-4">
          <div className="flex justify-end">
            <Button className="bg-[#B08D57] hover:bg-[#C9A46E] text-[#14171B] font-semibold gap-1">
              <Plus className="h-4 w-4" />
              Post New Opening
            </Button>
          </div>

          <div className="space-y-3">
            {openings.map((job) => (
              <div key={job.id} className="rounded-xl border border-[#2C333C] bg-[#1C2025] p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-medium text-[#ECEDEE]">{job.title}</h3>
                      <StatusBadge status={job.status} />
                    </div>
                    <p className="text-xs text-[#8B919A] mb-2">{job.department} · {job.subject} · {job.employmentType}</p>
                    <p className="text-sm text-[#555D67] line-clamp-2">{job.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-[#555D67]">
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {job.applicationCount} applicants</span>
                      <span>Experience: {job.experienceRequired}</span>
                      {job.applicationDeadline && (
                        <span>Deadline: {formatDate(job.applicationDeadline)}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#2C333C] text-[#8B919A] hover:text-[#ECEDEE] text-xs"
                      onClick={() => toggleJobStatus(job.id)}
                    >
                      {job.status === "active" ? "Pause" : "Activate"}
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="h-7 w-7 text-[#555D67] hover:text-[#2A8FD4]">
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="h-7 w-7 text-[#555D67] hover:text-red-400" onClick={() => setDeleteOpeningId(job.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* ─── Applications Tab ─── */}
        <TabsContent value="applications" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={filterJob}
              onChange={(e) => setFilterJob(e.target.value)}
              className="h-10 rounded-md border border-[#2C333C] bg-black/20 px-3 text-sm text-[#ECEDEE] flex-1 focus:outline-none focus:ring-2 focus:ring-[#1E6FA8]"
            >
              <option value="all" className="bg-[#1C2025]">All Openings</option>
              {openings.map((j) => <option key={j.id} value={j.id} className="bg-[#1C2025]">{j.title}</option>)}
            </select>
            <div className="flex flex-wrap gap-1.5">
              {(["all", ...APP_STATUSES] as (ApplicationStatus | "all")[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterAppStatus(s)}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-medium border transition-all whitespace-nowrap",
                    filterAppStatus === s
                      ? "bg-[#1E6FA8] border-[#1E6FA8] text-white"
                      : "border-[#2C333C] text-[#8B919A] hover:border-[#3C434C]"
                  )}
                >
                  {s === "all" ? "All" : s}
                </button>
              ))}
            </div>
          </div>

          {/* Applications table */}
          <div className="rounded-xl border border-[#2C333C] bg-[#1C2025] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2C333C] bg-[#222830]/50">
                    {["Applicant", "Role", "Experience", "Applied", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-medium text-[#555D67] uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredApps.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-10 text-center text-sm text-[#555D67]">No applications found.</td></tr>
                  ) : (
                    filteredApps.map((app) => (
                      <tr key={app.id} className="border-b border-[#2C333C]/50 hover:bg-[#222830] transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#B08D57]/20 to-[#C9A46E]/20 flex items-center justify-center text-xs font-medium text-[#C9A46E] shrink-0">
                              {app.applicantName[0]}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#ECEDEE]">{app.applicantName}</p>
                              <p className="text-xs text-[#555D67]">{app.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-[#8B919A]">{app.jobTitle}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-[#8B919A]">{app.experience}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-[#555D67]">{timeAgo(app.appliedAt)}</span>
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={app.status} />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon-sm" className="h-7 w-7 text-[#555D67] hover:text-[#2A8FD4]">
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                            {app.status !== "Selected" && app.status !== "Rejected" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs text-[#555D67] hover:text-[#ECEDEE] gap-1"
                                onClick={() => advanceApplication(app.id)}
                              >
                                Advance <ChevronRight className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <ConfirmDialog
        open={!!deleteOpeningId}
        onOpenChange={(o) => !o && setDeleteOpeningId(null)}
        title="Delete Job Opening"
        description={openings.find(j => j.id === deleteOpeningId)?.applicationCount
          ? `This opening has ${openings.find(j => j.id === deleteOpeningId)?.applicationCount} applications. Consider closing it instead of deleting.`
          : "This will permanently delete the job opening."}
        confirmLabel="Delete Opening"
        onConfirm={() => {
          setOpenings((prev) => prev.filter((j) => j.id !== deleteOpeningId));
          toast.success("Job opening deleted.");
          setDeleteOpeningId(null);
        }}
      />
    </div>
  );
}
