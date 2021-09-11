import { useInjectReducer, useInjectSaga } from 'redux-injectors'
import { createSlice } from '@reduxjs/toolkit'
import saga from './saga'

const slice = createSlice({
  name: 'login',
  initialState: {
    login: false,
  },
  reducers: {
    setLogin: (state, { payload }) => {
      state.login = !state.login
    },
  },
})

const useInjections = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer })
  useInjectSaga({ key: slice.name, saga })
}

export const { actions } = slice
export default useInjections
