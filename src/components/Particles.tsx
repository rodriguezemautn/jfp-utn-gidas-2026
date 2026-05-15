import { useEffect, useRef } from 'react';

export function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items: HTMLDivElement[] = [];
    const count = 30;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: #00FF41;
        border-radius: 50%;
        opacity: 0.3;
        pointer-events: none;
      `;
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      container.appendChild(p);
      items.push(p);
      animate(p);
    }

    function animate(p: HTMLDivElement) {
      const duration = Math.random() * 10000 + 5000;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      p.style.transition = `all ${duration}ms linear`;
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      setTimeout(() => animate(p), duration);
    }

    return () => {
      items.forEach(p => p.remove());
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />;
}
