# DevOps Sostenible — Presentación UTN FRLP

Presentación interactiva sobre **DevOps Sostenible** desarrollada con React + TypeScript + Vite + Tailwind CSS v4. Diseñada para ser proyectada en auditorios (100+ personas) con tipografía grande, animaciones suaves y soporte para presentador USB.

## 🚀 DevOps Experience — Quick Start

```bash
make start
```

Un solo comando que:

1. 🖥️  Despliega animaciones en terminal con estilo cyberpunk
2. 🐳  Construye la imagen Docker (si hace falta)
3. 🔄  Levanta el contenedor
4. 🌐  Abre Firefox en **modo kiosko** (fullscreen, sin UI)
5. 🔊  Reproduce sonido de inicio impactante

> **Para salir:** `Ctrl+C` en la terminal → limpia contenedor y cierra el navegador.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- Nginx (producción en Docker)

## Slides

| # | Slide | Estado |
|---|-------|--------|
| 00 | Intro — `$ whoami` | PIPELINE: INITIALIZING |
| 01 | DevOps y SRE | PIPELINE: DEVOPS_SRE_INIT |
| 02 | DevOps Full | PIPELINE: FULL_CYCLE |
| 03 | Imperativo 2026 | PIPELINE: IMPERATIVO_2026 |
| 04 | Video Hook | PIPELINE: HOOK_VIDEO_LOAD |
| 05 | GreenOps | PIPELINE: GREENOPS_BUILD |
| 06 | Low Impact Architecture | PIPELINE: ARCH_DEPLOY |
| 07 | Local AI Stack | PIPELINE: AI_STACK_LOAD |
| 08 | SRE | PIPELINE: SRE_V2_CHECK |
| 09 | Síntesis | PIPELINE: SINTESIS_TEST |
| 10 | Horizonte 2026 | PIPELINE: HORIZONTE_2026 |
| 11 | 3AM Test | PIPELINE: EMPATIA_LIVE |
| 12 | Cierre | PIPELINE: COMPLETE |
| 13 | Gracias — GiDAS | PIPELINE: REVEAL |
| \* | Q&A | PIPELINE: Q&A |

## Navegación

- **← / →** — Slide anterior / siguiente
- **Page Up / Page Down** — Presentador USB
- **Espacio** — Siguiente slide
- Botones **PREV / NEXT** en pantalla

## Makefile — Targets

| Comando | Descripción |
|---------|-------------|
| `make start` | 🚀 Lanza la experiencia DevOps completa (animaciones + build + deploy + kiosko) |
| `make stop` | ⏹  Detiene el contenedor y cierra el navegador |
| `make build` | 🏗️  Construye la imagen Docker |
| `make rebuild` | 🔄  Reconstruye desde cero (clean + build) |
| `make clean` | 🗑️  Limpia contenedores, volúmenes e imágenes |
| `make save` | 💾  Guarda la imagen como TAR versionado en `docker-images/` |
| `make help` | 📖  Muestra todos los comandos disponibles |

## Desarrollo

```bash
pnpm install
pnpm run dev
```

## Docker

```bash
# Construir y levantar
docker compose up -d --build

# O usando el Makefile
make build
make start
```

Abre en `http://localhost:8080`.

### Versiones empaquetadas

Las imágenes Docker se versionan y guardan como TAR en `docker-images/`:

```bash
make save VERSION=v1.6
# → docker-images/presentacion-jpf-v1.6.tar
```

## Scripts

### `scripts/launch.sh`

El corazón de la experiencia DevOps. Script bash puro (sin dependencias externas) que orquesta:

- **Fase 1/5** — Verificación del entorno (Docker, puerto, navegador)
- **Fase 2/5** — Preparación de la imagen (build si no existe)
- **Fase 3/5** — Despliegue del contenedor con healthcheck
- **Fase 4/5** — Preparación del navegador (mata kioskos previos)
- **Fase 5/5** — Lanzamiento con countdown y apertura en kiosko

Características:

- Animaciones ANSI 256 colores (estilo cyberpunk `#00FF41`)
- Barras de progreso animadas y spinners
- Efecto typewriter para mensajes clave
- Screen wipe estilo "matrix falling"
- Detección automática de Firefox / Chromium / Chrome
- Fallback a `xdg-open` si no hay navegador kiosko
- Sonido de startup con `paplay` (sistema KDE)
- `trap` para cleanup graceful con `Ctrl+C`

## Contacto

**GiDAS** — Grupo de Investigación en Desarrollo de Arquitecturas Sostenibles

- [gidas.frlp.utn.edu.ar](https://gidas.frlp.utn.edu.ar)
- gidas@frlp.utn.edu.ar
