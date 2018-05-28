import { combineReducers } from 'redux';
import { userReducer, UserState } from './user';
import { ManageState, manageReducers } from './manage'
export interface State {
  user: UserState
  manage: ManageState
};

export const reducers = combineReducers<State>({
  user: userReducer,
  manage: manageReducers
});