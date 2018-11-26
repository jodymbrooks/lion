import { showOverlay, hideOverlay } from './commonActions';

export const SET_CARD_INFOS = 'SET_CARD_INFOS';
export const setCardInfos = (cardInfos) => ({ type: SET_CARD_INFOS, cardInfos });

export const CARD_FLIPPED = 'CARD_FLIPPED';
export const cardFlipped = (cardKey) => ({ type: CARD_FLIPPED, cardKey });

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

// export const cardFlippedAndCheckStuff = dispatch => {
//     return cardFlipped().then(
//       sauce => dispatch(makeASandwich(forPerson, sauce)),
//       error => dispatch(apologize('The Sandwich Shop', forPerson, error))
//     );
//   };

export function cardFlippedAndFollowup(cardKey) {
    return (dispatch, getState) => {
        dispatch(cardFlipped(cardKey));

        const { score } = getState();
        const { selectedCards, matchingAttrs } = score;

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





