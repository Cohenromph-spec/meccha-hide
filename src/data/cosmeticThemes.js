/**
 * Character cosmetics — Phase 7. Deliberately CSS/SVG-only (a gradient +
 * glow recolor of the existing silhouette, see CharacterSilhouette.jsx) —
 * no art asset pipeline, no external dependency, nothing that needs an
 * artist or an AI image call to exist. Purely a Memory Token sink, never
 * required for content, per the original ComingSoon copy.
 *
 * `default` is always unlocked and free — everyone starts here.
 *
 * Colors were flat/dull in the first pass (Cohen's feedback) — repicked
 * for more saturation and contrast against the dark background, not just
 * "a gradient between two hues." `void` additionally gets `glass: true`:
 * an actual translucent-glass treatment (semi-opaque fill so the ambient
 * background shows through, a light edge stroke, a diagonal specular
 * highlight) rendered specially in CharacterSilhouette.jsx — "Voidglass"
 * should look like glass, not like a plain gray recolor.
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
    gradientFrom: '#ffb347',
    gradientTo: '#ff3d5a',
    glow: '#ff5a3c',
  },
  {
    id: 'verdant',
    name: 'Verdant',
    cost: 30,
    gradientFrom: '#8bffb0',
    gradientTo: '#0ea85f',
    glow: '#2be88a',
  },
  {
    id: 'violet',
    name: 'Violet Echo',
    cost: 50,
    gradientFrom: '#c4a5ff',
    gradientTo: '#6d28d9',
    glow: '#a855f7',
  },
  {
    id: 'gold',
    name: 'Gilded',
    cost: 75,
    gradientFrom: '#ffe28a',
    gradientTo: '#c8790a',
    glow: '#ffb020',
  },
  {
    id: 'void',
    name: 'Voidglass',
    cost: 100,
    gradientFrom: '#eef4ff',
    gradientTo: '#7c8bab',
    glow: '#bcd4ff',
    glass: true,
  },
];

export function themeById(id) {
  return cosmeticThemes.find((t) => t.id === id) ?? cosmeticThemes[0];
}
