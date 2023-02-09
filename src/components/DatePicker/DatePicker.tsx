import dayjs, { Dayjs } from 'dayjs'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Stack } from '@mui/material'
import { CitySearch } from '../CitySearch/CitySearch'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchWeatherHistory } from '../../redux/weather/thunks'
import { DateValidationError } from '@mui/x-date-pickers/internals/hooks/validation/useDateValidation'
import { dateFormatString } from '../../pages/HistoryPage/HistoryPageParticularDay'
import { checkDatePickingError } from '../../redux/weather/actions'
import { usePrevious } from '../../hooks/usePrevious'

export default function HistoryDatePicker() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { qCity, dateParam } = useParams()

  const [firstDate, setFirstDate] = useState<Dayjs | null>(dayjs(dateParam))
  const [secondDate, setSecondDate] = useState<Dayjs | null>(dayjs())
  const [helperTextFirst, setHelperTextFirst] = useState<string | null>(null)
  const [helperTextSecond, setHelperTextSecond] = useState<string | null>(null)

  const searchWeatherHistory = useCallback(
    (q: string) => {
      const today = dayjs().format(dateFormatString)
      if (firstDate?.format(dateFormatString) !== undefined) {
        void dispatch(fetchWeatherHistory({ q, dt: firstDate?.format(dateFormatString), end_dt: secondDate?.format(dateFormatString) }))
        navigate(`/weather-history/${q}/${firstDate.format(dateFormatString)}/${secondDate !== null ? secondDate.format(dateFormatString) : today}`)
      }
    },
    [firstDate, dispatch, secondDate, navigate],
  )

  useEffect(() => {
    if (firstDate !== null) {
      navigate(`/weather-history/${qCity}/${firstDate.format(dateFormatString)}`)
      if (secondDate !== null) {
        navigate(`/weather-history/${qCity}/${firstDate.format(dateFormatString)}/${secondDate.format(dateFormatString)}`)
      }
    }
  }, [firstDate, navigate, qCity, secondDate])

  const handleChangeFirstDate = useCallback((newValue: React.SetStateAction<Dayjs | null>) => {
    setFirstDate(newValue)
  }, [])
  const handleChangeSecondDate = useCallback((newValue: React.SetStateAction<Dayjs | null>) => {
    setSecondDate(newValue)
  }, [])

  const handleFirstDatePickingError = useCallback(
    (reason: DateValidationError, value: Dayjs | null) => {
      if (reason === null) {
        dispatch(checkDatePickingError(false))
      } else if (reason !== null) {
        dispatch(checkDatePickingError(true))
      }
      switch (reason) {
        case 'disableFuture':
          setHelperTextFirst('This rather about history less then future')
          break
        case 'maxDate':
          setHelperTextFirst('First date should not be after second date')
          break
        case 'minDate':
          setHelperTextFirst('Min date value should not be out of week range')
          break
        default:
          setHelperTextFirst(null)
      }
    },
    [dispatch],
  )
  const handleSecondDatePickingError = useCallback(
    (reason: DateValidationError, value: Dayjs | null) => {
      if (reason === null) {
        dispatch(checkDatePickingError(false))
      } else if (reason !== null) {
        dispatch(checkDatePickingError(true))
      }
      switch (reason) {
        case 'disableFuture':
          setHelperTextSecond('This rather about history, not future')
          break
        case 'minDate':
          setHelperTextSecond('Second date should be after first date ')
          break
        default:
          setHelperTextSecond(null)
      }
    },
    [dispatch],
  )

  const minSelectableDate = useMemo(() => {
    return dayjs().subtract(7, 'day')
  }, [])

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction={'row'} alignItems={'center'} gap={'20px'} padding={'10px'} justifyContent={'center'}>
          <DatePicker
            label={'Starting date'}
            value={firstDate}
            onChange={handleChangeFirstDate}
            minDate={minSelectableDate}
            maxDate={dayjs(secondDate)}
            disableFuture
            onError={handleFirstDatePickingError}
            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
              <TextField {...params} helperText={helperTextFirst} sx={{ backgroundColor: '#fff' }} />
            )}
          />
          <DatePicker
            label={'Final date'}
            value={secondDate}
            onChange={handleChangeSecondDate}
            minDate={firstDate !== null ? dayjs(firstDate) : minSelectableDate}
            disableFuture
            onError={handleSecondDatePickingError}
            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
              <TextField {...params} helperText={helperTextSecond} sx={{ backgroundColor: '#fff' }} />
            )}
          />
        </Stack>
      </LocalizationProvider>
      <CitySearch page='weatherHistory' searchWeatherHistory={searchWeatherHistory} />
    </Box>
  )
}
