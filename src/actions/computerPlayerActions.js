import computerPlayer from "../computerPlayer";
import { cardFlippedAndFollowUp } from "./cardsActions";
import { keepScoreAndFollowUp } from "./scoreActions";
import { showOverlay } from "./commonActions";

export function computerChooseACardAndFollowUp(delay = 500) {
  return (dispatch, getState) => {
    dispatch(showOverlay);

    const { possPoints } = getState().score;
    const { matchingAttrs, tableCards } = getState().cards;
    const availableTableCards = tableCards.filter(
      card => card !== null && card.faceDown
    );
    if (
      possPoints > 0 &&
      (matchingAttrs.length === 1 || availableTableCards.length === 0)
    ) {
      window.setTimeout(() => {
        dispatch(keepScoreAndFollowUp());
      }, 2000);
    } else {
      let flippedACard = false;
      for (
        let cards = getState().cards, count = 0; // count is a failsafe in case something is amiss and makes us get into an infinite loop
        !cards.gameOver && !flippedACard && count < 100;
        cards = getState().cards, count++
      ) {
        const { tableCards } = cards;
        const card = computerPlayer.chooseACard(tableCards);

        if (card.faceDown) {
          flippedACard = true;
          setTimeout(() => {
            dispatch(cardFlippedAndFollowUp(card.key));
          }, delay);
        }
      }
    }
  };
}
