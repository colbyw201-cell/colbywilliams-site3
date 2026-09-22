"use client";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { EASE, MaskLines, Reveal } from "@/components/motion";
import { faqs } from "@/lib/content";
export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="bg-paper py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Good questions</p>
          </Reveal>
          <MaskLines
            className="font-display mt-5 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1] font-bold tracking-[-0.03em]"
            lines={["Before we", "ever talk"]}
          />
          <Reveal delay={0.1}>
            <p className="text-ink-soft mt-6 max-w-sm text-lg">
              A few things people want to know first. Don’t see yours?{" "}
              <a
                href="#contact"
                className="text-ink font-semibold underline decoration-red decoration-2 underline-offset-4"
              >
                Just ask me.
              </a>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <ul className="border-line border-t">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="border-line border-b">
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group hover:text-red flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left transition-colors"
                    >
                      <span className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                        {f.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className={`grid size-10 shrink-0 place-items-center rounded-full transition-colors duration-300 ${isOpen ? "bg-red text-white" : "bg-sand text-ink group-hover:bg-ink group-hover:text-cream"}`}
                      >
                        <Plus className="size-5" aria-hidden="true" />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-a-${i}`}
                        role="region"
                        aria-labelledby={`faq-q-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="text-ink-soft max-w-2xl pb-6 text-lg leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
