/* eslint-disable */
// [] TODO: request timeout

import { v4 as uuidv4 } from 'uuid'
import { setError, setUm } from 'actions/error'
import { CONFIRM } from 'constants/buttonType'
import * as ACTION from 'soccer-signalr-api/src/actions'
import { CMD_CODE } from 'soccer-signalr-api/src/constants'
import ApiError from 'soccer-signalr-api/src/utils/ApiError'
import createTimestamp from 'soccer-signalr-api/src/utils/createTimestamp'

window.$ = require('soccer-signalr-api/lib/jquery')

window.jQuery = $
require('soccer-signalr-api/lib/signalR')
require('soccer-signalr-api/lib/hubs')

const {
  hub,
  MyHub: { client, server },
} = $.connection

const REQUEST_TIMEOUT = 15 * 1000 // 15s

class SoccerSignalrApi {
  // ------------------------------------
  // Members
  // ------------------------------------
  #isUm = false

  #isDebug = null

  #store = null

  #settings = null

  #isConnected = null

  #MAPPER = null

  // ------------------------------------
  // Constructor
  // ------------------------------------
  constructor(settings) {
    this.#MAPPER = {
      // map actions with corresponding results
      ACTION: {
        // [EVENT.GUNNER_SESSION_LIST_RET]: EVENT.GUNNER_SESSION_LIST_RSLT,
        // [EVENT.GUNNER_SESSION_SET_ACT]: EVENT.GUNNER_SESSION_SET_RSLT,
      },
      // map notifies to redux actions
      NOTIFY: {
        [CMD_CODE.TABLE_INFO_NOTIFY]: ACTION.getTableInfoNotify,
        [CMD_CODE.TABLE_STATISTICS_NOTIFY]: ACTION.getTableStatisticsNotify,
        [CMD_CODE.RESULT_WIN_NOTIFY]: ACTION.getResultWinNotify,
        [CMD_CODE.SINGLE_WALLET_ERROR_NOTIFY]: ACTION.getSingleWalletErrorNotify,
        [CMD_CODE.SERVER_MESSAGE_NOTIFICATION]: ACTION.getServerMessageNotification,
      },
      // map redux actions to middleware functions
      MIDDLEWARE: {
        [ACTION.KEY.LOGIN]: this.#login,
        [ACTION.KEY.LOBBY_INFO]: this.#lobbyInfo,
        [ACTION.KEY.USER_BALANCE]: this.#userBalance,
        [ACTION.KEY.SYNC_TIME]: this.#syncTime,
        [ACTION.KEY.PLACE_BET]: this.#placeBet,
      },
    }

    this.#settings = settings
    this.#isDebug = !!settings.isDebug
    this.#isConnected = false

    // ---
    // prepare connection
    client.getServerMessage = (response) => {
      this.#onMessage(response)
    }
    client.forceDisconnect = () => {
      this.#disconnect()
    }

    hub.reconnecting(() => {
      this.#dispatch(ACTION.getReconnectingNotify())
    })
    hub.reconnected(() => {
      this.#dispatch(ACTION.getReconnectedNotify())
    })
    hub.disconnected((e) => this.#onDisconnect(e, true))
    hub.error((e) => {
      this.#dispatch(ACTION.getErrorNotify(e))
      this.#disconnect()
    })
  }

