import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const sql = getDb();
    await sql`
      CREATE TABLE IF NOT EXISTS rsvps (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    return NextResponse.json({ success: true, message: "Database initialized" });
  } catch (error) {
    console.error("Init DB error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to initialize database", details: message }, { status: 500 });
  }
}
