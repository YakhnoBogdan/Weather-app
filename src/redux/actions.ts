import { ActionType } from 'typesafe-actions'

import * as WeatherActions from './weather/actions'
import * as UserActions from './user/actions'
import * as SportEventsActions from './sportEvents/actions'

const allActions = {
  WeatherActions,
  UserActions,
  SportEventsActions,
}

export type GlobalAppActions = ActionType<typeof allActions>
