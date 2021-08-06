import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { history } from 'utils'
import global from './global'

export default function createReducer() {
  return combineReducers({
    router: connectRouter(history),
    global,
  })
}
