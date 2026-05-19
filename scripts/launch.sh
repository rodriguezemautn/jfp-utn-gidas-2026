#!/usr/bin/env bash
# ============================================================================
# JPF DevOps Experience — Launch Script
# ============================================================================
# Enciende el contenedor, abre el navegador en kiosko y genera impacto.
# ============================================================================
set -euo pipefail

# ─── Colores ─────────────────────────────────────────────────────────────────
C_RESET='\033[0m'
C_GREEN='\033[38;5;46m'
C_CYAN='\033[38;5;87m'
C_YELLOW='\033[38;5;226m'
C_RED='\033[38;5;196m'
C_WHITE='\033[38;5;255m'
C_DIM='\033[38;5;245m'
C_BOLD='\033[1m'
C_BG='\033[48;5;232m'

# ─── Animación: barra de progreso ────────────────────────────────────────────
progress_bar() {
    local label="$1" duration="${2:-2}" width=50
    local i p green
    for i in $(seq 0 $width); do
        p=$((i * 100 / width))
        green=$((40 + i * 4))
        [ "$green" -gt 46 ] && green=46
        printf "\r  ${C_CYAN}■${C_RESET} ${C_BOLD}%-20s${C_RESET} [" "$label"
        for j in $(seq 1 $width); do
            if [ "$j" -le "$i" ]; then
                printf "${C_GREEN}▒${C_RESET}"
            else
                printf "${C_DIM}░${C_RESET}"
            fi
        done
        printf "] ${C_GREEN}%3d%%${C_RESET}" "$p"
        sleep "$(echo "scale=3; $duration / $width" | bc -l 2>/dev/null || echo "0.04")"
    done
    printf "\n"
}

# ─── Animación: spinner ──────────────────────────────────────────────────────
spinner() {
    local label="$1" pid=$2
    local spin='⣾⣽⣻⢿⡿⣟⣯⣷'
    local i=0
    while kill -0 "$pid" 2>/dev/null; do
        printf "\r  ${C_CYAN}◉${C_RESET} ${C_BOLD}%-20s${C_RESET} ${C_GREEN}%s${C_RESET}" "$label" "${spin:i++%8:1}"
        sleep 0.1
    done
    printf "\r  ${C_GREEN}●${C_RESET} ${C_BOLD}%-20s${C_RESET} ${C_GREEN}✓ LISTO${C_RESET}\n" "$label"
}

