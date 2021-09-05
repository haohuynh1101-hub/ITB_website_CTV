import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';
import {
  createTeam,
  getTeamDetail,
  getTeams,
  RequestTeamBody,
  updateTeam,
} from '@/services/api';

import { ITeam } from './type';

export type TeamState = {
  pending: boolean;
  error: boolean;
  teams: ITeam[];
  team: ITeam;
};

const initialState: TeamState = {
  pending: false,
  error: false,
  teams: [],
  team: null,
};

export const createTeamAsync = createAsyncThunk(
  'team/create',
  async (payload: { data: RequestTeamBody }) => {
    const result = await createTeam(payload.data);
    return result;
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

export const getTeamDetailAsync = createAsyncThunk(
  'team/get/id',
  async (teamId: string) => {
    const result = await getTeamDetail(teamId);
    return result;
  }
);

export const updateTeamAsync = createAsyncThunk(
  'team/update',
  async (payload: { teamId: string; data: RequestTeamBody }) => {
    const result = await updateTeam(payload.teamId, payload.data);
    return result;
  }
);

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTeamAsync.pending, (state) => {
        state.error = false;
      })
      .addCase(createTeamAsync.fulfilled, (state, action) => {
        const result = action.payload;

        if (result) {
          state.teams.push(action.payload);
        }
      })
      .addCase(createTeamAsync.rejected, (state) => {
        state.error = true;
      });
    //get all teams
    builder
      .addCase(getTeamsAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getTeamsAsync.fulfilled, (state, action) => {
        state.pending = false;
        state.teams = action.payload;
      })
      .addCase(getTeamsAsync.rejected, (state) => {
        state.error = true;
      });
    //get team detail
    builder
      .addCase(getTeamDetailAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getTeamDetailAsync.fulfilled, (state, action) => {
        state.pending = false;
        state.team = action.payload;
      })
      .addCase(getTeamDetailAsync.rejected, (state) => {
        state.team = null;
        state.error = true;
      });
    //update team
    builder
      .addCase(updateTeamAsync.pending, (state) => {
        state.error = false;
      })
      .addCase(updateTeamAsync.fulfilled, (state, action) => {
        const newTeam = action.payload;

        const index = state.teams.findIndex(
          (value) => value._id === newTeam._id
        );
        state.teams[index] = newTeam;
      })
      .addCase(updateTeamAsync.rejected, (state) => {
        state.error = true;
      });
  },
});

export const teamStore = (state: RootState) => state.teams;
export default teamSlice.reducer;
