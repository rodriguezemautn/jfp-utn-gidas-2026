export function Slide08Sintesis() {
  return (
    <div className="w-full max-w-7xl px-8">
      <div className="mb-8">
        <span className="font-mono text-lg text-accent-green">SINTESIS // TRES_PILARES</span>
        <h2 className="font-sans text-6xl font-bold mt-2">Los Tres Pilares de la Sostenibilidad DevOps</h2>
      </div>

      <div className="grid grid-cols-3 gap-6" style={{ maxHeight: 'calc(100vh - 120px)' }}>
        {[
          {
            num: '01',
            label: 'HUMANA',
            title: 'Cultura',
            items: [
              'Cultura Blameless',
              '"You build it, you run it"',
              'Error budgets sin blame',
              'On-call sostenible (SRE)',
            ],
            footer: 'PSYCHOLOGICAL_SAFETY: ENABLED',
            active: true,
          },
          {
            num: '02',
            label: 'TECNICA',
            title: 'Arquitectura',
            items: [
              '12-Factor Apps',
              'CI/CD con carbon gates',
              'Observabilidad total',
              '20% tiempo en refactoring',
            ],
            footer: 'TECHNICAL_EXCELLENCE: REQUIRED',
            active: false,
          },
          {
            num: '03',
            label: 'ECONOMICA',
            title: 'Negocio',
            items: [
              'FinOps + GreenOps unificados',
              'SCI como KPI de producto',
              'DORA Metrics como brujula',
              'Platform Engineering',
            ],
            footer: 'COST_EFFICIENCY: OPTIMIZED',
            active: false,
          },
        ].map(pilar => (
          <div key={pilar.num} className={`bento-card p-10 flex flex-col ${pilar.active ? 'active' : ''}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent-green-dim border border-accent-green flex items-center justify-center">
                <span className="font-sans text-xl font-bold text-accent-green">{pilar.num}</span>
              </div>
              <span className="font-mono text-base text-accent-green">{pilar.label}</span>
            </div>
            <h3 className="font-sans text-3xl font-bold mb-6">{pilar.title}</h3>
            <div className="space-y-6 flex-1">
              {pilar.items.map(item => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent-green mt-2.5 flex-shrink-0" />
                  <span className="font-sans text-xl text-gray-200">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="font-mono text-base text-gray-400">{pilar.footer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
