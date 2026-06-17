"use server";

import { revalidatePath } from "next/cache";
import { ResultsAPI } from "@/lib/mock-api/results";
import type { ActionResult } from "@/lib/api-types";
import { z } from "zod";

const ResultSchema = z.object({
  studentName: z.string().min(2, "Name is required").max(100),
  program: z.string().min(1, "Program is required"),
  examName: z.string().min(2, "Exam name is required"),
  score: z.string().min(1, "Score is required"),
  rank: z.string().optional().nullable(),
  year: z.string().regex(/^\d{4}$/, "Must be a 4 digit year"),
  studentImageSecureUrl: z.string().url("Image is required"),
  studentImagePublicId: z.string().min(1, "Image is required"),
  testimonialQuote: z.string().optional().nullable(),
  isFeatured: z.boolean().default(false),
  isVisible: z.boolean().default(true),
  priorityWeight: z.coerce.number().int().default(0),
});

export async function saveResult(
  id: string | null,
  formData: FormData
): Promise<ActionResult<{ id: string }>> {
  try {
    const rawData = {
      studentName: formData.get("studentName"),
      program: formData.get("program"),
      examName: formData.get("examName"),
      score: formData.get("score"),
      rank: formData.get("rank") || null,
      year: formData.get("year"),
      studentImageSecureUrl: formData.get("studentImageSecureUrl"),
      studentImagePublicId: formData.get("studentImagePublicId"),
      testimonialQuote: formData.get("testimonialQuote") || null,
      isFeatured: formData.get("isFeatured") === "true",
      isVisible: formData.get("isVisible") !== "false", // default true
      priorityWeight: formData.get("priorityWeight") || 0,
    };

    const validated = ResultSchema.parse(rawData);

    let result;
    if (id) {
      result = await ResultsAPI.update(id, validated as any);
    } else {
      result = await ResultsAPI.create(validated as any);
    }

    revalidatePath("/(admin)/results", "page");
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

export async function patchResult(
  id: string,
  data: { isVisible?: boolean; isFeatured?: boolean }
): Promise<ActionResult> {
  try {
    await ResultsAPI.patch(id, data);
    revalidatePath("/(admin)/results", "page");
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteResult(id: string): Promise<ActionResult> {
  try {
    await ResultsAPI.delete(id);
    revalidatePath("/(admin)/results", "page");
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
