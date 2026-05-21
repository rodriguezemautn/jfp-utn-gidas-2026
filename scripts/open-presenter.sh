#!/usr/bin/env bash
# ============================================================================
# JPF DevOps Experience — Open Presenter Windows
# ============================================================================
# Abre DOS ventanas de Firefox en perfiles SEPARADOS:
#   1. PRESENTADOR (laptop) → perfil default + --new-window (en la laptop)
#   2. PROYECTOR (kiosko)   → perfil temporal + --kiosk (en HDMI)
#
# Orden crítico para posicionamiento correcto:
#   a) Forzar laptop como primario → abrir presentador (se abre en laptop)
#   b) Forzar HDMI como primario   → abrir kiosko (se abre en HDMI)
#   c) Restaurar laptop como primario
#
# Perfiles separados porque Firefox no permite --kiosk y --new-window
# desde el mismo perfil. La sincronización vía API REST (/api/slide)
# funciona entre cualquier combinación de ventanas/perfiles.
# ============================================================================
set -euo pipefail

C_RESET='\033[0m'
C_GREEN='\033[38;5;46m'
C_YELLOW='\033[38;5;226m'
C_RED='\033[38;5;196m'
C_DIM='\033[38;5;245m'
C_WHITE='\033[38;5;255m'
C_CYAN='\033[38;5;87m'

PORT="${1:-8080}"
URL="http://localhost:${PORT}"

echo ""
echo "  ▶ Abriendo ventanas…"

# ── Elegir navegador ────────────────────────────────────────────────────────
BROWSER=""
BROWSER_KIOSK=""
if command -v firefox &>/dev/null; then
    BROWSER="firefox"
    BROWSER_KIOSK="firefox --kiosk"
elif command -v chromium-browser &>/dev/null; then
    BROWSER="chromium-browser"
    BROWSER_KIOSK="chromium-browser --kiosk"
elif command -v google-chrome &>/dev/null; then
    BROWSER="google-chrome"
    BROWSER_KIOSK="google-chrome --kiosk"
fi

# ── Detectar monitores con kscreen-doctor ───────────────────────────────────
HDMI_X=0; HDMI_Y=0; HDMI_W=1920; HDMI_H=1080
HDMI_NAME=""; LAPTOP_NAME=""; CAN_MOVE=false
HDMI_PARAMS=""

if command -v kscreen-doctor &>/dev/null; then
    OUTPUT_INFO=$(kscreen-doctor -o 2>/dev/null | sed 's/\x1b\[[0-9;]*[a-zA-Z]//g')

    # HDMI: buscar output con conector tipo "HDMI"
    HDMI_NAME=$(echo "$OUTPUT_INFO" | grep "HDMI" | head -1 | awk '{print $2}')
    [ -z "$HDMI_NAME" ] && HDMI_NAME=$(echo "$OUTPUT_INFO" | grep -B 4 "^[[:space:]]*HDMI$" | head -1 | awk '{print $2}')

    # Laptop: buscar output con "Panel" o "eDP" o "LVDS" (pantalla integrada)
    LAPTOP_NAME=$(echo "$OUTPUT_INFO" | grep "eDP" | head -1 | awk '{print $2}')
    [ -z "$LAPTOP_NAME" ] && LAPTOP_NAME=$(echo "$OUTPUT_INFO" | grep "Panel" -B 4 | head -1 | awk '{print $2}')
    [ -z "$LAPTOP_NAME" ] && LAPTOP_NAME=$(echo "$OUTPUT_INFO" | grep "LVDS" | head -1 | awk '{print $2}')
    # Fallback: el output que NO es HDMI
    if [ -z "$LAPTOP_NAME" ] && [ -n "$HDMI_NAME" ]; then
        LAPTOP_NAME=$(echo "$OUTPUT_INFO" | grep "^Output:" | awk '{print $2}' | grep -v "^${HDMI_NAME}$" | head -1)
    fi

    HDMI_GEOM=$(echo "$OUTPUT_INFO" | grep "HDMI" -A 5 | grep "Geometry" | head -1)
    if [ -n "$HDMI_GEOM" ] && [ -n "$HDMI_NAME" ]; then
        HDMI_XY=$(echo "$HDMI_GEOM" | sed 's/.*Geometry:[[:space:]]*//' | awk '{print $1}' | sed 's/,/ /')
        HDMI_WH=$(echo "$HDMI_GEOM" | sed 's/.*Geometry:[[:space:]]*//' | awk '{print $2}')
        HDMI_X=$(echo "$HDMI_XY" | awk '{print $1}')
        HDMI_Y=$(echo "$HDMI_XY" | awk '{print $2}')
        HDMI_W=$(echo "$HDMI_WH" | awk -F'x' '{print $1}')
        HDMI_H=$(echo "$HDMI_WH" | awk -F'x' '{print $2}')
        HDMI_PARAMS="&hdmiX=${HDMI_X}&hdmiY=${HDMI_Y}&hdmiW=${HDMI_W}&hdmiH=${HDMI_H}"
        CAN_MOVE=true
    fi
fi

# ── Restaurar monitor laptop al salir ──
cleanup_monitors() {
    if $CAN_MOVE && [ -n "${LAPTOP_NAME:-}" ]; then
        kscreen-doctor "output.${LAPTOP_NAME}.priority.1" >/dev/null 2>&1 || true
    fi
}
trap cleanup_monitors EXIT INT TERM

