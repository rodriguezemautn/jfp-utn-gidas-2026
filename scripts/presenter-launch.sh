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
    # Matar procesos de Firefox específicos (sin pkill que cuelga en este entorno)
    for p in $(ps aux | grep -E "firefox.*localhost:${port}|chromium.*localhost:${port}|chrome.*localhost:${port}" | grep -v grep | awk '{print $2}'); do
        kill "$p" 2>/dev/null || true
    done
    sleep 0.5
    phase_ok "${C_DIM}Ventanas previas cerradas${C_RESET}"
    phase_footer

    # ── FASE 3: Abrir ventanas ─────────────────────────────────────────────
    phase "3/4" "ABRIENDO VENTANAS"

    # Detectar monitores con kscreen-doctor
    HDMI_NAME=""; LAPTOP_NAME=""; CAN_MOVE=false
    HDMI_X=0; HDMI_Y=0; HDMI_W=1920; HDMI_H=1080
    HDMI_PARAMS=""
    if command -v kscreen-doctor &>/dev/null; then
        local output_info hdmi_geom hdmi_xy hdmi_wh
        output_info=$(kscreen-doctor -o 2>/dev/null | sed 's/\x1b\[[0-9;]*[a-zA-Z]//g')
        # HDMI
        HDMI_NAME=$(echo "$output_info" | grep "HDMI" | head -1 | awk '{print $2}')
        [ -z "$HDMI_NAME" ] && HDMI_NAME=$(echo "$output_info" | grep -B 4 "^[[:space:]]*HDMI$" | head -1 | awk '{print $2}')
        # Laptop (pantalla integrada)
        LAPTOP_NAME=$(echo "$output_info" | grep "eDP" | head -1 | awk '{print $2}')
        [ -z "$LAPTOP_NAME" ] && LAPTOP_NAME=$(echo "$output_info" | grep "Panel" -B 4 | head -1 | awk '{print $2}')
        [ -z "$LAPTOP_NAME" ] && LAPTOP_NAME=$(echo "$output_info" | grep "LVDS" | head -1 | awk '{print $2}')
        if [ -z "$LAPTOP_NAME" ] && [ -n "$HDMI_NAME" ]; then
            LAPTOP_NAME=$(echo "$output_info" | grep "^Output:" | awk '{print $2}' | grep -v "^${HDMI_NAME}$" | head -1)
        fi
        # Geometría HDMI
        hdmi_geom=$(echo "$output_info" | grep "HDMI" -A 5 | grep "Geometry" | head -1)
        if [ -n "$hdmi_geom" ] && [ -n "$HDMI_NAME" ]; then
            hdmi_xy=$(echo "$hdmi_geom" | sed 's/.*Geometry:[[:space:]]*//' | awk '{print $1}' | sed 's/,/ /')
            hdmi_wh=$(echo "$hdmi_geom" | sed 's/.*Geometry:[[:space:]]*//' | awk '{print $2}')
            HDMI_X=$(echo "$hdmi_xy" | awk '{print $1}')
            HDMI_Y=$(echo "$hdmi_xy" | awk '{print $2}')
            HDMI_W=$(echo "$hdmi_wh" | awk -F'x' '{print $1}')
            HDMI_H=$(echo "$hdmi_wh" | awk -F'x' '{print $2}')
            HDMI_PARAMS="&hdmiX=${HDMI_X}&hdmiY=${HDMI_Y}&hdmiW=${HDMI_W}&hdmiH=${HDMI_H}"
            CAN_MOVE=true
            phase_ok "${C_DIM}HDMI: output ${HDMI_NAME} en (${HDMI_X},${HDMI_Y}) ${HDMI_W}x${HDMI_H}${C_RESET}"
        fi
        if [ -n "$LAPTOP_NAME" ]; then
            phase_ok "${C_DIM}Laptop: output ${LAPTOP_NAME}${C_RESET}"
        fi
    fi

    # ── Perfil temporal para el kiosko ──
    local kiosk_profile
    kiosk_profile="/tmp/jpf-kiosk-profile-${port}"
    rm -rf "${kiosk_profile}"
    mkdir -p "${kiosk_profile}"
    cat > "${kiosk_profile}/user.js" << 'EOF'
