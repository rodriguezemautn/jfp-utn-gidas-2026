import { useEffect, useRef } from 'react';
import { useSlideNavigation } from './hooks/useSlideNavigation';
import { StatusBar } from './components/StatusBar';
import { NavigationControls } from './components/NavigationControls';
import { Particles } from './components/Particles';
import { Slide00Intro } from './components/slides/Slide00Intro';
import { Slide01Imperativo } from './components/slides/Slide01Imperativo';
import { Slide02IntroDevOps } from './components/slides/Slide02IntroDevOps';
import { SlideDevOpsFull } from './components/slides/SlideDevOpsFull';
import { Slide03VideoHook } from './components/slides/Slide03VideoHook';
import { Slide04GreenOps } from './components/slides/Slide04GreenOps';
import { Slide05LowImpactArch } from './components/slides/Slide05LowImpactArch';
import { Slide06LocalAI } from './components/slides/Slide06LocalAI';
import { Slide07SRE } from './components/slides/Slide07SRE';
import { Slide08Sintesis } from './components/slides/Slide08Sintesis';
import { Slide09Horizonte } from './components/slides/Slide09Horizonte';
import { Slide10ThreeAMTest } from './components/slides/Slide10ThreeAMTest';
import { Slide11Cierre } from './components/slides/Slide11Cierre';
import { Slide12Gracias } from './components/slides/Slide12Gracias';

const BROADCAST_CHANNEL = 'jfp-presentation';

function SlideLayer({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <div
      className="absolute w-full h-full flex items-center justify-center slide-fade"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'scale(1)' : 'scale(0.85)',
        pointerEvents: show ? 'all' : 'none',
      }}
    >
      {children}
    </div>
  );
}

interface AppProps {
  /** If true, hides StatusBar, NavigationControls, and Particles — for iframe/embed use */
  kioskMode?: boolean;
}

export default function App({ kioskMode = false }: AppProps) {
  const { currentSlide, goToSlide, nextSlide, prevSlide } = useSlideNavigation();
  const channelRef = useRef<BroadcastChannel | null>(null);
  const externalRef = useRef(false);
  const slideRef = useRef(0);
  slideRef.current = currentSlide; // always fresh for closures

  /* ── BroadcastChannel synchronization ── */

  useEffect(() => {
    if (kioskMode) return; // kiosk iframe only listens, no broadcast setup needed

    const channel = new BroadcastChannel(BROADCAST_CHANNEL);
    channelRef.current = channel;

    channel.onmessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data) return;

      if (data.type === 'SLIDE_CHANGE') {
        externalRef.current = true;
        goToSlide(data.slide);
        return;
      }

      if (data.type === 'PONG') {
        externalRef.current = true;
        goToSlide(data.slide);
        return;
      }

      if (data.type === 'PING') {
        channel.postMessage({ type: 'PONG', slide: slideRef.current });
        return;
      }
    };

    return () => {
      channel.close();
      channelRef.current = null;
    };
    // We intentionally only run this on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kioskMode]);

  // Broadcast local slide changes (unless triggered externally)
  const prevSlideRef = useRef(currentSlide);
  useEffect(() => {
    if (kioskMode) return;
    if (externalRef.current) {
      externalRef.current = false;
      prevSlideRef.current = currentSlide;
      return;
    }
    if (prevSlideRef.current !== currentSlide) {
      prevSlideRef.current = currentSlide;
      channelRef.current?.postMessage({ type: 'SLIDE_CHANGE', slide: currentSlide });
    }
  }, [currentSlide, kioskMode]);

  // Re-sync on mount: if another window is already running, match its slide
  useEffect(() => {
    if (kioskMode) return;

    // Short delay to let the BroadcastChannel handler register first
    const timer = setTimeout(() => {
      channelRef.current?.postMessage({ type: 'PING' });
    }, 100);

    return () => clearTimeout(timer);
  }, [kioskMode]);

  // Expose current slide index globally (for OBS browser source, etc.)
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__jpfSlide = currentSlide;
  }, [currentSlide]);

  /* ── Mouse hover effect for bento cards ── */

  useEffect(() => {
    if (kioskMode) return;

    const onMouseMove = (e: MouseEvent) => {
      document.querySelectorAll<HTMLElement>('.bento-card:hover').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,255,65,0.05) 0%, transparent 50%), var(--color-bg-panel)`;
      });
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [kioskMode]);

  return (
    <>
      <div className="grid-bg" />
      <div className="scanlines" />
      {!kioskMode && <Particles />}

      {!kioskMode && (
        <StatusBar currentSlide={currentSlide} onNavClick={goToSlide} />
      )}

      <div
        className="canvas-container fixed inset-0 z-1 overflow-hidden max-h-screen"
        style={
          kioskMode
            ? { top: 0, bottom: 0 }
            : { top: '48px', bottom: '56px' }
        }
      >
        <SlideLayer show={currentSlide === 0}><Slide00Intro /></SlideLayer>
        <SlideLayer show={currentSlide === 1}><Slide02IntroDevOps /></SlideLayer>
        <SlideLayer show={currentSlide === 2}><SlideDevOpsFull /></SlideLayer>
        <SlideLayer show={currentSlide === 3}><Slide01Imperativo isActive={currentSlide === 3} /></SlideLayer>
        <SlideLayer show={currentSlide === 4}><Slide03VideoHook isActive={currentSlide === 4} /></SlideLayer>
        <SlideLayer show={currentSlide === 5}><Slide04GreenOps isActive={currentSlide === 5} /></SlideLayer>
        <SlideLayer show={currentSlide === 6}><Slide05LowImpactArch /></SlideLayer>
        <SlideLayer show={currentSlide === 7}><Slide06LocalAI /></SlideLayer>
        <SlideLayer show={currentSlide === 8}><Slide07SRE isActive={currentSlide === 8} /></SlideLayer>
        <SlideLayer show={currentSlide === 9}><Slide08Sintesis isActive={currentSlide === 9} /></SlideLayer>
        <SlideLayer show={currentSlide === 10}><Slide09Horizonte /></SlideLayer>
        <SlideLayer show={currentSlide === 11}><Slide10ThreeAMTest isActive={currentSlide === 11} /></SlideLayer>
        <SlideLayer show={currentSlide === 12}><Slide11Cierre /></SlideLayer>
        <SlideLayer show={currentSlide === 13}><Slide12Gracias isActive={currentSlide === 13} /></SlideLayer>
      </div>

      {!kioskMode && (
        <NavigationControls currentSlide={currentSlide} onPrev={prevSlide} onNext={nextSlide} />
      )}

      <img
        src="/assets/logo-gidas.png"
        className="fixed bottom-20 right-6 h-10 opacity-50 z-40 pointer-events-none"
        alt="GiDAS"
      />
    </>
  );
}
