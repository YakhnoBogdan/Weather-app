import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Button, Grid } from '@mui/material'
import dayjs from 'dayjs'
import { selectWeather } from '../../redux/weather/selectors'
import { CitySearch } from '../CitySearch/CitySearch'

export const SearchBar = () => {
  const locationPathname = useLocation().pathname
  const page = locationPathname.includes('forecast') ? 'forecast' : locationPathname.includes('realtime-weather') ? 'weatherPage' : 'homepage'

  const weatherCity = useSelector(selectWeather)?.location.name

  const linksList = useMemo(() => {
    const today = dayjs().format('YYYY-MM-DD')
    const currentLocation = locationPathname.split('/')[1]
    return [
      { linkText: 'Forecast (3 days)', linkPath: `/forecast/${weatherCity !== undefined ? `${weatherCity}/0` : ''}` },
      { linkText: 'Weather today', linkPath: `/realtime-weather/${weatherCity !== undefined ? weatherCity : ''}` },
      { linkText: 'Weather history', linkPath: `/weather-history/${weatherCity !== undefined ? `${weatherCity}/${today}` : ''}` },
    ].filter((path) => !path.linkPath.includes(currentLocation))
  }, [weatherCity])

  return (
    <Grid container gap={'20px'} justifyContent={'space-between'} alignItems={'center'} sx={{ padding: '20px' }}>
      <Grid item lg={6} md={8} sm={10} xs={12} justifyContent={'center'}>
        <CitySearch page={page} />
      </Grid>
      <Grid item container lg={5} xs={12} gap={'10px'} sx={{ justifyContent: { xs: 'center', lg: 'end' } }}>
        {linksList.map((link) => {
          return (
            <Link to={link.linkPath} key={link.linkText}>
              <Button type='button' variant='contained' size='large'>
                {link.linkText}
              </Button>
            </Link>
          )
        })}
      </Grid>
    </Grid>
  )
}
