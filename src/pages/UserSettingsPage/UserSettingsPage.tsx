import { SettingsSidebar } from './SettingsSidebar'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

export const UserSettingsPage = () => {
  return (
    <>
      <Box>
        <SettingsSidebar />
      </Box>
      <Box sx={{ width: '75%', minHeight: '100vh', overflow: 'scroll', transform: 'translateX(34%)' }}>
        <Outlet />
      </Box>
    </>
  )
}
