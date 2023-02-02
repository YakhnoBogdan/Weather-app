import { Grid } from '@mui/material'
import { DayForecastModel, LocationModel, WeatherModel } from '../../../Types/WeatherModels'
import { DayForecastMain } from './DayForecastMain'
import { DayForecastWind } from './DayForecastWind'
import { DayForecastPrecipitation } from './DayForecastPrecipitation'

export interface DayForecastProps {
  forecast: DayForecastModel
  location: LocationModel
  currentWeather?: WeatherModel
}
export const DayForecast = ({ forecast, location, currentWeather }: DayForecastProps) => {
  return (
    <Grid container columns={16} spacing={'20px'}>
      <Grid item lg={4} xs={16}>
        <DayForecastMain forecast={forecast} location={location} currentWeather={currentWeather} />
      </Grid>
      <Grid item lg={6} xs={16}>
        <DayForecastWind forecast={forecast} currentWeather={currentWeather} />
      </Grid>
      <Grid item lg={6} xs={16}>
        <DayForecastPrecipitation forecast={forecast} />
      </Grid>
    </Grid>
  )
}
