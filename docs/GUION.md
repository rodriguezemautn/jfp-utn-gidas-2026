# GUIÓN COMPLETO

**"Metodologías DevOps para el Desarrollo Sostenible de Sistemas Digitales"**

UTN FRLP · Jornadas de Formación Profesional · Laboratorio INFRAIT
Duración total: 30 minutos | Formato: 5' intro + 20' contenido + 5' preguntas

**Convenciones de lectura**
- `[ACCIÓN]` → indicación escénica para el orador
- `[PAUSA]` → pausa intencional (mínimo 2 segundos)
- `[SLIDE]` → referencia a la diapositiva activa
- `→` → transición hacia el siguiente punto

---

## PARTE I — APERTURA (00:00 – 05:00)

---

### SLIDE 00 — Portada (00:00 – 01:30)

**[Esperar a que la sala se acomode. De pie, sin apoyarse en nada. Contacto visual con la audiencia antes de empezar a hablar.]**

Buenas tardes a todos.

*[Pausa corta. Dejar que el silencio genere atención.]*

Mi nombre es (nombre del orador), y hoy vamos a hablar de algo que probablemente usan todos los días sin saberlo.

No voy a hablar de un framework. No voy a hablar de una herramienta de moda. Voy a hablar de la razón por la que (nombre una app o servicio local conocido: Mercado Pago, la app de un banco, SUBE) funciona a las 2 de la tarde del 29 de diciembre, cuando medio país está comprando al mismo tiempo.

Voy a hablar de cómo se sostiene eso. Y de si ese "sostener" le está costando algo al planeta.

*[Señalar la pantalla brevemente.]*

La charla se llama "Metodologías DevOps para el Desarrollo Sostenible de Sistemas Digitales". Son 20 minutos de contenido, y les prometo que al final van a tener al menos tres preguntas nuevas que hacerse sobre los sistemas que operan o que van a operar.

---

### SLIDE 01 — DevOps y SRE: Fundamentos (01:30 – 03:30)

*[Cambiar al tono más cercano, conversacional.]*

Las colegas de GMET nos mostraron algo poderoso: que diseñar sin incluir todas las miradas tiene consecuencias reales. El caso del crash dummy es perfecto porque es concreto, es físico, y es difícil argumentar en contra.

*[PAUSA]*

Ahora, ¿qué tiene que ver eso con devops?

Tiene todo que ver.

Ellas están hablando de quién está en la mesa cuando se decide cómo se diseña algo. Nosotros vamos a hablar de quién está en la mesa cuando se decide cómo se sostiene ese diseño en producción, año tras año, sin que el sistema colapse, sin que el equipo se queme, y —esto es lo nuevo en 2026— sin que el planeta pague la cuenta.

*[Señalar ambas tarjetas en la pantalla.]*

La misma empatía radical. Distinto dominio.

GMET: empatía hacia el usuario final que no fue representado. DevOps sostenible: empatía hacia el operador que mantiene eso vivo a las 3 AM, y hacia el planeta que consume ese cómputo.

Son dos caras de la misma moneda.

---

### SLIDE 02 — DevOps Full Screen

*[Slide unicamente visual con devops.gif a pantalla completa. Sin texto del orador asignado — se utiliza como transición o apoyo visual durante el bloque de DevOps.]*

---

### SLIDE 03 — El Costo Energético de la Computación (03:30 – 05:00)

*[Tono más grave. Bajar la velocidad del habla.]*

Déjenme plantear la escena.

Durante décadas, diseñamos software como los ingenieros automotrices de los años 90: coches elegantes, con buenos materiales, que en las pruebas de laboratorio eran perfectos.

*[PAUSA]*

Y que fallaban estrepitosamente al chocar con la realidad.

*[Subir levemente el volumen.]*

Hoy, en 2026, el software no es un accesorio. Es el sistema nervioso de la sociedad. Salud. Transporte. Finanzas. Educación. Comunicación.

