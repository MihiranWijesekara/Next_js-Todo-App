import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  try {
    const stmt = db.prepare(`
      SELECT todo.*, users.full_name
      FROM todo
      JOIN users ON todo.user_id = users.id
    `);
    const todos = stmt.all();
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
