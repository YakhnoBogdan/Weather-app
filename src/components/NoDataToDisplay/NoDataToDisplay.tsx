import { Box, Typography } from '@mui/material'
import { LoadingRequestModel } from '../../Types/RequestStateModel'
import { ForecastModel } from '../../Types/WeatherModels'

interface NoDataToDisplayProps {
  weather: ForecastModel | null
  getWeatherError: Error | null
  isLoadingWeather: LoadingRequestModel
}
export const NoDataToDisplay = ({ weather, getWeatherError, isLoadingWeather }: NoDataToDisplayProps) => {
  return (
    <Box>
      {!weather && !isLoadingWeather.request && (
        <Box sx={{ position: 'relative', height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box
            component={'img'}
            src='/images/icons/arrow-icon.svg'
            sx={{ height: '150px', width: '150px', position: 'absolute', top: '-20px', left: '5%', transform: 'rotate(-80deg)' }}
          />
          <Typography variant='h4' align='center'>
            Select location from search line
          </Typography>
        </Box>
      )}
      {getWeatherError && (
        <Box sx={{ height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant='h4' align='center'>
            Get request fail
          </Typography>
        </Box>
      )}
    </Box>
  )
}