Cuando ese sistema falla a las 3 AM del sábado, no falla una pantalla. Falla alguien que no puede transferir dinero para una emergencia. Falla alguien que no puede acceder a su historia clínica. Falla alguien que depende de ese servicio para trabajar.

*[Pausa larga. 3 segundos.]*

¿Qué hacemos ante eso?

*[Señalar el recuadro verde en pantalla. Leer con convicción.]*

No necesitamos héroes que no duermen. Necesitamos sistemas diseñados para sobrevivir.

Eso es DevOps. Eso es lo que vamos a construir hoy.

*[Breve pausa. Cambio de energía hacia adelante.]*

---

### SLIDE 04 — El Paralelo del Crash Dummy (05:00 – 05:45)

*[Tono más activo. Señalar los cinco bloques mientras los nombra.]*

Cinco bloques, 20 minutos. Voy a moverme rápido, pero con profundidad donde importa.

*[Esta slide retoma el puente con GMET y la idea del crash dummy como metáfora de diseño inclusivo — extendido ahora al ámbito de la sostenibilidad de sistemas.]*

*[Pregunta rápida al público, tono casual.]*

¿Alguien nunca escuchó ninguno de estos términos? *[Levantar la mano. Mirar. Asentir.]* ¿Alguien trabaja con al menos uno de ellos hoy? *[Levantar la mano. Mirar.]*

Perfecto. Arrancamos.

---

## PARTE II — CONTENIDO (05:00 – 25:00)

---

### SLIDE 05 — Ciclo de Vida Sostenible / GreenOps (05:45 – 08:00)

*[Cambio a oscuro en pantalla. Tono más serio, datos duros.]*

Quiero empezar con tres números.

*[Señalar el primer recuadro.]*

**1 a 3 por ciento.** Ese es el porcentaje de la electricidad global que consumen los centros de datos hoy. Según la Agencia Internacional de Energía, en 2026 esa cifra podría duplicarse si el crecimiento de la IA generativa continúa al ritmo actual.

*[Señalar el segundo recuadro.]*

**2.5 veces.** Así creció el tráfico de datos en los últimos cinco años, impulsado principalmente por el entrenamiento y la inferencia de modelos de inteligencia artificial.

*[Señalar el tercer recuadro.]*

**2 por ciento.** Las emisiones del sector TIC ya equivalen a las del transporte aéreo mundial. Y a diferencia del avión, que es visible, la nube es invisible. Nadie ve el CO₂ de un deploy.

*[PAUSA]*

Ahora, ¿por qué les cuento esto a ustedes?

Porque si van a trabajar en la industria tecnológica en Argentina con clientes globales —y muchos de ustedes ya lo hacen o van a hacerlo— sus clientes europeos ya están pidiendo reportes de huella de carbono del software. No es futuro lejano. Algunas regulaciones de la Unión Europea ya entran en vigencia este año.

*[Señalar el recuadro inferior.]*

El crecimiento infinito de recursos llegó a su fin. La eficiencia ya no es opcional: es supervivencia.

No es solo ética. Es negocio.

---

### SLIDE 06 — Arquitecturas de Bajo Impacto (08:00 – 10:30)

*[Tono más técnico, pero accesible.]*

Muy bien. Entendemos el problema. ¿Cómo lo medimos?

*[Señalar el pipeline en pantalla.]*

Este es el pipeline de CI/CD que la mayoría de ustedes conoce: código, build, test, deploy, producción. Lo que quiero mostrarles es que en cada etapa de ese pipeline podemos —y debemos— medir el impacto de carbono.

- En la etapa de **code**: escáneres de eficiencia que detectan patrones de alto consumo antes de que lleguen al build.
- En el **build**: energía consumida por cada compilación. ¿Sabían que un build de Java enterprise puede consumir más energía que preparar un mate? No es metáfora, hay mediciones.
- En el **test**: carbono por suite de tests. Los tests de integración pesados son los peores culpables.
- En el **deploy**: el SCI score, que explico en un segundo.
- En **producción**: carbono por request. La métrica final que importa.

