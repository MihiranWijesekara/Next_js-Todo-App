import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  const { fullName, email, password, role } = await req.json();

  if (!fullName || !email || !password || !role) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO users (full_name, email, password, role)
      VALUES ( ?, ?, ?, ?)
    `);

    stmt.run(
      fullName,
      email,
      password, // ⚠ hash later
      role
    );

    return NextResponse.json({ message: "User registered" });
  } catch (err: any) {
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
