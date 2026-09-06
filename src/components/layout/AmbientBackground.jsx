import './AmbientBackground.css';

/**
 * A slow-drifting field of soft colored glows, fixed behind the whole app.
 * Purely decorative — pointer-events disabled, negative z-index so it never
 * competes with content, and it only ever shows through the gaps between
 * solid-background cards/nav. Cheap on purpose: radial-gradient blobs
 * animated with `transform` only (GPU compositor, no layout/paint cost per
 * frame) rather than an expensive `filter: blur()` on large elements or a
 * canvas/JS animation loop — this exists to make the app feel alive, not
 * to spend a phone's battery doing it.
 */
export default function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-bg__blob ambient-bg__blob--brand" />
      <div className="ambient-bg__blob ambient-bg__blob--ai" />
      <div className="ambient-bg__blob ambient-bg__blob--philosophy" />
      <div className="ambient-bg__blob ambient-bg__blob--psychology" />
    </div>
  );
}
