import { DayForecast } from '../../components/ForecastForDay/DayForecast/DayForecast'
import { HourlyChart } from '../../components/ForecastForDay/HourlyChart/HourlyChart'
import { HourForecast } from '../../components/ForecastForDay/HourForecast/HourForecast'
import { useCallback, useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Button, ButtonGroup } from '@mui/material'
import { selectIsLoadingWeather, selectWeather } from '../../redux/weather/selectors'
import { fetchWeatherForecast } from '../../redux/weather/thunks'
import { ThemeContext, ThemeContextTypes } from '../../context/themeContext'

export const WholeForecast = () => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isLoadingWeather = useSelector(selectIsLoadingWeather)
  const forecast = useSelector(selectWeather)

  const { qCity, day } = useParams()

  const [currentDay, setCurrentDay] = useState(day !== undefined ? +day : 0)

  useEffect(() => {
    if (qCity !== undefined && forecast === null) {
      void dispatch(fetchWeatherForecast({ q: qCity, days: '3' }))
    }
  }, [dispatch, forecast, qCity])

  const handleChangeDayToPrervious = useCallback(() => {
    setCurrentDay(currentDay - 1)
    navigate(`/forecast/${qCity}/${currentDay - 1}`)
  }, [currentDay, navigate, qCity])

  const handleChangeDayToNext = useCallback(() => {
    setCurrentDay(currentDay + 1)
    navigate(`/forecast/${qCity}/${currentDay + 1}`)
  }, [currentDay, navigate, qCity])
  return (
    <Box>
      <ButtonGroup>
        <Button
          onClick={handleChangeDayToPrervious}
          disabled={currentDay === 0}
          variant='contained'
          sx={{ '&:disabled': { backgroundColor: themeIsDark ? '#7c7c7c' : '', color: themeIsDark ? '#312828' : '' } }}
        >
          Previous day
        </Button>
        <Button
          onClick={handleChangeDayToNext}
          disabled={currentDay === 2}
          variant='contained'
          sx={{ '&:disabled': { backgroundColor: themeIsDark ? '#7c7c7c' : '', color: themeIsDark ? '#312828' : '' } }}
        >
          Next day
        </Button>
      </ButtonGroup>
      {!isLoadingWeather.request && forecast !== null && (
        <Grid container sx={{ padding: '20px', margin: '0 auto' }}>
          <Grid item xs={12}>
            <DayForecast forecast={forecast.forecast.forecastday[currentDay]} location={forecast.location} currentWeather={forecast.current} />
          </Grid>
          <Grid item xs={12}>
            <HourlyChart forecast={forecast.forecast.forecastday[currentDay]} />
          </Grid>
          <Grid item xs={12}>
            <HourForecast forecast={forecast.forecast.forecastday[currentDay].hour} day={currentDay} />
          </Grid>
        </Grid>
      )}
    </Box>
  )
}
