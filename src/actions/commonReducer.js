import * as commonActions from "./commonActions";

const initialState = {
  error: null,
  overlayShown: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case commonActions.SET_ERROR:
      state = { ...state, error: action.error };
      return state;
    case commonActions.CLEAR_ERROR:
      state = { ...state, error: null };
      return state;
    case commonActions.SHOW_OVERLAY:
      state = { ...state, overlayShown: true };
      return state;
    case commonActions.HIDE_OVERLAY:
      state = { ...state, overlayShown: false };
      return state;
    default:
      return state;
  }
}
