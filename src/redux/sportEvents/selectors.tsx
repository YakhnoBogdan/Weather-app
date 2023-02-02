import { GlobalAppState } from '../rootReducer'

export const selectSportEvents = (state: GlobalAppState) => state.sportEvents.sportEvents
export const selectIsLoadingSportEvents = (state: GlobalAppState) => state.sportEvents.isLoadingSportEvents
