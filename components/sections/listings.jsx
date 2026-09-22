"use client";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ButtonLink } from "@/components/button";
import { EASE, MaskLines, Reveal, Stagger, StaggerItem } from "@/components/motion";
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// Airtable "Price" may be a number (715000) or text ("$715,000").
function formatPrice(price) {
  return typeof price === "number" ? usd.format(price) : price;
}

function listingImages(l) {
  return l.images && l.images.length ? l.images : l.image ? [l.image] : [];
}
function Carousel({ listing }) {
  const [[index, dir], setState] = useState([0, 0]);
  const photos = listingImages(listing);
  const n = photos.length;
  const go = (d) => setState(([i]) => [(i + d + n) % n, d]);
  const onDragEnd = (_, info) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
  };
  return (
    <div
      className="group/carousel bg-sand relative aspect-[4/3] overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label={`Photos of ${listing.address}`}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={index}
          custom={dir}
          variants={{
            enter: (d) => ({ x: d > 0 ? "100%" : d < 0 ? "-100%" : 0, scale: 1.05 }),
            center: { x: 0, scale: 1 },
            exit: (d) => ({ x: d > 0 ? "-30%" : "30%", opacity: 0.4 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: EASE }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <Image
            src={photos[index]}
            alt={`${listing.address} — photo ${index + 1} of ${n}`}
            fill
            // Airtable photo URLs rotate every couple of hours, so skip Vercel's image cache for them.
            unoptimized={photos[index].startsWith("http")}
            draggable={false}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="pointer-events-none object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <span className="bg-paper/90 absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase backdrop-blur">
        {listing.status}
      </span>
      {n > 1 && (
        <>
      <span className="absolute top-4 right-4 rounded-full bg-ink/60 px-2.5 py-1 text-xs font-medium text-white tabular-nums backdrop-blur">
        {index + 1} / {n}
      </span>

      {[
        { d: -1, label: "Previous photo", Icon: ChevronLeft, pos: "left-3" },
        { d: 1, label: "Next photo", Icon: ChevronRight, pos: "right-3" },
      ].map(({ d, label, Icon, pos }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          onClick={() => go(d)}
          className={`bg-paper/90 text-ink absolute top-1/2 ${pos} grid size-11 -translate-y-1/2 place-items-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus-visible:opacity-100 sm:opacity-0 sm:group-hover/carousel:opacity-100`}
        >
          <Icon className="size-5" aria-hidden="true" />
        </button>
      ))}

      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5" aria-hidden="true">
        {photos.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full bg-white transition-all duration-500 ${i === index ? "w-5 opacity-100" : "w-1.5 opacity-60"}`}
          />
        ))}
      </div>
        </>
      )}
    </div>
  );
}
function ListingCard({ listing, index }) {
  const [expanded, setExpanded] = useState(false);
  const id = `listing-desc-${index}`;
  const long = listing.blurb.length > 180;
  const stats = [
    ["Beds", listing.beds],
    ["Baths", listing.baths],
    ["Sq ft", listing.sqft && Number(listing.sqft).toLocaleString()],
  ].filter(([, v]) => v);
  return (
    <article className="bg-paper group flex h-full flex-col overflow-hidden rounded-[1.75rem] ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgb(22_19_15/0.4)]">
      <Carousel listing={listing} />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-ink-soft text-xs font-semibold tracking-[0.16em] uppercase">{listing.city}</p>
        <div className="mt-2 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl font-semibold tracking-tight">{listing.address}</h3>
          <p className="font-display text-red text-2xl font-bold tracking-tight">
            {formatPrice(listing.price)}
          </p>
        </div>
        {stats.length ? (
        <dl
          className="border-line mt-5 grid border-y py-4 text-center"
          style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
        >
          {stats.map(([k, v]) => (
            <div key={k} className="border-line not-last:border-r">
              <dd className="font-display text-lg font-semibold">{v}</dd>
              <dt className="text-ink-soft text-xs tracking-wide uppercase">{k}</dt>
            </div>
          ))}
        </dl>
        ) : (
          listing.specs && <p className="border-line text-ink-soft mt-5 border-y py-4 text-sm tracking-wide">{listing.specs}</p>
        )}

        {listing.blurb && (
        <motion.div
          id={id}
          initial={false}
          animate={{ height: expanded || !long ? "auto" : "4.9rem" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative mt-5 overflow-hidden"
        >
          <p className="text-ink-soft text-[0.95rem] leading-relaxed">{listing.blurb}</p>
          {long && !expanded && <div className="from-paper absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t" />}
        </motion.div>
        )}
        {long && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => setExpanded((e) => !e)}
          className="text-ink mt-2 min-h-10 self-start text-sm font-semibold underline decoration-red decoration-2 underline-offset-4"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
        )}

        <div className="mt-auto pt-6">
          <ButtonLink href="#contact" className="w-full">
            Book a showing
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
export function Listings({ listings }) {
  return (
    <section id="listings" className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <p className="eyebrow">Featured homes</p>
            </Reveal>
            <MaskLines
              className="font-display mt-5 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1] font-bold tracking-[-0.03em]"
              lines={["My Listings"]}
            />
          </div>
          <Reveal delay={0.1}>
            <a
              href="#contact"
              className="group text-red inline-flex min-h-11 items-center gap-2 text-sm font-semibold tracking-wide uppercase"
            >
              Ask about a home
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </Reveal>
        </div>

        <Stagger as="ul" className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3" gap={0.12}>
          {listings.map((l, i) => (
            <StaggerItem as="li" key={l.address}>
              <ListingCard listing={l} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
        <p className="text-ink-soft mt-8 text-center text-xs">
          Details believed accurate; confirm with listing agent.
        </p>
      </div>
    </section>
  );
}
