import { TOTAL_SLIDES } from '../types';

interface NavigationControlsProps {
  currentSlide: number;
  onPrev: () => void;
  onNext: () => void;
}

export function NavigationControls({ currentSlide, onPrev, onNext }: NavigationControlsProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
      <button
        onClick={onPrev}
        className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-accent-green hover:border-accent-green transition-all font-mono text-base tracking-wider cursor-pointer"
      >
        &lt; PREV
      </button>
      <div className="flex flex-col items-center gap-0.5">
        <span className="font-mono text-base text-gray-400 font-semibold">
          {String(currentSlide + 1).padStart(2, '0')} / {TOTAL_SLIDES}
        </span>
        <span className="font-mono text-xs text-gray-500 tracking-wider">
            ←  →  ⎵  ⇞  ⇟
        </span>
      </div>
      <button
        onClick={onNext}
        className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-accent-green hover:border-accent-green transition-all font-mono text-base tracking-wider cursor-pointer"
      >
        NEXT &gt;
      </button>
    </div>
  );
}
