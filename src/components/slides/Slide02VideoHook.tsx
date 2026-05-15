import { useEffect, useRef, useCallback, useState } from 'react';

interface Slide02Props {
  isActive: boolean;
}

export function Slide02VideoHook({ isActive }: Slide02Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const poemRef = useRef<HTMLDivElement>(null);
  const [ended, setEnded] = useState(false);

  const animatePoem = useCallback(() => {
    const container = poemRef.current;
    if (!container) return;
    const lines = container.querySelectorAll('.poem-line');
    lines.forEach(line => line.classList.remove('visible'));
    lines.forEach((line, i) => {
      const delay = parseInt((line as HTMLElement).dataset.delay || '0', 10) || i * 200;
      setTimeout(() => line.classList.add('visible'), delay);
    });
  }, []);

  useEffect(() => {
    if (isActive) {
      animatePoem();
      setEnded(false);
      const el = videoRef.current;
      if (el) {
        el.currentTime = 0;
        el.play().catch(() => {});
      }
    } else {
      videoRef.current?.pause();
    }
  }, [isActive, animatePoem]);

  const replay = useCallback(() => {
    const el = videoRef.current;
    if (el) {
      setEnded(false);
      el.currentTime = 0;
      el.play().catch(() => {});
    }
  }, []);

  return (
    <div className="w-full max-w-6xl px-8">
      <div className="mb-4">
        <span className="font-mono text-xs text-accent-green">HOOK // NATTV_CRASH_DUMMY_PSA_80s</span>
        <h2 className="font-sans text-3xl font-bold mt-2">El Paralelo del Crash Dummy</h2>
      </div>

      <div className="grid grid-cols-12 gap-6" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        <div className="col-span-7 flex flex-col gap-4">
          <div className="video-frame flex-1 relative">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              playsInline
              onEnded={() => setEnded(true)}
            >
              <source src="/assets/video.webm" type="video/webm" />
              <source src="/assets/video.mp4" type="video/mp4" />
            </video>

            <div
              className="absolute inset-0 flex items-center justify-center bg-black/60 pointer-events-none transition-opacity"
              style={{
                opacity: ended ? 1 : 0,
                pointerEvents: ended ? 'all' : 'none',
              }}
            >
              <button onClick={replay} className="replay-btn text-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                REPRODUCIR
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-accent-green pulse-dot" />
              <span className="font-mono text-base text-gray-500">NATTV · Crash Dummy PSA · 80s</span>
            </div>
            <button onClick={replay} className="replay-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
              REPLAY
            </button>
          </div>
        </div>

        <div className="col-span-5 flex flex-col justify-center">
          <div className="bento-card p-10 h-full flex flex-col justify-center active">
            <div className="font-mono text-xs text-accent-green mb-6">MANIFESTO // SYSTEM_DESIGN_FAILURE</div>

            <div ref={poemRef} className="space-y-6">
              <div className="poem-line font-sans text-2xl text-gray-300" data-delay="0">
                Durante decadas,
              </div>
              <div className="poem-line font-sans text-2xl text-gray-300" data-delay="500">
                disenamos software
              </div>
              <div className="poem-line font-sans text-2xl text-gray-300" data-delay="1000">
                como los ingenieros
              </div>
              <div className="poem-line font-sans text-2xl text-gray-300" data-delay="1500">
                automotrices de los 80s:
              </div>
              <div className="poem-line font-sans text-2xl text-accent-green font-semibold mt-4" data-delay="2500">
                Elegante en el laboratorio.
              </div>
              <div className="poem-line font-sans text-2xl text-accent-green font-semibold" data-delay="3000">
                Catastrofico al chocar con la realidad.
              </div>
              <div className="poem-line font-sans text-2xl text-gray-400 italic mt-6" data-delay="4500">
                "No necesitamos heroes que no duermen.
              </div>
              <div className="poem-line font-sans text-2xl text-gray-400 italic" data-delay="5000">
                Necesitamos sistemas disenados para sobrevivir."
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="terminal-text">
                <div><span className="timestamp">[CRITICAL]</span> design_flaw_detected: crash_dummy_syndrome</div>
                <div><span className="timestamp">[REMEDIATION]</span> shift_from_heroes_to_systems: required</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
