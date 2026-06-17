"use server";

import { revalidatePath } from "next/cache";
import { BlogsAPI } from "@/lib/mock-api/blogs";
import type { BlogStatus, ActionResult } from "@/lib/api-types";
import { z } from "zod";

const BlogSchema = z.object({
  title: z.string().min(2, "Title is required").max(150),
  slug: z.string().optional(),
  excerpt: z.string().min(10, "Excerpt is required").max(300),
  contentMarkdown: z.string().min(10, "Content is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.string().optional(), // We'll split this by comma
  coverImageSecureUrl: z.string().url().optional().or(z.literal("")),
  status: z.enum(["draft", "published", "archived"] as const).optional(),
});

export async function saveBlog(
  id: string | null,
  formData: FormData
): Promise<ActionResult<{ id: string }>> {
  try {
    const rawData = {
      title: formData.get("title"),
      slug: formData.get("slug") || undefined,
      excerpt: formData.get("excerpt"),
      contentMarkdown: formData.get("contentMarkdown"),
      category: formData.get("category"),
      tags: formData.get("tags"),
      coverImageSecureUrl: formData.get("coverImageSecureUrl") || undefined,
      status: formData.get("status") || "draft",
    };

    const validated = BlogSchema.parse(rawData);
    
    const payload = {
      ...validated,
      tags: validated.tags ? validated.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
    };

    let result;
    if (id) {
      result = await BlogsAPI.update(id, payload as any);
    } else {
      result = await BlogsAPI.create(payload as any);
    }

    revalidatePath("/(admin)/blogs", "page");
    return { success: true, data: { id: result._id } };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fields: Record<string, string> = {};
      error.errors.forEach((e) => {
        if (e.path[0]) fields[e.path[0].toString()] = e.message;
      });
      return { success: false, error: "Validation failed", fields };
    }
    return { success: false, error: (error as Error).message };
  }
}

export async function patchBlogStatus(
  id: string,
  status: BlogStatus
): Promise<ActionResult> {
  try {
    await BlogsAPI.patchStatus(id, status);
    revalidatePath("/(admin)/blogs", "page");
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteBlog(id: string): Promise<ActionResult> {
  try {
    await BlogsAPI.delete(id);
    revalidatePath("/(admin)/blogs", "page");
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
