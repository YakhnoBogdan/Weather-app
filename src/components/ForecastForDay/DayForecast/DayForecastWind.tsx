import { Card, CardContent, CardHeader, Divider, Stack, Typography } from '@mui/material'
import { DayForecastProps } from './DayForecast'
import { selectCountingSystem } from '../../../redux/user/selectors'
import { useSelector } from 'react-redux'
import { StackMuiPropertyValue } from '../../reusableComponents/StackMuiPropertyValue'
import { useContext } from 'react'
import { themeStyles } from '../../../context/themeStyles'
import { ThemeContext, ThemeContextTypes } from '../../../context/themeContext'

export const DayForecastWind = ({ forecast, currentWeather }: Omit<DayForecastProps, 'location'>) => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes
  const metricSystem = useSelector(selectCountingSystem) === 'Metric'

  return (
    <Card sx={{ height: '100%', ...themeStyles(themeIsDark)?.regularCard }}>
      <CardHeader
        title='Additional'
        sx={{ ...themeStyles(themeIsDark)?.textColor }}
        subheader={<Typography sx={{ ...themeStyles(themeIsDark)?.textColor }}>wind, humidity, precipitation, visibility etc</Typography>}
      />
      <Divider />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <StackMuiPropertyValue
          textValues={{ property: 'Max wind speed', value: metricSystem ? `${forecast.day.maxwind_kph} kph` : `${forecast.day.maxwind_mph} mph` }}
        />
        <StackMuiPropertyValue
          textValues={{
            property: 'Total precipitation',
            value: metricSystem ? `${forecast.day.totalprecip_mm} mm` : `${forecast.day.totalprecip_in} inch`,
          }}
        />
        <StackMuiPropertyValue
          textValues={{ property: 'Visibilty', value: metricSystem ? `${forecast.day.avgvis_km} km` : `${forecast.day.avgvis_miles} miles` }}
        />
        <StackMuiPropertyValue textValues={{ property: 'UV index', value: forecast.day.uv }} />
      </CardContent>
    </Card>
  )
}
