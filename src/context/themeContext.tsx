import React, { ReactNode, createContext, useState } from 'react'

export interface ThemeContextTypes {
  themeIsDark: boolean
  changeTheme: () => void
}
export const darkTheme = false
export const ThemeContext = createContext<ThemeContextTypes | null>(null)

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [themeIsDark, setTheme] = useState(darkTheme)

  const changeTheme = () => {
    setTheme(!themeIsDark)
  }

  return <ThemeContext.Provider value={{ themeIsDark, changeTheme }}>{children}</ThemeContext.Provider>
}
