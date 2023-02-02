import { ActionType, getType } from 'typesafe-actions'
import * as SportEventsActionsType from './actions'
import { AllSportEventsModel } from '../../Types/SportEventsModels'
import { LoadingRequestModel } from '../../Types/RequestStateModel'
import { failureRequestLoad, loadingRequestLoad, successRequestLoad } from '../../services/isLoadingState'

type WeatherActionsType = ActionType<typeof SportEventsActionsType>

export interface SportEventsState {
  sportEvents: AllSportEventsModel | null
  errorGetReq: Error | null
  isLoadingSportEvents: LoadingRequestModel
}
const initialState: SportEventsState = {
  sportEvents: null,
  errorGetReq: null,
  isLoadingSportEvents: {
    success: false,
    failure: false,
    request: false,
  },
}
export const sportEventsReducer = (state = initialState, action: WeatherActionsType): SportEventsState => {
  switch (action.type) {
    case getType(SportEventsActionsType.getCurentSportEvents.request):
      return {
        ...state,
        errorGetReq: null,
        isLoadingSportEvents: loadingRequestLoad(state.isLoadingSportEvents),
      }
    case getType(SportEventsActionsType.getCurentSportEvents.success):
      return {
        ...state,
        sportEvents: action.payload.sportEvents,
        errorGetReq: null,
        isLoadingSportEvents: successRequestLoad(state.isLoadingSportEvents),
      }
    case getType(SportEventsActionsType.getCurentSportEvents.failure):
      return {
        ...state,
        errorGetReq: action.payload.error,
        isLoadingSportEvents: failureRequestLoad(state.isLoadingSportEvents),
      }

    default:
      return state
  }
}
