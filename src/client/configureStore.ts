import { reducers } from './reducers';
import { createStore } from 'redux';

export function configureStore() {
  return createStore(reducers);
}