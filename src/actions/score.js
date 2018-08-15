export const KEEP_SCORE = 'KEEP_SCORE';
export const keepScore = () => ({ type: KEEP_SCORE });

export const SET_SCORE = 'SET_SCORE';
export const setScore = (possPoints, matchingAttrs) => ({ type: SET_SCORE, possPoints, matchingAttrs });

export const INCREMENT_SCORE = 'INCREMENT_SCORE';
export const incrementScore = (score) => ({ type: INCREMENT_SCORE, score });
