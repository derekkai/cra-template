import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'global',
  initialState: {
    flag: false,
  },
  reducers: {
    setFlag: (state, { payload }) => {
      state.flag = !state.flag
    },
  },
})

export const { setFlag } = slice.actions
export default slice.reducer
