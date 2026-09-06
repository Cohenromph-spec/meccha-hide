import { Route, Routes } from 'react-router-dom';
import AppShell from './components/layout/AppShell.jsx';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import Play from './pages/Play.jsx';
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
        <Route path="/journey" element={<Journey />} />
        <Route path="/library" element={<Library />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AppShell>
  );
}
