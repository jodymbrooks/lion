import { showOverlay, hideOverlay } from "./commonActions";
import { updateScoreFromMatches, keepScoreAndFollowUp, switchUser } from "./scoreActions";
import cardUtilities from "../cardUtilities";
import { computerChooseACardAndFollowUp } from "./computerPlayerActions";

export const DEBUG_REMOVE_BUNCH_OF_CARDS = "DEBUG_REMOVE_BUNCH_OF_CARDS";
export const debugRemoveBunchOfCards = count => ({
  type: DEBUG_REMOVE_BUNCH_OF_CARDS,
  count
});

export const DEAL_CARDS = "DEAL_CARDS";
export const dealCards = () => ({ type: DEAL_CARDS });

export const CHECK_GAME_OVER = "CHECK_GAME_OVER";
export const checkGameOver = () => ({ type: CHECK_GAME_OVER });

export const CARD_FLIPPED = "CARD_FLIPPED";
export const cardFlipped = cardKey => ({ type: CARD_FLIPPED, cardKey });

export const CHECK_MATCHES = "CHECK_MATCHES";
export const checkMatches = tableCards => ({
  type: CHECK_MATCHES,
  tableCards
});

export const RESET_FLIPPED_CARDS = "RESET_FLIPPED_CARDS";
export const resetFlippedCards = () => ({ type: RESET_FLIPPED_CARDS });

export const CLEAR_KEPT_CARDS = "CLEAR_KEPT_CARDS";
export const clearKeptCards = () => ({ type: CLEAR_KEPT_CARDS });

export function cardClickedAndFollowUp(cardKey) {
  return (dispatch, getState) => {
    const { tableCards } = getState().cards;
    const { possPoints } = getState().score;
    const card = cardUtilities.getCardFromKey(tableCards, cardKey);

    if (card.faceDown) {
      dispatch(cardFlippedAndFollowUp(cardKey));
    } else {
      if (possPoints > 0) {
        dispatch(keepScoreAndFollowUp());
      }
    }
  };
}

export function cardFlippedAndFollowUp(cardKey) {
  return (dispatch, getState) => {
    dispatch(cardFlipped(cardKey));

    // Give it a moment to flip and show up, then proceed -- do this with a small timer
    window.setTimeout(() => {
      const tableCards = getState().cards.tableCards;
      dispatch(checkMatches(tableCards));

      // get matchingAttrs AFTER calling checkMatches - don't try to combine with tableCards from getstate() call above
      const matchingAttrs = getState().cards.matchingAttrs;

      dispatch(updateScoreFromMatches(tableCards, matchingAttrs));

      const selectedCards = cardUtilities.getSelectedCards(tableCards);
      const isMatch = selectedCards.length === 1 || matchingAttrs.length > 0;

      if (!isMatch) {
        dispatch(showOverlay());
        setTimeout(() => {
          dispatch(resetFlippedCards());
          dispatch(switchUserAndFollowUp(0));
        }, 2000);
      } else {
        const scoreState = getState().score;
        const { activeUserIndex } = scoreState;
        const activeUser = { ...scoreState.userScores[activeUserIndex] };
        if (activeUser.user.startsWith("Computer")) {
          dispatch(computerChooseACardAndFollowUp());
        } else {
          dispatch(hideOverlay());
        }
      }
    }, 100);
  };
}

export function switchUserAndFollowUp() {
  return (dispatch, getState) => {
    dispatch(switchUser());

    const scoreState = getState().score;
    const { activeUserIndex } = scoreState;
    const activeUser = { ...scoreState.userScores[activeUserIndex] };

    if (activeUser.user.startsWith("Computer")) {
      dispatch(computerChooseACardAndFollowUp());
    } else {
      dispatch(hideOverlay());
    }
  };
}

export function debugRemoveBunchOfCardsAndFollowUp(count) {
  return dispatch => {
    dispatch(debugRemoveBunchOfCards(count));
    dispatch(clearKeptCards());
    dispatch(showOverlay());
    setTimeout(() => {
      dispatch(dealCards());
      dispatch(checkGameOver());
      dispatch(hideOverlay());
    }, 300);
  };
}
