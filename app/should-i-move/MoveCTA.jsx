import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Homepage section. Uses the homepage's own .btn, .eyebrow and .reveal classes
// so it matches the rest of the page exactly.
export default function MoveCTA() {
  return (
    <section className="px-6" style={{ paddingTop: 72, paddingBottom: 8 }}>
      <style>{CSS}</style>
      <div className="mx-auto reveal sys-mcta" style={{ maxWidth: 1240 }}>
        <div className="sys-mcta-copy">
          <div className="eyebrow" style={{ marginBottom: 16 }}>Free tool · No sign-up</div>
          <h2 className="sys-mcta-head">Should I move?</h2>
          <p className="sys-mcta-lede">
            Put in your real numbers and get a straight answer in about two minutes, even if the answer is not yet.
          </p>
          <Link href="/should-i-move" className="btn btn-primary" style={{ marginTop: 28 }}>
            Get my answer <ArrowUpRight size={16} />
          </Link>
        </div>
        <ul className="sys-mcta-list">
          <li>
            <strong>What you’d walk away with</strong>
            <span>After commission, closing costs, repairs, and your payoff.</span>
          </li>
          <li>
            <strong>What your next payment would really be</strong>
            <span>With Athens, Huntsville, Madison, and Decatur property taxes built in.</span>
          </li>
          <li>
            <strong>An honest verdict</strong>
            <span>Yes, yes but tight, or not yet, with exactly what’s in the way.</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

const CSS = `
.sys-mcta { position: relative; display: grid; grid-template-columns: 1.05fr 0.95fr; gap: clamp(32px, 5vw, 72px); align-items: center; background: var(--paper, #FCFBF9); border: 1px solid var(--line, rgba(22,19,15,0.10)); border-radius: 2px; padding: clamp(36px, 5vw, 64px) clamp(28px, 5vw, 64px) clamp(36px, 5vw, 64px) clamp(36px, 6vw, 76px); overflow: hidden; }
.sys-mcta::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 6px; background: var(--brand, #A52831); }
.sys-mcta .sys-mcta-head { font-size: clamp(44px, 7vw, 84px); line-height: 0.95; letter-spacing: -0.04em; font-weight: 800; margin: 0; }
.sys-mcta .sys-mcta-lede { font-size: 17.5px; line-height: 1.55; color: var(--ink-soft, #57534C); max-width: 30em; margin: 18px 0 0; }
.sys-mcta .sys-mcta-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--line, rgba(22,19,15,0.10)); }
.sys-mcta .sys-mcta-list li { padding: 20px 0; border-bottom: 1px solid var(--line, rgba(22,19,15,0.10)); }
.sys-mcta .sys-mcta-list strong { display: block; font-family: 'Bricolage Grotesque', 'Inter', sans-serif; font-weight: 700; font-size: 20px; letter-spacing: -0.01em; color: var(--ink, #16130F); margin-bottom: 4px; }
.sys-mcta .sys-mcta-list span { display: block; font-size: 15px; line-height: 1.5; color: var(--ink-soft, #57534C); }
@media (max-width: 900px) {
  .sys-mcta { grid-template-columns: 1fr; }
}
`;
