const PATHS = {
  circle: <circle cx="12" cy="12" r="9" />,
  square: <rect x="4" y="4" width="16" height="16" rx="2" />,
  triangle: <path d="M12 3.5 21 20H3Z" />,
  diamond: <path d="M12 2 22 12 12 22 2 12Z" />,
};

export default function ShapeIcon({ type, size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      {PATHS[type] ?? PATHS.circle}
    </svg>
  );
}
