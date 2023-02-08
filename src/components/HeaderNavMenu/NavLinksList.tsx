import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import { Divider, Typography, styled } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { ThemeContext, ThemeContextTypes } from '../../context/themeContext'

interface NavLinksProps {
  weatherCity: string | undefined
}

const StyledLink = styled(Typography)(() => ({
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

export const NavLinksList = ({ weatherCity }: NavLinksProps) => {
  const { themeIsDark } = React.useContext(ThemeContext) as ThemeContextTypes

  const today = useMemo(() => dayjs().format('YYYY-MM-DD'), [])

  const linkPaths = useMemo(() => {
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

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}