*[Señalar la barra de fórmula.]*

La **Software Carbon Intensity**, o **SCI**, es el estándar internacional definido por la Green Software Foundation. La fórmula es simple:

**SCI = (E × I) + M, por unidad funcional.**

- **E** es la energía consumida.
- **I** es la intensidad de carbono de la red eléctrica donde corre tu software — y esto varía según el país, la hora del día, la estación del año.
- **M** es el carbono del hardware que fabricaron para que tu código pudiera correr.
- Y todo eso, dividido por tu **unidad funcional**: un request, un usuario, una transacción.

*[PAUSA]*

*[Señalar las tres tarjetas inferiores.]*

¿Qué hacemos con eso?

**Carbon-Aware Scheduling:** mover cargas de trabajo a momentos donde la red eléctrica tiene más renovables. En Argentina, la red tiene picos de renovables en ciertos horarios. Un batch job que se corre a las 2 AM en lugar de las 2 PM puede tener 40 a 60 por ciento menos de emisiones. Mismo resultado, menos carbono.

**Pipeline Carbon Gate:** el pipeline rechaza deployments que superen el SCI threshold. Igual que un test que falla bloquea el merge, una métrica de carbono que supera el umbral bloquea el deploy.

Esto se llama **"shift-left de sostenibilidad"**. Lo mismo que hicimos con la seguridad hace diez años, ahora lo hacemos con el carbono.

---

### SLIDE 07 — IA Local & Automatización (10:30 – 13:00)

*[Tono más técnico. Mayor velocidad. Este bloque tiene mucho contenido.]*

Hasta acá hablamos de métricas. Ahora hablamos de decisiones de arquitectura. Porque la arquitectura determina la eficiencia antes de escribir la primera línea de código.

*[Señalar columna izquierda.]*

**Virtualización inteligente.**

**eBPF** es probablemente la tecnología más importante que llegó a Linux en los últimos diez años. Permite observabilidad completa del kernel sin agentes externos, sin overhead. Antes necesitabas instalar un agente por servidor. Ahora el kernel te dice todo, solo.

**Unikernels:** en lugar de un sistema operativo completo, cada aplicación lleva solo las dependencias del SO que necesita. El resultado es hasta diez veces menos RAM que una VM tradicional.

**Firecracker,** que fue creado por Amazon para correr AWS Lambda, arranca una microVM en menos de 125 milisegundos y usa una fracción de los recursos de una VM convencional. Más densidad por servidor, menos servidores, menos energía.

*[Señalar columna central.]*

**Edge Computing.**

La idea es simple: si proceso el dato donde se genera, no necesito mandarlo al centro de datos. Menos tráfico de red, menor latencia, menor huella.

**WebAssembly,** que muchos conocen del browser, hoy corre en el borde en plataformas como Cloudflare Workers y Fastly. Es portátil, seguro por diseño, y extremadamente eficiente.

*[Señalar columna derecha.]*

**Orquestación carbon-aware.**

**KEDA,** que es un proyecto de la Cloud Native Computing Foundation, permite scale-to-zero nativo en Kubernetes. Si nadie está usando el servicio, no corre, no consume. Esta idea parece obvia pero la mayoría de los sistemas productivos que conozco tienen servicios corriendo a cero tráfico las 24 horas.

**Time-shifting** de batch jobs: volvemos a la idea de mover trabajo al momento correcto. Spot instances en regiones con energía renovable. FinOps y GreenOps tienen exactamente el mismo objetivo: menos desperdicio. Solo que uno lo mide en dólares y el otro en toneladas de CO₂.

*[Pausa breve.]*

La arquitectura no es solo performance. Es energía. Es dinero. Es planeta.

---

### SLIDE 08 — SRE Evolucionado: SLOs de Sostenibilidad (13:00 – 15:30)

*[Tono más cercano. Este bloque entusiasma.]*

