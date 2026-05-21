# ============================================================================
# JPF — DevOps Experience Makefile
# ============================================================================
# make start         → Automatiza TODO: arranca Vite + abre kiosko + presentador
# make stop          → Detiene Vite y cierra las ventanas de Firefox
# make build         → Construye la imagen Docker
# make clean         → Limpia contenedores e imágenes
# make save          → Guarda la imagen como TAR versionado
# ============================================================================

PORT     ?= 8080
VERSION  ?= v1.6
TAR_FILE ?= docker-images/presentacion-jpf-$(VERSION).tar

.PHONY: start stop build clean save help

start: ## 🚀  DevOps Experience: presenta la experiencia completa
	@bash scripts/launch-experience.sh $(PORT)

stop: ## ⏹  Shutdown experience: cierra todo con estilo
	@bash scripts/stop-experience.sh $(PORT)

build: ## 🏗️  Construye la imagen Docker
	docker compose build

rebuild: clean build ## 🔄  Reconstruye desde cero

clean: ## 🗑️  Limpia contenedores e imágenes
	docker compose down -v 2>/dev/null || true
	-docker rmi presentacion-jpf-presentacion:latest 2>/dev/null || true
	@echo "  ✅  Todo limpio."

save: ## 💾  Guarda la imagen como TAR versionado
	@mkdir -p docker-images
	@docker tag presentacion-jpf-presentacion:latest presentacion-jpf:$(VERSION) 2>/dev/null || true
	@echo "  💾  Guardando presentacion-jpf:$(VERSION) → $(TAR_FILE) ..."
	@docker save -o $(TAR_FILE) presentacion-jpf:$(VERSION)
	@echo "  ✅  Imagen guardada: $$(ls -lh $(TAR_FILE) | awk '{print $$5}')"

help: ## 📖  Muestra esta ayuda
	@echo
	@echo "  ┌─────────────────────────────────────────────┐"
	@echo "  │  JPF — DevOps Experience                    │"
	@echo "  │  UTN FRLP — GiDAS                           │"
	@echo "  └─────────────────────────────────────────────┘"
	@echo
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[38;5;46m%-18s\033[0m → %s\n", $$1, $$2}'
	@echo
