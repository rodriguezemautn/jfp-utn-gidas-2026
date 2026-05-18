# [DIAPOSITIVA: INTRODUCCIÓN A DEVOPS Y SRE]

## 1. ¿Qué es DevOps?
DevOps no es un puesto de trabajo ni una herramienta, sino una **cultura y mentalidad colaborativa** que enfatiza la comunicación, integración y automatización entre los equipos de Desarrollo (Dev) y Operaciones (Ops). Su objetivo fundamental es **romper los silos de responsabilidad** para lograr una entrega de software más rápida, confiable y de alta calidad. Se basa en el principio de que "si tú lo escribes, tú lo corres" (*you build it, you run it*), eliminando el muro de confusión entre equipos.

## 2. El Ciclo de Vida DevOps (Toolchain)
El flujo de trabajo se visualiza como una **cadena de valor continua** que define cada paso del proceso de producción:
*   **Plan/Code:** Los desarrolladores crean el código y lo gestionan en repositorios compartidos (Control de Versiones).
*   **Build:** El código se descarga en un servidor de construcción y se compila de forma automática.
*   **Test:** Se ejecutan pruebas unitarias e integradas automatizadas para validar la calidad.
*   **Configure/Release:** Se gestiona la **Infraestructura como Código (IaC)** para aprovisionar entornos y desplegar el artefacto de forma predecible.
*   **Monitor:** Se obtiene retroalimentación constante sobre la salud del sistema y la infraestructura para detectar errores proactivamente.

![sdlc_devops](../public/assets/devops.gif)
**Referencia** 
**DevOps Lens of SDLC
(Tushar Murudkar
Jan 16, 2024)**
https://medium.com/@tusharmurudkar/devops-lens-of-sdlc-c5939969743e

## 3. SRE: Ingeniería de Confiabilidad de Sitios
**SRE (Site Reliability Engineering)** es lo que sucede cuando se le pide a un ingeniero de software que diseñe y gestione un equipo de operaciones. Mientras que DevOps es el marco cultural, SRE es una **implementación técnica específica** que se enfoca en la estabilidad y la escalabilidad.

### Métricas de Fiabilidad: SLI, SLO y SLA
Para gestionar el riesgo de forma científica, SRE utiliza tres niveles de medición:
*   **SLI (Service Level Indicator):** Es la métrica real y cuantitativa de *qué* nivel de servicio se está proporcionando en un momento dado (ej. latencia, tasa de errores o rendimiento).
*   **SLO (Service Level Objective):** Es el **objetivo interno** o rango de valores deseados para un SLI (ej. "el 99.9% de las peticiones deben responder en menos de 100ms"). Define el umbral de éxito del equipo.
*   **SLA (Service Level Agreement):** Es el **contrato legal** con el cliente final que incluye las consecuencias (generalmente financieras) de no cumplir con los SLOs. Suele ser un margen más amplio que el SLO interno para permitir maniobra operativa.

***

**Nota para el disertante:** *Esta diapositiva sirve como el "ancla" de la charla. Al presentar el ciclo de vida, enfatiza que la automatización es el pegamento que une cada eslabón, y al explicar SRE, destaca que la fiabilidad es la característica más importante de cualquier producto.*