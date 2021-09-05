import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';
import {
  EvaluationApi,
  RequestEvaluationBody,
  RequestGetEvaluationResult,
} from '@/services/api';

import { IEvaluation } from './types';

export type EvaluationState = {
  pending: boolean;
  error: boolean;
  evaluations: IEvaluation[];
};

const initialState: EvaluationState = {
  pending: false,
  error: false,
  evaluations: [],
};

export const createEvaluationAsync = createAsyncThunk(
  'evaluation/create',
  async (payload: { data: RequestEvaluationBody }) => {
    const result = await EvaluationApi.createEvaluation(payload.data);
    return result;
  }
);

export const getEvaluationCandidateAsync = createAsyncThunk(
  'evaluation/get',
  async (params: RequestGetEvaluationResult) => {
    try {
      const result = await EvaluationApi.getEvaluationCandidate({
        candidateId: params.candidateId,
        round: params.round,
        teamId: params.teamId,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateEvaluationAsync = createAsyncThunk(
  'evaluation/update',
  async (payload: { evaluationId: string; data: RequestEvaluationBody }) => {
    const result = await EvaluationApi.updateEvaluation(
      payload.evaluationId,
      payload.data
    );
    return result;
  }
);

export const deleteEvaluationAsync = createAsyncThunk(
  'evaluation/delete',
  async (payload: { evaluationId: string }) => {
    await EvaluationApi.deleteEvaluation(payload.evaluationId);
    return payload.evaluationId;
  }
);

export const evaluationSlice = createSlice({
  name: 'evaluation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEvaluationAsync.pending, (state) => {
        state.error = false;
      })
      .addCase(createEvaluationAsync.fulfilled, (state, action) => {
        const result = action.payload;

        if (result) {
          state.evaluations.push(action.payload);
        }
      })
      .addCase(createEvaluationAsync.rejected, (state) => {
        state.error = true;
      });
    //
    builder
      .addCase(getEvaluationCandidateAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getEvaluationCandidateAsync.fulfilled, (state, action) => {
        state.pending = false;
        state.evaluations = action.payload;
      })
      .addCase(getEvaluationCandidateAsync.rejected, (state) => {
        state.error = true;
      });
    // update
    builder
      .addCase(updateEvaluationAsync.pending, (state) => {
        state.error = false;
      })
      .addCase(updateEvaluationAsync.fulfilled, (state, action) => {
        const newEvaluation = action.payload;

        const index = state.evaluations.findIndex(
          (value) => value._id === newEvaluation._id
        );
        state.evaluations[index] = newEvaluation;
      })
      .addCase(updateEvaluationAsync.rejected, (state) => {
        state.error = true;
      });
    //delete
    builder
      .addCase(deleteEvaluationAsync.pending, (state) => {
        state.error = false;
      })
      .addCase(deleteEvaluationAsync.fulfilled, (state, action) => {
        const evaluationId = action.payload;
        const index = state.evaluations.findIndex(
          (value) => value._id === evaluationId
        );

        if (index > -1) {
          state.evaluations.splice(index, 1);
        }
      })
      .addCase(deleteEvaluationAsync.rejected, (state) => {
        state.error = true;
      });
  },
});

export const evaluationStore = (state: RootState) => state.evaluations;
export default evaluationSlice.reducer;
