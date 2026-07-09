// GET /api/content
// Reads Listings + Reviews from Airtable so Colby can manage content with no code.
// If Airtable isn't configured (or errors), returns empty arrays and the site
// falls back to its built-in defaults — so it can never break.

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // always fetch fresh (keeps image URLs valid)

const BASE = process.env.AIRTABLE_BASE_ID;
const TOKEN = process.env.AIRTABLE_TOKEN;

async function table(name, params = "") {
  const url = `https://api.airtable.com/v0/${BASE}/${encodeURIComponent(name)}?${params}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Airtable ${name} ${res.status}`);
  const data = await res.json();
  return data.records || [];
}

function specs(f) {
  return [
    f.Beds ? `${f.Beds} BD` : null,
    f.Baths ? `${f.Baths} BA` : null,
    f.Sqft ? `${Number(f.Sqft).toLocaleString()} SQFT` : null,
  ].filter(Boolean).join(" · ");
}

export async function GET() {
  if (!BASE || !TOKEN) {
    return Response.json({ listings: [], reviews: [], configured: false });
  }
  try {
    // Only rows with the "Published" box checked; sorted by "Order" if present.
    const [listingRecords, reviewRecords] = await Promise.all([
      table("Listings", "filterByFormula=Published&sort%5B0%5D%5Bfield%5D=Order"),
      table("Reviews", "filterByFormula=Published"),
    ]);

    const listings = listingRecords.map((r) => {
      const f = r.fields;
      return {
        address: f.Address || "",
        city: f.City || "",
        price: f.Price || "",
        specs: specs(f),
        blurb: f.Blurb || "",
        status: f.Status || "For sale",
        image: f.Photo?.[0]?.url || "",
      };
    }).filter((l) => l.address);

    const reviews = reviewRecords.map((r) => {
      const f = r.fields;
      return {
        text: f.Review || "",
        name: f.Name || "",
        meta: f.Source || "Google review",
      };
    }).filter((rv) => rv.text && rv.name);

    return Response.json({ listings, reviews, configured: true });
  } catch (e) {
    console.error("Airtable fetch failed:", e);
    // Fall back to defaults on any error
    return Response.json({ listings: [], reviews: [], configured: true, error: true });
  }
}
