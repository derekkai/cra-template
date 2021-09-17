import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from 'utils/history'
import global from './global'
import webSocket from './webSocket'

export default function createReducer(injectedReducers) {
  return combineReducers({
    ...injectedReducers,
    router: connectRouter(history),
    global,
    webSocket,
  })
}
