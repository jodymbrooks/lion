import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';


import combinedReducers from './reducers';

const loggerMiddleware = createLogger();

const enhancer = compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

export default function configureStore(initialState) {
  const store = createStore(combinedReducers, initialState, enhancer);

  return store;
}
