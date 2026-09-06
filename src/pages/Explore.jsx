import PageHeader from '../components/common/PageHeader.jsx';
import ComingSoon from '../components/common/ComingSoon.jsx';
import ContinueExploring from '../components/home/ContinueExploring.jsx';
import './Explore.css';

export default function Explore() {
  return (
    <div className="explore-page">
      <PageHeader
        title="Explore"
        subtitle="Your Knowledge Network — every idea you've touched, and how it connects to everything else."
      />

      <ContinueExploring />

      <div className="explore-page__network">
        <ComingSoon
          phase="Phase 2"
          title="The Knowledge Network"
          description="An interactive, living map of your ideas — zoom, pan, and follow connections across AI, Psychology, Philosophy, and the World. This is the centerpiece of Nexus, built next."
        />
      </div>
    </div>
  );
}
