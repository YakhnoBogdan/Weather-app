import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { selectGetWeatherError, selectIsLoadingWeather, selectWeather } from '../../redux/weather/selectors'
import { fetchWeatherForecast } from '../../redux/weather/thunks'
import { Box, Button, Stack, Typography } from '@mui/material'
import { CitySearch } from '../../components/CitySearch/CitySearch'
import { MyBackdrop } from '../../components/reusableComponents/MyBackdrop'
import { CurrentWeather } from './CurrentWeather'

export const CurrentWeatherPage = () => {
  const dispatch = useDispatch()
  const isLoadingWeather = useSelector(selectIsLoadingWeather)
  const weather = useSelector(selectWeather)
  const getWeatherError = useSelector(selectGetWeatherError)

  const { qCity } = useParams()

  useEffect(() => {
    if (qCity !== undefined) {
      void dispatch(fetchWeatherForecast({ q: qCity, days: '3' }))
    }
  }, [dispatch, qCity])

  return (
    <Box sx={{ width: '90vw', maxWidth: '95vw', margin: '0 auto', paddingBottom: '50px' }}>
      <MyBackdrop isLoading={isLoadingWeather.request} />
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ padding: '20px 0' }}>
        <CitySearch page={'weatherPage'} />
        <Stack direction={'row'} alignItems={'center'} gap={'10px'}>
          <Link to={`/forecast/${qCity}/0`}>
            <Button type='button' variant='contained' size='large'>
              Forecast (3-days)
            </Button>
          </Link>
          <Link to={`/weather-history/${qCity != null ? qCity : ''}/${dayjs().format('YYYY-MM-DD')}`}>
            <Button type='button' variant='contained' size='large'>
              Weather history
            </Button>
          </Link>
        </Stack>
      </Stack>
      {weather !== undefined && weather !== null ? (
        <CurrentWeather weather={weather} getWeatherError={getWeatherError} />
      ) : (
        <Box sx={{ position: 'relative', height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box component={'img'} src='/images/icons/arrow-icon.svg' sx={{ positon: 'absolute', top: '20px', left: '5%' }} />
          <Typography variant='h4'>Select location from search line</Typography>
        </Box>
      )}
    </Box>
  )
}
