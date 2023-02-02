import { createAction, createAsyncAction } from 'typesafe-actions'
import { FoundCity, LocationModel } from '../../Types/WeatherModels'
import { UserData } from '../../Types/UserModel'
import { v4 as uuidv4 } from 'uuid'
import { SportEventModel, kindOfSportModel } from '../../Types/SportEventsModels'

export enum UserActions {
  USER_REGISTRATION = '@user/USER_REGISTRATION',

  LOGIN_USER = '@user/LOGIN_USER',
  LOGOUT_USER = '@user/LOGOUT_USER',

  ADD_FAVORITE_CITY = '@user/ADD_FAVORITE_CITY',

  REMOVE_FAVORTE_CITY = '@user/REMOVE_FAVORTE_CITY',

  CHANGE_COUNTING_SYSTEM = '@user/CHANGE_COUNTING_SYSTEM',

  ADD_EVENT_TO_SAVED = '@user/ADD_EVENT_TO_SAVED',
  REMOVE_SAVED_EVENT = '@user/REMOVE_SAVED_EVENT',
  REMOVE_KIND_OF_SPORT = '@user/REMOVE_KIND_OF_SPORT',
}

export const registrationUser = createAction(UserActions.USER_REGISTRATION, ({ registrationData }: { registrationData: UserData }) => ({
  registrationData,
  id: uuidv4(),
}))()

export const userLogin = createAction(
  UserActions.LOGIN_USER,
  ({ login, password, currentUserId }: { login: string; password: string; currentUserId: string }) => ({
    login,
    password,
    currentUserId,
  }),
)()

export const logoutUserAction = createAction(UserActions.LOGOUT_USER)()

export const addFavoriteCity = createAction(UserActions.ADD_FAVORITE_CITY, (city: FoundCity, currentUserId: string) => ({
  city,
  currentUserId,
}))()
export const removeFavoriteCity = createAction(UserActions.REMOVE_FAVORTE_CITY, (cityId: number) => ({
  cityId,
}))()

export const changeCountingSystem = createAction(UserActions.CHANGE_COUNTING_SYSTEM, (system: string) => ({
  system,
}))()

export const addEventToSaved = createAction(UserActions.ADD_EVENT_TO_SAVED, (sportEvent: SportEventModel, kindOfSport: kindOfSportModel) => ({
  sportEvent,
  kindOfSport,
  id: uuidv4(),
}))()
export const removeSavedEvent = createAction(UserActions.REMOVE_SAVED_EVENT, (eventId: string | undefined, kindOfSport: kindOfSportModel) => ({
  eventId,
  kindOfSport,
}))()
