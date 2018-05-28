import { combineReducers } from 'redux';
import { userReducer, UserState } from './user';
import { ManageState, manageReducers } from './manage'
export interface AppState {
  user: UserState
  manage: ManageState
};

export const reducers = combineReducers<AppState>({
  user: userReducer,
  manage: manageReducers
});