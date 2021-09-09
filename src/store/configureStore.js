import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import createReducer from 'reducers'
import createSagaMiddleware from 'redux-saga'
import { createInjectorsEnhancer } from 'redux-injectors'
import history from 'utils/history'
import { routerMiddleware } from 'connected-react-router'

const logger = createLogger({
  diff: true,
  collapsed: true,
})
const sagaMiddleware = createSagaMiddleware()
const runSaga = sagaMiddleware.run
const middlewares = [logger, routerMiddleware(history), sagaMiddleware]

export const store = configureStore({
  reducer: createReducer(),
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), ...middlewares],
  enhancers: [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ],
})
