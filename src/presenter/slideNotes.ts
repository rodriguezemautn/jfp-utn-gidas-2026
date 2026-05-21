/**
 * Manual mapping of app slide index → notes extracted from GUION.md.
 *
 * The app uses a flat index 0-13, while GUION.md has its own numbering
 * (SLIDE 00–14 with gaps and duplicates). This file bridges the two.
 *
 * IMPORTANT: Update this file whenever the slide order in App.tsx or
 * the notes in GUION.md change significantly.
 */

export interface SlideNote {
  /** Display title shown in the presenter view */
  title: string;
  /** Time range from GUION.md, e.g. "00:00 – 01:30" */
  timeRange: string | null;
  /** GUION.md slide number for reference (e.g. "00", "04", "07") */
  guionSlide: string;
  /** The orator's notes / script for this slide */
  notes: string;
  /** Stage direction / tone hint */
  direction: string;
}

export const SLIDE_NOTES: SlideNote[] = [
  /* 0 */ {
    title: 'Portada',
    timeRange: '00:00 – 01:30',
    guionSlide: '00',
    direction: 'De pie, sin apoyarse. Contacto visual.',
    notes: `Buenas tardes a todos.

[Pausa corta. Dejar que el silencio genere atención.]

Hoy vamos a hablar de algo que probablemente usan —VIVEN— los días sin saberlo.

No voy a hablar de un framework. No voy a hablar de una herramienta de moda. Voy a hablar de la razón por la que (Mercado Pago / app banco / SUBE) funciona a las 2 de la tarde del 29 de diciembre, cuando medio país está comprando al mismo tiempo.

**Voy a hablar de cómo se sostiene eso. Y de si ese "sostener" le está costando algo al planeta.**

[Señalar la pantalla brevemente.]

La charla se llama **"Metodologías DevOps para el Desarrollo Sostenible de Sistemas Digitales"**.
Cultura · GreenOps · Arquitecturas de Bajo Impacto · IA Local · SRE Evolucionado
Son 20 minutos de contenido, y les prometo que al final van a tener al menos tres preguntas nuevas que hacerse.

[Cambiar al tono más cercano, conversacional.]
→ Puente con GMET: crash dummy, misma empatía radical, distinto dominio.`,
  },

  /* 1 */ {
    title: 'DevOps y SRE: Fundamentos',
    timeRange: '01:30 – 03:30',
    guionSlide: '01',
    direction: 'Tono didáctico. Esta slide es el "ancla" de la charla.',
    notes: `**1. ¿Qué es DevOps?**
Cultura y mentalidad colaborativa. Romper silos.
"Si tú lo escribes, tú lo corres" (you build it, you run it).

**2. El Ciclo de Vida DevOps (Toolchain)**
Plan/Code → Build → Test → Configure/Release → Monitor
La automatización es el pegamento que une cada eslabón.

**3. SRE: Site Reliability Engineering**
Lo que sucede cuando un ingeniero de software diseña ops.

**Métricas de fiabilidad:**
• SLI: métrica real (latencia, error rate, throughput)
• SLO: objetivo interno ("p99 < 200ms")
• SLA: contrato legal con el cliente

→ Enfatizar que la fiabilidad es la característica más importante de cualquier producto.`,
  },

  /* 2 */ {
    title: 'DevOps Full Screen',
    timeRange: null,
    guionSlide: '02',
    direction: 'Solo visual — transición. Sin texto asignado.',
    notes: `[Slide únicamente visual con devops.gif a pantalla completa.
Sin texto del orador asignado — se utiliza como transición o
apoyo visual durante el bloque de DevOps.]`,
  },

  /* 3 */ {
    title: 'El Costo Energético de la Computación',
    timeRange: '03:30 – 05:00',
    guionSlide: '04',
    direction: 'Tono más serio. Datos duros. Oscuro en pantalla.',
    notes: `Quiero empezar con tres números.

• **1 a 3%** — electricidad global que consumen los centros de datos hoy.
  En 2026 podría duplicarse si el crecimiento de IA continúa.

• **2.5×** — creció el tráfico de datos en los últimos 5 años.

• **2%** — emisiones del sector TIC = transporte aéreo mundial.
  La nube es invisible. Nadie ve el CO₂ de un deploy.

[PAUSA]

¿Por qué les cuento esto?

Sus clientes europeos ya piden reportes de huella de carbono.
Regulaciones UE entran en vigencia este año.

**El crecimiento infinito de recursos llegó a su fin.**
**La eficiencia ya no es opcional: es supervivencia.**
No es solo ética. Es negocio.`,
  },

  /* 4 */ {
    title: 'El Paralelo del Crash Dummy',
    timeRange: '05:00 – 05:45',
    guionSlide: '05',
    direction: 'Tono más grave. Bajar velocidad. Pausas largas.',
    notes: `Déjenme plantear la escena.

Diseñamos software como los ingenieros automotrices de los 90:
elegantes en el laboratorio, catastróficos al chocar con la realidad.

[PAUSA]

Hoy el software es el sistema nervioso de la sociedad.
Cuando falla a las 3 AM, falla alguien real.

**No necesitamos héroes que no duermen.**
**Necesitamos sistemas diseñados para sobrevivir.**

Eso es DevOps.

→ Pregunta rápida al público: ¿quién conoce / trabaja con estos términos?`,
  },

  /* 5 */ {
    title: 'Ciclo de Vida Sostenible / GreenOps',
    timeRange: '05:45 – 08:00',
    guionSlide: '06',
    direction: 'Tono más técnico, pero accesible.',
    notes: `Entendemos el problema. ¿Cómo lo medimos?

Pipeline CI/CD con medición de carbono por etapa:
• **Code**: escáneres de eficiencia
• **Build**: energía por compilación (un build Java = preparar un mate)
• **Test**: carbono por suite de tests
• **Deploy**: SCI score
• **Producción**: carbono por request

**SCI = (E × I) + M**
E = energía consumida
I = intensidad de carbono de la red
M = carbono embebido del hardware
Dividido por unidad funcional (request / usuario / transacción)

**Carbon-Aware Scheduling**: mover cargas a horarios con más renovables.
**Pipeline Carbon Gate**: el pipeline rechaza deployments que excedan el umbral.

→ "Shift-left de sostenibilidad": como seguridad hace 10 años.`,
  },

  /* 6 */ {
    title: 'Arquitecturas de Bajo Impacto',
    timeRange: '08:00 – 10:30',
    guionSlide: '07',
    direction: 'Mayor velocidad. Mucho contenido. 3 columnas.',
    notes: `De métricas a decisiones de arquitectura.

**Virtualización inteligente:**
• eBPF: observabilidad del kernel sin overhead
• Unikernels: hasta 10× menos RAM que VMs
• Firecracker: microVM en <125ms (AWS Lambda)

**Edge Computing:**
• Procesar donde se genera el dato
• WebAssembly en el edge (Cloudflare Workers, Fastly)

**Orquestación carbon-aware:**
• KEDA: scale-to-zero nativo en K8s
• Time-shifting + spot instances

→ La arquitectura no es solo performance. Es energía, dinero, planeta.`,
  },

  /* 7 */ {
    title: 'IA Local & Automatización',
    timeRange: '10:30 – 13:00',
    guionSlide: '07',
    direction: 'Tono más cercano. Este bloque entusiasma.',
    notes: `"Si quiero usar IA en infra, ¿no tengo que mandar todo a OpenAI?"

No. Ya no.

• **Log analysis**: Ollama + Llama 3.1 en local. -90% latencia.
• **Code review**: Codestral / Qwen local. Sin datos en nube.
• **IaC generado por IA**: agente local → Terraform. Con guardrails.
• **Incident root-cause con RAG**: runbooks históricos.

**MCP — Model Context Protocol**
"USB para la IA". Estándar abierto de Anthropic.

**El nivel más importante: los guardrails humanos.**
La IA propone y ejecuta dentro de límites que el humano define.`,
  },

  /* 8 */ {
    title: 'SRE Evolucionado: SLOs de Sostenibilidad',
    timeRange: '13:00 – 15:30',
    guionSlide: '09',
    direction: 'Tono más académico. Señalar la tabla.',
    notes: `Gobernanza. ¿Cómo medimos si somos sostenibles?

**SRE**: práctica de Google para garantizar confiabilidad mediante SLOs.

**SRE evolucionado 2026: cada SLO tiene dimensión de sostenibilidad.**

• Disponibilidad: 99.9% uptime + < X gCO₂/req
• Latencia: p99 < 200ms + eficiencia energética
• Error Budget dual: presupuesto de falla + presupuesto de carbono

[Leer pausadamente:]

> "Un sistema que cumple el SLO de disponibilidad pero
> consume el doble de energía necesaria, **está fallando**."

→ Las alertas de carbono deberían existir tanto como las de uptime.`,
  },

  /* 9 */ {
    title: 'Los Tres Pilares de la Sostenibilidad DevOps',
    timeRange: '15:30 – 18:00',
    guionSlide: '10',
    direction: 'Síntesis. Más tranquilo. Conectar todo.',
    notes: `Tres pilares inseparables:

**1. Pilar humano**
Cultura blameless, psychological safety, on-call sostenible.
Sin esto, los otros dos no se sostienen.

**2. Pilar técnico**
12-Factor Apps, carbon gates, observabilidad total.
20% tiempo en refactoring no es lujo: es supervivencia.

**3. Pilar económico**
FinOps + GreenOps unificados. SCI como KPI de producto.
DORA Metrics como brújula.

→ Referencia: Accelerate (Forsgren, Humble, Kim).
30.000 encuestados. Equipos de élite tienen los tres pilares.`,
  },

  /* 10 */ {
    title: 'La Era de las Plataformas Inteligentes',
    timeRange: '18:00 – 19:30',
    guionSlide: '11',
    direction: 'Entusiasta. Futuro que ya está pasando.',
    notes: `**Platform Engineering**
80% de orgs grandes tendrán IDP para fin de 2026.
Golden Paths: "no te preocupes por K8s, usá el camino dorado".
Mercado Libre y Globant ya lo tienen.

**AI-Native DevOps**
-40% MTTR en equipos con AI-assisted ops (State of DevOps 2025).

**FinOps + GreenOps convergiendo**
Un dashboard. Costo $ y costo CO₂, mismas alertas.

**MCP como nuevo primitivo**
Infrastructure as Prompt. El agente orquesta, el humano gobierna.

→ DORA: 4× más deploys, 24h lead time, <1h MTTR.
¿En qué lado de la brecha quieren estar?`,
  },

  /* 11 */ {
    title: 'Experiencia en Vivo: El Test de las 3 AM',
    timeRange: '19:30 – 20:30',
    guionSlide: '12',
    direction: 'Bajar la voz. Cambio total de ritmo. Pausas largas.',
    notes: `Vamos a hacer algo distinto.

[PAUSA]

**Primero:** levanten la mano los que sintieron que infra era "problema de otro".

[Bien. Silos son el estado por defecto.]

**Segundo:** quiero pedirles que cierren los ojos.

[Hablar despacio.]

Son las 3 AM del viernes. Su teléfono suena. El sistema falló.
Hace 4 horas alguien hizo un push. Cambió una línea de config.

Tienen dos caminos:

1. Buscar culpables. Slack a las 3 AM.
2. Confiar en el proceso: rollback automático, runbooks, sistema se cura solo.

[PAUSA]

Abran los ojos.

→ La diferencia no es tecnológica. Es cultural.

> "En INFRAIT no apagamos incendios.
> Diseñamos sistemas que no se incendian."`,
  },

  /* 12 */ {
    title: 'Cierre & CTA',
    timeRange: '20:30 – 22:30',
    guionSlide: '13',
    direction: 'Más personal. Cerrar el círculo.',
    notes: `> "Construyamos sistemas que cuiden a las personas."

[PAUSA]

Cuidar = no llamar a las 3 AM, no generar deuda técnica,
no externalizar el costo ambiental.

Se van con tres cosas:

• **Cultura**: blameless, shared ownership
• **Técnica**: 12-Factor, carbon gates, SCI, SLOs sostenibles
• **Futuro**: Platform Engineering, FinOps+GreenOps, MCP

→ CTA según audiencia:
• Estudiantes: Laboratorio INFRAIT
• Graduados: calculen SCI de un endpoint crítico
• Docentes: hablemos para incorporar contenidos

Fuentes: Accelerate, DevOps Handbook, SRE Book, GSF, State of DevOps.`,
  },

  /* 13 */ {
    title: '¡Muchas Gracias! — Preguntas',
    timeRange: '25:00 – 30:00',
    guionSlide: '14',
    direction: 'Abrir preguntas. Tiempo de cierre.',
    notes: `[Abrir con pregunta disparadora:]

"Tienen cinco minutos. ¿Qué se llevan, qué les genera dudas,
o qué les parece que está equivocado de lo que dije?"

— Las preguntas "estás equivocado" son las que más aprendo.

**Preguntas frecuentes:**

• ¿Cómo convenzo al management?
→ GreenOps como caso de negocio: reducir factura de nube 30%.

• ¿IA local = capacidad de nube?
→ Para análisis de logs y IaC rutinaria: sí.
  Para razonamiento complejo: la brecha se cierra rápido.

• ¿Aplica a proyectos chicos?
→ Sí. Priorizar: cultura → observabilidad → carbon metrics → resto.

• ¿Cómo empiezo mañana?
→ greensoftware.foundation → Principles → SCI de un endpoint.
  Carbon Aware SDK en GitHub.`,
  },
];

/** Convenience: get notes for a slide index */
export function getSlideNote(index: number): SlideNote | undefined {
  return SLIDE_NOTES[index];
}

/** Convenience: total notes count (should match TOTAL_SLIDES) */
export const NOTES_COUNT = SLIDE_NOTES.length;
