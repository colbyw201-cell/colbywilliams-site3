import { notFound } from "next/navigation";
import { CITIES, CITY_SLUGS } from "../cityData";
import CityPageClient from "../CityPageClient";

const SITE = "https://www.colbywilliamsrealtor.com";

// Pre-build all four pages at deploy time (fast + SEO-friendly).
export function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

// Per-city <title> and meta description, built from cityData.js.
export function generateMetadata({ params }) {
  const city = CITIES[params.city];
  if (!city) return {};
  const url = `${SITE}/communities/${city.slug}`;
  return {
    title: city.seo.title,
    description: city.seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: city.seo.title,
      description: city.seo.description,
      url,
      type: "website",
      images: [{ url: `${SITE}${city.image}` }],
    },
  };
}

export default function CommunityPage({ params }) {
  const city = CITIES[params.city];
  if (!city) notFound();

  // Structured data so Google understands this is a local real-estate
  // page tied to a place. Helps local SEO.
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Colby Williams · Innovative Realty Solutions",
    url: `${SITE}/communities/${city.slug}`,
    telephone: "+1-256-710-2384",
    areaServed: { "@type": "City", name: `${city.name}, Alabama` },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Athens",
      addressRegion: "AL",
      addressCountry: "US",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <CityPageClient city={city} />
    </>
  );
}
