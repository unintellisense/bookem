import { combineReducers } from 'redux';
import { AddBookState, addBookReducer } from './addBook/reducer'

export interface ManageState {
  addBook: AddBookState
};

export const manageReducers = combineReducers<ManageState>({
  addBook: addBookReducer
});