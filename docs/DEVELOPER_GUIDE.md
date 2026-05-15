# Developer Guide — DevOps Sostenible

## Prerrequisitos

- Node.js 24+ (recomendado via nvm)
- pnpm 11+ (instalado via corepack)
- Docker + Docker Compose (para deployment)

## Setup Local

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo con HMR
pnpm run dev

# Build de producción
pnpm run build

# Linting
pnpm run lint

# Preview del build de producción
pnpm run preview
```

## Cómo Agregar un Nuevo Slide

### Paso 1: Crear el componente del slide

Crear `src/components/slides/SlideXXNombre.tsx`:

```tsx
export function SlideXXNombre() {
  return (
    <div className="w-full max-w-6xl px-8">
      <div className="mb-8">
        <span className="font-mono text-xs text-accent-green">BLOQUE XX // TITULO</span>
        <h2 className="font-sans text-5xl font-bold mt-2">Título del Slide</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Contenido del slide */}
      </div>
    </div>
  );
}
```

### Paso 2: Actualizar los tipos

Editar `src/types/index.ts`:

```typescript
// 1. Incrementar TOTAL_SLIDES
export const TOTAL_SLIDES = 13; // era 12

// 2. Agregar nuevo tipo al union
export type SlideStatus =
  | 'PIPELINE: INITIALIZING'
  // ... existentes ...
  | 'PIPELINE: NOMBRE_NUEVO'; // nuevo

// 3. Agregar al array
export const SLIDE_STATUSES: SlideStatus[] = [
  'PIPELINE: INITIALIZING',
  // ... existentes ...
  'PIPELINE: NOMBRE_NUEVO', // nuevo
];
```

### Paso 3: Importar y renderizar en App.tsx

Editar `src/App.tsx`:

```tsx
// 1. Agregar import
import { SlideXXNombre } from './components/slides/SlideXXNombre';

// 2. Agregar SlideLayer (después del último existente)
<SlideLayer show={currentSlide === 12}><SlideXXNombre /></SlideLayer>
```

### Paso 4: Commit y versionado

```bash
git add -A
git commit -m "feat: add slide XX - Nombre"
```

## Convenciones de Nombrado

### Archivos de Slides

- Formato: `SlideXXNombre.tsx`
- XX: Número de dos dígitos (00-11)
- Nombre: PascalCase, sin espacios
- Ejemplo: `Slide03GreenOps.tsx`, `Slide11Gracias.tsx`

### Componentes Compartidos

- PascalCase: `StatusBar.tsx`, `NavigationControls.tsx`
- Hooks: `useSlideNavigation.ts` (prefijo `use`)

### Tipos

- `SlideStatus`: Union type con formato `'PIPELINE: NOMBRE'`
- `TOTAL_SLIDES`: Constante numérica
- `SLIDE_STATUSES`: Array de todos los statuses

## Sistema de Navegación

### Teclas Soportadas

| Acción | Teclas |
|--------|--------|
| Siguiente | `→`, `↓`, `PageDown`, `Espacio` |
| Anterior | `←`, `↑`, `PageUp` |

### USB Presenter

Los presentadores USB (Logitech, Kensington, etc.) emulan teclas de teclado. La mayoría envían:
- **PageDown** para "siguiente"
- **PageUp** para "anterior"

Algunos modelos envían flechas. El hook soporta ambos casos.

### Agregar Nueva Tecla

Editar `src/hooks/useSlideNavigation.ts`:

```typescript
const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' || e.key === 'NUEVA_TECLA') {
    e.preventDefault();
    nextSlide();
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'OTRA_TECLA') {
    e.preventDefault();
    prevSlide();
  }
};
```

## Componentes Reutilizables

### Bento Card

Card principal del diseño. Usar para cualquier bloque de contenido:

```tsx
<div className="bento-card p-10">
  {/* Contenido */}
</div>
```

Características:
- Fondo `#0a0a0a` con border sutil
- Backdrop blur (12px)
- Hover: borde verde + translateY(-2px) + glow
- Active: borde verde + glow interno
- Margen automático de 10px

### Docker Container

Container con estilo de "contenedor Docker":

```tsx
<div className="docker-container">
  {/* Contenido */}
</div>
```

Características:
- Gradiente verde sutil (top → bottom)
- Border verde
- Dot animado en esquina superior derecha (pulse-glow)
- Margen automático de 10px

### Terminal Text

Texto estilo terminal con colores por tipo:

```tsx
<div className="terminal-text">
  <div><span className="timestamp">[10:58:14]</span> <span className="cmd">$</span> comando</div>
  <div><span className="timestamp">[10:58:15]</span> <span className="success">ok</span> resultado</div>
</div>
```

Colores:
- `.timestamp`: Verde dim (0.7 opacity)
- `.cmd`: Azul (`#4fc3f7`)
- `.success`: Verde accent

### Poem Line

Líneas de texto con animación de entrada escalonada:

```tsx
<div className="poem-line font-sans text-2xl text-gray-300" data-delay="500">
  Texto de la línea
</div>
```

- `data-delay`: Milisegundos de delay (default: índice × 200ms)
- Animación: translateX(-20px) → 0 + fade in

