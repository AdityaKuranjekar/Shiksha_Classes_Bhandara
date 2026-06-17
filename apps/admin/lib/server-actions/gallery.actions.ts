"use server";

import { revalidatePath } from "next/cache";
import { GalleryAPI } from "@/lib/mock-api/gallery";
import type { ActionResult } from "@/lib/api-types";
import { z } from "zod";

const GalleryImageSchema = z.object({
  altText: z.string().min(2, "Alt text is required"),
  imageSecureUrl: z.string().url("Image URL is required"),
  imagePublicId: z.string().min(1, "Public ID is required"),
  caption: z.string().optional().nullable(),
  category: z.string().min(1, "Category is required"),
  isFeatured: z.boolean().default(false),
});

export async function uploadGalleryImage(
  formData: FormData
): Promise<ActionResult<{ id: string }>> {
  try {
    const rawData = {
      altText: formData.get("altText"),
      imageSecureUrl: formData.get("imageSecureUrl"),
      imagePublicId: formData.get("imagePublicId"),
      caption: formData.get("caption") || null,
      category: formData.get("category"),
      isFeatured: formData.get("isFeatured") === "true",
    };

    const validated = GalleryImageSchema.parse(rawData);

    const result = await GalleryAPI.create(validated as any);

    revalidatePath("/(admin)/gallery", "page");
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

export async function patchGalleryImage(
  id: string,
  data: { isVisible?: boolean; isFeatured?: boolean }
): Promise<ActionResult> {
  try {
    await GalleryAPI.patch(id, data);
    revalidatePath("/(admin)/gallery", "page");
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteGalleryImage(id: string): Promise<ActionResult> {
  try {
    await GalleryAPI.delete(id);
    revalidatePath("/(admin)/gallery", "page");
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
