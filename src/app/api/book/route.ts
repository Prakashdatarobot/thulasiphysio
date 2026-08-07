import { NextRequest, NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validation";
import { appendBookingRow } from "@/lib/google-sheets";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid input", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Honeypot tripped — silently report success to avoid tipping off bots.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true, sheetWritten: false });
  }

  const sourceSection = typeof body?.sourceSection === "string" ? body.sourceSection : "unknown";

  try {
    await appendBookingRow(parsed.data, sourceSection);
    return NextResponse.json({ ok: true, sheetWritten: true });
  } catch (err) {
    // Sheets write failed (e.g. placeholder credentials not yet replaced).
    // The client still falls back to opening WhatsApp, so no lead is lost.
    console.error("Failed to write booking lead to Google Sheets:", err);
    return NextResponse.json({ ok: true, sheetWritten: false });
  }
}
