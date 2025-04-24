import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './store/AuthContext.jsx'
import { BlogProvider } from './store/BlogContext.jsx'
import { NotificationProvider } from './store/NotificationContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BlogProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </BlogProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
