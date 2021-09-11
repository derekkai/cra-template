import { takeEvery } from 'redux-saga/effects'
import { actions } from './index'

function handler() {
  console.log('login')
}

export default function* watchers() {
  yield takeEvery(actions.setLogin.type, handler)
}
