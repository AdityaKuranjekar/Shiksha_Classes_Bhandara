"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Phone, Eye, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/status-badge";
import { type Lead, type LeadStatus, type Program } from "@/lib/api-types";
import { timeAgo } from "@/lib/utils";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useLeads } from "@/lib/hooks/use-leads";
import { updateLeadStatus } from "@/lib/server-actions/leads.actions";
import { TableSkeleton } from "@/components/shared/skeletons";

const STATUSES: { label: string; value: LeadStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "New" },
  { label: "Contacted", value: "Contacted" },
  { label: "Visit Scheduled", value: "Visit Scheduled" },
  { label: "Enrolled", value: "Enrolled" },
  { label: "Closed", value: "Closed" },
];

const PROGRAMS: (Program | "all")[] = ["all", "JEE", "NEET", "MHT-CET", "Foundation"];

const programColors: Record<string, string> = {
  JEE: "#2A8FD4",
  NEET: "#C9A46E",
  "MHT-CET": "#3D8E6B",
  Foundation: "#9B72CF",
};

export default function LeadsPage() {
  const [activeStatus, setActiveStatus] = useState<LeadStatus | "all">("all");
  const [activeProgram, setActiveProgram] = useState<Program | "all">("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { leadsData, isLoading, mutate } = useLeads({
    status: activeStatus,
    program: activeProgram,
    search,
    page,
  });

  const leads = leadsData?.items || [];
  
  // Note: we don't have accurate status counts without fetching all, 
  // so we'll omit them or use a separate endpoint in production.

  const advanceStatus = async (lead: Lead) => {
    const order: LeadStatus[] = ["New", "Contacted", "Visit Scheduled", "Enrolled"];
    const currentIdx = order.indexOf(lead.status as LeadStatus);
    if (currentIdx === -1 || currentIdx === order.length - 1) return;
    const next = order[currentIdx + 1];

    // Optimistic update
    mutate(
      (current) => {
        if (!current) return current;
        return {
          ...current,
          items: current.items.map((l) => (l._id === lead._id ? { ...l, status: next } : l)),
        };
      },
      false
    );

    const formData = new FormData();
    formData.append("status", next);
    const res = await updateLeadStatus(lead._id, formData);
    
    if (res.success) {
      toast.success(`${lead.name} moved to "${next}"`);
      mutate();
    } else {
      toast.error(res.error || "Failed to update status");
      mutate(); // revert on error
    }
  };

  const isOverdue = (lead: Lead) =>
    lead.followUpDate && new Date(lead.followUpDate) < new Date() && lead.status !== "Enrolled" && lead.status !== "Closed";
  const isToday = (lead: Lead) =>
    lead.followUpDate && new Date(lead.followUpDate).toDateString() === new Date().toDateString();

  return (
    <div className="space-y-4">
      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s.value}
            onClick={() => { setActiveStatus(s.value); setPage(1); }}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all duration-150 border",
              activeStatus === s.value
                ? "bg-[#1E6FA8] border-[#1E6FA8] text-white"
                : "border-[#2C333C] text-[#8B919A] hover:border-[#3C434C] hover:text-[#ECEDEE]"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#555D67]" />
          <Input
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={activeProgram}
            onChange={(e) => { setActiveProgram(e.target.value as Program | "all"); setPage(1); }}
            className="h-10 rounded-md border border-[#2C333C] bg-black/20 px-3 text-sm text-[#ECEDEE] focus:outline-none focus:ring-2 focus:ring-[#1E6FA8]"
          >
            {PROGRAMS.map((p) => (
              <option key={p} value={p} className="bg-[#1C2025]">
                {p === "all" ? "All Programs" : p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Count */}
      {!isLoading && leadsData && (
        <p className="text-xs text-[#555D67]">
          Showing <span className="text-[#ECEDEE]">{leadsData.pagination.total}</span> leads
        </p>
      )}

      {/* Table */}
      <div className="rounded-xl border border-[#2C333C] bg-[#1C2025] overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
             <TableSkeleton columns={8} rows={10} />
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2C333C] bg-[#222830]/50">
                  {["Name", "Phone", "Program", "Grade", "Status", "Follow-Up", "Time", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-[#555D67] uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-sm text-[#555D67]">
                      No leads match your filters.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr
                      key={lead._id}
                      className={cn(
                        "border-b border-[#2C333C]/50 transition-colors",
                        isOverdue(lead) ? "bg-red-500/4 hover:bg-red-500/8" :
                        isToday(lead) ? "bg-amber-500/4 hover:bg-amber-500/8" :
                        "hover:bg-[#222830]"
                      )}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#1E6FA8]/20 to-[#2A8FD4]/20 flex items-center justify-center text-xs font-medium text-[#2A8FD4] shrink-0">
                            {lead.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#ECEDEE]">{lead.name}</p>
                            {lead.isDuplicate && (
                              <span className="text-[10px] text-amber-400 bg-amber-400/10 px-1 rounded">Duplicate</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-sm text-[#8B919A] hover:text-[#2A8FD4] font-mono">
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                          style={{ background: `${programColors[lead.program] || "#fff"}15`, color: programColors[lead.program] || "#fff" }}
                        >
                          {lead.program}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-[#8B919A]">{lead.grade}</span>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={lead.status as any} />
                      </td>
                      <td className="px-4 py-3">
                        {lead.followUpDate ? (
                          <span className={cn("text-xs", isOverdue(lead) ? "text-red-400" : isToday(lead) ? "text-amber-400" : "text-[#555D67]")}>
                            {isOverdue(lead) ? "⚠ " : isToday(lead) ? "● " : ""}
                            {new Date(lead.followUpDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </span>
                        ) : (
                          <span className="text-xs text-[#555D67]">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-[#555D67]">{timeAgo(lead.createdAt)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Button asChild variant="ghost" size="icon-sm" className="h-7 w-7 text-[#555D67] hover:text-[#2A8FD4]">
                            <Link href={`/leads/${lead._id}`}>
                              <Eye className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                          {lead.status !== "Enrolled" && lead.status !== "Closed" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-[#555D67] hover:text-[#ECEDEE] gap-1"
                              onClick={() => advanceStatus(lead)}
                            >
                              Advance
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
      {/* Pagination controls */}
      {!isLoading && leadsData && leadsData.pagination.totalPages > 1 && (
        <div className="flex items-center justify-end gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={!leadsData.pagination.hasPrevPage}
          >
            Previous
          </Button>
          <span className="text-xs text-[#8B919A]">
            Page {page} of {leadsData.pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => p + 1)}
            disabled={!leadsData.pagination.hasNextPage}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
