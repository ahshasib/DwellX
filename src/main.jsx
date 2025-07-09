import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './context/AuthProvider'
import { RouterProvider } from 'react-router'
import router from './routes/Routes'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <div className='poppins-extralight'>
        <RouterProvider router={router}></RouterProvider>
        </div>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)
