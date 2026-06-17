"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Eye, Edit, Trash2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/status-badge";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { mockBlogs, type BlogPost, type BlogStatus } from "@/lib/mock-data";
import { formatDate, truncate } from "@/lib/utils";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const TABS: { label: string; value: BlogStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Drafts", value: "draft" },
  { label: "Published", value: "published" },
  { label: "Archived", value: "archived" },
];

export default function BlogsPage() {
  const [activeTab, setActiveTab] = useState<BlogStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState(mockBlogs);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = blogs.filter((b) => {
    const matchTab = activeTab === "all" || b.status === activeTab;
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const tabCounts = TABS.slice(1).reduce((acc, t) => {
    acc[t.value] = blogs.filter((b) => b.status === t.value).length;
    return acc;
  }, {} as Record<string, number>);

  const togglePublish = (blog: BlogPost) => {
    const next = blog.status === "published" ? "draft" : "published";
    setBlogs((prev) => prev.map((b) => b.id === blog.id ? { ...b, status: next } : b));
    toast.success(`"${blog.title}" ${next === "published" ? "published" : "moved to draft"}.`);
  };

  const deleteBlog = (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    toast.success("Blog post deleted.");
    setDeleteId(null);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-[#555D67]">{blogs.filter(b => b.status === "published").length} posts published</p>
        </div>
        <Button asChild className="bg-[#B08D57] hover:bg-[#C9A46E] text-[#14171B] font-semibold gap-1">
          <Link href="/blogs/new">
            <Plus className="h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setActiveTab(t.value)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-all",
              activeTab === t.value
                ? "bg-[#1E6FA8] border-[#1E6FA8] text-white"
                : "border-[#2C333C] text-[#8B919A] hover:border-[#3C434C] hover:text-[#ECEDEE]"
            )}
          >
            {t.label}
            {t.value !== "all" && (
              <span className={cn("rounded-full px-1 text-[10px]", activeTab === t.value ? "bg-white/20" : "bg-[#222830]")}>
                {tabCounts[t.value] || 0}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#555D67]" />
        <Input placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {/* Blog table */}
      <div className="rounded-xl border border-[#2C333C] bg-[#1C2025] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2C333C] bg-[#222830]/50">
                {["Post", "Category", "Status", "Views", "Date", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-[#555D67] uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <BookOpen className="h-8 w-8 text-[#2C333C]" />
                      <p className="text-sm text-[#555D67]">No posts found.</p>
                      <Button asChild size="sm" className="bg-[#B08D57] hover:bg-[#C9A46E] text-[#14171B]">
                        <Link href="/blogs/new">Create your first post</Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((blog) => (
                  <tr key={blog.id} className="border-b border-[#2C333C]/50 hover:bg-[#222830] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {blog.coverImage ? (
                          <img src={blog.coverImage} alt={blog.title} className="h-10 w-14 rounded object-cover border border-[#2C333C] shrink-0" />
                        ) : (
                          <div className="h-10 w-14 rounded border border-[#2C333C] bg-[#222830] flex items-center justify-center shrink-0">
                            <BookOpen className="h-4 w-4 text-[#555D67]" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-[#ECEDEE]">{truncate(blog.title, 50)}</p>
                          <p className="text-xs text-[#555D67]">{truncate(blog.excerpt, 60)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-[#8B919A]">{blog.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={blog.status} />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-[#8B919A]">{blog.views.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-[#555D67]">
                        {blog.publishedAt ? formatDate(blog.publishedAt) : "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Button asChild variant="ghost" size="icon-sm" className="h-7 w-7 text-[#555D67] hover:text-[#2A8FD4]">
                          <Link href={`/blogs/${blog.id}/edit`}><Edit className="h-3.5 w-3.5" /></Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-[#555D67] hover:text-[#ECEDEE]"
                          onClick={() => togglePublish(blog)}
                        >
                          {blog.status === "published" ? "Unpublish" : "Publish"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="h-7 w-7 text-[#555D67] hover:text-red-400"
                          onClick={() => setDeleteId(blog.id)}
                        >
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
        title="Delete Blog Post"
        description="This will permanently delete the post and its cover image. This action cannot be undone."
        confirmLabel="Delete Post"
        onConfirm={() => deleteId && deleteBlog(deleteId)}
      />
    </div>
  );
}
