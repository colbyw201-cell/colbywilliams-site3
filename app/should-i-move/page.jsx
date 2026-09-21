import ShouldIMoveClient from './ShouldIMoveClient';

const URL = 'https://colbywilliamsrealtor.com/should-i-move';

export const metadata = {
  title: 'Should I Move? Free Sell and Buy Calculator for North Alabama | Colby Williams',
  description:
    "See what you'd walk away with after selling, what your next payment would really be with North Alabama property taxes, and an honest answer, including not yet.",
  alternates: { canonical: URL },
  openGraph: {
    title: 'Should I Move? Get the honest answer.',
    description:
      'Your real net proceeds, your real next payment, and a straight answer. Built for Athens, Huntsville, Madison, Decatur, and Limestone County.',
    url: URL,
    type: 'website',
  },
};

export default function ShouldIMovePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Should I Move? Calculator',
    url: URL,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    provider: {
      '@type': 'RealEstateAgent',
      name: 'Colby Williams, Innovative Realty Solutions',
      telephone: '+1-256-710-2384',
      email: 'colbywilliamsre@gmail.com',
      url: 'https://colbywilliamsrealtor.com',
      areaServed: ['Athens, AL', 'Huntsville, AL', 'Madison, AL', 'Decatur, AL', 'Limestone County, AL'],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ShouldIMoveClient />
    </>
  );
}
