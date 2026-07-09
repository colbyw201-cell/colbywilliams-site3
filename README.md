# Colby Williams — colbywilliamsrealtor.com

Next.js site with a lead-capture pipeline that **saves first, emails second**, so a
lead is never lost even if email hiccups.

---

## What I (Claude) already did
- Built the full site (`app/page.jsx`) with all your images in `public/images/`.
- Wired the "Get my home value" form to `POST /api/lead`.
- Built the `/api/lead` endpoint: optional Supabase save, then Resend email to you.
- SEO metadata + RealEstateAgent schema in `app/layout.jsx`.
- Spam honeypot + graceful error message on the form.

## What you have to do (accounts/keys/DNS — I can't create these for you)
Follow the steps below in order. Budget ~30–45 minutes.

---

### STEP 1 — Get the code onto your computer
1. Download this folder.
2. Install Node.js 18+ from https://nodejs.org if you don't have it.
3. In a terminal, inside this folder, run:
   ```
   npm install
   npm run dev
   ```
   Open http://localhost:3000 — the site runs locally. The form won't send yet
   (no keys), and that's expected.

---

### STEP 2 — Email delivery with Resend (required for leads to reach you)
1. Create a free account at https://resend.com.
2. Go to **Domains → Add Domain** and enter `colbywilliamsrealtor.com`.
3. Resend shows you a few DNS records (SPF / DKIM / DMARC). Keep this tab open.
4. In a new tab, log in to **Cloudflare → your domain → DNS → Records**.
5. Add each record Resend listed (copy Type, Name, and Value exactly). Save.
6. Back in Resend, click **Verify**. It may take a few minutes to go green.
   > This is the step that makes email land in your inbox instead of spam. Don't skip it.
7. Go to **API Keys → Create API Key**. Copy the key (starts with `re_`).

---

### STEP 3 — (Recommended) Never-lose-a-lead safety net with Supabase
Skip this to launch faster; you can add it later. It saves every lead to a table
*before* the email is attempted.
1. Create a free project at https://supabase.com.
2. Open **SQL Editor**, paste this, and run it:
   ```sql
   create table leads (
     id uuid primary key default gen_random_uuid(),
     created_at timestamptz default now(),
     first_name text, last_name text, email text,
     phone text, address text, source text
   );
   ```
3. Go to **Project Settings → API**. Copy the **Project URL** and the
   **service_role** key (the secret one, not anon).

---

### STEP 4 — Deploy on Vercel and add your keys
1. Push this folder to a new GitHub repo (or use Vercel's drag-and-drop).
2. Create a free account at https://vercel.com and **Import** the repo.
3. Before deploying, open **Environment Variables** and add:
   | Name | Value |
   |------|-------|
   | `RESEND_API_KEY` | your `re_...` key from Step 2 |
   | `LEAD_TO_EMAIL` | `colbywilliamsre@gmail.com` |
   | `LEAD_FROM_EMAIL` | `leads@colbywilliamsrealtor.com` |
   | `SUPABASE_URL` | (only if you did Step 3) |
   | `SUPABASE_SERVICE_ROLE_KEY` | (only if you did Step 3) |
4. Click **Deploy**. You'll get a temporary `*.vercel.app` URL. Test the form —
   a lead should hit your Gmail.

---

### STEP 5 — Point your domain
1. In Vercel: **Project → Settings → Domains → Add** `colbywilliamsrealtor.com`.
2. Vercel gives you a DNS record. Add it in **Cloudflare → DNS** (Vercel shows the
   exact Type/Name/Value). If Cloudflare's proxy (orange cloud) causes issues, set
   that record to "DNS only" (grey cloud).
3. Wait for it to verify. Your site is live on your domain.

---

## Testing the pipeline
- Submit the home-value form. You should get an email titled
  "New lead: … (Home valuation form)". Reply to it and it goes straight to the person.
- If Supabase is set up, check **Table Editor → leads** to see the saved row.

## Troubleshooting
- **No email but form says success:** you're saved in Supabase but Resend failed —
  check the Resend dashboard logs and that the domain is verified (Step 2.6).
- **Email in spam:** domain not fully verified, or `LEAD_FROM_EMAIL` isn't on your
  verified domain.
- **Form shows the error message:** neither Supabase nor Resend accepted it — check
  your env var names in Vercel match exactly.

## Editing content later
- Text, listing details, FAQ, reviews: all in `app/page.jsx`.
- Photos: replace files in `public/images/` (keep the same filenames).
- Your license number was removed from the footer per your request — add it back in
  `app/page.jsx` (footer) if your broker requires it.
