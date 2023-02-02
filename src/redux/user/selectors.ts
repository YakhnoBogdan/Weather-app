import { createSelector } from 'reselect'
import { GlobalAppState } from '../rootReducer'

export const selectUsers = (state: GlobalAppState) => state.user.usersData
export const selectCurrentUser = (state: GlobalAppState) => state.user.currentUser
export const selectCurrentUserId = (state: GlobalAppState) => state.user.currentUserId
export const selectIsUserAuthenticated = (state: GlobalAppState) => state.user.isUserAuthenticated
export const selectFavoriteCities = (state: GlobalAppState) => state.user.favoriteCities[state.user.currentUserId]
export const selectSavedSportEvents = (state: GlobalAppState) => state.user.savedSportEvents[state.user.currentUserId]
export const selectCountingSystem = (state: GlobalAppState) => state.user.countingSystem
