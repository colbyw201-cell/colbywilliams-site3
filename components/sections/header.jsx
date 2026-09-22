"use client";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/button";
import { EASE } from "@/components/motion";
import { contact, nav } from "@/lib/content";
import { cn } from "@/lib/utils";
export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(!open && y > prev && y > 400);
  });
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2 transition-all duration-500 sm:px-6",
          scrolled || open
            ? "bg-paper/80 shadow-[0_8px_30px_-12px_rgb(22_19_15/0.25)] ring-1 ring-ink/5 backdrop-blur-xl"
            : "",
        )}
      >
        <a href="#top" aria-label="Colby Williams, Innovative Realty Solutions — home" className="shrink-0">
          <Image
            src="/images/wordmark.png"
            alt="Innovative Realty Solutions"
            width={645}
            height={160}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group text-ink-soft hover:text-ink relative px-3 py-2 text-sm font-medium transition-colors"
                >
                  {l.label}
                  <span className="bg-red absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${contact.tel}`}
            className="text-ink-soft hover:text-ink hidden items-center gap-2 px-3 text-sm font-medium transition-colors xl:flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            {contact.phone}
          </a>
          <ButtonLink href="#contact" className="hidden min-h-11 sm:inline-flex">
            Let’s talk
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="hover:bg-sand grid size-11 place-items-center rounded-full transition-colors lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: EASE }}
            className="bg-paper/95 mx-auto mt-2 max-w-7xl origin-top rounded-3xl p-3 shadow-xl ring-1 ring-ink/5 backdrop-blur-xl lg:hidden"
          >
            <ul>
              {[...nav, { href: "#contact", label: "Let’s talk" }].map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: EASE }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display hover:bg-sand flex min-h-12 items-center rounded-2xl px-4 text-xl font-semibold"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={`tel:${contact.tel}`}
              className="bg-ink text-cream mt-2 flex min-h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold"
            >
              <Phone className="size-4" aria-hidden="true" /> Call {contact.phone}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
