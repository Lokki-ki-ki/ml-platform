import { configureStore } from '@reduxjs/toolkit'
import loginAccountReducer from './loginAccountSlice'
import contractsReducer from './contractsSlice'
import submissionsReducer from './submissionsSlice'

export default configureStore({
  reducer: {
    loginAccount: loginAccountReducer,
    contracts: contractsReducer,
    submissions: submissionsReducer
  }
})