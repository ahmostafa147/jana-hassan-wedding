import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, quantity } = await request.json();

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const qty = Math.max(1, Math.min(20, Math.floor(Number(quantity) || 1)));

    const sql = getDb();
    await sql`
      INSERT INTO rsvps (name, quantity)
      VALUES (${name.trim()}, ${qty})
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RSVP error:", error);
    return NextResponse.json({ error: "Failed to submit RSVP" }, { status: 500 });
  }
}
