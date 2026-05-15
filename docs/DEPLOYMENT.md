# Deployment Guide — DevOps Sostenible

## Docker Commands

### Iniciar

```bash
docker compose up -d --build
```

Abre en `http://localhost:8080`.

### Detener

```bash
docker compose down
```

### Detener + Borrar Imagen + Rebuild + Iniciar

```bash
docker compose down && docker rmi presentacion-jpf-presentacion && docker compose up -d --build
```

### Ver Logs

```bash
docker compose logs -f
```

### Ver Estado

```bash
docker compose ps
```

## Gestión de Imágenes Docker

### Tag de Imagen

```bash
docker tag presentacion-jpf-presentacion:latest presentacion-jpf:vX.Y
```

### Exportar a Archivo Local

```bash
docker save -o docker-images/presentacion-jpf-vX.Y.tar presentacion-jpf:vX.Y
```

### Importar desde Archivo

```bash
docker load -i docker-images/presentacion-jpf-vX.Y.tar
```

### Listar Imágenes

```bash
docker images | grep presentacion
```

### Listar Archivos Exportados

```bash
ls -lh docker-images/
```

## Versionado

### Git Tags

```bash
# Crear tag
git tag vX.Y

# Listar tags
git tag -l

# Push de tag al remoto
git push origin vX.Y
```

### Convención de Versiones

| Versión | Descripción |
|---------|-------------|
| v1.0 | Imagen inicial (React app from HTML) |
| v1.1 | + Q&A slide (Slide11) + USB presenter support |
| v1.2 | Migración npm → pnpm |

### Sincronizar Git Tag + Docker Tag

```bash
# 1. Crear commit
git add -A && git commit -m "chore: add docker image vX.Y"

# 2. Tag docker
docker tag presentacion-jpf-presentacion:latest presentacion-jpf:vX.Y

# 3. Exportar imagen
docker save -o docker-images/presentacion-jpf-vX.Y.tar presentacion-jpf:vX.Y

# 4. Commit imagen
git add docker-images/presentacion-jpf-vX.Y.tar
git commit -m "chore: add docker image vX.Y"

# 5. Git tag
git tag vX.Y
```

## Git Configuration

### Config Local del Proyecto

```bash
git config user.name "rodriguezemautn"
git config user.email "erodriguezrodriguez@alu.frlp.utn.edu.ar"
```

### Remote

```
origin: https://github.com/rodriguezemautn/jfp-utn-gidas-2026.git
branch: main
```

### Push al Remoto

```bash
# Push de commits
git push -u origin main

# Push de tags
git push origin --tags
```

## Nginx Configuration

### SPA Routing

```nginx
location / {
    try_files $uri $uri/ /index.html;
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
```

### Asset Caching

```nginx
location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Puerto

- Exposed: `8080` (host) → `80` (container)
- Configurado en `docker-compose.yml`

## Historial de Versiones

### v1.2 (2026-05-15)
- Migración de npm a pnpm 11.1.2
- Dockerfile actualizado con `corepack enable pnpm`
- `pnpm-lock.yaml` reemplaza `package-lock.json`
- README actualizado con comandos de pnpm

### v1.1 (2026-05-15)
- Nuevo slide: Slide11Gracias (Q&A + contactos GiDAS)
- Soporte para presentador USB (PageUp/PageDown, ArrowUp/ArrowDown)
- TOTAL_SLIDES: 11 → 12
- Nuevo status: `PIPELINE: Q&A`
- Hint visual actualizado en NavigationControls

### v1.0 (2026-05-14)
- Conversión de HTML presentation a React + TypeScript + Vite
- 11 slides (00-10)
- Status bar con pipeline status, progress bar, navigation dots, reloj
- Navigation controls con botones PREV/NEXT
- Bento card design system
- Terminal aesthetic (matrix green #00FF41)
- Scanlines overlay (CRT effect)
- Grid background
- Particles animation
- LiveChart canvas
- Video hook con poema animado
- Docker multi-stage build (node:24-alpine → nginx:stable-alpine)
- Logo GiDAS en cada slide

## Troubleshooting

### Contenedor no inicia

```bash
docker compose logs
```

### Puerto 8080 en uso

Editar `docker-compose.yml`:
```yaml
ports:
  - "8081:80"  # Cambiar puerto host
```

### Imagen corrupta

```bash
docker compose down
docker rmi presentacion-jpf-presentacion
docker compose up -d --build
```

### Cambios no se reflejan

1. Verificar que el build se ejecutó: `docker compose up -d --build`
2. Limpiar cache del navegador (Ctrl+Shift+R)
3. Verificar logs: `docker compose logs`
