"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Menu, X, Phone, MapPin, ArrowRight, ArrowUpRight, Home, Key,
  Check, Star, ChevronDown, Mail, Quote,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Colby Williams · Innovative Realty Solutions
// Home page — v3 "editorial" redesign · colbywilliamsrealtor.com
// ─────────────────────────────────────────────────────────────

const HERO_IMG = "/images/hero.jpg";
const HEADSHOT = "/images/headshot.jpg";
const LOGO = "/images/logo-house.png";

const WORDMARK = "/images/wordmark.png";

const CITY_ATHENS = "/images/city-athens.jpg";
const CITY_MADISON = "/images/city-madison.jpg";
const CITY_HUNTSVILLE = "/images/city-huntsville.jpg";
const CITY_DECATUR = "/images/city-decatur.jpg";
const CITY = { athens: CITY_ATHENS, madison: CITY_MADISON, huntsville: CITY_HUNTSVILLE, decatur: CITY_DECATUR };

const COMPLIANCE_LOGOS = "/images/compliance.png";
const LOGO_WHITE = "/images/logo-white.png";
const LISTING1 = "/images/listing-rosecliff.jpg";

const PHOTOS = {
  athens: "https://commons.wikimedia.org/wiki/Special:FilePath/Limestone%20County%20Courthouse%2C%20Athens%2C%20Alabama%2001.jpg?width=1000",
  madison: "https://commons.wikimedia.org/wiki/Special:FilePath/Main%20Street%20Cafe%20(Old%20City%20Hall)%2C%20Madison%2C%20Alabama.jpg?width=1000",
  huntsville: "https://commons.wikimedia.org/wiki/Special:FilePath/Scenic%20downtown%20Huntsville%2C%20Alabama%20LCCN2010639657.tif?width=1000",
  decatur: "https://commons.wikimedia.org/wiki/Special:FilePath/Bank%20Street%20Decatur%20July%202010%2001.jpg?width=1000",
  list1: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
  list2: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80",
  list3: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80",
};

const GRAIN =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>`.replace(/%23/g, "#")
  );

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

/* ---- Layout utilities (baked in so they can never go missing) ---- */
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
.gap-0{gap:0;}.gap-1{gap:.25rem;}.gap-2{gap:.5rem;}.gap-3{gap:.75rem;}.gap-4{gap:1rem;}
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
.cw .mono{font-family:'JetBrains Mono',monospace;}
.cw .eyebrow{font-family:'JetBrains Mono',monospace;font-size:11.5px;letter-spacing:0.22em;text-transform:uppercase;font-weight:500;color:var(--brand);}
.cw a{color:inherit;text-decoration:none;}

.cw .grain{position:fixed;inset:0;z-index:60;pointer-events:none;background-image:url("${GRAIN}");opacity:0.05;mix-blend-mode:multiply;}

.cw .btn{position:relative;display:inline-flex;align-items:center;gap:9px;font-family:'JetBrains Mono',monospace;font-weight:500;font-size:13.5px;letter-spacing:0.02em;text-transform:uppercase;padding:15px 24px;border-radius:2px;cursor:pointer;border:1px solid transparent;transition:transform .18s ease,box-shadow .22s ease,background .2s ease;}
.cw .btn svg{transition:transform .2s ease;}
.cw .btn:hover svg{transform:translate(3px,-3px);}
.cw .btn-primary{background:var(--brand);color:#fff;}
.cw .btn-primary:hover{background:var(--brand-deep);transform:translateY(-2px);box-shadow:0 12px 30px rgba(165,40,49,0.30);}
.cw .btn-dark{background:var(--ink);color:#fff;}
.cw .btn-dark:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(22,19,15,0.28);}
.cw .btn-ghost{background:transparent;color:var(--ink);border-color:var(--ink);}
.cw .btn-ghost:hover{background:var(--ink);color:#fff;transform:translateY(-2px);}
.cw .btn-light{background:#fff;color:var(--brand);}
.cw .btn-light:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(0,0,0,0.22);}

.cw .field{width:100%;padding:14px 16px;border-radius:2px;border:1px solid var(--line);background:#fff;font-family:'Inter',sans-serif;font-size:15px;color:var(--ink);outline:none;transition:border .15s,box-shadow .15s;}
.cw .field:focus{border-color:var(--brand);box-shadow:0 0 0 3px rgba(165,40,49,0.14);}
.cw .lbl{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:var(--ink-soft);}

.cw .reveal{opacity:0;transform:translateY(22px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1);}
.cw .reveal.in{opacity:1;transform:none;}
.cw :focus-visible{outline:2px solid var(--brand);outline-offset:3px;}
@media (prefers-reduced-motion:reduce){.cw *{animation:none!important;transition:none!important;}.cw .reveal{opacity:1;transform:none;}}

.cw .photo{position:relative;overflow:hidden;background:linear-gradient(135deg,#221d1b,var(--brand-deep));}
.cw .photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;transition:transform .7s cubic-bezier(.2,.7,.2,1);}
.cw .tile:hover .photo img{transform:scale(1.06);}
.cw .photo::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 35%,rgba(0,0,0,0.55));z-index:1;}
.cw .cap{position:absolute;left:18px;right:18px;bottom:16px;z-index:2;color:#fff;}

.cw .marquee{display:flex;overflow:hidden;white-space:nowrap;user-select:none;}
.cw .mtrack{display:flex;gap:0;animation:scrollx 38s linear infinite;}
@keyframes scrollx{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.cw .mitem{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:clamp(30px,5vw,64px);letter-spacing:-0.02em;padding:0 26px;display:inline-flex;align-items:center;gap:26px;}
.cw .mstar{color:var(--brand);font-size:0.5em;}
.cw .outline{color:transparent;-webkit-text-stroke:1.4px var(--ink);}

.cw .link-u{position:relative;}
.cw .link-u::after{content:"";position:absolute;left:0;bottom:-3px;width:0;height:1.5px;background:var(--brand);transition:width .25s ease;}
.cw .link-u:hover::after{width:100%;}

@media (max-width:900px){
  .cw .grid-2,.cw .grid-3,.cw .grid-4,.cw .split,.cw .hero-grid{grid-template-columns:1fr !important;}
  .cw .hero-photo{order:-1;}
}
`;

