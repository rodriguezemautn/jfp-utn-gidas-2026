import { Mascot } from '../Mascot';

export function Slide09Horizonte() {
  return (
    <div className="w-full max-w-[1400px] px-8 mx-auto">
      <div className="mb-12">
        <span className="font-mono text-3xl text-accent-green">HORIZONTE_2026 // ERA_PLATAFORMAS</span>
        <h2 className="font-sans text-7xl font-bold mt-4">La Era de las Plataformas Inteligentes</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6 bento-card p-10">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-3 h-3 rounded-full bg-accent-green pulse-dot" />
            <span className="font-mono text-2xl text-accent-green">PLATFORM_ENGINEERING</span>
          </div>
          <h3 className="font-sans text-5xl font-semibold mb-4">Golden Paths + IDP</h3>
          <p className="font-sans text-3xl text-gray-300 mb-6">Los devs crean valor, no pelean con infra. Gartner: 80% de orgs con IDP para 2026.</p>
          <div className="docker-container p-6">
            <div className="font-mono text-2xl text-gray-300">Internal Developer Platform</div>
            <div className="mt-4 flex gap-4">
              <span className="px-3 py-1.5 rounded bg-accent-green-dim border border-accent-green/30 font-mono text-2xl text-accent-green">Self-Service</span>
              <span className="px-3 py-1.5 rounded bg-accent-green-dim border border-accent-green/30 font-mono text-2xl text-accent-green">Golden Paths</span>
            </div>
          </div>
        </div>

        <div className="col-span-6 bento-card p-10">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-3 h-3 rounded-full bg-accent-green pulse-dot" />
            <span className="font-mono text-2xl text-accent-green">AI_NATIVE_DEVOPS</span>
          </div>
          <h3 className="font-sans text-5xl font-semibold mb-4">Agentes Co-pilota CI/CD</h3>
          <p className="font-sans text-3xl text-gray-300 mb-6">Desde PR hasta incident response. State of DevOps 2025: -40% MTTR con AI-assisted ops.</p>
          <div className="docker-container p-6">
            <div className="font-mono text-2xl text-gray-300">AI-Assisted Operations</div>
            <div className="mt-4 font-mono text-2xl text-accent-green">MTTR: -40% | Deployments: +4x</div>
          </div>
        </div>

        <div className="col-span-6 bento-card p-10">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-3 h-3 rounded-full bg-accent-green pulse-dot" />
            <span className="font-mono text-2xl text-accent-green">FINOPS_GREENOPS</span>
          </div>
          <h3 className="font-sans text-5xl font-semibold mb-4">Convergencia Total</h3>
          <p className="font-sans text-3xl text-gray-300 mb-6">Un solo dashboard de costo + carbono. El costo ya no es solo dinero; es energia, es toneladas de CO2.</p>
          <div className="flex gap-4">
            <div className="flex-1 h-12 rounded bg-gradient-to-r from-accent-green/20 to-accent-green/5 border border-accent-green/30 flex items-center justify-center">
              <span className="font-mono text-2xl text-accent-green">$ COSTO</span>
            </div>
            <div className="flex-1 h-12 rounded bg-gradient-to-r from-accent-green/20 to-accent-green/5 border border-accent-green/30 flex items-center justify-center">
              <span className="font-mono text-2xl text-accent-green">CO2 CARBONO</span>
            </div>
          </div>
        </div>

        <div className="col-span-6 bento-card p-10">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-3 h-3 rounded-full bg-accent-green pulse-dot" />
            <span className="font-mono text-2xl text-accent-green">MCP_2026</span>
          </div>
          <h3 className="font-sans text-5xl font-semibold mb-4">Infra as Prompt</h3>
          <p className="font-sans text-3xl text-gray-300 mb-6">Model Context Protocol (Anthropic, 2024). Agentes orquestan K8s, Terraform, observabilidad con guardrails humanos.</p>
          <div className="docker-container p-6">
            <div className="font-mono text-2xl text-accent-green">&gt; deploy --cluster=prod --carbon-aware=true</div>
          </div>
        </div>

        <div className="col-span-12 bento-card p-10">
          <div className="font-mono text-3xl text-gray-300 mb-6">DORA_2025_METRICS // ELITE_PERFORMERS</div>
          <div className="grid grid-cols-4 gap-8">
            {[
              { value: '4x', label: 'mas despliegues', sub: 'elite vs low' },
              { value: '24h', label: 'lead time', sub: 'elite performers' },
              { value: '<1h', label: 'MTTR promedio', sub: 'alto rendimiento' },
              { value: '-40%', label: 'MTTR con AI', sub: 'State of DevOps 2025' },
            ].map(m => (
              <div key={m.value} className="text-center">
                <div className="font-mono text-6xl font-bold text-accent-green text-glow">{m.value}</div>
                <div className="font-sans text-2xl text-gray-300 mt-3">{m.label}</div>
                <div className="font-mono text-xl text-gray-400">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Mascot />
    </div>
  );
}
