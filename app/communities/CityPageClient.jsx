"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Menu, X, Phone, MapPin, ArrowRight, ArrowUpRight, Home, Key,
  GraduationCap, UtensilsCrossed, Trees, TrendingUp, Check, MessageSquare,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Shared template for every North Alabama city page.
// Styling is cloned from the homepage so the pages feel like one site.
// All wording/data comes from ../cityData.js — don't edit copy here.
// ─────────────────────────────────────────────────────────────

const WORDMARK = "/images/wordmark.png";
const LOGO_WHITE = "/images/logo-white.png";
const COMPLIANCE_LOGOS = "/images/compliance.png";

const OTHER_CITIES = [
  { slug: "athens", name: "Athens" },
  { slug: "madison", name: "Madison" },
  { slug: "huntsville", name: "Huntsville" },
  { slug: "decatur", name: "Decatur" },
];

const GRAIN =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>`.replace(/%23/g, "#")
  );

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap');

.mx-auto{margin-left:auto;margin-right:auto;}
.flex{display:flex;}
.grid{display:grid;}
.flex-col{flex-direction:column;}
.flex-wrap{flex-wrap:wrap;}
.items-center{align-items:center;}
.items-start{align-items:flex-start;}
.items-end{align-items:flex-end;}
.justify-center{justify-content:center;}
.justify-between{justify-content:space-between;}
.w-full{width:100%;}
.hidden{display:none;}
.px-6{padding-left:1.5rem;padding-right:1.5rem;}
.pb-4{padding-bottom:1rem;}
.mt-2{margin-top:0.5rem;}
.gap-1{gap:.25rem;}.gap-2{gap:.5rem;}.gap-3{gap:.75rem;}.gap-4{gap:1rem;}
.gap-5{gap:1.25rem;}.gap-6{gap:1.5rem;}.gap-8{gap:2rem;}.gap-10{gap:2.5rem;}
.gap-11{gap:2.75rem;}.gap-14{gap:3.5rem;}.gap-16{gap:4rem;}
@media (min-width:768px){[class~="md:flex"]{display:flex;}[class~="md:hidden"]{display:none;}}

:root{
  --paper:#FCFBF9; --stone:#F4F1EB; --stone-2:#EBE6DD; --mist:#EFE9E2;
  --ink:#16130F; --ink-soft:#57534C;
  --brand:#A52831; --brand-deep:#7E1B23;
  --black:#121010; --line:rgba(22,19,15,0.10);
}
.cw *{box-sizing:border-box;}
.cw{background:var(--stone);color:var(--ink);font-family:'Inter',system-ui,sans-serif;line-height:1.55;-webkit-font-smoothing:antialiased;position:relative;overflow-x:hidden;}
.cw h1,.cw h2,.cw h3,.cw .display{font-family:'Bricolage Grotesque','Inter',sans-serif;letter-spacing:-0.03em;line-height:1.02;font-weight:700;}
.cw .mono{font-family:'Times New Roman',Times,serif;}
.cw .eyebrow{font-family:'Times New Roman',Times,serif;font-size:11.5px;letter-spacing:0.22em;text-transform:uppercase;font-weight:500;color:var(--brand);}
.cw a{color:inherit;text-decoration:none;}

.cw .grain{position:fixed;inset:0;z-index:60;pointer-events:none;background-image:url("${GRAIN}");opacity:0.05;mix-blend-mode:multiply;}

.cw .btn{position:relative;display:inline-flex;align-items:center;gap:9px;font-family:'Times New Roman',Times,serif;font-weight:500;font-size:13.5px;letter-spacing:0.02em;text-transform:uppercase;padding:15px 24px;border-radius:2px;cursor:pointer;border:1px solid transparent;transition:transform .18s ease,box-shadow .22s ease,background .2s ease;}
.cw .btn svg{transition:transform .2s ease;}
.cw .btn:hover svg{transform:translate(3px,-3px);}
.cw .btn-primary{background:var(--brand);color:#fff;}
.cw .btn-primary:hover{background:var(--brand-deep);transform:translateY(-2px);box-shadow:0 12px 30px rgba(165,40,49,0.30);}
.cw .btn-ghost{background:transparent;color:var(--ink);border-color:var(--ink);}
.cw .btn-ghost:hover{background:var(--ink);color:#fff;transform:translateY(-2px);}
.cw .btn-light{background:#fff;color:var(--brand);}
.cw .btn-light:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(0,0,0,0.22);}

.cw .reveal{opacity:0;transform:translateY(22px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1);}
.cw .reveal.in{opacity:1;transform:none;}
.cw :focus-visible{outline:2px solid var(--brand);outline-offset:3px;}
@media (prefers-reduced-motion:reduce){.cw *{animation:none!important;transition:none!important;}.cw .reveal{opacity:1;transform:none;}}

.cw .link-u{position:relative;}
.cw .link-u::after{content:"";position:absolute;left:0;bottom:-3px;width:0;height:1.5px;background:var(--brand);transition:width .25s ease;}
.cw .link-u:hover::after{width:100%;}

.cw .info-card{background:var(--paper);border:1px solid var(--line);border-radius:2px;padding:34px;}
.cw .info-list{margin-top:16px;display:flex;flex-direction:column;gap:12px;}
.cw .info-list li{display:flex;align-items:flex-start;gap:11px;font-size:15.5px;color:var(--ink);}
.cw .info-list svg{color:var(--brand);flex-shrink:0;margin-top:3px;}

@media (max-width:900px){
  .cw .grid-2,.cw .grid-3,.cw .split,.cw .hero-grid{grid-template-columns:1fr !important;}
  .cw .hero-photo{order:-1;}
}
`;

