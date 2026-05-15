import { useState, useCallback, useEffect } from 'react';
import { TOTAL_SLIDES } from '../types';

export function useSlideNavigation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= TOTAL_SLIDES) return;
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, TOTAL_SLIDES - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [nextSlide, prevSlide]);

  return { currentSlide, goToSlide, nextSlide, prevSlide };
}
