import { ThemeContext, ThemeContextTypes } from '../../context/themeContext'
import { DayForecast } from '../../components/ForecastForDay/DayForecast/DayForecast'
import { HourlyChart } from '../../components/ForecastForDay/HourlyChart/HourlyChart'
import { HourForecast } from '../../components/ForecastForDay/HourForecast/HourForecast'
import { MyBackdrop } from '../../components/reusableComponents/MyBackdrop'
import { useCallback, useEffect, useMemo, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs, { Dayjs } from 'dayjs'
import { Box, Grid, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { fetchWeatherHistory } from '../../redux/weather/thunks'
import { selectDatePickingError, selectIsLoadingWeather, selectWeatherHistory } from '../../redux/weather/selectors'

export const dateFormatString = 'YYYY-MM-DD'
const isInvalidDateString = 'InvalidDate'

export const HistoryPageParticularDay = () => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { qCity, dateParam, endDateParam } = useParams()

  const weatherHistory = useSelector(selectWeatherHistory)
  const isLoadingWeather = useSelector(selectIsLoadingWeather)
  const datePickingError = useSelector(selectDatePickingError)

  const [selectedDay, setSelectedDay] = useState(0)

  const rangeOfDates = useMemo(() => {
    const res: Dayjs[] = []
    const today = dayjs()
    let countDays = 0
    let validDate = dayjs(dateParam, dateFormatString, true).format(dateFormatString)
    const validEndDate = dayjs(endDateParam, dateFormatString, true).format(dateFormatString)

    if (validDate !== isInvalidDateString) {
      countDays =
        validEndDate === isInvalidDateString ? today.diff(dayjs(validDate), 'day') + 1 : dayjs(validEndDate).diff(dayjs(validDate), 'day') + 1
      for (let i = 0; i < countDays; i++) {
        res.push(dayjs(validDate))
        validDate = dayjs(validDate).add(1, 'day').format(dateFormatString)
      }
    }
    setSelectedDay(0)
    return qCity !== undefined && qCity !== 'undefined' && !datePickingError ? res.map((date) => date.format(dateFormatString)) : []
  }, [dateParam, datePickingError, endDateParam, qCity])

  // Check valid search params to dispatch

  useEffect(() => {
    if (qCity !== undefined && dateParam !== undefined && qCity !== 'undefined') {
      const validDate = dayjs(dateParam).format(dateFormatString)
      const validEndDate = dayjs(endDateParam).format(dateFormatString)
      if (validDate !== isInvalidDateString && !datePickingError) {
        void dispatch(fetchWeatherHistory({ q: qCity, dt: validDate, end_dt: validEndDate !== isInvalidDateString ? validEndDate : undefined }))
      } else if (validDate === isInvalidDateString || validEndDate === isInvalidDateString) {
        navigate('/weather-history/*')
      }
    }
  }, [dateParam, datePickingError, dispatch, endDateParam, navigate, qCity])

  const handleSelectDay = useCallback((event: React.MouseEvent<HTMLElement>, newSelectedDay: string | null) => {
    if (newSelectedDay !== null) {
      setSelectedDay(+newSelectedDay)
    }
  }, [])

  return (
    <Box>
      <MyBackdrop isLoading={isLoadingWeather.request} />
      <Stack direction={'row'} justifyContent={'center'} sx={{ padding: '10px 0' }}>
        <ToggleButtonGroup onChange={handleSelectDay} value={selectedDay} exclusive aria-label='history date'>
          {rangeOfDates.map((date, index) => {
            return (
              <ToggleButton
                key={date}
                type='button'
                value={index}
                color={themeIsDark ? 'warning' : 'primary'}
                sx={{ backgroundColor: '#fff', '&:hover': { backgroundColor: '#ccc', color: '#fff' } }}
              >
                {date}
              </ToggleButton>
            )
          })}
        </ToggleButtonGroup>
      </Stack>
      {isLoadingWeather.success && weatherHistory !== null && (
        <Grid container sx={{ padding: '20px', margin: '0 auto' }}>
          <Grid item xs={12}>
            <DayForecast forecast={weatherHistory.forecast.forecastday[selectedDay]} location={weatherHistory.location} />
          </Grid>
          <Grid item xs={12}>
            <HourlyChart forecast={weatherHistory.forecast.forecastday[selectedDay]} />
          </Grid>
          <Grid item xs={12}>
            <HourForecast forecast={weatherHistory.forecast.forecastday[selectedDay].hour} day={selectedDay} />
          </Grid>
        </Grid>
      )}
      {isLoadingWeather.failure && (
        <Typography variant='h3' align='center'>
          Failed request to find weather history
        </Typography>
      )}
    </Box>
  )
}
