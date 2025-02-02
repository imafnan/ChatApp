import { createSlice } from '@reduxjs/toolkit';

export const ChatUserSlice = createSlice({
  name: 'chatUser',
  initialState: {
    value: null,
  },
  reducers: {
    setChatUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setChatUser } = ChatUserSlice.actions;
export default ChatUserSlice.reducer;
