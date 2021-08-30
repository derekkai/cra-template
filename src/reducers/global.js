import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'global',
  initialState: {
    flag: false,
    flag2: false,
  },
  reducers: {
    setFlag: (state, { payload }) => {
      state.flag = !state.flag
    },
    setFlag2: (state, { payload }) => {
      state.flag2 = !state.flag2
    },
  },
})

export const { setFlag, setFlag2 } = slice.actions
export default slice.reducer
