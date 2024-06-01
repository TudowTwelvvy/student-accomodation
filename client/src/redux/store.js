import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'


export const store = configureStore({
  reducer: {user: userReducer},
  

  // this will prevent error in the browser
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

})