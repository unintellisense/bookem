import { Action } from 'redux';
import { IBook } from '../../shared/dto/ibook'
export const enum ActionTypeKeys {
  addBookSuccess,  
  addBookSaveFormState
};

export type ActionType =
  { type: ActionTypeKeys.addBookSuccess, book: IBook } |    
  { type: ActionTypeKeys.addBookSaveFormState, book: IBook }

