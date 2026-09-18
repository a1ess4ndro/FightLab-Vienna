import Link from "next/link";
import type { ComponentProps } from "react";

const base =
  "inline-grid min-h-[2.75rem] content-center border px-s3 py-s2 font-mono text-[0.6875rem] tracking-[0.12em] uppercase no-underline transition-colors duration-[120ms] ease-linear";

const variants = {
  /** Hauptaktion: gefüllt in Bandrot. Genau eine pro Fläche. */
  solid: "border-band bg-band text-ground hover:border-mark hover:bg-mark",
  /** Alles andere: Kontur. Kein dritter Stil. */
  outlineLight:
    "border-ink bg-transparent text-ink hover:bg-ink hover:text-ground",
  outlineDark:
    "border-chalk2 bg-transparent text-chalk hover:bg-chalk hover:text-night",
} as const;

type Props = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
};

export function Cta({ variant = "solid", className = "", ...props }: Props) {
  return (
    <Link
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
    />
  );
}
