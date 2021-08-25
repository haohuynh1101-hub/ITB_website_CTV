import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';
import {
  createTeam,
  getTeams,
  RequestTeamBody,
  updateTeam,
} from '@/services/api';

import { ITeam } from './type';

export type TeamState = {
  pending: boolean;
  teams: ITeam[];
};

const initialState: TeamState = {
  pending: false,
  teams: [],
};

export const createTeamAsync = createAsyncThunk(
  'team/create',
  async (payload: { data: RequestTeamBody }) => {
    try {
      const result = await createTeam(payload.data);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getTeamsAsync = createAsyncThunk('team/get', async () => {
  try {
    const result = await getTeams();
    return result;
  } catch (error) {
    console.log(error);
  }
});

export const updateTeamAsync = createAsyncThunk(
  'candidate/update',
  async (payload: { teamId: string; data: RequestTeamBody }) => {
    try {
      const result = await updateTeam(payload.teamId, payload.data);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);

export const teamSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTeamAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(createTeamAsync.fulfilled, (state, action) => {
        state.pending = false;
        state.teams.push(action.payload);
      })
      .addCase(createTeamAsync.rejected, (state) => {
        state.pending = false;
      });
    //
    builder
      .addCase(getTeamsAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getTeamsAsync.fulfilled, (state, action) => {
        state.pending = false;
        state.teams = action.payload;
      })
      .addCase(getTeamsAsync.rejected, (state) => {
        state.teams = [];
      });
    //
    builder
      .addCase(updateTeamAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(updateTeamAsync.fulfilled, (state, action) => {
        state.pending = false;
        const newTeam = action.payload;

        const index = state.teams.findIndex(
          (value) => value._id === newTeam._id
        );
        state.teams[index] = newTeam;
      })
      .addCase(updateTeamAsync.rejected, (state) => {
        state.teams = [];
      });
  },
});

export const teamStore = (state: RootState) => state.teams;
export default teamSlice.reducer;
