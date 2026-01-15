import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const stmt = db.prepare(`SELECT * FROM todo `);
    const todos = stmt.all();
    return NextResponse.json({ todos });
  } catch (err: any) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
