#!/usr/bin/env bash
# ============================================================================
# JPF DevOps Experience — Wait For Server
# ============================================================================
# Polls a URL until it responds (or timeout). Replaces brittle `sleep N`.
# ============================================================================
set -euo pipefail

PORT="${1:-8080}"
LABEL="${2:-Servidor}"
TIMEOUT=30
URL="http://localhost:${PORT}"

echo "  ⏳ Esperando a que ${LABEL} responda en ${URL}..."

elapsed=0
while true; do
    if curl -sf "${URL}" >/dev/null 2>&1; then
        echo -e "  \033[38;5;46m●\033[0m ${LABEL} listo (${elapsed}s)"
        exit 0
    fi
    if [ "$elapsed" -ge "$TIMEOUT" ]; then
        echo -e "  \033[38;5;196m✘ Timeout: ${LABEL} no responde después de ${TIMEOUT}s\033[0m"
        exit 1
    fi
    sleep 1
    elapsed=$((elapsed + 1))
done
