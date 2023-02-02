import { SportEvent } from './SportEvent'
import { useMemo, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Grid, Box, Typography } from '@mui/material'
import { AllSportEventsModel, SportEventModel, kindOfSportModel } from '../../Types/SportEventsModels'
import { ThemeContext, ThemeContextTypes } from '../../context/themeContext'

interface KindOfSportEventProps {
  sportEvents: AllSportEventsModel | null
  kindOfSport: kindOfSportModel
}
export const KindOfSportEvent = ({ sportEvents, kindOfSport }: KindOfSportEventProps) => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes

  const location = useLocation()

  const isSettingsPage = useMemo(() => {
    return location.pathname.match('settings') !== null
  }, [location.pathname])

  return (
    <Box sx={{ maxWidth: '95%', margin: '0 auto', minWidth: '90%', padding: '30px 0' }}>
      {isSettingsPage ? (
        <Box>
          <Typography variant='h3' color={themeIsDark ? '#fff' : '#000'}>
            {kindOfSport}
          </Typography>
        </Box>
      ) : null}
      <Grid container spacing={'20px'}>
        {sportEvents?.[kindOfSport].map((sportEvent: SportEventModel, index) => {
          return (
            <Grid item lg={isSettingsPage ? 6 : 4} md={6} sm={12} key={index} sx={{ alignSelf: 'stretch' }}>
              <SportEvent certainSportEvent={sportEvent} kindOfSport={kindOfSport} />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
