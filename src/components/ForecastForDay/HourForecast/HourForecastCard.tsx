import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { HourForecastModel } from '../../../Types/WeatherModels'
import { useMemo, useContext } from 'react'
import { StackMuiPropertyValue } from '../../reusableComponents/StackMuiPropertyValue'
import { selectCountingSystem } from '../../../redux/user/selectors'
import { useSelector } from 'react-redux'
import { ThemeContext, ThemeContextTypes } from '../../../context/themeContext'
import { themeStyles } from '../../../context/themeStyles'

export const HourForecastCard = ({ hourForecast }: { hourForecast: HourForecastModel }) => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes

  const metricSystem = useSelector(selectCountingSystem) === 'Metric'

  const hour: string = useMemo(() => {
    return `${new Date(hourForecast.time).getHours()}:00`
  }, [hourForecast.time])

  return (
    <Card sx={{ position: 'relative', ...themeStyles(themeIsDark)?.infoCard }}>
      <Stack direction={'row'} alignItems={'flex-start'} justifyContent={'space-between'}>
        <CardHeader title={hour} />
        <Stack sx={{ padding: '10px' }}>
          <Avatar src={hourForecast.condition.icon} sx={{ alignSelf: 'flex-end' }} />
          <Typography align='right' variant='subtitle1' noWrap>
            {hourForecast.condition.text}
          </Typography>
        </Stack>
      </Stack>
      <CardContent>
        <StackMuiPropertyValue
          textValues={{ property: 'Temperature', value: metricSystem ? `${hourForecast.temp_c}°c` : `${hourForecast.temp_f}°f` }}
        />
        <Divider />
        <StackMuiPropertyValue
          textValues={{ property: 'Feelslike', value: metricSystem ? `${hourForecast.feelslike_c}°c` : `${hourForecast.feelslike_f}°f` }}
        />
        <Divider />
        <StackMuiPropertyValue
          textValues={{ property: 'Wind speed', value: metricSystem ? `${hourForecast.wind_kph} kph` : `${hourForecast.wind_mph} mph` }}
        />
        <Divider />
        <StackMuiPropertyValue
          textValues={{ property: 'Windchill', value: metricSystem ? `${hourForecast.windchill_c}°c` : `${hourForecast.windchill_f}°f` }}
        />
        <Divider />
        <StackMuiPropertyValue
          textValues={{ property: 'Precipitation', value: metricSystem ? `${hourForecast.precip_mm}mm` : `${hourForecast.precip_in} inch` }}
        />
        <Divider />
        <StackMuiPropertyValue textValues={{ property: 'Humidity', value: hourForecast.humidity }} />
        <Divider />
      </CardContent>
      <CardActions sx={{ height: '20px' }}>
        <Accordion sx={{ position: 'absolute', bottom: '0', left: '0', right: '0', ...themeStyles(themeIsDark)?.infoCardAccordion }}>
          <AccordionSummary expandIcon={<ExpandMore />} aria-controls='panel1a-content' id='panel1a-header'>
            <Typography align='center'>More...</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <StackMuiPropertyValue textValues={{ property: 'Chance of rain', value: `${hourForecast.chance_of_rain}%` }} />
            <Divider />

            <StackMuiPropertyValue textValues={{ property: 'Chance of snow', value: `${hourForecast.chance_of_snow}°f` }} />
            <Divider />

            <StackMuiPropertyValue
              textValues={{ property: 'Heat index', value: metricSystem ? `${hourForecast.heatindex_c}°c` : `${hourForecast.heatindex_f}°f` }}
            />
            <Divider />

            <StackMuiPropertyValue
              textValues={{ property: 'Dew point', value: metricSystem ? `${hourForecast.dewpoint_c}°c` : `${hourForecast.dewpoint_f}°f` }}
            />
            <Divider />

            <StackMuiPropertyValue
              textValues={{ property: 'Pressure', value: metricSystem ? `${hourForecast.pressure_mb}mb` : `${hourForecast.pressure_in} inch` }}
            />
            <Divider />
          </AccordionDetails>
        </Accordion>
      </CardActions>
    </Card>
  )
}
