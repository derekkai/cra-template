import { createAction, createSlice } from '@reduxjs/toolkit'

export const sendMessage1 = createAction('webSocket/sendMessage1')
export const sendMessage2 = createAction('webSocket/sendMessage2')

export const slice = createSlice({
  name: 'webSocket',
  initialState: {
    readyState: WebSocket.CLOSED,
  },
  reducers: {
    updateReadyState: (state, { payload }) => {
      state.readyState = payload
    },
  },
})

export const { updateReadyState } = slice.actions
export default slice.reducer
