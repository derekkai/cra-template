import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import createReducer from 'reducers'
import history from 'utils/history'
import { routerMiddleware } from 'connected-react-router'

const logger = createLogger({
  diff: true,
  collapsed: true,
})

const middlewares = [logger, routerMiddleware(history)]

export const store = configureStore({
  reducer: createReducer(),
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), ...middlewares],
  enhancers: [],
})
