import CharacterSilhouette from '../character/CharacterSilhouette.jsx';
import { useUser } from '../../context/UserContext.jsx';
import { IconToken } from '../layout/icons.jsx';
import './UserHeader.css';

export default function UserHeader() {
  const { authUser, profile, levelInfo, title } = useUser();
  const name = authUser?.email ? authUser.email.split('@')[0] : 'Explorer';
  const percent = Math.round(levelInfo.progress * 100);

  return (
    <header className="user-header">
      <CharacterSilhouette size={56} glow />

      <div className="user-header__identity">
        <div className="user-header__name-row">
          <h1 className="user-header__name">{name}</h1>
          <span className="user-header__title">{title}</span>
        </div>

        <div className="user-header__xp">
          <div className="user-header__xp-track">
            <div className="user-header__xp-fill" style={{ width: `${percent}%` }} />
          </div>
          <span className="user-header__xp-label">
            Level {levelInfo.level} · {levelInfo.xpIntoLevel} / {levelInfo.xpForNext} XP
          </span>
        </div>
      </div>

      <div className="user-header__tokens" title="Memory Tokens — spend on cosmetics in Profile">
        <IconToken width={18} height={18} />
        <span>{profile.memoryTokens}</span>
      </div>
    </header>
  );
}
