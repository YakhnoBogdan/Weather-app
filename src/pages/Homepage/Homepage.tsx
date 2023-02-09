import { CitySearch } from '../../components/CitySearch/CitySearch'
import { WeatherCard } from '../../components/CurrentWeather/WeatherCard/WeatherCard'
import { CardLink } from '../../components/HomepageLinks/CardLink'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid } from '@mui/material'
import { selectGetWeatherError, selectWeather } from '../../redux/weather/selectors'
import { fetchWeatherForecast } from '../../redux/weather/thunks'
import dayjs from 'dayjs'

export const Homepage = () => {
  const dispatch = useDispatch()
  const weather = useSelector(selectWeather)
  const weatherCity = useSelector(selectWeather)?.location.name
  const getWeatherError = useSelector(selectGetWeatherError)

  const today = dayjs().format('YYYY-MM-DD')

  useEffect(() => {
    if (weather === null) {
      void dispatch(fetchWeatherForecast({ q: 'London', days: '3' }))
    }
  }, [dispatch, weather])

  return (
    <Box sx={{ position: 'relative', height: '100%', display: 'flex', padding: '10px' }}>
      <Box sx={{ flex: '1', padding: '20px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
          <CitySearch page={'homepage'} />
        </Box>
        <Grid container spacing={'10px'}>
          <Grid item lg={8} md={8} xs={12}>
            <WeatherCard weather={weather} error={getWeatherError} homepage />
          </Grid>
          <Grid item lg={4} md={4} xs={12} container spacing={1}>
            <Grid item lg={12} md={12} sm={6} xs={12}>
              <CardLink
                link={`/forecast/${weather?.location.name}/0`}
                title='Forecast'
                description='Weather forecast for 3 days'
                classN='forecastLink'
              />
            </Grid>
            <Grid item lg={12} md={12} sm={6} xs={12}>
              <CardLink
                link={`/weather-history/${weatherCity !== undefined ? `${weatherCity}/${today}` : ''}`}
                title='Weather history'
                description='Weather history for last 7 days'
                classN='weatherHistoryLink'
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CardLink link='/sport-events' title='Sport events' description='Keep up to date with all sporting events' classN='sportEventsLink' />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
