#!/usr/bin/env bash
# ============================================================================
# JPF DevOps Experience — Presenter Launch Script
# ============================================================================
# Enciende el contenedor, abre la presentación en el proyector y la
# vista del presentador en la laptop, sincronizadas por BroadcastChannel.
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

# ─── Helpers ─────────────────────────────────────────────────────────────────
typewrite() {
    local text="$1" delay="${2:-0.03}"
    for ((i=0; i<${#text}; i++)); do
        printf "${C_GREEN}%s${C_RESET}" "${text:$i:1}"
        sleep "$delay"
    done
    echo
}

phase() {
    local num="$1" title="$2"
    echo
    echo -e "  ${C_CYAN}╭─${C_RESET} ${C_BOLD}[${C_YELLOW}FASE ${num}${C_RESET}${C_BOLD}]${C_RESET} ${C_WHITE}${title}${C_RESET}"
    echo -e "  ${C_CYAN}│${C_RESET}"
}

phase_ok() { echo -e "  ${C_CYAN}│${C_RESET}  ${C_GREEN}● ${1}${C_RESET}"; }
phase_warn() { echo -e "  ${C_CYAN}│${C_RESET}  ${C_YELLOW}▲ ${1}${C_RESET}"; }
phase_footer() { echo -e "  ${C_CYAN}╰${C_RESET}${C_DIM}──────────────────────────────────────────${C_RESET}"; }

print_banner() {
    echo -e "${C_GREEN}"
    echo '    ██████  ███████ ██    ██  ██████  ██████  ███████ '
    echo '    ██  ██ ██     ██    ██ ██    ██ ██   ██ ██      '
    echo '    ██  ██ █████  ██    ██ ██    ██ ██████  ███████ '
    echo '    ██  ██ ██      ██  ██  ██    ██ ██           ██ '
    echo '    ██████  ███████  ████    ██████  ██      ███████ '
    echo -e "${C_RESET}"
    echo -e "  ${C_DIM}${C_BOLD}DevOps Sostenible — Vista del Presentador${C_RESET}"
    echo
}

# ─── Detectar displays conectados ────────────────────────────────────────────
detect_displays() {
    if command -v xrandr &>/dev/null; then
        local connected
        connected=$(xrandr --listactivemonitors 2>/dev/null | tail -n +2 | wc -l)
        if [ "$connected" -ge 2 ]; then
            echo -e "  ${C_CYAN}│${C_RESET}  ${C_GREEN}● ${connected} monitores detectados${C_RESET}"
            echo -e "  ${C_CYAN}│${C_RESET}  ${C_DIM}  Recordá: proyector = pantalla extendida, laptop = vista presentador${C_RESET}"
        else
            echo -e "  ${C_CYAN}│${C_RESET}  ${C_YELLOW}▲ 1 monitor detectado — conectá el proyector en modo extendido${C_RESET}"
        fi
    else
        echo -e "  ${C_CYAN}│${C_RESET}  ${C_DIM}  xrandr no disponible — no se pudo detectar monitores${C_RESET}"
    fi
}

# ─── Elegir navegador ────────────────────────────────────────────────────────
pick_browser() {
    for b in firefox chromium-browser google-chrome xdg-open; do
        if command -v "$b" &>/dev/null; then
            echo "$b"
            return
        fi
    done
    echo "xdg-open"
}

# ─── Main ─────────────────────────────────────────────────────────────────────
main() {
    local port="${1:-8080}"
    local url="http://localhost:${port}"
    local browser
    browser=$(pick_browser)

    clear
    print_banner

    typewrite "  ▶ Inicializando modo presentador..." 0.02
    sleep 0.3

    # ── FASE 1: Verificación ───────────────────────────────────────────────
    phase "1/4" "VERIFICACIÓN DEL ENTORNO"

    if curl -sf "${url}" >/dev/null 2>&1; then
        phase_ok "Servidor respondiendo en ${url}"
    else
        phase_warn "Servidor no responde — intentando levantar contenedor..."
        if ! docker compose up -d 2>/dev/null; then
            echo -e "  ${C_RED}✘ No se pudo iniciar el contenedor${C_RESET}"
            echo -e "  ${C_DIM}  Ejecutá 'make build' primero o revisá Docker${C_RESET}"
            exit 1
        fi
        # Esperar
        local timeout=20 elapsed=0
        while true; do
            if curl -sf "${url}" >/dev/null 2>&1; then
                phase_ok "Servidor iniciado correctamente"
                break
            fi
            if [ "$elapsed" -ge "$timeout" ]; then
                echo -e "  ${C_RED}✘ Timeout esperando al servidor${C_RESET}"
                exit 1
            fi
            sleep 1
            elapsed=$((elapsed + 1))
        done
    fi

    detect_displays
    phase_footer

    # ── FASE 2: Cerrar ventanas previas ────────────────────────────────────
    phase "2/4" "LIMPIANDO VENTANAS PREVIAS"
    case "$(basename "$browser")" in
        firefox)       pkill -f "firefox.*localhost:${port}" 2>/dev/null || true ;;
        chromium-browser) pkill -f "chromium.*localhost:${port}" 2>/dev/null || true ;;
        google-chrome) pkill -f "chrome.*localhost:${port}" 2>/dev/null || true ;;
    esac
    sleep 0.3
    phase_ok "${C_DIM}Ventanas previas cerradas${C_RESET}"
    phase_footer

    # ── FASE 3: Abrir ventanas ─────────────────────────────────────────────
    phase "3/4" "ABRIENDO VENTANAS"

    echo
    echo -e "  ${C_CYAN}│${C_RESET}  ┌──────────────────────────────────────────────────┐"
    echo -e "  ${C_CYAN}│${C_RESET}  │  ${C_WHITE}VENTANA 1 — PROYECTOR${C_RESET}                          │"
    echo -e "  ${C_CYAN}│${C_RESET}  │  ${C_DIM}${url}${C_RESET}                    │"
    echo -e "  ${C_CYAN}│${C_RESET}  │  ${C_YELLOW}→ Modo kiosko (F11). Arrastrá al proyector.${C_RESET}   │"
    echo -e "  ${C_CYAN}│${C_RESET}  └──────────────────────────────────────────────────┘"
    echo -e "  ${C_CYAN}│${C_RESET}"

    # Abrir presentación principal
    case "$browser" in
        firefox)           firefox --new-window "${url}" >/dev/null 2>&1 & ;;
        chromium-browser)  chromium-browser --new-window "${url}" >/dev/null 2>&1 & ;;
        google-chrome)     google-chrome --new-window "${url}" >/dev/null 2>&1 & ;;
        *)                 xdg-open "${url}" >/dev/null 2>&1 & ;;
    esac
    sleep 1

    echo -e "  ${C_CYAN}│${C_RESET}  ┌──────────────────────────────────────────────────┐"
    echo -e "  ${C_CYAN}│${C_RESET}  │  ${C_WHITE}VENTANA 2 — LAPTOP (VISTA PRESENTADOR)${C_RESET}         │"
    echo -e "  ${C_CYAN}│${C_RESET}  │  ${C_DIM}${url}/?presenter${C_RESET}          │"
    echo -e "  ${C_CYAN}│${C_RESET}  │  ${C_GREEN}→ Notas · cronómetro · preview · navegación${C_RESET}   │"
    echo -e "  ${C_CYAN}│${C_RESET}  │  ${C_YELLOW}→ Dejá esta en tu laptop. Usá flechas ← →${C_RESET}    │"
    echo -e "  ${C_CYAN}│${C_RESET}  └──────────────────────────────────────────────────┘"

    # Abrir vista del presentador
    case "$browser" in
        firefox)           firefox --new-window "${url}/?presenter" >/dev/null 2>&1 & ;;
        chromium-browser)  chromium-browser --new-window "${url}/?presenter" >/dev/null 2>&1 & ;;
        google-chrome)     google-chrome --new-window "${url}/?presenter" >/dev/null 2>&1 & ;;
        *)                 xdg-open "${url}/?presenter" >/dev/null 2>&1 & ;;
    esac

    phase_ok "Ventanas abiertas"
    phase_footer

    # ── FASE 4: Instrucciones ──────────────────────────────────────────────
    phase "4/4" "INSTRUCCIONES DE USO"
    echo
    echo -e "  ${C_CYAN}│${C_RESET}  ${C_BOLD}${C_WHITE}╔══════════════════════════════════════════╗${C_RESET}"
    echo -e "  ${C_CYAN}│${C_RESET}  ${C_BOLD}${C_WHITE}║       MODO PRESENTADOR ACTIVADO         ║${C_RESET}"
    echo -e "  ${C_CYAN}│${C_RESET}  ${C_BOLD}${C_WHITE}╚══════════════════════════════════════════╝${C_RESET}"
    echo -e "  ${C_CYAN}│${C_RESET}"
    echo -e "  ${C_CYAN}│${C_RESET}  ${C_GREEN}1.${C_RESET} Mové la ventana del proyector a la pantalla HDMI"
    echo -e "  ${C_CYAN}│${C_RESET}      Presioná ${C_BOLD}F11${C_RESET} para pantalla completa"
    echo -e "  ${C_CYAN}│${C_RESET}"
    echo -e "  ${C_CYAN}│${C_RESET}  ${C_GREEN}2.${C_RESET} Dejá la ventana del presentador en tu laptop"
    echo -e "  ${C_CYAN}│${C_RESET}      Usá las ${C_BOLD}FLECHAS ← →${C_RESET} o los botones PREV/NEXT"
    echo -e "  ${C_CYAN}│${C_RESET}"
    echo -e "  ${C_CYAN}│${C_RESET}  ${C_GREEN}3.${C_RESET} El cronómetro arranca automáticamente"
    echo -e "  ${C_CYAN}│${C_RESET}      Las notas del orador se sincronizan con cada slide"
    echo -e "  ${C_CYAN}│${C_RESET}"
    echo -e "  ${C_CYAN}│${C_RESET}  ${C_GREEN}4.${C_RESET} Para salir: ${C_BOLD}Ctrl+C${C_RESET} en esta terminal"
    echo -e "  ${C_CYAN}│${C_RESET}"
    echo -e "  ${C_CYAN}╰${C_RESET}${C_DIM}──────────────────────────────────────────────${C_RESET}"
    echo

    # ── Mantener vivo ───────────────────────────────────────────────────────
    wait
}

# ─── Cleanup ──────────────────────────────────────────────────────────────────
cleanup() {
    echo
    echo -e "  ${C_YELLOW}▲${C_RESET} ${C_BOLD}Cerrando ventanas...${C_RESET}"
    local port="${1:-8080}"
    pkill -f "localhost:${port}" 2>/dev/null || true
    echo -e "  ${C_GREEN}●${C_RESET} Modo presentador finalizado. ¡Gracias!${C_RESET}"
    echo
    exit 0
}

trap 'cleanup "$@"' SIGINT SIGTERM

# ─── Entry ────────────────────────────────────────────────────────────────────
cd "$(dirname "$0")/.."
main "$@"
