import { AdditionalParameters } from '../../components/CurrentWeather/AdditionalParameters/AdditionalParameters'
import { CitySearch } from '../../components/CitySearch/CitySearch'
import { WeatherCard } from '../../components/CurrentWeather/WeatherCard/WeatherCard'
import { WindInfo } from '../../components/CurrentWeather/WindInfo/WindInfo'
import { useSelector } from 'react-redux'
import { Box, Button, Grid, Stack } from '@mui/material'

import { selectGetWeatherError, selectWeather } from '../../redux/weather/selectors'
export const CurrentWeather = () => {
  const weather = useSelector(selectWeather)
  const getWeatherError = useSelector(selectGetWeatherError)

  return (
    <Box sx={{ width: '90vw', maxWidth: '95vw', margin: '0 auto', paddingBottom: '50px' }}>
      {weather !== undefined && weather !== null && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <WeatherCard weather={weather} error={getWeatherError} homepage={false} />
          </Grid>
          <Grid item xs={6} sm={4}>
            <WindInfo weather={weather} />
          </Grid>
          <Grid item sm={12}>
            <AdditionalParameters weather={weather} error={getWeatherError} />
          </Grid>
        </Grid>
      )}
    </Box>
  )
}
