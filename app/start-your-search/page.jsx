import BuyerFormClient from "./BuyerFormClient";

export const metadata = {
  title: "Start Your Home Search in North Alabama | Colby Williams",
  description:
    "Tell me what you're looking for and I'll send you homes for sale in Athens, Madison, Huntsville, and across North Alabama that actually fit. Free, no pressure.",
  alternates: {
    canonical: "https://colbywilliamsrealtor.com/start-your-search",
  },
  openGraph: {
    title: "Start Your Home Search in North Alabama",
    description:
      "Get homes for sale in Athens AL, Madison, and Huntsville matched to what you actually want.",
    url: "https://colbywilliamsrealtor.com/start-your-search",
    type: "website",
  },
};

export default function StartYourSearchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            name: "Colby Williams, Innovative Realty Solutions",
            areaServed: ["Athens AL", "Madison AL", "Huntsville AL", "North Alabama"],
            url: "https://colbywilliamsrealtor.com/start-your-search",
          }),
        }}
      />
      <BuyerFormClient />
    </>
  );
}
