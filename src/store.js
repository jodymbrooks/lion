import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import combinedReducers from './reducers';

const loggerMiddleware = createLogger();

const enhancer = compose(
  applyMiddleware(
    loggerMiddleware
  )
);

export default function configureStore(initialState) {
  const store = createStore(combinedReducers, initialState, enhancer);

  return store;
}
