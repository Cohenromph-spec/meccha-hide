import PageHeader from '../components/common/PageHeader.jsx';
import ContinueExploring from '../components/home/ContinueExploring.jsx';
import KnowledgeNetwork from '../components/network/KnowledgeNetwork.jsx';
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
        <KnowledgeNetwork />
      </div>
    </div>
  );
}
