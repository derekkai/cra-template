import { takeEvery, call, put } from 'redux-saga/effects'
import { getData, setUser } from 'reducers/global'
import axios from 'axios'

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
}

export default watchers
