import { Mascot } from '../Mascot';

export function Slide11Cierre() {
  return (
    <div className="w-full max-w-[1600px] px-8 mx-auto">
      <div className="mb-16 text-center">
        <span className="font-mono text-4xl text-accent-green">CIERRE // RECURSOS_Y_CONTACTO</span>
      </div>

      <div className="grid grid-cols-3 gap-12 mb-16">
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
          <div key={col.title} className="bento-card p-16">
            <div className="font-mono text-3xl text-accent-green mb-6">{col.title}</div>
            <div className="space-y-6 text-4xl text-gray-300">
              {col.items.map(item => (
                <div key={item} className="font-sans">{item}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bento-card p-16 text-center">
        <div className="font-mono text-3xl text-gray-400 mb-12">REFERENCIAS</div>
        <div className="font-mono text-3xl text-gray-300 space-y-2">
          <div>Accelerate (Forsgren 2018) - DevOps Handbook (Kim 2016) - SRE Book (Google/OReilly)</div>
          <div>12-Factor (2025) - Green Software Foundation - Tech Radar Vol.33 (Thoughtworks)</div>
          <div>State of DevOps 2025 - Gartner Platform Eng. 2026</div>
        </div>
        <div className="mt-12 pt-12 border-t border-white/10">
          <div className="font-sans text-5xl font-semibold text-accent-green">GiDAS - Grupo de Investigacion en Desarrollo de Arquitecturas Sostenibles - UTN FRLP</div>
          <div className="font-mono text-3xl text-gray-400 mt-4">Sumate al grupo - Construi el futuro digital de Argentina</div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/5">
          <div className="font-mono text-sm text-gray-500 mb-2">CREDITOS DE IMAGENES</div>
          <div className="font-mono text-sm text-gray-500 space-y-0.5 leading-relaxed">
            <div>Mascota principal: Dancing Gopher &mdash; media.tenor.com</div>
            <div>Mascota gato bailando &mdash; media.giphy.com (begSgSG5lCl8bxkBiv)</div>
            <div>Ilustraciones de LinkedIn &mdash; articulos de Tushar Murudkar sobre DevOps y SRE</div>
            <div>Logos GiDAS y UTN &mdash; propiedad de sus respectivas instituciones</div>
          </div>
        </div>
      </div>
      <Mascot />
    </div>
  );
}