function CityArt({ city, caption, sub }) {
  const ink = "#26211C", red = "#A52831", cream = "#EAE1D1";
  const scenes = {
    athens: (
      <g>
        <polygon points="88,252 150,212 212,252" fill={ink} />
        <rect x="98" y="252" width="104" height="64" fill={ink} />
        {[110, 128, 146, 164, 182].map((x) => (<rect key={x} x={x} y="258" width="7" height="52" fill={cream} />))}
        <rect x="138" y="196" width="24" height="20" fill={ink} />
        <path d="M138 196 a12 12 0 0 1 24 0 Z" fill={red} />
        <rect x="148" y="172" width="4" height="24" fill={ink} />
        <circle cx="150" cy="170" r="4" fill={red} />
        <rect x="90" y="312" width="120" height="5" fill={cream} opacity="0.85" />
      </g>
    ),
    huntsville: (
      <g>
        <rect x="106" y="150" width="5" height="166" fill={ink} opacity="0.8" />
        {[172, 208, 244, 280].map((y) => (<rect key={y} x="106" y={y} width="30" height="4" fill={ink} opacity="0.65" />))}
        <rect x="136" y="150" width="30" height="166" fill="#F3EEE4" stroke={ink} strokeWidth="2" />
        {[186, 224, 262].map((y) => (<rect key={y} x="136" y={y} width="30" height="9" fill={ink} />))}
        <polygon points="136,150 151,108 166,150" fill={red} />
        <polygon points="136,300 120,318 136,318" fill={ink} />
        <polygon points="166,300 182,318 166,318" fill={ink} />
        <ellipse cx="151" cy="322" rx="26" ry="9" fill={cream} opacity="0.8" />
      </g>
    ),
    madison: (
      <g>
        <g stroke={ink} strokeWidth="3">
          <line x1="206" y1="240" x2="200" y2="300" />
          <line x1="236" y1="240" x2="242" y2="300" />
          <line x1="206" y1="264" x2="236" y2="280" />
          <line x1="236" y1="264" x2="206" y2="280" />
        </g>
        <rect x="200" y="216" width="42" height="26" rx="4" fill={ink} />
        <polygon points="200,216 221,200 242,216" fill={red} />
        <polygon points="58,262 242,262 224,236 76,236" fill={red} />
        <rect x="72" y="262" width="150" height="54" fill={ink} />
        {[92, 132, 172].map((x) => (<rect key={x} x={x} y="276" width="18" height="26" rx="9" fill={cream} />))}
        <rect x="140" y="224" width="16" height="14" fill={ink} />
        <polygon points="138,224 148,214 158,224" fill={red} />
        <rect x="20" y="330" width="260" height="3" fill={ink} opacity="0.8" />
        <rect x="20" y="340" width="260" height="3" fill={ink} opacity="0.8" />
        {[40, 80, 120, 160, 200, 240].map((x) => (<rect key={x} x={x} y="330" width="4" height="13" fill={ink} opacity="0.45" />))}
      </g>
    ),
    decatur: (
      <g>
        <rect x="0" y="298" width="300" height="102" fill="#AEB7AD" />
        {[312, 326, 340].map((y, i) => (<rect key={y} x={20 + i * 10} y={y} width={i % 2 ? 120 : 180} height="2" fill="#C6CDC2" />))}
        <rect x="16" y="292" width="268" height="7" fill={ink} />
        {[40, 150, 260].map((x) => (<rect key={x} x={x - 5} y="298" width="10" height="40" fill={ink} />))}
        <path d="M50 299 Q95 348 140 299" fill="none" stroke={red} strokeWidth="6" />
        <path d="M160 299 Q205 348 250 299" fill="none" stroke={red} strokeWidth="6" />
        <g stroke={ink} strokeWidth="3" fill="none">
          <path d="M40 292 L70 250 L100 292 L130 250 L160 292 L190 250 L220 292 L250 250 L280 292" />
          <line x1="40" y1="250" x2="280" y2="250" />
          <line x1="40" y1="250" x2="40" y2="292" />
          <line x1="280" y1="250" x2="280" y2="292" />
        </g>
      </g>
    ),
  };
  return (
    <div className="photo" style={{ aspectRatio: "3/4" }}>
      <svg viewBox="0 0 300 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }} aria-hidden="true">
        <defs>
          <linearGradient id={`sky-${city}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E9E0D0" />
            <stop offset="1" stopColor="#F5F1EA" />
          </linearGradient>
        </defs>
        <rect width="300" height="400" fill={`url(#sky-${city})`} />
        <circle cx="226" cy="76" r="46" fill="#E6DBC7" opacity="0.5" />
        <path d="M0 300 Q80 272 150 290 T300 286 V400 H0Z" fill="#D6CBB7" opacity="0.6" />
        <rect x="0" y="316" width="300" height="84" fill="#C7BBA4" />
        {scenes[city]}
      </svg>
      {caption && (
        <div className="cap">
          <div className="display" style={{ fontSize: 22, color: "#fff" }}>{caption}</div>
          {sub && <div className="mono" style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.85, marginTop: 4 }}>{sub}</div>}
        </div>
      )}
    </div>
  );
}

