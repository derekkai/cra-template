import { webSocketConnectTimeout } from 'config'
import { updateReadyState, sendMessage1, sendMessage2 } from 'reducers/webSocket'

class WebSocketUtility {
  #ws = null

  #url = ''

  #dispatch = null

  #emit = null

  constructor(url, dispatch) {
    this.#url = url
    this.#dispatch = dispatch
  }

  #updateReadyState = () => {
    this.#dispatch?.(updateReadyState(this.#ws.readyState))
  }

  connect = (autoRetry = false) => {
    console.warn('ws connecting')
    this.#ws = new WebSocket(this.#url)
    this.#updateReadyState()
    this.#onError()
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        resolve(false)
        if (autoRetry) this.#reconnect()
      }, webSocketConnectTimeout)

      this.#ws.onopen = () => {
        this.#updateReadyState()
        clearTimeout(timer)
        this.#onClose()
        resolve(true)
      }
    })
  }

  disconnect = () => {
    if (this.#ws && this.#ws.readyState === WebSocket.OPEN) {
      this.#updateReadyState()
      this.#ws.close()
      return new Promise((resolve) => {
        this.#ws.onclose = () => {
          resolve('on close')
        }
      })
    }
  }

  #reconnect = async () => {
    console.warn('ws reconnecting')
    await this.disconnect()
    await this.connect(true)
    await this.createMessageEmitter()
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

  createMessageEmitter = (emit) => {
    if (!this.#emit) this.#emit = emit
    this.#ws.onmessage = (message) => this.#emit(message)
  }

  #onError = () => {
    this.#ws.onerror = (e) => {
      console.error(e)
    }
  }

  #onClose = () => {
    this.#ws.onclose = (e) => {
      this.#updateReadyState()
      console.warn(e)
      this.#reconnect()
    }
  }
}

export default WebSocketUtility
