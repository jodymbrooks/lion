import { showOverlay, hideOverlay } from './commonActions';
import utilities from '../utilities';


export const TEST_REMOVE_BUNCH_OF_CARDS = 'TEST_REMOVE_BUNCH_OF_CARDS';
export const testRemoveBunchOfCards = (count) => ({ type: TEST_REMOVE_BUNCH_OF_CARDS, count });




export const DEAL_CARDS = 'DEAL_CARDS';
export const dealCards = () => ({ type: DEAL_CARDS });

export const CHECK_GAME_OVER = 'CHECK_GAME_OVER';
export const checkAvailableMatches = () => ({ type: CHECK_GAME_OVER });

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

export function cardClickedAndFollowUp(cardKey) {
    return (dispatch, getState) => {

        const { tableCards, possPoints } = getState().score;
        const card = utilities.getCardFromKey(tableCards, cardKey);

        if (card.faceDown) {
            dispatch(cardFlippedAndFollowUp(cardKey));
        } else {
            if (possPoints > 0) {
                dispatch(keepScoreAndFollowUp());
            }
        }
    }
}

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
            dispatch(checkAvailableMatches());
            dispatch(hideOverlay());
        }, 300);
    };
}

export function testRemoveBunchOfCardsAndFollowUp(count) {
    return (dispatch) => {
        dispatch(testRemoveBunchOfCards(count));
        dispatch(clearKeptCards());
        dispatch(showOverlay());
        setTimeout(() => {
            dispatch(dealCards());
            dispatch(checkAvailableMatches());
            dispatch(hideOverlay());
        }, 300);
    };
}
