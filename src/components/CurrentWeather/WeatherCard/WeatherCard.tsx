import { ThemeContext, ThemeContextTypes } from '../../../context/themeContext'
import { themeStyles } from '../../../context/themeStyles'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Skeleton, Typography } from '@mui/material'
import { selectCountingSystem } from '../../../redux/user/selectors'
import { selectIsLoadingWeather } from '../../../redux/weather/selectors'
import { ForecastModel } from '../../../Types/WeatherModels'

interface WeatherCardProps {
  weather: ForecastModel | null
  error: Error | null
  homepage: boolean
}

export const WeatherCard = ({ weather, error, homepage }: WeatherCardProps) => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes

  const countingSystem = useSelector(selectCountingSystem) === 'Metric'
  const isLoadingWeather = useSelector(selectIsLoadingWeather)

  return (
    <Box>
      {isLoadingWeather.request ? (
        <Skeleton variant='rectangular' height={320} sx={{ borderRadius: '5px' }} animation='wave' />
      ) : (
        <Card sx={{ ...themeStyles(themeIsDark)?.regularCard, boxShadow: '0 0 10px 0 #000' }}>
          <CardHeader
            title={`${weather?.location.name}, ${weather?.location.region}, ${weather?.location.country}`}
            subheader={<Typography sx={{ ...themeStyles(themeIsDark)?.textColor }}>{weather?.location.localtime}</Typography>}
          />
          <Typography fontSize={'14px'} sx={{ padding: '0 16px 10px 16px' }}>
            Last time updated {weather?.current.last_updated}
          </Typography>

          <Divider />

          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              backgroundBlendMode: 'multiply',
              background: "center/cover url('/images/weather-background/cloudy.jpg') no-repeat",
              backgroundColor: themeIsDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <Box sx={{ '& > *': { color: '#fff' } }}>
              <Typography variant='h2'>{countingSystem ? `${weather?.current.temp_c}°c` : `${weather?.current.temp_f}°f`}</Typography>
              <Typography variant='subtitle1'>{weather?.current.condition.text}</Typography>
              <Typography variant='subtitle2'>
                Feels like {countingSystem ? `${weather?.current.feelslike_c}°c` : `${weather?.current.feelslike_f}°f`}
              </Typography>
            </Box>
            <Box
              component='img'
              sx={{
                height: 160,
                width: 160,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt='Current weather icon'
              src={weather?.current.condition.icon}
            />
          </CardContent>
        </Card>
      )}
      {homepage && (
        <Link to={`/realtime-weather/${weather?.location.name}`}>
          <CardActions
            sx={{
              backgroundColor: '#fff',
              '&:hover': { backgroundColor: themeIsDark ? '#ccc' : '#ccc' },
              transition: 'all 0.3s ease-in',
              ...themeStyles(themeIsDark)?.simpleBlockWithText,
            }}
          >
            <Button type='button' sx={{ ...themeStyles(themeIsDark)?.textColor }}>
              More...
            </Button>
          </CardActions>
        </Link>
      )}
    </Box>
  )
}
