import { NavLinksList } from './NavLinksList'
import { MobileNavBar } from './MobileNavBar'
import { ThemeContext, ThemeContextTypes } from '../../context/themeContext'
import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Box, Avatar, Menu, MenuItem, Tooltip, ListItemIcon, IconButton } from '@mui/material'
import { Settings, Logout } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { UserData } from '../../Types/UserModel'

interface HeaderMenuProps {
  currentUser: { [id: string]: UserData } | null
  currentUserId: string
  weatherCity: string | undefined
  handleLogout: () => void
}
export const HeaderNavMenu = ({ currentUser, currentUserId, weatherCity, handleLogout }: HeaderMenuProps) => {
  const { themeIsDark } = React.useContext(ThemeContext) as ThemeContextTypes

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const open = Boolean(anchorEl)

  const firstNameLetter = React.useMemo(() => {
    if (currentUser !== null && currentUserId !== '' && currentUser !== undefined) {
      return currentUser[currentUserId].name[0]
    }
  }, [currentUser, currentUserId])

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }
  function noUserLoginOutput(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    alert('Login for checking profile')
  }

  const handleOpenDrawer = React.useCallback(() => {
    setDrawerOpen(true)
  }, [])
  const handleCloseDrawer = React.useCallback(() => {
    setDrawerOpen(false)
  }, [])

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: { md: 'flex', xs: 'none' }, alignItems: 'center', gap: '10px', textAlign: 'center' }}>
          <NavLinksList weatherCity={weatherCity} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Tooltip title='Account settings'>
            <IconButton
              onClick={currentUser != null ? handleClick : noUserLoginOutput}
              size='small'
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar
                sx={{
                  width: 42,
                  height: 42,
                  backgroundColor: themeIsDark ? '#51b451' : '#155915',
                  '&:hover': { backgroundColor: themeIsDark ? '#ccc' : '#000' },
                  transition: 'all 0.3s ease-in',
                }}
              >
                {firstNameLetter ?? '?'}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Box sx={{ display: { md: 'none' } }}>
            <IconButton color='inherit' aria-label='open drawer' edge='start' onClick={handleOpenDrawer} sx={{ display: { md: 'none' } }}>
              <MenuIcon sx={{ width: '40px', height: '40px' }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <MobileNavBar drawerOpen={drawerOpen} LinksList={<NavLinksList weatherCity={weatherCity} />} handleCloseDrawer={handleCloseDrawer} />
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
