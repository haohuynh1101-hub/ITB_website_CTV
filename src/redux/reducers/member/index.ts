import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';
import {
  RequestCandidateBody,
  RequestParamsUser,
  UsersApi,
} from '@/services/api/candidate';

import { ICandidate } from '../candidate/type';

export type MemberState = {
  pending: boolean;
  error: boolean;
  members: ICandidate[];
  member: ICandidate;
};

const initialState: MemberState = {
  pending: false,
  error: false,
  members: [],
  member: null,
};

export const createMemberAsync = createAsyncThunk(
  'member/create',
  async (payload: { data: RequestCandidateBody }) => {
    const result = await UsersApi.createCandidate(payload.data);
    return result;
  }
);

export const getMembersAsync = createAsyncThunk(
  'member/get',
  async (params?: RequestParamsUser) => {
    const result = await UsersApi.getUsers(params);
    return result;
  }
);

export const getMemberDetailAsync = createAsyncThunk(
  'member/get/id',
  async (userId: string) => {
    const result = await UsersApi.getUserDetail(userId);
    return result;
  }
);

export const updateMemberAsync = createAsyncThunk(
  'member/update',
  async (payload: { memberId: string; data: RequestCandidateBody }) => {
    const result = await UsersApi.updateUser(payload.memberId, {
      ...payload.data,
    });
    return result;
  }
);

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMemberAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(createMemberAsync.fulfilled, (state, action) => {
        state.pending = false;
        const result = action.payload;
        if (result) {
          state.members.push(action.payload);
        }
      })
      .addCase(createMemberAsync.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
    //
    builder
      .addCase(getMembersAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getMembersAsync.fulfilled, (state, action) => {
        state.pending = false;
        state.members = action.payload;
      })
      .addCase(getMembersAsync.rejected, (state) => {
        state.members = [];
        state.error = true;
      });
    //update
    builder
      .addCase(updateMemberAsync.pending, (state) => {
        state.error = false;
      })
      .addCase(updateMemberAsync.fulfilled, (state, action) => {
        const newMember = action.payload;

        const index = state.members.findIndex(
          (value) => value._id === newMember._id
        );
        state.members[index] = newMember;
      })
      .addCase(updateMemberAsync.rejected, (state) => {
        state.error = true;
      });
    //get detail
    builder
      .addCase(getMemberDetailAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getMemberDetailAsync.fulfilled, (state, action) => {
        state.pending = false;
        const member = action.payload;
        state.member = member;
      })
      .addCase(getMemberDetailAsync.rejected, (state) => {
        state.members = [];
        state.error = true;
      });
    //
  },
});

export const memberStore = (state: RootState) => state.member;
export default memberSlice.reducer;
