import { Routes, Route } from 'react-router-dom'
import { CurrentWeather } from '../pages/CurrentWeatherPage/CurrentWeather'
import { CurrentWeatherPage } from '../pages/CurrentWeatherPage/CurrentWeatherPage'
import { AuthRequire } from '../components/AuthRequire/AuthRequire'
import { LoginPage } from '../pages/LoginPage/LoginPage'
import { Homepage } from '../pages/Homepage/Homepage'
import { UserSettingsPage } from '../pages/UserSettingsPage/UserSettingsPage'
import { FavoriteCities } from '../components/UserSettingsPage/FavoriteCities/FavoriteCities'
import { MainSettings } from '../components/UserSettingsPage/MainSettings/MainSettings'
import { SavedEvents } from '../components/UserSettingsPage/SavedEvents/SavedEvents'
import { Dashboard } from '../components/Dashboard/Dashboard'
import { SportEventsPage } from '../pages/SportEventsPage/SportEventsPage'
import { ForecastPage } from '../pages/ForecastPage/ForecastPage'
import { WholeForecast } from '../pages/ForecastPage/WholeForecast'
import { HistoryPage } from '../pages/HistoryPage/HistoryPage'
import { HistoryPageParticularDay } from '../pages/HistoryPage/HistoryPageParticularDay'

export const RoutesConfig = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <AuthRequire>
            <Dashboard />
          </AuthRequire>
        }
      >
        <Route index element={<Homepage />} />
        <Route path='/realtime-weather' element={<CurrentWeatherPage />}>
          <Route path='/realtime-weather/:qCity' element={<CurrentWeather />} />
        </Route>
        <Route path='/forecast' element={<ForecastPage />}>
          <Route path='/forecast/:qCity/:day' element={<WholeForecast />} />
          <Route path='*' element={<h2>Nothing found</h2>} />
        </Route>
        <Route path='/weather-history' element={<HistoryPage />}>
          <Route path='/weather-history/:qCity/:dateParam/:endDateParam?/day?' element={<HistoryPageParticularDay />} />
          <Route path='*' element={<h2>Nothing found</h2>} />
        </Route>
        <Route path='/sport-events' element={<SportEventsPage />}>
          <Route path='/sport-events/:qCity' element={<SportEventsPage />} />
        </Route>
        <Route path='/settings' element={<UserSettingsPage />}>
          <Route index element={<MainSettings />} />
          <Route path='/settings/favorite-cities' element={<FavoriteCities />} />
          <Route path='/settings/saved-events' element={<SavedEvents />} />
        </Route>
      </Route>
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  )
}
