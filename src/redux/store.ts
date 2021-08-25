import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import candidateReducer from './reducers/candidate';
import teamReducer from './reducers/team';

export const store = configureStore({
  reducer: {
    users: candidateReducer,
    teams: teamReducer,
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
