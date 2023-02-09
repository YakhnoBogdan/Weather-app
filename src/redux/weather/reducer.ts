import { ActionType, getType } from 'typesafe-actions'
import * as WeatherActions from './actions'
import { ForecastModel, FoundCity, WeatherHistoryModel } from '../../Types/WeatherModels'
import { LoadingRequestModel } from '../../Types/RequestStateModel'
import { failureRequestLoad, loadingRequestLoad, successRequestLoad } from '../../services/isLoadingState'

type WeatherActionsType = ActionType<typeof WeatherActions>

export interface WeatherState {
  weather: ForecastModel | null
  weatherHistory: WeatherHistoryModel | null
  foundCities: FoundCity[]
  getWeatherError: Error | null
  findCityError: Error | null
  datePickingError: boolean
  isLoadingWeather: LoadingRequestModel
}
const initialState: WeatherState = {
  weather: null,
  weatherHistory: null,
  getWeatherError: null,
  findCityError: null,
  datePickingError: false,
  foundCities: [],
  isLoadingWeather: {
    success: false,
    failure: false,
    request: false,
  },
}
export const weatherReducer = (state = initialState, action: WeatherActionsType): WeatherState => {
  switch (action.type) {
    case getType(WeatherActions.findCity.request):
      return {
        ...state,
        findCityError: null,
      }
    case getType(WeatherActions.findCity.success):
      return {
        ...state,
        foundCities: action.payload.citiesList,
        findCityError: null,
      }
    case getType(WeatherActions.findCity.failure):
      return {
        ...state,
        findCityError: action.payload.error,
      }
    case getType(WeatherActions.getWeatherForecast.request):
      return {
        ...state,
        isLoadingWeather: loadingRequestLoad(state.isLoadingWeather),
        getWeatherError: null,
      }
    case getType(WeatherActions.getWeatherForecast.success):
      return {
        ...state,
        isLoadingWeather: successRequestLoad(state.isLoadingWeather),
        weather: action.payload.weather,
        getWeatherError: null,
      }
    case getType(WeatherActions.getWeatherForecast.failure):
      return {
        ...state,
        isLoadingWeather: failureRequestLoad(state.isLoadingWeather),
        getWeatherError: action.payload.error,
      }
    case getType(WeatherActions.getWeatherHistory.request):
      return {
        ...state,
        isLoadingWeather: loadingRequestLoad(state.isLoadingWeather),
        getWeatherError: null,
      }
    case getType(WeatherActions.getWeatherHistory.success):
      return {
        ...state,
        isLoadingWeather: successRequestLoad(state.isLoadingWeather),
        weatherHistory: action.payload.weatherHistory,
        getWeatherError: null,
      }
    case getType(WeatherActions.getWeatherHistory.failure):
      return {
        ...state,
        isLoadingWeather: failureRequestLoad(state.isLoadingWeather),
        getWeatherError: action.payload.error,
      }
    case getType(WeatherActions.checkDatePickingError):
      return {
        ...state,
        datePickingError: action.payload.datePickingError,
      }
    default:
      return state
  }
}
