import { Reducer } from 'redux'
import { ActionTypeKeys, ActionType } from '../../../actionTypes'
import { Book } from '../../../../models/book'

export interface ViewBookPageState {
  searchedBooks: Book[]
  searchBooksCount: number
}

const defaultViewBookPageState: () => ViewBookPageState = () => ({ searchedBooks: [], searchBooksCount: 0, lastRefreshedBooks: -1, editedBook: null })

export const viewBookPageReducer: Reducer<ViewBookPageState, ActionType> = (state = defaultViewBookPageState(), action) => {

  switch (action.type) {
    case ActionTypeKeys.viewBookSearchedBooksUpdate:
      return { ...state, searchedBooks: action.searchedBooks, searchBooksCount: action.searchedBooksCount }
  }

  return state;
}