// GET /api/content
// Reads Listings + Reviews from Airtable (see app/lib/airtable.js).
// If Airtable isn't configured (or errors), returns empty arrays and callers
// fall back to their built-in defaults — so it can never break.

import { getContent } from "../../lib/airtable";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // always fetch fresh (keeps image URLs valid)

export async function GET() {
  return Response.json(await getContent({ cache: "no-store" }));
}
