import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';
import { login } from '@/services/api/auth';

export type AuthState = {
  pending: boolean;
  error: boolean;
};

const initialState: AuthState = {
  pending: false,
  error: false,
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }) => {
    try {
      const result = await login(payload.email, payload.password);
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(loginAsync.fulfilled, (state) => {
        state.pending = false;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});
export const authStore = (state: RootState) => state.authReducer;
export default authSlice.reducer;