# ─── Efecto typewriter ───────────────────────────────────────────────────────
typewrite() {
    local text="$1" delay="${2:-0.03}"
    for ((i=0; i<${#text}; i++)); do
        printf "${C_GREEN}%s${C_RESET}" "${text:$i:1}"
        sleep "$delay"
    done
    echo
}

# ─── Efecto: screen wipe ─────────────────────────────────────────────────────
screen_wipe() {
    local lines
    lines=$(tput lines)
    for ((i=0; i<lines; i+=2)); do
        printf "\033[%d;0H" "$((i+1))"
        printf '%*s' "$(tput cols)" ''
        sleep 0.008
    done
    clear
}

# ─── Banner ASCII ────────────────────────────────────────────────────────────
print_banner() {
    echo -e "${C_GREEN}"
    echo '    ██████  ███████ ██    ██  ██████  ██████  ███████ '
    echo '    ██  ██ ██     ██    ██ ██    ██ ██   ██ ██      '
    echo '    ██  ██ █████  ██    ██ ██    ██ ██████  ███████ '
    echo '    ██  ██ ██      ██  ██  ██    ██ ██           ██ '
    echo '    ██████  ███████  ████    ██████  ██      ███████ '
    echo -e "${C_RESET}"
    echo -e "  ${C_DIM}${C_BOLD}DevOps Sostenible — UTN FRLP — GiDAS${C_RESET}"
    echo
}

# ─── Fase header ─────────────────────────────────────────────────────────────
phase() {
    local num="$1" title="$2"
    echo
    echo -e "  ${C_CYAN}╭─${C_RESET} ${C_BOLD}[${C_YELLOW}FASE ${num}${C_RESET}${C_BOLD}]${C_RESET} ${C_WHITE}${title}${C_RESET}"
    echo -e "  ${C_CYAN}│${C_RESET}"
}

phase_ok() {
    echo -e "  ${C_CYAN}│${C_RESET}  ${C_GREEN}● ${1}${C_RESET}"
}

phase_warn() {
    echo -e "  ${C_CYAN}│${C_RESET}  ${C_YELLOW}▲ ${1}${C_RESET}"
}

phase_fail() {
    echo -e "  ${C_CYAN}│${C_RESET}  ${C_RED}✘ ${1}${C_RESET}"
}

phase_footer() {
    echo -e "  ${C_CYAN}╰${C_RESET}${C_DIM}──────────────────────────────────────────${C_RESET}"
}

# ─── Sound ───────────────────────────────────────────────────────────────────
play_startup_sound() {
    if command -v paplay &>/dev/null; then
        # Sistema KDE — intentar sonido de inicio de sesión
        local sound
        for s in \
            /usr/share/sounds/freedesktop/stereo/desktop-login.oga \
            /usr/share/sounds/ocean/stereo/button-pressed.oga \
            /usr/share/sounds/freedesktop/stereo/complete.oga; do
            if [ -f "$s" ]; then
                (paplay "$s" &) 2>/dev/null || true
                break
            fi
        done
    fi
}

# ─── Verificar que estamos en el directorio correcto ──────────────────────────
ensure_project_root() {
    if [ ! -f "docker-compose.yml" ] && [ ! -f "docker-compose.yaml" ]; then
        echo -e "  ${C_RED}✘ No se encuentra docker-compose.yml${C_RESET}"
        echo -e "  ${C_DIM}  Ejecutá este script desde la raíz del proyecto.${C_RESET}"
        exit 1
    fi
}

# ─── Main ─────────────────────────────────────────────────────────────────────
main() {
    local port="${1:-8080}"
    local url="http://localhost:${port}"
    local browser_cmd=""

    # ── Pre-flight ──────────────────────────────────────────────────────────
    screen_wipe
    print_banner
    play_startup_sound

    typewrite "  ▶ Inicializando despliegue DevOps..." 0.02
    sleep 0.4

    # ── FASE 1: Verificación ───────────────────────────────────────────────
    phase "1/5" "VERIFICACIÓN DEL ENTORNO"
    ensure_project_root

    if command -v docker &>/dev/null; then
        phase_ok "Docker detectado: $(docker --version 2>/dev/null)"
    else
        phase_fail "Docker no instalado"
        exit 1
    fi

    if docker compose version &>/dev/null; then
        phase_ok "Docker Compose detectado"
    else
        phase_fail "Docker Compose no disponible"
        exit 1
    fi

    # Detectar navegador
    if command -v firefox &>/dev/null; then
        browser_cmd="firefox --kiosk"
        phase_ok "Navegador: Firefox (modo kiosko)"
    elif command -v chromium-browser &>/dev/null; then
        browser_cmd="chromium-browser --kiosk"
        phase_ok "Navegador: Chromium (modo kiosko)"
    elif command -v google-chrome &>/dev/null; then
        browser_cmd="google-chrome --kiosk"
        phase_ok "Navegador: Google Chrome (modo kiosko)"
    else
        browser_cmd="xdg-open"
        phase_warn "Sin navegador kiosko detectable — se usará xdg-open"
    fi

    # Puerto libre
    if ss -tln "sport = :${port}" 2>/dev/null | grep -q ":${port}"; then
        phase_warn "Puerto ${port} ocupado — se detendrá el contenedor previo"
        docker compose down 2>/dev/null || true
    fi
    phase_ok "Puerto ${port} disponible"
    phase_footer

    # ── FASE 2: Preparación ────────────────────────────────────────────────
    phase "2/5" "PREPARANDO IMAGEN"

    # Verificar si ya existe la imagen
    if docker image inspect presentacion-jpf-presentacion:latest &>/dev/null; then
        phase_ok "Imagen base encontrada"
        typewrite "  ▶ Verificando integridad..." 0.01
        sleep 0.3
        phase_ok "Integridad confirmada"
    else
        phase_warn "Imagen no encontrada — construyendo..."
        echo
        (
            docker compose build 2>&1 | while IFS= read -r line; do
                if [[ "$line" =~ ^#([0-9]+)\ (.*)$ ]]; then
                    printf "\r  ${C_DIM}▶ %-60s${C_RESET}" "${BASH_REMATCH[2]}"
                fi
            done
        )
        echo
        phase_ok "Imagen construida exitosamente"
    fi
    phase_footer

    # ── FASE 3: Despliegue ─────────────────────────────────────────────────
    phase "3/5" "DESPLIEGUE DEL CONTENEDOR"

    typewrite "  ▶ Iniciando orquestación..." 0.02
    sleep 0.2

    docker compose up -d 2>/dev/null

    # Esperar a que el contenedor responda
    local timeout=30
    local elapsed=0
    echo
    while true; do
        if curl -sf "${url}" >/dev/null 2>&1; then
            printf "\r  ${C_GREEN}●${C_RESET} ${C_BOLD}%-20s${C_RESET} ${C_GREEN}✓ RESPONDE${C_RESET}  " "Contenedor"
            echo
            break
        fi
        if [ "$elapsed" -ge "$timeout" ]; then
            printf "\r  ${C_RED}✘ Timeout esperando al contenedor${C_RESET}\n"
            exit 1
        fi
        printf "\r  ${C_CYAN}◉${C_RESET} ${C_BOLD}%-20s${C_RESET} ${C_DIM}esperando respuesta... %ds${C_RESET}" "Contenedor" "$elapsed"
        sleep 1
        elapsed=$((elapsed + 1))
    done

    phase_ok "Contenedor activo y respondiendo en ${url}"
    phase_footer

    # ── FASE 4: Preparación del navegador ──────────────────────────────────
    phase "4/5" "PREPARANDO NAVEGADOR"

    # Cerrar instancias previas en kiosko si existen
    if [[ "$browser_cmd" == *"firefox"* ]]; then
        pkill -f "firefox --kiosk" 2>/dev/null || true
        sleep 0.5
        phase_ok "Instancias previas de Firefox kiosko cerradas"
    fi

    # Pre-cargar la URL en background para warm up
    phase_ok "Calentando cache del servidor..."
    curl -sf "${url}" >/dev/null 2>&1 || true
    sleep 0.3
    phase_footer

    # ── FASE 5: LANZAMIENTO ────────────────────────────────────────────────
    echo
    echo -e "  ${C_GREEN}${C_BOLD}╔══════════════════════════════════════════════╗${C_RESET}"
    echo -e "  ${C_GREEN}${C_BOLD}║          DESPLIEGUE COMPLETADO              ║${C_RESET}"
    echo -e "  ${C_GREEN}${C_BOLD}╚══════════════════════════════════════════════╝${C_RESET}"
    echo
    echo -e "  ${C_WHITE}  →  ${C_GREEN}${url}${C_RESET}"
    echo
    typewrite "  ▶ Abriendo presentación en modo kiosko..." 0.04
    sleep 0.5

    # ── Efecto final: countdown ────────────────────────────────────────────
    for i in 3 2 1; do
        printf "\r  ${C_YELLOW}LANZAMIENTO EN ${i}...${C_RESET}   "
        sleep 0.8
    done
    printf "\r  ${C_GREEN}¡LANZAR!                      ${C_RESET}"
    echo -e "\n"

    # ── Abrir navegador ─────────────────────────────────────────────────────
    if [[ "$browser_cmd" == *"firefox"* ]]; then
        # Firefox kiosko: necesita la URL como argumento
        firefox --kiosk "${url}" &
    elif [[ "$browser_cmd" == *"chromium-browser"* ]]; then
        chromium-browser --kiosk "${url}" &
    elif [[ "$browser_cmd" == *"google-chrome"* ]]; then
        google-chrome --kiosk "${url}" &
    else
        xdg-open "${url}" &
    fi

    echo -e "  ${C_DIM}  Presioná Ctrl+C en esta terminal para cerrar.${C_RESET}"
    echo

    # ── Mantener el script vivo para poder hacer cleanup ───────────────────
    wait
}

# ─── Trap para cleanup ───────────────────────────────────────────────────────
cleanup() {
    echo
    echo -e "  ${C_YELLOW}▲${C_RESET} ${C_BOLD}Deteniendo presentación...${C_RESET}"
    docker compose down 2>/dev/null || true
    pkill -f "firefox --kiosk" 2>/dev/null || true
    pkill -f "chromium-browser --kiosk" 2>/dev/null || true
    echo -e "  ${C_GREEN}●${C_RESET} Presentación terminada. ¡Gracias!${C_RESET}"
    echo
    exit 0
}

trap cleanup SIGINT SIGTERM

# ─── Entry ───────────────────────────────────────────────────────────────────
cd "$(dirname "$0")/.."
main "$@"
