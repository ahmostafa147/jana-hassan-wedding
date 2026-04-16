import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const password = request.headers.get("x-admin-password");

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sql = getDb();
    const rsvps = await sql`
      SELECT id, name, quantity, created_at
      FROM rsvps
      ORDER BY created_at DESC
    `;

    const total = rsvps.reduce((sum, r) => sum + (r.quantity as number), 0);

    return NextResponse.json({ rsvps, totalGuests: total, totalRsvps: rsvps.length });
  } catch (error) {
    console.error("Admin RSVP error:", error);
    return NextResponse.json({ error: "Failed to fetch RSVPs" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const password = request.headers.get("x-admin-password");

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    const sql = getDb();
    await sql`DELETE FROM rsvps WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete RSVP error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
