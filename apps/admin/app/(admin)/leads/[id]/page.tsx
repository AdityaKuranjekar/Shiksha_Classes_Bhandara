"use client";

import { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MessageSquare, Clock, Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/shared/status-badge";
import { type LeadStatus } from "@/lib/api-types";
import { formatDateTime, timeAgo } from "@/lib/utils";
import { toast } from "sonner";
import { useLead } from "@/lib/hooks/use-leads";
import { updateLeadStatus, addLeadNote } from "@/lib/server-actions/leads.actions";
import { FormSkeleton } from "@/components/shared/skeletons";

const PIPELINE: LeadStatus[] = ["New", "Contacted", "Visit Scheduled", "Enrolled"];

const programColors: Record<string, string> = {
  JEE: "#2A8FD4",
  NEET: "#C9A46E",
  "MHT-CET": "#3D8E6B",
  Foundation: "#9B72CF",
};

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const { lead, isLoading, mutate } = useLead(id);
  const [note, setNote] = useState("");

  if (isLoading) {
    return (
      <div className="space-y-5 max-w-5xl">
        <FormSkeleton rows={3} />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-[#555D67]">Lead not found.</p>
      </div>
    );
  }

  const handleAddNote = async () => {
    if (!note.trim()) return;
    
    // Optimistic update
    const newNote = { _id: "temp", content: note, author: "Admin", createdAt: new Date().toISOString() };
    mutate({ ...lead, notes: [...lead.notes, newNote] }, false);
    
    const currentNote = note;
    setNote("");

    const formData = new FormData();
    formData.append("content", currentNote);
    
    const res = await addLeadNote(lead._id, formData);
    if (res.success) {
      toast.success("Note added.");
      mutate();
    } else {
      toast.error(res.error || "Failed to add note");
      mutate(); // revert
      setNote(currentNote);
    }
  };

  const advanceStatus = async () => {
    const idx = PIPELINE.indexOf(lead.status as LeadStatus);
    if (idx < PIPELINE.length - 1) {
      const next = PIPELINE[idx + 1];
      
      // Optimistic update
      mutate({ ...lead, status: next }, false);
      
      const formData = new FormData();
      formData.append("status", next);
      
      const res = await updateLeadStatus(lead._id, formData);
      if (res.success) {
        toast.success(`Status updated to "${next}"`);
        mutate();
      } else {
        toast.error(res.error || "Failed to update status");
        mutate(); // revert
      }
    }
  };

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Back */}
      <Button asChild variant="ghost" size="sm" className="text-[#8B919A] hover:text-[#ECEDEE] -ml-2">
        <Link href="/leads">
          <ArrowLeft className="h-4 w-4" />
          Back to Leads
        </Link>
      </Button>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Lead Info Card */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-xl border border-[#2C333C] bg-[#1C2025] p-5">
            {/* Avatar + name */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#1E6FA8]/30 to-[#2A8FD4]/20 flex items-center justify-center text-lg font-light text-[#2A8FD4]">
                {lead.name[0]}
              </div>
              <div>
                <p className="font-semibold text-[#ECEDEE]">{lead.name}</p>
                <StatusBadge status={lead.status as any} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#555D67]" />
                <a href={`tel:${lead.phone}`} className="text-sm text-[#2A8FD4] hover:underline">{lead.phone}</a>
              </div>
              {lead.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-[#555D67]" />
                  <a href={`mailto:${lead.email}`} className="text-sm text-[#8B919A] hover:text-[#ECEDEE]">{lead.email}</a>
                </div>
              )}
              <div className="border-t border-[#2C333C] pt-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#555D67]">Program</span>
                  <span
                    className="font-medium rounded px-1.5 py-0.5"
                    style={{ background: `${programColors[lead.program] || "#fff"}15`, color: programColors[lead.program] || "#fff" }}
                  >
                    {lead.program}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555D67]">Grade</span>
                  <span className="text-[#8B919A]">{lead.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555D67]">Source</span>
                  <span className="text-[#8B919A] text-right max-w-[60%]">{lead.source}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555D67]">Submitted</span>
                  <span className="text-[#8B919A]">{timeAgo(lead.createdAt)}</span>
                </div>
              </div>
              {lead.message && (
                <div className="rounded-lg bg-[#222830] p-3 text-xs text-[#8B919A] border border-[#2C333C]">
                  <div className="flex items-center gap-1 mb-1 text-[#555D67]">
                    <MessageSquare className="h-3 w-3" />
                    Message
                  </div>
                  {lead.message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CRM Panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Pipeline stepper */}
          <div className="rounded-xl border border-[#2C333C] bg-[#1C2025] p-5">
            <p className="text-xs font-semibold tracking-widest text-[#555D67] uppercase mb-4">Pipeline Status</p>
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {PIPELINE.map((step, i) => {
                const isActive = step === lead.status;
                const isPast = PIPELINE.indexOf(step) < PIPELINE.indexOf(lead.status as LeadStatus);
                return (
                  <div key={step} className="flex items-center gap-1 shrink-0">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                          isActive
                            ? "bg-[#1E6FA8] text-white ring-2 ring-[#1E6FA8]/30"
                            : isPast
                            ? "bg-green-500/20 text-green-400"
                            : "bg-[#222830] text-[#555D67]"
                        }`}
                      >
                        {isPast ? "✓" : i + 1}
                      </div>
                      <span className={`text-[10px] font-medium whitespace-nowrap ${isActive ? "text-[#2A8FD4]" : isPast ? "text-green-400" : "text-[#555D67]"}`}>
                        {step}
                      </span>
                    </div>
                    {i < PIPELINE.length - 1 && (
                      <div className={`h-px w-8 sm:w-12 mb-4 ${isPast ? "bg-green-500/40" : "bg-[#2C333C]"}`} />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2 mt-4">
              {lead.status !== "Enrolled" && (
                <Button
                  size="sm"
                  className="bg-[#1E6FA8] hover:bg-[#2A8FD4] text-white gap-1"
                  onClick={advanceStatus}
                >
                  Move to {PIPELINE[PIPELINE.indexOf(lead.status as LeadStatus) + 1] || "Next"}
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              )}
              <Button variant="outline" size="sm" className="border-[#2C333C] text-[#8B919A] hover:text-red-400 hover:border-red-500/30">
                Mark Closed
              </Button>
            </div>
          </div>

          {/* Notes thread */}
          <div className="rounded-xl border border-[#2C333C] bg-[#1C2025] p-5">
            <p className="text-xs font-semibold tracking-widest text-[#555D67] uppercase mb-4">Internal Notes</p>
            <div className="space-y-3 mb-4">
              {lead.notes.length === 0 ? (
                <p className="text-xs text-[#555D67]">No notes yet. Add the first note below.</p>
              ) : (
                lead.notes.map((n) => (
                  <div key={n._id} className="rounded-lg bg-[#222830] border border-[#2C333C] p-3">
                    <p className="text-sm text-[#ECEDEE] leading-relaxed">{n.content}</p>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-[#555D67]">
                      <Clock className="h-2.5 w-2.5" />
                      {n.author} · {formatDateTime(n.createdAt)}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder="Add a note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="resize-none h-20"
              />
              <Button size="sm" onClick={handleAddNote} className="bg-[#1E6FA8] hover:bg-[#2A8FD4] text-white gap-1">
                <Plus className="h-3.5 w-3.5" />
                Add Note
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
