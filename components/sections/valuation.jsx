"use client";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { EASE, MaskLines, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { valuationPoints } from "@/lib/content";
import { cn } from "@/lib/utils";
function Input({ id, label, error, optional, className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-xs font-semibold tracking-[0.14em] uppercase">
        {label}{" "}
        {optional && (
          <span className="text-ink-soft font-normal normal-case tracking-normal">(optional)</span>
        )}
      </label>
      <input
        id={id}
        name={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "bg-cream placeholder:text-ink-soft/60 h-12 rounded-xl border px-4 text-base transition-all duration-300 outline-none focus:bg-white focus:ring-4",
          error ? "border-red focus:ring-red/15" : "border-line focus:border-ink focus:ring-ink/5",
        )}
        {...props}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red text-sm"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
export function Valuation() {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const next = {};
    if (!data.address?.trim()) next.address = "Enter the property address.";
    if (!data.firstName?.trim()) next.firstName = "Enter your first name.";
    if (!data.email?.trim()) next.email = "Enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) next.email = "Check your email for typos.";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      form.querySelector(`#${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "Home valuation form" }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }
  return (
    <section id="valuation" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <div className="grid overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-40px_rgb(22_19_15/0.45)] lg:grid-cols-2">
        <div className="bg-ink text-cream relative overflow-hidden p-8 sm:p-12 lg:p-16">
          <div
            aria-hidden="true"
            className="bg-red/30 absolute -bottom-32 -left-32 size-96 rounded-full blur-3xl"
          />
          <div className="relative">
            <Reveal>
              <p className="eyebrow">Free · No obligation</p>
            </Reveal>
            <MaskLines
              className="font-display mt-5 text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1] font-bold tracking-[-0.03em]"
              lines={["What’s your home", "actually worth?"]}
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
                Online estimates guess. I’ll send you a real range based on what comparable homes near you
                have actually sold for, and what buyers are paying right now.
              </p>
            </Reveal>
            <Stagger as="ul" className="mt-10 space-y-4" gap={0.12}>
              {valuationPoints.map((p) => (
                <StaggerItem as="li" key={p} className="flex items-start gap-3">
                  <span className="bg-red mt-0.5 grid size-6 shrink-0 place-items-center rounded-full">
                    <Check className="size-3.5 text-white" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-white/85">{p}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        <div className="bg-paper relative p-8 sm:p-12 lg:p-16">
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="done"
                role="status"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex h-full flex-col items-center justify-center py-12 text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                  className="bg-red grid size-16 place-items-center rounded-full text-white"
                >
                  <svg viewBox="0 0 24 24" className="size-8" aria-hidden="true">
                    <motion.path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.35 }}
                    />
                  </svg>
                </motion.span>
                <h3 className="font-display mt-6 text-3xl font-bold tracking-tight">Got it — thank you!</h3>
                <p className="text-ink-soft mt-3 max-w-sm">
                  I’ll pull recent sales near you and send your range personally, usually within one business
                  day.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="text-ink mt-6 min-h-11 text-sm font-semibold underline decoration-red decoration-2 underline-offset-4"
                >
                  Value another home
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={onSubmit}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-5"
              >
                <Input
                  id="address"
                  label="Property address"
                  placeholder="123 Main St, Athens, AL"
                  autoComplete="street-address"
                  error={errors.address}
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    id="firstName"
                    label="First name"
                    autoComplete="given-name"
                    error={errors.firstName}
                  />
                  <Input id="lastName" label="Last name" autoComplete="family-name" error={errors.lastName} />
                </div>
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  inputMode="email"
                  placeholder="you@email.com"
                  autoComplete="email"
                  error={errors.email}
                />
                <Input
                  id="phone"
                  label="Phone"
                  optional
                  type="tel"
                  inputMode="tel"
                  placeholder="(256) 000-0000"
                  autoComplete="tel"
                  error={errors.phone}
                />
                {/* honeypot — hidden from people, bots fill it */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px]"
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group bg-red hover:bg-red-deep mt-2 inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-6 font-semibold tracking-wide text-white transition-colors duration-300 disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="size-5 animate-spin" aria-hidden="true" /> Sending…
                    </>
                  ) : (
                    "Get my home value"
                  )}
                </button>
                {status === "error" && (
                  <p role="alert" className="text-red text-center text-sm">
                    Something went wrong. Please call or text me at (256) 710-2384.
                  </p>
                )}
                <p className="text-ink-soft text-center text-xs">
                  Goes straight to Colby, never sold or shared.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
