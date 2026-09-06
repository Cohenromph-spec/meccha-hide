import { Route, Routes } from 'react-router-dom';
import AppShell from './components/layout/AppShell.jsx';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import Play from './pages/Play.jsx';
import PatternLogicGame from './pages/games/PatternLogicGame.jsx';
import CriticalThinkingGame from './pages/games/CriticalThinkingGame.jsx';
import Journey from './pages/Journey.jsx';
import Library from './pages/Library.jsx';
import Profile from './pages/Profile.jsx';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/play" element={<Play />} />
        <Route path="/play/pattern-logic" element={<PatternLogicGame />} />
        <Route path="/play/critical-thinking" element={<CriticalThinkingGame />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/library" element={<Library />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AppShell>
  );
}
