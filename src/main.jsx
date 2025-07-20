import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './context/AuthProvider'
import { RouterProvider } from 'react-router'
import router from './routes/Routes'
import { HelmetProvider } from 'react-helmet-async'
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'



const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
     <QueryClientProvider client={queryClient}>
     <AuthProvider>
        <div className='poppins-extralight'>
        <RouterProvider router={router}></RouterProvider>
        </div>
      </AuthProvider>
     </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
)
