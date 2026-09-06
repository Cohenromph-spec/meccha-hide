import { useState } from 'react';
import PageHeader from '../components/common/PageHeader.jsx';
import ComingSoon from '../components/common/ComingSoon.jsx';
import CharacterSilhouette from '../components/character/CharacterSilhouette.jsx';
import { useUser } from '../context/UserContext.jsx';
import { logIn, signUp, logOut } from '../lib/auth.js';
import { IconToken } from '../components/layout/icons.jsx';
import './Profile.css';

function AuthPanel() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === 'login') {
        await logIn(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="auth-panel" onSubmit={submit}>
      <div className="auth-panel__tabs">
        <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>
          Log In
        </button>
        <button type="button" className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>
          Sign Up
        </button>
      </div>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input
        type="password"
        placeholder="Password (6+ characters)"
        minLength={6}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="auth-panel__error">{error}</p>}
      <button type="submit" className="auth-panel__submit" disabled={busy}>
        {mode === 'login' ? 'Log In' : 'Create Account'}
      </button>
      <p className="auth-panel__hint">
        Syncs your progress across devices. Skip this and Nexus keeps working, saved to this device only.
      </p>
    </form>
  );
}

export default function Profile() {
  const { authUser, isLocalOnly, profile } = useUser();

  return (
    <div className="profile-page">
      <PageHeader title="Profile" subtitle="Your character, your account, your Nexus." />

      <div className="profile-page__character">
        <CharacterSilhouette size={96} glow />
        <div className="profile-page__tokens">
          <IconToken width={18} height={18} />
          <span>{profile.memoryTokens} Memory Tokens</span>
        </div>
        <ComingSoon
          phase="Phase 7"
          title="Character Customization"
          description="Spend Memory Tokens on cosmetics, accessories, and effects — earned through exploration, never required for content."
        />
      </div>

      <div className="profile-page__account">
        <h3>Account</h3>
        {isLocalOnly ? (
          <p className="profile-page__notice">
            No Firebase project connected yet — Nexus is running in local-only mode. Progress is saved on this
            device only until a Firebase config is added (see .env.example).
          </p>
        ) : authUser ? (
          <div className="profile-page__signed-in">
            <p>
              Signed in as <strong>{authUser.email}</strong>
            </p>
            <button className="profile-page__logout" onClick={logOut}>
              Log Out
            </button>
          </div>
        ) : (
          <AuthPanel />
        )}
      </div>
    </div>
  );
}
