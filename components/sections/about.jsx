import Image from "next/image";
import { MaskLines, Parallax, Reveal } from "@/components/motion";
import { about } from "@/lib/content";
export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:pb-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal y={40}>
              <Parallax offset={50} className="aspect-[4/5] rounded-[2rem]">
                <Image
                  src="/images/headshot.jpg"
                  alt="Colby Williams, Athens Alabama real estate agent"
                  fill
                  sizes="(min-width: 1024px) 35vw, 90vw"
                  className="object-cover object-top"
                />
              </Parallax>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-10">
          <Reveal>
            <p className="eyebrow">Meet Colby</p>
          </Reveal>
          <MaskLines
            className="font-display mt-5 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1] font-bold tracking-[-0.03em]"
            lines={[
              "A local guide,",
              <span key="n" className="text-ink-soft">
                not a sales pitch.
              </span>,
            ]}
          />

          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed">{about[0]}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <blockquote className="border-red font-display my-10 border-l-4 py-1 pl-6 text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">
              You work with me directly, start to finish. No handoffs, no call center, no pressure.
            </blockquote>
          </Reveal>

          {about.slice(1).map((p) => (
            <Reveal key={p.slice(0, 20)} delay={0.05}>
              <p className="text-ink-soft mt-6 text-lg leading-relaxed">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
