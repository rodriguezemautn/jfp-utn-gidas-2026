import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { PresenterApp } from './presenter/PresenterApp'

/**
 * ─── Routing ───
 *
 * The app supports three modes via query parameters:
 *
 *   /                → Main kiosk view (projector / primary display)
 *                       Full-screen presentation with controls.
 *                       Broadcasts and listens via BroadcastChannel.
 *
 *   /?presenter      → Presenter view (laptop / secondary display)
 *                     Shows slide notes, timer, preview, navigation.
 *                     Broadcasts and listens via BroadcastChannel.
 *                     Opened manually by the speaker on their laptop.
 *
 *   /?kiosk=1        → Kiosk embed view (for iframe previews in presenter)
 *                     Same slides as main view, but without chrome
 *                     (no StatusBar, no NavigationControls, no Particles).
 *                     Only listens via BroadcastChannel.
 */

const params = new URLSearchParams(window.location.search);
const isPresenter = params.has('presenter');
const isKiosk = params.get('kiosk') === '1';

function render() {
  const rootEl = document.getElementById('root');
  if (!rootEl) throw new Error('Root element not found');

  const root = createRoot(rootEl);

  if (isPresenter) {
    root.render(
      <StrictMode>
        <PresenterApp />
      </StrictMode>,
    );
  } else {
    root.render(
      <StrictMode>
        <App kioskMode={isKiosk} />
      </StrictMode>,
    );
  }
}

render();
