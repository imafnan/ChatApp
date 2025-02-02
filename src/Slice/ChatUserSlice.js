import { createSlice } from '@reduxjs/toolkit';

export const ChatUserSlice = createSlice({
  name: 'chatUser',
  initialState: {
    value: JSON.parse(localStorage.getItem('chatUser')) ?JSON.parse(localStorage.getItem('chatUser')) : null
  },
  reducers: {
    ChatUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { ChatUser } = ChatUserSlice.actions;
export default ChatUserSlice.reducer;
