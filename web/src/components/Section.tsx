import type { ReactNode } from "react";

interface SectionProps {
  heading: string;
  lede: string;
  anchor?: string;
  children?: ReactNode;
}

export function Section({ heading, lede, anchor, children }: SectionProps) {
  return (
    <section id={anchor}>
      <h2>{heading}</h2>
      <p className="lede">{lede}</p>
      {children}
    </section>
  );
}
