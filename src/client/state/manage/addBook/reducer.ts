import { Action, Reducer } from 'redux';
import { ActionTypeKeys, ActionType } from '../../actionTypes'
import { IBook } from '../../../../shared/dto/ibook';

export interface AddBookState {
  book: IBook
  alertMessage: {
    alertText?: string
    alertStyle?: "success" | "warning" | "danger" | "info" | undefined
  }
}

const defaultAddBookState: () => AddBookState = () => ({ book: { title: '', isFiction: false }, alertMessage: {} });

export const addBookReducer: Reducer<AddBookState, ActionType> = (state = defaultAddBookState(), action) => {

  switch (action.type) {
    case ActionTypeKeys.addBookSuccess:

      return {
        ...state,
        book: { title: '', isFiction: false, description: '' },
        alertMessage: {
          alertText: `Added book '${action.book.title}'`,
          alertStyle: 'success'
        }
      }

    case ActionTypeKeys.addBookFailure:
      return {
        ...state,
        alertMessage: {
          alertText: `failed to add book:  ${action.error}`,
          alertStyle: 'danger'
        }
      }
    case ActionTypeKeys.addBookSaveFormState:
      return { ...state, book: action.book }
  }

  // Later on we will have a switch statement to replace state on changes. might want to change action generic type to a enum of actions
  return state;
}