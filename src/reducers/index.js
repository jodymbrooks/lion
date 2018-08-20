import { combineReducers } from 'redux';
import commonReducer from './commonReducer';
import scoreReducer from './scoreReducer';


const reducers = {
  common: commonReducer,
  score: scoreReducer,
};

export default combineReducers(reducers);
