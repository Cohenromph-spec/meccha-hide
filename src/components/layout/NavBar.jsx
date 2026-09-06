import { NavLink } from 'react-router-dom';
import { IconHome, IconExplore, IconPlay, IconJourney, IconLibrary, IconProfile } from './icons.jsx';
import { useUser } from '../../context/UserContext.jsx';
import './NavBar.css';

const LINKS = [
  { to: '/', label: 'Home', Icon: IconHome, end: true },
  { to: '/explore', label: 'Explore', Icon: IconExplore },
  { to: '/play', label: 'Play', Icon: IconPlay },
  { to: '/journey', label: 'Journey', Icon: IconJourney },
  { to: '/library', label: 'Library', Icon: IconLibrary },
  { to: '/profile', label: 'Profile', Icon: IconProfile },
];

export default function NavBar() {
  const { isLocalOnly } = useUser();

  return (
    <nav className="nexus-nav">
      <div className="nexus-nav__brand">
        <div className="nexus-nav__mark" />
        <span className="nexus-nav__wordmark">Nexus</span>
      </div>

      <div className="nexus-nav__links">
        {LINKS.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `nexus-nav__link${isActive ? ' active' : ''}`}
          >
            <Icon />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>

      <div className="nexus-nav__footer">
        {isLocalOnly ? 'Local-only mode — progress saved on this device.' : 'Synced'}
      </div>
    </nav>
  );
}
