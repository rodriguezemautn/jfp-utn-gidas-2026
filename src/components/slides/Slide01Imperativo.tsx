import { useEffect, useRef } from 'react';
import { LiveChart } from '../LiveChart';

interface Slide01Props {
  isActive: boolean;
}

export function Slide01Imperativo({ isActive }: Slide01Props) {
  const energyRef = useRef<HTMLDivElement>(null);
  const trafficRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const energyEl = energyRef.current;
    const trafficEl = trafficRef.current;
    if (!energyEl || !trafficEl) return;

    energyEl.textContent = '0';
    trafficEl.textContent = '0';

    let energy = 0;
    let traffic = 0;
    const targetEnergy = 3;
    const targetTraffic = 2.5;

    const interval = setInterval(() => {
      energy += 0.1;
      traffic += 0.1;
      energyEl.textContent = energy.toFixed(1);
      trafficEl.textContent = traffic.toFixed(1);
      if (energy >= targetEnergy && traffic >= targetTraffic) {
        clearInterval(interval);
        energyEl.textContent = targetEnergy.toFixed(1);
        trafficEl.textContent = targetTraffic.toFixed(1);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="w-full max-w-6xl px-8">
      <div className="mb-8">
        <span className="font-mono text-xs text-accent-green">BLOQUE 01 // IMPERATIVO_2026</span>
        <h2 className="font-sans text-5xl font-bold mt-2">El Costo Energetico de la Computacion</h2>
      </div>

      <div className="grid grid-cols-12 gap-6" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <div className="col-span-8 grid grid-cols-2 gap-6">
          <div className="bento-card p-10 flex flex-col justify-between">
            <div className="font-mono text-sm text-gray-500">GLOBAL_ENERGY_CONSUMPTION</div>
            <div ref={energyRef} className="font-mono text-6xl font-bold text-accent-green text-glow">0</div>
            <div className="font-sans text-lg text-gray-400">% electricidad global consumida por centros de datos en 2026</div>
            <div className="font-mono text-xs text-gray-600 mt-2">FUENTE: IEA, 2025</div>
          </div>

          <div className="bento-card p-10 flex flex-col justify-between">
            <div className="font-mono text-sm text-gray-500">DATA_TRAFFIC_GROWTH</div>
            <div className="font-mono text-6xl font-bold text-white">x<span ref={trafficRef}>0</span></div>
            <div className="font-sans text-lg text-gray-400">crecimiento del trafico de datos en 5 anos (IA generativa)</div>
            <div className="font-mono text-xs text-gray-600 mt-2">PROYECTADO</div>
          </div>

          <div className="bento-card p-10 col-span-2">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-sm text-gray-500">EMISIONES_TIC_VS_AVIACION</span>
              <span className="font-mono text-xs text-accent-green">~2% vs ~2.5%</span>
            </div>
            <div className="relative h-24">
              <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
                <line x1="0" y1="50" x2="400" y2="50" stroke="#333" strokeWidth="1" />
                <rect x="20" y="20" width="160" height="60" fill="rgba(0,255,65,0.2)" stroke="#00FF41" strokeWidth="1" rx="4" />
                <rect x="220" y="15" width="160" height="70" fill="rgba(255,255,255,0.05)" stroke="#666" strokeWidth="1" rx="4" />
                <text x="100" y="55" textAnchor="middle" fill="#00FF41" fontFamily="JetBrains Mono" fontSize="12">SECTOR TIC</text>
                <text x="300" y="55" textAnchor="middle" fill="#888" fontFamily="JetBrains Mono" fontSize="12">AVIACION</text>
              </svg>
            </div>
            <p className="font-sans text-lg text-gray-400 mt-2">El sector TIC equipara al transporte aereo mundial en emisiones globales</p>
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-4">
          <div className="bento-card p-10 flex-1">
            <div className="font-mono text-xs text-accent-green mb-6">ALERTA_CRITICA</div>
            <p className="font-sans text-2xl leading-relaxed text-gray-300">
              "El crecimiento infinito de recursos llego a su fin. La eficiencia ya no es opcional: es <span className="text-accent-green">supervivencia</span>."
            </p>
            <div className="mt-6 terminal-text">
              <div><span className="timestamp">[WARN]</span> resource_limit: approaching</div>
              <div><span className="timestamp">[INFO]</span> efficiency_mode: required</div>
              <div><span className="timestamp">[ACTION]</span> shift_left: sustainability</div>
            </div>
          </div>

          <div className="bento-card p-6">
            <div className="font-mono text-sm text-gray-500 mb-2">LIVE_METRICS</div>
            <LiveChart />
          </div>
        </div>
      </div>
    </div>
  );
}
