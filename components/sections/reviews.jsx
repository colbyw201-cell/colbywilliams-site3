"use client";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { MaskLines, Reveal, Stagger, StaggerItem } from "@/components/motion";

// Some Airtable reviews already include quote marks — strip them so we don't double up.
const clean = (t) => t.trim().replace(/^["“”']+|["“”']+$/g, "");
function Stars() {
  return (
    <motion.div
      className="text-red flex gap-1"
      role="img"
      aria-label="5 out of 5 stars"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { scale: 0, rotate: -45 },
            show: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 400, damping: 14 } },
          }}
        >
          <Star className="size-4 fill-current" aria-hidden="true" />
        </motion.span>
      ))}
    </motion.div>
  );
}
export function Reviews({ reviews }) {
  const [feature, ...rest] = reviews;
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <Reveal>
        <p className="eyebrow">What clients say</p>
      </Reveal>
      <MaskLines
        className="font-display mt-5 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1] font-bold tracking-[-0.03em]"
        lines={["People you can", "call and ask"]}
      />

      <Stagger className="mt-14 grid gap-5 lg:grid-cols-5" gap={0.12}>
        <StaggerItem className="lg:col-span-3 lg:row-span-2">
          <figure className="bg-ink text-cream relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 sm:p-12">
            <span
              aria-hidden="true"
              className="font-display text-red absolute -top-6 right-8 text-[12rem] leading-none font-bold opacity-40"
            >
              ”
            </span>
            <Stars />
            <blockquote className="font-display relative mt-6 text-2xl leading-snug font-medium tracking-tight sm:text-3xl">
              {clean(feature.text)}
            </blockquote>
            <figcaption className="mt-auto pt-10 text-sm tracking-[0.14em] text-white/60 uppercase">
              <span className="font-semibold text-white">{feature.name}</span> · {feature.meta}
            </figcaption>
          </figure>
        </StaggerItem>
        {rest.map((r) => (
          <StaggerItem key={r.name} className="lg:col-span-2">
            <figure className="bg-paper flex h-full flex-col rounded-[2rem] p-8 ring-1 ring-ink/5 transition-transform duration-500 hover:-translate-y-1">
              <Stars />
              <blockquote className="mt-5 text-lg leading-relaxed">“{clean(r.text)}”</blockquote>
              <figcaption className="text-ink-soft mt-auto pt-6 text-sm tracking-[0.14em] uppercase">
                <span className="text-ink font-semibold">{r.name}</span> · {r.meta}
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
