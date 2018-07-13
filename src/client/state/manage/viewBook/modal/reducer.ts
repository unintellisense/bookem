import { Reducer } from 'redux'
import { ActionTypeKeys, ActionType } from '../../../actionTypes'
import { Book } from '../../../../models/book'

export interface ViewBookModalState {
  editedBook: Book | null
  editedBookPartialCategory: string
}

const defaultViewBookModalState: () => ViewBookModalState = () => ({ searchedBooks: [], lastRefreshedBooks: -1, editedBook: null, editedBookPartialCategory: '' })

export const viewBookModalReducer: Reducer<ViewBookModalState, ActionType> = (state = defaultViewBookModalState(), action) => {

  switch (action.type) {
    case ActionTypeKeys.updateEditedBook:
      return { ...state, editedBook: action.book }
    case ActionTypeKeys.resetEditedBook:
      return { ...state, editedBook: null, editedBookPartialCategory: '' }
    case ActionTypeKeys.updateEditedBookPartialCategory:
      return { ...state, editedBookPartialCategory: action.tag }
    case ActionTypeKeys.resetViewBook:
      // reset searchedBooks and lastRefreshedBooks, the latter will result in the component refreshing the list
      return { ...state, editedBook: null, editedBookPartialCategory: '' }
  }

  return state;
}