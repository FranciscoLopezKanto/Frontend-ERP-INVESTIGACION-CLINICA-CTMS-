import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth.context.tsx'
import { LoadingProvider } from './context/loading.context.tsx'
import { SessionExpiredProvider } from './context/session-expired.context.tsx'
import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <LoadingProvider>
        <SessionExpiredProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SessionExpiredProvider>
      </LoadingProvider>
    </AuthProvider>
  </React.StrictMode>
)
