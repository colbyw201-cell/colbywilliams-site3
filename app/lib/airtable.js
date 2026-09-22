// Reads Listings + Reviews from Airtable so Colby can manage content with no code.
// Shared by the homepage (server-rendered) and GET /api/content.
// If Airtable isn't configured (or errors), returns empty arrays so callers
// fall back to their built-in defaults — the site can never break.

const BASE = process.env.AIRTABLE_BASE_ID;
const TOKEN = process.env.AIRTABLE_TOKEN;

async function table(name, params, fetchOptions) {
  const url = `https://api.airtable.com/v0/${BASE}/${encodeURIComponent(name)}?${params}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` }, ...fetchOptions });
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

/**
 * @param {RequestInit & { next?: { revalidate?: number } }} fetchOptions
 *   e.g. { cache: "no-store" } or { next: { revalidate: 600 } }
 */
export async function getContent(fetchOptions = { cache: "no-store" }) {
  if (!BASE || !TOKEN) {
    return { listings: [], reviews: [], configured: false };
  }
  try {
    // Only rows with the "Published" box checked; sorted by "Order" if present.
    const [listingRecords, reviewRecords] = await Promise.all([
      table("Listings", "filterByFormula=Published&sort%5B0%5D%5Bfield%5D=Order", fetchOptions),
      table("Reviews", "filterByFormula=Published", fetchOptions),
    ]);

    const listings = listingRecords.map((r) => {
      const f = r.fields;
      return {
        address: f.Address || "",
        city: f.City || "",
        price: f.Price || "",
        specs: specs(f),
        beds: f.Beds || null,
        baths: f.Baths || null,
        sqft: f.Sqft || null,
        blurb: f.Blurb || "",
        status: f.Status || "For sale",
        images: (f.Photo || []).map((p) => p.url).filter(Boolean),
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

    return { listings, reviews, configured: true };
  } catch (e) {
    console.error("Airtable fetch failed:", e);
    return { listings: [], reviews: [], configured: true, error: true };
  }
}
