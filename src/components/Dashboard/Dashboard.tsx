import { UserPreferences } from '../UserPreferences/UserPreferences'
import { ThemeContext, ThemeContextTypes } from '../../context/themeContext'
import { themeStyles } from '../../context/themeStyles'
import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import './Dashboard.css'

export const Dashboard = () => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes
  return (
    <Box className='dashboard' sx={{ ...themeStyles(themeIsDark)?.dashboad }}>
      <UserPreferences />
      <Outlet />
    </Box>
  )
}
