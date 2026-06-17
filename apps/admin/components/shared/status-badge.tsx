import { cn } from "@/lib/utils";
import { type LeadStatus, type BlogStatus, type CareerStatus, type ApplicationStatus } from "@/lib/mock-data";

type Status = LeadStatus | BlogStatus | CareerStatus | ApplicationStatus | "published" | "draft" | "active" | "paused" | "closed" | "archived" | "visible" | "hidden" | string;

const statusConfig: Record<string, { label: string; className: string }> = {
  // Lead statuses
  New: { label: "New", className: "bg-blue-500/10 text-blue-400 border border-blue-500/20" },
  Contacted: { label: "Contacted", className: "bg-amber-500/10 text-amber-400 border border-amber-500/20" },
  "Visit Scheduled": { label: "Visit Scheduled", className: "bg-purple-500/10 text-purple-400 border border-purple-500/20" },
  Enrolled: { label: "Enrolled", className: "bg-green-500/10 text-green-400 border border-green-500/20" },
  Closed: { label: "Closed", className: "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20" },
  // Blog / resource statuses
  draft: { label: "Draft", className: "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20" },
  published: { label: "Published", className: "bg-green-500/10 text-green-400 border border-green-500/20" },
  archived: { label: "Archived", className: "bg-red-500/10 text-red-400 border border-red-500/20" },
  // Career statuses
  active: { label: "Active", className: "bg-green-500/10 text-green-400 border border-green-500/20" },
  paused: { label: "Paused", className: "bg-amber-500/10 text-amber-400 border border-amber-500/20" },
  closed: { label: "Closed", className: "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20" },
  // Application statuses
  Applied: { label: "Applied", className: "bg-blue-500/10 text-blue-400 border border-blue-500/20" },
  "Under Review": { label: "Under Review", className: "bg-amber-500/10 text-amber-400 border border-amber-500/20" },
  Shortlisted: { label: "Shortlisted", className: "bg-purple-500/10 text-purple-400 border border-purple-500/20" },
  "Interview Scheduled": { label: "Interview Scheduled", className: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" },
  Selected: { label: "Selected", className: "bg-green-500/10 text-green-400 border border-green-500/20" },
  Rejected: { label: "Rejected", className: "bg-red-500/10 text-red-400 border border-red-500/20" },
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || {
    label: status,
    className: "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
