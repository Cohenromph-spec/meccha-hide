/**
 * Character cosmetics — Phase 7. Deliberately CSS/SVG-only (a gradient +
 * glow recolor of the existing silhouette, see CharacterSilhouette.jsx) —
 * no art asset pipeline, no external dependency, nothing that needs an
 * artist or an AI image call to exist. Purely a Memory Token sink, never
 * required for content, per the original ComingSoon copy.
 *
 * `default` is always unlocked and free — everyone starts here, matching
 * the silhouette's original fixed brand-blue gradient.
 */
export const cosmeticThemes = [
  {
    id: 'default',
    name: 'Origin',
    cost: 0,
    gradientFrom: 'var(--brand)',
    gradientTo: '#4f8bff',
    glow: 'var(--brand)',
  },
  {
    id: 'ember',
    name: 'Ember',
    cost: 30,
    gradientFrom: '#ff8a4c',
    gradientTo: '#ff4d6d',
    glow: '#ff8a4c',
  },
  {
    id: 'verdant',
    name: 'Verdant',
    cost: 30,
    gradientFrom: '#4ade80',
    gradientTo: '#16a34a',
    glow: '#4ade80',
  },
  {
    id: 'violet',
    name: 'Violet Echo',
    cost: 50,
    gradientFrom: '#a78bfa',
    gradientTo: '#7c3aed',
    glow: '#a78bfa',
  },
  {
    id: 'gold',
    name: 'Gilded',
    cost: 75,
    gradientFrom: '#fbbf24',
    gradientTo: '#d97706',
    glow: '#fbbf24',
  },
  {
    id: 'void',
    name: 'Voidglass',
    cost: 100,
    gradientFrom: '#e2e8f0',
    gradientTo: '#475569',
    glow: '#e2e8f0',
  },
];

export function themeById(id) {
  return cosmeticThemes.find((t) => t.id === id) ?? cosmeticThemes[0];
}
