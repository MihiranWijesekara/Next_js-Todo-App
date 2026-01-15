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
      INSERT INTO todo ( title, description, status, user_id, created_at)
      VALUES (?, ?, ?, ?, ?)
    `);
    const createdAt = new Date().toISOString();
    stmt.run(title, description, status, user_id, createdAt);
    return NextResponse.json({ message: "Todo added" });
  } catch (err: any) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    if (!user_id) {
      return NextResponse.json(
        { error: "user_id is required" },
        { status: 400 }
      );
    }
    const stmt = db.prepare(`SELECT * FROM todo WHERE user_id = ?`);
    const todos = stmt.all(user_id);
    return NextResponse.json({ todos });
  } catch (err: any) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "todo id is required" },
        { status: 400 }
      );
    }
    const stmt = db.prepare(`DELETE FROM todo WHERE id = ?`);
    const result = stmt.run(id);
    if (result.changes === 0) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Todo deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Todo id required" }, { status: 400 });
    }

    const { title, description, status } = await req.json();

    const stmt = db.prepare(
      "UPDATE todo SET title = ?, description = ?, status = ? WHERE id = ?"
    );

    const result = stmt.run(title, description, status, id);

    if (result.changes === 0) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Todo updated successfully" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
