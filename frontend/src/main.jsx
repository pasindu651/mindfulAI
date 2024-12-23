import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "../node_modules/primeflex/primeflex.css";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <PrimeReactProvider theme="lara-light-indigo" ripple={true}> {/* Wrap your app with PrimeReactProvider */}
    <App />
    </PrimeReactProvider>
    </Router>
  </StrictMode>,
)
