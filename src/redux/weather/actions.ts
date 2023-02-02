import { createAction, createAsyncAction } from 'typesafe-actions'
import { CurrentWeatherModel, ForecastModel, FoundCity, LocationModel, WeatherHistoryModel } from '../../Types/WeatherModels'

export enum WeatherActionTypes {
  GET_CURENT_WEATHER_REQUEST = '@weather/GET_CURENT_WEATHER_REQUEST',
  GET_CURENT_WEATHER_SUCCESS = '@weather/GET_CURENT_WEATHER_SUCCESS',
  GET_CURENT_WEATHER_FAILURE = '@weather/GET_CURENT_WEATHER_FAILURE',

  GET_FORECAST_REQUEST = '@weather/GET_FORECAST_REQUEST',
  GET_FORECAST_SUCCESS = '@weather/GET_FORECAST_SUCCESS',
  GET_FORECAST_FAILURE = '@weather/GET_FORECAST_FAILURE',

  GET_WEATHER_HISTORY_REQUEST = '@weather/GET_WEATHER_HISTORY_REQUEST',
  GET_WEATHER_HISTORY_SUCCESS = '@weather/GET_WEATHER_HISTORY_SUCCESS',
  GET_WEATHER_HISTORY_FAILURE = '@weather/GET_WEATHER_HISTORY_FAILURE',

  FIND_CITY_REQUEST = '@weather/FIND_CITY_REQUEST',
  FIND_CITY_SUCCESS = '@weather/FIND_CITY_SECCESS',
  FIND_CITY_FAILURE = '@weather/FIND_CITY_FAILURE',

  CHECK_DATE_PICKING_ERROR = '@weather/CHECK_DATE_PICKING_ERROR',
}

export const getCurentWeather = createAsyncAction(
  WeatherActionTypes.GET_CURENT_WEATHER_REQUEST,
  WeatherActionTypes.GET_CURENT_WEATHER_SUCCESS,
  WeatherActionTypes.GET_CURENT_WEATHER_FAILURE,
)<undefined, { currentWeather: CurrentWeatherModel }, { error: Error }>()

export const findCity = createAsyncAction(
  WeatherActionTypes.FIND_CITY_REQUEST,
  WeatherActionTypes.FIND_CITY_SUCCESS,
  WeatherActionTypes.FIND_CITY_FAILURE,
)<undefined, { citiesList: FoundCity[] }, { error: Error }>()

export const getWeatherForecast = createAsyncAction(
  WeatherActionTypes.GET_FORECAST_REQUEST,
  WeatherActionTypes.GET_FORECAST_SUCCESS,
  WeatherActionTypes.GET_FORECAST_FAILURE,
)<undefined, { weather: ForecastModel }, { error: Error }>()

export const getWeatherHistory = createAsyncAction(
  WeatherActionTypes.GET_WEATHER_HISTORY_REQUEST,
  WeatherActionTypes.GET_WEATHER_HISTORY_SUCCESS,
  WeatherActionTypes.GET_WEATHER_HISTORY_FAILURE,
)<undefined, { weatherHistory: WeatherHistoryModel }, { error: Error }>()

export const checkDatePickingError = createAction(WeatherActionTypes.CHECK_DATE_PICKING_ERROR, (datePickingError: boolean) => ({
  datePickingError,
}))()
