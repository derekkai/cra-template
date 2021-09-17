import { webSocketConnectTimeout } from 'config'
import { updateReadyState, sendMessage1, sendMessage2 } from 'reducers/webSocket'

class WebSocketUtility {
  #ws = null

  #url = ''

  #dispatch = null

  constructor(url, dispatch) {
    this.#url = url
    this.#dispatch = dispatch
  }

  #updateReadyState = () => {
    this.#dispatch?.(updateReadyState(this.#ws.readyState))
  }

  connect = () => {
    console.warn('ws connecting')
    this.#ws = new WebSocket(this.#url)
    this.#updateReadyState()
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        this.#reconnect()
      }, webSocketConnectTimeout)

      this.#ws.onopen = () => {
        this.#updateReadyState()
        clearTimeout(timer)
        resolve()
      }
    })
  }

  #sendMessage1 = (data) => {
    console.log(data)
    this.#ws.send('sendMessage1')
  }

  #sendMessage2 = () => {
    this.#ws.send('sendMessage2')
  }

  getEventMap = () => {
    return {
      [sendMessage1.type]: this.#sendMessage1,
      [sendMessage2.type]: this.#sendMessage2,
    }
  }

  onMessage = (emit) => {
    this.#ws.onmessage = (message) => emit(message)
  }

  disconnect = () => {
    if (this.#ws && this.#ws.readyState === WebSocket.OPEN) {
      this.#updateReadyState()
      this.#ws.close()
      return new Promise((resolve) => {
        this.#ws.onclose = (e) => {
          this.#updateReadyState()
          resolve(e)
        }
      })
    }
  }

  #reconnect = async () => {
    console.warn('ws reconnecting')
    await this.disconnect()
    await this.connect()
  }
}

export default WebSocketUtility
