interface ShieldMarkProps {
  size: number;
  idPrefix: string;
}

export function ShieldMark({ size, idPrefix }: ShieldMarkProps) {
  const shield = "M32 5 L55 13.5 V33 C55 45 44.5 53.5 32 58 C19.5 53.5 9 45 9 33 V13.5 Z";
  const arrow = "M41.5 20.5 L41.5 33.5 L36.8 28.8 L26.5 39.1 L22.9 35.5 L33.2 25.2 L28.5 20.5 Z";
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" className="mark">
      <defs>
        <linearGradient id={`${idPrefix}-body`} x1="9" y1="5" x2="55" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6cc4ff" />
          <stop offset="0.42" stopColor="#2f6bf0" />
          <stop offset="1" stopColor="#12328f" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-sheen`} x1="14" y1="7" x2="34" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${idPrefix}-clip`}>
          <path d={shield} />
        </clipPath>
      </defs>
      <path fill={`url(#${idPrefix}-body)`} fillRule="evenodd" d={`${shield} ${arrow}`} />
      <g clipPath={`url(#${idPrefix}-clip)`}>
        <path fill={`url(#${idPrefix}-sheen)`} d="M9 5 H36 L18 58 H9 Z" />
      </g>
    </svg>
  );
}
