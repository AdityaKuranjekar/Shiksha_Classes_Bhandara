"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Upload, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { slugify } from "@/lib/utils";
import { toast } from "sonner";

const CATEGORIES = ["Formula Sheet", "PYQ", "Notes", "Study Guide", "Revision Checklist"];
const SUBJECTS = ["Physics", "Chemistry", "Mathematics", "Biology", "General"];
const PROGRAMS = ["JEE", "NEET", "MHT-CET", "Foundation"];

export default function ResourceFormPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [programs, setPrograms] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [saving, setSaving] = useState(false);

  const toggleProgram = (p: string) => {
    setPrograms((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);
  };

  const handleSave = async (publish = false) => {
    if (!title || !category || !subject) {
      toast.error("Title, category, and subject are required.");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast.success(publish ? "Resource published!" : "Draft saved.");
  };

  return (
    <div className="space-y-4 max-w-4xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Button asChild variant="ghost" size="sm" className="text-[#8B919A] hover:text-[#ECEDEE] -ml-2">
          <Link href="/resources"><ArrowLeft className="h-4 w-4" />Back to Resources</Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-[#2C333C] text-[#8B919A]" onClick={() => handleSave(false)} disabled={saving}>
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            Save Draft
          </Button>
          <Button size="sm" className="bg-[#B08D57] hover:bg-[#C9A46E] text-[#14171B] font-semibold" onClick={() => handleSave(true)}>
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Main fields */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-[#2C333C] bg-[#1C2025] p-5 space-y-4">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input placeholder="e.g. Physics Formula Sheet — Mechanics" value={title}
                onChange={(e) => { setTitle(e.target.value); setSlug(slugify(e.target.value)); }} />
            </div>
            <div className="space-y-1.5">
              <Label>Slug</Label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#555D67]">/resources/</span>
                <Input value={slug} onChange={(e) => setSlug(slugify(e.target.value))} className="font-mono text-sm" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea placeholder="Brief description of this resource..." value={description} onChange={(e) => setDescription(e.target.value)} className="h-20 resize-none" />
            </div>
          </div>

          {/* Content (Markdown) */}
          <div className="rounded-xl border border-[#2C333C] bg-[#1C2025] p-5 space-y-3">
            <Label>Content Body (Optional — for article-style resources)</Label>
            <Textarea
              placeholder="Write article content in Markdown... Leave empty if this is a file-only resource."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-48 font-mono text-sm resize-none"
            />
          </div>

          {/* File upload */}
          <div className="rounded-xl border border-[#2C333C] bg-[#1C2025] p-5 space-y-3">
            <Label>PDF File Upload (Optional)</Label>
            <div className="border-2 border-dashed border-[#2C333C] rounded-lg p-8 flex flex-col items-center gap-3 cursor-pointer hover:border-[#1E6FA8]/40 hover:bg-[#1E6FA8]/4 transition-all">
              <div className="h-10 w-10 rounded-lg bg-[#1E6FA8]/10 flex items-center justify-center">
                <Upload className="h-5 w-5 text-[#2A8FD4]" />
              </div>
              <div className="text-center">
                <p className="text-sm text-[#8B919A]">Drop PDF here or <span className="text-[#2A8FD4] cursor-pointer hover:underline">browse</span></p>
                <p className="text-xs text-[#555D67] mt-0.5">PDF up to 50MB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-xl border border-[#2C333C] bg-[#1C2025] p-5 space-y-4">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue placeholder="Select category..." /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger><SelectValue placeholder="Select subject..." /></SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Target Programs</Label>
              <div className="flex flex-wrap gap-2">
                {PROGRAMS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => toggleProgram(p)}
                    className={`rounded-full px-3 py-1 text-xs font-medium border transition-all ${
                      programs.includes(p)
                        ? "bg-[#1E6FA8] border-[#1E6FA8] text-white"
                        : "border-[#2C333C] text-[#8B919A] hover:border-[#3C434C]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#2C333C]">
              <div>
                <p className="text-sm font-medium text-[#ECEDEE]">Featured</p>
                <p className="text-xs text-[#555D67]">Show on homepage</p>
              </div>
              <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
