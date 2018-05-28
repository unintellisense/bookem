import { combineReducers } from 'redux';
import { AddBookState, addBookReducer } from './addBook'

export interface ManageState {
  addBook: AddBookState
};

export const manageReducers = combineReducers<ManageState>({
  addBook: addBookReducer
});