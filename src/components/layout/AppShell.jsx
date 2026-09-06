import NavBar from './NavBar.jsx';
import './AppShell.css';

export default function AppShell({ children }) {
  return (
    <div className="nexus-shell">
      <NavBar />
      <main className="nexus-shell__main">{children}</main>
    </div>
  );
}
