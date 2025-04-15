
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create root and render app with strict mode disabled to avoid double rendering
createRoot(document.getElementById("root")!).render(<App />);
