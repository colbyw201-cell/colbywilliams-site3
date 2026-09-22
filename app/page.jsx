import { Bricolage_Grotesque, Inter } from "next/font/google";

import { MotionProvider, ScrollProgress } from "@/components/motion";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Listings } from "@/components/sections/listings";
import { TownMarquee } from "@/components/sections/marquee";
import { Pillars } from "@/components/sections/pillars";
import { Process } from "@/components/sections/process";
import { Reviews } from "@/components/sections/reviews";
import { SellBuy } from "@/components/sections/sell-buy";
import { ShouldIMove } from "@/components/sections/should-i-move";
import { Valuation } from "@/components/sections/valuation";
import { defaultListings, defaultReviews } from "@/lib/content";
import { getContent } from "./lib/airtable";
import "./home.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["500", "600", "700", "800"],
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Re-fetch Airtable at most every 10 minutes. Airtable photo URLs expire after
// ~2 hours, so this keeps them fresh without hitting Airtable on every visit.
export const revalidate = 600;

export default async function Home() {
  const content = await getContent({ next: { revalidate } });
  const listings = content.listings.length ? content.listings : defaultListings;
  const reviews = content.reviews.length ? content.reviews : defaultReviews;

  return (
    <MotionProvider>
      <div className={`home grain ${bricolage.variable} ${inter.variable}`}>
        <a
          href="#main"
          className="bg-red sr-only z-[80] rounded-full px-5 py-3 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Header />
        <main id="main">
          <Hero />
          <TownMarquee />
          <Pillars />
          <ShouldIMove />
          <About />
          <SellBuy />
          <Listings listings={listings} />
          <Valuation />
          <Process />
          <Reviews reviews={reviews} />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionProvider>
  );
}
