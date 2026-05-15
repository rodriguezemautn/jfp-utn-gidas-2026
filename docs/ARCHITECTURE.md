# Arquitectura — DevOps Sostenible

## Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | React | 19.2.6 |
| Lenguaje | TypeScript | ~6.0.2 |
| Build Tool | Vite | 8.0.12 |
| CSS | Tailwind CSS | 4.3.0 |
| Package Manager | pnpm | 11.1.2 |
| Linting | ESLint + typescript-eslint | 10.3.0 / 8.59.3 |
| Build Image | node | 24-alpine |
| Runtime | nginx | stable-alpine |

## Estructura de Directorios

```
presentacion-jpf/
├── src/
│   ├── main.tsx                          # Entry point (createRoot)
│   ├── App.tsx                           # Layout principal + render condicional de slides
│   ├── index.css                         # Tailwind + custom utilities y animaciones
│   ├── types/
│   │   └── index.ts                      # TOTAL_SLIDES, SlideStatus, SLIDE_STATUSES
│   ├── hooks/
│   │   └── useSlideNavigation.ts         # Hook de navegación (keyboard + presenter)
│   └── components/
│       ├── StatusBar.tsx                  # Barra superior: pipeline, progreso, dots, reloj
│       ├── NavigationControls.tsx         # Controles inferiores: PREV/NEXT + contador
│       ├── LiveChart.tsx                  # Gráfico animado en Canvas (datos aleatorios)
│       ├── Particles.tsx                  # Partículas flotantes verdes (DOM manipulation)
│       └── slides/
│           ├── Slide00Intro.tsx           # Intro + whoami + GMET bridge
│           ├── Slide01Imperativo.tsx      # Estadísticas de energía + LiveChart
│           ├── Slide02VideoHook.tsx       # Video crash dummy + poema animado
│           ├── Slide03GreenOps.tsx        # Fórmula SCI + CI/CD carbon gate
│           ├── Slide04LowImpactArch.tsx   # Virtualización, Edge, Orquestación
│           ├── Slide05LocalAI.tsx         # Ollama, MCP, LLM local stack
│           ├── Slide06SRE.tsx             # Tabla SLO tradicional vs sostenibilidad
│           ├── Slide07Sintesis.tsx        # Tres pilares: Humana, Técnica, Económica
│           ├── Slide08Horizonte.tsx       # Platform Eng, AI-Native, FinOps, MCP
│           ├── Slide09ThreeAMTest.tsx     # Test de empatía (3 AM)
│           ├── Slide10Cierre.tsx          # Resumen + referencias
│           └── Slide11Gracias.tsx         # Q&A + contactos GiDAS
├── public/
│   └── assets/
│       ├── logo-gidas.png                 # Logo del grupo GiDAS
│       ├── video.webm                     # Video hook (formato web)
│       └── video.mp4                      # Video hook (fallback)
├── docker-images/                         # Imágenes Docker exportadas (.tar)
├── docs/                                  # Documentación del proyecto
├── Dockerfile                             # Multi-stage build
├── docker-compose.yml                     # Servicio presentacion (8080:80)
├── nginx.conf                             # SPA routing + asset caching
├── package.json
├── pnpm-lock.yaml
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── eslint.config.js
```

## Arquitectura de Renderizado

### Capas de Z-Index (de fondo a frente)

```
z-0   │ Grid background (CSS grid-bg)
z-0   │ Particles (DOM container)
z-1   │ Canvas container (slides)
z-50  │ StatusBar (top bar)
z-50  │ NavigationControls (bottom bar)
z-40  │ Logo GiDAS (watermark)
z-9999│ Scanlines overlay (CRT effect)
```

### Flujo de Componentes

```
main.tsx
  └── <App />
        ├── Grid Background (CSS)
        ├── Scanlines Overlay (CSS)
        ├── <Particles />
        ├── <StatusBar /> ────────────────► Muestra pipeline status, progreso, dots, reloj
        ├── Canvas Container ─────────────► Renderiza UN SlideLayer visible a la vez
        │     ├── SlideLayer (slide 0)
        │     ├── SlideLayer (slide 1)
        │     ├── ...
        │     └── SlideLayer (slide 11)
        ├── <NavigationControls /> ───────► Botones PREV/NEXT + contador
        └── Logo GiDAS (watermark)
```

### SlideLayer Pattern

Cada slide se monta siempre en el DOM pero solo uno es visible:

```tsx
<SlideLayer show={currentSlide === N}>
  <SlideXXNombre />
</SlideLayer>
```

Esto permite transiciones suaves (opacity + scale) sin re-montar componentes.

## Sistema de Navegación

