import * as actions from '../actions/common';

const initialState = {
  error: null,
  overlayShown: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.SET_ERROR:
      state = { ...state, error: action.error };
      return state;
    case actions.CLEAR_ERROR:
      state = { ...state, error: null };
      return state;
    case actions.SHOW_OVERLAY:
      state = { ...state, overlayShown: true };
      return state;
    case actions.HIDE_OVERLAY:
      state = { ...state, overlayShown: false };
      return state;
    default:
      return state;
  }
}
