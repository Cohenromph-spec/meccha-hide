import './CharacterSilhouette.css';

/**
 * Phase 1 character foundation: a simple, mysterious silhouette — no
 * cosmetics yet (that's Phase 7). Deliberately subtle per spec §22: it
 * should make the app feel inhabited without competing for attention.
 */
export default function CharacterSilhouette({ size = 64, glow = false }) {
  return (
    <svg
      className={`nexus-character${glow ? ' nexus-character--glow' : ''}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
    >
      <ellipse cx="32" cy="58" rx="16" ry="3.5" fill="var(--bg)" opacity="0.4" />
      <path
        d="M32 8c-5 0-8.5 4-8.5 9 0 3.6 1.8 6.6 4.3 8.3-6.8 2-11.8 8.6-11.8 16.4v6.8h32v-6.8c0-7.8-5-14.4-11.8-16.4 2.5-1.7 4.3-4.7 4.3-8.3 0-5-3.5-9-8.5-9Z"
        fill="url(#nexus-character-gradient)"
      />
      <defs>
        <linearGradient id="nexus-character-gradient" x1="16" y1="8" x2="48" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--brand)" />
          <stop offset="1" stopColor="#4f8bff" />
        </linearGradient>
      </defs>
    </svg>
  );
}
