import { getType, ActionType } from 'typesafe-actions'
import * as UserActions from './actions'
import { AllSportEventsModel } from '../../Types/SportEventsModels'
import { FoundCity } from '../../Types/WeatherModels'
import { UserData } from '../../Types/UserModel'

type UserActionsType = ActionType<typeof UserActions>

export interface UserState {
  usersData: { [id: string]: UserData }
  isUserAuthenticated: boolean
  currentUser: { [id: string]: UserData } | null
  currentUserId: string
  favoriteCities: { [id: string]: FoundCity[] }
  savedSportEvents: { [id: string]: AllSportEventsModel }
  addingError: Error | null
  countingSystem: string
}

const initialState: UserState = {
  usersData: {},
  isUserAuthenticated: false,
  currentUser: null,
  currentUserId: '',
  favoriteCities: {},
  savedSportEvents: {},
  addingError: null,
  countingSystem: 'Metric',
}

export const userReducer = (state = initialState, action: UserActionsType): UserState => {
  switch (action.type) {
    case getType(UserActions.userLogin):
      return {
        ...state,
        currentUser: { [action.payload.currentUserId]: state.usersData[action.payload.currentUserId] },
        currentUserId: action.payload.currentUserId,
        isUserAuthenticated: true,
      }
    case getType(UserActions.registrationUser):
      return {
        ...state,
        usersData: { ...state.usersData, [action.payload.id]: action.payload.registrationData },
        isUserAuthenticated: true,
        currentUser: { [action.payload.id]: action.payload.registrationData },
        currentUserId: action.payload.id,
      }
    case getType(UserActions.logoutUserAction):
      return {
        ...state,
        isUserAuthenticated: false,
        currentUser: null,
      }

    case getType(UserActions.addFavoriteCity):
      return {
        ...state,
        favoriteCities: {
          ...state.favoriteCities,
          [action.payload.currentUserId]:
            state.favoriteCities[action.payload.currentUserId] !== undefined
              ? [...state.favoriteCities[action.payload.currentUserId], action.payload.city]
              : [action.payload.city],
        },
      }
    case getType(UserActions.removeFavoriteCity):
      return {
        ...state,
        favoriteCities: {
          ...state.favoriteCities,
          [state.currentUserId]: [...state.favoriteCities[state.currentUserId]].filter((city) => city.id !== action.payload.cityId),
        },
      }
    case getType(UserActions.changeCountingSystem):
      return {
        ...state,
        countingSystem: action.payload.system,
      }
    case getType(UserActions.addEventToSaved):
      return {
        ...state,
        savedSportEvents: {
          ...state.savedSportEvents,
          [state.currentUserId]:
            state.savedSportEvents[state.currentUserId] !== undefined
              ? {
                  ...state.savedSportEvents[state.currentUserId],
                  [action.payload.kindOfSport]:
                    state.savedSportEvents[state.currentUserId][action.payload.kindOfSport] !== undefined
                      ? [
                          ...state.savedSportEvents[state.currentUserId][action.payload.kindOfSport],
                          { ...action.payload.sportEvent, id: action.payload.id },
                        ]
                      : [{ ...action.payload.sportEvent, id: action.payload.id }],
                }
              : {
                  ...state.savedSportEvents[state.currentUserId],
                  [action.payload.kindOfSport]: [{ ...action.payload.sportEvent, id: action.payload.id }],
                },
        },
      }
    case getType(UserActions.removeSavedEvent):
      return {
        ...state,
        savedSportEvents: {
          ...state.savedSportEvents,
          [state.currentUserId]: {
            ...state.savedSportEvents[state.currentUserId],
            [action.payload.kindOfSport]: [...state.savedSportEvents[state.currentUserId][action.payload.kindOfSport]].filter(
              (sportEvent) => sportEvent.id !== action.payload.eventId,
            ),
          },
        },
      }
    default:
      return state
  }
}
