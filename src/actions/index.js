import { combineReducers } from 'redux';
import commonReducer from './commonReducer';
import scoreReducer from './scoreReducer';
import cardsReducer from './cardsReducer';


const reducers = {
  common: commonReducer,
  cards: cardsReducer,
  score: scoreReducer,
};

export default combineReducers(reducers);
