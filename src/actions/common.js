export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const setError = (error) => ({ type: SET_ERROR, error });
export const clearError = () => ({ type: CLEAR_ERROR });

export const SHOW_OVERLAY = 'SHOW_OVERLAY';
export const HIDE_OVERLAY = 'HIDE_OVERLAY';
export const showOverlay = () => ({ type: SHOW_OVERLAY });
export const hideOverlay = () => ({ type: HIDE_OVERLAY });
