"use server";

import { revalidatePath } from "next/cache";
import { CareersAPI } from "@/lib/mock-api/careers";
import type { CareerStatus, ApplicationStatus, ActionResult } from "@/lib/api-types";

export async function patchOpeningStatus(
  id: string,
  status: CareerStatus
): Promise<ActionResult> {
  try {
    await CareersAPI.patchOpening(id, { status });
    revalidatePath("/(admin)/careers", "page");
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteOpening(id: string): Promise<ActionResult> {
  try {
    await CareersAPI.deleteOpening(id);
    revalidatePath("/(admin)/careers", "page");
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function advanceApplication(
  id: string,
  status: ApplicationStatus,
  note?: string
): Promise<ActionResult> {
  try {
    await CareersAPI.patchApplicationStatus(id, status, note);
    revalidatePath("/(admin)/careers", "page");
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
