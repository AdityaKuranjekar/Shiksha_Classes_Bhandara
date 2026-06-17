"use client";

import { useState } from "react";
import { Plus, Star, Trash2, Edit, Eye, EyeOff, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { mockGallery, type GalleryImage, type GalleryCategory } from "@/lib/mock-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const CATEGORIES: (GalleryCategory | "all")[] = ["all", "Classrooms", "Events", "Results Celebrations", "Campus Life", "Faculty", "Awards"];

export default function GalleryPage() {
  const [images, setImages] = useState(mockGallery);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "all">("all");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  // Upload form state
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadCaption, setUploadCaption] = useState("");
  const [uploadAlt, setUploadAlt] = useState("");
  const [uploadCategory, setUploadCategory] = useState<GalleryCategory | "">("");
  const [uploadFeatured, setUploadFeatured] = useState(false);

  const filtered = images.filter((img) =>
    activeCategory === "all" || img.category === activeCategory
  );

  const toggleFeatured = (id: string) => {
    setImages((prev) => prev.map((img) => img.id === id ? { ...img, isFeatured: !img.isFeatured } : img));
    toast.success("Featured status updated.");
  };

  const toggleVisible = (id: string) => {
    setImages((prev) => prev.map((img) => img.id === id ? { ...img, isVisible: !img.isVisible } : img));
    toast.success("Visibility updated.");
  };

  const deleteImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    toast.success("Image deleted.");
    setDeleteId(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("File too large. Max 5MB."); return; }
    const reader = new FileReader();
    reader.onload = (ev) => setUploadPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    setUploadAlt(file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "));
  };

  const handleUpload = () => {
    if (!uploadPreview || !uploadAlt || !uploadCategory) {
      toast.error("Please provide an image, alt text, and category.");
      return;
    }
    const newImage: GalleryImage = {
      id: `G${Date.now()}`,
      imageUrl: uploadPreview,
      caption: uploadCaption,
      altText: uploadAlt,
      category: uploadCategory,
      isVisible: true,
      isFeatured: uploadFeatured,
      order: images.length + 1,
    };
    setImages((prev) => [...prev, newImage]);
    toast.success("Image uploaded successfully!");
    setUploadOpen(false);
    setUploadPreview(null);
    setUploadCaption("");
    setUploadAlt("");
    setUploadCategory("");
    setUploadFeatured(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-xs text-[#555D67]">{images.length} images · {images.filter(i => i.isFeatured).length} featured</p>
        <Button className="bg-[#B08D57] hover:bg-[#C9A46E] text-[#14171B] font-semibold gap-1" onClick={() => setUploadOpen(true)}>
          <Upload className="h-4 w-4" />
          Upload Image
        </Button>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((c) => {
          const count = c === "all" ? images.length : images.filter((img) => img.category === c).length;
          return (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-all whitespace-nowrap",
                activeCategory === c
                  ? "bg-[#1E6FA8] border-[#1E6FA8] text-white"
                  : "border-[#2C333C] text-[#8B919A] hover:border-[#3C434C] hover:text-[#ECEDEE]"
              )}
            >
              {c === "all" ? "All" : c}
              <span className={cn("rounded-full px-1 text-[10px]", activeCategory === c ? "bg-white/20" : "bg-[#222830]")}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Image grid */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
        {filtered.map((img) => (
          <div key={img.id} className={cn("group relative break-inside-avoid rounded-xl overflow-hidden border border-[#2C333C] transition-all", !img.isVisible && "opacity-40")}>
            <img
              src={img.imageUrl}
              alt={img.altText}
              className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="absolute bottom-0 left-0 right-0 p-3">
                {img.caption && <p className="text-xs text-white/80 mb-2 line-clamp-2">{img.caption}</p>}
                <div className="flex items-center gap-1.5">
                  <Button variant="ghost" size="icon-sm" className="h-7 w-7 bg-black/40 text-white hover:bg-black/60 hover:text-[#C9A46E]" onClick={() => toggleFeatured(img.id)}>
                    <Star className={cn("h-3.5 w-3.5", img.isFeatured ? "fill-[#C9A46E] text-[#C9A46E]" : "")} />
                  </Button>
                  <Button variant="ghost" size="icon-sm" className="h-7 w-7 bg-black/40 text-white hover:bg-black/60" onClick={() => toggleVisible(img.id)}>
                    {img.isVisible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </Button>
                  <Button variant="ghost" size="icon-sm" className="h-7 w-7 bg-black/40 text-white hover:bg-red-500/60" onClick={() => setDeleteId(img.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
            {img.isFeatured && (
              <div className="absolute top-2 right-2">
                <Star className="h-3.5 w-3.5 text-[#C9A46E] fill-[#C9A46E] drop-shadow" />
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-[#2C333C]">
          <p className="text-sm text-[#555D67]">No images in this category.</p>
        </div>
      )}

      {/* Upload Modal */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#ECEDEE]">Upload Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Drop zone */}
            <label className={cn(
              "block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all",
              uploadPreview ? "border-[#B08D57]/40" : "border-[#2C333C] hover:border-[#1E6FA8]/40 hover:bg-[#1E6FA8]/4"
            )}>
              {uploadPreview ? (
                <div className="relative">
                  <img src={uploadPreview} alt="Preview" className="max-h-40 mx-auto rounded-lg object-contain" />
                  <button
                    onClick={(e) => { e.preventDefault(); setUploadPreview(null); }}
                    className="absolute top-0 right-0 h-6 w-6 rounded-full bg-red-500/80 text-white flex items-center justify-center text-xs"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-8 w-8 text-[#555D67] mx-auto" />
                  <p className="text-sm text-[#8B919A]">Click to select an image</p>
                  <p className="text-xs text-[#555D67]">JPG, PNG, WEBP · Max 5MB</p>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
            </label>

            <div className="space-y-1.5">
              <Label>Alt Text *</Label>
              <Input placeholder="Describe the image for accessibility..." value={uploadAlt} onChange={(e) => setUploadAlt(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Caption (Optional)</Label>
              <Input placeholder="Caption shown on hover..." value={uploadCaption} onChange={(e) => setUploadCaption(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Category *</Label>
              <Select value={uploadCategory} onValueChange={(v) => setUploadCategory(v as GalleryCategory)}>
                <SelectTrigger><SelectValue placeholder="Select category..." /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.slice(1).map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label>Featured on homepage</Label>
              <Switch checked={uploadFeatured} onCheckedChange={setUploadFeatured} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setUploadOpen(false)} className="text-[#8B919A]">Cancel</Button>
            <Button onClick={handleUpload} className="bg-[#1E6FA8] hover:bg-[#2A8FD4] text-white">Upload & Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Delete Image"
        description={images.find(i => i.id === deleteId)?.isFeatured
          ? "This image is featured on the homepage. Deleting it will remove it from the homepage strip."
          : "This will permanently delete the image from Cloudinary."}
        confirmLabel="Delete Image"
        onConfirm={() => deleteId && deleteImage(deleteId)}
      />
    </div>
  );
}
