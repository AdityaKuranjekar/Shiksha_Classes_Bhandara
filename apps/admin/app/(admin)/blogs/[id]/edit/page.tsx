"use client";
import { use } from "react";
import BlogEditorPage from "../../new/page";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  return <BlogEditorPage params={params} />;
}
