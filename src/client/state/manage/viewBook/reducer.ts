import { combineReducers } from 'redux'
import { viewBookModalReducer, ViewBookModalState } from './modal/reducer'
import { viewBookPageReducer, ViewBookPageState } from './page/reducer'
import { ViewBookSearchState, viewBookSearchControlReducer } from './search/reducer'
export interface ViewBookState {
  modal: ViewBookModalState
  page: ViewBookPageState
  search: ViewBookSearchState
}

export const viewBookReducer = combineReducers<ViewBookState>({
  modal: viewBookModalReducer,
  page: viewBookPageReducer,
  search: viewBookSearchControlReducer
});