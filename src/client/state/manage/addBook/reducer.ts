import { Action, Reducer } from 'redux';
import { ActionTypeKeys, ActionType } from '../../actionTypes'
import { IBook } from '../../../../shared/dto/ibook';

export interface AddBookState {
  book: IBook
}

const defaultAddBookState: () => AddBookState = () => ({ book: { title: '', isFiction: false }, alertMessage: {} });

export const addBookReducer: Reducer<AddBookState, ActionType> = (state = defaultAddBookState(), action) => {

  switch (action.type) {
    case ActionTypeKeys.addBookSuccess:

      return {
        ...state,
        book: { title: '', isFiction: false, description: '' }
      }

    case ActionTypeKeys.addBookSaveFormState:
      return { ...state, book: action.book }
  }

  // Later on we will have a switch statement to replace state on changes. might want to change action generic type to a enum of actions
  return state;
}