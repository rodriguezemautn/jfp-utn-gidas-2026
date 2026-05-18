export function Slide06LocalAI() {
  return (
    <div className="w-full max-w-7xl px-8">
      <div className="mb-8">
        <span className="font-mono text-lg text-accent-green">BLOQUE 04 // LOCAL_AI_STACK</span>
        <h2 className="font-sans text-6xl font-bold mt-2">IA Local & Automatizacion</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 grid grid-cols-2 gap-6">
          {[
            { title: 'ANALISIS_DE_LOGS', label: 'Ollama + Llama 3.1', desc: '-90% latencia vs API externa' },
            { title: 'CODE_REVIEW_AUTO', label: 'Local Codestral/Qwen', desc: 'Sin datos en nube externa' },
            { title: 'IaC_GENERATION', label: 'MCP + LLM Local', desc: 'Infra como prompt con guardrails' },
            { title: 'INCIDENT_ROOT_CAUSE', label: 'RAG sobre Runbooks', desc: 'Diagnostico en segundos' },
          ].map(item => (
            <div key={item.title} className="bento-card p-5">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-2 h-2 rounded-full bg-accent-green" />
                <span className="font-mono text-base text-gray-300">{item.title}</span>
              </div>
              <div className="docker-container">
                <div className="font-mono text-lg text-accent-green">{item.label}</div>
                <div className="font-sans text-lg text-gray-300 mt-2">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-4 bento-card p-10">
          <div className="font-mono text-lg text-accent-green mb-6">MCP_STACK_2026</div>
          <div className="space-y-4">
            {[
              { label: 'Agente IA (orquestador)', green: true },
              { label: 'MCP Server (tools)', green: true },
              { label: 'Infra / APIs / K8s', green: true },
              { label: 'Guardrails Humanos', green: false },
            ].map((layer, i) => (
              <div key={layer.label}>
                <div className={`docker-container text-center ${layer.green ? '' : 'border-white/20'}`}>
                  <div className={`font-mono text-base ${layer.green ? 'text-white' : 'text-gray-300'}`}>{layer.label}</div>
                </div>
                {i < 3 && (
                  <div className="flex justify-center py-1">
                    <svg width="20" height="20" viewBox="0 0 20 30">
                      <line x1="10" y1="0" x2="10" y2="25" stroke="#00FF41" strokeWidth="1" opacity="0.5" />
                      <polygon points="10,25 5,20 15,20" fill="#00FF41" opacity="0.5" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 terminal-text">
            <div>Ollama - llama.cpp</div>
            <div>LM Studio - Anthropic MCP</div>
          </div>
        </div>
      </div>
    </div>
  );
}
