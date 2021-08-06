import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { forceReducerReload } from 'redux-injectors'
import createReducer from '../reducers'

export default function configureAppStore() {
  const logger = createLogger({
    diff: true,
    collapsed: true,
  })

  const middlewares = [logger]
  const store = configureStore({
    reducer: createReducer(),
    middleware: [...middlewares],
    devTools: process.env.NODE_ENV !== 'production',
  })

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      forceReducerReload(store)
    })
  }

  return store
}
