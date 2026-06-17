"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import type { ActionResult } from "@/lib/api-types";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function loginAction(formData: FormData): Promise<ActionResult<{ name: string; email: string }>> {
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validated = LoginSchema.parse(rawData);

    // Mock API call delay
    await new Promise((r) => setTimeout(r, 800));

    // Hardcoded check for mock
    if (validated.email === "admin@shiksha.in" && validated.password === "admin123") {
      const adminData = {
        name: "Super Admin",
        email: "admin@shiksha.in",
      };

      // Set cookie for middleware
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "mock-token", {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return { success: true, data: adminData };
    }

    return { success: false, error: "Invalid email or password." };
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

export async function logoutAction(): Promise<ActionResult> {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return { success: true };
}
