import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'global',
  initialState: {
    theme: true,
    flag: false,
    flag2: false,
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
  },
})

export const { setFlag, setFlag2, setTheme } = slice.actions
export default slice.reducer
