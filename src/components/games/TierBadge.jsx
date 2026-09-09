import './TierBadge.css';

// 'connection'/'integration'/'expert' are Human Behavior's deeper 5-tier
// ladder (see data/humanBehaviorScenarios.js) — every other game still
// only ever uses easy/medium/hard.
const TIER_LABEL = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  connection: 'Connection',
  integration: 'Integration',
  expert: 'Expert',
};

/** Shared difficulty badge — same look across every tiered game. */
export default function TierBadge({ tier }) {
  return <span className={`tier-badge tier-badge--${tier}`}>{TIER_LABEL[tier]}</span>;
}