# ── Perfil temporal para el kiosko ──
KIOSK_PROFILE="/tmp/jpf-kiosk-profile-${PORT}"
rm -rf "${KIOSK_PROFILE}"
mkdir -p "${KIOSK_PROFILE}"

# Suprimir pantalla de bienvenida de Firefox en perfil nuevo
cat > "${KIOSK_PROFILE}/user.js" << 'EOF'
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

# ═══════════════════════════════════════════════════════════════════════════
#  FASE 1: Forzar laptop como primaria → abrir PRESENTADOR
# ═══════════════════════════════════════════════════════════════════════════
# Firefox abre nuevas ventanas en el monitor PRIMARIO. Si HDMI es el
# primario en este momento, el presentador se abriría en HDMI en vez
# de la laptop. La solución: asegurar que la laptop SEA primaria antes
# de abrir el presentador.

PRESENTER_URL="${URL}/?presenter${HDMI_PARAMS}"

if $CAN_MOVE && [ -n "$LAPTOP_NAME" ]; then
    echo -e "  ${C_DIM}  → Llevando laptop (output ${LAPTOP_NAME}) a primario${C_RESET}"
    kscreen-doctor "output.${LAPTOP_NAME}.priority.1" >/dev/null 2>&1
    sleep 1
fi

if [ -n "$BROWSER" ]; then
    echo -e "  ${C_GREEN}●${C_RESET} Abriendo vista del presentador (laptop)…"
    ${BROWSER} --new-window "${PRESENTER_URL}" >/dev/null 2>&1 &
else
    echo -e "  ${C_YELLOW}▲${C_RESET} Usando xdg-open para el presentador…"
    xdg-open "${PRESENTER_URL}" >/dev/null 2>&1 &
fi
sleep 2

# ═══════════════════════════════════════════════════════════════════════════
#  FASE 2: Forzar HDMI como primario → abrir KIOSKO
# ═══════════════════════════════════════════════════════════════════════════
# Perfil separado para evitar conflicto con la ventana del presentador.
# Firefox --kiosk con perfil temporal es una instancia completamente
# independiente.

if [ -n "$BROWSER_KIOSK" ]; then
    if $CAN_MOVE && [ -n "$HDMI_NAME" ]; then
        echo -e "  ${C_DIM}  → Llevando HDMI (output ${HDMI_NAME}) a primario${C_RESET}"
        echo -e "  ${C_DIM}  HDMI: ${HDMI_NAME} en (${HDMI_X},${HDMI_Y}) ${HDMI_W}x${HDMI_H}${C_RESET}"
        kscreen-doctor "output.${HDMI_NAME}.priority.1" >/dev/null 2>&1
        sleep 1
    fi

    echo -e "  ${C_GREEN}●${C_RESET} Abriendo proyector en modo kiosko (HDMI)…"
    ${BROWSER_KIOSK} --profile "${KIOSK_PROFILE}" "${URL}" >/dev/null 2>&1 &

    # Restaurar laptop como primaria
    if $CAN_MOVE && [ -n "$LAPTOP_NAME" ]; then
        sleep 2
        kscreen-doctor "output.${LAPTOP_NAME}.priority.1" >/dev/null 2>&1
    fi
else
    echo -e "  ${C_YELLOW}▲${C_RESET} Sin navegador con kiosk — usando xdg-open${C_RESET}"
    xdg-open "${URL}" >/dev/null 2>&1 &
fi

# ── Resumen ─────────────────────────────────────────────────────────────
echo ""
echo "  ┌────────────────────────────────────────────────────────┐"
echo -e "  │  ${C_WHITE}VENTANA 1 — LAPTOP (VISTA PRESENTADOR)${C_RESET}            │"
echo -e "  │     ${C_DIM}${PRESENTER_URL}${C_RESET}  │"
echo "  │     Notas · cronómetro · preview · navegación ← →   │"
echo "  │     Perfil: default                                 │"
if $CAN_MOVE && [ -n "$LAPTOP_NAME" ]; then
    echo -e "  │     ${C_GREEN}✓ Posicionada en laptop (output ${LAPTOP_NAME})${C_RESET}    │"
fi
echo "  ├────────────────────────────────────────────────────────┤"
echo -e "  │  ${C_WHITE}VENTANA 2 — PROYECTOR (KIOSKO)${C_RESET}                    │"
echo -e "  │     ${C_DIM}${URL}${C_RESET}                    │"
echo -e "  │     ${C_GREEN}✓ Modo kiosko activo (perfil temporal)${C_RESET}        │"
if $CAN_MOVE && [ -n "$HDMI_NAME" ]; then
    echo -e "  │     ${C_GREEN}✓ Posicionada en HDMI (output ${HDMI_NAME})${C_RESET}       │"
fi
echo "  ├────────────────────────────────────────────────────────┤"
echo -e "  │  ${C_GREEN}✓ Sincronización vía API REST${C_RESET}                     │"
echo "  │     Funciona entre perfiles separados                 │"
echo "  └────────────────────────────────────────────────────────┘"
echo ""
echo -e "  ${C_DIM}Para salir: cerrá las ventanas manualmente${C_RESET}"
echo ""
