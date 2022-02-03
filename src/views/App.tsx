import { useState, useEffect } from 'react'
import { Router } from '~/router/Router';
import { AppContextProvider } from '~/context/AppContextProvider'

function App(): JSX.Element {
  useEffect(() => {

  }, [])
  return (
    <AppContextProvider>
      <Router />
    </AppContextProvider>
  )
}
export default App
