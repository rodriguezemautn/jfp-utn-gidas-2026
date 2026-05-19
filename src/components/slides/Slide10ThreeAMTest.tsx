import { useEffect, useState } from 'react';

interface Slide10Props {
  isActive: boolean;
}

export function Slide10ThreeAMTest({ isActive }: Slide10Props) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      return;
    }
    // stagger: header → items 1-3 → inner quote → bottom quote
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2100);
    const t4 = setTimeout(() => setPhase(4), 3000);
    const t5 = setTimeout(() => setPhase(5), 3900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [isActive]);

  const fadeSlide = (visible: boolean) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: 'opacity 0.8s ease-in-out, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
  } as React.CSSProperties);

  return (
    <div className="w-full max-w-5xl px-8 text-center">
      <div className="mb-8">
        <span className="font-mono text-lg text-accent-green">EXPERIENCIA_EN_VIVO // 3:00_AM_TEST</span>
      </div>

      <div className="bento-card p-12 max-w-3xl mx-auto">
        <div className="space-y-8">
          {/* TEST_DE_EMPATIA header */}
          <div className="flex items-center justify-center gap-4" style={fadeSlide(phase >= 1)}>
            <div className="w-3 h-3 rounded-full bg-accent-green pulse-dot" />
            <span className="font-mono text-base text-accent-green">TEST_DE_EMPATIA</span>
            <div className="w-3 h-3 rounded-full bg-accent-green pulse-dot" />
          </div>

          {/* Numbered items */}
          <div className="space-y-6 text-left">
            {[
              { num: '1', text: 'Levanten la mano si alguna vez sintieron que la infra era "el problema de otro."' },
              { num: '2', text: 'Cierren los ojos. Viernes, 3 AM. Sistema caido. Usuario real sin acceso a servicio esencial.' },
              { num: '3', text: 'Dos caminos: culpar al ultimo push o confiar en el proceso y seguir durmiendo.' },
            ].map((item, i) => (
              <div key={item.num} className="flex gap-4" style={fadeSlide(phase >= 2 + i)}>
                <span className="font-mono text-3xl text-accent-green">{item.num}</span>
                <p className="font-sans text-2xl text-gray-200">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Inner quote */}
          <div className="pt-6 border-t border-white/10" style={fadeSlide(phase >= 5)}>
            <p className="font-sans text-3xl text-accent-green font-semibold">
              "En INFRAIT no apagamos incendios.<br />
              Disenamos sistemas que no se incendian."
            </p>
          </div>
        </div>
      </div>

      {/* Bottom quote */}
      <div className="mt-8" style={fadeSlide(phase >= 5)}>
        <p className="font-sans text-3xl font-bold text-white">
          "Construyamos sistemas que cuiden a las personas."
        </p>
      </div>

      {/* Mascot */}
      <div className="mt-8 flex justify-center">
        <img
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXp5MThxdmxrYnM4OTRxd3AwYXd1NnhtZXQ2cHBxZHZnNzBhYWkyNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/begSgSG5lCl8bxkBiv/giphy.gif"
          alt="3AM test mascot"
          className="w-48 h-48 object-contain mascot-float"
          style={{ filter: 'drop-shadow(0 0 12px rgba(0,255,65,0.4))' }}
        />
      </div>
    </div>
  );
}
