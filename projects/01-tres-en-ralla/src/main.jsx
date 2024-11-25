import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppGato } from './AppGato.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppGato />
  </StrictMode>
)
