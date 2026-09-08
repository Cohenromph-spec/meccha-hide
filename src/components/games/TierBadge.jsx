import './TierBadge.css';

const TIER_LABEL = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

/** Shared difficulty badge — same look across every tiered game. */
export default function TierBadge({ tier }) {
  return <span className={`tier-badge tier-badge--${tier}`}>{TIER_LABEL[tier]}</span>;
}
