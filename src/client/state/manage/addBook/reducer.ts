import { Action, Reducer } from 'redux'
import { ActionTypeKeys, ActionType } from '../../actionTypes'
import { Book } from '../../../models/book'

export interface AddBookState {
  book: Book
}

const defaultAddBookState: () => AddBookState = () => ({ book: Book.GetDefaultBook() });

export const addBookReducer: Reducer<AddBookState, ActionType> = (state = defaultAddBookState(), action) => {

  switch (action.type) {
    case ActionTypeKeys.addBookSuccess:

      return {
        book: Book.GetDefaultBook()
      }

    case ActionTypeKeys.addBookSaveFormState:
      return { book: action.book }
  }

  // Later on we will have a switch statement to replace state on changes. might want to change action generic type to a enum of actions
  return state;
}