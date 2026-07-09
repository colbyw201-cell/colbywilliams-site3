// POST /api/lead
// Reliability model: SAVE FIRST, EMAIL SECOND.
// A lead is never lost even if email delivery fails.

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const data = await req.json();

    // Honeypot: real users never fill this; bots do. Pretend success.
    if (data.company) return Response.json({ ok: true });

    const {
      address = "",
      firstName = "",
      lastName = "",
      email = "",
      phone = "",
      source = "Website",
    } = data || {};

    if (!email || !firstName) {
      return new Response("Missing required fields", { status: 400 });
    }

    let saved = false;

    // 1) SAVE FIRST — Supabase (optional but recommended safety net)
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/leads`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            address,
            first_name: firstName,
            last_name: lastName,
            email,
            phone,
            source,
          }),
        });
        saved = r.ok;
        if (!r.ok) console.error("Supabase save failed:", await r.text());
      } catch (e) {
        console.error("Supabase save error:", e);
      }
    }

    // 2) EMAIL — Resend
    let emailed = false;
    if (process.env.RESEND_API_KEY) {
      const to = process.env.LEAD_TO_EMAIL || "colbywilliamsre@gmail.com";
      const from = process.env.LEAD_FROM_EMAIL || "leads@colbywilliamsrealtor.com";
      const html = `
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1a1a1a">
          <h2 style="color:#a52831;margin:0 0 12px">New lead from your website</h2>
          <p style="margin:0 0 4px"><strong>Source:</strong> ${escapeHtml(source)}</p>
          <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
          <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p style="margin:0 0 4px"><strong>Phone:</strong> ${escapeHtml(phone || "not provided")}</p>
          <p style="margin:0 0 4px"><strong>Property address:</strong> ${escapeHtml(address || "not provided")}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
          <p style="color:#888;font-size:12px;margin:0">Reply directly to this email to reach the person.</p>
        </div>`;
      try {
        const r = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: `Colby Williams Website <${from}>`,
            to: [to],
            reply_to: email,
            subject: `New lead: ${firstName} ${lastName} (${source})`,
            html,
          }),
        });
        emailed = r.ok;
        if (!r.ok) console.error("Resend failed:", await r.text());
      } catch (e) {
        console.error("Resend error:", e);
      }
    }

    // Succeed if the lead was captured by EITHER path.
    if (saved || emailed) return Response.json({ ok: true });

    // Nothing worked (or nothing configured).
    return new Response("Delivery not configured or failed", { status: 502 });
  } catch (e) {
    console.error("Lead route error:", e);
    return new Response("Server error", { status: 500 });
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}
