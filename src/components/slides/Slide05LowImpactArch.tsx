export function Slide05LowImpactArch() {
  const cols = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00FF41" strokeWidth="2">
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
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00FF41" strokeWidth="2">
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
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00FF41" strokeWidth="2">
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
    <div className="w-full max-w-[1600px] px-8 mx-auto">
      <div className="mb-16">
        <span className="font-mono text-4xl text-accent-green">BLOQUE 03 // LOW_IMPACT_ARCH</span>
        <h2 className="font-sans text-8xl font-bold mt-4">Arquitecturas de Bajo Impacto</h2>
      </div>

      <div className="grid grid-cols-3 gap-12 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
        {cols.map(col => (
          <div key={col.label} className="bento-card p-14 flex flex-col">
            <div className="flex items-center gap-8 mb-12">
              <div className="w-16 h-16 rounded bg-accent-green-dim border-2 border-accent-green flex items-center justify-center">
                {col.icon}
              </div>
              <span className="font-mono text-4xl text-accent-green">{col.label}</span>
            </div>
            <h3 className="font-sans text-6xl font-bold mb-12">{col.title}</h3>
            <div className="space-y-8 flex-1">
              {col.items.map(item => (
                <div key={item.label} className="docker-container">
                  <div className="font-mono text-3xl text-accent-green mb-2">{item.label}</div>
                  <div className="font-sans text-3xl text-gray-300">{item.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-white/10">
              <span className="font-mono text-3xl text-gray-400">{col.footer.split(':')[0] + ': '}</span>
              <span className="font-mono text-3xl text-accent-green">{col.footer.split(':').slice(1).join(':')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
