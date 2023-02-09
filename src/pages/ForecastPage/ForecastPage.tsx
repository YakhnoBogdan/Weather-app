import { MyBackdrop } from '../../components/reusableComponents/MyBackdrop'
import { CitySearch } from '../../components/CitySearch/CitySearch'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Box, Button, Stack } from '@mui/material'

import { selectGetWeatherError, selectIsLoadingWeather, selectWeather } from '../../redux/weather/selectors'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { NoDataToDisplay } from '../../components/NoDataToDisplay/NoDataToDisplay'

export const ForecastPage = () => {
  const isLoadingWeather = useSelector(selectIsLoadingWeather)
  const weather = useSelector(selectWeather)
  const getWeatherError = useSelector(selectGetWeatherError)
  return (
    <Box sx={{ margin: '0 auto', width: '90vw', maxWidth: '95vw' }}>
      <MyBackdrop isLoading={isLoadingWeather.request} />
      <SearchBar />
      <Box>
        <Outlet />
      </Box>
      <NoDataToDisplay weather={weather} isLoadingWeather={isLoadingWeather} getWeatherError={getWeatherError} />
    </Box>
  )
}
