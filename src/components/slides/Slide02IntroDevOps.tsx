export function Slide02IntroDevOps() {
  const pipeline = [
    { label: 'PLAN/CODE', desc: 'Repos compartidos' },
    { label: 'BUILD', desc: 'Compilacion automatica' },
    { label: 'TEST', desc: 'Pruebas automatizadas' },
    { label: 'CONFIGURE/RELEASE', desc: 'IaC + despliegue' },
    { label: 'MONITOR', desc: 'Retroalimentacion continua' },
  ];

  return (
    <div className="w-full max-w-7xl px-8 flex flex-col h-full" style={{ maxHeight: 'calc(100vh - 104px)' }}>
      {/* HEADER */}
      <div className="mb-3 shrink-0">
        <span className="font-mono text-lg text-accent-green">BLOQUE 02 // INTRO_DEVOPS</span>
        <h2 className="font-sans text-5xl font-bold mt-0.5">DevOps y SRE: Fundamentos</h2>
      </div>

      {/* CONTENT CARDS + IMAGE SIDE BY SIDE */}
      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        {/* LEFT COLUMN: Que es DevOps */}
        <div className="col-span-4 flex flex-col gap-4">
          <div className="bento-card p-5 flex-1 flex flex-col justify-center">
            <div className="font-mono text-sm text-accent-green mb-2">QUE_ES_DEVOPS</div>
            <p className="font-sans text-xl leading-relaxed text-gray-200 mb-3">
              DevOps es una <span className="text-accent-green font-semibold">cultura y mentalidad colaborativa</span> que rompe los silos entre Desarrollo y Operaciones.
            </p>
            <div className="terminal-text text-xs">
              <div><span className="timestamp">[PRINCIPIO]</span> you_build_it: you_run_it</div>
              <div><span className="timestamp">[OBJETIVO]</span> entrega_rapida_y_confiable</div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Toolchain pipeline */}
        <div className="col-span-5 flex flex-col gap-4">
          <div className="bento-card p-4 flex-1 flex flex-col justify-center">
            <div className="font-mono text-base text-accent-green mb-3">TOOLCHAIN // CICLO_DE_VIDA</div>
            <div className="space-y-2">
              {pipeline.map((step, i) => (
                <div key={step.label} className="flex items-center gap-3">
                  <span className="font-mono text-sm text-accent-green w-5 text-right shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="h-3 w-3 rounded-full bg-accent-green shrink-0 glow-green" />
                  <div className="h-px w-5 bg-accent-green/40 shrink-0" />
                  <span className="font-mono text-base text-gray-200 whitespace-nowrap">{step.label}</span>
                  <span className="font-mono text-sm text-gray-500 truncate">{step.desc}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="font-sans text-base text-gray-400 italic">
                "La automatizacion es el pegamento que une cada eslabon"
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SRE */}
        <div className="col-span-3 flex flex-col gap-4">
          <div className="bento-card p-4 flex-1 flex flex-col justify-center">
            <div className="font-mono text-base text-accent-green mb-2">SRE // INGENIERIA_DE_CONFIABILIDAD</div>
            <p className="font-sans text-base leading-relaxed text-gray-200 mb-3">
              Lo que sucede cuando un ingeniero de software disena un equipo de operaciones.
            </p>
            <div className="space-y-2">
              <div className="bg-white/5 rounded-lg px-3 py-2.5 border border-white/10">
                <div className="font-mono text-base text-accent-green">SLI</div>
                <div className="font-sans text-sm text-gray-400">Service Level Indicator</div>
                <div className="font-mono text-xs text-gray-500 mt-0.5">Metrica real de servicio</div>
              </div>
              <div className="bg-white/5 rounded-lg px-3 py-2.5 border border-white/10">
                <div className="font-mono text-base text-accent-green">SLO</div>
                <div className="font-sans text-sm text-gray-400">Service Level Objective</div>
                <div className="font-mono text-xs text-gray-500 mt-0.5">Objetivo interno del equipo</div>
              </div>
              <div className="bg-white/5 rounded-lg px-3 py-2.5 border border-white/10">
                <div className="font-mono text-base text-accent-green">SLA</div>
                <div className="font-sans text-sm text-gray-400">Service Level Agreement</div>
                <div className="font-mono text-xs text-gray-500 mt-0.5">Contrato legal con el cliente</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH IMAGE FOOTER WITH REFERENCE */}
      <div className="mt-4 shrink-0">
        <div className="bento-card overflow-hidden">
          <div className="relative">
            <img
              src="/assets/devops.gif"
              alt="DevOps lifecycle diagram by Tushar Murudkar"
              className="w-full block"
              style={{ maxHeight: '340px', objectFit: 'contain', background: '#080808' }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-accent-green">DEVOPS_LENS // SDLC</span>
                <div className="h-px flex-1 bg-accent-green/20" />
                <span className="font-mono text-[11px] text-gray-400 text-right leading-tight">
                  Tushar Murudkar · Jan 2024
                </span>
              </div>
            </div>
          </div>
          <div className="px-5 py-2 border-t border-white/5 flex items-center justify-between">
            <span className="font-mono text-[11px] text-gray-500">
              DevOps Lens of SDLC
            </span>
            <a
              href="https://medium.com/@tusharmurudkar/devops-lens-of-sdlc-c5939969743e"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-accent-green/60 hover:text-accent-green transition-colors"
            >
              medium.com/@tusharmurudkar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
