import { Login } from './Login'
import { Registration } from './Registration'
import React, { useCallback, useState, useContext } from 'react'
import { Tabs, Tab, Box } from '@mui/material'

import { ThemeContext, ThemeContextTypes } from '../../context/themeContext'

export const LoginPage = () => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes
  const [tabValue, setTabValue] = useState('login')

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: 'calc(100vh - 80px)',
        background: themeIsDark
          ? 'linear-gradient(90deg, rgb(65 65 71) 0%, rgb(75 75 96) 46%, rgb(125 126 166) 100%)'
          : 'linear-gradient(90deg, rgba(99,226,221,1) 0%, rgba(255,255,255,1) 100%)',
      }}
    >
      <Box sx={{ position: 'relative', top: '-40%' }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          textColor='primary'
          indicatorColor='primary'
          aria-label='secondary tabs example'
          sx={{ marginBottom: '10px' }}
        >
          <Tab value='login' label='Login' sx={{ color: themeIsDark ? '#fff' : '#000' }} />
          <Tab value='registation' label='Registration' sx={{ color: themeIsDark ? '#fff' : '#000' }} />
        </Tabs>
        {tabValue === 'login' ? <Login /> : <Registration />}
      </Box>
    </Box>
  )
}
