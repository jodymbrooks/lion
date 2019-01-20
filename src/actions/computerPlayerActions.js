import computerPlayer from "../computerPlayer";
import { cardFlippedAndFollowUp } from "./cardsActions";
import { keepScoreAndFollowUp } from "./scoreActions";
import { showOverlay } from "./commonActions";

export function computerChooseACardAndFollowUp(delay = 500) {
  return (dispatch, getState) => {
    dispatch(showOverlay);

    const { possPoints } = getState().score;
    const { matchingAttrs } = getState().cards;
    if (possPoints > 0 && matchingAttrs.length === 1) {
      window.setTimeout(() => {
        dispatch(keepScoreAndFollowUp());
      }, 2000);
    } else {
      let flippedACard = false;
      for (
        let cards = getState().cards;
        !cards.gameOver && !flippedACard;
        cards = getState().cards
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
