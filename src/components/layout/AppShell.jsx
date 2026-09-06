import NavBar from './NavBar.jsx';
import AmbientBackground from './AmbientBackground.jsx';
import './AppShell.css';

export default function AppShell({ children }) {
  return (
    <>
      <AmbientBackground />
      <div className="nexus-shell">
        <NavBar />
        <main className="nexus-shell__main">{children}</main>
      </div>
    </>
  );
}
