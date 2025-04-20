import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// En tu main.jsx
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';  // Primero el tema
import 'primereact/resources/primereact.css';                     // Componentes
import 'primeflex/primeflex.css';                                 // Luego PrimeFlex
import 'primeicons/primeicons.css';                               // Íconos al final
import { PrimeReactProvider } from 'primereact/api';
import AuthProvider from './context/AuthProvider.jsx';
import App from './App.jsx';
import { AlertContainer } from './utilities/alerts/AlertHelper.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider>
      <AuthProvider>
        <AlertContainer/>
        <App />
      </AuthProvider>
    </PrimeReactProvider>
  </StrictMode>
);