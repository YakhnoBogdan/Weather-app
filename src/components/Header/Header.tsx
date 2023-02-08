import { HeaderNavMenu } from '../HeaderNavMenu/HeaderNavMenu'
import { SwitchTheme } from '../SwitchTheme/SwitchTheme'
import { ThemeContext, ThemeContextTypes } from '../../context/themeContext'
import { useContext, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { selectWeather } from '../../redux/weather/selectors'
import { selectCurrentUser, selectCurrentUserId } from '../../redux/user/selectors'
import { logoutUserAction } from '../../redux/user/actions'

export const Header = () => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentUser = useSelector(selectCurrentUser)
  const currentUserId = useSelector(selectCurrentUserId)
  const weatherCity = useSelector(selectWeather)?.location.name

  const handleLogout = useCallback(() => {
    dispatch(logoutUserAction())
    navigate('/login')
  }, [dispatch, navigate])

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
        <HeaderNavMenu currentUser={currentUser} currentUserId={currentUserId} weatherCity={weatherCity} handleLogout={handleLogout} />
      </Box>
    </Box>
  )
}
