import type { ReactNode } from "react";

interface FigureProps {
  src: string;
  alt: string;
  narrow?: boolean;
  eager?: boolean;
  children: ReactNode;
}

export function Figure({ src, alt, narrow, eager, children }: FigureProps) {
  return (
    <figure className={narrow ? "figure is-narrow reveal" : "figure reveal"}>
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
      <figcaption>{children}</figcaption>
    </figure>
  );
}
