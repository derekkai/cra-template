import { takeEvery, call, put, take, fork } from 'redux-saga/effects'
import { getData, setUser } from 'reducers/global'
import axios from 'axios'
import createSagaWebSocket from './webSocket'

function requestGetUser() {
  return axios.request({
    method: 'get',
    url: 'https://my-json-server.typicode.com/atothey/demo/user',
  })
}

function* handleGetData() {
  try {
    const response = yield call(requestGetUser)
    const { data } = response
    yield put(setUser({ ...data }))
    return response
  } catch (e) {
    console.error(e)
  }
}

function* watchers() {
  yield takeEvery(getData.type, handleGetData)
  yield take('initWebSocket')
  yield fork(createSagaWebSocket)
}

export default watchers
