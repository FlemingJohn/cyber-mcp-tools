interface MarkIconProps {
  shape: "shield" | "ring" | "cross";
}

export function MarkIcon({ shape }: MarkIconProps) {
  return (
    <svg viewBox="0 0 64 64" width="44" height="44" aria-hidden="true" className="markIcon">
      <defs>
        <linearGradient id={`icon-${shape}`} x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5b9bff" />
          <stop offset="1" stopColor="#1b46b8" />
        </linearGradient>
      </defs>
      {shape === "shield" ? (
        <path
          fill={`url(#icon-${shape})`}
          d="M32 5 L55 13.5 V33 C55 45 44.5 53.5 32 58 C19.5 53.5 9 45 9 33 V13.5 Z"
        />
      ) : null}
      {shape === "ring" ? (
        <circle cx="32" cy="32" r="21" fill="none" stroke={`url(#icon-${shape})`} strokeWidth="10" />
      ) : null}
      {shape === "cross" ? (
        <path
          fill={`url(#icon-${shape})`}
          d="M26 8 H38 V26 H56 V38 H38 V56 H26 V38 H8 V26 H26 Z"
        />
      ) : null}
    </svg>
  );
}
