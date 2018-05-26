import { Action, Reducer } from 'redux';
import { IBook } from '../../shared/dto/ibook';
export interface ManageState {
  addBook: Partial<IBook>
}

const defaultManageState: () => ManageState = () => ({ addBook: {} });

export const manageReducer: Reducer<ManageState, Action<string>> = (state = defaultManageState(), action) => {

  switch (action.type) { 
    
  }
  // Later on we will have a switch statement to replace state on changes. might want to change action generic type to a enum of actions
  return state;
}