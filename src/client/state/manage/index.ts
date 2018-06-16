import { combineReducers } from 'redux';
import { AddBookState, addBookReducer } from './addBook/reducer'

import { viewBookReducer, ViewBookState } from './viewBook/reducer'
export interface ManageState {
  addBook: AddBookState
  viewBook: ViewBookState
};

export const manageReducers = combineReducers<ManageState>({
  addBook: addBookReducer,
  viewBook: viewBookReducer
});