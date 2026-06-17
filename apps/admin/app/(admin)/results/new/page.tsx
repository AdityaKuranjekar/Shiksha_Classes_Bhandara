"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const PROGRAMS = ["JEE", "NEET", "MHT-CET", "Foundation"];

export default function ResultFormPage() {
  const [studentName, setStudentName] = useState("");
  const [program, setProgram] = useState("");
  const [examName, setExamName] = useState("");
  const [score, setScore] = useState("");
  const [rank, setRank] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [testimonial, setTestimonial] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!studentName || !program || !score) {
      toast.error("Student name, program, and score are required.");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast.success("Result saved successfully!");
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Button asChild variant="ghost" size="sm" className="text-[#8B919A] hover:text-[#ECEDEE] -ml-2">
          <Link href="/results"><ArrowLeft className="h-4 w-4" />Back to Results</Link>
        </Button>
        <Button size="sm" className="bg-[#B08D57] hover:bg-[#C9A46E] text-[#14171B] font-semibold" onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
          Save Result
        </Button>
      </div>

      <div className="rounded-xl border border-[#2C333C] bg-[#1C2025] p-6 space-y-5">
        {/* Photo upload */}
        <div className="flex items-center gap-6">
          <div className="relative">
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="h-24 w-24 rounded-full object-cover border-2 border-[#B08D57]/40" />
            ) : (
              <div className="h-24 w-24 rounded-full bg-[#222830] border-2 border-dashed border-[#2C333C] flex items-center justify-center">
                <Upload className="h-6 w-6 text-[#555D67]" />
              </div>
            )}
            <label className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-[#1E6FA8] flex items-center justify-center cursor-pointer hover:bg-[#2A8FD4] transition-colors">
              <Upload className="h-3.5 w-3.5 text-white" />
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </label>
          </div>
          <div>
            <p className="text-sm font-medium text-[#ECEDEE]">Student Photo</p>
            <p className="text-xs text-[#555D67] mt-0.5">Upload a clear photo of the student.<br />JPG, PNG, WEBP · Max 5MB</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 space-y-1.5">
            <Label>Student Name *</Label>
            <Input placeholder="e.g. Arjun Mehta" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Program *</Label>
            <Select value={program} onValueChange={setProgram}>
              <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent>
                {PROGRAMS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Exam Name *</Label>
            <Input placeholder="e.g. JEE Main 2025" value={examName} onChange={(e) => setExamName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Score *</Label>
            <Input placeholder="e.g. 99.85 Percentile or 680/720" value={score} onChange={(e) => setScore(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Rank (Optional)</Label>
            <Input placeholder="e.g. AIR 342 or State Rank 8" value={rank} onChange={(e) => setRank(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Year *</Label>
            <Input placeholder="2025" value={year} onChange={(e) => setYear(e.target.value)} maxLength={4} />
          </div>
          <div className="col-span-2 space-y-1.5">
            <Label>Testimonial Quote (Optional)</Label>
            <Textarea
              placeholder="Student's words about Shiksha Classes..."
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
              className="h-20 resize-none"
            />
          </div>
        </div>

        <div className="border-t border-[#2C333C] pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#ECEDEE]">Featured on Homepage</p>
              <p className="text-xs text-[#555D67]">Show in homepage toppers carousel</p>
            </div>
            <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#ECEDEE]">Visible</p>
              <p className="text-xs text-[#555D67]">Show on the public results page</p>
            </div>
            <Switch checked={isVisible} onCheckedChange={setIsVisible} />
          </div>
        </div>
      </div>
    </div>
  );
}
