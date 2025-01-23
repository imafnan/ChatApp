import { configureStore } from '@reduxjs/toolkit'
import UserLoginData   from './Slice/authSlice'

export default configureStore({
  reducer: {
    authUser:UserLoginData 
  },
})