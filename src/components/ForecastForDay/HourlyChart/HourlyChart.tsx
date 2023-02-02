import { Box, Stack, Tab, Tabs, Tooltip } from '@mui/material'
import { DayForecastProps } from '../DayForecast/DayForecast'
import { useCallback, useMemo, useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { selectCountingSystem } from '../../../redux/user/selectors'
import { drawChart, hours } from './drawChart'
import { ThemeContext, ThemeContextTypes } from '../../../context/themeContext'

export type ChartPurpose = 'Temperature' | 'Wind speed' | 'Pressure'

export const HourlyChart = ({ forecast }: Omit<DayForecastProps, 'currentWeather' | 'location'>) => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes

  const isMetricSystem = useSelector(selectCountingSystem) === 'Metric'

  const [tabValue, setTabValue] = useState<ChartPurpose>('Temperature')

  const dataRange = useMemo(() => {
    switch (tabValue) {
      case 'Temperature':
        return isMetricSystem
          ? { chartData: drawChart([...forecast.hour.map((hour) => hour.temp_c)], tabValue, isMetricSystem), units: '°c', targetProperty: 'temp_c' }
          : { chartData: drawChart([...forecast.hour.map((hour) => hour.temp_f)], tabValue, isMetricSystem), units: '°f', targetProperty: 'temp_f' }
        break
      case 'Wind speed':
        return isMetricSystem
          ? {
              chartData: drawChart([...forecast.hour.map((hour) => hour.wind_kph)], tabValue, isMetricSystem),
              units: 'kph',
              targetProperty: 'wind_kph',
            }
          : {
              chartData: drawChart([...forecast.hour.map((hour) => hour.wind_mph)], tabValue, isMetricSystem),
              units: 'mph',
              targetProperty: 'wind_mph',
            }
        break
      case 'Pressure':
        return isMetricSystem
          ? {
              chartData: drawChart([...forecast.hour.map((hour) => hour.pressure_mb)], tabValue, isMetricSystem),
              units: 'mb',
              targetProperty: 'pressure_mb',
            }
          : {
              chartData: drawChart([...forecast.hour.map((hour) => hour.pressure_in)], tabValue, isMetricSystem),
              units: 'inch',
              targetProperty: 'pressure_in',
            }
      default:
        return isMetricSystem
          ? { chartData: drawChart([...forecast.hour.map((hour) => hour.temp_c)], tabValue, isMetricSystem), units: '°c', targetProperty: 'temp_c' }
          : { chartData: drawChart([...forecast.hour.map((hour) => hour.temp_f)], tabValue, isMetricSystem), units: '°f', targetProperty: 'temp_f' }
    }
  }, [forecast.hour, isMetricSystem, tabValue])

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: ChartPurpose) => {
    setTabValue(newValue)
  }, [])

  return (
    <Box sx={{ padding: '50px 0' }}>
      <Stack direction={'row'} justifyContent={'flex-end'}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          textColor='primary'
          indicatorColor='primary'
          sx={{ paddingTop: '10px', transform: 'translateX(-50px)', borderBottom: '0.5px solid #ccc' }}
        >
          {['Temperature', 'Wind speed', 'Pressure'].map((tab, index) => {
            return (
              <Tab
                key={tab}
                value={tab}
                label={tab}
                sx={{
                  backgroundColor: themeIsDark ? '#fff' : '#eee',
                  borderTopLeftRadius: index === 0 ? '5px' : '',
                  borderTopRightRadius: index === 2 ? '5px' : '',
                }}
              />
            )
          })}
        </Tabs>
      </Stack>
      <Box
        sx={{
          padding: '30px',
          backgroundColor: themeIsDark ? '#085959' : '#fff',
          borderRadius: '15px',
          boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Box sx={{ height: '300px', width: '80%', margin: '0 auto', position: 'relative' }}>
          <Box sx={{ position: 'absolute', bottom: '-15px', left: '0', top: '0', width: '3px', backgroundColor: themeIsDark ? '#fff' : '#305dd0' }}>
            <Box component={'span'} sx={{ position: 'absolute', bottom: '20px', left: '-45px', color: themeIsDark ? '#fff' : '#000' }}>
              {dataRange.chartData.rangeOfValues.minRange} {dataRange.units}
            </Box>
            <Box component={'span'} sx={{ position: 'absolute', top: '0', left: '-45px', color: themeIsDark ? '#fff' : '#000' }}>
              {dataRange.chartData.rangeOfValues.maxRange} {dataRange.units}
            </Box>
          </Box>
          <Box
            sx={{ position: 'absolute', bottom: '0', left: '-20px', right: '0', height: '3px', backgroundColor: themeIsDark ? '#fff' : '#305dd0' }}
          >
            {hours.map((hour, index) => {
              return (
                <Box
                  key={hour}
                  component={'span'}
                  sx={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: dataRange.chartData.hoursLeftPosition[index],
                    color: themeIsDark ? '#fff' : '#000',
                  }}
                >
                  {index % 3 === 0 && `${hour} ${index < 12 ? 'am' : 'pm'}`}
                </Box>
              )
            })}
          </Box>
          {[...forecast.hour.map((hour) => hour[dataRange.targetProperty as keyof typeof hour])].map((point, index) => {
            return (
              <Tooltip title={String(point)} key={index} placement='top' arrow>
                <Box
                  component={'span'}
                  sx={{
                    display: 'inline-block',
                    position: 'absolute',
                    left: dataRange.chartData.hoursLeftPosition[index],
                    bottom: dataRange.chartData.pointBottomPosition[index],
                    height: '15px',
                    width: '15px',
                    backgroundColor: themeIsDark ? '#fff' : 'cornflowerblue',
                    border: '1px solid #fff',
                    borderColor: themeIsDark ? '#ccc' : '#fff',
                    borderRadius: '50%',
                    '&:before': {
                      content: "''",
                      width: '0.5px',
                      position: 'absolute',
                      top: '15px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      height: `${dataRange.chartData.heightVerticalLine[index]}`,
                      backgroundColor: themeIsDark ? '#fff' : 'cornflowerblue',
                    },
                  }}
                />
              </Tooltip>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
