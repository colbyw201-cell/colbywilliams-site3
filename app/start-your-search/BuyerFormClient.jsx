"use client";

import { useState } from "react";

const headlineFont = { fontFamily: '"Bricolage Grotesque", sans-serif' };
const labelFont = { fontFamily: '"Times New Roman", Times, serif' };

const priceOptions = [
  "Under $200k",
  "$200k - $300k",
  "$300k - $400k",
  "$400k - $500k",
  "$500k+",
];
const areaOptions = [
  "Athens",
  "Madison",
  "Huntsville",
  "Decatur",
  "Limestone County",
  "Not sure yet",
];
const timelineOptions = [
  "As soon as possible",
  "1 to 3 months",
  "3 to 6 months",
  "6+ months",
  "Just exploring",
];
const financingOptions = [
  "Already pre-approved",
  "Need a lender",
  "Paying cash",
  "Not sure yet",
];

const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-[15px] text-neutral-900 outline-none transition focus:border-[#A52831] focus:ring-2 focus:ring-[#A52831]/20";

export default function BuyerFormClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    priceRange: "",
    area: "",
    timeline: "",
    financing: "",
    notes: "",
    company: "", // honeypot
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/buyer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(data.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-[#F7F4EF] px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <p
            style={labelFont}
            className="mb-3 text-xs uppercase tracking-[0.18em] text-[#A52831]"
          >
            Start Your Search
          </p>
          <h1
            style={headlineFont}
            className="text-3xl font-semibold leading-tight text-neutral-900 sm:text-4xl"
          >
            Let's find the right home for you
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-neutral-600">
            Tell me a little about what you're after and I'll pull homes that
            actually fit. No spam, no pressure. Just real help from someone who
            knows North Alabama.
          </p>
        </div>

        {status === "success" ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
            <h2
              style={headlineFont}
              className="text-2xl font-semibold text-neutral-900"
            >
              Got it. I'll be in touch soon.
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-neutral-600">
              Thanks {form.name.split(" ")[0] || "there"}. I'll review what you're
              looking for and reach out with homes worth your time. Usually same
              day.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8"
          >
            {/* Honeypot: hidden from people, tempting to bots */}
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={update}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  style={labelFont}
                  className="mb-1.5 block text-xs uppercase tracking-wider text-neutral-500"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={update}
                  className={inputClass}
                  placeholder="Jane Smith"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    style={labelFont}
                    className="mb-1.5 block text-xs uppercase tracking-wider text-neutral-500"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update}
                    className={inputClass}
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    style={labelFont}
                    className="mb-1.5 block text-xs uppercase tracking-wider text-neutral-500"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={update}
                    className={inputClass}
                    placeholder="(256) 555-0123"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="priceRange"
                    style={labelFont}
                    className="mb-1.5 block text-xs uppercase tracking-wider text-neutral-500"
                  >
                    Price range
                  </label>
                  <select
                    id="priceRange"
                    name="priceRange"
                    value={form.priceRange}
                    onChange={update}
                    className={inputClass}
                  >
                    <option value="">Select one</option>
                    {priceOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="area"
                    style={labelFont}
                    className="mb-1.5 block text-xs uppercase tracking-wider text-neutral-500"
                  >
                    Area
                  </label>
                  <select
                    id="area"
                    name="area"
                    value={form.area}
                    onChange={update}
                    className={inputClass}
                  >
                    <option value="">Select one</option>
                    {areaOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="timeline"
                    style={labelFont}
                    className="mb-1.5 block text-xs uppercase tracking-wider text-neutral-500"
                  >
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={form.timeline}
                    onChange={update}
                    className={inputClass}
                  >
                    <option value="">Select one</option>
                    {timelineOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="financing"
                    style={labelFont}
                    className="mb-1.5 block text-xs uppercase tracking-wider text-neutral-500"
                  >
                    Financing
                  </label>
                  <select
                    id="financing"
                    name="financing"
                    value={form.financing}
                    onChange={update}
                    className={inputClass}
                  >
                    <option value="">Select one</option>
                    {financingOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="notes"
                  style={labelFont}
                  className="mb-1.5 block text-xs uppercase tracking-wider text-neutral-500"
                >
                  Anything specific you want? (optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={update}
                  className={inputClass}
                  placeholder="Big yard, good schools, shop in back, etc."
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-[#A52831]">
                  Something went wrong sending that. Try again, or text me
                  directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-xl bg-[#A52831] px-6 py-3.5 text-[15px] font-medium text-white transition hover:bg-[#8f222b] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? "Sending..." : "Start My Search"}
              </button>

              <p className="text-center text-xs text-neutral-400">
                Your info stays private. I'll only use it to help with your home
                search.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
