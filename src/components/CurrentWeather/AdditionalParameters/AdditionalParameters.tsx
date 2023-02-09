import { ThemeContext, ThemeContextTypes } from '../../../context/themeContext'
import { themeStyles } from '../../../context/themeStyles'
import { useContext, useMemo } from 'react'
import { TableContainer, Table, TableCell, TableHead, TableBody, Paper, TableRow, Box, Skeleton } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectCountingSystem } from '../../../redux/user/selectors'
import { ForecastModel } from '../../../Types/WeatherModels'
import { selectIsLoadingWeather } from '../../../redux/weather/selectors'

interface AdditionalParametersProps {
  weather: ForecastModel | null
  error: Error | null
}

export const AdditionalParameters = ({ weather, error }: AdditionalParametersProps) => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes

  const isLoadingWeather = useSelector(selectIsLoadingWeather)
  const metricSystem = useSelector(selectCountingSystem) === 'Metric'
  const tableRowParameters = useMemo(() => {
    return {
      Cloud: `${weather?.current.cloud}%`,
      Pressure: metricSystem ? `${weather?.current.pressure_mb} mbar` : `${weather?.current.precip_in} inch`,
      Precipitation: metricSystem ? `${weather?.current.cloud} mm` : `${weather?.current.precip_in} inch`,
      Humidity: `${weather?.current.humidity}%`,
      UVIndex: weather?.current.uv,
    }
  }, [metricSystem, weather])

  const tableThemeStyles = useMemo(() => {
    return {
      color: { ...themeStyles(themeIsDark)?.textColor },
      backgroundColor: { ...themeStyles(themeIsDark)?.regularCard },
    }
  }, [themeIsDark])

  return (
    <Box>
      {isLoadingWeather.request ? (
        <Skeleton variant='rectangular' height={320} sx={{ borderRadius: '5px' }} animation='wave' />
      ) : (
        <TableContainer component={Paper} sx={{ ...tableThemeStyles.backgroundColor, boxShadow: '0 0 10px 0 #000' }}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.4rem', ...tableThemeStyles.color }}>
                  Additional Parameters
                </TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.4rem', ...tableThemeStyles.color }}>
                  {metricSystem ? 'Metric' : 'Imperial'} system
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(tableRowParameters).map((property) => {
                return (
                  <TableRow key={property}>
                    <TableCell sx={{ textAlign: 'center', ...tableThemeStyles.color }}>{property}</TableCell>
                    <TableCell sx={{ textAlign: 'center', ...tableThemeStyles.color }}>
                      {tableRowParameters[property as keyof typeof tableRowParameters]}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
