import { useEffect } from 'react';
import { useSlideNavigation } from './hooks/useSlideNavigation';
import { StatusBar } from './components/StatusBar';
import { NavigationControls } from './components/NavigationControls';
import { Particles } from './components/Particles';
import { Slide00Intro } from './components/slides/Slide00Intro';
import { Slide01Imperativo } from './components/slides/Slide01Imperativo';
import { Slide02IntroDevOps } from './components/slides/Slide02IntroDevOps';
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

export default function App() {
  const { currentSlide, goToSlide, nextSlide, prevSlide } = useSlideNavigation();

  useEffect(() => {
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
  }, []);

  return (
    <>
      <div className="grid-bg" />
      <div className="scanlines" />
      <Particles />

      <StatusBar currentSlide={currentSlide} onNavClick={goToSlide} />

      <div className="canvas-container fixed inset-0 z-1 overflow-hidden max-h-screen" style={{ top: '48px', bottom: '56px' }}>
        <SlideLayer show={currentSlide === 0}><Slide00Intro /></SlideLayer>
        <SlideLayer show={currentSlide === 1}><Slide02IntroDevOps /></SlideLayer>
        <SlideLayer show={currentSlide === 2}><Slide01Imperativo isActive={currentSlide === 2} /></SlideLayer>
        <SlideLayer show={currentSlide === 3}><Slide03VideoHook isActive={currentSlide === 3} /></SlideLayer>
        <SlideLayer show={currentSlide === 4}><Slide04GreenOps isActive={currentSlide === 4} /></SlideLayer>
        <SlideLayer show={currentSlide === 5}><Slide05LowImpactArch /></SlideLayer>
        <SlideLayer show={currentSlide === 6}><Slide06LocalAI /></SlideLayer>
        <SlideLayer show={currentSlide === 7}><Slide07SRE /></SlideLayer>
        <SlideLayer show={currentSlide === 8}><Slide08Sintesis /></SlideLayer>
        <SlideLayer show={currentSlide === 9}><Slide09Horizonte /></SlideLayer>
        <SlideLayer show={currentSlide === 10}><Slide10ThreeAMTest /></SlideLayer>
        <SlideLayer show={currentSlide === 11}><Slide11Cierre /></SlideLayer>
        <SlideLayer show={currentSlide === 12}><Slide12Gracias /></SlideLayer>
      </div>

      <NavigationControls currentSlide={currentSlide} onPrev={prevSlide} onNext={nextSlide} />

      <img
        src="/assets/logo-gidas.png"
        className="fixed bottom-20 right-6 h-10 opacity-50 z-40 pointer-events-none"
        alt="GiDAS"
      />
    </>
  );
}