### Pulse Dot

Dot con animación de pulso infinito:

```tsx
<div className="w-3 h-3 rounded-full bg-accent-green pulse-dot" />
```

### Replay Button

Botón de replay para videos:

```tsx
<button className="replay-btn">
  <svg>...</svg>
  REPLAY
</button>
```

## Animaciones y Transiciones

### Slide Transitions

Las transiciones entre slides se manejan via `SlideLayer`:

```tsx
<div className="slide-fade" style={{
  opacity: show ? 1 : 0,
  transform: show ? 'scale(1)' : 'scale(0.85)',
}}>
```

- Duración: 1.5s
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Efecto: fade + scale (0.85 → 1)

### Hover Effects

Bento cards tienen efecto de luz que sigue al mouse:

```tsx
// Implementado en App.tsx
card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,255,65,0.05) 0%, transparent 50%), var(--color-bg-panel)`;
```

## Componentes Especiales

### LiveChart (Canvas)

Gráfico animado en tiempo real:

```tsx
import { LiveChart } from '../LiveChart';

<LiveChart />
```

- Canvas de 300×100
- 50 puntos de datos aleatorios
- Redraw cada frame (requestAnimationFrame)
- Color: `#00FF41` con fill semitransparente

### Particles (DOM)

Partículas flotantes verdes:

```tsx
import { Particles } from '../Particles';

<Particles />
```

- 30 partículas
- Animación CSS con duración aleatoria (5-15s)
- Posición aleatoria en viewport
- Color: `#00FF41`, opacity 0.3

### VideoHook

Slide con video y poema animado:

```tsx
<video ref={videoRef} muted playsInline onEnded={() => setEnded(true)}>
  <source src="/assets/video.webm" type="video/webm" />
  <source src="/assets/video.mp4" type="video/mp4" />
</video>
```

- Formatos: webm (primario) + mp4 (fallback)
- Botón de replay al finalizar
- Poema animado con delays escalonados

## Áreas de Mejora Identificadas

### Bugs

1. **`index.css:20`** — `padding: 5` sin unidad
   - Debería ser `padding: 5px` o `padding: 0`
   - Actualmente el browser lo ignora

2. **`index.css:188-196`** — `.docker-container::before` duplicado
   - Dos bloques con el mismo selector
   - El segundo sobrescribe al primero
   - Eliminar el bloque redundante

### Refactors Sugeridos

3. **`App.tsx`** — Slides hardcodeados
   - Los 12 slides están escritos manualmente
   - Podría mapearse desde un array configurado en `types/index.ts`
   - Beneficio: agregar slides sin tocar `App.tsx`

4. **`LiveChart.tsx`** — Cleanup incompleto
   - `animId` no se limpia si el componente se desmonta antes del `setTimeout`
   - Solución: guardar referencia del timeout y limpiar en unmount

5. **`Particles.tsx`** — DOM manipulation fuera de React
   - Crear elementos con `document.createElement` en `useEffect`
   - Alternativa: migrar a canvas o CSS puro con `@keyframes`

### Mejoras de UX

6. **Sin indicador de carga** — No hay feedback visual mientras se carga la app
7. **Sin modo presentación** — No hay fullscreen automático
8. **Sin atajo de teclado para fullscreen** — Podría agregarse `F` para toggle fullscreen

### Testing

9. **Sin test runner** — No hay tests configurados
10. **Sin CI/CD** — No hay GitHub Actions para lint/build automático

### Performance

11. **Todos los slides en DOM** — Para presentaciones grandes (>20 slides), considerar lazy mounting
12. **mousemove listener global** — Se ejecuta en cada movimiento de mouse; podría optimizarse con `requestAnimationFrame`

## Guía de Legibilidad para Proyector

### Problemas Comunes en Proyección

1. **Scanlines/CRT effects**: Opacidad > 0.1 hace el texto ilegible desde el fondo
2. **Grid backgrounds**: Tamaños < 80px generan ruido visual en proyector
3. **Partículas**: Más de 12 se ven como manchas en la lente
4. **Textos < 18px**: Invisibles desde 10 metros en pantalla de 3m
5. **Colores grises oscuros**: `gray-500` y `gray-600` no pasan WCAG AA sobre fondo oscuro

### Reglas para Nuevos Slides

1. **Labels y metadata**: mínimo `text-lg` (18px)
2. **Descripciones**: mínimo `text-xl` (20px)
3. **Títulos**: `text-6xl` (60px)
4. **Métricas**: `text-7xl` (72px)
5. **Colores de texto**: usar `text-gray-300` o `text-gray-400` como mínimo
6. **Ancho máximo**: usar `max-w-7xl` (no `max-w-6xl`)
7. **Terminal text**: usar clase `.terminal-text` (20px)

### Checklist de Legibilidad

- [ ] ¿El texto más pequeño es al menos 18px (`text-lg`)?
- [ ] ¿Los labels usan `text-gray-300` o más claro?
- [ ] ¿El título del slide es `text-6xl`?
- [ ] ¿El contenedor usa `max-w-7xl`?
- [ ] ¿No hay scanlines con opacity > 0.1?
- [ ] ¿No hay más de 12 partículas?
