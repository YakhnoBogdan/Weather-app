import { ThunkAction } from 'redux-thunk'
import { AppDispatch } from '..'
import { AllSportEventsModel } from '../../Types/SportEventsModels'
import * as Actions from './actions'
import axios from 'axios'
import { GlobalAppState } from '../rootReducer'
import { GlobalAppActions } from '../actions'
import { callGetApiRequest } from '../../services/weatherApiAxios'

export type ThunkAppType = ThunkAction<Promise<void>, GlobalAppState, undefined, GlobalAppActions>

export const fetchSports =
  (q: string): ThunkAppType =>
  async (dispatch: AppDispatch) => {
    dispatch(Actions.getCurentSportEvents.request())
    try {
      const result = await callGetApiRequest<AllSportEventsModel>({ endpoint: 'https://weatherapi-com.p.rapidapi.com/sports.json', method: 'GET', q })
      if (result.success && result.response !== undefined) {
        dispatch(Actions.getCurentSportEvents.success({ sportEvents: result.response }))
      } else throw Error('Something went wrong')
    } catch (error) {
      dispatch(Actions.getCurentSportEvents.failure({ error: new Error('Something went wrong') }))
    }
  }
