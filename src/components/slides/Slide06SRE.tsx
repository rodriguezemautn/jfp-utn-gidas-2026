export function Slide06SRE() {
  return (
    <div className="w-full max-w-6xl px-8">
      <div className="mb-8">
        <span className="font-mono text-xs text-accent-green">BLOQUE 05 // SRE_V2_SUSTAINABILITY</span>
        <h2 className="font-sans text-5xl font-bold mt-2">SRE Evolucionado: SLOs de Sostenibilidad</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 bento-card p-10">
          <div className="font-mono text-sm text-gray-500 mb-6">METRIC_COMPARISON_TABLE</div>
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 font-mono text-sm text-gray-400">METRICA SRE</th>
                  <th className="text-left py-3 font-mono text-sm text-gray-400">SLO TRADICIONAL</th>
                  <th className="text-left py-3 font-mono text-sm text-accent-green">SLO SOSTENIBILIDAD 2026</th>
                </tr>
              </thead>
              <tbody className="font-mono text-base">
                {[
                  { metric: 'Disponibilidad', trad: '99.9% uptime', green: '99.9% uptime + <X gCO2/req' },
                  { metric: 'Latencia', trad: 'p99 < 200ms', green: 'p99 < 200ms + eficiencia energetica' },
                  { metric: 'Error Rate', trad: '< 0.1% errors', green: '< 0.1% errors + carbon waste < umbral' },
                  { metric: 'Throughput', trad: 'X req/seg sostenido', green: 'X req/seg + energia por req <= Y' },
                  { metric: 'Error Budget', trad: 'Tiempo permitido de falla', green: 'Budget dual: falla + carbon overage' },
                ].map((row, i) => (
                  <tr key={row.metric} className={i < 4 ? 'border-b border-white/5' : ''}>
                    <td className="py-4 text-gray-300">{row.metric}</td>
                    <td className="py-4 text-gray-500">{row.trad}</td>
                    <td className="py-4 text-accent-green">{row.green}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-4">
          <div className="bento-card p-10 flex-1 flex flex-col justify-center">
            <div className="font-mono text-xs text-accent-green mb-6">SRE_MANUAL_2026</div>
            <blockquote className="font-sans text-2xl italic leading-relaxed text-gray-300">
              "Un sistema que cumple el SLO de disponibilidad pero consume el doble de energia necesaria, <span className="text-accent-green">esta fallando</span>."
            </blockquote>
          </div>

          <div className="bento-card p-6">
            <div className="font-mono text-sm text-gray-500 mb-2">ERROR_BUDGET_VISUALIZATION</div>
            <div className="flex gap-3 h-16">
              <div className="flex-1 rounded bg-accent-green-dim border border-accent-green/40 flex items-center justify-center">
                <span className="font-mono text-xs text-accent-green">FALLA</span>
              </div>
              <div className="flex-1 rounded bg-accent-green-dim border border-accent-green/40 flex items-center justify-center">
                <span className="font-mono text-xs text-accent-green">CARBON</span>
              </div>
            </div>
            <div className="mt-2 font-mono text-base text-gray-500 text-center">Budget Dual</div>
          </div>
        </div>
      </div>
    </div>
  );
}
