import { combineReducers } from 'redux';
import CommonReducer from './common';
import ScoreReducer from './score';

const reducers = {
  common: CommonReducer,
  score: ScoreReducer,
};

export default combineReducers(reducers);
