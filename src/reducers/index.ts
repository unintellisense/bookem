import { combineReducers } from 'redux';
import { userReducer, UserState } from './user';

export interface State {
  userReducer: UserState;
};

export const reducers = combineReducers<State>({
  userReducer
});