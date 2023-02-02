import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import { DayForecastProps } from './DayForecast'
import { StackMuiPropertyValue } from '../../reusableComponents/StackMuiPropertyValue'
import { useContext } from 'react'
import { ThemeContext, ThemeContextTypes } from '../../../context/themeContext'
import { themeStyles } from '../../../context/themeStyles'

export const DayForecastPrecipitation = ({ forecast }: Omit<DayForecastProps, 'currentWeather' | 'location'>) => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes
  return (
    <Card sx={{ height: '100%', ...themeStyles(themeIsDark)?.regularCard }}>
      <CardHeader
        title='Precipitation'
        subheader={<Typography sx={{ ...themeStyles(themeIsDark)?.textColor }}>Chances of precipitation in %</Typography>}
      />
      <Divider />
      <CardContent>
        <StackMuiPropertyValue textValues={{ property: 'Chance of rain', value: forecast.day.daily_chance_of_rain }} />
        <StackMuiPropertyValue textValues={{ property: 'Will if rain', value: forecast.day.daily_will_it_rain === 1 ? 'Yes' : 'No' }} />
        <StackMuiPropertyValue textValues={{ property: 'Chance of snow', value: forecast.day.daily_chance_of_snow }} />
        <StackMuiPropertyValue textValues={{ property: 'Will it snow', value: forecast.day.daily_chance_of_snow === 1 ? 'Yes' : 'No' }} />
      </CardContent>
    </Card>
  )
}
