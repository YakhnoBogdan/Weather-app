import { Avatar, Box, Card, CardContent, CardHeader, Divider, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectCountingSystem } from '../../../redux/user/selectors'
import { useContext, useMemo } from 'react'
import { DayForecastProps } from './DayForecast'
import { themeStyles } from '../../../context/themeStyles'
import { ThemeContext, ThemeContextTypes } from '../../../context/themeContext'

export const DayForecastMain = ({ forecast, currentWeather, location }: DayForecastProps) => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes

  const metricSystem = useSelector(selectCountingSystem) === 'Metric'

  const { weekday, monthsDay } = useMemo(() => {
    const date = new Date(location.localtime)
    const options: { weekday: 'long' | 'short' | 'narrow' | undefined } = { weekday: 'short' }
    return { weekday: new Intl.DateTimeFormat('en-US', options).format(date), monthsDay: date.getDate() }
  }, [location.localtime])

  return (
    <Card sx={{ height: '100%', ...themeStyles(themeIsDark)?.regularCard }}>
      <Stack justifyContent={'space-between'} direction={'row'} sx={{ padding: '10px' }}>
        <Box>
          <CardHeader
            title={location.name}
            sx={{ ...themeStyles(themeIsDark)?.textColor }}
            subheader={<Typography sx={{ ...themeStyles(themeIsDark)?.textColor }}>{location.country}</Typography>}
          />
          <Typography fontSize={'14px'} sx={{ paddingLeft: '16px' }}>
            Date {forecast.date}
          </Typography>
        </Box>
        <Avatar src={forecast.day.condition.icon} />
      </Stack>
      <Divider />
      <CardContent className='forecastCardBoard'>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Box>
            <Typography>
              {weekday} {monthsDay}
            </Typography>
            {currentWeather !== undefined && currentWeather !== null && (
              <Typography sx={{ fontSize: '24px', fontWeight: 'bold' }}>
                {metricSystem ? `${currentWeather.temp_c}°c` : `${currentWeather.temp_f}°f`}
              </Typography>
            )}
          </Box>
          <Box>
            <Typography align='right' variant='subtitle2'>
              Max temp: {metricSystem ? `${forecast.day.maxtemp_c}°c` : `${forecast.day.maxtemp_f}°f`}
            </Typography>
            <Typography align='right' variant='subtitle2'>
              Min temp: {metricSystem ? `${forecast.day.mintemp_c}°c` : `${forecast.day.mintemp_f}°f`}
            </Typography>
            <Typography align='right' variant='subtitle2'>
              Avarage temp: {metricSystem ? `${forecast.day.avgtemp_c}°c` : `${forecast.day.avgtemp_f}°f`}
            </Typography>
            <Typography></Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
