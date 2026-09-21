const TO = 'colbywilliamsre@gmail.com';
const FROM = 'Colby Williams <leads@colbywilliamsrealtor.com>';

const clean = (v, max = 400) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const INTENT_LABELS = {
  email: 'Emailed breakdown only',
  verify: 'Wants Colby to check real numbers',
  plan: 'Wants a plan to get there',
};

async function sendEmail(payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend ${res.status}: ${text}`);
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }

  // Honeypot: bots fill it, people never see it
  if (body.company_website) return Response.json({ ok: true });

  const intent = ['email', 'verify', 'plan'].includes(body.intent) ? body.intent : 'email';
  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const address = clean(body.address, 250);
  const timeframe = clean(body.timeframe, 60);
  const s = body.summary || {};

  if (!name) return Response.json({ ok: false, error: 'Name is required' }, { status: 400 });
  if (!isEmail(email)) return Response.json({ ok: false, error: 'Valid email is required' }, { status: 400 });
  if (intent !== 'email' && phone.replace(/[^0-9]/g, '').length < 10)
    return Response.json({ ok: false, error: 'Phone is required' }, { status: 400 });

  const saleLines = Array.isArray(s.saleLines) ? s.saleLines.map((l) => clean(l, 120)) : [];
  const paymentLines = Array.isArray(s.paymentLines) ? s.paymentLines.map((l) => clean(l, 120)) : [];

  // Lead email to Colby, plain Label: value lines for the Gmail Apps Script parser
  const leadText = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not given'}`,
    `Address: ${address || 'Not given'}`,
    `Message: Should I Move tool. Verdict: ${clean(s.verdict)} ${INTENT_LABELS[intent]}.`,
    `Source: Should I Move Tool`,
    `Lead Type: Seller and Buyer`,
    `Request: ${INTENT_LABELS[intent]}`,
    `Timeframe: ${timeframe || 'Not given'}`,
    `Verdict: ${clean(s.verdict)}`,
    `Reason: ${clean(s.reason)}`,
    `Fix: ${clean(s.fix) || 'None'}`,
    `Home Value Estimate: ${clean(s.homeValue)}`,
    `Mortgage Payoff: ${clean(s.payoff)}`,
    `Condition: ${clean(s.condition)}`,
    `Commission Used: ${clean(s.commission)}`,
    `Estimated Net Proceeds: ${clean(s.netProceeds)}`,
    `Target Price: ${clean(s.targetPrice)}`,
    `Target Area: ${clean(s.area)}`,
    `Down Payment: ${clean(s.downPayment)}`,
    `New Monthly Payment: ${clean(s.newPayment)}`,
    `Current Monthly Payment: ${clean(s.currentPayment)}`,
    `Current Rate: ${clean(s.currentRate)}`,
    `Debt To Income: ${clean(s.dti)}`,
    `Cash Short By: ${clean(s.cashShort)}`,
    `Rate Used: ${clean(s.rate)}`,
  ].join('\n');

  const firstName = name.split(' ')[0];
  const nextStep =
    intent === 'email'
      ? 'If you want me to run real comps on your house instead of an estimate, just reply to this email.'
      : "I'll reach out personally to go over your real numbers. If you want to talk sooner, reply here or call or text me.";

  const userText = [
    `Hi ${firstName},`,
    '',
    "Here's your Should I Move breakdown.",
    '',
    `${clean(s.verdict)}`,
    `${clean(s.reason)}`,
    s.fix ? `${clean(s.fix)}` : '',
    '',
    'THE SALE',
    ...saleLines,
    '',
    'THE NEXT HOME',
    `Price: ${clean(s.targetPrice)} in ${clean(s.area)}`,
    `Down payment: ${clean(s.downPayment)}`,
    ...paymentLines,
    '',
    `These are estimates using a ${clean(s.rate)} rate, homesteaded property tax for the area you picked, and typical Alabama closing costs. They are not a loan approval or an appraisal.`,
    '',
    nextStep,
    '',
    'Colby Williams, Realtor',
    'Innovative Realty Solutions',
    '256-710-2384',
    'colbywilliamsrealtor.com',
  ]
    .filter((line, i, arr) => !(line === '' && arr[i - 1] === ''))
    .join('\n');

  try {
    await sendEmail({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `New lead: Should I Move (${clean(s.verdict, 40)}) - ${name}`,
      text: leadText,
    });
  } catch (err) {
    console.error('Should I Move lead email failed:', err);
    return Response.json({ ok: false, error: 'Could not send' }, { status: 500 });
  }

  try {
    await sendEmail({
      from: FROM,
      to: [email],
      reply_to: TO,
      subject: 'Your Should I Move breakdown',
      text: userText,
    });
  } catch (err) {
    // Lead already reached Colby, so do not fail the request
    console.error('Should I Move visitor email failed:', err);
  }

  return Response.json({ ok: true });
}
