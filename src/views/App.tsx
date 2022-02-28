import { useState, useEffect } from 'react'
import { Router } from '~/router/Router';
import { AppContextProvider } from '~/context/AppContext'
import {
  
  QueryClient,
  QueryClientProvider,
} from 'react-query'

// 创建一个 client
const queryClient = new QueryClient()

function App(): JSX.Element {
  useEffect(() => {

  }, [])
  return (
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </AppContextProvider>
  )
}
export default App