function HouseArt() {
  const ink = "#26211C", red = "#A52831", cream = "#F3EEE4";
  return (
    <div className="photo" style={{ aspectRatio: "3/2" }}>
      <svg viewBox="0 0 300 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }} aria-hidden="true">
        <rect width="300" height="200" fill="#EDE6D9" />
        <path d="M0 158 Q80 140 160 152 T300 150 V200 H0Z" fill="#D6CBB7" opacity="0.7" />
        <rect y="164" width="300" height="36" fill="#C7BBA4" />
        <polygon points="86,120 150,74 214,120" fill={red} />
        <rect x="100" y="120" width="100" height="50" fill={ink} />
        <rect x="180" y="88" width="12" height="22" fill={ink} />
        <rect x="139" y="142" width="22" height="28" fill={cream} />
        <rect x="114" y="130" width="16" height="16" fill={cream} />
        <rect x="170" y="130" width="16" height="16" fill={cream} />
        <rect x="230" y="126" width="3" height="44" fill={ink} />
        <rect x="214" y="118" width="34" height="20" rx="2" fill={cream} stroke={ink} strokeWidth="2" />
        <rect x="219" y="123" width="24" height="3.5" fill={red} />
        <rect x="219" y="130" width="15" height="2.5" fill={ink} opacity="0.5" />
      </svg>
    </div>
  );
}

function Photo({ src, style, caption, sub }) {
  const [ok, setOk] = useState(true);
  return (
    <div className="photo" style={style}>
      {ok && <img src={src} alt={caption || ""} loading="lazy" onError={() => setOk(false)} />}
      {caption && (
        <div className="cap">
          <div className="display" style={{ fontSize: 22, color: "#fff" }}>{caption}</div>
          {sub && <div className="mono" style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.85, marginTop: 4 }}>{sub}</div>}
        </div>
      )}
    </div>
  );
}

const NAV = [
  { label: "Listings", href: "#listings" },
  { label: "Home Value", href: "#valuation" },
  { label: "FAQ", href: "#faq" },
];

const MARQUEE = ["Athens", "Madison", "Huntsville", "Decatur", "Rogersville", "Elkmont", "Harvest"];

// Real client reviews. Add more as they come in — layout adjusts automatically.
const REVIEWS = [
  {
    text: "Colby is very friendly and detail oriented. He really helped me to understand the home-buying process.",
    name: "Rett Krome",
    meta: "Google review",
  },
];

