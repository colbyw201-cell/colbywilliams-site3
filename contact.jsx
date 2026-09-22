import { MessageSquare, Phone } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/button";
import { Magnetic, MaskLines, Parallax, Reveal } from "@/components/motion";
import { contact } from "@/lib/content";
export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <div className="bg-ink text-cream relative grid items-center gap-10 overflow-hidden rounded-[2.5rem] p-8 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
        <div
          aria-hidden="true"
          className="bg-red/25 absolute -top-40 -left-20 size-[30rem] rounded-full blur-3xl"
        />
        <div className="relative">
          <Reveal>
            <p className="eyebrow">Let’s talk</p>
          </Reveal>
          <MaskLines
            className="font-display mt-5 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.03em]"
            lines={["Ready when", "you are."]}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
              Six months out or ready this week? Reach out and I’ll help you figure out the smart next step.
              No pressure, ever.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <ButtonLink
                href={`tel:${contact.tel}`}
                variant="light"
                arrow={false}
                icon={<Phone className="size-4" aria-hidden="true" />}
              >
                Call Colby
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink
                href={`sms:${contact.tel}`}
                variant="ghostLight"
                arrow={false}
                icon={<MessageSquare className="size-4" aria-hidden="true" />}
              >
                Text Colby
              </ButtonLink>
            </Magnetic>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 text-sm text-white/50">
              {contact.phone} · {contact.email}
            </p>
          </Reveal>
        </div>
        <Reveal y={40} className="relative">
          <Parallax offset={40} className="aspect-[3/2] rounded-[1.75rem]">
            <Image
              src="/images/sold.jpg"
              alt="Colby Williams holding a Sold sign in front of a home"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
