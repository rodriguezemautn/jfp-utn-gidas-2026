export function Slide10Cierre() {
  return (
    <div className="w-full max-w-4xl px-8">
      <div className="mb-8 text-center">
        <span className="font-mono text-xs text-accent-green">CIERRE // RECURSOS_Y_CONTACTO</span>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {[
          {
            title: 'CULTURA',
            items: ['Blameless', 'Shared Ownership', 'Psychological Safety', 'SRE'],
          },
          {
            title: 'TECNICA',
            items: ['12-Factor', 'CI/CD', 'GreenOps', 'SCI - Carbon Budgets - SLOs'],
          },
          {
            title: 'FUTURO',
            items: ['Platform Eng.', 'FinOps', 'AI-Native', 'MCP - Edge'],
          },
        ].map(col => (
          <div key={col.title} className="bento-card p-10">
            <div className="font-mono text-xs text-accent-green mb-3">{col.title}</div>
            <div className="space-y-3 text-lg text-gray-400">
              {col.items.map(item => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bento-card p-10 text-center">
        <div className="font-mono text-sm text-gray-500 mb-6">REFERENCIAS</div>
        <div className="font-mono text-sm text-gray-400 space-y-1">
          <div>Accelerate (Forsgren 2018) - DevOps Handbook (Kim 2016) - SRE Book (Google/OReilly)</div>
          <div>12-Factor (2025) - Green Software Foundation - Tech Radar Vol.33 (Thoughtworks)</div>
          <div>State of DevOps 2025 - Gartner Platform Eng. 2026</div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="font-sans text-2xl font-semibold text-accent-green">GiDAS - Grupo de Investigacion en Desarrollo de Arquitecturas Sostenibles - UTN FRLP</div>
          <div className="font-mono text-base text-gray-500 mt-2">Sumate al grupo - Construi el futuro digital de Argentina</div>
        </div>
      </div>
    </div>
  );
}
