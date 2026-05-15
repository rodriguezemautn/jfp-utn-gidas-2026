import { useState, useEffect } from 'react';

export function Slide00Intro() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const delays = [
      { step: 1, delay: 800 },    // init_presentation
      { step: 2, delay: 1200 },   // loading_modules
      { step: 3, delay: 800 },    // agenda 01
      { step: 4, delay: 800 },    // agenda 02
      { step: 5, delay: 800 },    // agenda 03
      { step: 6, delay: 800 },    // agenda 04
      { step: 7, delay: 800 },    // agenda 05
      { step: 8, delay: 1000 },   // ok connection_established
      { step: 9, delay: 800 },    // gmet first quote
      { step: 10, delay: 5000 },  // devops quote (5s gap)
      { step: 11, delay: 1200 },  // whoami
      { step: 12, delay: 1000 },  // groups
    ];

    let elapsed = 0;
    const timers = delays.map(({ step: s, delay }) => {
      elapsed += delay;
      return setTimeout(() => setStep(s), elapsed);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full max-w-7xl px-8">
      <div className="grid grid-cols-12 gap-6" style={{ maxHeight: 'calc(100vh - 120px)' }}>
        <div className="col-span-7 bento-card p-8 flex flex-col justify-between active">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-accent-green pulse-dot" />
              <span className="font-mono text-base text-accent-green tracking-widest">SYSTEM_ALERT // 2026</span>
            </div>
            <h1 className="font-sans text-6xl font-bold leading-tight mb-3">
              Metodologias <span className="text-accent-green text-glow">DevOps</span><br />
              para el Desarrollo<br />
              <span className="text-gray-300">Sostenible</span>
            </h1>
            <p className="font-mono text-lg text-gray-400 mt-4">
              Cultura · GreenOps · Arquitecturas de Bajo Impacto · IA Local · SRE Evolucionado
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="terminal-text space-y-1">
              <div className={`transition-opacity duration-700 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                <span className="timestamp">[JFP-FRLP]</span> <span className="cmd">$</span> init_presentation --mode=sustainable
              </div>
              <div className={`transition-opacity duration-700 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                <span className="timestamp">[JFP-FRLP]</span> <span className="cmd">$</span> loading_modules: green_ops, carbon_aware, sre_v2
              </div>
              <div className={`transition-opacity duration-700 ${step >= 8 ? 'opacity-100' : 'opacity-0'}`}>
                <span className="timestamp">[JFP-FRLP]</span> <span className="success">ok</span> connection_established: GMET_EMPATHY_PROTOCOL
              </div>
              <div className={`transition-opacity duration-700 ${step >= 11 ? 'opacity-100' : 'opacity-0'}`}>
                <span className="timestamp">[JFP-FRLP]</span> <span className="cmd">$</span> whoami Emanuel Rodriguez
              </div>
              <div className={`transition-opacity duration-700 ${step >= 12 ? 'opacity-100' : 'opacity-0'}`}>
                <span className="timestamp">[JFP-FRLP]</span> <span className="cmd">$</span> groups
              </div>
              <div className={`transition-opacity duration-700 ${step >= 12 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-2">
                    <img src="/assets/logo-gidas.png" className="h-5 opacity-80" alt="GiDAS" />
                    <span className="font-sans text-base font-bold text-white">Grupo GiDAS</span>
                  </div>
                  <span className="text-gray-600">|</span>
                  <span className="font-sans text-base font-semibold text-accent-green">INFRAIT</span>
                  <span className="text-gray-600">|</span>
                  <div className="flex items-center gap-2">
                    <img src="/assets/logo-utn.png" className="h-5 opacity-80" alt="UTN" />
                    <span className="font-mono text-base text-gray-300">UTN FRLP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-5 flex flex-col gap-4">
          <div className="bento-card p-8 flex-1">
            <div className={`flex items-center justify-between mb-4 transition-opacity duration-700 ${step >= 9 ? 'opacity-100' : 'opacity-0'}`}>
              <span className="font-mono text-lg text-gray-300">GMET_BRIDGE</span>
              <div className="w-2 h-2 rounded-full bg-accent-green" />
            </div>
            <div className="space-y-4">
              <div className={`docker-container transition-all duration-700 ${step >= 9 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="font-mono text-base text-gray-300 mb-1">GMET - Diseno Inclusivo</div>
                <p className="font-sans text-xl text-gray-200 italic">"Un mundo donde los crash dummies no representan a la mujer, es un mundo incompleto."</p>
              </div>
              <div className={`flex items-center justify-center transition-opacity duration-700 ${step >= 9 ? 'opacity-100' : 'opacity-0'}`}>
                <svg width="32" height="32" viewBox="0 0 40 40">
                  <line x1="20" y1="0" x2="20" y2="40" stroke="#00FF41" strokeWidth="1" opacity="0.5" />
                  <polygon points="20,35 15,25 25,25" fill="#00FF41" opacity="0.8" />
                </svg>
              </div>
              <div className={`docker-container transition-all duration-700 ${step >= 10 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="font-mono text-base text-accent-green mb-1">DevOps - Ingenieria Sostenible</div>
                <p className="font-sans text-xl text-gray-200">"La misma empatia radical aplicada a la operacion: para el negocio, el planeta y las personas."</p>
              </div>
            </div>
          </div>

          <div className="bento-card p-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-base text-gray-400">AGENDA_PREVIEW</span>
              <span className="font-mono text-base text-accent-green">5 BLOQUES</span>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map(n => (
                <div
                  key={n}
                  className={`h-10 rounded flex items-center justify-center font-mono text-base transition-all duration-500 ${
                    step >= 2 + n
                      ? n === 1
                        ? 'bg-accent-green-dim border border-accent-green/30 text-accent-green'
                        : 'bg-white/5 border border-white/10 text-gray-400'
                      : 'bg-white/5 border border-transparent text-transparent'
                  }`}
                >
                  {String(n).padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
