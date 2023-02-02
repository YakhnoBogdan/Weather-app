import { Grid } from '@mui/material'
import { HourForecastModel } from '../../../Types/WeatherModels'
import { HourForecastCard } from './HourForecastCard'

interface HourForecastProps {
  forecast: HourForecastModel[]
  day: number
}
export const HourForecast = ({ forecast, day }: HourForecastProps) => {
  return (
    <Grid container spacing={'10px'}>
      {forecast.map((hourForecast) => {
        return (
          <Grid item lg={3} key={hourForecast.time}>
            <HourForecastCard hourForecast={hourForecast} />
          </Grid>
        )
      })}
    </Grid>
  )
}
