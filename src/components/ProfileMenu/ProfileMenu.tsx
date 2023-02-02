import { ThemeContext, ThemeContextTypes } from '../../context/themeContext'
import * as React from 'react'
import { Box, Avatar, Menu, MenuItem, Divider, Typography, Tooltip, ListItemIcon, IconButton, styled } from '@mui/material'
import { Settings, Logout } from '@mui/icons-material'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, selectCurrentUserId } from '../../redux/user/selectors'
import { selectWeather } from '../../redux/weather/selectors'
import { logoutUserAction } from '../../redux/user/actions'
import dayjs from 'dayjs'

const StyledLink = styled(Typography)(({ theme }) => ({
  minWidth: 100,
  position: 'relative',
  '&:before': {
    content: "''",
    display: 'block',
    position: 'absolute',
    backgroundColor: '#000',
    height: '3px',
    width: '100%',
    bottom: '-10px',
    left: '0',
    transform: 'scaleX(0)',
    transformOrigin: 'right bottom',
    transition: 'transform 0.25s ease-in',
  },
  '&:hover:before': {
    transform: 'scaleX(1)',
    transformOrigin: 'left bottom',
  },
}))
export const ProfileMenu: React.FunctionComponent = () => {
  const { themeIsDark } = React.useContext(ThemeContext) as ThemeContextTypes

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)
  const currentUserId = useSelector(selectCurrentUserId)

  const weatherCity = useSelector(selectWeather)?.location.name

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const firstNameLetter = React.useMemo(() => {
    if (currentUser !== null && currentUserId !== '' && currentUser !== undefined) {
      return currentUser[currentUserId].name[0]
    }
  }, [currentUser, currentUserId])

  const today = React.useMemo(() => dayjs().format('YYYY-MM-DD'), [])

  const linkPaths = React.useMemo(() => {
    const paths = ['Homepage', 'Realtime Weather', 'Forecast', 'Weather history', 'Sport events']
    return paths.map((path) => {
      switch (path) {
        case 'Homepage':
          return [path, '/']
          break
        case 'Realtime Weather':
          return [path, `/realtime-weather/${weatherCity !== undefined ? weatherCity : ''}`]
          break
        case 'Forecast':
          return [path, `/forecast/${weatherCity !== undefined ? `${weatherCity}/0` : ''}`]
          break
        case 'Weather history':
          return [path, `/weather-history/${weatherCity !== undefined ? `${weatherCity}/${today}` : ''}`]
          break
        case 'Sport events':
          return [path, `/sport-events/${weatherCity !== undefined ? weatherCity : 'Chicago'}`]
          break
        default:
          return [path, '/']
      }
    })
  }, [today, weatherCity])

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }
  function noUserLoginOutput(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    alert('Login for checking profile')
  }

  const handleLogout = React.useCallback(() => {
    dispatch(logoutUserAction())
    navigate('/login')
  }, [dispatch, navigate])

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', gap: '10px' }}>
        {linkPaths.map((path, index) => {
          return (
            <React.Fragment key={path[0]}>
              <NavLink
                to={path[1]}
                style={({ isActive }) =>
                  isActive ? { color: themeIsDark ? '#000' : '#5a5eff', fontWeight: '700' } : { color: themeIsDark ? '#fff' : '#000' }
                }
              >
                <StyledLink>{path[0]}</StyledLink>
              </NavLink>
              {index !== linkPaths.length - 1 && <Divider orientation='vertical' flexItem sx={{ backgroundColor: '#ccc' }} />}
            </React.Fragment>
          )
        })}

        <Tooltip title='Account settings'>
          <IconButton
            onClick={currentUser != null ? handleClick : noUserLoginOutput}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 42, height: 42, backgroundColor: themeIsDark ? '#51b451' : '#155915' }}>{firstNameLetter ?? '?'}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <NavLink to={'/settings'}>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize='small' />
            </ListItemIcon>
            Settings
          </MenuItem>
        </NavLink>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
