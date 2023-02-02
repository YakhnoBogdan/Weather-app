import { useContext } from 'react'
import { ProfileMenu } from '../ProfileMenu/ProfileMenu'
import { SwitchTheme } from '../SwitchTheme/SwitchTheme'
import { Box } from '@mui/material'
import { ThemeContext, ThemeContextTypes } from '../../context/themeContext'

export const Header = () => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes

  return (
    <Box
      component={'header'}
      sx={{
        background: themeIsDark
          ? 'linear-gradient(90deg, rgb(65 65 71) 0%, rgb(75 75 96) 46%, rgb(125 126 166) 100%)'
          : 'linear-gradient(90deg, rgba(99,226,221,1) 0%, rgba(255,255,255,1) 100%)',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '0.5px solid #ccc',
      }}
    >
      <Box sx={{ width: '80%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <SwitchTheme />
        <ProfileMenu />
      </Box>
    </Box>
  )
}
