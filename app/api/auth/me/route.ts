import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session");

    if (!sessionToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // For now, we'll decode the user from the session
    // In production, you should store sessions in a database
    // This is a simple implementation - store user ID in cookie
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const stmt = db.prepare(`
      SELECT id, full_name, email, role FROM users WHERE id = ?
    `);

    const user = stmt.get(userId) as any;

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
    console.error("Get user error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
