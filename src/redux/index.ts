import { Store, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { GlobalAppState, rootReducer } from './rootReducer'
import type {} from 'redux-thunk/extend-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store: Store<GlobalAppState> = createStore(persistedReducer, applyMiddleware(thunk))

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
