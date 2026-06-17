"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Download, Trash2, Edit, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/status-badge";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { mockResources, type Resource, type ResourceCategory, type Subject } from "@/lib/mock-data";
import { formatDate, truncate } from "@/lib/utils";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const CATEGORIES: (ResourceCategory | "all")[] = ["all", "Formula Sheet", "PYQ", "Notes", "Study Guide", "Revision Checklist"];
const SUBJECTS: (Subject | "all")[] = ["all", "Physics", "Chemistry", "Mathematics", "Biology", "General"];

const categoryColors: Record<string, string> = {
  "Formula Sheet": "text-blue-400 bg-blue-500/10",
  "PYQ": "text-amber-400 bg-amber-500/10",
  "Notes": "text-green-400 bg-green-500/10",
  "Study Guide": "text-purple-400 bg-purple-500/10",
  "Revision Checklist": "text-pink-400 bg-pink-500/10",
};

export default function ResourcesPage() {
  const [resources, setResources] = useState(mockResources);
  const [category, setCategory] = useState<ResourceCategory | "all">("all");
  const [subject, setSubject] = useState<Subject | "all">("all");
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = resources.filter((r) => {
    const matchCat = category === "all" || r.category === category;
    const matchSub = subject === "all" || r.subject === subject;
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSub && matchSearch;
  });

  const toggleFeatured = (id: string) => {
    setResources((prev) => prev.map((r) => r.id === id ? { ...r, isFeatured: !r.isFeatured } : r));
    toast.success("Featured status updated.");
  };

  const togglePublish = (r: Resource) => {
    setResources((prev) =>
      prev.map((res) => res.id === r.id ? { ...res, status: res.status === "published" ? "draft" : "published" } : res)
    );
    toast.success(`Resource ${r.status === "published" ? "unpublished" : "published"}.`);
  };

  const deleteResource = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    toast.success("Resource deleted.");
    setDeleteId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#555D67]">{resources.filter(r => r.status === "published").length} resources published</p>
        <Button asChild className="bg-[#B08D57] hover:bg-[#C9A46E] text-[#14171B] font-semibold gap-1">
          <Link href="/resources/new">
            <Plus className="h-4 w-4" />
            Add Resource
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#555D67]" />
          <Input placeholder="Search resources..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value as ResourceCategory | "all")} className="h-10 rounded-md border border-[#2C333C] bg-black/20 px-3 text-sm text-[#ECEDEE] focus:outline-none focus:ring-2 focus:ring-[#1E6FA8]">
          {CATEGORIES.map((c) => <option key={c} value={c} className="bg-[#1C2025]">{c === "all" ? "All Categories" : c}</option>)}
        </select>
        <select value={subject} onChange={(e) => setSubject(e.target.value as Subject | "all")} className="h-10 rounded-md border border-[#2C333C] bg-black/20 px-3 text-sm text-[#ECEDEE] focus:outline-none focus:ring-2 focus:ring-[#1E6FA8]">
          {SUBJECTS.map((s) => <option key={s} value={s} className="bg-[#1C2025]">{s === "all" ? "All Subjects" : s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#2C333C] bg-[#1C2025] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2C333C] bg-[#222830]/50">
                {["Resource", "Category", "Subject", "Downloads", "Status", "Featured", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-[#555D67] uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-sm text-[#555D67]">No resources found.</td></tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="border-b border-[#2C333C]/50 hover:bg-[#222830] transition-colors">
                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-sm font-medium text-[#ECEDEE]">{truncate(r.title, 45)}</p>
                      <p className="text-xs text-[#555D67] mt-0.5">{truncate(r.description, 55)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", categoryColors[r.category] || "text-zinc-400 bg-zinc-500/10")}>
                        {r.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-[#8B919A]">{r.subject}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-[#8B919A] flex items-center gap-1">
                        <Download className="h-3 w-3" /> {r.downloads}
                      </span>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleFeatured(r.id)}>
                        <Star className={cn("h-4 w-4 transition-colors", r.isFeatured ? "text-[#C9A46E] fill-[#C9A46E]" : "text-[#2C333C]")} />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Button asChild variant="ghost" size="icon-sm" className="h-7 w-7 text-[#555D67] hover:text-[#2A8FD4]">
                          <Link href={`/resources/${r.id}/edit`}><Edit className="h-3.5 w-3.5" /></Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-[#555D67] hover:text-[#ECEDEE]" onClick={() => togglePublish(r)}>
                          {r.status === "published" ? "Unpublish" : "Publish"}
                        </Button>
                        <Button variant="ghost" size="icon-sm" className="h-7 w-7 text-[#555D67] hover:text-red-400" onClick={() => setDeleteId(r.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Delete Resource"
        description="This will permanently delete the resource and any associated files. This action cannot be undone."
        confirmLabel="Delete Resource"
        onConfirm={() => deleteId && deleteResource(deleteId)}
      />
    </div>
  );
}
