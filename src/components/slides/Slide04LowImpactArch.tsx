export function Slide04LowImpactArch() {
  const cols = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00FF41" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="2" />
          <path d="M2 12h20M12 2v20" />
        </svg>
      ),
      label: 'VIRTUALIZACION',
      title: 'Inteligente',
      items: [
        { label: 'eBPF', desc: 'Observabilidad de kernel sin overhead' },
        { label: 'Unikernels', desc: 'SO minimo per-app (10x menos RAM)' },
        { label: 'Firecracker', desc: 'microVMs: densidad x5, frio <125ms' },
      ],
      footer: 'IMPACTO: -85% overhead',
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00FF41" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
      label: 'EDGE',
      title: 'Computing',
      items: [
        { label: 'Procesamiento Local', desc: 'Procesar donde se genera el dato elimina trafico' },
        { label: 'WebAssembly', desc: 'WASM en el borde: portable y eficiente' },
        { label: 'Latencia <1ms', desc: '+ menor trafico = menor huella' },
      ],
      footer: 'CASOS: IoT, Salud, Smart Cities',
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00FF41" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      label: 'ORQUESTACION',
      title: 'Carbon-Aware',
      items: [
        { label: 'K8s Carbon Scheduler', desc: 'Nodes en zonas verdes' },
        { label: 'KEDA v2', desc: 'Scale-to-zero nativo (CNCF)' },
        { label: 'Spot + Time-shifting', desc: 'Batch jobs en franjas verdes' },
      ],
      footer: 'CONVERGENCIA: FinOps <-> GreenOps',
    },
  ];

  return (
    <div className="w-full max-w-7xl px-8">
      <div className="mb-8">
        <span className="font-mono text-lg text-accent-green">BLOQUE 03 // LOW_IMPACT_ARCH</span>
        <h2 className="font-sans text-6xl font-bold mt-2">Arquitecturas de Bajo Impacto</h2>
      </div>

      <div className="grid grid-cols-3 gap-6" style={{ maxHeight: 'calc(100vh - 120px)' }}>
        {cols.map(col => (
          <div key={col.label} className="bento-card p-10 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded bg-accent-green-dim border border-accent-green flex items-center justify-center">
                {col.icon}
              </div>
              <span className="font-mono text-base text-accent-green">{col.label}</span>
            </div>
            <h3 className="font-sans text-3xl font-semibold mb-6">{col.title}</h3>
            <div className="space-y-4 flex-1">
              {col.items.map(item => (
                <div key={item.label} className="docker-container">
                  <div className="font-mono text-base text-accent-green mb-1">{item.label}</div>
                  <div className="font-sans text-base text-gray-300">{item.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="font-mono text-base text-gray-400">{col.footer.split(':')[0] + ': '}</span>
              <span className="font-mono text-base text-accent-green">{col.footer.split(':').slice(1).join(':')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
