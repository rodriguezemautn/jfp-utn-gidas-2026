import { Mascot } from '../Mascot';

export function Slide08Sintesis() {
  return (
    <div className="w-full max-w-[1600px] px-8 mx-auto">
      <div className="mb-16">
        <span className="font-mono text-4xl text-accent-green">SINTESIS // TRES_PILARES</span>
        <h2 className="font-sans text-8xl font-bold mt-4">Los Tres Pilares de la Sostenibilidad DevOps</h2>
      </div>

      <div className="grid grid-cols-3 gap-12 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
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
          <div key={pilar.num} className={`bento-card p-16 flex flex-col ${pilar.active ? 'active' : ''}`}>
            <div className="flex items-center gap-8 mb-12">
              <div className="w-20 h-20 rounded-full bg-accent-green-dim border-2 border-accent-green flex items-center justify-center">
                <span className="font-sans text-4xl font-bold text-accent-green">{pilar.num}</span>
              </div>
              <span className="font-mono text-4xl text-accent-green">{pilar.label}</span>
            </div>
            <h3 className="font-sans text-6xl font-bold mb-12">{pilar.title}</h3>
            <div className="space-y-8 flex-1">
              {pilar.items.map(item => (
                <div key={item} className="flex items-start gap-8">
                  <div className="w-4 h-4 rounded-full bg-accent-green mt-4 flex-shrink-0" />
                  <span className="font-sans text-4xl text-gray-200">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-12 border-t border-white/10">
              <div className="font-mono text-3xl text-gray-400">{pilar.footer}</div>
            </div>
          </div>
        ))}
      </div>
      <Mascot
        src="https://media.licdn.com/dms/image/v2/C4D12AQFsIhMFOJVs0Q/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1609097444281?e=1780531200&v=beta&t=Q0yWnkjpU8d8oWm9itKqWh-3LJw9RGa5TVS9y6plmrI"
        alt="Sostenibilidad mascot"
        className="w-64 h-64"
      />
    </div>
  );
}
