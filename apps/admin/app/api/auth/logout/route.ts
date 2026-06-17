import { NextResponse } from "next/server";

export async function POST() {
  // In a real implementation:
  // 1. Fetch API_URL/admin/auth/logout to invalidate refresh token in Redis
  // 2. Clear the HttpOnly refresh_token cookie

  // Mock Implementation
  await new Promise(r => setTimeout(r, 400));
  
  const res = NextResponse.json({ success: true });
  
  return res;
}
