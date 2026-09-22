"use client";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { Home, KeyRound } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { Stagger, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";
function SpotlightCard({ children, dark }) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const bg = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, ${dark ? "rgb(165 40 49 / 0.35)" : "rgb(165 40 49 / 0.10)"}, transparent 70%)`;
  return (
    <div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        x.set(-400);
        y.set(-400);
      }}
      className={cn(
        "relative h-full overflow-hidden rounded-[2rem] p-8 transition-transform duration-500 hover:-translate-y-1 sm:p-12",
        dark ? "bg-ink text-cream" : "bg-paper ring-1 ring-ink/5",
      )}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: bg }}
      />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
}
export function SellBuy() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <Stagger className="grid gap-5 lg:grid-cols-2" gap={0.15}>
        <StaggerItem>
          <SpotlightCard dark>
            <span className="bg-red grid size-14 place-items-center rounded-2xl text-white">
              <Home className="size-6" aria-hidden="true" />
            </span>
            <h2 className="font-display mt-8 text-4xl font-bold tracking-tight">Thinking about selling?</h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">
              Start by knowing your number. I’ll pull real, recent North Alabama sales (not a random online
              estimate) so you know what your home would actually bring today, with zero obligation to list.
            </p>
            <div className="mt-auto pt-10">
              <ButtonLink href="#valuation" variant="light">
                Get my home value
              </ButtonLink>
            </div>
          </SpotlightCard>
        </StaggerItem>
        <StaggerItem>
          <SpotlightCard>
            <span className="bg-ink text-cream grid size-14 place-items-center rounded-2xl">
              <KeyRound className="size-6" aria-hidden="true" />
            </span>
            <h2 className="font-display mt-8 text-4xl font-bold tracking-tight">Looking for a home?</h2>
            <p className="text-ink-soft mt-4 max-w-md text-lg leading-relaxed">
              First home, move-up, or a relocation to the Huntsville area. I’ll help you figure out what you
              can afford, where to look, and how to win without overpaying.
            </p>
            <div className="mt-auto pt-10">
              <ButtonLink href="/start-your-search" variant="outline">
                Start your search
              </ButtonLink>
            </div>
          </SpotlightCard>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
