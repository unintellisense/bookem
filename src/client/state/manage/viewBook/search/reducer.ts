import { Reducer } from 'redux'
import { ActionTypeKeys, ActionType } from '../../../actionTypes'
import { BookSearchDetailOption } from '../../../../models/manageBookSearchOption'

export interface ViewBookSearchState {
  rowsPerPage: number
  selectedPage: number
  searchOptions: BookSearchDetailOption[]
  searchPanelExpanded: boolean
}

const defaultViewBookSearchState: () => ViewBookSearchState = () => (
  {
    rowsPerPage: 10,
    selectedPage: 1,
    searchOptions: [],
    searchPanelExpanded: true
  })

export const viewBookSearchControlReducer: Reducer<ViewBookSearchState, ActionType> = (state = defaultViewBookSearchState(), action) => {

  switch (action.type) {
    case ActionTypeKeys.viewBookSearchControlUpdate:
      return { ...state, rowsPerPage: action.rowsPerPage, selectedPage: action.selectedPage }
    case ActionTypeKeys.viewBookSearchPanelExpanded:
      return { ...state, searchPanelExpanded: action.panelExpanded }
    case ActionTypeKeys.viewBookSearchOptionsUpdate:
      return { ...state, searchOptions: action.searchOptions }
    case ActionTypeKeys.viewBookSearchResetOptions:
      return { ...defaultViewBookSearchState(), searchPanelExpanded: state.searchPanelExpanded } // dont reset expanded state
  }

  return state;
}