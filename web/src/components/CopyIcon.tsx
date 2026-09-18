interface CopyIconProps {
  isDone: boolean;
}

export function CopyIcon({ isDone }: CopyIconProps) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
      {isDone ? (
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 12.5 L9.5 18 L20 6.5"
        />
      ) : (
        <g fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round">
          <rect x="9" y="9" width="11" height="11" rx="2.5" />
          <path d="M5.5 15 H4.5 A1.5 1.5 0 0 1 3 13.5 V4.5 A1.5 1.5 0 0 1 4.5 3 h9 A1.5 1.5 0 0 1 15 4.5 v1" />
        </g>
      )}
    </svg>
  );
}
