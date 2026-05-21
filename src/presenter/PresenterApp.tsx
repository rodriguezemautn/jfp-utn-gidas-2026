import { useEffect, useRef, useState } from 'react';
import { useSlideSync } from '../hooks/useSlideSync';
import { useElapsedTimer } from '../hooks/useElapsedTimer';
import { TOTAL_SLIDES, SLIDE_STATUSES } from '../types';
import { getSlideNote } from './slideNotes';

/**
 * ─────────────────────────────────────────────────────────
 *  PRESENTER VIEW
 *  Second window for the speaker's laptop.
 *  Shows: timer, slide notes, mini preview, nav controls.
 *  Syncs with the kiosk window via BroadcastChannel.
 *  ─────────────────────────────────────────────────────────
 */

/* ── Mini preview card ── */

function SlidePreview({ slideIndex }: { slideIndex: number }) {
  const note = getSlideNote(slideIndex);
  const percent = ((slideIndex + 1) / TOTAL_SLIDES) * 100;
  const status = SLIDE_STATUSES[slideIndex] ?? '';

  return (
    <div className="slide-preview">
      {/* Top bar */}
      <div className="preview-topbar">
        <span className="preview-dot" />
        <span className="preview-label">SLIDE {String(slideIndex + 1).padStart(2, '0')}</span>
        <span className="preview-label">{status}</span>
      </div>

      {/* Content area */}
      <div className="preview-body">
        <div className="preview-number">
          {String(slideIndex + 1).padStart(2, '0')}
          <span className="preview-total">/{TOTAL_SLIDES}</span>
        </div>
        <div className="preview-title">{note?.title ?? '—'}</div>
        {note?.timeRange && <div className="preview-time">{note.timeRange}</div>}
      </div>

      {/* Progress bar */}
      <div className="preview-progress-track">
        <div className="preview-progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

/* ── Notes panel ── */

function NotesPanel({ slideIndex }: { slideIndex: number }) {
  const note = getSlideNote(slideIndex);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to top when slide changes
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [slideIndex]);

  if (!note) {
    return (
      <div className="notes-empty">
        <span className="text-accent-green">⚠</span> Sin notas disponibles para esta slide.
      </div>
    );
  }

  return (
    <div className="notes-panel" ref={scrollRef}>
      {/* Direction / tone hint */}
      <div className="notes-direction">
        <span className="text-accent-green">◆</span> {note.direction}
      </div>

      <div className="notes-divider" />

      {/* The script */}
      <div className="notes-content">
        {note.notes.split('\n').map((line, i) => {
          // Empty line → spacing
          if (!line.trim()) return <div key={i} className="notes-spacer" />;

          // Stage direction [like this] → dimmed italic
          if (line.startsWith('[') || line.startsWith('→')) {
            return (
              <div key={i} className="notes-stage">
                {line}
              </div>
            );
          }

          // Bold lines (**text**) → highlighted
          if (line.startsWith('**') && line.endsWith('**')) {
            return (
              <div key={i} className="notes-bold">
                {line.slice(2, -2)}
              </div>
            );
          }

          // Bullet items
          if (line.startsWith('•') || line.startsWith('- ')) {
            return (
              <div key={i} className="notes-bullet">
                {line}
              </div>
            );
          }

          // Numbered items
          if (/^\d+\./.test(line)) {
            return (
              <div key={i} className="notes-numbered">
                {line}
              </div>
            );
          }

          // Blockquote
          if (line.startsWith('>')) {
            return (
              <div key={i} className="notes-quote">
                {line.replace(/^>\s?/, '')}
              </div>
            );
          }

          // Regular line
          return (
            <div key={i} className="notes-line">
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Navigation controls ── */

function NavControls({
  currentSlide,
  onPrev,
  onNext,
}: {
  currentSlide: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const atStart = currentSlide === 0;
  const atEnd = currentSlide === TOTAL_SLIDES - 1;

  return (
    <div className="nav-controls">
      <button
        onClick={onPrev}
        disabled={atStart}
        className="nav-btn"
      >
        ◀ PREV
      </button>

      <div className="nav-counter">
        <span className="nav-counter-current">
          {String(currentSlide + 1).padStart(2, '0')}
        </span>
        <span className="nav-counter-sep">/</span>
        <span className="nav-counter-total">{TOTAL_SLIDES}</span>
      </div>

      <button
        onClick={onNext}
        disabled={atEnd}
        className="nav-btn"
      >
        NEXT ▶
      </button>
    </div>
  );
}

/* ── Launch projector button ── */

function LaunchProjector() {
  const [opened, setOpened] = useState(false);

  // Leer coordenadas HDMI pasadas por el script de lanzamiento
  const params = new URLSearchParams(window.location.search);
  const hdmiX = parseInt(params.get('hdmiX') ?? '0', 10);
  const hdmiY = parseInt(params.get('hdmiY') ?? '0', 10);
  const hdmiW = parseInt(params.get('hdmiW') ?? '1366', 10);
  const hdmiH = parseInt(params.get('hdmiH') ?? '768', 10);
  const hasHdmi = params.has('hdmiX');

  const handleOpen = () => {
    if (opened) return;
    const features = `left=${hdmiX},top=${hdmiY},width=${hdmiW},height=${hdmiH},menubar=no,toolbar=no,location=no,status=no`;
    const kiosk = window.open('/', 'jpf-kiosk', features);
    if (kiosk) {
      setOpened(true);
      // Intentar fullscreen después de que cargue
      kiosk.addEventListener('load', () => {
        try { kiosk.document.documentElement.requestFullscreen(); } catch { /* KDE/Firefox puede rechazar */ }
      }, { once: true });
    }
  };

  return (
    <div className="launch-projector">
      {!opened ? (
        <button onClick={handleOpen} className="launch-btn">
          ▶ ABRIR PROYECTOR
        </button>
      ) : (
        <span className="launch-ok">
          ● PROYECTOR ACTIVO
          {hasHdmi && (
            <span className="launch-hdmi"> en HDMI ({hdmiX},{hdmiY})</span>
          )}
        </span>
      )}
    </div>
  );
}

/* ── Main presenter view ── */

export function PresenterApp() {
  const { currentSlide, nextSlide, prevSlide } = useSlideSync({
    enableKeyboard: true,
    listenOnly: false,
  });

  const elapsed = useElapsedTimer();

  // Track when the window opened (for display)
  const [startTime] = useState(() => new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }));

  const note = getSlideNote(currentSlide);
  const status = SLIDE_STATUSES[currentSlide] ?? '';
  const percent = ((currentSlide + 1) / TOTAL_SLIDES) * 100;

  // Expose the current slide index so external tools (e.g. OBS) can read it
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__jpfSlide = currentSlide;
  }, [currentSlide]);

  return (
    <div className="presenter-root">
      {/* ── Scanlines overlay (matching kiosk aesthetic) ── */}
      <div className="scanlines" />

      {/* ── Top bar ── */}
      <header className="presenter-topbar">
        <div className="topbar-left">
          <div className="pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-accent-green)' }} />
          <span className="topbar-brand">INFRAIT_LIVE</span>
          <span className="topbar-sep">|</span>
          <span className="topbar-sub">VISTA DEL PRESENTADOR</span>
        </div>

        <div className="topbar-center">
          <span className="topbar-status">{status}</span>
        </div>

        <div className="topbar-right">
          <LaunchProjector />
          <span className="topbar-sep">|</span>
          <span className="topbar-timer">⏱ {elapsed}</span>
          <span className="topbar-sep">|</span>
          <span className="topbar-start">Inicio: {startTime}</span>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="presenter-main">
        {/* Left: slide preview + metadata */}
        <section className="presenter-left">
          <SlidePreview slideIndex={currentSlide} />

          <div className="preview-meta">
            <div className="meta-row">
              <span className="meta-label">GUION</span>
              <span className="meta-value">SLIDE {note?.guionSlide ?? '—'}</span>
            </div>
            {note?.timeRange && (
              <div className="meta-row">
                <span className="meta-label">TIEMPO</span>
                <span className="meta-value">{note.timeRange}</span>
              </div>
            )}
            <div className="meta-row">
              <span className="meta-label">AVANCE</span>
              <span className="meta-value">{Math.round(percent)}%</span>
            </div>
          </div>

          {/* Additional tips */}
          <div className="preview-tips">
            <div className="tips-title">⌨ ATAJOS</div>
            <div className="tips-item">→ / ↓ / ⎵ : Siguiente</div>
            <div className="tips-item">← / ↑ : Anterior</div>
          </div>
        </section>

        {/* Right: notes */}
        <section className="presenter-right">
          <div className="notes-header">
            <span className="notes-header-title">NOTAS DEL ORADOR</span>
            <span className="notes-header-slide">
              SLIDE {String(currentSlide + 1).padStart(2, '0')}
              {note ? ` — ${note.title}` : ''}
            </span>
          </div>
          <NotesPanel slideIndex={currentSlide} />
        </section>
      </main>

      {/* ── Bottom navigation ── */}
      <footer className="presenter-footer">
        <NavControls currentSlide={currentSlide} onPrev={prevSlide} onNext={nextSlide} />
      </footer>
    </div>
  );
}
