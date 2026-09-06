import UserHeader from '../components/home/UserHeader.jsx';
import TodaysPhilosophy from '../components/home/TodaysPhilosophy.jsx';
import TodayInNexus from '../components/home/TodayInNexus.jsx';
import ContinueExploring from '../components/home/ContinueExploring.jsx';
import LiveChallenges from '../components/home/LiveChallenges.jsx';
import SurpriseMe from '../components/home/SurpriseMe.jsx';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <UserHeader />

      <div className="home__columns">
        <div className="home__main">
          <TodaysPhilosophy />
          <TodayInNexus />
          <ContinueExploring />
        </div>

        <div className="home__side">
          <SurpriseMe />
          <LiveChallenges />
        </div>
      </div>
    </div>
  );
}
