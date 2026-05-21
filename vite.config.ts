import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Plugin de sincronización para la vista del presentador.
 *
 * Expone un endpoint REST /api/slide que permite a la ventana del
 * presentador y a la ventana del proyector (kiosko) sincronizar
 * el slide actual a través del servidor, sin depender de
 * BroadcastChannel (que no funciona entre perfiles/instancias
 * separadas de Firefox).
 *
 * GET  /api/slide → { slide: number, version: number }
 * POST /api/slide → body: { slide: number } → { ok: true }
 */
function slideSyncPlugin(): Plugin {
  let state = { slide: 0, version: 0 };

  return {
    name: 'slide-sync',
    configureServer(server) {
      server.middlewares.use('/api/slide', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(state));
          return;
        }

        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: Buffer) => (body += chunk.toString()));
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const slide = Number(data.slide);
              if (isNaN(slide) || slide < 0) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'invalid slide' }));
                return;
              }
              state = { slide, version: state.version + 1 };
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true }));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'invalid JSON' }));
            }
          });
          return;
        }

        res.statusCode = 405;
        res.end();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), slideSyncPlugin()],
})
