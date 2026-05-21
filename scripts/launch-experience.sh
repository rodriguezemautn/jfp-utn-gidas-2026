#!/usr/bin/env bash
# ============================================================================
# JPF DevOps Experience — Launch Experience
# ============================================================================
# Lanzamiento cinemático de la presentación DevOps Sostenible.
# Porque el deploy importa, pero LA PUESTA EN ESCENA también.
# ============================================================================
set -euo pipefail

# ─── Colores ANSI 256 ──────────────────────────────────────────────────────
C_BOLD='\033[1m'
C_DIM='\033[2m'
C_ITAL='\033[3m'
C_RESET='\033[0m'

# Palette
C_FG='\033[38;5;252m'       # foreground light gray
C_GREEN='\033[38;5;46m'     # primary green  #00FF41
C_GREEN_DIM='\033[38;5;28m' # dim green  #008700
C_GREEN_DARK='\033[38;5;22m' # dark green (shadows)
C_CYAN='\033[38;5;87m'      # cyan accents
C_YELLOW='\033[38;5;226m'   # warnings
C_RED='\033[38;5;196m'      # errors
C_WHITE='\033[38;5;255m'    # bright white
C_GRAY='\033[38;5;245m'     # medium gray
C_GRAY_DIM='\033[38;5;238m' # dark gray borders
C_ORANGE='\033[38;5;208m'   # accents
C_PURPLE='\033[38;5;141m'   # accents

# ─── Config ─────────────────────────────────────────────────────────────────
PORT="${1:-8080}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
VITE_LOG="/tmp/vite-presenter.log"

# ─── Helpers ────────────────────────────────────────────────────────────────

