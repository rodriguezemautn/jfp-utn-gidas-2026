#!/usr/bin/env bash
# ============================================================================
# JPF DevOps Experience — Open Presenter Windows
# ============================================================================
# Abre DOS ventanas de Firefox en perfiles SEPARADOS:
#   1. PROYECTOR (kiosko)   → perfil temporal + --kiosk (en HDMI)
#   2. PRESENTADOR (normal) → perfil default + --new-window (en laptop)
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

# ── Detectar monitor HDMI con kscreen-doctor ───────────────────────────────
HDMI_X=0; HDMI_Y=0; HDMI_W=1920; HDMI_H=1080
HDMI_NAME=""; PRIMARY_NAME=""; CAN_MOVE=false
HDMI_PARAMS=""

if command -v kscreen-doctor &>/dev/null; then
    OUTPUT_INFO=$(kscreen-doctor -o 2>/dev/null | sed 's/\x1b\[[0-9;]*[a-zA-Z]//g')
    HDMI_NAME=$(echo "$OUTPUT_INFO" | grep "HDMI" | head -1 | awk '{print $2}')
    PRIMARY_NAME=$(echo "$OUTPUT_INFO" | grep "priority 1" -B 2 | head -1 | awk '{print $2}')

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

# ── Restaurar monitor primario al salir ──
cleanup_monitors() {
    if $CAN_MOVE && [ -n "${PRIMARY_NAME:-}" ]; then
        kscreen-doctor "output.${PRIMARY_NAME}.priority.1" >/dev/null 2>&1 || true
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
#  VENTANA 1 — PRESENTADOR (perfil default, laptop)
# ═══════════════════════════════════════════════════════════════════════════
# Se abre primero. Firefox usa el perfil default del usuario.
# Sincroniza vía API REST con la ventana del kiosko.

PRESENTER_URL="${URL}/?presenter${HDMI_PARAMS}"

if [ -n "$BROWSER" ]; then
    echo "  ${C_GREEN}●${C_RESET} Abriendo vista del presentador…"
    ${BROWSER} --new-window "${PRESENTER_URL}" >/dev/null 2>&1 &
else
    echo "  ${C_YELLOW}▲${C_RESET} Usando xdg-open para el presentador…"
    xdg-open "${PRESENTER_URL}" >/dev/null 2>&1 &
fi
sleep 2

# ═══════════════════════════════════════════════════════════════════════════
#  VENTANA 2 — PROYECTOR (perfil temporal, HDMI, kiosko)
# ═══════════════════════════════════════════════════════════════════════════
# Perfil separado para evitar conflicto con la ventana del presentador.
# Firefox --kiosk funciona correctamente porque es una instancia nueva.

if [ -n "$BROWSER_KIOSK" ]; then
    if $CAN_MOVE && [ -n "$HDMI_NAME" ]; then
        echo "  ${C_DIM}  HDMI: ${HDMI_NAME} en (${HDMI_X},${HDMI_Y}) ${HDMI_W}x${HDMI_H}${C_RESET}"
        # Hacer HDMI primario para que Firefox kiosko se abra allí
        kscreen-doctor "output.${HDMI_NAME}.priority.1" >/dev/null 2>&1
        sleep 1
    fi

    echo "  ${C_GREEN}●${C_RESET} Abriendo proyector en modo kiosko…"
    ${BROWSER_KIOSK} --profile "${KIOSK_PROFILE}" "${URL}" >/dev/null 2>&1 &

    # Restaurar primario a la laptop
    if $CAN_MOVE && [ -n "$PRIMARY_NAME" ]; then
        sleep 2
        kscreen-doctor "output.${PRIMARY_NAME}.priority.1" >/dev/null 2>&1
    fi
else
    echo "  ${C_YELLOW}▲${C_RESET} Sin navegador con kiosk — usando xdg-open${C_RESET}"
    xdg-open "${URL}" >/dev/null 2>&1 &
fi

# ── Resumen ─────────────────────────────────────────────────────────────
echo ""
echo "  ┌────────────────────────────────────────────────────────┐"
echo "  │  ${C_WHITE}VENTANA 1 — LAPTOP (VISTA PRESENTADOR)${C_RESET}            │"
echo "  │     ${C_DIM}${PRESENTER_URL}${C_RESET}  │"
echo "  │     Notas · cronómetro · preview · navegación ← →   │"
echo "  │     Perfil: default                                 │"
echo "  ├────────────────────────────────────────────────────────┤"
echo "  │  ${C_WHITE}VENTANA 2 — PROYECTOR (KIOSKO)${C_RESET}                    │"
echo "  │     ${C_DIM}${URL}${C_RESET}                    │"
if $CAN_MOVE && [ -n "$HDMI_NAME" ]; then
    echo "  │     ${C_GREEN}✓ Posicionada en ${HDMI_NAME} (${HDMI_X},${HDMI_Y})${C_RESET}       │"
fi
echo "  │     ${C_GREEN}✓ Modo kiosko activo (perfil temporal)${C_RESET}        │"
echo "  ├────────────────────────────────────────────────────────┤"
echo "  │  ${C_GREEN}✓ Sincronización vía API REST${C_RESET}                     │"
echo "  │     Funciona entre perfiles separados                 │"
echo "  └────────────────────────────────────────────────────────┘"
echo ""
echo "  ${C_DIM}Para salir: cerrá las ventanas manualmente${C_RESET}"
echo ""
