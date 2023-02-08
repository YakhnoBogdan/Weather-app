import { CitySearch } from '../../components/CitySearch/CitySearch'
import { MyBackdrop } from '../../components/reusableComponents/MyBackdrop'
import { Link, Outlet, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Button, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { selectGetWeatherError, selectIsLoadingWeather, selectWeather } from '../../redux/weather/selectors'

export const CurrentWeatherPage = () => {
  const isLoadingWeather = useSelector(selectIsLoadingWeather)
  const weather = useSelector(selectWeather)
  const getWeatherError = useSelector(selectGetWeatherError)

  const { qCity } = useParams()

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
      <Box>
        <Outlet />
      </Box>
      {weather === null && getWeatherError === null && !isLoadingWeather.request && (
        <Box sx={{ position: 'relative', height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box
            component={'img'}
            src='/images/icons/arrow-icon.svg'
            sx={{ height: '150px', width: '150px', position: 'absolute', top: '-40px', left: '5%', transform: 'rotate(-80deg)' }}
          />
          <Typography variant='h4'>Select location from search line</Typography>
        </Box>
      )}
      {getWeatherError !== null && (
        <Box sx={{ height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant='h4'>Get request fail</Typography>
        </Box>
      )}
    </Box>
  )
}
