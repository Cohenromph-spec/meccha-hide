/** Category → label/accent-var mapping, shared by every content tile. */
export const CATEGORIES = {
  ai: { label: 'AI', var: '--accent-ai' },
  psychology: { label: 'Psychology', var: '--accent-psychology' },
  philosophy: { label: 'Philosophy', var: '--accent-philosophy' },
  world: { label: 'World', var: '--accent-world' },
  communication: { label: 'Communication', var: '--accent-communication' },
  science: { label: 'Science', var: '--accent-ai' },
  random: { label: 'Discovery', var: '--accent-world' },
};

export function categoryAccent(category) {
  return `var(${CATEGORIES[category]?.var ?? '--brand'})`;
}

export function categoryLabel(category) {
  return CATEGORIES[category]?.label ?? 'Discovery';
}
