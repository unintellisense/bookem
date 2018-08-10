import { Reducer } from 'redux'
import { ActionTypeKeys, ActionType } from '../../../actionTypes'

export interface ViewBookSearchState {
  currentPageCount: number
  currentSelectedPage: number
}

const defaultViewBookSearchState: () => ViewBookSearchState = () => (
  {
    currentPageCount: 10,
    currentSelectedPage: 1
  })

export const viewBookSearchControlReducer: Reducer<ViewBookSearchState, ActionType> = (state = defaultViewBookSearchState(), action) => {

  if (action.type === ActionTypeKeys.viewBookSearchControlUpdate) { // single action we work against for now
    action.pageCount
    return { ...state, currentPageCount: action.pageCount, currentSelectedPage: action.selectedPage }
  }

  return state;
}