import { useId } from 'react';
import { cosmeticThemes } from '../../data/cosmeticThemes.js';
import './CharacterSilhouette.css';

const CHARACTER_PATH =
  'M32 8c-5 0-8.5 4-8.5 9 0 3.6 1.8 6.6 4.3 8.3-6.8 2-11.8 8.6-11.8 16.4v6.8h32v-6.8c0-7.8-5-14.4-11.8-16.4 2.5-1.7 4.3-4.7 4.3-8.3 0-5-3.5-9-8.5-9Z';

/**
 * Phase 1 character foundation, now Phase 7 cosmetic-aware: the same
 * silhouette shape, recolored per the equipped theme (see
 * data/cosmeticThemes.js) — deliberately still just a color/glow swap,
 * never a different shape, per spec §22 ("make the app feel inhabited
 * without competing for attention").
 *
 * The glow is a separate blurred layer behind the SVG (`.nexus-character__glow`,
 * a plain radial-gradient div), not a CSS `filter: drop-shadow(...)` on the
 * SVG itself. That was the first version, and it had a real bug: an SVG
 * element's UA-default `overflow` is `hidden`, so the drop-shadow's blur
 * got clipped at the SVG's own box edges — visible as a soft rectangular
 * "box" behind the character instead of a round glow (Cohen caught this).
 * A separate, larger, `overflow`-unconstrained div behind the SVG doesn't
 * have that failure mode at all.
 */
export default function CharacterSilhouette({ size = 64, glow = false, themeId = 'default' }) {
  const theme = cosmeticThemes.find((t) => t.id === themeId) ?? cosmeticThemes[0];
  const uid = useId();
  const gradientId = `nexus-character-gradient-${uid}`;
  const clipId = `nexus-character-clip-${uid}`;

  return (
    <span className="nexus-character-wrap" style={{ width: size, height: size }}>
      {glow && (
        <span
          className="nexus-character__glow"
          style={{ background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)` }}
        />
      )}
      <svg className="nexus-character" width={size} height={size} viewBox="0 0 64 64" fill="none">
        <ellipse cx="32" cy="58" rx="16" ry="3.5" fill="var(--bg)" opacity="0.4" />
        <path
          d={CHARACTER_PATH}
          fill={`url(#${gradientId})`}
          fillOpacity={theme.glass ? 0.6 : 1}
          stroke={theme.glass ? 'rgba(255,255,255,0.6)' : 'none'}
          strokeWidth={theme.glass ? 0.75 : 0}
        />
        {/* Voidglass only: a diagonal specular streak clipped to the
            silhouette's own shape, like light catching an edge of glass. */}
        {theme.glass && (
          <g clipPath={`url(#${clipId})`}>
            <ellipse cx="23" cy="18" rx="9" ry="24" fill="white" opacity="0.3" transform="rotate(-20 23 18)" />
          </g>
        )}
        <defs>
          <linearGradient id={gradientId} x1="16" y1="8" x2="48" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={theme.gradientFrom} />
            <stop offset="1" stopColor={theme.gradientTo} />
          </linearGradient>
          {theme.glass && (
            <clipPath id={clipId}>
              <path d={CHARACTER_PATH} />
            </clipPath>
          )}
        </defs>
      </svg>
    </span>
  );
}
