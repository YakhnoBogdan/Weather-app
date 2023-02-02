import { themeStyles } from '../../../context/themeStyles'
import { ThemeContext, ThemeContextTypes } from '../../../context/themeContext'
import { StackMuiPropertyValue } from '../../reusableComponents/StackMuiPropertyValue'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Box, Card, CardContent, CardHeader, Skeleton } from '@mui/material'
import { selectCountingSystem } from '../../../redux/user/selectors'
import { selectIsLoadingWeather } from '../../../redux/weather/selectors'
import { ForecastModel } from '../../../Types/WeatherModels'
import './WindInfo.css'

interface WindInfoProps {
  weather: ForecastModel
}
export const WindInfo = ({ weather }: WindInfoProps) => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes

  const countingSystem = useSelector(selectCountingSystem) === 'Metric'
  const isLoadingWeather = useSelector(selectIsLoadingWeather)

  return (
    <Box className='windInfoWrapper'>
      {isLoadingWeather.request ? (
        <Skeleton height={176} variant='rectangular' sx={{ borderRadius: '5px' }} animation='wave' width={420} />
      ) : (
        <Card
          className='windInfoCard'
          sx={{ backgroundColor: themeIsDark ? 'rgba(0, 0, 0, 0.5)' : '', ...themeStyles(themeIsDark)?.textColor, color: '#000', width: '100%' }}
        >
          <CardHeader title='Wind info' sx={{ color: '#fff' }} />
          <CardContent className='windInfo'>
            <StackMuiPropertyValue
              textValues={{ property: 'Wind speed', value: countingSystem ? `${weather.current.wind_kph}kph` : `${weather.current.wind_mph} mph` }}
            />
            <StackMuiPropertyValue textValues={{ property: 'Wind direction', value: weather.current.wind_dir }} />
            <StackMuiPropertyValue textValues={{ property: 'Wind degree', value: weather.current.wind_degree }} />
          </CardContent>
        </Card>
      )}
    </Box>
  )
}
