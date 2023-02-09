import { MyBackdrop } from '../../components/reusableComponents/MyBackdrop'
import { CitySearch } from '../../components/CitySearch/CitySearch'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Stack, Typography } from '@mui/material'
import { selectGetWeatherError, selectIsLoadingWeather, selectWeather } from '../../redux/weather/selectors'
import { NoDataToDisplay } from '../../components/NoDataToDisplay/NoDataToDisplay'

export const CurrentWeatherPage = () => {
  const isLoadingWeather = useSelector(selectIsLoadingWeather)
  const weather = useSelector(selectWeather)
  const getWeatherError = useSelector(selectGetWeatherError)

  return (
    <Box sx={{ width: '90vw', maxWidth: '95vw', margin: '0 auto', paddingBottom: '50px' }}>
      <MyBackdrop isLoading={isLoadingWeather.request} />
      <SearchBar />
      <Box>
        <Outlet />
      </Box>
      <NoDataToDisplay weather={weather} isLoadingWeather={isLoadingWeather} getWeatherError={getWeatherError} />
    </Box>
  )
}
