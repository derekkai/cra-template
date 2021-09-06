import { createSlice, createAction } from '@reduxjs/toolkit'

export const getData = createAction('global/getData')

export const slice = createSlice({
  name: 'global',
  initialState: {
    theme: true,
    flag: false,
    flag2: false,
    message: '',
  },
  reducers: {
    setTheme: (state, { payload }) => {
      state.theme = !state.theme
    },

    setFlag: (state, { payload }) => {
      state.flag = !state.flag
    },
    setFlag2: (state, { payload }) => {
      state.flag2 = !state.flag2
    },
    setUser: (state, { payload }) => {
      console.log(payload)
    },
    updateMessage: (state, { payload }) => {
      console.log(payload)
      state.message = payload
    },
  },
})

export const { setFlag, setFlag2, setTheme, setUser, updateMessage } = slice.actions
export default slice.reducer
