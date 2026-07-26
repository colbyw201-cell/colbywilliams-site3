import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const esc = (s) =>
  String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));

export async function POST(request) {
  try {
    const data = await request.json();

    // Honeypot. If a bot fills this hidden field, quietly accept and drop it.
    if (data.company) {
      return Response.json({ ok: true });
    }

    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const phone = (data.phone || "").trim();
    const priceRange = (data.priceRange || "Not specified").trim();
    const area = (data.area || "Not specified").trim();
    const timeline = (data.timeline || "Not specified").trim();
    const financing = (data.financing || "Not specified").trim();
    const notes = (data.notes || "").trim();

    if (!name || !email || !phone) {
      return Response.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Plain text. Clean "Label: value" lines so the Gmail import script parses cleanly.
    const text = [
      "New buyer lead from colbywilliamsrealtor.com",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Price Range: ${priceRange}`,
      `Area: ${area}`,
      `Timeline: ${timeline}`,
      `Financing: ${financing}`,
      `Notes: ${notes || "None"}`,
    ].join("\n");

    const html = `
      <div style="font-family: Inter, Arial, sans-serif; color: #1a1a1a; max-width: 560px;">
        <p style="font-size: 12px; letter-spacing: 1px; color: #A52831; text-transform: uppercase; margin: 0 0 4px;">New Buyer Lead</p>
        <h2 style="font-size: 20px; margin: 0 0 16px;">${esc(name)} wants to start a home search</h2>
        <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
          <tr><td style="padding: 6px 0; color: #6b6b6b; width: 130px;">Name</td><td style="padding: 6px 0;">${esc(name)}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b6b6b;">Email</td><td style="padding: 6px 0;"><a href="mailto:${esc(email)}" style="color: #A52831;">${esc(email)}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #6b6b6b;">Phone</td><td style="padding: 6px 0;"><a href="tel:${esc(phone)}" style="color: #A52831;">${esc(phone)}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #6b6b6b;">Price Range</td><td style="padding: 6px 0;">${esc(priceRange)}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b6b6b;">Area</td><td style="padding: 6px 0;">${esc(area)}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b6b6b;">Timeline</td><td style="padding: 6px 0;">${esc(timeline)}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b6b6b;">Financing</td><td style="padding: 6px 0;">${esc(financing)}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b6b6b; vertical-align: top;">Notes</td><td style="padding: 6px 0;">${esc(notes) || "None"}</td></tr>
        </table>
      </div>
    `;

    await resend.emails.send({
      from: "Colby Williams Website <leads@colbywilliamsrealtor.com>",
      to: "colbywilliamsre@gmail.com",
      replyTo: email, // reply straight to the buyer from your inbox
      subject: `New Buyer Lead: ${name}`,
      text,
      html,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Buyer form error:", err);
    return Response.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
