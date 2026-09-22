"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MaskLines, Reveal } from "@/components/motion";
import { steps } from "@/lib/content";
function Step({ i, progress, title, body }) {
  const start = i / steps.length;
  const on = useTransform(progress, [start, start + 0.1], [0, 1]);
  const bg = useTransform(on, [0, 1], ["var(--paper)", "var(--red)"]);
  const color = useTransform(on, [0, 1], ["var(--ink)", "#ffffff"]);
  return (
    <li className="relative flex gap-6 md:flex-col md:gap-0">
      <motion.span
        style={{ backgroundColor: bg, color }}
        className="font-display ring-line relative z-10 grid size-14 shrink-0 place-items-center rounded-full text-lg font-bold ring-1"
      >
        0{i + 1}
      </motion.span>
      <Reveal delay={i * 0.1} className="md:mt-8 md:pr-10">
        <h3 className="font-display text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="text-ink-soft mt-2 leading-relaxed">{body}</p>
      </Reveal>
    </li>
  );
}
export function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">How it works</p>
        </Reveal>
        <MaskLines
          className="font-display mt-5 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1] font-bold tracking-[-0.03em]"
          lines={["Simple, and you’re", "never guessing"]}
        />

        <ol ref={ref} className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-0">
          {/* track + progress line (vertical on mobile, horizontal on desktop) */}
          <span
            aria-hidden="true"
            className="bg-line absolute top-0 bottom-0 left-7 w-px md:top-7 md:right-[16%] md:bottom-auto md:left-7 md:h-px md:w-auto"
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: scrollYProgress }}
            className="bg-red absolute top-0 bottom-0 left-7 w-px origin-top md:hidden"
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleX: scrollYProgress }}
            className="bg-red absolute top-7 right-[16%] left-7 hidden h-px origin-left md:block"
          />
          {steps.map((s, i) => (
            <Step key={s.title} i={i} progress={scrollYProgress} title={s.title} body={s.body} />
          ))}
        </ol>
      </div>
    </section>
  );
}
