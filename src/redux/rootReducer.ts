import { combineReducers } from 'redux'
import { weatherReducer, WeatherState } from './weather/reducer'
import { UserState, userReducer } from './user/reducer'
import { SportEventsState, sportEventsReducer } from './sportEvents/reducer'

export interface GlobalAppState {
  weather: WeatherState
  user: UserState
  sportEvents: SportEventsState
}

export const rootReducer = combineReducers({
  weather: weatherReducer,
  user: userReducer,
  sportEvents: sportEventsReducer,
})
