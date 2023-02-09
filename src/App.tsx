import React from 'react'
import { Header } from './components/Header/Header'
import { ThemeContextProvider } from './context/themeContext'

import { RoutesConfig } from './RoutesConfig/RoutesConfig'

const App: React.FunctionComponent = () => {
  return (
    <div className='App'>
      <ThemeContextProvider>
        <Header />
        <RoutesConfig />
      </ThemeContextProvider>
    </div>
  )
}

export default App
