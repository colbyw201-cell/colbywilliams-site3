import { Bricolage_Grotesque, Inter } from "next/font/google";

import { Footer } from "@/components/sections/footer";
import { contact } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import "../home.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", weight: ["500", "600", "700", "800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const URL = `${SITE_URL}/privacy`;
const UPDATED = "October 12, 2026";

export const metadata = {
  title: "Privacy Policy | Colby Williams, Realtor",
  description: "How Colby Williams, Realtor with Innovative Realty Solutions, collects, uses, and protects your information.",
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
};

const s = {
  main: { maxWidth: 760, margin: "0 auto", padding: "64px 20px 80px", color: "#16130f", fontFamily: "var(--font-inter), system-ui, sans-serif", lineHeight: 1.7 },
  back: { color: "#a52831", textDecoration: "none", fontWeight: 600, fontSize: 14 },
  h1: { fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700, fontSize: 44, lineHeight: 1.1, margin: "24px 0 8px" },
  updated: { color: "#57534c", fontSize: 14, margin: "0 0 32px" },
  h2: { fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 600, fontSize: 24, margin: "40px 0 8px" },
  p: { margin: "0 0 14px", fontSize: 16 },
  ul: { margin: "0 0 14px", paddingLeft: 22, fontSize: 16, listStyle: "disc" },
  a: { color: "#a52831" },
};

function Section({ title, children }) {
  return (
    <section>
      <h2 style={s.h2}>{title}</h2>
      {children}
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className={`home ${bricolage.variable} ${inter.variable}`}>
      <main style={s.main}>
        <a href="/" style={s.back}>&larr; Back to home</a>
        <h1 style={s.h1}>Privacy Policy</h1>
        <p style={s.updated}>Last updated {UPDATED}</p>

        <p style={s.p}>
          This policy explains how I, {contact.name}, a Realtor with {contact.brokerage} in {contact.city}, collect,
          use, and protect the information you share through colbywilliamsrealtor.com and when we work together. I keep
          it simple: I use your information to help you buy or sell a home, and I never sell it.
        </p>

        <Section title="What I collect">
          <ul style={s.ul}>
            <li><strong>What you give me:</strong> your name, email, phone number, and anything you type into a form,
              such as a property address, price range, timeline, the areas you like, or a message.</li>
            <li><strong>Your texting choice:</strong> whether you agreed to receive text messages, and the wording you agreed to.</li>
            <li><strong>Basic website data:</strong> like most websites, this site uses Google Analytics, which uses
              cookies to count visits and see which pages are useful. It does not tell me who you are.</li>
          </ul>
        </Section>

        <Section title="How I use it">
          <ul style={s.ul}>
            <li>To answer your request and follow up about buying or selling a home.</li>
            <li>To send homes, home values, or market updates you asked for.</li>
            <li>To keep notes on our conversations so I can help you well and not ask the same questions twice.</li>
            <li>To schedule showings and appointments.</li>
          </ul>
        </Section>

        <Section title="Text messages">
          <p style={s.p}>
            I only text you if you agreed to it or we already have a working relationship. Texts are sent personally by
            me, from my own phone. Message and data rates may apply, and how often you hear from me depends on your
            home search or sale. Reply <strong>STOP</strong> at any time to stop texts, or <strong>HELP</strong> for help.
          </p>
          <p style={s.p}>
            Your mobile number and texting permission are never sold or shared with anyone for their marketing.
          </p>
        </Section>

        <Section title="Emails">
          <p style={s.p}>
            Every email I send includes a way to unsubscribe. Reply <strong>STOP</strong> or &ldquo;unsubscribe&rdquo; and
            I will stop emailing you.
          </p>
        </Section>

        <Section title="Who I share it with">
          <p style={s.p}>I do not sell, rent, or trade your information. I only share it:</p>
          <ul style={s.ul}>
            <li>With my brokerage, {contact.brokerage}, as required for real estate transactions.</li>
            <li>With a lender, title company, inspector, or other professional, only when you ask me to or a transaction needs it.</li>
            <li>With the services that make this site and my email work (website hosting, the service that delivers form
              emails to me, Google for email and calendar, and Google Analytics). They handle it only to provide that service.</li>
            <li>When the law requires it.</li>
          </ul>
        </Section>

        <Section title="Google account data">
          <p style={s.p}>
            I use a private tool on my own computer to keep track of my clients. With my permission, it reads my own
            Gmail to pick up messages from my website and emails with my clients, puts appointments on my Google Calendar,
            and sends emails I approve. That information stays on my computer and is used only to serve my clients. It is
            never sold, never used for advertising, and never used to train AI.
          </p>
          <p style={s.p}>
            Its use of information received from Google APIs adheres to the{" "}
            <a style={s.a} href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">
              Google API Services User Data Policy</a>, including the Limited Use requirements.
          </p>
        </Section>

        <Section title="How I protect it">
          <p style={s.p}>
            Your information is kept on my own password-protected, encrypted computer, not in a public online database.
            Backups are encrypted. Only I can see it.
          </p>
        </Section>

        <Section title="How long I keep it">
          <p style={s.p}>
            I keep your information while we are working together and afterward so I can stay in touch and help with your
            next move, unless you ask me to delete it.
          </p>
        </Section>

        <Section title="Your choices">
          <p style={s.p}>
            You can ask me at any time to see the information I have about you, correct it, stop contacting you, or delete
            it. Just email <a style={s.a} href={`mailto:${contact.email}`}>{contact.email}</a> or call or text{" "}
            <a style={s.a} href={`tel:${contact.tel}`}>{contact.phone}</a>.
          </p>
        </Section>

        <Section title="Children">
          <p style={s.p}>This site is meant for adults. I do not knowingly collect information from children under 13.</p>
        </Section>

        <Section title="Changes">
          <p style={s.p}>If I change this policy, I will update the date at the top of this page.</p>
        </Section>

        <Section title="Contact">
          <p style={s.p}>
            {contact.name}, {contact.brokerage}<br />
            {contact.city}<br />
            <a style={s.a} href={`mailto:${contact.email}`}>{contact.email}</a> &middot;{" "}
            <a style={s.a} href={`tel:${contact.tel}`}>{contact.phone}</a>
          </p>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
