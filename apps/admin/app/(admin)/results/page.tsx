"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Filter, Star, Eye, EyeOff, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { mockResults, type Result, type Program, programColors } from "@/lib/mock-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const PROGRAMS: (Program | "all")[] = ["all", "JEE", "NEET", "MHT-CET", "Foundation"];
const YEARS = ["all", "2025", "2024", "2023"];

export default function ResultsPage() {
  const [results, setResults] = useState(mockResults);
  const [program, setProgram] = useState<Program | "all">("all");
  const [year, setYear] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = results.filter((r) => {
    const matchProg = program === "all" || r.program === program;
    const matchYear = year === "all" || r.year === year;
    return matchProg && matchYear;
  });

  const toggleFeatured = (id: string) => {
    setResults((prev) => prev.map((r) => r.id === id ? { ...r, isFeatured: !r.isFeatured } : r));
    toast.success("Featured status updated.");
  };

  const toggleVisible = (id: string) => {
    setResults((prev) => prev.map((r) => r.id === id ? { ...r, isVisible: !r.isVisible } : r));
    toast.success("Visibility updated.");
  };

  const deleteResult = (id: string) => {
    setResults((prev) => prev.filter((r) => r.id !== id));
    toast.success("Result removed.");
    setDeleteId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-xs text-[#555D67]">{results.filter(r => r.isVisible).length} results visible · {results.filter(r => r.isFeatured).length} featured</p>
        <Button asChild className="bg-[#B08D57] hover:bg-[#C9A46E] text-[#14171B] font-semibold gap-1">
          <Link href="/results/new">
            <Plus className="h-4 w-4" />
            Add Result
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <Filter className="h-4 w-4 text-[#555D67]" />
        <div className="flex flex-wrap gap-2">
          {PROGRAMS.map((p) => (
            <button
              key={p}
              onClick={() => setProgram(p)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium border transition-all",
                program === p
                  ? "bg-[#1E6FA8] border-[#1E6FA8] text-white"
                  : "border-[#2C333C] text-[#8B919A] hover:border-[#3C434C] hover:text-[#ECEDEE]"
              )}
              style={program === p ? {} : p !== "all" ? { borderColor: `${programColors[p as Program]}30`, color: programColors[p as Program] } : {}}
            >
              {p === "all" ? "All Programs" : p}
            </button>
          ))}
        </div>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="h-8 rounded-full border border-[#2C333C] bg-black/20 px-3 text-xs text-[#ECEDEE] focus:outline-none focus:ring-1 focus:ring-[#1E6FA8]"
        >
          {YEARS.map((y) => <option key={y} value={y} className="bg-[#1C2025]">{y === "all" ? "All Years" : y}</option>)}
        </select>
      </div>

      {/* Results grid */}
      {filtered.length === 0 ? (
        <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-[#2C333C]">
          <p className="text-sm text-[#555D67]">No results match the filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((result) => (
            <div
              key={result.id}
              className={cn(
                "group relative rounded-xl border bg-[#1C2025] p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg",
                result.isFeatured ? "border-[#B08D57]/40 shadow-[0_0_0_1px_rgba(176,141,87,0.2),0_4px_16px_rgba(176,141,87,0.08)]" : "border-[#2C333C]",
                !result.isVisible && "opacity-50"
              )}
            >
              {/* Featured star */}
              {result.isFeatured && (
                <div className="absolute top-2 right-2">
                  <Star className="h-3.5 w-3.5 text-[#C9A46E] fill-[#C9A46E]" />
                </div>
              )}

              <img
                src={result.imageUrl}
                alt={result.studentName}
                className="h-16 w-16 rounded-full object-cover mx-auto mb-3 border-2 border-[#2C333C]"
              />
              <p className="text-sm font-medium text-[#ECEDEE] mb-1">{result.studentName}</p>
              <p className="text-sm font-semibold text-[#C9A46E] font-serif mb-1">{result.score}</p>
              {result.rank && <p className="text-xs text-[#555D67] mb-1">{result.rank}</p>}
              <div className="flex items-center justify-center gap-1 mb-3">
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={{ background: `${programColors[result.program]}15`, color: programColors[result.program] }}
                >
                  {result.program}
                </span>
                <span className="text-[10px] text-[#555D67]">{result.year}</span>
              </div>

              {/* Actions overlay */}
              <div className="absolute inset-0 rounded-xl bg-[#14171B]/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-all duration-150">
                <Button asChild variant="ghost" size="icon-sm" className="h-8 w-8 text-[#8B919A] hover:text-[#2A8FD4]">
                  <Link href={`/results/${result.id}/edit`}><Edit className="h-3.5 w-3.5" /></Link>
                </Button>
                <Button variant="ghost" size="icon-sm" className="h-8 w-8 text-[#8B919A] hover:text-[#C9A46E]" onClick={() => toggleFeatured(result.id)}>
                  <Star className={cn("h-3.5 w-3.5", result.isFeatured ? "fill-[#C9A46E] text-[#C9A46E]" : "")} />
                </Button>
                <Button variant="ghost" size="icon-sm" className="h-8 w-8 text-[#8B919A] hover:text-[#ECEDEE]" onClick={() => toggleVisible(result.id)}>
                  {result.isVisible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                </Button>
                <Button variant="ghost" size="icon-sm" className="h-8 w-8 text-[#8B919A] hover:text-red-400" onClick={() => setDeleteId(result.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Delete Result"
        description={results.find(r => r.id === deleteId)?.isFeatured
          ? "This result is featured on the homepage. Deleting it will remove it from the carousel. Are you sure?"
          : "This will permanently delete the result and student photo."}
        confirmLabel="Delete Result"
        onConfirm={() => deleteId && deleteResult(deleteId)}
      />
    </div>
  );
}
