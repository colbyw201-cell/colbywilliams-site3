import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { contact } from "@/lib/content";
const explore = [
  { href: "#listings", label: "Listings" },
  { href: "#valuation", label: "Home Value" },
  { href: "/should-i-move", label: "Should I Move?" },
  { href: "#faq", label: "FAQ" },
];
function Social({ href, label, d }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:border-red hover:bg-red"
    >
      <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
        <path d={d} />
      </svg>
    </a>
  );
}
export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image
            src="/images/logo-white.png"
            alt="Innovative Realty Solutions"
            width={473}
            height={300}
            className="h-16 w-auto"
          />
          <p className="mt-5 max-w-xs text-white/60">
            Helping people buy and sell homes in Athens, Madison, Huntsville, and across North Alabama.
          </p>
          <div className="mt-6 flex gap-2">
            <Social
              href={contact.facebook}
              label="Facebook"
              d="M14 9h3V5h-3c-2.8 0-4 1.8-4 4.5V11H7v4h3v7h4v-7h3l1-4h-4V9.5c0-.4.3-.5.5-.5Z"
            />
            <Social
              href={contact.instagram}
              label="Instagram"
              d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm5.5-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
            />
          </div>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow">Explore</p>
          <ul className="mt-5 space-y-1">
            {explore.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex min-h-10 items-center text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <p className="eyebrow">Get in touch</p>
          <ul className="mt-5 space-y-3 text-white/70">
            <li className="flex items-center gap-3">
              <MapPin className="text-red size-4" aria-hidden="true" /> {contact.city}
            </li>
            <li>
              <a
                href={`tel:${contact.tel}`}
                className="flex min-h-10 items-center gap-3 transition-colors hover:text-white"
              >
                <Phone className="text-red size-4" aria-hidden="true" /> {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex min-h-10 items-center gap-3 break-all transition-colors hover:text-white"
              >
                <Mail className="text-red size-4 shrink-0" aria-hidden="true" /> {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 py-6 text-xs tracking-[0.14em] text-white/45 uppercase sm:flex-row sm:items-center sm:px-8">
          <p>© {new Date().getFullYear()} Colby Williams · Innovative Realty Solutions</p>
          <Image
            src="/images/compliance.png"
            alt="Equal Housing Opportunity and Realtor logos"
            width={189}
            height={96}
            className="h-10 w-auto opacity-70"
          />
        </div>
      </div>
    </footer>
  );
}