Ahora viene el bloque que más preguntas genera cuando lo doy.

La pregunta que me hacen siempre es: "Si quiero usar IA en mi infraestructura, ¿no tengo que mandar todos mis datos a OpenAI o a Google?"

La respuesta en 2026 es: no. Ya no.

*[Señalar la columna izquierda con casos de uso.]*

**Análisis de logs** con Ollama más Llama 3.1: corre en hardware local, en una Mac M-series, en una workstation con GPU consumer. 90 por ciento menos de latencia que una API externa. Y los logs de tu infraestructura no salen de tu red.

**Code review automatizado:** modelos como Codestral o Qwen corriendo localmente analizan cada PR. Sin datos en nube de terceros. Sin costo por token.

**Infrastructure as Code generado por IA:** un agente local lee tu estado de Kubernetes, entiende lo que necesitas, genera el Terraform. Con guardrails. Esto es posible hoy.

**Incident root-cause con RAG:** Retrieval Augmented Generation sobre tus runbooks. El agente tiene acceso a toda tu documentación histórica de incidentes y en segundos puede decirte "este síntoma apareció tres veces antes, acá está el patrón".

*[Señalar el diagrama MCP a la derecha.]*

Y todo esto se conecta a través de **MCP**, el Model Context Protocol.

MCP es un estándar abierto —fue publicado por Anthropic a finales de 2024— que define cómo los agentes de IA se conectan a herramientas externas de forma estandarizada y segura. Piénsenlo como **USB para la IA**: un protocolo único para conectar modelos con kubectl, con Terraform, con bases de datos, con sistemas de alertas.

*[Señalar el nivel inferior del diagrama: "Guardrails Humanos".]*

Pero —y esto es crucial— el nivel más importante en ese stack no es el agente. Es este: **los guardrails humanos**.

La IA no reemplaza al ingeniero. La IA es el copiloto que propone y ejecuta acciones dentro de límites que el humano define. Qué puede hacer, hasta dónde puede llegar, qué requiere aprobación. Eso no es limitación tecnológica; es madurez de ingeniería.

---

### SLIDE 09 — Los Tres Pilares de la Sostenibilidad DevOps (15:30 – 18:00)

*[Tono más académico pero sin perder energía. Señalar la tabla.]*

Bien. Tenemos el problema, tenemos las herramientas, tenemos la arquitectura. Ahora hablamos de gobernanza. ¿Cómo medimos si estamos siendo sostenibles?

Esto es **Site Reliability Engineering evolucionado**.

Para los que no lo conocen: SRE es la práctica que Google describió en su libro del mismo nombre, que define cómo las organizaciones de ingeniería garantizan la confiabilidad de sus sistemas mediante la gestión de Service Level Objectives, o SLOs.

Un SLO es un acuerdo interno: "este sistema va a estar disponible el 99.9 por ciento del tiempo". Si se rompe eso, hay consecuencias. Se congela el roadmap. Se invierte en confiabilidad.

*[Señalar las columnas de la tabla.]*

Lo que propone el SRE evolucionado para 2026 es simple: **cada SLO tiene ahora una dimensión de sostenibilidad.**

- **Disponibilidad:** antes era 99.9% de uptime. Ahora es 99.9% de uptime más `< X gCO₂/req`.
- **Latencia:** antes era p99 < 200ms. Ahora es eso, más eficiencia energética. Porque una respuesta rápida y eficiente no es lo mismo que una respuesta rápida y derrochadora.
- **Error Budget:** este es el concepto más importante. El error budget es el presupuesto de falla permitido. Si lo gastas, frenas features y pagas deuda técnica. En la versión 2026, hay un **error budget dual**: presupuesto de falla más presupuesto de carbono. Si agotás cualquiera de los dos, hay que frenar y mejorar.

*[Señalar la cita al pie.]*

*[Leer pausadamente.]*

> "Un sistema que cumple el SLO de disponibilidad pero consume el doble de energía necesaria, **está fallando**."

