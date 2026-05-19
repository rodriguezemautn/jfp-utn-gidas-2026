import { Mascot } from '../Mascot';

export function Slide06LocalAI() {
  return (
    <div className="w-full max-w-[1600px] px-8 mx-auto">
      <div className="mb-16">
        <span className="font-mono text-4xl text-accent-green">BLOQUE 04 // LOCAL_AI_STACK</span>
        <h2 className="font-sans text-8xl font-bold mt-4">IA Local & Automatizacion</h2>
      </div>

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-8 grid grid-cols-2 gap-12">
          {[
            { title: 'ANALISIS_DE_LOGS', label: 'Ollama + Llama 3.1', desc: '-90% latencia vs API externa' },
            { title: 'CODE_REVIEW_AUTO', label: 'Local Codestral/Qwen', desc: 'Sin datos en nube externa' },
            { title: 'IaC_GENERATION', label: 'MCP + LLM Local', desc: 'Infra como prompt con guardrails' },
            { title: 'INCIDENT_ROOT_CAUSE', label: 'RAG sobre Runbooks', desc: 'Diagnostico en segundos' },
          ].map(item => (
            <div key={item.title} className="bento-card p-10">
              <div className="flex items-center gap-8 mb-6">
                <div className="w-4 h-4 rounded-full bg-accent-green" />
                <span className="font-mono text-3xl text-gray-300">{item.title}</span>
              </div>
              <div className="docker-container">
                <div className="font-mono text-4xl text-accent-green">{item.label}</div>
                <div className="font-sans text-3xl text-gray-300 mt-4">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-4 bento-card p-16">
          <div className="font-mono text-4xl text-accent-green mb-12">MCP_STACK_2026</div>
          <div className="space-y-8">
            {[
              { label: 'Agente IA (orquestador)', green: true },
              { label: 'MCP Server (tools)', green: true },
              { label: 'Infra / APIs / K8s', green: true },
              { label: 'Guardrails Humanos', green: false },
            ].map((layer, i) => (
              <div key={layer.label}>
                <div className={`docker-container text-center ${layer.green ? '' : 'border-white/20'}`}>
                  <div className={`font-mono text-3xl ${layer.green ? 'text-white' : 'text-gray-300'}`}>{layer.label}</div>
                </div>
                {i < 3 && (
                  <div className="flex justify-center py-2">
                    <svg width="36" height="36" viewBox="0 0 20 30">
                      <line x1="10" y1="0" x2="10" y2="20" stroke="#00FF41" strokeWidth="2" opacity="0.5" />
                      <polygon points="10,20 5,15 15,15" fill="#00FF41" opacity="0.5" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 terminal-text">
            <div className="font-mono text-3xl">Ollama - llama.cpp</div>
            <div className="font-mono text-3xl">LM Studio - Anthropic MCP</div>
          </div>
        </div>
      </div>
      <Mascot />
    </div>
  );
}
