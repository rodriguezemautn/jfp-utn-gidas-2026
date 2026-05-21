import { useEffect, useState } from 'react';

interface GiDASRevealProps {
  isActive: boolean;
}

type Phase = 'idle' | 'revealing' | 'revealed' | 'glowing';

export function GiDASReveal({ isActive }: GiDASRevealProps) {
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    if (!isActive) {
      setPhase('idle');
      return;
    }
    const t1 = setTimeout(() => setPhase('revealing'), 200);
    const t2 = setTimeout(() => setPhase('revealed'), 2200);
    const t3 = setTimeout(() => setPhase('glowing'), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isActive]);

  const isRevealing = phase === 'revealing';
  const isGlowing = phase === 'glowing';

  return (
    <div className="relative w-80 h-40 flex items-center justify-center">
      {/* Terminal frame */}
      <div
        className={`absolute inset-0 rounded-xl border transition-all duration-1000 ${
          isGlowing
            ? 'border-accent-green shadow-[0_0_40px_rgba(0,255,65,0.25)]'
            : isRevealing
              ? 'border-accent-green/60'
              : 'border-accent-green/15'
        }`}
      >
        {/* Corner brackets */}
        <span className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-accent-green/70 rounded-tl-lg" />
        <span className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-accent-green/70 rounded-tr-lg" />
        <span className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-accent-green/70 rounded-bl-lg" />
        <span className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-accent-green/70 rounded-br-lg" />
      </div>

      {/* Grid background */}
      <div
        className="absolute inset-3 rounded opacity-30"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(0,255,65,0.07) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(0,255,65,0.07) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '20px 20px',
        }}
      />

      {/* Logo reveal wrapper */}
      <div
        className="relative z-10"
        style={{
          clipPath:
            phase === 'idle' ? 'inset(100% 0 0 0)' : 'inset(0 0 0 0)',
          transition: isRevealing
            ? 'clip-path 2s cubic-bezier(0.23, 1, 0.32, 1)'
            : 'none',
        }}
      >
        <img
          src="/assets/logo-gidas.png"
          className="h-28"
          alt="GiDAS"
          style={{
            filter: isGlowing
              ? 'drop-shadow(0 0 22px rgba(0,255,65,0.9)) brightness(1.25)'
              : isRevealing
                ? 'drop-shadow(0 0 8px rgba(0,255,65,0.4)) brightness(1)'
                : 'drop-shadow(0 0 4px rgba(0,255,65,0.15)) brightness(0.65)',
            transition: 'filter 1.2s ease-in-out',
          }}
        />
      </div>

      {/* Scan line */}
      <div
        className="absolute left-3 right-3 h-[2px] z-20 pointer-events-none"
        style={{
          top: phase === 'idle' ? '-6px' : isRevealing ? 'calc(100% - 6px)' : 'calc(100% + 6px)',
          opacity: isGlowing ? 0 : 1,
          transition: [
            isRevealing ? 'top 2s cubic-bezier(0.23, 1, 0.32, 1)' : '',
            isGlowing ? 'opacity 0.4s ease-in' : '',
          ]
            .filter(Boolean)
            .join(', '),
          background: 'linear-gradient(90deg, transparent, #00FF41, transparent)',
          boxShadow: '0 0 10px rgba(0,255,65,0.6), 0 0 20px rgba(0,255,65,0.3)',
        }}
      />

      {/* Data particles */}
      {phase !== 'idle' && (
        <>
          <span
            className="absolute top-2 left-5 w-1.5 h-1.5 rounded-full bg-accent-green/50"
            style={{ animation: 'ping 2s ease-in-out infinite' }}
          />
          <span
            className="absolute bottom-3 right-4 w-1 h-1 rounded-full bg-accent-green/30"
            style={{ animation: 'ping 2.4s ease-in-out infinite 0.4s' }}
          />
          <span
            className="absolute top-7 right-7 w-1 h-1 rounded-full bg-accent-green/20"
            style={{ animation: 'ping 1.8s ease-in-out infinite 0.8s' }}
          />
          <span
            className="absolute bottom-6 left-7 w-1.5 h-1.5 rounded-full bg-accent-green/40"
            style={{ animation: 'ping 2.2s ease-in-out infinite 1.2s' }}
          />
        </>
      )}

      {/* Label below frame */}
      <div
        className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-mono text-xs text-accent-green/40 tracking-[0.2em]"
        style={{
          opacity: isGlowing ? 1 : phase === 'revealing' ? 0.6 : 0,
          transition: 'opacity 0.8s ease-in-out',
        }}
      >
        GiDAS - INFRAiT
      </div>
    </div>
  );
}
