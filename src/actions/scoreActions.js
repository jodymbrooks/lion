import { showOverlay, hideOverlay } from './commonActions';
import { checkAvailableMatches, clearKeptCards, dealCards,  } from './cardsActions';

export const UPDATE_PLAYER_NAME = 'UPDATE_PLAYER_NAME';
export const updatePlayerName = (user, index) => ({ type: UPDATE_PLAYER_NAME, user, index });

export const SWITCH_USER = 'SWITCH_USER';
export const switchUser = () => ({ type: SWITCH_USER });

export const UPDATE_SCORE_FROM_MATCHES = 'UPDATE_SCORE_FROM_MATCHES';
export const updateScoreFromMatches = (tableCards, matchingAttrs) => ({ type: UPDATE_SCORE_FROM_MATCHES, tableCards, matchingAttrs });

export const KEEP_SCORE = 'KEEP_SCORE';
export const keepScore = () => ({ type: KEEP_SCORE });

export function keepScoreAndFollowUp() {
    return (dispatch) => {
        dispatch(keepScore());
        dispatch(clearKeptCards());
        dispatch(showOverlay());
        setTimeout(() => {
            dispatch(dealCards());
            dispatch(checkAvailableMatches());
            dispatch(switchUser());
            dispatch(hideOverlay());
        }, 300);
    };
}
