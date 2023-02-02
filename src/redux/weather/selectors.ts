import { GlobalAppState } from '../rootReducer'

export const selectWeather = (state: GlobalAppState) => state.weather.weather
export const selectWeatherHistory = (state: GlobalAppState) => state.weather.weatherHistory

export const selectFoundCities = (state: GlobalAppState) => state.weather.foundCities
export const selectGetWeatherError = (state: GlobalAppState) => state.weather.getWeatherError
export const selectIsLoadingWeather = (state: GlobalAppState) => state.weather.isLoadingWeather
export const selectDatePickingError = (state: GlobalAppState) => state.weather.datePickingError
