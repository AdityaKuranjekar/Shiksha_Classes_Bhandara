"use client";

import { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Eye, EyeOff, Bold, Italic, List, Link2, Image, Loader2, Upload } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockBlogs } from "@/lib/mock-data";
import { slugify } from "@/lib/utils";
import { toast } from "sonner";

const CATEGORIES = ["JEE", "NEET", "MHT-CET", "Foundation", "General", "Study Tips"];

interface EditorPageProps {
  params?: Promise<{ id: string }>;
  isNew?: boolean;
}

export default function BlogEditorPage({ params }: EditorPageProps) {
  const resolvedParams = params ? use(params) : null;
  const existingBlog = resolvedParams?.id ? mockBlogs.find((b) => b.id === resolvedParams.id) : null;

  const [title, setTitle] = useState(existingBlog?.title || "");
  const [slug, setSlug] = useState(existingBlog?.slug || "");
  const [excerpt, setExcerpt] = useState(existingBlog?.excerpt || "");
  const [category, setCategory] = useState(existingBlog?.category || "");
  const [tags, setTags] = useState(existingBlog?.tags.join(", ") || "");
  const [content, setContent] = useState(existingBlog?.contentMarkdown || "");
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!existingBlog) setSlug(slugify(val));
  };

  const insertMarkdown = (prefix: string, suffix = "") => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.slice(start, end);
    const newContent =
      content.slice(0, start) + prefix + selected + suffix + content.slice(end);
    setContent(newContent);
  };

  const handleSave = async (publish = false) => {
    if (!title) { toast.error("Title is required."); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast.success(publish ? "Post published successfully!" : "Draft saved.");
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Button asChild variant="ghost" size="sm" className="text-[#8B919A] hover:text-[#ECEDEE] -ml-2">
          <Link href="/blogs">
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-[#2C333C] text-[#8B919A] hover:text-[#ECEDEE] gap-1"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {showPreview ? "Editor" : "Preview"}
          </Button>
          <Button variant="outline" size="sm" className="border-[#2C333C] text-[#8B919A]" onClick={() => handleSave(false)} disabled={saving}>
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            Save Draft
          </Button>
          <Button size="sm" className="bg-[#B08D57] hover:bg-[#C9A46E] text-[#14171B] font-semibold" onClick={() => handleSave(true)} disabled={saving}>
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Editor Panel */}
        <div className={`space-y-4 ${showPreview ? "hidden lg:block" : ""}`}>
          {/* Meta fields */}
          <div className="rounded-xl border border-[#2C333C] bg-[#1C2025] p-5 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="blog-title">Title</Label>
              <Input
                id="blog-title"
                placeholder="Enter blog post title..."
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="text-base font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="blog-slug">Slug</Label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#555D67] shrink-0">/blog/</span>
                <Input
                  id="blog-slug"
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  className="font-mono text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="blog-tags">Tags</Label>
                <Input id="blog-tags" placeholder="JEE, Physics, Maths" value={tags} onChange={(e) => setTags(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="blog-excerpt">
                Excerpt <span className="text-[10px] text-[#555D67] ml-1">{excerpt.length}/200</span>
              </Label>
              <Textarea
                id="blog-excerpt"
                placeholder="Brief summary of the post..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="h-16 resize-none"
                maxLength={200}
              />
            </div>
            {/* Cover image upload zone */}
            <div className="space-y-1.5">
              <Label>Cover Image</Label>
              <div className="border-2 border-dashed border-[#2C333C] rounded-lg p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-[#B08D57]/40 hover:bg-[#B08D57]/4 transition-all">
                <Upload className="h-6 w-6 text-[#555D67]" />
                <p className="text-xs text-[#555D67]">Drop image here or <span className="text-[#2A8FD4]">browse</span></p>
                <p className="text-[10px] text-[#2C333C]">JPG, PNG, WEBP up to 5MB</p>
              </div>
            </div>
          </div>

          {/* Markdown editor */}
          <div className="rounded-xl border border-[#2C333C] bg-[#1C2025] overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center gap-1 border-b border-[#2C333C] px-3 py-2 bg-[#222830]/50">
              <span className="text-xs text-[#555D67] mr-2">Format:</span>
              {[
                { icon: Bold, label: "Bold", action: () => insertMarkdown("**", "**") },
                { icon: Italic, label: "Italic", action: () => insertMarkdown("*", "*") },
                { icon: List, label: "List", action: () => insertMarkdown("- ") },
                { icon: Link2, label: "Link", action: () => insertMarkdown("[", "](url)") },
                { icon: Image, label: "Image", action: () => insertMarkdown("![alt](", ")") },
              ].map(({ icon: Icon, label, action }) => (
                <Button key={label} variant="ghost" size="icon-sm" className="h-7 w-7 text-[#555D67] hover:text-[#ECEDEE]" onClick={action} title={label}>
                  <Icon className="h-3.5 w-3.5" />
                </Button>
              ))}
              <div className="ml-2 flex gap-1">
                {["## H2", "### H3"].map((h) => (
                  <Button key={h} variant="ghost" size="sm" className="h-7 text-xs text-[#555D67] hover:text-[#ECEDEE]" onClick={() => insertMarkdown(h + " ")}>
                    {h.replace("## ", "H2").replace("### ", "H3")}
                  </Button>
                ))}
              </div>
            </div>
            <Textarea
              id="content-editor"
              placeholder="Write your blog content in Markdown..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border-0 rounded-none min-h-96 resize-none font-mono text-sm focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Preview Panel */}
        <div className={`${!showPreview ? "hidden lg:block" : ""}`}>
          <div className="rounded-xl border border-[#2C333C] bg-[#1C2025] p-6 sticky top-6">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="h-4 w-4 text-[#555D67]" />
              <span className="text-xs font-semibold text-[#555D67] uppercase tracking-wide">Live Preview</span>
            </div>
            {title && <h1 className="font-serif text-2xl font-light text-[#ECEDEE] mb-3">{title}</h1>}
            {excerpt && <p className="text-sm text-[#8B919A] mb-5 italic border-l-2 border-[#B08D57] pl-3">{excerpt}</p>}
            {content ? (
              <div className="prose prose-invert max-w-none text-sm text-[#8B919A] [&_h1]:text-[#ECEDEE] [&_h2]:text-[#ECEDEE] [&_h3]:text-[#ECEDEE] [&_strong]:text-[#ECEDEE] [&_a]:text-[#2A8FD4] [&_ul]:list-disc [&_ul]:pl-4 overflow-y-auto max-h-[500px]">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-sm text-[#555D67] italic">Start writing to see a preview...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
