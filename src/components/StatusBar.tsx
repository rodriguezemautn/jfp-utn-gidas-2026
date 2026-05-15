import { useEffect, useState } from 'react';
import { TOTAL_SLIDES, SLIDE_STATUSES, type SlideStatus } from '../types';

interface StatusBarProps {
  currentSlide: number;
  onNavClick: (index: number) => void;
}

export function StatusBar({ currentSlide, onNavClick }: StatusBarProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(new Date().toTimeString().split(' ')[0]);
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const percent = ((currentSlide + 1) / TOTAL_SLIDES) * 100;
  const status = SLIDE_STATUSES[currentSlide] as SlideStatus;

  return (
    <div className="status-bar fixed top-0 left-0 right-0 z-50 px-8 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-accent-green pulse-dot" />
          <span className="font-mono text-sm text-accent-green tracking-widest">INFRAIT_LIVE</span>
        </div>
        <div className="h-5 w-px bg-white/10" />
        <span className="font-mono text-sm text-gray-400">UTN_FRLP // 2026</span>
      </div>

      <div className="flex-1 mx-6 max-w-lg">
        <div className="flex justify-between mb-1">
          <span className="font-mono text-sm text-gray-300">{status}</span>
          <span className="font-mono text-sm text-accent-green">{Math.round(percent)}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div className="progress-bar h-full rounded-full" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-1.5">
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <div
              key={i}
              onClick={() => onNavClick(i)}
              className={`nav-node ${i === currentSlide ? 'active' : ''}`}
            />
          ))}
        </div>
        <div className="h-5 w-px bg-white/10" />
        <span className="font-mono text-sm text-gray-400">{time}</span>
      </div>
    </div>
  );
}
