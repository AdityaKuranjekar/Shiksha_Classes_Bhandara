"use server";

import { revalidatePath } from "next/cache";
import { LeadsAPI } from "@/lib/mock-api/leads";
import type { LeadStatus, ActionResult } from "@/lib/api-types";
import { z } from "zod";

const UpdateStatusSchema = z.object({
  status: z.enum(["New", "Contacted", "Visit Scheduled", "Enrolled", "Closed"] as const),
  followUpDate: z.string().optional().nullable(),
  assignedTo: z.string().optional().nullable(),
});

export async function updateLeadStatus(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  try {
    const rawData = {
      status: formData.get("status"),
      followUpDate: formData.get("followUpDate") || null,
      assignedTo: formData.get("assignedTo") || null,
    };

    const validated = UpdateStatusSchema.parse(rawData);

    // In real app: call API
    // await api.patch(`/admin/leads/${id}`, validated);
    await LeadsAPI.updateStatus(id, validated as { status: LeadStatus });

    revalidatePath("/(admin)/leads", "page");
    revalidatePath(`/(admin)/leads/${id}`, "page");

    return { success: true };
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

const AddNoteSchema = z.object({
  content: z.string().min(1, "Note cannot be empty").max(500, "Max 500 characters"),
});

export async function addLeadNote(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  try {
    const content = formData.get("content");
    const validated = AddNoteSchema.parse({ content });

    // In real app:
    // await api.post(`/admin/leads/${id}/notes`, validated);
    await LeadsAPI.addNote(id, validated.content);

    revalidatePath(`/(admin)/leads/${id}`, "page");

    return { success: true };
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
