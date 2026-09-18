import { useEffect, useState } from "react";

export function useRotatingTerm(terms: string[], everyMilliseconds: number): string {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % terms.length);
    }, everyMilliseconds);
    return () => window.clearInterval(timer);
  }, [terms.length, everyMilliseconds]);

  return terms[index] ?? terms[0] ?? "";
}
