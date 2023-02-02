import { MyBackdrop } from '../../components/reusableComponents/MyBackdrop'
import { CitySearch } from '../../components/CitySearch/CitySearch'
import { useSelector } from 'react-redux'
import { Link, Outlet, useParams } from 'react-router-dom'
import { Box, Button, Stack } from '@mui/material'
import dayjs from 'dayjs'
import { selectIsLoadingWeather } from '../../redux/weather/selectors'

export const ForecastPage = () => {
  const { qCity } = useParams()
  const isLoadingWeather = useSelector(selectIsLoadingWeather)

  return (
    <Box sx={{ margin: '0 auto', width: '90vw', maxWidth: '95vw' }}>
      <MyBackdrop isLoading={isLoadingWeather.request} />
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ padding: '20px 0' }}>
        <CitySearch page={'forecast'} />
        <Stack direction={'row'} gap={'10px'}>
          <Link to={`/realtime-weather/${qCity != null ? qCity : ''}`}>
            <Button type='button' variant='contained' size='large'>
              Weather today
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
    </Box>
  )
}
