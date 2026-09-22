"use client";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/button";
import { EASE, MaskLines, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { moveTool } from "@/lib/content";
// Illustrative verdicts that cycle in the preview card (not real numbers for anyone).
const verdicts = [
  {
    label: "Yes",
    tone: "bg-emerald-600",
    walk: 68400,
    fill: 0.86,
    note: "Your equity covers the move with room to spare.",
  },
  {
    label: "Yes, but tight",
    tone: "bg-amber-500",
    walk: 31200,
    fill: 0.58,
    note: "Doable — watch the rate on your next loan.",
  },
  {
    label: "Not yet",
    tone: "bg-red",
    walk: 9800,
    fill: 0.28,
    note: "About 14 months of payoff away from a clean move.",
  },
];
function Money({ value }) {
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => `$${Math.round(v).toLocaleString()}`);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) {
      mv.set(value);
      return;
    }
    const c = animate(mv, value, { duration: 1.1, ease: EASE });
    return () => c.stop();
  }, [value, mv, reduce]);
  return <motion.span>{text}</motion.span>;
}
function VerdictCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px" });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const v = verdicts[i];
  useEffect(() => {
    if (!inView || reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % verdicts.length), 3200);
    return () => clearInterval(t);
  }, [inView, reduce]);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="bg-paper relative rounded-3xl p-6 shadow-[0_30px_60px_-30px_rgb(22_19_15/0.45)] ring-1 ring-ink/5 sm:p-8"
    >
      <div className="flex items-center justify-between">
        <p className="text-ink-soft text-xs font-semibold tracking-[0.18em] uppercase">Sample result</p>
        <div className="flex gap-1.5">
          {verdicts.map((_, n) => (
            <span
              key={n}
              className={`h-1.5 rounded-full transition-all duration-500 ${n === i ? "bg-ink w-6" : "bg-line w-1.5"}`}
            />
          ))}
        </div>
      </div>

      <p className="text-ink-soft mt-6 text-sm">You’d walk away with</p>
      <p className="font-display mt-1 text-5xl font-bold tracking-tight tabular-nums">
        <Money value={v.walk} />
      </p>

      <div className="bg-sand mt-6 h-2.5 overflow-hidden rounded-full">
        <motion.div
          className={`h-full rounded-full ${v.tone}`}
          initial={{ width: 0 }}
          animate={{ width: `${v.fill * 100}%` }}
          transition={{ duration: 1.1, ease: EASE }}
        />
      </div>

      <div className="border-line mt-6 flex min-h-20 items-start gap-3 border-t pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={v.label}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold text-white ${v.tone}`}>
              {v.label}
            </span>
            <p className="text-ink-soft mt-2 text-sm">{v.note}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
export function ShouldIMove() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <div className="bg-sand/60 relative overflow-hidden rounded-[2.5rem] p-6 sm:p-12 lg:p-16">
        <div
          aria-hidden="true"
          className="bg-red/10 absolute -top-40 -right-40 size-[28rem] rounded-full blur-3xl"
        />
        <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow">Free tool · No sign-up</p>
            </Reveal>
            <MaskLines
              className="font-display mt-5 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.03em]"
              lines={["Should I move?"]}
            />
            <Reveal delay={0.15}>
              <p className="text-ink-soft mt-6 max-w-md text-lg leading-relaxed">
                Put in your real numbers and get a straight answer in about two minutes, even if the answer is
                not yet.
              </p>
            </Reveal>
            <Stagger as="ul" className="mt-8 space-y-5" gap={0.1}>
              {moveTool.map((m) => (
                <StaggerItem as="li" key={m.title} className="flex gap-4">
                  <span className="bg-red mt-2 size-2 shrink-0 rounded-full" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">{m.title}</p>
                    <p className="text-ink-soft text-sm">{m.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2} className="mt-10">
              <ButtonLink href="/should-i-move">Get my answer</ButtonLink>
            </Reveal>
          </div>
          <Reveal delay={0.1} y={40}>
            <VerdictCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
