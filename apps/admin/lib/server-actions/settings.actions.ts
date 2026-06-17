"use server";

import { revalidatePath } from "next/cache";
import { SettingsAPI } from "@/lib/mock-api/settings";
import type { ActionResult, SiteSettings } from "@/lib/api-types";

export async function updateSettings(
  data: Partial<SiteSettings>
): Promise<ActionResult> {
  try {
    await SettingsAPI.update(data);
    revalidatePath("/(admin)/settings", "page");
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
