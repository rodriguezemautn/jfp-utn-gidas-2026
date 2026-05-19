import { useEffect, useState } from 'react';
import { GiDASReveal } from '../GiDASReveal';
import { Mascot } from '../Mascot';

interface Slide12Props {
  isActive: boolean;
}

export function Slide12Gracias({ isActive }: Slide12Props) {
  const [showText, setShowText] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setShowText(false);
      setShowLinks(false);
      return;
    }
    const t1 = setTimeout(() => setShowText(true), 2500);
    const t2 = setTimeout(() => setShowLinks(true), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isActive]);

  return (
    <div className="w-full max-w-5xl px-8 flex flex-col items-center justify-center min-h-[80vh] gap-10">
      <GiDASReveal isActive={isActive} />

      <h1
        className="font-sans text-7xl font-bold text-white text-center leading-tight"
        style={{
          opacity: showText ? 1 : 0,
          transform: showText ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease-in-out, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        ¡Muchas Gracias!
      </h1>

      <h2
        className="font-mono text-3xl text-accent-green text-center"
        style={{
          opacity: showText ? 1 : 0,
          transform: showText ? 'translateY(0)' : 'translateY(15px)',
          transition: 'opacity 0.8s ease-in-out 0.15s, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.15s',
        }}
      >
        Tiempo de preguntas
      </h2>

      <div
        className="flex flex-col items-center gap-3"
        style={{
          opacity: showLinks ? 1 : 0,
          transform: showLinks ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.6s ease-in-out, transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        <a
          href="https://gidas.frlp.utn.edu.ar"
          target="_blank"
          className="font-mono text-xl text-gray-300 hover:text-accent-green transition-colors"
        >
          gidas.frlp.utn.edu.ar
        </a>
        <a
          href="mailto:gidas@frlp.utn.edu.ar"
          className="font-mono text-xl text-gray-300 hover:text-accent-green transition-colors"
        >
          gidas@frlp.utn.edu.ar
        </a>
      </div>
      <Mascot />
    </div>
  );
}
