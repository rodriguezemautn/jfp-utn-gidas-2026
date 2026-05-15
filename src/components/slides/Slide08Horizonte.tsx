export function Slide08Horizonte() {
  return (
    <div className="w-full max-w-6xl px-8">
      <div className="mb-8">
        <span className="font-mono text-xs text-accent-green">HORIZONTE_2026 // ERA_PLATAFORMAS</span>
        <h2 className="font-sans text-5xl font-bold mt-2">La Era de las Plataformas Inteligentes</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6 bento-card p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent-green pulse-dot" />
            <span className="font-mono text-xs text-accent-green">PLATFORM_ENGINEERING</span>
          </div>
          <h3 className="font-sans text-3xl font-semibold mb-3">Golden Paths + IDP</h3>
          <p className="font-sans text-lg text-gray-400 mb-6">Los devs crean valor, no pelean con infra. Gartner: 80% de orgs con IDP para 2026.</p>
          <div className="docker-container">
            <div className="font-mono text-xs text-gray-400">Internal Developer Platform</div>
            <div className="mt-2 flex gap-3">
              <span className="px-2 py-1 rounded bg-accent-green-dim border border-accent-green/30 font-mono text-xs text-accent-green">Self-Service</span>
              <span className="px-2 py-1 rounded bg-accent-green-dim border border-accent-green/30 font-mono text-xs text-accent-green">Golden Paths</span>
            </div>
          </div>
        </div>

        <div className="col-span-6 bento-card p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent-green pulse-dot" />
            <span className="font-mono text-xs text-accent-green">AI_NATIVE_DEVOPS</span>
          </div>
          <h3 className="font-sans text-3xl font-semibold mb-3">Agentes Co-pilota CI/CD</h3>
          <p className="font-sans text-lg text-gray-400 mb-6">Desde PR hasta incident response. State of DevOps 2025: -40% MTTR con AI-assisted ops.</p>
          <div className="docker-container">
            <div className="font-mono text-xs text-gray-400">AI-Assisted Operations</div>
            <div className="mt-2 font-mono text-xs text-accent-green">MTTR: -40% | Deployments: +4x</div>
          </div>
        </div>

        <div className="col-span-6 bento-card p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent-green pulse-dot" />
            <span className="font-mono text-xs text-accent-green">FINOPS_GREENOPS</span>
          </div>
          <h3 className="font-sans text-3xl font-semibold mb-3">Convergencia Total</h3>
          <p className="font-sans text-lg text-gray-400 mb-6">Un solo dashboard de costo + carbono. El costo ya no es solo dinero; es energia, es toneladas de CO2.</p>
          <div className="flex gap-3">
            <div className="flex-1 h-8 rounded bg-gradient-to-r from-accent-green/20 to-accent-green/5 border border-accent-green/30 flex items-center justify-center">
              <span className="font-mono text-xs text-accent-green">$ COSTO</span>
            </div>
            <div className="flex-1 h-8 rounded bg-gradient-to-r from-accent-green/20 to-accent-green/5 border border-accent-green/30 flex items-center justify-center">
              <span className="font-mono text-xs text-accent-green">CO2 CARBONO</span>
            </div>
          </div>
        </div>

        <div className="col-span-6 bento-card p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent-green pulse-dot" />
            <span className="font-mono text-xs text-accent-green">MCP_2026</span>
          </div>
          <h3 className="font-sans text-3xl font-semibold mb-3">Infra as Prompt</h3>
          <p className="font-sans text-lg text-gray-400 mb-6">Model Context Protocol (Anthropic, 2024). Agentes orquestan K8s, Terraform, observabilidad con guardrails humanos.</p>
          <div className="docker-container font-mono text-xs text-accent-green">
            &gt; deploy --cluster=prod --carbon-aware=true
          </div>
        </div>

        <div className="col-span-12 bento-card p-10">
          <div className="font-mono text-sm text-gray-500 mb-6">DORA_2025_METRICS // ELITE_PERFORMERS</div>
          <div className="grid grid-cols-4 gap-6">
            {[
              { value: '4x', label: 'mas despliegues', sub: 'elite vs low' },
              { value: '24h', label: 'lead time', sub: 'elite performers' },
              { value: '<1h', label: 'MTTR promedio', sub: 'alto rendimiento' },
              { value: '-40%', label: 'MTTR con AI', sub: 'State of DevOps 2025' },
            ].map(m => (
              <div key={m.value} className="text-center">
                <div className="font-mono text-4xl font-bold text-accent-green text-glow">{m.value}</div>
                <div className="font-sans text-lg text-gray-400 mt-2">{m.label}</div>
                <div className="font-mono text-xs text-gray-600">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
