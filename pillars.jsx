import { Stagger, StaggerItem } from "@/components/motion";
import { pillars } from "@/lib/content";
export function Pillars() {
  return (
    <section aria-label="Why work with Colby" className="bg-ink text-cream border-t border-white/10">
      <Stagger
        as="ol"
        className="mx-auto grid max-w-7xl gap-px px-5 py-16 sm:px-8 md:grid-cols-3 md:py-20"
        gap={0.12}
      >
        {pillars.map((p, i) => (
          <StaggerItem as="li" key={p.title} className="group relative py-6 md:px-8 md:first:pl-0">
            <span className="font-display text-red text-sm font-bold tracking-widest">0{i + 1}</span>
            <h3 className="font-display mt-4 text-2xl font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-3 leading-relaxed text-white/65">{p.body}</p>
            <span
              aria-hidden="true"
              className="bg-red absolute bottom-0 left-0 h-px w-full origin-left scale-x-[0.15] transition-transform duration-700 ease-out group-hover:scale-x-100 md:left-8 md:w-[calc(100%-4rem)] md:group-first:left-0"
            />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