export default function ColbyWilliamsHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [scrolled, setScrolled] = useState(false);
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
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setFormError("");
    const fd = new FormData(e.currentTarget);
    if (fd.get("company")) return; // honeypot: silently ignore bots
    const payload = {
      address: fd.get("address"),
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      source: "Home valuation form",
    };
    setSending(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setFormError("Something went wrong. Please call or text Colby at (256) 710-2384.");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const target = id && document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    };
    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="cw" ref={rootRef}>
      <style>{STYLES}</style>
      <style>{"html{scroll-behavior:smooth}.cw section[id]{scroll-margin-top:108px}"}</style>
      <div className="grain" />

      {/* NAV */}
      <header className="px-6" style={{ position: "sticky", top: 0, zIndex: 50, transition: "background .3s, box-shadow .3s, border-color .3s", background: scrolled ? "rgba(252,251,249,0.88)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent" }}>
        <div className="mx-auto flex items-center justify-between" style={{ maxWidth: 1240, height: 92 }}>
          <a href="#top" className="flex items-center"><img src={WORDMARK} alt="Innovative Realty Solutions" style={{ height: 64, width: "auto", maxWidth: "64vw", display: "block", marginLeft: -3 }} /></a>
          <nav className="hidden md:flex items-center gap-11">
            {NAV.map((n) => <a key={n.label} href={n.href} className="mono link-u" style={{ fontSize: 13.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-soft)" }}>{n.label}</a>)}
            <a href="#contact" className="btn btn-primary" style={{ padding: "12px 22px", fontSize: 13.5 }}>Let's talk <ArrowUpRight size={16} /></a>
          </nav>
          <button className="md:hidden btn btn-ghost" style={{ padding: 11 }} onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1" style={{ background: "var(--paper)", borderTop: "1px solid var(--line)" }}>
            {NAV.map((n) => <a key={n.label} href={n.href} onClick={() => setMenuOpen(false)} className="mono" style={{ padding: "13px 4px", fontSize: 14, textTransform: "uppercase", letterSpacing: "0.08em" }}>{n.label}</a>)}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="btn btn-primary mt-2" style={{ justifyContent: "center" }}>Let's talk</a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="px-6" style={{ paddingTop: 48, paddingBottom: 20 }}>
        <div className="mx-auto grid items-center gap-14 hero-grid" style={{ maxWidth: 1240, gridTemplateColumns: "1.15fr 0.85fr" }}>
          <div>
            <div className="eyebrow reveal" style={{ marginBottom: 22 }}>Realtor® · Athens, Alabama</div>
            <h1 className="reveal" style={{ fontSize: "clamp(46px, 7.5vw, 88px)", transitionDelay: ".05s" }}>
              Buying or selling<br />in North Alabama?<br />
              <span style={{ color: "var(--brand)" }}>Let's make it easy.</span>
            </h1>
            <p className="reveal" style={{ fontSize: 18.5, color: "var(--ink-soft)", marginTop: 26, maxWidth: 500, transitionDelay: ".1s" }}>
              I'm Colby Williams with Innovative Realty Solutions, a local guide for buying and
              selling homes across Athens, Madison, and Huntsville. Straight answers, no pressure.
            </p>
            <div className="flex flex-wrap gap-3 reveal" style={{ marginTop: 32, transitionDelay: ".15s" }}>
              <a href="#valuation" className="btn btn-primary">Get my home value <ArrowUpRight size={16} /></a>
              <a href="#listings" className="btn btn-ghost">See listings <ArrowRight size={16} /></a>
            </div>
            <div className="flex items-center gap-6 flex-wrap reveal mono" style={{ marginTop: 34, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-soft)", transitionDelay: ".2s" }}>
              <span className="flex items-center gap-2"><MapPin size={14} /> Based in Athens</span>
              <span className="flex items-center gap-2"><Star size={14} style={{ color: "var(--brand)" }} /> Local &amp; on your side</span>
            </div>
          </div>
          <div className="hero-photo reveal" style={{ transitionDelay: ".1s" }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: "auto -18px -18px auto", width: "62%", height: "62%", background: "var(--brand)", borderRadius: 2, zIndex: 0 }} />
              <div style={{ position: "absolute", inset: "-16px auto auto -16px", width: 74, height: 74, border: "1.5px solid var(--ink)", borderRadius: 2, zIndex: 0 }} />
              <img src={HERO_IMG} alt="Colby Williams, Realtor in Athens, Alabama" style={{ position: "relative", zIndex: 1, width: "100%", borderRadius: 2, aspectRatio: "4/5", objectFit: "cover", objectPosition: "50% 8%" }} />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "18px 0", marginTop: 30 }}>
        <div className="mtrack">
          {[...MARQUEE, ...MARQUEE].map((w, i) => (
            <span className="mitem" key={i}>
              <span className={i % 2 ? "outline" : ""}>{w}</span>
              <span className="mstar">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* TRUST STRIP */}
      <section style={{ background: "var(--black)", color: "#fff" }} className="px-6">
        <div className="mx-auto grid gap-10 grid-3" style={{ maxWidth: 1240, gridTemplateColumns: "repeat(3,1fr)", paddingTop: 56, paddingBottom: 56 }}>
          {[
            { n: "01", t: "I actually live here", d: "Athens is home. I know the neighborhoods, schools, commutes, and what a fair price looks like block to block." },
            { n: "02", t: "You get the real story", d: "No hype, no pressure. I'll tell you when a house is right, and just as fast when it isn't." },
            { n: "03", t: "With you start to finish", d: "From the first showing or listing photo to closing day, you'll always know the next step." },
          ].map((c, i) => (
            <div key={c.n} className="reveal" style={{ transitionDelay: `${i * 0.14}s` }}>
              <div className="mono" style={{ fontSize: 12, color: "var(--brand)", letterSpacing: "0.14em", filter: "brightness(1.5)" }}>{c.n}</div>
              <h3 style={{ fontSize: 21, marginTop: 14, marginBottom: 10 }}>{c.t}</h3>
              <p style={{ fontSize: 15, opacity: 0.72 }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-6" style={{ paddingTop: 96, paddingBottom: 56 }}>
        <div className="mx-auto grid items-center gap-16 split reveal" style={{ maxWidth: 1240, gridTemplateColumns: "0.85fr 1.15fr" }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: "auto auto -16px -16px", width: "55%", height: "55%", background: "var(--mist)", borderRadius: 2, zIndex: 0 }} />
            <img src={HEADSHOT} alt="Colby Williams, Athens Alabama real estate agent" style={{ position: "relative", zIndex: 1, width: "100%", borderRadius: 2, aspectRatio: "4/5", objectFit: "cover", objectPosition: "50% 12%" }} />
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Meet Colby</div>
            <h2 style={{ fontSize: "clamp(30px,4vw,46px)" }}>A local guide,<br />not a sales pitch.</h2>
            <p style={{ color: "var(--ink-soft)", marginTop: 20, fontSize: 17, maxWidth: 540 }}>
              Real estate moves fast in North Alabama, and it's easy to feel rushed into the biggest
              decision of your life. That's not how I work. My job is to give you the full picture,
              the good and the bad, so you can make a confident call, whether you're buying your first
              home in Athens or selling to move up in Madison.
            </p>
            <p style={{ color: "var(--ink-soft)", marginTop: 16, fontSize: 17, maxWidth: 540 }}>
              You work with me directly, start to finish. No handoffs, no call center, no pressure.
            </p>
            <p style={{ color: "var(--ink-soft)", marginTop: 16, fontSize: 17, maxWidth: 540 }}>
              I grew up around here and I know these towns, from the neighborhoods and school zones in
              Athens and Madison to the commute into Huntsville and the quieter pockets of Limestone County.
              That means real answers about where your money goes furthest and what a home is actually worth,
              not a national guess.
            </p>
            <p style={{ color: "var(--ink-soft)", marginTop: 16, fontSize: 17, maxWidth: 540 }}>
              Whether you're a first-time buyer trying to make sense of the process, a family relocating for
              work, or a homeowner weighing whether now is the right time to sell, reach out anytime. I'll
              give you an honest read on your situation, and there's never any pressure to move faster than
              you're ready to.
            </p>
          </div>
        </div>
      </section>

      {/* COMMUNITIES */}
      <section id="communities" className="px-6" style={{ paddingTop: 64, paddingBottom: 56 }}>
        <div className="mx-auto" style={{ maxWidth: 1240 }}>
          <div className="flex items-end justify-between flex-wrap gap-4 reveal">
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Where I work</div>
              <h2 style={{ fontSize: "clamp(30px,4vw,46px)", maxWidth: 620 }}>North Alabama, town by town</h2>
            </div>
            <p className="mono" style={{ fontSize: 12, color: "var(--ink-soft)", letterSpacing: "0.06em", maxWidth: 260 }}>Every town here has its own feel, price points, and quirks. Here's where I help most.</p>
          </div>
          <div className="grid gap-5 grid-4 reveal" style={{ gridTemplateColumns: "repeat(4,1fr)", marginTop: 36 }}>
            {[
              { key: "athens", name: "Athens", sub: "Homes for sale in Athens, AL" },
              { key: "madison", name: "Madison", sub: "Madison, AL real estate" },
              { key: "huntsville", name: "Huntsville", sub: "Huntsville homes & relocation" },
              { key: "decatur", name: "Decatur", sub: "River city, historic charm" },
            ].map((c) => (
              <a key={c.key} href="#contact" className="tile" style={{ borderRadius: 2, overflow: "hidden", display: "block" }}>
                <Photo src={CITY[c.key]} style={{ aspectRatio: "3/4" }} caption={c.name} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TWO PATHS */}
      <section className="px-6" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="mx-auto grid gap-6 grid-2 reveal" style={{ maxWidth: 1240, gridTemplateColumns: "1fr 1fr" }}>
          {[
            { icon: <Home size={22} />, t: "Thinking about selling?", d: "Start by knowing your number. I'll pull real, recent North Alabama sales (not a random online estimate) so you know what your home would actually bring today, with zero obligation to list.", cta: "Get my home value", href: "#valuation", primary: true },
            { icon: <Key size={22} />, t: "Looking for a home?", d: "First home, move-up, or a relocation to the Huntsville area. I'll help you figure out what you can afford, where to look, and how to win without overpaying.", cta: "Start your search", href: "https://colbywilliams.valleymls.com", primary: false },
          ].map((p) => (
            <div key={p.t} style={{ padding: 38, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 2 }}>
              <div className="flex items-center justify-center" style={{ width: 50, height: 50, borderRadius: 2, background: "var(--mist)", color: "var(--brand)" }}>{p.icon}</div>
              <h3 style={{ fontSize: 26, marginTop: 20 }}>{p.t}</h3>
              <p style={{ color: "var(--ink-soft)", marginTop: 12, fontSize: 15.5 }}>{p.d}</p>
              <a href={p.href} target={p.href.startsWith("http") ? "_blank" : undefined} rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined} className={"btn " + (p.primary ? "btn-primary" : "btn-ghost")} style={{ marginTop: 24 }}>{p.cta} <ArrowUpRight size={16} /></a>
            </div>
          ))}
        </div>
      </section>

      {/* LISTINGS */}
      <section id="listings" className="px-6" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="mx-auto" style={{ maxWidth: 1240 }}>
          <div className="flex items-end justify-between flex-wrap gap-4 reveal">
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Featured homes</div>
              <h2 style={{ fontSize: "clamp(30px,4vw,46px)" }}>My Listings</h2>
            </div>
            <a href="#contact" className="mono link-u" style={{ color: "var(--brand)", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase" }}>Ask about a home →</a>
          </div>
          <div className="tile grid-2 reveal" style={{ display: "grid", gridTemplateColumns: "1.12fr 0.88fr", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 2, overflow: "hidden", marginTop: 36 }}>
            <div style={{ position: "relative", minHeight: 360, overflow: "hidden" }}>
              <img src={LISTING1} alt="213 Rosecliff Drive, Harvest, Alabama" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <span className="mono" style={{ position: "absolute", top: 16, left: 16, background: "var(--brand)", color: "#fff", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", padding: "6px 12px" }}>For sale</span>
            </div>
            <div style={{ padding: "clamp(28px,4vw,44px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div className="mono" style={{ fontSize: 12, color: "var(--ink-soft)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Harvest, AL 35749</div>
              <div className="display" style={{ fontSize: "clamp(30px,4vw,42px)", marginTop: 8 }}>$335,000</div>
              <div className="display" style={{ fontSize: 19, marginTop: 4, color: "var(--ink)" }}>213 Rosecliff Drive</div>
              <div className="mono" style={{ fontSize: 13, color: "var(--brand)", letterSpacing: "0.06em", marginTop: 14 }}>4 BD · 2.5 BA · 2,442 SQFT</div>
              <p style={{ color: "var(--ink-soft)", fontSize: 15.5, marginTop: 16, lineHeight: 1.6 }}>A classic two-story colonial on a quiet, tree-lined lot in Harvest, just minutes from Madison and the Research Park corridor. Easy layout, lots of natural light, and room to grow. Want to walk through it?</p>
              <div className="flex flex-wrap gap-3" style={{ marginTop: 24 }}>
                <a href="#contact" className="btn btn-primary">Book a showing</a>
                <a href="#contact" className="btn btn-ghost">Ask about this home</a>
              </div>
            </div>
          </div>
          <p className="mono" style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 20, letterSpacing: "0.04em" }}>Details believed accurate; confirm with listing agent. More listings coming soon.</p>
        </div>
      </section>

      {/* VALUATION FORM */}
      <section id="valuation" className="px-6" style={{ paddingTop: 56, paddingBottom: 72 }}>
        <div className="mx-auto grid gap-0 split reveal" style={{ maxWidth: 1240, gridTemplateColumns: "1fr 1fr", borderRadius: 2, overflow: "hidden", border: "1px solid var(--line)" }}>
          <div style={{ padding: "52px 46px", background: "var(--black)", color: "#fff" }}>
            <div className="eyebrow" style={{ marginBottom: 18, filter: "brightness(1.6)" }}>Free · No obligation</div>
            <h2 style={{ fontSize: 34, color: "#fff" }}>What's your home actually worth?</h2>
            <p style={{ opacity: 0.78, marginTop: 16, fontSize: 15.5 }}>Online estimates guess. I'll send you a real range based on what comparable homes near you have actually sold for, and what buyers are paying right now.</p>
            <ul style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 14 }}>
              {["Based on recent local sales, not a national algorithm", "No pushy follow-up, just the info you asked for", "Handled personally by me, not a call center"].map((t) => (
                <li key={t} className="flex items-start gap-3" style={{ fontSize: 14.5 }}>
                  <Check size={18} style={{ color: "var(--brand)", flexShrink: 0, marginTop: 2, filter: "brightness(1.7)" }} />
                  <span style={{ opacity: 0.9 }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ padding: "52px 46px", background: "var(--paper)" }}>
            {sent ? (
              <div className="flex flex-col items-start justify-center" style={{ height: "100%" }}>
                <div className="flex items-center justify-center" style={{ width: 54, height: 54, borderRadius: 2, background: "var(--mist)", color: "var(--brand)" }}><Check size={26} /></div>
                <h3 style={{ fontSize: 26, marginTop: 20 }}>Got it, thank you.</h3>
                <p style={{ color: "var(--ink-soft)", marginTop: 10 }}>I'll personally put together your home value and get it to you shortly. Keep an eye on your inbox.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-4">
                <div>
                  <div className="lbl" style={{ marginBottom: 7 }}>Property address</div>
                  <input name="address" className="field" required placeholder="123 Main St, Athens, AL" />
                </div>
                <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
                  <div><div className="lbl" style={{ marginBottom: 7 }}>First name</div><input name="firstName" className="field" required placeholder="First" /></div>
                  <div><div className="lbl" style={{ marginBottom: 7 }}>Last name</div><input name="lastName" className="field" required placeholder="Last" /></div>
                </div>
                <div><div className="lbl" style={{ marginBottom: 7 }}>Email</div><input name="email" className="field" type="email" required placeholder="you@email.com" /></div>
                <div><div className="lbl" style={{ marginBottom: 7 }}>Phone <span style={{ textTransform: "none", opacity: 0.6 }}>(optional)</span></div><input name="phone" className="field" type="tel" placeholder="(256) 000-0000" /></div>
                <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
                <button type="submit" disabled={sending} className="btn btn-primary" style={{ marginTop: 6, justifyContent: "center", opacity: sending ? 0.65 : 1 }}>{sending ? "Sending..." : (<>Get my home value <ArrowUpRight size={16} /></>)}</button>
                {formError && <p style={{ color: "var(--brand)", fontSize: 13, marginTop: 2 }}>{formError}</p>}
                <p className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.03em" }}>Goes straight to Colby, never sold or shared.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6" style={{ paddingBottom: 56 }}>
        <div className="mx-auto reveal" style={{ maxWidth: 1240 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>How it works</div>
          <h2 style={{ fontSize: "clamp(30px,4vw,46px)" }}>Simple, and you're never guessing</h2>
          <div className="grid gap-8 grid-3" style={{ gridTemplateColumns: "repeat(3,1fr)", marginTop: 40 }}>
            {[
              { n: "01", t: "We talk", d: "A quick, no-pressure conversation about what you want, your timeline, and your budget." },
              { n: "02", t: "We make a plan", d: "I lay out exactly what happens next, whether you're listing your home or starting your search." },
              { n: "03", t: "We get to closing", d: "I handle the moving parts and keep you updated, so it feels a lot lighter than you'd expect." },
            ].map((s) => (
              <div key={s.n} style={{ borderTop: "2px solid var(--brand)", paddingTop: 18 }}>
                <div className="display" style={{ fontSize: 40, color: "var(--brand)" }}>{s.n}</div>
                <h3 style={{ fontSize: 21, marginTop: 12 }}>{s.t}</h3>
                <p style={{ color: "var(--ink-soft)", marginTop: 10, fontSize: 15 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="mx-auto reveal" style={{ maxWidth: 1240 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>What clients say</div>
          <h2 style={{ fontSize: "clamp(30px,4vw,46px)" }}>People you can call and ask</h2>
          <div className="flex flex-wrap justify-center gap-6" style={{ marginTop: 36 }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ padding: 30, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 2, flex: "1 1 340px", maxWidth: 460 }}>
                <Quote size={26} style={{ color: "var(--brand)" }} fill="currentColor" />
                <p style={{ marginTop: 16, fontSize: 16, color: "var(--ink)" }}>“{r.text}”</p>
                <div className="flex gap-1" style={{ color: "var(--brand)", marginTop: 18 }}>{[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}</div>
                <div className="mono" style={{ marginTop: 12, fontSize: 12, letterSpacing: "0.06em" }}>{r.name.toUpperCase()} · {r.meta.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="mx-auto grid gap-16 split reveal" style={{ maxWidth: 1240, gridTemplateColumns: "0.8fr 1.2fr" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Good questions</div>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,40px)" }}>Before we ever talk</h2>
            <p style={{ color: "var(--ink-soft)", marginTop: 16 }}>A few things people want to know first. Don't see yours? <a href="#contact" className="link-u" style={{ color: "var(--brand)", fontWeight: 600 }}>Just ask me.</a></p>
          </div>
          <div>
            {[
              { q: "Does it cost me anything to work with you as a buyer?", a: "We'll go over exactly how buyer representation and commissions work in your situation up front, in plain English, before you commit to anything. No surprises." },
              { q: "How is your home value different from Zillow's estimate?", a: "Zillow uses a national algorithm that can't see inside your home or your street. I base your number on recent, comparable sales right here in North Alabama and what buyers are actually paying now." },
              { q: "Do you help with relocations and military moves?", a: "Yes. A lot of my work is helping families relocating to the Huntsville area, including military moves. I can help remotely before you ever get to town." },
              { q: "How soon can we get started?", a: "As soon as you're ready. Send a message or grab your home value above, and I'll follow up personally to figure out the right next step." },
              { q: "Can you help first-time homebuyers?", a: "Absolutely! I enjoy helping first-time buyers understand the process from start to finish. I'll explain every step, answer your questions, and make sure you feel confident throughout the journey." },
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: "1px solid var(--line)" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="flex items-center justify-between w-full" style={{ padding: "22px 0", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}>
                  <span className="display" style={{ fontSize: 18, paddingRight: 16 }}>{f.q}</span>
                  <ChevronDown size={20} style={{ flexShrink: 0, transition: "transform .2s", transform: openFaq === i ? "rotate(180deg)" : "none", color: "var(--brand)" }} />
                </button>
                {openFaq === i && <p style={{ paddingBottom: 22, color: "var(--ink-soft)", fontSize: 15.5, maxWidth: 620 }}>{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="px-6" style={{ paddingTop: 40, paddingBottom: 72 }}>
        <div className="mx-auto reveal" style={{ maxWidth: 1240, background: "var(--black)", borderRadius: 2, padding: "clamp(44px, 6vw, 84px)", color: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: "auto -60px -60px auto", width: 260, height: 260, background: "var(--brand)", opacity: 0.16, borderRadius: "50%", filter: "blur(20px)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="eyebrow" style={{ marginBottom: 18, filter: "brightness(1.6)" }}>Let's talk</div>
            <h2 style={{ fontSize: "clamp(34px,5vw,60px)", color: "#fff", maxWidth: 760 }}>Ready when you are.</h2>
            <p style={{ opacity: 0.8, marginTop: 18, fontSize: 17.5, maxWidth: 560 }}>Six months out or ready this week? Reach out and I'll help you figure out the smart next step. No pressure, ever.</p>
            <div className="flex flex-wrap gap-3" style={{ marginTop: 32 }}>
              <a href="tel:+12567102384" className="btn btn-light"><Phone size={16} /> Call or text Colby</a>
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
              <p style={{ opacity: 0.62, marginTop: 16, fontSize: 14, maxWidth: 320 }}>Helping people buy and sell homes in Athens, Madison, Huntsville, and across North Alabama.</p>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 16, filter: "brightness(1.6)" }}>Explore</div>
              {NAV.map((n) => <a key={n.label} href={n.href} className="link-u" style={{ display: "block", padding: "8px 0", opacity: 0.8, fontSize: 14 }}>{n.label}</a>)}
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 16, filter: "brightness(1.6)" }}>Get in touch</div>
              <div className="mono" style={{ opacity: 0.82, fontSize: 13, lineHeight: 2.1, letterSpacing: "0.02em" }}>
                <div className="flex items-center gap-2"><MapPin size={13} /> Athens, Alabama</div>
                <div className="flex items-center gap-2"><Phone size={13} /> (256) 710-2384</div>
                <div className="flex items-center gap-2"><Mail size={13} /> colbywilliamsre@gmail.com</div>
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
