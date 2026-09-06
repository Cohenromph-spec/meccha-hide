import PageHeader from '../components/common/PageHeader.jsx';
import ComingSoon from '../components/common/ComingSoon.jsx';

export default function Play() {
  return (
    <div>
      <PageHeader title="Play" subtitle="Games that make you think, not shallow engagement traps." />
      <ComingSoon
        phase="Phase 6"
        title="The Game Arcade"
        description="Logic, Detective, Human Behavior, and Critical Thinking games — a few polished ones, not ten shallow quizzes."
      />
    </div>
  );
}
