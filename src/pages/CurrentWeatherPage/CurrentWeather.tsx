import { AdditionalParameters } from '../../components/CurrentWeather/AdditionalParameters/AdditionalParameters'
import { WeatherCard } from '../../components/CurrentWeather/WeatherCard/WeatherCard'
import { WindInfo } from '../../components/CurrentWeather/WindInfo/WindInfo'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid } from '@mui/material'
import { selectGetWeatherError, selectWeather } from '../../redux/weather/selectors'
import { fetchWeatherForecast } from '../../redux/weather/thunks'

export const CurrentWeather = () => {
  const dispatch = useDispatch()
  const weather = useSelector(selectWeather)
  const weatherCity = useSelector(selectWeather)?.location.name
  const getWeatherError = useSelector(selectGetWeatherError)

  const { qCity } = useParams()

  useEffect(() => {
    if (qCity !== weatherCity && qCity !== undefined) {
      void dispatch(fetchWeatherForecast({ q: qCity, days: '3' }))
    }
  }, [dispatch, qCity, weatherCity])

  return (
    <Box sx={{ width: '90vw', maxWidth: '95vw', margin: '0 auto', paddingBottom: '50px' }}>
      {weather !== null && weather !== undefined && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <WeatherCard weather={weather} error={getWeatherError} homepage={false} />
          </Grid>
          <Grid item xs={12} md={4}>
            <WindInfo weather={weather} />
          </Grid>
          <Grid item xs={12}>
            <AdditionalParameters weather={weather} error={getWeatherError} />
          </Grid>
        </Grid>
      )}
    </Box>
  )
}