user_pref("toolkit.telemetry.reportingpolicy.firstRun", false);
user_pref("browser.newtabpage.enabled", false);
user_pref("browser.aboutwelcome.enabled", false);
user_pref("datareporting.policy.dataSubmissionEnabled", false);
user_pref("trailhead.firstrun.didSeeAboutWelcome", true);
user_pref("browser.shell.checkDefaultBrowser", false);
user_pref("browser.startup.homepage_override.mstone", "ignore");
user_pref("startup.homepage_welcome_url", "");
user_pref("startup.homepage_welcome_url.additional", "");
EOF

    # ── FASE A: Forzar laptop como primaria → abrir PRESENTADOR ──
    # Firefox abre nuevas ventanas en el monitor PRIMARIO.
    # Si HDMI es primario en este momento, el presentador se abriría
    # en HDMI. Aseguramos que la laptop sea primaria primero.
    if $CAN_MOVE && [ -n "$LAPTOP_NAME" ]; then
        phase_ok "Priorizando laptop (output ${LAPTOP_NAME}) para el presentador…"
        kscreen-doctor "output.${LAPTOP_NAME}.priority.1" >/dev/null 2>&1
        sleep 1
    fi

    echo -e "  ${C_CYAN}│${C_RESET}  ┌──────────────────────────────────────────────────┐"
    echo -e "  ${C_CYAN}│${C_RESET}  │  ${C_WHITE}VENTANA 1 — LAPTOP (VISTA PRESENTADOR)${C_RESET}         │"
    echo -e "  ${C_CYAN}│${C_RESET}  │  ${C_DIM}${url}/?presenter${HDMI_PARAMS}${C_RESET}  │"
    echo -e "  ${C_CYAN}│${C_RESET}  │  Notas · cronómetro · preview · navegación ← →   │"
    echo -e "  ${C_CYAN}│${C_RESET}  │  Perfil: default                                 │"
    if $CAN_MOVE && [ -n "$LAPTOP_NAME" ]; then
        echo -e "  ${C_CYAN}│${C_RESET}  │  ${C_GREEN}✓ Posicionada en laptop (output ${LAPTOP_NAME})${C_RESET}    │"
    fi
    echo -e "  ${C_CYAN}│${C_RESET}  ├──────────────────────────────────────────────────┤"
    echo -e "  ${C_CYAN}│${C_RESET}  │  ${C_WHITE}VENTANA 2 — PROYECTOR (KIOSKO)${C_RESET}                  │"
    echo -e "  ${C_CYAN}│${C_RESET}  │  ${C_DIM}${url}${C_RESET}                    │"
    echo -e "  ${C_CYAN}│${C_RESET}  │  ${C_GREEN}✓ Modo kiosko activo (perfil temporal)${C_RESET}         │"
    if $CAN_MOVE && [ -n "$HDMI_NAME" ]; then
        echo -e "  ${C_CYAN}│${C_RESET}  │  ${C_GREEN}✓ Posicionada en HDMI (output ${HDMI_NAME})${C_RESET}    │"
    fi
    echo -e "  ${C_CYAN}│${C_RESET}  ├──────────────────────────────────────────────────┤"
    echo -e "  ${C_CYAN}│${C_RESET}  │  ${C_GREEN}✓ Sincronización vía API REST${C_RESET}                     │"
    echo -e "  ${C_CYAN}│${C_RESET}  │     Funciona entre perfiles separados             │"
    echo -e "  ${C_CYAN}│${C_RESET}  └──────────────────────────────────────────────────┘"
    echo -e "  ${C_CYAN}│${C_RESET}"

    # ── Abrir ventana 1: PRESENTADOR (perfil default, laptop) ──
    case "$browser" in
        firefox|chromium-browser|google-chrome)
            ${browser} --new-window "${url}/?presenter${HDMI_PARAMS}" >/dev/null 2>&1 &
            ;;
        *)
            xdg-open "${url}/?presenter${HDMI_PARAMS}" >/dev/null 2>&1 &
            ;;
    esac
    sleep 3

    # ── FASE B: Forzar HDMI como primario → abrir KIOSKO ──
    if $CAN_MOVE && [ -n "$HDMI_NAME" ]; then
        phase_ok "Priorizando HDMI (output ${HDMI_NAME}) para el kiosko…"
        kscreen-doctor "output.${HDMI_NAME}.priority.1" >/dev/null 2>&1
        sleep 1
    fi

    case "$browser" in
        firefox)           firefox --kiosk --profile "${kiosk_profile}" "${url}" >/dev/null 2>&1 & ;;
        chromium-browser)  chromium-browser --kiosk --user-data-dir="${kiosk_profile}" "${url}" >/dev/null 2>&1 & ;;
        google-chrome)     google-chrome --kiosk --user-data-dir="${kiosk_profile}" "${url}" >/dev/null 2>&1 & ;;
        *)                 xdg-open "${url}" >/dev/null 2>&1 & ;;
    esac

    # Restaurar laptop como primaria
    if $CAN_MOVE && [ -n "$LAPTOP_NAME" ]; then
        sleep 2
        kscreen-doctor "output.${LAPTOP_NAME}.priority.1" >/dev/null 2>&1
    fi
    sleep 1

    phase_ok "Ventanas abiertas"
    phase_footer

    # ── FASE 4: Instrucciones ──────────────────────────────────────────────
    phase "4/4" "INSTRUCCIONES DE USO"
    echo
    echo -e "  ${C_CYAN}│${C_RESET}  ${C_BOLD}${C_WHITE}╔══════════════════════════════════════════╗${C_RESET}"
    echo -e "  ${C_CYAN}│${C_RESET}  ${C_BOLD}${C_WHITE}║       MODO PRESENTADOR ACTIVADO         ║${C_RESET}"
    echo -e "  ${C_CYAN}│${C_RESET}  ${C_BOLD}${C_WHITE}╚══════════════════════════════════════════╝${C_RESET}"
    echo -e "  ${C_CYAN}│${C_RESET}"
    echo -e "  ${C_CYAN}│${C_RESET}  ${C_GREEN}1.${C_RESET} Ventana 1 (laptop, vista presentador) → navegá con ← →"
    echo -e "  ${C_CYAN}│${C_RESET}"
    echo -e "  ${C_CYAN}│${C_RESET}  ${C_GREEN}2.${C_RESET} Ventana 2 (HDMI, kiosko) → refleja tus cambios automáticamente"
    echo -e "  ${C_CYAN}│${C_RESET}     Usá las ${C_BOLD}FLECHAS ← →${C_RESET} o los botones PREV/NEXT"
    echo -e "  ${C_CYAN}│${C_RESET}"
    echo -e "  ${C_CYAN}│${C_RESET}  ${C_GREEN}3.${C_RESET} El cronómetro arranca automáticamente"
    echo -e "  ${C_CYAN}│${C_RESET}     Las notas del orador se sincronizan con cada slide"
    echo -e "  ${C_CYAN}│${C_RESET}     La sincronización es vía API REST (no BroadcastChannel)"
    echo -e "  ${C_CYAN}│${C_RESET}"
    echo -e "  ${C_CYAN}│${C_RESET}  ${C_GREEN}4.${C_RESET} Para salir: cerrá las ventanas manualmente"
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
    for p in $(ps aux | grep -E "firefox.*localhost:${port}" | grep -v grep | awk '{print $2}'); do
        kill "$p" 2>/dev/null || true
    done
    echo -e "  ${C_GREEN}●${C_RESET} Modo presentador finalizado. ¡Gracias!${C_RESET}"
    echo
    exit 0
}

trap 'cleanup "$@"' SIGINT SIGTERM

# ─── Entry ────────────────────────────────────────────────────────────────────
cd "$(dirname "$0")/.."
main "$@"
