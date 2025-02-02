import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';
import chatUserReducer from './Slice/ChatUserSlice';

export default configureStore({
  reducer: {
    authUser: authReducer, 
    ChatUserData: chatUserReducer, 
  },
});
