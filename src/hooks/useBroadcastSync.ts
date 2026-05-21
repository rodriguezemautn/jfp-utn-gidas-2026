import { useState, useCallback, useEffect, useRef } from 'react';
import { TOTAL_SLIDES } from '../types';

const CHANNEL = 'jfp-presentation';

type BroadcastMessage =
  | { type: 'SLIDE_CHANGE'; slide: number }
  | { type: 'PING' }
  | { type: 'PONG'; slide: number };

interface UseBroadcastSyncOptions {
  /** If true, this window participates in keyboard navigation */
  enableKeyboard?: boolean;
  /** If true, this window only listens, never broadcasts (kiosk iframe) */
  listenOnly?: boolean;
}

/**
 * Manages slide state synced across windows via BroadcastChannel.
 *
 * - **listenOnly mode**: receives slide changes but never broadcasts (for kiosk iframe).
 * - **enableKeyboard**: attaches keyboard listeners for prev/next.
 * - **Echo protection**: external slide changes update state without re-broadcasting.
 */
export function useBroadcastSync(options: UseBroadcastSyncOptions = {}) {
  const { enableKeyboard = false, listenOnly = false } = options;

  const [currentSlide, setCurrentSlide] = useState(0);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const externalRef = useRef(false);
  const slideRef = useRef(0);

  // Keep slideRef in sync so BroadcastChannel closures always see the latest value
  slideRef.current = currentSlide;

  /* ── helpers that broadcast ── */

  const goToSlide = useCallback(
    (index: number) => {
      if (listenOnly) return;
      if (index < 0 || index >= TOTAL_SLIDES) return;
      setCurrentSlide(index);
      channelRef.current?.postMessage({ type: 'SLIDE_CHANGE', slide: index } satisfies BroadcastMessage);
    },
    [listenOnly],
  );

  const nextSlide = useCallback(() => {
    if (listenOnly) return;
    setCurrentSlide((prev) => {
      const next = Math.min(prev + 1, TOTAL_SLIDES - 1);
      if (next !== prev) {
        channelRef.current?.postMessage({ type: 'SLIDE_CHANGE', slide: next } satisfies BroadcastMessage);
      }
      return next;
    });
  }, [listenOnly]);

  const prevSlide = useCallback(() => {
    if (listenOnly) return;
    setCurrentSlide((prev) => {
      const next = Math.max(prev - 1, 0);
      if (next !== prev) {
        channelRef.current?.postMessage({ type: 'SLIDE_CHANGE', slide: next } satisfies BroadcastMessage);
      }
      return next;
    });
  }, [listenOnly]);

  /* ── BroadcastChannel setup ── */

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL);
    channelRef.current = channel;

    channel.onmessage = (event: MessageEvent<BroadcastMessage>) => {
      const data = event.data;
      if (!data) return;

      if (data.type === 'PING') {
        channel.postMessage({ type: 'PONG', slide: slideRef.current } satisfies BroadcastMessage);
        return;
      }

      if (data.type === 'PONG') {
        externalRef.current = true;
        setCurrentSlide(data.slide);
        return;
      }

      if (data.type === 'SLIDE_CHANGE') {
        externalRef.current = true;
        setCurrentSlide(data.slide);
        return;
      }
    };

    // Ask other windows for their current slide
    channel.postMessage({ type: 'PING' } satisfies BroadcastMessage);

    return () => {
      channel.close();
      channelRef.current = null;
    };
    // We only want channel setup on mount, not on every currentSlide change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Keyboard navigation ── */

  useEffect(() => {
    if (!enableKeyboard) return;

    const onKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input / textarea
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

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
  }, [enableKeyboard, nextSlide, prevSlide]);

  return { currentSlide, goToSlide, nextSlide, prevSlide };
}
