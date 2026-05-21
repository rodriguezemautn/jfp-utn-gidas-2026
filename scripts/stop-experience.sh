#!/usr/bin/env bash
# ============================================================================
# JPF DevOps Experience — Stop Experience
# ============================================================================
# Shutdown cinemático de la presentación DevOps Sostenible.
# Tan importante como arrancar, es saber cuándo bajar la persiana.
# ============================================================================
set -euo pipefail

# ─── Colores ANSI 256 ──────────────────────────────────────────────────────
C_BOLD='\033[1m'
C_DIM='\033[2m'
C_RESET='\033[0m'

C_FG='\033[38;5;252m'
C_GREEN='\033[38;5;46m'
C_GREEN_DIM='\033[38;5;28m'
C_GREEN_DARK='\033[38;5;22m'
C_CYAN='\033[38;5;87m'
C_YELLOW='\033[38;5;226m'
C_RED='\033[38;5;196m'
C_WHITE='\033[38;5;255m'
C_GRAY='\033[38;5;245m'
C_GRAY_DIM='\033[38;5;238m'
C_ORANGE='\033[38;5;208m'

# ─── Config ─────────────────────────────────────────────────────────────────
PORT="${1:-8080}"

# ─── Helpers ────────────────────────────────────────────────────────────────

phase_title() {
    local num="$1" title="$2" icon="${3:-■}"
    echo
    echo -e "  ${C_GRAY_DIM}╭──────────────────────────────────────────────────────────────╮${C_RESET}"
    echo -e "  ${C_GRAY_DIM}│${C_RESET}  ${C_DIM}[${C_RESET}${C_ORANGE}${num}${C_RESET}${C_DIM}]${C_RESET}  ${C_RED}${icon}${C_RESET}  ${C_WHITE}${title}${C_RESET}"
    echo -e "  ${C_GRAY_DIM}├──────────────────────────────────────────────────────────────┤${C_RESET}"
}

status_ok()    { echo -e "  ${C_GRAY_DIM}│${C_RESET}  ${C_GREEN}●${C_RESET}  $*"; }
status_warn()  { echo -e "  ${C_GRAY_DIM}│${C_RESET}  ${C_YELLOW}▲${C_RESET}  $*"; }
status_info()  { echo -e "  ${C_GRAY_DIM}│${C_RESET}  ${C_DIM}‧${C_RESET}  ${C_GRAY}$*${C_RESET}"; }
status_dim()   { echo -e "  ${C_GRAY_DIM}│${C_RESET}  ${C_GRAY_DIM}  $*${C_RESET}"; }
status_kill()  { echo -e "  ${C_GRAY_DIM}│${C_RESET}  ${C_RED}✘${C_RESET}  $*"; }

phase_close() {
    echo -e "  ${C_GRAY_DIM}╰──────────────────────────────────────────────────────────────╯${C_RESET}"
}

# ─── Banner ──────────────────────────────────────────────────────────────────

show_banner_shutdown() {
    echo
    echo -e "  ${C_GRAY_DIM}┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}                                                               ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}               ${C_GREEN_DARK}$(printf '%s' '  _____ _ _____           _____')${C_RESET}                    ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}               ${C_GREEN_DARK}$(printf '%s' ' / ____(_)  __ \   /\    / ____|')${C_RESET}                   ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}               ${C_GREEN_DARK}$(printf '%s' '| |  __ _| |  | | /  \  | (___  ')$(printf ' ')${C_RESET}                   ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}               ${C_GREEN_DARK}$(printf '%s' '| | |_ | | |  | |/ /\ \  \___ \ ')${C_RESET}                   ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}               ${C_GREEN_DARK}$(printf '%s' '| |__| | | |__| / ____ \ ____) |')${C_RESET}                   ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}               ${C_GREEN_DARK}$(printf '%s' ' \_____|_|_____/_/    \_\_____/ ')${C_RESET}                   ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}                                                               ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}              ${C_GREEN_DARK}$(printf '%s' ' _____ _   _ ______ _____            _ _______ ')${C_RESET}      ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}              ${C_GREEN_DARK}$(printf '%s' '|_   _| \ | |  ____|  __ \     /\   (_)__   __|')${C_RESET}     ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}              ${C_GREEN_DARK}$(printf '%s' '  | | |  \| | |__  | |__) |   /  \   _   | |   ')$(printf ' ')${C_RESET}     ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}              ${C_GREEN_DARK}$(printf '%s' '  | | | . ` |  __| |  _  /   / /\ \ | |  | |   ')$(printf ' ')${C_RESET}     ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}              ${C_GREEN_DARK}$(printf '%s' ' _| |_| |\  | |    | | \ \  / ____ \| |  | |   ')$(printf ' ')${C_RESET}     ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}              ${C_GREEN_DARK}$(printf '%s' '|_____|_| \_|_|    |_|  \_\/_/    \_\_|  |_|   ')$(printf ' ')${C_RESET}     ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}                                                               ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}               ${C_RED}${C_BOLD}⚡  POWERING DOWN  ⚡${C_RESET}                     ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}         ${C_DIM}Cerrando la experiencia DevOps Sostenible${C_RESET}          ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┃${C_RESET}                                                               ${C_GRAY_DIM}┃${C_RESET}"
    echo -e "  ${C_GRAY_DIM}┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛${C_RESET}"
    echo
}

