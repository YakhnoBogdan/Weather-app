import { createAsyncAction } from 'typesafe-actions'
import { AllSportEventsModel } from '../../Types/SportEventsModels'

export enum SportEventsActionsType {
  GET_CURRENT_EVENTS_REQUEST = '@sports/GET_CURRENT_EVENTS_REQUEST',
  GET_CURRENT_EVENTS_SUCCESS = '@sports/GET_CURRENT_EVENTS_SUCCESS',
  GET_CURRENT_EVENTS_FAILURE = '@sports/GET_CURRENT_EVENTS_FAILURE',
}

export const getCurentSportEvents = createAsyncAction(
  SportEventsActionsType.GET_CURRENT_EVENTS_REQUEST,
  SportEventsActionsType.GET_CURRENT_EVENTS_SUCCESS,
  SportEventsActionsType.GET_CURRENT_EVENTS_FAILURE,
)<undefined, { sportEvents: AllSportEventsModel }, { error: Error }>()
