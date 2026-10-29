import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { LangProvider } from './i18n'
import App from './App'
import './index.css'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <LangProvider>
        <App />
      </LangProvider>
    </BrowserRouter>
  </StrictMode>
)

// Hydrate only when the prerendered HTML is for this exact path; SPA-fallback pages render fresh.
if (root.hasChildNodes() && root.dataset.path === location.pathname) hydrateRoot(root, app)
else createRoot(root).render(app)
