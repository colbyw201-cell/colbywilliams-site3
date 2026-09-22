"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { ButtonLink } from "@/components/button";
import { EASE, MaskLines } from "@/components/motion";
export function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "14%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-18%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], reduce ? [1, 1] : [1, 0]);
  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="eyebrow flex items-center gap-3"
          >
            <span className="bg-red inline-block h-px w-8" aria-hidden="true" />
            Realtor® · Athens, Alabama
          </motion.p>

          <MaskLines
            as="h1"
            inView={false}
            delay={0.2}
            className="font-display mt-6 text-[clamp(2.6rem,5.6vw,4.9rem)] leading-[0.95] font-bold tracking-[-0.035em]"
            lines={[
              "Buying or selling",
              "in North Alabama?",
              <span key="easy" className="text-red relative inline-block">
                Let’s make it easy.
                <motion.svg
                  aria-hidden="true"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-3 w-full"
                >
                  <motion.path
                    d="M2 9 C 60 3, 140 3, 298 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, delay: 1.1, ease: EASE }}
                  />
                </motion.svg>
              </span>,
            ]}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
            className="text-ink-soft mt-8 max-w-xl text-lg leading-relaxed"
          >
            I’m Colby Williams with Innovative Realty Solutions, a local guide for buying and selling homes
            across Athens, Madison, and Huntsville. Straight answers, no pressure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <ButtonLink href="#valuation">Get my home value</ButtonLink>
            <ButtonLink href="#listings" variant="outline">
              See listings
            </ButtonLink>
          </motion.div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          {/* red accent block slides in behind the photo */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
            className="bg-red absolute -right-3 -bottom-3 h-2/3 w-2/3 origin-bottom rounded-[2rem] sm:-right-5 sm:-bottom-5"
          />
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0% round 2rem)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0% round 2rem)" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.25 }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem]"
          >
            <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
              <motion.div
                initial={{ scale: 1.25 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease: EASE, delay: 0.25 }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/hero.jpg"
                  alt="Colby Williams, Realtor in Athens, Alabama"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover object-top"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.3 }}
            className="absolute -left-4 bottom-10 sm:-left-10"
          >
            <div className="bg-paper/90 animate-float flex items-center gap-3 rounded-2xl p-3 pr-5 shadow-[0_20px_40px_-15px_rgb(22_19_15/0.35)] ring-1 ring-ink/5 backdrop-blur-md">
              <span className="bg-red grid size-10 place-items-center rounded-xl text-white">
                <MapPin className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold">Based in Athens</p>
                <p className="text-ink-soft text-xs">Local &amp; on your side</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