function InfoSection({ icon, eyebrow, title, note, list }) {
  return (
    <div className="info-card reveal">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center" style={{ width: 46, height: 46, borderRadius: 2, background: "var(--mist)", color: "var(--brand)" }}>{icon}</div>
        <div className="eyebrow">{eyebrow}</div>
      </div>
      <h3 style={{ fontSize: 25, marginTop: 18 }}>{title}</h3>
      {note ? <p style={{ color: "var(--ink-soft)", marginTop: 12, fontSize: 15.5, lineHeight: 1.6 }}>{note}</p> : null}
      <ul className="info-list">
        {list.map((item, i) => (
          <li key={i}><Check size={17} /><span>{item}</span></li>
        ))}
      </ul>
    </div>
  );
}

export default function CityPageClient({ city }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const rootRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll(".reveal") || [];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [city]);

  const others = OTHER_CITIES.filter((c) => c.slug !== city.slug);

  return (
    <div className="cw" ref={rootRef}>
      <style>{STYLES}</style>
      <div className="grain" />

      {/* NAV */}
      <header className="px-6" style={{ position: "sticky", top: 0, zIndex: 50, transition: "background .3s, box-shadow .3s, border-color .3s", background: scrolled ? "rgba(252,251,249,0.88)" : "rgba(252,251,249,0.6)", backdropFilter: "blur(12px)", borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent" }}>
        <div className="mx-auto flex items-center justify-between" style={{ maxWidth: 1240, height: 92 }}>
          <a href="/" className="flex items-center" aria-label="Back to home"><img src={WORDMARK} alt="Innovative Realty Solutions" style={{ height: 64, width: "auto", maxWidth: "64vw", display: "block", marginLeft: -3 }} /></a>
          <nav className="hidden md:flex items-center gap-11">
            <a href="/" className="mono link-u" style={{ fontSize: 13.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-soft)" }}>Home</a>
            <a href="/#listings" className="mono link-u" style={{ fontSize: 13.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-soft)" }}>Listings</a>
            <a href="/#valuation" className="mono link-u" style={{ fontSize: 13.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-soft)" }}>Home Value</a>
            <a href="/#contact" className="btn btn-primary" style={{ padding: "12px 22px", fontSize: 13.5 }}>Let's talk <ArrowUpRight size={16} /></a>
          </nav>
          <button className="md:hidden btn btn-ghost" style={{ padding: 11 }} onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1" style={{ background: "var(--paper)", borderTop: "1px solid var(--line)" }}>
            <a href="/" className="mono" style={{ padding: "13px 4px", fontSize: 14, textTransform: "uppercase", letterSpacing: "0.08em" }}>Home</a>
            <a href="/#listings" className="mono" style={{ padding: "13px 4px", fontSize: 14, textTransform: "uppercase", letterSpacing: "0.08em" }}>Listings</a>
            <a href="/#valuation" className="mono" style={{ padding: "13px 4px", fontSize: 14, textTransform: "uppercase", letterSpacing: "0.08em" }}>Home Value</a>
            <a href="/#contact" className="btn btn-primary mt-2" style={{ justifyContent: "center" }}>Let's talk</a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="px-6" style={{ paddingTop: 48, paddingBottom: 20 }}>
        <div className="mx-auto grid items-center gap-14 hero-grid" style={{ maxWidth: 1240, gridTemplateColumns: "1.15fr 0.85fr" }}>
          <div>
            <div className="eyebrow reveal" style={{ marginBottom: 20 }}>{city.county} · North Alabama</div>
            <h1 className="reveal" style={{ fontSize: "clamp(44px, 7vw, 82px)", transitionDelay: ".05s" }}>
              {city.name},<br /><span style={{ color: "var(--brand)" }}>up close.</span>
            </h1>
            <p className="reveal" style={{ fontSize: 18.5, color: "var(--ink-soft)", marginTop: 22, maxWidth: 520, transitionDelay: ".1s" }}>{city.tagline}. Here's the honest local rundown — prices, schools, food, and parks — from someone who actually works this market.</p>
            <div className="flex flex-wrap gap-3 reveal" style={{ marginTop: 30, transitionDelay: ".15s" }}>
              <a href="/#valuation" className="btn btn-primary">Get my home value <ArrowUpRight size={16} /></a>
              <a href="https://colbywilliams.valleymls.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Search {city.name} homes <ArrowRight size={16} /></a>
            </div>
          </div>
          <div className="hero-photo reveal" style={{ transitionDelay: ".1s" }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: "auto -18px -18px auto", width: "62%", height: "62%", background: "var(--brand)", borderRadius: 2, zIndex: 0 }} />
              <div style={{ position: "absolute", inset: "-16px auto auto -16px", width: 74, height: 74, border: "1.5px solid var(--ink)", borderRadius: 2, zIndex: 0 }} />
              <div style={{ position: "relative", zIndex: 1, width: "100%", borderRadius: 2, aspectRatio: "4/5", overflow: "hidden", background: "linear-gradient(135deg,#221d1b,var(--brand-deep))" }}>
                {imgOk ? <img src={city.image} alt={`${city.name}, Alabama`} onError={() => setImgOk(false)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : (
                  <div className="flex items-center justify-center" style={{ width: "100%", height: "100%", color: "#fff" }}>
                    <span className="display" style={{ fontSize: 40 }}>{city.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="mx-auto reveal" style={{ maxWidth: 820 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Living in {city.name}</div>
          {city.intro.map((p, i) => (
            <p key={i} style={{ fontSize: 18, color: "var(--ink-soft)", marginTop: i === 0 ? 0 : 18, lineHeight: 1.65 }}>{p}</p>
          ))}
        </div>
      </section>

      {/* MARKET SNAPSHOT */}
      <section style={{ background: "var(--black)", color: "#fff" }} className="px-6">
        <div className="mx-auto" style={{ maxWidth: 1240, paddingTop: 64, paddingBottom: 64 }}>
          <div className="grid gap-14 split reveal" style={{ gridTemplateColumns: "0.85fr 1.15fr", alignItems: "center" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 16, filter: "brightness(1.6)" }}>The market</div>
              <div className="flex items-center gap-3" style={{ color: "var(--brand)", filter: "brightness(1.5)" }}>
                <TrendingUp size={22} />
                <span className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Median price · {city.market.asOf}</span>
              </div>
              <div className="display" style={{ fontSize: "clamp(38px,5vw,58px)", color: "#fff", marginTop: 10 }}>{city.market.median}</div>
              <div className="mono" style={{ fontSize: 14, opacity: 0.7, marginTop: 12, lineHeight: 1.9 }}>
                <div>Trend — {city.market.trend}</div>
                <div>Pace — {city.market.dom}</div>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 17.5, opacity: 0.9, lineHeight: 1.7 }}>{city.market.summary}</p>
              <p style={{ fontSize: 14, opacity: 0.6, marginTop: 20, lineHeight: 1.6 }}>These figures are a snapshot from {city.market.asOf} and shift month to month. For what's happening on your exact street this week — or what your specific home would bring — just ask.</p>
              <div className="flex flex-wrap gap-3" style={{ marginTop: 26 }}>
                <a href="/#valuation" className="btn btn-light">Get my home value <ArrowUpRight size={16} /></a>
                <a href="/#contact" className="btn btn-ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.35)" }}>Ask about {city.name}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCHOOLS / DINING / PARKS */}
      <section className="px-6" style={{ paddingTop: 72, paddingBottom: 40 }}>
        <div className="mx-auto" style={{ maxWidth: 1240 }}>
          <div className="reveal" style={{ maxWidth: 720, marginBottom: 40 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>The neighborhood</div>
            <h2 style={{ fontSize: "clamp(30px,4vw,46px)" }}>What it's actually like</h2>
          </div>
          <div className="grid gap-6 grid-3" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
            <InfoSection icon={<GraduationCap size={22} />} eyebrow="Schools" title="Where kids go" note={city.schools.note} list={city.schools.list} />
            <InfoSection icon={<UtensilsCrossed size={22} />} eyebrow="Food & shops" title="Where to eat & browse" note={city.dining.note} list={city.dining.list} />
            <InfoSection icon={<Trees size={22} />} eyebrow="Outdoors" title="Parks & recreation" note={city.parks.note} list={city.parks.list} />
          </div>
          <p className="mono reveal" style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 22, letterSpacing: "0.03em" }}>Local details change — new spots open, school zones shift. Confirm specifics with me for any address you're considering.</p>
        </div>
      </section>

      {/* TWO PATHS */}
      <section className="px-6" style={{ paddingTop: 40, paddingBottom: 56 }}>
        <div className="mx-auto grid gap-6 grid-2 reveal" style={{ maxWidth: 1240, gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ padding: 38, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 2 }}>
            <div className="flex items-center justify-center" style={{ width: 50, height: 50, borderRadius: 2, background: "var(--mist)", color: "var(--brand)" }}><Home size={22} /></div>
            <h3 style={{ fontSize: 26, marginTop: 20 }}>Thinking about selling in {city.name}?</h3>
            <p style={{ color: "var(--ink-soft)", marginTop: 12, fontSize: 15.5 }}>I'll pull real, recent {city.name} sales — not a national estimate — so you know what your home would actually bring today, with zero obligation to list.</p>
            <a href="/#valuation" className="btn btn-primary" style={{ marginTop: 24 }}>Get my home value <ArrowUpRight size={16} /></a>
          </div>
          <div style={{ padding: 38, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 2 }}>
            <div className="flex items-center justify-center" style={{ width: 50, height: 50, borderRadius: 2, background: "var(--mist)", color: "var(--brand)" }}><Key size={22} /></div>
            <h3 style={{ fontSize: 26, marginTop: 20 }}>Looking to buy in {city.name}?</h3>
            <p style={{ color: "var(--ink-soft)", marginTop: 12, fontSize: 15.5 }}>First home, move-up, or relocating for work — I'll help you figure out what you can afford, where to look, and how to win without overpaying.</p>
            <a href="https://colbywilliams.valleymls.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ marginTop: 24 }}>Start your search <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </section>

      {/* OTHER CITIES */}
      <section className="px-6" style={{ paddingTop: 24, paddingBottom: 56 }}>
        <div className="mx-auto reveal" style={{ maxWidth: 1240 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Nearby towns</div>
          <div className="grid gap-5 grid-3" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
            {others.map((c) => (
              <a key={c.slug} href={`/communities/${c.slug}`} className="info-card link-u flex items-center justify-between" style={{ padding: "26px 30px" }}>
                <span className="display" style={{ fontSize: 24 }}>{c.name}</span>
                <ArrowUpRight size={20} style={{ color: "var(--brand)" }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6" style={{ paddingTop: 24, paddingBottom: 72 }}>
        <div className="mx-auto reveal" style={{ maxWidth: 1240, background: "var(--black)", borderRadius: 2, padding: "clamp(44px, 6vw, 80px)", color: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: "auto -60px -60px auto", width: 260, height: 260, background: "var(--brand)", opacity: 0.16, borderRadius: "50%", filter: "blur(20px)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 720 }}>
            <div className="eyebrow" style={{ marginBottom: 18, filter: "brightness(1.6)" }}>Let's talk</div>
            <h2 style={{ fontSize: "clamp(32px,5vw,56px)", color: "#fff" }}>Know {city.name} before you buy or sell.</h2>
            <p style={{ opacity: 0.8, marginTop: 18, fontSize: 17.5, maxWidth: 560 }}>Whether you're six months out or ready this week, I'll give you an honest read on {city.name} and the smart next step. No pressure, ever.</p>
            <div className="flex flex-wrap gap-3" style={{ marginTop: 30 }}>
              <a href="tel:+12567102384" className="btn btn-light"><Phone size={16} /> Call Colby</a>
              <a href="sms:+12567102384" className="btn btn-ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.35)" }}><MessageSquare size={16} /> Text Colby</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "var(--black)", color: "#fff" }} className="px-6">
        <div className="mx-auto" style={{ maxWidth: 1240, paddingTop: 56, paddingBottom: 30 }}>
          <div className="grid gap-10 grid-3" style={{ gridTemplateColumns: "1.5fr 1fr 1fr" }}>
            <div>
              <img src={LOGO_WHITE} alt="Innovative Realty Solutions" style={{ height: 66, width: "auto", opacity: 0.95 }} />
              <p style={{ opacity: 0.62, marginTop: 16, fontSize: 14, maxWidth: 320 }}>Helping people buy and sell homes in Athens, Madison, Huntsville, Decatur, and across North Alabama.</p>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 16, filter: "brightness(1.6)" }}>Communities</div>
              {OTHER_CITIES.map((c) => <a key={c.slug} href={`/communities/${c.slug}`} className="link-u" style={{ display: "block", padding: "8px 0", opacity: 0.8, fontSize: 14 }}>{c.name}</a>)}
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 16, filter: "brightness(1.6)" }}>Get in touch</div>
              <div className="mono" style={{ opacity: 0.82, fontSize: 13, lineHeight: 2.1, letterSpacing: "0.02em" }}>
                <div className="flex items-center gap-2"><MapPin size={13} /> Athens, Alabama</div>
                <div className="flex items-center gap-2"><Phone size={13} /> (256) 710-2384</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4 mono" style={{ marginTop: 44, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.14)", fontSize: 11.5, opacity: 0.6, letterSpacing: "0.03em" }}>
            <div>© {new Date().getFullYear()} COLBY WILLIAMS · INNOVATIVE REALTY SOLUTIONS</div>
            <img src={COMPLIANCE_LOGOS} alt="Equal Housing Opportunity and Realtor logos" style={{ height: 40, width: "auto", opacity: 0.85 }} />
          </div>
        </div>
      </footer>
    </div>
  );
}
