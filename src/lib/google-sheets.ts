import { google } from "googleapis";
import type { BookingInput } from "@/lib/validation";

// Requires GOOGLE_SHEET_ID and GOOGLE_SERVICE_ACCOUNT_KEY (the service
// account's JSON key, either as a raw JSON string or base64-encoded) in the
// environment. Both are placeholder/test values until the clinic provides
// real credentials — see spec.md §12. Until then this throws and the caller
// falls back to the WhatsApp deep link (see /api/book).
export async function appendBookingRow(input: BookingInput, sourceSection: string) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!sheetId || !rawKey) {
    throw new Error("Google Sheets credentials are not configured");
  }

  const decoded = rawKey.trim().startsWith("{")
    ? rawKey
    : Buffer.from(rawKey, "base64").toString("utf-8");
  const credentials = JSON.parse(decoded);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Leads!A:G",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          new Date().toISOString(),
          input.name,
          input.phone,
          input.condition,
          input.preferredDateTime,
          input.notes ?? "",
          sourceSection,
        ],
      ],
    },
  });
}
