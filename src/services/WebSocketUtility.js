class WebSocketUtility {
  #ws = null

  #url = ''

  constructor(url) {
    this.#url = url
  }

  connect = () => {
    this.#ws = new WebSocket(this.#url)
    return new Promise((resolve) => {
      this.#ws.onopen = () => {
        resolve()
      }
    })
  }

  #sendMessage1 = () => {
    this.#ws.send('sendMessage1')
  }

  #sendMessage2 = () => {
    this.#ws.send('sendMessage2')
  }

  getActions = () => {
    return {
      sendMessage1: this.#sendMessage1,
      sendMessage2: this.#sendMessage2,
    }
  }

  onMessage = (emit) => {
    this.#ws.onmessage = (message) => emit(message)
  }

  disconnect = () => {
    if (this.#ws) {
      this.#ws.close()
      return new Promise((resolve) => {
        this.#ws.onclose = (e) => {
          resolve(e)
        }
      })
    }
  }
}

export default WebSocketUtility
