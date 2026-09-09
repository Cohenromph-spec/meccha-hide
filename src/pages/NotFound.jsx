import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader.jsx';
import './NotFound.css';

/**
 * Catch-all for any URL that isn't a real route. There wasn't one before —
 * a typo'd link or a stale bookmark just rendered a blank page inside the
 * app shell (nav visible, no content, no error). Found while auditing the
 * app for what "done without AI" actually requires.
 */
export default function NotFound() {
  return (
    <div className="not-found">
      <PageHeader title="Nothing here" subtitle="That page doesn't exist in Nexus." />
      <Link to="/" className="not-found__home">
        ← Back to Home
      </Link>
    </div>
  );
}