*[PAUSA]*

Eso es una provocación técnica deliberada. Porque la mayoría de los dashboards que veo en producción miden uptime, latencia y error rate. Nadie mide el gasto energético por request. Nadie tiene una alerta que diga "hoy procesaste el mismo volumen pero consumiste un 40 por ciento más de energía que ayer". Esa alerta debería existir.

---

### SLIDE 10 — La Era de las Plataformas Inteligentes (18:00 – 19:30)

*[Tono de síntesis. Más tranquilo. Conectar todo.]*

Antes de hablar del horizonte, necesito hacer una parada.

Porque todo lo que describimos —cultura blameless, GreenOps, arquitecturas de bajo impacto, IA con guardrails, SLOs duales— no son prácticas aisladas. Son **tres pilares** que, si no están juntos, no funcionan.

*[Señalar columna izquierda.]*

**El pilar humano:** cultura blameless, responsabilidad compartida, psychological safety, on-call que no mata a la gente. Sin esto, los otros dos pilares no se sostienen. Un equipo que tiene miedo de cometer errores no va a experimentar. Un equipo quemado no va a tener capacidad cognitiva para optimizar nada.

*[Señalar columna central.]*

**El pilar técnico:** 12-Factor Apps, CI/CD con carbon gates, observabilidad total, deuda técnica controlada. El veinte por ciento del tiempo en refactoring no es lujo; es la diferencia entre un sistema que mejora y uno que se pudre.

*[Señalar columna derecha.]*

**El pilar económico:** FinOps y GreenOps unificados, SCI como KPI de producto, DORA Metrics como brújula. El costo ya no es solo dinero; es energía, es carbono, es deuda técnica acumulada.

*[Pausa.]*

Estos tres son inseparables. El pilar técnico sin el humano genera deuda técnica invisible. El humano sin el económico genera activismo sin sustancia. Y el económico sin el humano genera un equipo que optimiza métricas a costa de las personas que las producen.

La referencia académica que respalda esto es **Accelerate**, de Nicole Forsgren, Jez Humble y Gene Kim. Cuatro años de investigación, más de 30.000 encuestados. Los equipos de élite tienen los tres pilares. No es opinión; es dato.

---

### SLIDE 11 — Experiencia en Vivo: El Test de las 3 AM (19:30 – 20:30)

*[Tono más entusiasta. Este es el futuro que ya está pasando.]*

Llegamos al presente más cercano.

*[Señalar cada item al nombrarlo.]*

**Platform Engineering:** Gartner predice que para fin de 2026, el 80% de las organizaciones grandes van a tener un Internal Developer Platform. Un IDP es básicamente una capa de abstracción que le dice a un desarrollador: "no te preocupes por Kubernetes, no te preocupes por Terraform, no te preocupes por el pipeline de CI/CD. Acá está tu Golden Path. Usalo, y enfocate en crear valor". En Argentina, Mercado Libre y Globant ya lo tienen.

**AI-Native DevOps:** no es "usar ChatGPT para escribir código". Es agentes que monitorean sistemas, detectan anomalías, ejecutan runbooks automáticamente, y escalan al humano solo cuando está fuera de sus límites. El State of DevOps Report 2025 reporta una reducción promedio del 40% en MTTR —tiempo de recuperación ante incidentes— en equipos con AI-assisted operations.

**FinOps + GreenOps convergiendo:** un solo dashboard. Costo en dólares y costo en carbono, en la misma pantalla, con las mismas alertas.

**MCP como nuevo primitivo:** Infrastructure as Prompt. El agente orquesta, el humano gobierna.

*[Señalar DORA stats a la derecha.]*

Y los números que lo respaldan: **4 veces más deployments, 24 horas de lead time, menos de una hora de MTTR**. Eso no es el promedio de la industria. Eso es el nivel de élite. Y la brecha entre élite y promedio sigue creciendo. La pregunta es en qué lado de esa brecha quieren estar.

---

