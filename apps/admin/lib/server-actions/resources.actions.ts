"use server";

import { revalidatePath } from "next/cache";
import { ResourcesAPI } from "@/lib/mock-api/resources";
import type { ResourceStatus, ActionResult } from "@/lib/api-types";
import { z } from "zod";

const ResourceSchema = z.object({
  title: z.string().min(2, "Title is required").max(150),
  description: z.string().min(10, "Description is required").max(400),
  category: z.string().min(1, "Category is required"),
  subject: z.string().min(1, "Subject is required"),
  targetPrograms: z.string().optional(), // Comma separated
  fileSecureUrl: z.string().url().optional().or(z.literal("")),
  fileType: z.enum(["pdf", "image", "none"]).default("none"),
  contentMarkdown: z.string().optional().nullable(),
  isFeatured: z.boolean().default(false),
  status: z.enum(["draft", "published", "archived"] as const).default("draft"),
});

export async function saveResource(
  id: string | null,
  formData: FormData
): Promise<ActionResult<{ id: string }>> {
  try {
    const rawData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      subject: formData.get("subject"),
      targetPrograms: formData.get("targetPrograms"),
      fileSecureUrl: formData.get("fileSecureUrl") || undefined,
      fileType: formData.get("fileType") || "none",
      contentMarkdown: formData.get("contentMarkdown") || null,
      isFeatured: formData.get("isFeatured") === "true",
      status: formData.get("status") || "draft",
    };

    const validated = ResourceSchema.parse(rawData);
    
    const payload = {
      ...validated,
      targetPrograms: validated.targetPrograms ? validated.targetPrograms.split(",").map(t => t.trim()).filter(Boolean) : [],
    };

    let result;
    if (id) {
      result = await ResourcesAPI.update(id, payload as any);
    } else {
      result = await ResourcesAPI.create(payload as any);
    }

    revalidatePath("/(admin)/resources", "page");
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

export async function patchResource(
  id: string,
  data: { status?: ResourceStatus; isFeatured?: boolean }
): Promise<ActionResult> {
  try {
    await ResourcesAPI.patch(id, data);
    revalidatePath("/(admin)/resources", "page");
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteResource(id: string): Promise<ActionResult> {
  try {
    await ResourcesAPI.delete(id);
    revalidatePath("/(admin)/resources", "page");
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
