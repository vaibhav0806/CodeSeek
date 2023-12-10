import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
      </NextUIProvider>
    </React.StrictMode>,
  )
