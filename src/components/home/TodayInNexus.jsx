import { useEffect, useState } from 'react';
import { discoveryContent } from '../../data/discoveryContent.js';
import { pickForToday } from '../../lib/daily.js';
import { getAIDiscoveryOfTheDay } from '../../lib/ai.js';
import { useUser } from '../../context/UserContext.jsx';
import DiscoveryTile from '../discovery/DiscoveryTile.jsx';
import DailyPuzzleCard from './DailyPuzzleCard.jsx';
import './TodayInNexus.css';

const aiDiscoveries = discoveryContent.filter((d) => d.category === 'ai');
const otherDiscoveries = discoveryContent.filter((d) => d.category !== 'ai');

export default function TodayInNexus() {
  const { authUser } = useUser();
  // Hand-authored fallback shown immediately, replaced the moment (if ever)
  // a real AI-generated card comes back — never a loading spinner on the
  // homepage for this. See lib/ai.js: null means "not configured or not
  // signed in", not an error, so this is the expected steady state until
  // the Cloud Functions proxy is actually deployed.
  const [aiPick, setAiPick] = useState(() => pickForToday(aiDiscoveries, 1));
  const randomPick = pickForToday(otherDiscoveries, 7);

  useEffect(() => {
    let cancelled = false;
    getAIDiscoveryOfTheDay(authUser).then((discovery) => {
      if (!cancelled && discovery) setAiPick({ ...discovery, source: 'ai' });
    });
    return () => {
      cancelled = true;
    };
  }, [authUser]);

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
