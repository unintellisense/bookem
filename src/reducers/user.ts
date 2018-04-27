import { Action, Reducer } from 'redux';

export interface UserProfileState {
  username: string | null;
}

const defaultUserState: () => UserProfileState = () => ({ username: null });

export const userProfileReducer: Reducer<UserProfileState, Action<string>> = (state = defaultUserState(), action) => {
  // Later on we will have a switch statement to replace state on changes. might want to change action generic type to a enum of actions
  return state;
}