### Hook: `useSlideNavigation`

```
useSlideNavigation()
  ├── useState: currentSlide (0-11)
  ├── goToSlide(index) ──► valida bounds ──► setCurrentSlide
  ├── nextSlide() ───────► Math.min(prev + 1, TOTAL_SLIDES - 1)
  ├── prevSlide() ───────► Math.max(prev - 1, 0)
  └── useEffect(keydown listener)
        ├── ArrowRight / ArrowDown / PageDown / Space ──► nextSlide()
        └── ArrowLeft / ArrowUp / PageUp ───────────────► prevSlide()
```

### Métodos de Navegación

| Método | Teclas | Notas |
|--------|--------|-------|
| Siguiente | →, ↓, PageDown, Espacio | Soporta presentadores USB |
| Anterior | ←, ↑, PageUp | Soporta presentadores USB |
| Directa | Click en dots del StatusBar | Navegación aleatoria |
| UI | Botones PREV/NEXT | Siempre visibles |

## Sistema de Tipos

### `SlideStatus`

Tipo union que mapea cada slide a un estado tipo pipeline CI/CD:

```typescript
type SlideStatus =
  | 'PIPELINE: INITIALIZING'    // Slide 00
  | 'PIPELINE: IMPERATIVO_2026' // Slide 01
  | 'PIPELINE: HOOK_VIDEO_LOAD' // Slide 02
  | 'PIPELINE: GREENOPS_BUILD'  // Slide 03
  | 'PIPELINE: ARCH_DEPLOY'     // Slide 04
  | 'PIPELINE: AI_STACK_LOAD'   // Slide 05
  | 'PIPELINE: SRE_V2_CHECK'    // Slide 06
  | 'PIPELINE: SINTESIS_TEST'   // Slide 07
  | 'PIPELINE: HORIZONTE_2026'  // Slide 08
  | 'PIPELINE: EMPATIA_LIVE'    // Slide 09
  | 'PIPELINE: COMPLETE'        // Slide 10
  | 'PIPELINE: Q&A';            // Slide 11
```

### `TOTAL_SLIDES`

Constante exportada (valor actual: 12). Usada en:
- `useSlideNavigation` para validación de bounds
- `StatusBar` para cálculo de progreso y render de dots
- `NavigationControls` para display del contador

## Sistema de Estilos

### Tailwind CSS v4 con `@theme`

Custom properties definidas en `src/index.css`:

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg-primary` | `#050505` | Fondo principal |
| `--color-bg-panel` | `#0a0a0a` | Fondo de cards |
| `--color-accent-green` | `#00FF41` | Color primario (matrix green) |
| `--color-accent-green-dim` | `rgba(0,255,65,0.15)` | Fondos sutiles |
| `--color-accent-green-glow` | `rgba(0,255,65,0.4)` | Sombras glow |
| `--color-text-primary` | `#f0f0f0` | Texto principal |
| `--color-text-secondary` | `#888888` | Texto secundario |
| `--color-border-subtle` | `rgba(255,255,255,0.08)` | Bordes sutiles |
| `--color-border-green` | `rgba(0,255,65,0.3)` | Bordes accent |
| `--font-sans` | `'Geist', sans-serif` | Tipografía principal |
| `--font-mono` | `'JetBrains Mono', monospace` | Tipografía terminal |

### CSS Utilities

| Clase | Descripción |
|-------|-------------|
| `.grid-bg` | Fondo de cuadrícula con gradiente radial |
| `.scanlines` | Efecto CRT con líneas horizontales |
| `.glow-green` | Sombra verde glow |
| `.text-glow` | Text-shadow verde glow |
| `.bento-card` | Card con border, backdrop-blur, hover effects |
| `.docker-container` | Container con gradiente verde y dot animado |
| `.video-frame` | Frame de video con border y shadow |
| `.terminal-text` | Texto estilo terminal con colores por tipo |
| `.nav-node` | Dot de navegación con hover/active states |
| `.slide-fade` | Transición de slide (1.5s cubic-bezier) |
| `.poem-line` | Animación de entrada para poema |
| `.pulse-dot` | Animación de pulso infinito |
| `.cursor-blink` | Cursor parpadeante estilo terminal |
| `.replay-btn` | Botón de replay de video |
| `.animate-slide-up` | Animación de entrada desde abajo |
| `.metric-value` | Números tabulares (tabular-nums) |

### Animaciones

| Keyframe | Descripción |
|----------|-------------|
| `pulse-glow` | Opacidad 0.5 → 1 → 0.5 (2s infinito) |
| `typewriter-blink` | Opacidad 1 → 0 → 1 (1s infinito) |
| `slide-up` | translateY(20px) → 0 + fade in (0.6s) |

