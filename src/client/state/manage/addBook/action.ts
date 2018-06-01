import { ActionCreator, Action, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState, ActionTypeKeys } from '../../index'
import { IBook } from '../../../../shared/dto/ibook';
import { postBook } from '../../../services/inventoryService';

export const saveAddBookFieldsAction = (book: IBook) => {
  return (dispatch: Dispatch) => {
    return dispatch({
      type: ActionTypeKeys.addBookSaveFormState,
      book
    })
  }
}

export const postBookAction = (book: IBook) => {
  return async (dispatch: Dispatch): Promise<Action> => {
    try {
      var something = await postBook(book);

      return dispatch({
        type: ActionTypeKeys.addBookSuccess,
        payload: something.toString()
      });
    } catch (e) {
      return dispatch({
        type: ActionTypeKeys.addBookFailure,
      });
    }
  };
};