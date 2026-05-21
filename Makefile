# ============================================================================
# JPF — DevOps Experience Makefile
# ============================================================================
# make start           → Lanza la experiencia completa (construye, despliega, abre)
# make stop            → Detiene el contenedor y cierra el navegador
# make build           → Construye la imagen Docker
# make clean           → Limpia todo (contenedores, imágenes)
# make save            → Guarda la imagen como TAR versionado
# make presenter       → Abre vista presentador + proyector (requiere servidor)
# make presenter-start → Lanza servidor + ambas ventanas
# make dev-presenter   → Modo desarrollo: Vite + ambas ventanas
# ============================================================================

PORT     ?= 8080
VERSION  ?= v1.6
TAR_FILE ?= docker-images/presentacion-jpf-$(VERSION).tar

.PHONY: start stop build clean save help presenter presenter-start dev-presenter

start: ## 🚀 Lanza la presentación con efectos visuales
	@bash scripts/launch.sh $(PORT)

stop: ## ⏹  Detiene el contenedor y cierra el navegador
	@echo "  ⏹  Deteniendo contenedor..."
	@docker compose down 2>/dev/null || true
	@-pkill -f "firefox --kiosk" 2>/dev/null || true
	@-pkill -f "chromium-browser --kiosk" 2>/dev/null || true
	@-pkill -f "google-chrome --kiosk" 2>/dev/null || true
	@echo "  ✅  Todo detenido."

build: ## 🏗️  Construye la imagen Docker
	docker compose build

rebuild: clean build ## 🔄  Reconstruye desde cero (clean + build)

clean: ## 🗑️  Limpia contenedores, volúmenes e imágenes
	docker compose down -v 2>/dev/null || true
	-docker rmi presentacion-jpf-presentacion:latest 2>/dev/null || true
	@echo "  ✅  Todo limpio."

presenter: ## 🎬  Abre presentación proyector + vista presentador (requiere servidor)
	@echo "  ▶ Abriendo ventanas…"
	@xdg-open "http://localhost:$(PORT)" >/dev/null 2>&1 &
	@sleep 0.5
	@xdg-open "http://localhost:$(PORT)/?presenter" >/dev/null 2>&1 &
	@echo ""
	@echo "  ┌────────────────────────────────────────────────────────┐"
	@echo "  │  🖥️  VENTANA 1 — PROYECTOR                             │"
	@echo "  │     http://localhost:$(PORT)                             │"
	@echo "  │     Arrastrala a la pantalla HDMI. F11 para fullscreen │"
	@echo "  ├────────────────────────────────────────────────────────┤"
	@echo "  │  💻 VENTANA 2 — LAPTOP (VISTA PRESENTADOR)             │"
	@echo "  │     http://localhost:$(PORT)/?presenter                  │"
	@echo "  │     Notas · cronómetro · preview · flechas ← →         │"
	@echo "  └────────────────────────────────────────────────────────┘"
	@echo ""

presenter-start: ## 🚀  Lanza servidor + abre ambas ventanas
	@bash scripts/presenter-launch.sh $(PORT)

dev-presenter: ## 🔧  Modo desarrollo: Vite + ambas ventanas
	@echo "  ▶ Iniciando Vite en background…"
	@(npx vite --port $(PORT) &)
	@sleep 2
	@$(MAKE) presenter

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
