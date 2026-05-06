import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

/*
 * BrowserRouter wraps the entire app here, not inside App. This is where
 * React Router's context is established — every component inside can read
 * the current URL and respond to navigation events. It sits at the root
 * because routing is an application-level concern, not a component concern.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
