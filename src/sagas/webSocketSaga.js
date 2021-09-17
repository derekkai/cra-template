import { eventChannel } from 'redux-saga'
import { store } from 'store/configureStore'
import { call, take, takeEvery, put } from 'redux-saga/effects'
import { updateMessage } from 'reducers/global'
import WebSocketUtility from '../services/webSocketUtility'

const testUrl =
  'wss://demo.piesocket.com/v3/channel_1?api_key=oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm&notify_self'

function createEventChannel(ws) {
  try {
    return eventChannel((emit) => {
      ws.onMessage(emit)
      return () => {
        ws.disconnect()
      }
    })
  } catch (e) {
    throw new Error(e)
  }
}

export default function* createWebSocketSaga() {
  try {
    const ws = new WebSocketUtility(testUrl, store.dispatch)
    yield ws.connect()
    const eventMap = ws.getEventMap()
    const eventKeys = Object.keys(eventMap)

    for (let i = 0; i < eventKeys.length; i += 1) {
      yield takeEvery(eventKeys[i], eventMap[eventKeys[i]])
    }

    const channel = yield call(createEventChannel, ws)
    while (true) {
      const { data } = yield take(channel)
      const payload = typeof data === 'object' ? JSON.parse(data) : data
      yield put(updateMessage(payload))
    }
  } catch (e) {
    console.log(e)
  }
}
