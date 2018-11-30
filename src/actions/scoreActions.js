import { showOverlay, hideOverlay } from './commonActions';
import utilities from '../utilities';

export const DEAL_CARDS = 'DEAL_CARDS';
export const dealCards = () => ({ type: DEAL_CARDS });

export const CARD_FLIPPED = 'CARD_FLIPPED';
export const cardFlipped = (cardKey) => ({ type: CARD_FLIPPED, cardKey });

export const CHECK_MATCHES = 'CHECK_MATCHES';
export const checkMatches = (tableCards) => ({ type: CHECK_MATCHES, tableCards });

export const UPDATE_SCORE_FROM_MATCHES = 'UPDATE_SCORE_FROM_MATCHES';
export const updateScoreFromMatches = (tableCards) => ({ type: UPDATE_SCORE_FROM_MATCHES, tableCards });

export const KEEP_SCORE = 'KEEP_SCORE';
export const keepScore = () => ({ type: KEEP_SCORE });

export const SET_SCORE = 'SET_SCORE';
export const setScore = (possPoints, matchingAttrs) => ({ type: SET_SCORE, possPoints, matchingAttrs });

export const INCREMENT_SCORE = 'INCREMENT_SCORE';
export const incrementScore = (score) => ({ type: INCREMENT_SCORE, score });

export const RESET_FLIPPED_CARDS = 'RESET_FLIPPED_CARDS';
export const resetFlippedCards = () => ({ type: RESET_FLIPPED_CARDS });

export const CLEAR_KEPT_CARDS = 'CLEAR_KEPT_CARDS';
export const clearKeptCards = () => ({ type: CLEAR_KEPT_CARDS });

export function cardFlippedAndFollowUp(cardKey) {
    return (dispatch, getState) => {
        dispatch(cardFlipped(cardKey));

        const tableCards = getState().score.tableCards;
        dispatch(checkMatches(tableCards));

        const matchingAttrs = getState().score.matchingAttrs;

        dispatch(updateScoreFromMatches(tableCards));

        const selectedCards = utilities.getSelectedCards(tableCards);
        const isMatch = selectedCards.length === 1 || matchingAttrs.length > 0;

        if (!isMatch) {
            dispatch(showOverlay());
            setTimeout(() => {
                dispatch(resetFlippedCards());
                dispatch(hideOverlay());
            }, 2000);
        }
    };
}

export function keepScoreAndFollowUp() {
    return (dispatch) => {
        dispatch(keepScore());
        dispatch(clearKeptCards());
        dispatch(showOverlay());
        setTimeout(() => {
            dispatch(dealCards());
            dispatch(hideOverlay());
        }, 300);
    };
}
