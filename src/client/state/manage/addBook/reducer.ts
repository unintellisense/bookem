import { Action, Reducer } from 'redux';
import { ActionTypeKeys, ActionType } from '../../actionTypes'
import { IBook } from '../../../../shared/dto/ibook';

export interface AddBookState {
  book: Partial<IBook>
}

const defaultAddBookState: () => AddBookState = () => ({ book: {} });

export const addBookReducer: Reducer<AddBookState, ActionType> = (state = defaultAddBookState(), action) => {

  switch (action.type) {
    case ActionTypeKeys.addBookSuccess:
      console.log(`success: ${action.payload}`)
      break;
    case ActionTypeKeys.addBookFailure:
      console.log(`error: ${action.error}`)
      break;
  }

  // Later on we will have a switch statement to replace state on changes. might want to change action generic type to a enum of actions
  return state;
}