### SLIDE 12 — Cierre & CTA (20:30 – 22:30)

*[Bajar la voz. Cambio total de ritmo.]*

Vamos a hacer algo distinto por dos minutos.

*[Pausa. Esperar que se genere atención.]*

Necesito que hagan algo por mí.

**Primero:** levanten la mano los que alguna vez sintieron que la infraestructura era "el problema de otro". Que el equipo de operaciones lo arregle, que el SRE lo vea, que el DevOps lo resuelva.

*[Levantar la propia mano. Esperar. Mirar la audiencia.]*

Bien. La mayoría. Es normal. Los silos son el estado por defecto de la industria. No es una crítica; es un diagnóstico.

*[Pausa.]*

**Segundo:** quiero pedirles que cierren los ojos. Literal.

*[Esperar a que lo hagan. Bajar aún más el tono. Hablar despacio.]*

Son las tres de la mañana del viernes. Su teléfono suena. No es una persona que llama; es la alerta del sistema de monitoreo.

El sistema falló. Un servicio crítico está caído. Hay un usuario real, en algún lugar del país, que no puede acceder a algo que necesita ahora.

Hace cuatro horas, alguien hizo un push a producción. El commit en cuestión cambió una línea de configuración.

*[PAUSA — 3 segundos.]*

Tienen dos caminos.

**El primero:** buscar quién fue. Revisar el git log, identificar al responsable, mandar un mensaje al grupo de Slack a las 3 AM con el nombre del culpable.

**El segundo:** confiar en que el proceso tiene rollback automático, que las alertas ya notificaron al equipo correcto, que el runbook documentado está siendo ejecutado, y que el sistema se va a curar solo mientras ustedes siguen durmiendo.

*[PAUSA.]*

Abran los ojos.

*[Pausa larga. Mirar la audiencia.]*

La diferencia entre esos dos caminos no es tecnológica. Es cultural. Es el pilar uno del que hablamos.

Y la diferencia técnica que hace posible el segundo camino es exactamente todo lo que describimos en los últimos 15 minutos: observabilidad, rollback automático, runbooks ejecutables, carbon budgets que alertan antes de que el problema llegue a producción.

*[Señalar el recuadro verde al pie. Leer con fuerza.]*

> "En INFRAIT no apagamos incendios. Diseñamos sistemas que no se incendian."

---

### SLIDE 13 — Recursos, Contacto y Agradecimientos (22:30 – 25:00)

*[Tono más personal. Cerrar el círculo.]*

*[Leer la cita con pausa entre las dos líneas.]*

> "Construyamos sistemas que cuiden a las personas."

*[PAUSA]*

Es fácil decirlo. Lo difícil es operacionalizarlo.

Porque cuidar a las personas significa no llamarlas a las 3 AM cuando el sistema debería recuperarse solo. Significa no generar deuda técnica que alguien más va a tener que pagar. Significa no externalizar el costo ambiental del cómputo a las generaciones futuras.

Eso es lo que hace un sistema sostenible.

*[Señalar las tres tarjetas.]*

Se van con tres cosas hoy:

- **Cultura:** blameless, shared ownership, psychological safety. Sin esto, todo lo demás es cosmético.
- **Técnica:** 12-Factor, CI/CD con carbon gates, SCI, SLOs de sostenibilidad. Las métricas que importan en 2026 no son solo las de performance.
- **Futuro:** Platform Engineering, FinOps + GreenOps, AI-Native, MCP. Esto no es ciencia ficción; es el estado del arte hoy.

*[Pausa. Cambio de tono para el call to action. Adaptar según audiencia.]*

> *[Para estudiantes:]* Si quieren trabajar en serio con esto, el Laboratorio INFRAIT es el lugar. Proyectos reales, problemas reales, con el nivel técnico de la industria. La puerta está abierta.
>
> *[Para graduados que ya trabajan:]* Les dejo un desafío concreto: ¿cuánto carbono emite su sistema hoy? Si no lo saben, esa es su próxima tarea. Calculen el SCI de un endpoint crítico. Es más simple de lo que parece, y les va a cambiar cómo piensan el sistema.
>
> *[Para docentes:]* Si quieren incorporar estos contenidos a sus materias, hablemos. Tenemos casos de uso, material y ganas de colaborar.

