import { discoveryContent } from '../../data/discoveryContent.js';
import { pickForToday } from '../../lib/daily.js';
import DiscoveryTile from '../discovery/DiscoveryTile.jsx';
import DailyPuzzleCard from './DailyPuzzleCard.jsx';
import './TodayInNexus.css';

const aiDiscoveries = discoveryContent.filter((d) => d.category === 'ai');
const otherDiscoveries = discoveryContent.filter((d) => d.category !== 'ai');

export default function TodayInNexus() {
  const aiPick = pickForToday(aiDiscoveries, 1);
  const randomPick = pickForToday(otherDiscoveries, 7);

  return (
    <section className="today-nexus">
      <h3 className="today-nexus__heading">Today in Nexus</h3>
      <div className="today-nexus__grid">
        <DiscoveryTile discovery={aiPick} />
        <DiscoveryTile discovery={randomPick} />
      </div>
      <DailyPuzzleCard />
    </section>
  );
}
