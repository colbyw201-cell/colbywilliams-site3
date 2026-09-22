import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
const variants = {
  primary: "bg-red text-white hover:bg-red-deep",
  outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-cream",
  light: "bg-cream text-ink hover:bg-white",
  ghostLight: "border border-white/25 text-white hover:border-white hover:bg-white/10",
};
export function ButtonLink({ children, variant = "primary", arrow = true, icon, className, ...props }) {
  return (
    <a
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-sm font-semibold tracking-wide transition-colors duration-300",
        variants[variant],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
        />
      )}
    </a>
  );
}
