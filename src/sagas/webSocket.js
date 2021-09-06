import { eventChannel } from 'redux-saga'
import { call, take, takeEvery, put } from 'redux-saga/effects'
import { updateMessage } from 'reducers/global'
import EWebSocket from '../services/EWebSocket'

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

export default function* createSagaWebSocket() {
  const ws = new EWebSocket(testUrl)
  yield ws.connect()

  const actions = ws.actions()
  const keys = Object.keys(actions)
  console.log(actions)
  for (let i = 0; i < keys.length; i += 1) {
    yield takeEvery(keys[i], actions[keys[i]])
  }

  const channel = yield call(createEventChannel, ws)
  while (true) {
    const { data } = yield take(channel)
    const payload = typeof data === 'object' ? JSON.parse(data) : data
    yield put(updateMessage(payload))
  }
}
