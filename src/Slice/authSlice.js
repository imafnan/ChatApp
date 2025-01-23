import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: JSON.parse(localStorage.getItem('currentUser'))?JSON.parse(localStorage.getItem('currentUser')):null,
  },
  reducers: {
    UserLoginData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { UserLoginData } = authSlice.actions;
export default authSlice.reducer;
