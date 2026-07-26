"use client";

import { useState } from "react";

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

// All styling lives here, scoped by the "sys-" prefix so it can't collide
// with the rest of the site and doesn't depend on Tailwind or global CSS.
const css = `
  .sys-page {
    min-height: 100vh;
    background: #F4F1EB;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    color: #1a1a1a;
  }
  .sys-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1120px;
    margin: 0 auto;
    padding: 20px 24px;
  }
  .sys-bar img { height: 34px; width: auto; display: block; }
  .sys-bar a.sys-phone {
    font-size: 14px;
    color: #1a1a1a;
    text-decoration: none;
    font-weight: 500;
    white-space: nowrap;
  }
  .sys-bar a.sys-phone:hover { color: #A52831; }

  .sys-wrap {
    max-width: 620px;
    margin: 0 auto;
    padding: 16px 24px 96px;
  }
  .sys-head { text-align: center; margin-bottom: 32px; }
  .sys-eyebrow {
    font-family: 'Times New Roman', Times, serif;
    font-size: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #A52831;
    margin: 0 0 14px;
  }
  .sys-title {
    font-family: 'Bricolage Grotesque', 'Inter', system-ui, sans-serif;
    font-size: 40px;
    line-height: 1.08;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #1a1a1a;
    margin: 0;
  }
  .sys-sub {
    max-width: 440px;
    margin: 16px auto 0;
    font-size: 16px;
    line-height: 1.6;
    color: #5f5b54;
  }

  .sys-card {
    background: #ffffff;
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 12px 32px rgba(40,30,20,0.06);
  }
  .sys-field { margin-bottom: 20px; }
  .sys-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }
  .sys-row .sys-field { margin-bottom: 0; }
  .sys-label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: #6b6b6b;
    margin-bottom: 7px;
  }
  .sys-input, .sys-select, .sys-textarea {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #E4DFD5;
    background: #ffffff;
    border-radius: 12px;
    padding: 13px 15px;
    font-size: 15px;
    font-family: inherit;
    color: #1a1a1a;
    outline: none;
    transition: border-color .15s ease, box-shadow .15s ease;
    -webkit-appearance: none;
    appearance: none;
  }
  .sys-textarea { resize: vertical; min-height: 92px; }
  .sys-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b6b6b' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 15px center;
    padding-right: 40px;
    cursor: pointer;
  }
  .sys-input::placeholder, .sys-textarea::placeholder { color: #b3ada2; }
  .sys-input:focus, .sys-select:focus, .sys-textarea:focus {
    border-color: #A52831;
    box-shadow: 0 0 0 3px rgba(165,40,49,0.12);
  }

  .sys-btn {
    width: 100%;
    border: none;
    background: #A52831;
    color: #ffffff;
    border-radius: 12px;
    padding: 15px;
    font-size: 16px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: background .15s ease, transform .05s ease;
    margin-top: 4px;
  }
  .sys-btn:hover { background: #8a1f27; }
  .sys-btn:active { transform: translateY(1px); }
  .sys-btn:disabled { opacity: .65; cursor: not-allowed; }

  .sys-fine {
    text-align: center;
    font-size: 13px;
    color: #a09a8f;
    margin: 16px 0 0;
  }
  .sys-error {
    font-size: 14px;
    color: #A52831;
    margin: 0 0 16px;
  }

  .sys-success { text-align: center; padding: 24px 8px; }
  .sys-success h2 {
    font-family: 'Bricolage Grotesque', 'Inter', system-ui, sans-serif;
    font-size: 28px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 12px;
  }
  .sys-success p {
    max-width: 380px;
    margin: 0 auto;
    font-size: 16px;
    line-height: 1.6;
    color: #5f5b54;
  }

  @media (max-width: 560px) {
    .sys-title { font-size: 32px; }
    .sys-card { padding: 24px 20px; }
    .sys-row { grid-template-columns: 1fr; gap: 20px; margin-bottom: 20px; }
    .sys-row .sys-field { margin-bottom: 0; }
  }
`;

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
    <div className="sys-page">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="sys-bar">
        <a href="/" aria-label="Colby Williams, Innovative Realty Solutions home">
          <img
            src="/images/wordmark.png"
            alt="Innovative Realty Solutions"
          />
        </a>
        <a className="sys-phone" href="tel:+12567102384">
          Call or text: (256) 710-2384
        </a>
      </div>

      <div className="sys-wrap">
        <div className="sys-head">
          <p className="sys-eyebrow">Start Your Search</p>
          <h1 className="sys-title">Let&apos;s find the right home for you</h1>
          <p className="sys-sub">
            Tell me a little about what you&apos;re after and I&apos;ll pull homes
            that actually fit. No spam, no pressure. Just real help from someone
            who knows North Alabama.
          </p>
        </div>

        {status === "success" ? (
          <div className="sys-card">
            <div className="sys-success">
              <h2>Got it. I&apos;ll be in touch soon.</h2>
              <p>
                Thanks {form.name.split(" ")[0] || "there"}. I&apos;ll review what
                you&apos;re looking for and reach out with homes worth your time.
                Usually same day.
              </p>
            </div>
          </div>
        ) : (
          <form className="sys-card" onSubmit={handleSubmit}>
            {/* Honeypot: hidden inline so it stays hidden no matter what */}
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={update}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: 1,
                height: 1,
                opacity: 0,
              }}
            />

            <div className="sys-field">
              <label className="sys-label" htmlFor="name">
                Full name
              </label>
              <input
                className="sys-input"
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={update}
                placeholder="Jane Smith"
              />
            </div>

            <div className="sys-row">
              <div className="sys-field">
                <label className="sys-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="sys-input"
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update}
                  placeholder="you@email.com"
                />
              </div>
              <div className="sys-field">
                <label className="sys-label" htmlFor="phone">
                  Phone
                </label>
                <input
                  className="sys-input"
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={update}
                  placeholder="(256) 555-0123"
                />
              </div>
            </div>

            <div className="sys-row">
              <div className="sys-field">
                <label className="sys-label" htmlFor="priceRange">
                  Price range
                </label>
                <select
                  className="sys-select"
                  id="priceRange"
                  name="priceRange"
                  value={form.priceRange}
                  onChange={update}
                >
                  <option value="">Select one</option>
                  {priceOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sys-field">
                <label className="sys-label" htmlFor="area">
                  Area
                </label>
                <select
                  className="sys-select"
                  id="area"
                  name="area"
                  value={form.area}
                  onChange={update}
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

            <div className="sys-row">
              <div className="sys-field">
                <label className="sys-label" htmlFor="timeline">
                  Timeline
                </label>
                <select
                  className="sys-select"
                  id="timeline"
                  name="timeline"
                  value={form.timeline}
                  onChange={update}
                >
                  <option value="">Select one</option>
                  {timelineOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sys-field">
                <label className="sys-label" htmlFor="financing">
                  Financing
                </label>
                <select
                  className="sys-select"
                  id="financing"
                  name="financing"
                  value={form.financing}
                  onChange={update}
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

            <div className="sys-field">
              <label className="sys-label" htmlFor="notes">
                Anything specific you want? (optional)
              </label>
              <textarea
                className="sys-textarea"
                id="notes"
                name="notes"
                rows={3}
                value={form.notes}
                onChange={update}
                placeholder="Big yard, good schools, shop in back, etc."
              />
            </div>

            {status === "error" && (
              <p className="sys-error">
                Something went wrong sending that. Try again, or text me directly
                at (256) 710-2384.
              </p>
            )}

            <button
              className="sys-btn"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Start My Search"}
            </button>

            <p className="sys-fine">
              Goes straight to Colby, never sold or shared.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
