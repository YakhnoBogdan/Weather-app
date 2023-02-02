/* eslint-disable @typescript-eslint/naming-convention */
import { ThunkAction } from 'redux-thunk'
import { AppDispatch } from '..'
import { ForecastModel, FoundCity, WeatherHistoryModel } from '../../Types/WeatherModels'
import * as Actions from './actions'
import { GlobalAppState } from '../rootReducer'
import { GlobalAppActions } from '../actions'
import { callGetApiRequest } from '../../services/weatherApiAxios'

export type ThunkAppType = ThunkAction<Promise<void>, GlobalAppState, undefined, GlobalAppActions>

export const fetchSearchCity =
  (q: string): ThunkAppType =>
  async (dispatch: AppDispatch) => {
    dispatch(Actions.findCity.request())
    try {
      const result = await callGetApiRequest<FoundCity[]>({ endpoint: 'https://weatherapi-com.p.rapidapi.com/search.json', method: 'GET', q })

      if (result.success && result.response !== undefined) {
        dispatch(Actions.findCity.success({ citiesList: result.response }))
      } else throw Error('Something went wrong')
    } catch (error) {
      dispatch(Actions.findCity.failure({ error: new Error() }))
    }
  }

export const fetchWeatherForecast =
  ({ q, days }: { q: string; days: '1' | '2' | '3' }): ThunkAppType =>
  async (dispatch: AppDispatch) => {
    dispatch(Actions.getWeatherForecast.request())
    try {
      const result = await callGetApiRequest<ForecastModel>({
        endpoint: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        method: 'GET',
        q,
        days,
      })

      if (result.success && result.response !== undefined) {
        dispatch(Actions.getWeatherForecast.success({ weather: result.response }))
      } else throw Error('Something went wrong')
    } catch (error) {
      dispatch(Actions.getWeatherForecast.failure({ error: new Error() }))
    }
  }

export const fetchWeatherHistory =
  ({ q, dt, end_dt }: { q: string; dt: string; end_dt?: string }): ThunkAppType =>
  async (dispatch: AppDispatch) => {
    dispatch(Actions.getWeatherHistory.request())
    try {
      const result = await callGetApiRequest<WeatherHistoryModel>({
        endpoint: 'https://weatherapi-com.p.rapidapi.com/history.json',
        method: 'GET',
        q,
        dt,
        end_dt,
      })
      if (result.success && result.response !== undefined) {
        dispatch(Actions.getWeatherHistory.success({ weatherHistory: result.response }))
      } else throw Error('Something went wrong')
    } catch (error) {
      dispatch(Actions.getWeatherHistory.failure({ error: new Error() }))
    }
  }
