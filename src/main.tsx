import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeSelectionProvider } from "./context/themeContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeSelectionProvider>
      <App />
    </ThemeSelectionProvider>
  </StrictMode>,
)
