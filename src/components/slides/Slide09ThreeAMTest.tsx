export function Slide09ThreeAMTest() {
  return (
    <div className="w-full max-w-4xl px-8 text-center">
      <div className="mb-8">
        <span className="font-mono text-xs text-accent-green">EXPERIENCIA_EN_VIVO // 3:00_AM_TEST</span>
      </div>

      <div className="bento-card p-12 max-w-2xl mx-auto">
        <div className="space-y-8">
          <div className="flex items-center justify-center gap-4">
            <div className="w-3 h-3 rounded-full bg-accent-green pulse-dot" />
            <span className="font-mono text-xs text-accent-green">TEST_DE_EMPATIA</span>
            <div className="w-3 h-3 rounded-full bg-accent-green pulse-dot" />
          </div>

          <div className="space-y-6 text-left">
            {[
              { num: '1', text: 'Levanten la mano si alguna vez sintieron que la infra era "el problema de otro."' },
              { num: '2', text: 'Cierren los ojos. Viernes, 3 AM. Sistema caido. Usuario real sin acceso a servicio esencial.' },
              { num: '3', text: 'Dos caminos: culpar al ultimo push o confiar en el proceso y seguir durmiendo.' },
            ].map(item => (
              <div key={item.num} className="flex gap-4">
                <span className="font-mono text-2xl text-accent-green">{item.num}</span>
                <p className="font-sans text-xl text-gray-300">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10">
            <p className="font-sans text-2xl text-accent-green font-semibold">
              "En INFRAIT no apagamos incendios.<br />
              Disenamos sistemas que no se incendian."
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <p className="font-sans text-2xl font-bold text-white">
          "Construyamos sistemas que cuiden a las personas."
        </p>
      </div>
    </div>
  );
}