# ─── FASE 1: Kill Firefox ───────────────────────────────────────────────────
phase_kill_firefox() {
    phase_title "1/3" "TERMINATING PRESENTATION WINDOWS" "■"

    local count=0
    for p in $(ps aux | grep -E "firefox.*localhost:${PORT}" | grep -v grep | awk '{print $2}' 2>/dev/null); do
        kill "$p" 2>/dev/null || true
        count=$((count+1))
    done

    if [ "$count" -gt 0 ]; then
        sleep 1
        # Verify they're gone
        local remaining
        remaining=$(ps aux | grep -E "firefox.*localhost:${PORT}" | grep -v grep | wc -l 2>/dev/null || echo 0)
        if [ "$remaining" -eq 0 ]; then
            status_kill "$count Firefox window(s) closed"
        else
            status_warn "$count Firefox window(s) signalled — $remaining remaining"
        fi
    else
        status_info "No Firefox windows found on port ${PORT}"
    fi

    phase_close
}

# ─── FASE 2: Kill Vite ──────────────────────────────────────────────────────
phase_kill_vite() {
    phase_title "2/3" "STOPPING PRESENTATION ENGINE" "■"

    local vite_pids
    vite_pids=$(ps aux | grep -E "vite.*${PORT}" | grep -v grep | awk '{print $2}' 2>/dev/null || true)

    if [ -n "$vite_pids" ]; then
        local count=0
        for p in $vite_pids; do
            kill "$p" 2>/dev/null || true
            count=$((count+1))
        done
        sleep 1

        # Verify
        if ps aux | grep -E "vite.*${PORT}" | grep -v grep >/dev/null 2>&1; then
            status_warn "Vite server (PID: $(echo "$vite_pids" | tr '\n' ' ')) — force killing..."
            for p in $vite_pids; do
                kill -9 "$p" 2>/dev/null || true
            done
            status_kill "Vite server force-stopped"
        else
            status_kill "Vite server (PID: $(echo "$vite_pids" | tr '\n' ' ')) stopped"
        fi
    else
        status_info "No Vite server running on port ${PORT}"
    fi

    # Clean up Vite log
    rm -f /tmp/vite-presenter.log
    status_dim "  ───────────────────────────────────────────"

    # Check both results
    if ps aux | grep -E "firefox.*localhost:${PORT}|vite.*${PORT}" | grep -v grep >/dev/null 2>&1; then
        status_warn "${C_YELLOW}Some processes may still be running — check manually${C_RESET}"
    else
        status_ok "${C_GREEN}All processes terminated successfully${C_RESET}"
    fi
    phase_close
}

# ─── FASE 3: Docker Cleanup ─────────────────────────────────────────────────
phase_docker_cleanup() {
    phase_title "3/3" "CLEANING UP CONTAINERS" "■"

    if command -v docker &>/dev/null; then
        if docker compose down 2>/dev/null; then
            status_kill "Docker containers stopped and removed"
        else
            status_info "No Docker containers to clean"
        fi
    else
        status_info "Docker not available — skipping"
    fi

    # Clean up temp kiosk profile
    rm -rf "/tmp/jpf-kiosk-profile-${PORT}" 2>/dev/null || true
    status_dim "  ───────────────────────────────────────────"
    status_ok "${C_GREEN}Cleanup complete${C_RESET}"
    phase_close
}

# ─── Final Dashboard ─────────────────────────────────────────────────────────
phase_final() {
    echo
    echo -e "  ${C_GRAY_DIM}╔═══════════════════════════════════════════════════════════════╗${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}  ${C_RED}${C_BOLD}               ✘  SYSTEM OFFLINE  ✘${C_RESET}                 ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}                                                       ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}    ${C_GREEN_DARK}${C_BOLD}GiDAS${C_RESET}  ${C_GREEN_DIM}·${C_RESET}  ${C_GREEN_DARK}${C_BOLD}INFRA IT${C_RESET}      ${C_GRAY}Grupo de Investigación${C_RESET}         ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}    ${C_DIM}UTN FRLP — JFP 2026${C_RESET}               ${C_GRAY}DevOps Sostenible${C_RESET}      ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}                                                       ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}╠═══════════════════════════════════════════════════════════════╣${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}                                                       ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}  ${C_RED}■${C_RESET}  Firefox      ${C_GRAY}── terminated${C_RESET}                     ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}  ${C_RED}■${C_RESET}  Vite server  ${C_GRAY}── stopped${C_RESET}                       ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}  ${C_RED}■${C_RESET}  Docker       ${C_GRAY}── cleaned${C_RESET}                       ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}  ${C_RED}■${C_RESET}  Temp files   ${C_GRAY}── removed${C_RESET}                       ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}                                                       ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}╠═══════════════════════════════════════════════════════════════╣${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}                                                       ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}  ${C_GREEN}→${C_RESET}  ${C_DIM}Gracias por usar la experiencia DevOps Sostenible${C_RESET}  ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}  ${C_GREEN}→${C_RESET}  ${C_DIM}Recordá: el impacto ambiental también se mide${C_RESET}   ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}  ${C_GREEN}→${C_RESET}  ${C_DIM}en lo que APAGÁS, no solo en lo que encendés${C_RESET}    ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}║${C_RESET}                                                       ${C_GRAY_DIM}║${C_RESET}"
    echo -e "  ${C_GRAY_DIM}╚═══════════════════════════════════════════════════════════════╝${C_RESET}"
    echo
    echo -e "  ${C_RED}${C_DIM}«${C_RESET}  ${C_WHITE}Experiencia finalizada${C_RESET}  ${C_RED}${C_DIM}»${C_RESET}"
    echo
}

# ─── Main ────────────────────────────────────────────────────────────────────
main() {
    clear 2>/dev/null || true
    show_banner_shutdown
    sleep 0.5
    phase_kill_firefox
    phase_kill_vite
    phase_docker_cleanup
    phase_final
}

main "$@"
