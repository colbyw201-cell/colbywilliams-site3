import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://colbywilliamsrealtor.com"),
  title: "Colby Williams | Athens AL Realtor · Homes for Sale in North Alabama",
  description:
    "Colby Williams, Realtor with Innovative Realty Solutions, helps you buy and sell homes in Athens, Madison, Huntsville, and Decatur, Alabama. Get a free, no-obligation home value.",
  keywords: [
    "Athens AL Realtor",
    "Athens Alabama homes for sale",
    "Madison Alabama Realtor",
    "Huntsville Realtor",
    "North Alabama real estate",
    "Athens Alabama real estate agent",
  ],
  openGraph: {
    title: "Colby Williams | Athens AL Realtor",
    description:
      "Buy or sell in Athens, Madison, Huntsville, and Decatur with a local guide. Get a free home value.",
    url: "https://colbywilliamsrealtor.com",
    siteName: "Colby Williams — Innovative Realty Solutions",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Colby Williams — Innovative Realty Solutions",
  telephone: "+1-256-710-2384",
  email: "colbywilliamsre@gmail.com",
  url: "https://colbywilliamsrealtor.com",
  areaServed: ["Athens AL", "Madison AL", "Huntsville AL", "Decatur AL", "Limestone County AL"],
  address: { "@type": "PostalAddress", addressLocality: "Athens", addressRegion: "AL", addressCountry: "US" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
