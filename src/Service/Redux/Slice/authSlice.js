import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  role: '',
  user: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.role; 
      state.user = action.payload.user; 
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = '';
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice
