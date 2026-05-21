import { useEffect, useRef, useState } from 'react';

/**
 * Hook that tracks elapsed time since the component mounted.
 *
 * Returns `elapsed` as a formatted string `MM:SS`.
 * Used in the presenter view to track presentation duration.
 */
export function useElapsedTimer() {
  const [elapsed, setElapsed] = useState('00:00');
  const startRef = useRef<number>(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = Date.now(); // init once in the effect, not in render

    const tick = () => {
      const diff = Date.now() - startRef.current;
      const totalSec = Math.floor(diff / 1000);
      const min = String(Math.floor(totalSec / 60)).padStart(2, '0');
      const sec = String(totalSec % 60).padStart(2, '0');
      setElapsed(`${min}:${sec}`);
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return elapsed;
}
