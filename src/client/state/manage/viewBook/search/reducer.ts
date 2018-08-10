import { Reducer } from 'redux'
import { ActionTypeKeys, ActionType } from '../../../actionTypes'
import { BookSearchDetailOption } from '../../../../models/manageBookSearchOption'

export interface ViewBookSearchState {
  currentPageCount: number
  currentSelectedPage: number
  searchOptions: BookSearchDetailOption[]
  searchPanelExpanded: boolean
}

const defaultViewBookSearchState: () => ViewBookSearchState = () => (
  {
    currentPageCount: 10,
    currentSelectedPage: 1,
    searchOptions: [],
    searchPanelExpanded: true
  })

export const viewBookSearchControlReducer: Reducer<ViewBookSearchState, ActionType> = (state = defaultViewBookSearchState(), action) => {

  switch (action.type) {
    case ActionTypeKeys.viewBookSearchControlUpdate:
      return { ...state, currentPageCount: action.pageCount, currentSelectedPage: action.selectedPage }
    case ActionTypeKeys.viewBookSearchPanelExpanded:
      return { ...state, searchPanelExpanded: action.panelExpanded }
    case ActionTypeKeys.viewBookSearchOptionsUpdate:
      return { ...state, searchOptions: action.searchOptions }
  }

  return state;
}