import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';
import {
  createCandidate,
  getCandidates,
  RequestCandidateBody,
  updateCandidate,
} from '@/services/api/candidate';

import { ICandidate } from './type';

export type CandidateState = {
  pending: boolean;
  error: boolean;
  candidates: ICandidate[];
  supporters: ICandidate[];
};

const initialState: CandidateState = {
  pending: false,
  error: false,
  candidates: [],
  supporters: [],
};

export const createCandidateAsync = createAsyncThunk(
  'candidate/create',
  async (payload: { data: RequestCandidateBody }) => {
    try {
      const result = await createCandidate(payload.data);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCandidatesAsync = createAsyncThunk(
  'candidate/get',
  async () => {
    try {
      const result = await getCandidates();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCandidatesAsync = createAsyncThunk(
  'candidate/update',
  async (payload: { candidateId: string; data: RequestCandidateBody }) => {
    try {
      const result = await updateCandidate(payload.candidateId, payload.data);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);

export const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCandidateAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(createCandidateAsync.fulfilled, (state, action) => {
        state.pending = false;
        state.candidates.push(action.payload);
      })
      .addCase(createCandidateAsync.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
    //
    builder
      .addCase(getCandidatesAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getCandidatesAsync.fulfilled, (state, action) => {
        state.pending = false;
        const users = action.payload;
        state.candidates = users.filter((user) => user.role === 'CANDIDATE');
        state.supporters = users.filter((user) => user.role === 'SUPPORTER');
      })
      .addCase(getCandidatesAsync.rejected, (state) => {
        state.candidates = [];
        state.error = true;
      });
    //
    builder
      .addCase(updateCandidatesAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(updateCandidatesAsync.fulfilled, (state, action) => {
        state.pending = false;
        const newCandidate = action.payload;

        const index = state.candidates.findIndex(
          (value) => value._id === newCandidate._id
        );
        state.candidates[index] = newCandidate;
      })
      .addCase(updateCandidatesAsync.rejected, (state) => {
        state.candidates = [];
        state.error = true;
      });
  },
});

export const candidateStore = (state: RootState) => state.users;
export default candidateSlice.reducer;
