import { Reducer } from 'redux'
import { ActionTypeKeys, ActionType } from '../../../actionTypes'
import { Book } from '../../../../models/book'

export interface ViewBookPageState {
  searchBooks: Book[]
  searchBooksCount: number
}

const defaultViewBookPageState: () => ViewBookPageState = () => ({ searchBooks: [], searchBooksCount: 0, lastRefreshedBooks: -1, editedBook: null })

export const viewBookPageReducer: Reducer<ViewBookPageState, ActionType> = (state = defaultViewBookPageState(), action) => {

  switch (action.type) {
    case ActionTypeKeys.viewBookSearchedBooksUpdate:
      return { ...state, searchBooks: action.searchedBooks, searchBooksCount: action.searchedBooksCount }
  }

  return state;
}