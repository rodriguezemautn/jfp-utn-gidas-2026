import { useEffect, useState } from 'react';
import { Mascot } from '../Mascot';

interface Slide04Props {
  isActive: boolean;
}

export function Slide04GreenOps({ isActive }: Slide04Props) {
  const [animatedStages, setAnimatedStages] = useState<number>(0);

  useEffect(() => {
    if (!isActive) {
      setAnimatedStages(0);
      return;
    }

    let stage = 0;
    setAnimatedStages(0);

    const interval = setInterval(() => {
      stage++;
      setAnimatedStages(stage);
      if (stage >= 5) clearInterval(interval);
    }, 300);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="w-full max-w-7xl px-8">
      <div className="mb-8">
        <span className="font-mono text-lg text-accent-green">BLOQUE 02 // GREENOPS_PIPELINE</span>
        <h2 className="font-sans text-6xl font-bold mt-2">Ciclo de Vida Sostenible</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 bento-card p-8 mb-4">
          <div className="flex items-center justify-center gap-2">
            {[
              { label: 'CODE', sub: 'Lines scanned' },
              { label: 'BUILD', sub: 'Energy/build' },
              { label: 'TEST', sub: 'Carbon/test' },
              { label: 'DEPLOY', sub: 'SCI score' },
              { label: 'RUN', sub: 'Carbon/req' },
            ].map((stage, i) => (
              <div key={stage.label} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-500 ${
                      i < animatedStages
                        ? 'bg-accent-green-dim border border-accent-green shadow-[0_0_20px_rgba(0,255,65,0.3)]'
                        : 'bg-white/5 border border-white/20'
                    }`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <span
                      className={`font-mono text-base transition-colors duration-500 ${
                        i < animatedStages ? 'text-accent-green' : 'text-gray-300'
                      }`}
                    >
                      {stage.label}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-sm mt-2 transition-all duration-500 ${
                      i < animatedStages ? 'text-accent-green opacity-100' : 'text-gray-400 opacity-50'
                    }`}
                    style={{ transitionDelay: `${i * 100 + 150}ms` }}
                  >
                    {stage.sub}
                  </span>
                </div>
                {i < 4 && (
                  <svg width="40" height="20" viewBox="0 0 40 20">
                    <line
                      x1="0" y1="10" x2="32" y2="10"
                      stroke="#00FF41"
                      strokeWidth="1"
                      opacity={i < animatedStages - 1 ? 0.8 : 0.2}
                      className="transition-opacity duration-500"
                    />
                    <polygon
                      points="32,10 27,5 27,15"
                      fill="#00FF41"
                      opacity={i < animatedStages - 1 ? 0.8 : 0.2}
                      className="transition-opacity duration-500"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-6 bento-card p-10">
          <div className="font-mono text-lg text-gray-300 mb-6">SCI_FORMULA // Green Software Foundation v1.0</div>
          <div className="docker-container text-center py-8">
            <div className="font-mono text-3xl text-accent-green">
              SCI = (E x I) + M
            </div>
            <div className="font-sans text-xl text-gray-300 mt-4">
              por unidad funcional (request, usuario, transaccion)
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: 'E', desc: 'Energia' },
              { label: 'I', desc: 'Intensidad' },
              { label: 'M', desc: 'Emisiones' },
            ].map(m => (
              <div key={m.label} className="text-center">
                <div className="font-mono text-xl text-accent-green">{m.label}</div>
                <div className="font-mono text-base text-gray-400">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-6 flex flex-col gap-4">
          <div className="bento-card p-10 flex-1 min-h-0">
            <div className="font-mono text-lg text-accent-green mb-3">CARBON_AWARE_SCHEDULING</div>
            <p className="font-sans text-lg text-gray-200 mb-6">Mover cargas de trabajo a franjas horarias con menor intensidad de carbono en la red electrica</p>
            <div className="flex items-center gap-3">
              <div className="h-2 flex-1 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent-green to-[#00cc33] w-3/4" />
              </div>
              <span className="font-mono text-base text-accent-green">SDGs compliant</span>
            </div>
          </div>

          <div className="bento-card p-8">
            <div className="font-mono text-lg text-accent-green mb-2">PIPELINE_CARBON_GATE</div>
            <p className="font-sans text-base text-gray-200 mb-3">El pipeline CI/CD rechaza deployments que superen el SCI threshold definido</p>
            <div className="terminal-text text-sm leading-relaxed">
              <div><span className="timestamp">[GATE]</span> <span className="cmd">if</span> sci_score &gt; threshold: <span className="success">reject()</span></div>
              <div><span className="timestamp">[GATE]</span> <span className="cmd">else</span>: <span className="success">approve()</span></div>
            </div>
          </div>
        </div>
      </div>
      <Mascot />
    </div>
  );
}