  // ------------------------------------
  // Handlers
  // ------------------------------------
  #setReconnectError = () => {
    this.#dispatch(
      setError({
        messageContent: 'lbl_SysTimeOutMsg',
        shouldReload: true,
        buttons: [
          {
            label: CONFIRM,
            content: 'lbl_Reconnect',
          },
        ],
      }),
    )
  }

  #onDisconnect = (e, fromServer = false) => {
    this.#log('onDisconnect:', e, fromServer)
    this.#disconnect()

    if (fromServer) {
      this.#setReconnectError()
    }

    this.#dispatch(ACTION.getDisconnectNotify())
  }

  #onForceClose = (e) => {
    this.#log('onForceClose:', e)
    this.#disconnect()

    if (!this.#isUm) {
      this.#dispatch(setError({ code: e?.result?.errorCode }))
    }

    this.#dispatch(ACTION.getForceCloseNotify())
  }

  #onMessage = (response) => {
    const responseBody = this.#parseResponse(response)
    const { CmdCode } = response || {}
    this.#log('message', { CmdCode, data: responseBody })

    // notify
    const bcAction = this.#MAPPER.NOTIFY[CmdCode]
    if (bcAction) {
      this.#dispatch(bcAction(responseBody))
    }
  }

  #onResponse = (response) => {
    const responseBody = this.#parseResponse(response)
    const { CmdCode } = response || {}
    this.#log('response', { CmdCode, data: responseBody })

    const { errorCode, errorDescription, isForceClose } = responseBody?.result || {}

    const hasError =
      Object.prototype.hasOwnProperty.call(responseBody, 'result') && errorCode !== '0'
    if (hasError) {
      const isUm = ['S1009', 'E1003'].includes(errorCode)

      if (isUm) {
        this.#isUm = isUm
        this.#dispatch(setUm())
      }

      if (isForceClose) {
        try {
          this.#onForceClose(responseBody)
        } catch (e) {
          this.#error('onForceClose() error', e)
        }
      }

      throw new ApiError(errorCode, errorDescription)
    }

    return responseBody
  }

  #parseResponse = (response) => {
    const { Text } = response || {}
    return JSON.parse(Text)
  }

  // ------------------------------------
  // WS, Connection operate
  // ------------------------------------
  #connect = async ({ url = '', option = null } = {}) => {
    // ensure single connection
    this.#disconnect()

    hub.url = url
    try {
      await hub.start(option)

      this.#isConnected = true
      this.#dispatch(ACTION.getReadyNotify())
    } catch (e) {
      this.#onDisconnect(e)
      throw e
    }
  }

  #disconnect = () => {
    this.#isConnected = false
    hub.stop()
  }

  #sendToServer = async (code, data) =>
    server.SendData(
      code,
      JSON.stringify({
        timeStamp: createTimestamp(),
        content: {
          seq: uuidv4(),
          ...data,
        },
      }),
    )

  // ------------------------------------
  // Helpers
  // ------------------------------------
  #send = (code, data) => {
    this.#log('send', { CmdCode: code, data })

    // check connection
    if (!this.#isConnected) {
      this.#log('disconnected')
      return
    }

    this.#sendToServer(code, data)
  }

  #request = async (code, data) => {
    this.#log('request', { CmdCode: code, data })

    // check connection
    if (!this.#isConnected) {
      this.#log('disconnected')
      return null
    }

    const response = await this.#sendToServer(code, data)
    return this.#onResponse(response)
  }

  #requestWithTimeout = (code, data) =>
    Promise.race([
      new Promise((resolve, reject) => {
        setTimeout(
          () => reject(new Error(`[SignalrApi] cmd code: ${code} timeout`)),
          REQUEST_TIMEOUT,
        )
      }),
      this.#request(code, data),
    ]).catch((e) => {
      this.#onDisconnect(e)
    })

  #log = (...arg) => {
    if (this.#isDebug) {
      console.log('[SignalrApi]', ...arg)
    }
  }

  #error = (...arg) => {
    console.error('[SignalrApi]', ...arg)
  }

  // ------------------------------------
  // Redux
  // ------------------------------------
  createMiddleware = () => {
    this.actionDetailMap = {}
    // save a detailMap of request action type and correspond handler and all actions
    Object.keys(this.#MAPPER.MIDDLEWARE).forEach((key) => {
      const actions = ACTION.actionsMap[key]
      const requestAction = actions?.request

      if (requestAction) {
        this.actionDetailMap[requestAction] = {
          handler: this.#MAPPER.MIDDLEWARE?.[key],
          actions,
        }
      }
    })

    // check action type, if action type listed in actionDetailMap,
    // execute handler and then dispatch success or failure action
    return (store) => {
      this.#store = store

      return (next) => async (action) => {
        next(action)

        const { dispatch } = store
        const { type, payload } = action
        const actionDetail = this.actionDetailMap?.[type]

        let result = null
        if (actionDetail) {
          const { handler, actions } = actionDetail
          try {
            result = await handler?.(payload)

            dispatch(actions.success(result))
          } catch (e) {
            dispatch(actions.failure(e))
            throw e
          }
        }

        return result
      }
    }
  }

  #dispatch = (action) => this.#store?.dispatch(action)

  #getState = () => this.#store?.getState

  // ------------------------------------
  // Implements
  // ------------------------------------
  #login = async (data) => {
    const { url, ...rest } = data

    await this.#connect({ url })

    const result = await this.#request(CMD_CODE.LOGIN_REQUEST, {
      ...rest,
    })

    if (result) {
      await this.#dispatch(ACTION.lobbyInfo())
      this.#dispatch(ACTION.syncTime({ t1: new Date().getTime() }))
    } else {
      throw new Error('[SignalrApi] login error')
    }

    return result
  }

  #lobbyInfo = async (data) => this.#requestWithTimeout(CMD_CODE.LOBBY_INFO_REQUEST, data)

  #userBalance = async (data) => this.#request(CMD_CODE.USER_BALANCE_REQUEST, data)

  #syncTime = async (data) => this.#request(CMD_CODE.SYNC_TIME_REQUEST, data)

  #placeBet = async (data) => this.#request(CMD_CODE.PLACE_BET_REQUEST, data)
}

export default SoccerSignalrApi
