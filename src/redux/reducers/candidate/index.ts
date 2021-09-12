import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';
import { url } from '@/services/api/api-config';
import {
  createCandidate,
  getCandidateDetail,
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
  candidate: ICandidate;
};

const initialState: CandidateState = {
  pending: false,
  error: false,
  candidates: [],
  supporters: [],
  candidate: null,
};

export const createCandidateAsync = createAsyncThunk(
  'candidate/create',
  async (payload: { data: RequestCandidateBody }) => {
    const result = await createCandidate(payload.data);
    return result;
  }
);

export const getCandidatesAsync = createAsyncThunk(
  'candidate/get',
  async () => {
    const result = await getCandidates();
    return result;
  }
);

export const getCandidateDetailAsync = createAsyncThunk(
  'candidate/get/id',
  async (userId: string) => {
    const result = await getCandidateDetail(userId);
    return result;
  }
);

export const updateCandidatesAsync = createAsyncThunk(
  'candidate/update',
  async (payload: { candidateId: string; data: RequestCandidateBody }) => {
    const result = await updateCandidate(payload.candidateId, payload.data);
    return result;
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
        const result = action.payload;
        if (result) {
          state.candidates.push(action.payload);
        }
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
    //update
    builder
      .addCase(updateCandidatesAsync.pending, (state) => {
        state.error = false;
      })
      .addCase(updateCandidatesAsync.fulfilled, (state, action) => {
        const newCandidate = action.payload;

        const index = state.candidates.findIndex(
          (value) => value._id === newCandidate._id
        );
        state.candidates[index] = newCandidate;
      })
      .addCase(updateCandidatesAsync.rejected, (state) => {
        state.error = true;
      });
    //get detail
    builder
      .addCase(getCandidateDetailAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getCandidateDetailAsync.fulfilled, (state, action) => {
        state.pending = false;
        const candidate = action.payload;
        state.candidate = candidate;
      })
      .addCase(getCandidateDetailAsync.rejected, (state) => {
        state.candidates = [];
        state.error = true;
      });
    //
  },
});

export const candidateStore = (state: RootState) => state.users;
export default candidateSlice.reducer;