*[PAUSA FINAL]*

*[Señalar la bibliografía al pie.]*

Las fuentes están en la última diapositiva: Accelerate, el DevOps Handbook, el SRE Book de Google, la Green Software Foundation, el State of DevOps 2025. Todo está disponible, la mayoría en acceso abierto.

Muchas gracias.

*[Pausa. No agregar nada más. Dejar que el silencio sea el punto final.]*

---

### SLIDE 14 — ¡Muchas Gracias! (Preguntas: 25:00 – 30:00)

**[Abrir con una pregunta disparadora si la audiencia no arranca:]**

> "Tienen cinco minutos. Las preguntas más interesantes siempre son las que nadie se anima a hacer. Yo las animo. ¿Qué se llevan, qué les genera dudas, o qué les parece que está equivocado de lo que dije?"

*[Agregar: "Las preguntas que dicen 'estás equivocado en X' son las que más aprendo." Esto baja la barrera.]*

#### Preguntas frecuentes anticipadas

**P:** ¿Cómo convenzo a mi empresa de implementar esto si el management solo mira el costo?

**R:** Esa es exactamente la pregunta correcta. La respuesta está en el lenguaje que usa el management. Si solo ven costos, GreenOps es la puerta: "podemos reducir la factura de nube un 30 por ciento moviendo workloads a horarios de menor costo energético." Cuando entienden que carbono y dinero tienen la misma fuente —el consumo eficiente— la conversación cambia. Empiecen con el caso de negocio, no con el manifiesto de sostenibilidad.

---

**P:** ¿Los modelos de IA local tienen el mismo nivel de capacidad que los de nube?

**R:** Depende del caso de uso. Para análisis de logs, clasificación de incidentes, generación de IaC rutinaria: sí, completamente. Para razonamiento complejo de alto nivel: todavía no al mismo nivel. Pero la brecha se cierra rápido. Y para la mayoría de los casos de automatización de infraestructura, modelos de 7 a 13 mil millones de parámetros son más que suficientes y corren en hardware accesible.

---

**P:** ¿DevOps sostenible aplica a proyectos pequeños o solo a grandes empresas?

**R:** Aplica a cualquier escala, pero la priorización cambia. En un proyecto pequeño, el impacto de adoptar scale-to-zero y un pipeline CI/CD con métricas básicas es enorme y barato. No hace falta implementar todo el stack desde el día uno. El orden sugerido: primero cultura blameless, después observabilidad, después carbon metrics básicas, después todo lo demás.

---

**P:** ¿Cómo empiezo mañana mismo?

**R:** Con la Green Software Foundation. Entrar a greensoftware.foundation, leer los Principles of Green Software Engineering, y calcular el SCI de su sistema más crítico. Son tres horas de trabajo y les va a dar una línea base real. Después buscan el Carbon Aware SDK en GitHub. Es open source y está listo para integrar.

---

## NOTAS FINALES DE PRODUCCIÓN

- **Agua:** tener un vaso a la vista. Beber antes de los bloques largos (05 y 07).
- **Tiempo:** llevar reloj o tener el cronómetro del teléfono visible. Los bloques técnicos tienden a extenderse.
- **Energía:** el bloque de la experiencia 3 AM (slide 11) es el punto más alto de impacto emocional. No apurar. Esa pausa de 3 segundos con ojos cerrados vale más que cualquier slide.
- **Conexión con GMET:** si hay posibilidad, coordinar con las expositoras de GMET antes para alinear la cita del crash dummy y que sea explícita la conexión.
- **Slide 08 (SRE):** es el más técnico y más nuevo para la audiencia. Calibrar velocidad según la respuesta de la sala.
