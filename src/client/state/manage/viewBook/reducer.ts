import { combineReducers } from 'redux'
import { viewBookModalReducer, ViewBookModalState } from './modal/reducer'
import { viewBookPageReducer, ViewBookPageState } from './page/reducer'

export interface ViewBookState {
  modal: ViewBookModalState
  page: ViewBookPageState
}

export const viewBookReducer = combineReducers<ViewBookState>({
  modal: viewBookModalReducer,
  page: viewBookPageReducer
});