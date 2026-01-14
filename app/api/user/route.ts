import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  const { title, description, status, user_id } = await req.json();

  if (!title || !description || !status || !user_id) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO todo (id, title, description, status, user_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const createdAt = new Date().toISOString();
    stmt.run(
      crypto.randomUUID(),
      title,
      description,
      status,
      user_id,
      createdAt
    );
    return NextResponse.json({ message: "Todo added" });
  } catch (err: any) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