## Docker Architecture

### Multi-Stage Build

```
Stage 1: build (node:24-alpine)
  ├── WORKDIR /app
  ├── COPY package.json pnpm-lock.yaml
  ├── RUN corepack enable pnpm && pnpm install --frozen-lockfile
  ├── COPY . .
  └── RUN pnpm run build ──► /app/dist

Stage 2: runtime (nginx:stable-alpine)
  ├── COPY nginx.conf → /etc/nginx/conf.d/default.conf
  ├── COPY --from=build /app/dist → /usr/share/nginx/html
  └── CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration

- SPA routing: `try_files $uri $uri/ /index.html`
- Asset caching: `/assets/` con `expires 1y` + `Cache-Control: public, immutable`
- Security header: `Referrer-Policy: strict-origin-when-cross-origin`

## Decisiones de Arquitectura

### 1. Todos los slides montados en DOM
**Por qué**: Permite transiciones CSS suaves sin re-mount. Los slides no activos tienen `pointer-events: none` y `opacity: 0`.
**Tradeoff**: Mayor uso de memoria, pero aceptable para 12 slides.

### 2. Keyboard listener en window
**Por qué**: Los presentadores USB emulan teclado. Escuchar en `window` captura todos los eventos sin necesidad de focus.
**Tradeoff**: No hay modo "desactivar" navegación por teclado.

### 3. Efecto radial-gradient via vanilla JS
**Por qué**: El efecto de luz que sigue al mouse en bento-cards requiere coordenadas del evento. Se implementa en `App.tsx` con `mousemove` listener.
**Tradeoff**: Manipulación directa del DOM fuera de React.

### 4. LiveChart con Canvas
**Por qué**: Animación continua de datos aleatorios. Canvas es más performante que SVG para redraws frecuentes.
**Tradeoff**: No es declarativo; requiere cleanup manual de `requestAnimationFrame`.

### 5. Particles con DOM manipulation
**Por qué**: 30 partículas con animaciones CSS independientes. Se crean dinámicamente en `useEffect`.
**Tradeoff**: No idiomático en React; podría migrarse a canvas o CSS puro.

## UX para Proyección en Auditorio

### Diseño Base: Terminal/Cyberpunk

La presentación utiliza una estética de terminal con fondo negro (`#050505`) y acento verde matrix (`#00FF41`). Este diseño fue optimizado para proyección en auditorios de 100+ personas con las siguientes consideraciones:

### Optimizaciones de Legibilidad

#### Ruido Visual Reducido
- **Scanlines**: Opacidad reducida de 0.5 a 0.1. En proyección, las líneas CRT compiten con el texto y reducen el contraste percibido.
- **Grid background**: Tamaño aumentado de 60px a 80px, opacidad global de 0.4, vignette más fuerte (55% vs 70%). Menos líneas = menos interferencia.
- **Partículas**: Reducidas de 30 a 12. En proyector se ven como manchas en la lente.

#### Jerarquía de Tipografía para Proyector

| Elemento | Tamaño | Clase Tailwind |
|----------|--------|----------------|
| Título de slide | 60px | `text-6xl` |
| Métrica grande | 72px | `text-7xl` |
| Subtítulo/label | 18px | `text-lg` |
| Descripción | 20px | `text-xl` |
| Texto de tabla | 18px | `text-lg` |
| Terminal/code | 20px | `1.25rem` |
| Footer/fuente | 14px | `text-sm` |
| Poema | 30px | `text-3xl` |
| CTA (Gracias) | 72px | `text-7xl` |

#### Contraste WCAG AA

Todos los textos sobre fondo `#050505` cumplen WCAG AA mínimo:

| Clase | Color | Ratio | Estado |
|-------|-------|-------|--------|
| `text-gray-300` | `#d1d5db` | 10.5:1 | ✅ AAA |
| `text-gray-400` | `#9ca3af` | 6.3:1 | ✅ AA |
| `text-accent-green` | `#00FF41` | 15.4:1 | ✅ AAA |
| `text-white` | `#ffffff` | 20.8:1 | ✅ AAA |

Textos eliminados: `text-gray-500` (4.6:1 borderline) y `text-gray-600` (3.5:1 fail).

#### Espacio de Contenido Maximizado

- `max-w-6xl` (1152px) → `max-w-7xl` (1280px): +256px de ancho útil
- StatusBar: `py-3` → `py-2`: -8px vertical
- Canvas container: top 60px→48px, bottom 64px→56px: +16px vertical total
- Resultado: ~120px más de espacio para contenido en pantalla 1920×1080