# Escribir texto con efecto máquina de escribir
# Respeta secuencias ANSI completas (no las parte carácter por carácter)
typewrite() {
    local text="$1" delay="${2:-0.015}"
    local color="${3:-$C_FG}"
    local i=0 c
    local len=${#text}
    while [ "$i" -lt "$len" ]; do
        c="${text:$i:1}"
        if [ "$c" = $'\033' ]; then
            local seq="$c"
            i=$((i+1))
            while [ "$i" -lt "$len" ]; do
                c="${text:$i:1}"
                seq="$seq$c"
                i=$((i+1))
                [ "$c" = 'm' ] && break
            done
            printf "%s" "$seq"
        else
            printf "${color}%s${C_RESET}" "$c"
            sleep "$delay"
            i=$((i+1))
        fi
    done
    echo
}

# Título de fase
phase_title() {
    local num="$1" title="$2" icon="${3:-►}"
    echo
    echo -e "  ${C_GRAY_DIM}╭──────────────────────────────────────────────────────────────╮${C_RESET}"
    echo -e "  ${C_GRAY_DIM}│${C_RESET}  ${C_DIM}[${C_RESET}${C_CYAN}${num}${C_RESET}${C_DIM}]${C_RESET}  ${C_WHITE}${icon}  ${title}${C_RESET}"
    echo -e "  ${C_GRAY_DIM}├──────────────────────────────────────────────────────────────┤${C_RESET}"
}

# Item de status dentro de una fase
status_ok()  { echo -e "  ${C_GRAY_DIM}│${C_RESET}  ${C_GREEN}●${C_RESET}  $*"; }
status_warn(){ echo -e "  ${C_GRAY_DIM}│${C_RESET}  ${C_YELLOW}▲${C_RESET}  $*"; }
status_info(){ echo -e "  ${C_GRAY_DIM}│${C_RESET}  ${C_DIM}‧${C_RESET}  ${C_GRAY}$*${C_RESET}"; }
status_data(){ echo -e "  ${C_GRAY_DIM}│${C_RESET}  ${C_CYAN}▸${C_RESET}  $*"; }
status_dim() { echo -e "  ${C_GRAY_DIM}│${C_RESET}  ${C_GRAY_DIM}  $*${C_RESET}"; }

# Cierre de fase
phase_close() {
    echo -e "  ${C_GRAY_DIM}╰──────────────────────────────────────────────────────────────╯${C_RESET}"
}

# ─── Banners ─────────────────────────────────────────────────────────────────

show_banner_gidas() {
    echo
    echo -e "  ${C_GRAY_DIM}┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}                                                               ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}               ${C_GREEN}$(printf '%s' '  _____ _ _____           _____')${C_RESET}                    ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}               ${C_GREEN}$(printf '%s' ' / ____(_)  __ \   /\    / ____|')${C_RESET}                   ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}               ${C_GREEN}$(printf '%s' '| |  __ _| |  | | /  \  | (___  ')$(printf ' ')${C_RESET}                   ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}               ${C_GREEN}$(printf '%s' '| | |_ | | |  | |/ /\ \  \___ \ ')${C_RESET}                   ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}               ${C_GREEN}$(printf '%s' '| |__| | | |__| / ____ \ ____) |')${C_RESET}                   ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}               ${C_GREEN}$(printf '%s' ' \_____|_|_____/_/    \_\_____/ ')${C_RESET}                   ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}                                                               ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}              ${C_GREEN}$(printf '%s' ' _____ _   _ ______ _____            _ _______ ')${C_RESET}      ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}              ${C_GREEN}$(printf '%s' '|_   _| \ | |  ____|  __ \     /\   (_)__   __|')${C_RESET}     ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}              ${C_GREEN}$(printf '%s' '  | | |  \| | |__  | |__) |   /  \   _   | |   ')$(printf ' ')${C_RESET}     ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}              ${C_GREEN}$(printf '%s' '  | | | . ` |  __| |  _  /   / /\ \ | |  | |   ')$(printf ' ')${C_RESET}     ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}              ${C_GREEN}$(printf '%s' ' _| |_| |\  | |    | | \ \  / ____ \| |  | |   ')$(printf ' ')${C_RESET}     ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}              ${C_GREEN}$(printf '%s' '|_____|_| \_|_|    |_|  \_\/_/    \_\_|  |_|   ')$(printf ' ')${C_RESET}     ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}                                                               ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}             ${C_WHITE}DevOps Sostenible — JFP 2026${C_RESET}                    ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}       ${C_DIM}UTN FRLP · Grupo de Investigación GiDAS · INFRA IT${C_RESET}      ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}                                                               ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛${C_RESET}"
    echo
}

# ─── Spinner ─────────────────────────────────────────────────────────────────

spinner() {
    local pid=$1 msg="$2"
    local frames='⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'
    local i=0
    while kill -0 "$pid" 2>/dev/null; do
        printf "\r  ${C_CYAN}%s${C_RESET}  ${C_GRAY}%s${C_RESET}" "${frames:$i:1}" "$msg"
        i=$(( (i+1) % ${#frames} ))
        sleep 0.08
    done
    printf "\r  ${C_GREEN}●${C_RESET}  ${msg}  \n"
}

# ─── FASE 0: Banner ─────────────────────────────────────────────────────────
phase_banner() {
    clear 2>/dev/null || true
    show_banner_gidas
    sleep 1
}

# ─── FASE 1: System Check ───────────────────────────────────────────────────
phase_system_check() {
    phase_title "1/4" "INITIALIZING DEVOPS PLATFORM" "⚙"

    local errors=0

    # Firefox
    if command -v firefox &>/dev/null; then
        status_ok "Firefox detected: ${C_GREEN}$(firefox --version 2>/dev/null | head -1)${C_RESET}"
    else
        status_warn "Firefox not found — trying alternatives"
        if command -v chromium-browser &>/dev/null; then
            status_ok "Chromium detected"
        elif command -v google-chrome &>/dev/null; then
            status_ok "Chrome detected"
        else
            status_warn "No supported browser found — will use xdg-open"
            errors=$((errors+1))
        fi
    fi

    # Node
    if command -v node &>/dev/null; then
        status_ok "Node.js ${C_GREEN}$(node --version)${C_RESET}"
    else
        status_warn "Node.js not found — Vite won't start"
        errors=$((errors+1))
    fi

    # kscreen-doctor
    if command -v kscreen-doctor &>/dev/null; then
        status_ok "kscreen-doctor available ${C_DIM}(HDMI positioning)${C_RESET}"
    else
        status_info "kscreen-doctor not found — windows open on primary monitor"
    fi

    # Network
    if ping -c 1 -W 1 localhost &>/dev/null 2>&1; then
        status_ok "Network stack ready"
    else
        status_warn "localhost unreachable — check /etc/hosts"
    fi

    # Cleanup stale processes
    local old_count
    old_count=$(ps aux | grep -cE "firefox.*localhost:${PORT}|vite.*${PORT}" 2>/dev/null || true)
    if [ "$old_count" -gt 0 ]; then
        status_info "Cleaning $old_count stale processes..."
        for p in $(ps aux | grep -E "firefox.*localhost:${PORT}|vite.*${PORT}" | grep -v grep | awk '{print $2}' 2>/dev/null); do
            kill "$p" 2>/dev/null || true
        done
        sleep 1
        status_ok "${C_YELLOW}${old_count}${C_RESET} stale processes terminated"
    else
        status_ok "No stale processes found"
    fi

    # Clean temp profiles
    rm -rf "/tmp/jpf-kiosk-profile-${PORT}"

    status_dim "  ───────────────────────────────────────────"
    if [ "$errors" -eq 0 ]; then
        status_ok "${C_GREEN}All systems nominal — proceeding to launch${C_RESET}"
    else
        status_warn "${C_YELLOW}${errors} warning(s) — may still work${C_RESET}"
    fi
    phase_close
}

# ─── FASE 2: Server Startup ─────────────────────────────────────────────────
phase_server_startup() {
    phase_title "2/4" "STARTING PRESENTATION ENGINE" "🔥"

    status_info "Booting Vite dev server..."

    cd "$PROJECT_DIR"
    nohup npx vite --port "$PORT" > "$VITE_LOG" 2>&1 &
    local vite_pid=$!

    local timeout=30 elapsed=0
    while true; do
        if curl -sf "http://localhost:${PORT}" >/dev/null 2>&1; then
            printf "\r  ${C_GREEN}●${C_RESET}  Vite server ready  ${C_DIM}(PID: ${vite_pid})${C_RESET}  ${C_GREEN}✓${C_RESET}\n"
            break
        fi
        if [ "$elapsed" -ge "$timeout" ]; then
            printf "\r  ${C_RED}✘${C_RESET}  Vite failed to start after ${timeout}s\n"
            tail -20 "$VITE_LOG" | sed 's/^/  /'
            exit 1
        fi
        local dots
        dots=$(printf "%*s" $(( (elapsed % 20) + 1 )) | tr ' ' '.')
        printf "\r  ${C_YELLOW}⠿${C_RESET}  ${C_DIM}Waiting for Vite%s${C_RESET}" "$dots"
        sleep 0.5
        elapsed=$((elapsed + 1))
    done

    local vite_info
    vite_info=$(grep -m1 "Local:" "$VITE_LOG" 2>/dev/null || echo "http://localhost:${PORT}")
    status_ok "Dev server:  ${C_GREEN}${vite_info}${C_RESET}"
    status_dim "  ───────────────────────────────────────────"
    status_ok "${C_GREEN}Engine online — deploying windows${C_RESET}"
    phase_close
}

# ─── FASE 3: Window Deployment ──────────────────────────────────────────────
phase_deploy_windows() {
    phase_title "3/4" "DEPLOYING PRESENTATION WINDOWS" "🖥"

    bash "$SCRIPT_DIR/open-presenter.sh" "$PORT"

    phase_close
}

# ─── FASE 4: Dashboard ──────────────────────────────────────────────────────
phase_dashboard() {
    local vite_pid
    vite_pid=$(pgrep -f "vite.*${PORT}" | head -1 2>/dev/null || echo "N/A")

    echo
    echo -e "  ${C_GRAY_DIM}╔═══════════════════════════════════════════════════════════════╗${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}  ${C_WHITE}${C_BOLD}              ✓  CONNECTION ESTABLISHED  ✓${C_RESET}              ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}                                                       ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}    ${C_GREEN}${C_BOLD}GiDAS${C_RESET}  ${C_GREEN_DIM}·${C_RESET}  ${C_GREEN}${C_BOLD}INFRA IT${C_RESET}      ${C_CYAN}Grupo de Investigación${C_RESET}         ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}    ${C_DIM}UTN FRLP — JFP 2026${C_RESET}               ${C_CYAN}DevOps Sostenible${C_RESET}      ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}                                                       ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}╠═══════════════════════════════════════════════════════════════╣${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}                                                       ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}    ${C_CYAN}▲${C_RESET}  Presentation   ${C_WHITE}http://localhost:${PORT}${C_RESET}                ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}    ${C_CYAN}▲${C_RESET}  Presenter      ${C_WHITE}http://localhost:${PORT}/?presenter${C_RESET}         ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}    ${C_CYAN}▲${C_RESET}  API Sync       ${C_WHITE}http://localhost:${PORT}/api/slide${C_RESET}         ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}                                                       ${C_GRAY_DIM}║${C_RESET}"
    if [ -n "$vite_pid" ] && [ "$vite_pid" != "N/A" ]; then
        echo -e "  ${C_GRAY_DIM}║${C_RESET}    ${C_GREEN}●${C_RESET}  Vite PID       ${C_GRAY}${vite_pid}${C_RESET}                                ${C_GRAY_DIM}║${C_RESET}"
    fi

    if command -v kscreen-doctor &>/dev/null; then
        local output_info hdmi_name laptop_name
        output_info=$(kscreen-doctor -o 2>/dev/null | sed 's/\x1b\[[0-9;]*[a-zA-Z]//g')
        hdmi_name=$(echo "$output_info" | grep "HDMI" | head -1 | awk '{print $2}')
        [ -z "$hdmi_name" ] && hdmi_name=$(echo "$output_info" | grep -B 4 "^[[:space:]]*HDMI$" | head -1 | awk '{print $2}')
        laptop_name=$(echo "$output_info" | grep "eDP" | head -1 | awk '{print $2}')
        [ -z "$laptop_name" ] && laptop_name=$(echo "$output_info" | grep "Panel" -B 4 | head -1 | awk '{print $2}')

        if [ -n "$hdmi_name" ]; then
            local hdmi_geom hdmi_wh
            hdmi_geom=$(echo "$output_info" | grep "HDMI" -A 5 | grep "Geometry" | head -1)
            hdmi_wh=$(echo "$hdmi_geom" | sed 's/.*Geometry:[[:space:]]*//' | awk '{print $2}')
            echo -e "  ${C_GRAY_DIM}║${C_RESET}    ${C_GREEN}●${C_RESET}  HDMI output    ${C_GRAY}${hdmi_name} (${hdmi_wh})${C_RESET}                          ${C_GRAY_DIM}║${C_RESET}"
        fi
        if [ -n "$laptop_name" ]; then
            echo -e "  ${C_GRAY_DIM}║${C_RESET}    ${C_GREEN}●${C_RESET}  Laptop output  ${C_GRAY}${laptop_name}${C_RESET}                                ${C_GRAY_DIM}║${C_RESET}"
        fi
    fi

    echo -e "  ${C_GRAY_DIM}║${C_RESET}                                                       ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}╠═══════════════════════════════════════════════════════════════╣${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}                                                       ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}    ${C_GREEN}→${C_RESET}  LAPTOP:     Use ${C_WHITE}← →${C_RESET} or ${C_WHITE}PREV/NEXT${C_RESET} to navigate   ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}    ${C_CYAN}→${C_RESET}  PROJECTOR:  Syncs automatically via API REST    ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}    ${C_ORANGE}→${C_RESET}  TIMER:      Starts on first slide change      ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}    ${C_GREEN}→${C_RESET}  EXIT:       ${C_DIM}make stop${C_RESET} or close windows manually     ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}                                                       ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}╚═══════════════════════════════════════════════════════════════╝${C_RESET}"
    echo
    echo -e "  ${C_DIM}»${C_RESET}  ${C_WHITE}DevOps Sostenible${C_RESET} — experiencia lista.  Que la disfrutes.  ${C_DIM}«${C_RESET}"
    echo
}

# ─── Main ────────────────────────────────────────────────────────────────────
main() {
    phase_banner
    phase_system_check
    phase_server_startup
    phase_deploy_windows
    phase_dashboard
}

main "$@"
