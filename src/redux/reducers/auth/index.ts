import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Nookies from 'nookies';

import { APP_CONSTANTS } from '@/constants';
import { RootState } from '@/redux/store';
import { AuthApi } from '@/services/api';

import { ICandidate } from '../candidate/type';

export type AuthState = {
  pending: boolean;
  user: ICandidate;
};

const initialState: AuthState = {
  pending: false,
  user: null,
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }) => {
    try {
      const result: Promise<{ token: string }> = await AuthApi.login(
        payload.email,
        payload.password
      );

      Nookies.set(undefined, APP_CONSTANTS.AUTH, (await result).token, {
        path: '/',
      });
      localStorage.setItem(APP_CONSTANTS.AUTH, (await result).token);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getMeAsync = createAsyncThunk('auth/getMe', async () => {
  const result = await AuthApi.getMe();

  return result;
});

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMeAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getMeAsync.fulfilled, (state, action) => {
        state.pending = false;
        state.user = action.payload;
      })
      .addCase(getMeAsync.rejected, (state) => {
        state.pending = false;
        state.user = null;
      });
  },
});
export const authStore = (state: RootState) => state.auth;
export default authSlice.reducer;
