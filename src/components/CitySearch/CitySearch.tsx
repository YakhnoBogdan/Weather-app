import { ThemeContext, ThemeContextTypes } from '../../context/themeContext'
import { useDebounce } from '../../hooks/useDebounce'
import React, { SyntheticEvent, useCallback, useEffect, useMemo, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, TextField, Autocomplete, AutocompleteHighlightChangeReason, Button, Stack, Tooltip } from '@mui/material'
import { addFavoriteCity } from '../../redux/user/actions'
import { selectCurrentUserId, selectFavoriteCities } from '../../redux/user/selectors'
import { selectFoundCities } from '../../redux/weather/selectors'
import { fetchSearchCity, fetchWeatherForecast } from '../../redux/weather/thunks'
import { fetchSports } from '../../redux/sportEvents/thunks'
import { FoundCity } from '../../Types/WeatherModels'

interface CitySearchProps {
  page: 'homepage' | 'weatherPage' | 'forecast' | 'favoriteCities' | 'sportEvents' | 'weatherHistory'
  searchWeatherHistory?: (q: string) => void
}
export const CitySearch = ({ page, searchWeatherHistory }: CitySearchProps) => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentUserId = useSelector(selectCurrentUserId)
  const foundCities = useSelector(selectFoundCities)
  const favoriteCities = useSelector(selectFavoriteCities)
  const [searchValue, setSearchValue] = useState('')
  const [optionHighlighted, setOptionHighlighted] = useState('')

  const debouncedValue = useDebounce(searchValue, 300)

  useEffect(() => {
    if (debouncedValue.length > 0) {
      void dispatch(fetchSearchCity(debouncedValue))
    }
  }, [debouncedValue, dispatch])

  const handleSearchInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }, [])

  const foundCityNames = useMemo(() => {
    return foundCities.map((city) => city.name)
  }, [foundCities])

  const filterOptions = useCallback((options: string[], state: object) => options, [])

  const onHighlightChange = useCallback((event: SyntheticEvent<Element, Event>, option: string | null, reason: AutocompleteHighlightChangeReason) => {
    if (option !== null) {
      setOptionHighlighted(option)
    }
  }, [])

  const disabledSumbit = useMemo(() => {
    const selectedCity = foundCities.find((city) => city.name === optionHighlighted)
    const isCityAlreadyAdded = favoriteCities?.find((addedCity) => addedCity.id === selectedCity?.id) !== undefined
    return {
      disabledAddCity: isCityAlreadyAdded,
      disabledOnWeather: selectedCity === undefined,
      searchTooltip: isCityAlreadyAdded ? 'City already added' : 'Select city from options',
    }
  }, [favoriteCities, foundCities, optionHighlighted])

  const handleSearchComplete = useCallback(() => {
    const selectedCity: FoundCity | undefined = foundCities.find((city) => city.name === optionHighlighted)

    if (selectedCity !== undefined) {
      switch (page) {
        case 'homepage':
        case 'weatherPage':
          void dispatch(fetchWeatherForecast({ q: selectedCity.name, days: '3' }))
          navigate(`/realtime-weather/${optionHighlighted}`)
          break
        case 'forecast':
          void dispatch(fetchWeatherForecast({ q: selectedCity.name, days: '3' }))
          navigate(`/forecast/${optionHighlighted}/0`)
          break
        case 'sportEvents':
          void dispatch(fetchSports(selectedCity.name))
          navigate(`/sport-events/${optionHighlighted}`)
          break
        case 'favoriteCities':
          void dispatch(addFavoriteCity(selectedCity, currentUserId))
          break
        case 'weatherHistory':
          searchWeatherHistory !== undefined ? searchWeatherHistory(selectedCity.name) : alert(5)
          break
        default:
          void dispatch(fetchWeatherForecast({ q: selectedCity.name, days: '3' }))
          navigate(`/realtime-weather/${optionHighlighted}`)
          break
      }
    } else {
      alert('Wrong city to search')
    }
  }, [currentUserId, dispatch, foundCities, navigate, optionHighlighted, page, searchWeatherHistory])

  return (
    <Stack direction={'row'} alignItems={'center'} gap={'5px'}>
      <Autocomplete
        disablePortal
        id='combo-box-demo'
        options={foundCityNames.length > 0 ? foundCityNames : ['Nothing found']}
        sx={{ backgroundColor: '#fff', minWidth: page !== 'forecast' && page !== 'weatherPage' ? '350px' : '' }}
        filterOptions={filterOptions}
        onHighlightChange={onHighlightChange}
        freeSolo={true}
        clearOnBlur={false}
        fullWidth
        renderInput={(params) => (
          <TextField {...params} label='Search city' onChange={handleSearchInput} fullWidth sx={{ boxShadow: '0 0 5px 0 #ccc' }} />
        )}
      />
      <Tooltip title={disabledSumbit.disabledAddCity ? disabledSumbit.searchTooltip : ''} placement='top'>
        <Box sx={{ alignSelf: 'stretch' }}>
          <Button
            type='button'
            variant='contained'
            onClick={handleSearchComplete}
            disabled={page === 'favoriteCities' ? disabledSumbit.disabledAddCity : disabledSumbit.disabledOnWeather}
            sx={{ height: '100%', '&:disabled': { backgroundColor: themeIsDark ? '#b4cbcb' : '#cfcece' } }}
          >
            {page === 'favoriteCities' ? 'Add' : 'Search'}
          </Button>
        </Box>
      </Tooltip>
    </Stack>
  )
}
