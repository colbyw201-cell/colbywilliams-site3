"use client";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { towns } from "@/lib/content";
function Row() {
  return (
    <>
      {towns.map((t) => (
        <span key={t} className="flex shrink-0 items-center gap-10 pr-10">
          <span>{t}</span>
          <svg viewBox="0 0 24 24" className="text-red size-5" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z"
            />
          </svg>
        </span>
      ))}
    </>
  );
}
/** Town ticker that leans into your scroll direction. */
export function TownMarquee() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 });
  const skew = useTransform(velocity, [-2000, 0, 2000], reduce ? [0, 0, 0] : [6, 0, -6]);
  return (
    <section aria-label="Areas served" className="bg-ink text-cream overflow-hidden py-7 sm:py-9">
      <p className="sr-only">Serving {towns.join(", ")}.</p>
      <motion.div
        aria-hidden="true"
        style={{ skewX: skew }}
        className="font-display flex w-max animate-marquee text-3xl font-semibold tracking-tight hover:[animation-play-state:paused] sm:text-5xl"
      >
        <Row />
        <Row />
      </motion.div>
    </section>
  );
}
