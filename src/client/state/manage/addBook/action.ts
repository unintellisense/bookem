import { ActionCreator, Action, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState, ActionTypeKeys } from '../../index'
import { IBook } from '../../../../shared/dto/ibook';
import { postBook } from '../../../services/inventoryService';

const alertMessageLengthMillis = 3000;

export const saveAddBookFieldsAction = (book: IBook) => {
  return (dispatch: Dispatch) => {
    return dispatch({
      type: ActionTypeKeys.addBookSaveFormState,
      book
    })
  }
}

let clearAddBookAlert; // stores setTimeout value

export const postBookAction = (book: IBook) => {
  return async (dispatch: Dispatch): Promise<Action> => {
    try {
      var something = await postBook(book);

      return dispatch({
        type: ActionTypeKeys.addBookSuccess,
        book: something.data
      });
    } catch (e) {
      return dispatch({
        type: ActionTypeKeys.addBookFailure,
        error: e.response.data
      });
    } finally { // clear alerts after timeout, cancel any possibly pending timeout 
      clearTimeout(clearAddBookAlert);
      clearAddBookAlert = setTimeout(() => {
        dispatch({ type: ActionTypeKeys.addBookClearAlert });
      }, alertMessageLengthMillis);
    }
  };
};