import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import authReducer from './reducers/auth';
import candidateReducer from './reducers/candidate';
import evaluationReducer from './reducers/evaluation';
import memberReducer from './reducers/member';
import teamReducer from './reducers/team';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    candidate: candidateReducer,
    member: memberReducer,
    teams: teamReducer,
    evaluations: evaluationReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
