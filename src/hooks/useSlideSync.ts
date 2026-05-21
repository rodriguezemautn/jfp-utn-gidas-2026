import { useState, useCallback, useEffect, useRef } from 'react';
import { TOTAL_SLIDES } from '../types';

const POLL_INTERVAL = 300; // ms entre cada poll
const CHANNEL = 'jfp-presentation';

interface UseSlideSyncOptions {
  /** Si es true, esta ventana escucha teclado para navegar */
  enableKeyboard?: boolean;
  /** Si es true, solo escucha cambios, nunca envía (kiosk iframe) */
  listenOnly?: boolean;
}

/**
 * Hook que sincroniza el slide actual entre ventanas (presentador y proyector).
 *
 * Estrategia:
 *   1. **API REST** (método principal): POST para enviar cambios, GET polling
 *      para recibirlos. Funciona entre cualquier instancia/perfil de navegador.
 *   2. **BroadcastChannel** (optimización): si está disponible dentro del mismo
 *      perfil, recibe cambios casi instantáneos sin esperar el poll.
 *
 * Esto garantiza sincronización incluso entre dos ventanas de Firefox con
 * perfiles separados (--no-remote) o entre navegadores distintos.
 */
export function useSlideSync(options: UseSlideSyncOptions = {}) {
  const { enableKeyboard = false, listenOnly = false } = options;

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(0);
  const versionRef = useRef(0);
  const externalRef = useRef(false);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  slideRef.current = currentSlide;

  /* ── helpers que envían cambios ── */

  const broadcastChange = useCallback((slide: number) => {
    // Enviar vía API REST (método principal)
    fetch('/api/slide', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slide }),
    }).catch(() => {
      // Si falla el servidor, intentamos al menos BroadcastChannel
      channelRef.current?.postMessage({ type: 'SLIDE_CHANGE', slide });
    });

    // BroadcastChannel como acelerador (misma instancia de Firefox)
    channelRef.current?.postMessage({ type: 'SLIDE_CHANGE', slide });
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (listenOnly) return;
      if (index < 0 || index >= TOTAL_SLIDES) return;
      setCurrentSlide(index);
      versionRef.current += 1;
      broadcastChange(index);
    },
    [listenOnly, broadcastChange],
  );

  const nextSlide = useCallback(() => {
    if (listenOnly) return;
    setCurrentSlide((prev) => {
      const next = Math.min(prev + 1, TOTAL_SLIDES - 1);
      if (next !== prev) {
        versionRef.current += 1;
        broadcastChange(next);
      }
      return next;
    });
  }, [listenOnly, broadcastChange]);

  const prevSlide = useCallback(() => {
    if (listenOnly) return;
    setCurrentSlide((prev) => {
      const next = Math.max(prev - 1, 0);
      if (next !== prev) {
        versionRef.current += 1;
        broadcastChange(next);
      }
      return next;
    });
  }, [listenOnly, broadcastChange]);

  /* ── BroadcastChannel (optimización, mismo perfil) ── */

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL);
    channelRef.current = channel;

    channel.onmessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data) return;

      if (data.type === 'PING') {
        channel.postMessage({ type: 'PONG', slide: slideRef.current });
        return;
      }

      if (data.type === 'PONG' || data.type === 'SLIDE_CHANGE') {
        externalRef.current = true;
        setCurrentSlide(data.slide);
        return;
      }
    };

    // Preguntar si hay otra ventana
    channel.postMessage({ type: 'PING' });

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, []);

  /* ── Polling a la API REST (método principal) ── */

  useEffect(() => {
    // En listenOnly, no hacemos polling (lo maneja BroadcastChannel)
    if (listenOnly) return;

    intervalRef.current = setInterval(async () => {
      try {
        const res = await fetch('/api/slide');
        const data = await res.json();
        if (data.slide !== slideRef.current) {
          externalRef.current = true;
          setCurrentSlide(data.slide);
        }
      } catch {
        // Servidor no disponible → ignorar
      }
    }, POLL_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [listenOnly]);

  /* ── Teclado ── */

  useEffect(() => {
    if (!enableKeyboard) return;

    const onKeyDown = (e: KeyboardEvent) => {
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
