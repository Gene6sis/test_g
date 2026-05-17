import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {HangmanGame} from './HangmanGame.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HangmanGame />
  </StrictMode>,
)
