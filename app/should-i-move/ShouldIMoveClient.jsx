'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  MORTGAGE_RATE,
  RATE_AS_OF,
  RATE_SOURCE,
  LOAN_TERM_YEARS,
  DEFAULT_COMMISSION_PCT,
  SELLER_CLOSING_PCT,
  CONDITIONS,
  BUYER_CLOSING_PCT,
  INSURANCE_PCT,
  PMI_PCT,
  MIN_DOWN_PCT,
  COMFORT_DTI,
  MAX_DTI,
  AREAS,
} from '../../lib/moveAssumptions';

const EMPTY = {
  value: '',
  payoff: '',
  currentPayment: '',
  currentRate: '',
  condition: CONDITIONS[0].id,
  commission: String(DEFAULT_COMMISSION_PCT),
  price: '',
  area: AREAS[0].id,
  hoa: '',
  savings: '',
  income: '',
  debts: '',
};

const STEP_NAMES = ['Your home now', 'Where you want to go', 'Your answer'];

const num = (v) => {
  const n = parseFloat(String(v ?? '').replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
};
const money = (n) => `${n < 0 ? '-' : ''}$${Math.round(Math.abs(n)).toLocaleString('en-US')}`;
const commas = (v) => {
  const d = String(v).replace(/[^0-9]/g, '').slice(0, 10);
  return d ? Number(d).toLocaleString('en-US') : '';
};
const decimal = (v) => {
  let s = String(v).replace(/[^0-9.]/g, '');
  const i = s.indexOf('.');
  if (i !== -1) s = s.slice(0, i + 1) + s.slice(i + 1).replace(/\./g, '');
  return s.slice(0, 6);
};
const track = (name, params = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag('event', name, params);
};

function monthlyPI(loan, ratePct, years) {
  if (loan <= 0) return 0;
  const r = ratePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return loan / n;
  return (loan * r) / (1 - Math.pow(1 + r, -n));
}

function buySide(price, cashAvailable, area, hoa) {
  const R = Math.round;
  const buyerClosing = R((price * BUYER_CLOSING_PCT) / 100);
  const down = Math.max(0, Math.min(R(cashAvailable) - buyerClosing, price));
  const loan = Math.max(price - down, 0);
  const downPct = price > 0 ? (down / price) * 100 : 0;
  const pi = R(monthlyPI(loan, MORTGAGE_RATE, LOAN_TERM_YEARS));
  const tax = R(((price / 100000) * area.taxPer100k) / 12);
  const insurance = R((price * INSURANCE_PCT) / 100 / 12);
  const pmi = loan > 0 && downPct < 20 ? R((loan * PMI_PCT) / 100 / 12) : 0;
  hoa = R(hoa);
  const total = pi + tax + insurance + pmi + hoa;
  return { buyerClosing, down, loan, downPct, pi, tax, insurance, pmi, hoa, total };
}

function runNumbers(f) {
  const value = num(f.value);
  const payoff = num(f.payoff);
  const currentPayment = num(f.currentPayment);
  const currentRate = num(f.currentRate);
  const commissionPct = Math.min(num(f.commission), 10);
  const condition = CONDITIONS.find((c) => c.id === f.condition) || CONDITIONS[0];
  const area = AREAS.find((a) => a.id === f.area) || AREAS[0];
  const price = num(f.price);
  const savings = num(f.savings);
  const hoa = num(f.hoa);
  const income = num(f.income);
  const debts = num(f.debts);

  const commission = Math.round((value * commissionPct) / 100);
  const sellerClosing = Math.round((value * SELLER_CLOSING_PCT) / 100);
  const repairs = Math.round((value * condition.pct) / 100);
  const net = value - commission - sellerClosing - repairs - payoff;

  const cashAvailable = Math.max(net, 0) + savings;
  const minCashNeeded = Math.round((price * (MIN_DOWN_PCT + BUYER_CLOSING_PCT)) / 100);
  const cashGap = minCashNeeded - cashAvailable;
  const shortfall = net < 0 || cashGap > 0;
  const totalGap = (net < 0 ? -net : 0) + Math.max(cashGap, 0);
  const buy = buySide(price, shortfall ? minCashNeeded : cashAvailable, area, hoa);
  const dti = income > 0 ? ((buy.total + debts) / income) * 100 : null;

  let comfortablePrice = null;
  if (income > 0) {
    for (let p = price; p >= 50000; p -= 5000) {
      const t = buySide(p, cashAvailable, area, hoa).total;
      if (((t + debts) / income) * 100 <= COMFORT_DTI) {
        comfortablePrice = p;
        break;
      }
    }
  }
  const priceFix =
    comfortablePrice && comfortablePrice < price
      ? `A price around ${money(comfortablePrice)} keeps you near ${COMFORT_DTI}% of your income, which is a payment you can actually live with.`
      : 'Paying down other monthly debts first is the fastest way to open this up.';

  let tier = 'yes';
  let blocker = '';
  let fix = '';
  const flags = [];
  const notes = [];

  if (net < 0) {
    tier = 'notyet';
    blocker = `You owe about ${money(-net)} more than the sale would leave you after commission, closing costs, and repairs.`;
    fix = 'That gap closes by paying the loan down, the value rising, or bringing cash to closing. Worth a real conversation before you list.';
  } else if (cashGap > 0) {
    tier = 'notyet';
    blocker = `You'd be about ${money(cashGap)} short of what it takes to buy at ${money(price)} with ${MIN_DOWN_PCT}% down plus closing costs.`;
    fix = 'The fix is more savings, a lower price, or down payment help through Alabama Housing Finance Authority programs.';
  } else if (dti !== null && dti > MAX_DTI) {
    tier = 'notyet';
    blocker = `The new payment plus your other debts would take about ${Math.round(dti)}% of your income before taxes. Most lenders stop around ${MAX_DTI}%.`;
    fix = priceFix;
  }

  if (tier !== 'notyet') {
    if (dti !== null && dti > COMFORT_DTI) {
      flags.push(
        `The new payment plus your other debts would use about ${Math.round(dti)}% of your income before taxes. A lender may approve it, but it leaves less room than most people want.`
      );
      fix = priceFix;
    }
    if (dti === null && currentPayment > 0 && buy.total > currentPayment * 1.4) {
      flags.push(
        `Your payment would go from ${money(currentPayment)} to about ${money(buy.total)} a month, a ${Math.round(
          (buy.total / currentPayment - 1) * 100
        )}% jump.`
      );
    }
    if (flags.length) tier = 'tight';
  }

  if (buy.loan === 0 && price > 0) notes.push('The sale plus your savings covers the whole price. No mortgage needed.');
  if (buy.pmi > 0)
    notes.push(
      `You'd put about ${Math.round(buy.downPct)}% down, so plan on mortgage insurance of roughly ${money(buy.pmi)} a month until you reach 20% equity.`
    );
  if (currentRate > 0 && MORTGAGE_RATE - currentRate >= 1.5)
    notes.push(`You're trading a ${currentRate}% rate for about ${MORTGAGE_RATE}%. That trade is most of why the payment moves.`);
  if (shortfall)
    notes.push(`The payment shown assumes you close the gap and put ${MIN_DOWN_PCT}% down.`);
  if (buy.loan > 0 && !shortfall)
    notes.push("This assumes every dollar the sale leaves you goes into the new home. Keeping a few months of payments in reserve is smart.");
  if (income === 0) notes.push('Add your household income on step 2 and this answer gets sharper.');

  const headline = tier === 'yes' ? 'Yes. The numbers work.' : tier === 'tight' ? "Yes, but it's tight." : 'Not yet.';
  const sub =
    tier === 'notyet'
      ? blocker
      : tier === 'tight'
      ? flags[0]
      : `You'd walk away with about ${money(net)}, and your next payment lands around ${money(buy.total)} a month.`;

  return {
    value, payoff, currentPayment, currentRate, commissionPct, commission, sellerClosing, repairs,
    condition, net, savings, cashAvailable, price, area, buy, cashGap, shortfall, totalGap, minCashNeeded, dti,
    tier, headline, sub, flags, fix, notes,
  };
}

function Field({ id, label, help, optional, children }) {
  return (
    <div className="sys-sim-field">
      <label className="sys-sim-label" htmlFor={id}>
        {label} {optional && <span className="sys-sim-opt">(optional)</span>}
      </label>
      {help && <p className="sys-sim-help">{help}</p>}
      {children}
    </div>
  );
}

function MoneyInput({ id, value, onChange, placeholder }) {
  return (
    <div className="sys-sim-inputwrap">
      <span className="sys-sim-affix" aria-hidden="true">$</span>
      <input
        id={id}
        className="sys-sim-input sys-sim-input--pre"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function PctInput({ id, value, onChange, placeholder }) {
  return (
    <div className="sys-sim-inputwrap">
      <input
        id={id}
        className="sys-sim-input sys-sim-input--suf"
        type="text"
        inputMode="decimal"
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <span className="sys-sim-affix sys-sim-affix--right" aria-hidden="true">%</span>
    </div>
  );
}

export default function ShouldIMoveClient() {
  const [step, setStep] = useState(1);
  const [f, setF] = useState(EMPTY);
  const [error, setError] = useState('');
  const [intent, setIntent] = useState('email');
  const [lead, setLead] = useState({ name: '', email: '', phone: '', address: '', timeframe: '', company_website: '' });
  const [status, setStatus] = useState('idle');
  const [leadError, setLeadError] = useState('');
  const topRef = useRef(null);
  const firstRender = useRef(true);

  const r = useMemo(() => runNumbers(f), [f]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    topRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }, [step]);

  const setMoney = (k) => (e) => setF((p) => ({ ...p, [k]: commas(e.target.value) }));
  const setPct = (k) => (e) => setF((p) => ({ ...p, [k]: decimal(e.target.value) }));
  const setRaw = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  const setLeadField = (k) => (e) => setLead((p) => ({ ...p, [k]: e.target.value }));

  const goStep2 = () => {
    if (num(f.value) <= 0) return setError("Enter what you think your home is worth. A best guess is fine.");
    if (f.payoff === '') return setError('Enter what you still owe. Put 0 if the house is paid off.');
    setError('');
    track('should_i_move_step', { step: 2 });
    setStep(2);
  };

  const goResults = () => {
    if (num(f.price) <= 0) return setError('Enter the price you have in mind for your next home.');
    setError('');
    setIntent(r.tier === 'notyet' ? 'plan' : 'email');
    setStatus('idle');
    track('should_i_move_result', { verdict: r.tier });
    setStep(3);
  };

  const startOver = () => {
    setF(EMPTY);
    setError('');
    setStatus('idle');
    setStep(1);
  };

  const submitLead = async () => {
    const needsPhone = intent !== 'email';
    if (!lead.name.trim()) return setLeadError('Add your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim())) return setLeadError('Add a valid email address.');
    if (needsPhone && lead.phone.replace(/[^0-9]/g, '').length < 10) return setLeadError('Add a phone number so Colby can reach you.');
    setLeadError('');
    setStatus('sending');

    const summary = {
      tier: r.tier,
      verdict: r.headline,
      reason: r.sub,
      fix: r.fix,
      homeValue: money(r.value),
      payoff: money(r.payoff),
      condition: r.condition.label,
      commission: `${r.commissionPct}%`,
      netProceeds: money(r.net),
      targetPrice: money(r.price),
      area: r.area.label,
      downPayment: `${money(r.buy.down)} (${Math.round(r.buy.downPct)}%)`,
      newPayment: money(r.buy.total),
      currentPayment: r.currentPayment ? money(r.currentPayment) : 'Not given',
      currentRate: r.currentRate ? `${r.currentRate}%` : 'Not given',
      dti: r.dti !== null ? `${Math.round(r.dti)}%` : 'Not given',
      cashShort: r.totalGap > 0 ? money(r.totalGap) : 'None',
      rate: `${MORTGAGE_RATE}% (${RATE_SOURCE}, ${RATE_AS_OF})`,
      saleLines: [
        `Home value: ${money(r.value)}`,
        `Commission (${r.commissionPct}%): -${money(r.commission)}`,
        `Closing costs: -${money(r.sellerClosing)}`,
        `Repairs and concessions: -${money(r.repairs)}`,
        `Mortgage payoff: -${money(r.payoff)}`,
        `You walk away with: ${money(r.net)}`,
      ],
      paymentLines: [
        `Principal and interest: ${money(r.buy.pi)}`,
        `Property tax: ${money(r.buy.tax)}`,
        `Homeowners insurance: ${money(r.buy.insurance)}`,
        `Mortgage insurance: ${money(r.buy.pmi)}`,
        `HOA: ${money(r.buy.hoa)}`,
        `New monthly payment: ${money(r.buy.total)}`,
      ],
    };

    try {
      const res = await fetch('/api/should-i-move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intent, ...lead, summary }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Send failed');
      setStatus('sent');
      track('should_i_move_lead', { intent, verdict: r.tier });
    } catch (e) {
      setStatus('error');
      setLeadError('That did not go through. Try again, or call or text Colby at 256-710-2384.');
    }
  };

  const intents = [
    { id: 'email', label: 'Email me this breakdown' },
    { id: 'verify', label: 'Have Colby check my real numbers' },
    ...(r.tier !== 'yes' ? [{ id: 'plan', label: 'Help me build a plan to get there' }] : []),
  ];

  return (
    <section className="sys-sim" ref={topRef}>
      <style>{CSS}</style>
      <div className="sys-sim-wrap">
        <p className="sys-sim-eyebrow">A free tool from Colby Williams, Realtor</p>
        <h1 className="sys-sim-title">Should I move?</h1>
        <p className="sys-sim-lede">
          Put in your real numbers. See what you’d walk away with, what your next payment would actually be with North
          Alabama property taxes, and a straight answer, even if the answer is not yet.
        </p>

        <div className="sys-sim-progress" aria-label={`Step ${step} of 3: ${STEP_NAMES[step - 1]}`}>
          <div className="sys-sim-bars" aria-hidden="true">
            {[1, 2, 3].map((n) => (
              <span key={n} className={`sys-sim-bar ${n <= step ? 'is-on' : ''}`} />
            ))}
          </div>
          <p className="sys-sim-stepname">
            Step {step} of 3: {STEP_NAMES[step - 1]}
          </p>
        </div>

        {step === 1 && (
          <div className="sys-sim-card">
            <div className="sys-sim-grid">
              <Field id="sim-value" label="What’s your home worth?" help="Your best guess. Zillow’s number is a fine place to start.">
                <MoneyInput id="sim-value" value={f.value} onChange={setMoney('value')} placeholder="325,000" />
              </Field>
              <Field id="sim-payoff" label="What do you still owe?" help="Your payoff balance. Put 0 if it’s paid off.">
                <MoneyInput id="sim-payoff" value={f.payoff} onChange={setMoney('payoff')} placeholder="180,000" />
              </Field>
              <Field id="sim-current" label="Current monthly payment" help="Including taxes and insurance." optional>
                <MoneyInput id="sim-current" value={f.currentPayment} onChange={setMoney('currentPayment')} placeholder="1,450" />
              </Field>
              <Field id="sim-rate" label="Current interest rate" help="Check your mortgage statement." optional>
                <PctInput id="sim-rate" value={f.currentRate} onChange={setPct('currentRate')} placeholder="3.25" />
              </Field>
            </div>

            <fieldset className="sys-sim-field sys-sim-fieldset">
              <legend className="sys-sim-label">What shape is the house in?</legend>
              <p className="sys-sim-help">Buyers ask for repairs after inspection. This sets aside a realistic amount.</p>
              <div className="sys-sim-choices">
                {CONDITIONS.map((c) => (
                  <label key={c.id} className={`sys-sim-choice ${f.condition === c.id ? 'is-on' : ''}`}>
                    <input type="radio" name="sim-condition" value={c.id} checked={f.condition === c.id} onChange={setRaw('condition')} />
                    <span>{c.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <Field id="sim-commission" label="Total commission" help="Commission is negotiable. 6% is a conservative estimate so the answer doesn’t come out rosier than reality.">
              <div className="sys-sim-short">
                <PctInput id="sim-commission" value={f.commission} onChange={setPct('commission')} placeholder="6" />
              </div>
            </Field>

            {error && <p className="sys-sim-error" role="alert">{error}</p>}
            <div className="sys-sim-actions sys-sim-actions--end">
              <button type="button" className="sys-sim-btn" onClick={goStep2}>
                Next: where you want to go
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="sys-sim-card">
            <div className="sys-sim-grid">
              <Field id="sim-price" label="Price of your next home" help="The price you have in mind, not the max.">
                <MoneyInput id="sim-price" value={f.price} onChange={setMoney('price')} placeholder="375,000" />
              </Field>
              <Field id="sim-area" label="Where are you looking?" help="Property tax changes a lot by city limits.">
                <select id="sim-area" className="sys-sim-select" value={f.area} onChange={setRaw('area')}>
                  {AREAS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="sim-savings" label="Savings you’d add" help="Cash beyond what the sale leaves you." optional>
                <MoneyInput id="sim-savings" value={f.savings} onChange={setMoney('savings')} placeholder="0" />
              </Field>
              <Field id="sim-hoa" label="Monthly HOA" optional>
                <MoneyInput id="sim-hoa" value={f.hoa} onChange={setMoney('hoa')} placeholder="0" />
              </Field>
              <Field id="sim-income" label="Household income per month" help="Before taxes. Makes the answer sharper. Stays on this page." optional>
                <MoneyInput id="sim-income" value={f.income} onChange={setMoney('income')} placeholder="8,500" />
              </Field>
              <Field id="sim-debts" label="Other monthly debt payments" help="Car, student loans, card minimums." optional>
                <MoneyInput id="sim-debts" value={f.debts} onChange={setMoney('debts')} placeholder="600" />
              </Field>
            </div>

            {error && <p className="sys-sim-error" role="alert">{error}</p>}
            <div className="sys-sim-actions">
              <button type="button" className="sys-sim-btn sys-sim-btn--ghost" onClick={() => { setError(''); setStep(1); }}>
                Back
              </button>
              <button type="button" className="sys-sim-btn" onClick={goResults}>
                Show me the answer
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className={`sys-sim-verdict sys-sim-verdict--${r.tier}`} role="status">
              <p className="sys-sim-verdict-kicker">The honest answer</p>
              <h2 className="sys-sim-verdict-head">{r.headline}</h2>
              <p className="sys-sim-verdict-sub">{r.sub}</p>
              {r.tier === 'tight' &&
                r.flags.slice(1).map((t) => (
                  <p key={t} className="sys-sim-verdict-sub sys-sim-verdict-more">
                    {t}
                  </p>
                ))}
              {r.fix && <p className="sys-sim-verdict-fix">{r.fix}</p>}
            </div>

            <div className="sys-sim-stats">
              <div className="sys-sim-stat">
                <p className="sys-sim-stat-label">You’d walk away with</p>
                <p className="sys-sim-stat-num">{money(r.net)}</p>
                <p className="sys-sim-stat-note">{r.net < 0 ? 'you’d bring this to closing' : 'after costs and payoff'}</p>
              </div>
              <div className="sys-sim-stat">
                <p className="sys-sim-stat-label">Your new monthly payment</p>
                <p className="sys-sim-stat-num">{money(r.buy.total)}</p>
                <p className="sys-sim-stat-note">
                  {r.shortfall ? `at ${MIN_DOWN_PCT}% down, once the gap closes` : r.currentPayment ? `vs ${money(r.currentPayment)} now` : 'taxes and insurance included'}
                </p>
              </div>
              {r.shortfall ? (
                <div className="sys-sim-stat">
                  <p className="sys-sim-stat-label">Cash short by</p>
                  <p className="sys-sim-stat-num">{money(r.totalGap)}</p>
                  <p className="sys-sim-stat-note">to sell and buy at {MIN_DOWN_PCT}% down</p>
                </div>
              ) : (
                <div className="sys-sim-stat">
                  <p className="sys-sim-stat-label">Down payment</p>
                  <p className="sys-sim-stat-num">{money(r.buy.down)}</p>
                  <p className="sys-sim-stat-note">{Math.round(r.buy.downPct)}% of {money(r.price)}</p>
                </div>
              )}
            </div>

            <details className="sys-sim-details">
              <summary>How the sale adds up</summary>
              <div className="sys-sim-rows">
                <div className="sys-sim-row"><span>Home value</span><span>{money(r.value)}</span></div>
                <div className="sys-sim-row"><span>Commission ({r.commissionPct}%)</span><span>-{money(r.commission)}</span></div>
                <div className="sys-sim-row"><span>Closing costs ({SELLER_CLOSING_PCT}%)</span><span>-{money(r.sellerClosing)}</span></div>
                <div className="sys-sim-row"><span>Repairs and concessions ({r.condition.label.toLowerCase()})</span><span>-{money(r.repairs)}</span></div>
                <div className="sys-sim-row"><span>Mortgage payoff</span><span>-{money(r.payoff)}</span></div>
                <div className="sys-sim-row sys-sim-row--total"><span>You walk away with</span><span>{money(r.net)}</span></div>
              </div>
            </details>

            <details className="sys-sim-details">
              <summary>How the payment adds up</summary>
              <div className="sys-sim-rows">
                <div className="sys-sim-row"><span>Principal and interest ({MORTGAGE_RATE}%, {LOAN_TERM_YEARS} years)</span><span>{money(r.buy.pi)}</span></div>
                <div className="sys-sim-row"><span>Property tax, {r.area.label}</span><span>{money(r.buy.tax)}</span></div>
                <div className="sys-sim-row"><span>Homeowners insurance</span><span>{money(r.buy.insurance)}</span></div>
                <div className="sys-sim-row"><span>Mortgage insurance</span><span>{money(r.buy.pmi)}</span></div>
                <div className="sys-sim-row"><span>HOA</span><span>{money(r.buy.hoa)}</span></div>
                <div className="sys-sim-row sys-sim-row--total"><span>New monthly payment</span><span>{money(r.buy.total)}</span></div>
                <p className="sys-sim-rownote">Buyer closing costs of about {money(r.buy.buyerClosing)} come out of your cash before the down payment.</p>
              </div>
            </details>

            {r.notes.length > 0 && (
              <div className="sys-sim-notes">
                <h3>Worth knowing</h3>
                {r.notes.map((n) => (
                  <p key={n}>{n}</p>
                ))}
              </div>
            )}

            <div className="sys-sim-card sys-sim-lead">
              {status === 'sent' ? (
                <div role="status">
                  <h3 className="sys-sim-lead-head">Sent.</h3>
                  <p className="sys-sim-help">
                    Your breakdown is on its way to {lead.email}.
                    {intent !== 'email' && ' Colby will reach out to you personally.'}
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="sys-sim-lead-head">What do you want next?</h3>
                  <fieldset className="sys-sim-fieldset">
                    <legend className="sys-sim-visually-hidden">Choose what happens next</legend>
                    <div className="sys-sim-choices sys-sim-choices--stack">
                      {intents.map((o) => (
                        <label key={o.id} className={`sys-sim-choice ${intent === o.id ? 'is-on' : ''}`}>
                          <input type="radio" name="sim-intent" value={o.id} checked={intent === o.id} onChange={(e) => setIntent(e.target.value)} />
                          <span>{o.label}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="sys-sim-grid sys-sim-lead-grid">
                    <Field id="sim-name" label="Name">
                      <input id="sim-name" className="sys-sim-input" type="text" autoComplete="name" value={lead.name} onChange={setLeadField('name')} />
                    </Field>
                    <Field id="sim-email" label="Email">
                      <input id="sim-email" className="sys-sim-input" type="email" autoComplete="email" value={lead.email} onChange={setLeadField('email')} />
                    </Field>
                    <Field id="sim-phone" label="Phone" optional={intent === 'email'}>
                      <input id="sim-phone" className="sys-sim-input" type="tel" autoComplete="tel" value={lead.phone} onChange={setLeadField('phone')} />
                    </Field>
                    <Field id="sim-timeframe" label="When would you like to move?" optional>
                      <select id="sim-timeframe" className="sys-sim-select" value={lead.timeframe} onChange={setLeadField('timeframe')}>
                        <option value="">Choose one</option>
                        <option>In the next 3 months</option>
                        <option>3 to 6 months</option>
                        <option>6 to 12 months</option>
                        <option>1 to 2 years</option>
                        <option>Not sure yet</option>
                      </select>
                    </Field>
                  </div>

                  {intent !== 'email' && (
                    <Field id="sim-address" label="Your current home’s address" help="Lets Colby pull real comps instead of a guess." optional>
                      <input id="sim-address" className="sys-sim-input" type="text" autoComplete="street-address" value={lead.address} onChange={setLeadField('address')} />
                    </Field>
                  )}

                  <input
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={lead.company_website}
                    onChange={setLeadField('company_website')}
                    style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden', opacity: 0 }}
                  />

                  {leadError && <p className="sys-sim-error" role="alert">{leadError}</p>}
                  <div className="sys-sim-actions sys-sim-actions--end">
                    <button type="button" className="sys-sim-btn" onClick={submitLead} disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending...' : intents.find((o) => o.id === intent)?.label || 'Send'}
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="sys-sim-actions">
              <button type="button" className="sys-sim-btn sys-sim-btn--ghost" onClick={() => setStep(1)}>
                Change my numbers
              </button>
              <button type="button" className="sys-sim-link" onClick={startOver}>
                Start over
              </button>
            </div>

            <p className="sys-sim-fine">
              Estimates only. Uses a {MORTGAGE_RATE}% {LOAN_TERM_YEARS}-year fixed rate ({RATE_SOURCE}, {RATE_AS_OF}),
              homesteaded property tax for the area you picked, and typical Alabama closing costs. Your lender, insurer,
              and actual sale price will change these numbers. This is not a loan approval or an appraisal. Colby Williams,
              Realtor, Innovative Realty Solutions.
            </p>
          </div>
        )}

        <div className="sys-sim-badges">
          <span className="sys-sim-badge">
            <img src="/images/equal-housing-opportunity.jpg" alt="Equal Housing Opportunity" height="52"
              onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'inline'; }} />
            <span className="sys-sim-badge-text" style={{ display: 'none' }}>Equal Housing Opportunity</span>
          </span>
          <span className="sys-sim-badge">
            <img src="/images/realtor-logo.jpg" alt="REALTOR®" height="52"
              onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'inline'; }} />
            <span className="sys-sim-badge-text" style={{ display: 'none' }}>REALTOR®</span>
          </span>
        </div>
      </div>
    </section>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&display=swap');

.sys-sim { background: #F4F1EB; color: #000; font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif; padding: clamp(40px, 7vw, 88px) 20px clamp(56px, 8vw, 104px); scroll-margin-top: 80px; }
.sys-sim *, .sys-sim *::before, .sys-sim *::after { box-sizing: border-box; }
.sys-sim-wrap { max-width: 760px; margin: 0 auto; }

.sys-sim-eyebrow { font-family: 'Times New Roman', Times, serif; font-style: italic; font-size: 18px; color: #A52831; margin: 0 0 10px; }
.sys-sim-title { font-family: 'Bricolage Grotesque', 'Inter', sans-serif; font-weight: 800; font-size: clamp(48px, 10vw, 92px); line-height: 0.92; letter-spacing: -0.035em; margin: 0 0 20px; }
.sys-sim-lede { font-size: clamp(17px, 2.2vw, 19px); line-height: 1.55; max-width: 36em; margin: 0 0 36px; color: #333; }

.sys-sim-progress { margin: 0 0 16px; }
.sys-sim-bars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-bottom: 10px; }
.sys-sim-bar { height: 5px; border-radius: 3px; background: #ddd6ca; transition: background 0.3s ease; }
.sys-sim-bar.is-on { background: #A52831; }
.sys-sim-stepname { font-size: 15px; font-weight: 600; margin: 0; }

.sys-sim-card { background: #fff; border-radius: 14px; box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.06); padding: clamp(22px, 4vw, 36px); }

.sys-sim-grid { display: grid; grid-template-columns: 1fr 1fr; column-gap: 20px; }
.sys-sim-field { margin: 0 0 22px; }
.sys-sim-fieldset { border: 0; padding: 0; margin: 0 0 22px; min-width: 0; }
.sys-sim-label { display: block; font-weight: 600; font-size: 16px; margin: 0 0 4px; padding: 0; }
.sys-sim-opt { font-weight: 400; color: #666; }
.sys-sim-help { font-size: 14px; line-height: 1.45; color: #555; margin: 0 0 8px; }

.sys-sim-inputwrap { position: relative; display: flex; align-items: center; }
.sys-sim-affix { position: absolute; left: 14px; font-size: 18px; color: #555; pointer-events: none; }
.sys-sim-affix--right { left: auto; right: 14px; }
.sys-sim-input, .sys-sim-select { width: 100%; font: inherit; font-size: 18px; padding: 13px 14px; border: 1.5px solid #d9d4ca; border-radius: 10px; background: #fff; color: #000; appearance: none; -webkit-appearance: none; }
.sys-sim-select { background-image: linear-gradient(45deg, transparent 50%, #000 50%), linear-gradient(135deg, #000 50%, transparent 50%); background-position: calc(100% - 20px) 50%, calc(100% - 14px) 50%; background-size: 6px 6px; background-repeat: no-repeat; padding-right: 40px; }
.sys-sim-input--pre { padding-left: 30px; }
.sys-sim-input--suf { padding-right: 38px; }
.sys-sim-input:focus, .sys-sim-select:focus { outline: none; border-color: #A52831; box-shadow: 0 0 0 3px rgba(165,40,49,0.2); }
.sys-sim-short { max-width: 160px; }

.sys-sim-choices { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.sys-sim-choices--stack { grid-template-columns: 1fr; }
.sys-sim-choice { position: relative; display: flex; align-items: center; min-height: 52px; padding: 12px 16px; border: 1.5px solid #d9d4ca; border-radius: 10px; font-size: 16px; font-weight: 500; cursor: pointer; background: #fff; }
.sys-sim-choice input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.sys-sim-choice.is-on { border-color: #A52831; background: #FBF4F3; box-shadow: inset 0 0 0 1px #A52831; }
.sys-sim-choice:focus-within { box-shadow: 0 0 0 3px rgba(165,40,49,0.25); }

.sys-sim-actions { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
.sys-sim-actions--end { justify-content: flex-end; }
.sys-sim-btn { font: inherit; font-size: 17px; font-weight: 600; padding: 15px 26px; border-radius: 999px; border: 1.5px solid #A52831; background: #A52831; color: #fff; cursor: pointer; }
.sys-sim-btn:hover { background: #8C1F28; border-color: #8C1F28; }
.sys-sim-btn:disabled { opacity: 0.6; cursor: wait; }
.sys-sim-btn--ghost { background: transparent; color: #000; border-color: #000; }
.sys-sim-btn--ghost:hover { background: #000; color: #F4F1EB; border-color: #000; }
.sys-sim-btn:focus-visible, .sys-sim-link:focus-visible { outline: 3px solid rgba(165,40,49,0.45); outline-offset: 3px; }
.sys-sim-link { font: inherit; font-size: 16px; background: none; border: 0; padding: 8px 0; color: #000; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
.sys-sim-error { color: #A52831; font-weight: 600; font-size: 15px; margin: 4px 0 0; }

.sys-sim-verdict { position: relative; overflow: hidden; background: #000; color: #F4F1EB; border-radius: 14px; padding: clamp(28px, 5vw, 48px) clamp(26px, 5vw, 48px) clamp(28px, 5vw, 44px) clamp(34px, 6vw, 60px); }
.sys-sim-verdict::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 8px; background: #A52831; }
.sys-sim-verdict--yes::before { background: #F4F1EB; }
.sys-sim-verdict-kicker { font-family: 'Times New Roman', Times, serif; font-style: italic; font-size: 18px; color: #cfc6b6; margin: 0; }
.sys-sim-verdict-head { font-family: 'Bricolage Grotesque', 'Inter', sans-serif; font-weight: 800; font-size: clamp(50px, 11vw, 100px); line-height: 0.92; letter-spacing: -0.04em; margin: 8px 0 20px; animation: sysSimIn 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
.sys-sim-verdict-sub { font-size: clamp(18px, 2.4vw, 21px); line-height: 1.5; max-width: 32em; margin: 0; }
.sys-sim-verdict-more { margin-top: 12px; }
.sys-sim-verdict-fix { font-size: 17px; line-height: 1.5; color: #e6dfd2; max-width: 34em; margin: 20px 0 0; padding-top: 18px; border-top: 1px solid rgba(244,241,235,0.2); }
@keyframes sysSimIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }

.sys-sim-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #e4ded3; border-radius: 14px; overflow: hidden; margin: 20px 0; box-shadow: 0 12px 32px rgba(0,0,0,0.06); }
.sys-sim-stat { background: #fff; padding: 22px 20px; }
.sys-sim-stat-label { font-size: 14px; color: #555; margin: 0 0 6px; }
.sys-sim-stat-num { font-family: 'Bricolage Grotesque', 'Inter', sans-serif; font-weight: 700; font-size: clamp(26px, 3.4vw, 32px); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; margin: 0; }
.sys-sim-stat-note { font-size: 13px; color: #666; margin: 4px 0 0; }

.sys-sim-details { background: #fff; border-radius: 14px; box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.05); margin: 0 0 12px; }
.sys-sim-details summary { padding: 18px 22px; font-weight: 600; font-size: 16px; cursor: pointer; }
.sys-sim-details summary:focus-visible { outline: 3px solid rgba(165,40,49,0.45); outline-offset: -3px; border-radius: 14px; }
.sys-sim-rows { padding: 0 22px 18px; }
.sys-sim-row { display: flex; justify-content: space-between; gap: 16px; padding: 10px 0; border-bottom: 1px solid #eee8de; font-size: 15px; font-variant-numeric: tabular-nums; }
.sys-sim-row span:last-child { white-space: nowrap; }
.sys-sim-row--total { font-weight: 700; font-size: 16px; border-bottom: 0; padding-top: 14px; }
.sys-sim-rownote { font-size: 13px; color: #666; margin: 6px 0 0; }

.sys-sim-notes { margin: 28px 0; }
.sys-sim-notes h3 { font-family: 'Bricolage Grotesque', 'Inter', sans-serif; font-weight: 700; font-size: 22px; letter-spacing: -0.01em; margin: 0 0 10px; }
.sys-sim-notes p { font-size: 16px; line-height: 1.55; color: #333; margin: 0 0 10px; max-width: 38em; }

.sys-sim-lead { margin-top: 28px; position: relative; }
.sys-sim-lead-head { font-family: 'Bricolage Grotesque', 'Inter', sans-serif; font-weight: 700; font-size: clamp(24px, 3.4vw, 30px); letter-spacing: -0.02em; margin: 0 0 16px; }
.sys-sim-lead-grid { margin-top: 8px; }

.sys-sim-fine { font-size: 13px; line-height: 1.5; color: #555; margin: 32px 0 0; max-width: 46em; }
.sys-sim-badges { display: flex; align-items: center; gap: 28px; flex-wrap: wrap; margin-top: 40px; padding-top: 24px; border-top: 1px solid #ddd6ca; }
.sys-sim-badge { display: inline-flex; align-items: center; }
.sys-sim-badge img { height: 52px; width: auto; display: block; mix-blend-mode: multiply; }
.sys-sim-badge-text { font-size: 13px; font-weight: 600; color: #333; }
.sys-sim-visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

@media (max-width: 640px) {
  .sys-sim-grid, .sys-sim-choices, .sys-sim-stats { grid-template-columns: 1fr; }
  .sys-sim-actions .sys-sim-btn { flex: 1 1 auto; }
}
@media (prefers-reduced-motion: reduce) {
  .sys-sim-verdict-head { animation: none; }
  .sys-sim-bar { transition: none; }
}
`;
