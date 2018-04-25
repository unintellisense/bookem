import { Action } from 'redux';
export interface UserProfileState {
  username: string | null;
}

const defaultUserState: () => UserProfileState = () => ({
  username: null
});

export const userProfileReducer = (state = defaultUserState(), action: Action<string>) => {
  // Later on we will have a switch statement to replace state on changes. might want to change action generic type to a enum of actions
  return state;
}