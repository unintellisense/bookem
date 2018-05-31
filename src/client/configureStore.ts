import { appReducers } from './state';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from "redux-thunk";

export function configureStore() {
  return createStore(appReducers, applyMiddleware(thunkMiddleware));
}