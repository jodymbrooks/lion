import computerPlayer from "../computerPlayer";
import { cardFlippedAndFollowUp } from "./cardsActions";
import { keepScoreAndFollowUp } from "./scoreActions";
import { showOverlay } from "./commonActions";
import cardUtilities from "../cardUtilities";

export function computerChooseACardAndFollowUp(delay = 500) {
  return (dispatch, getState) => {
    dispatch(showOverlay);

    const { possPoints } = getState().score;
    const { matchingAttrs, tableCards, seenCards } = getState().cards;
    const availCards = cardUtilities.getFaceDownCards(tableCards);
    const seenCardsValues = Object.values(seenCards);
    const allMatchesFromSeenCards = cardUtilities.getAllMatches(seenCardsValues);

    const keepOrChoose = computerPlayer.keepOrChoose(
      possPoints,
      matchingAttrs,
      availCards,
      allMatchesFromSeenCards
    );
    if (keepOrChoose === "keep") {
      window.setTimeout(() => {
        dispatch(keepScoreAndFollowUp());
      }, 2000);
    } else {
      const cards = getState().cards;
      if (!cards.gameOver) {
        const card = computerPlayer.chooseACard(availCards, allMatchesFromSeenCards);
        if (card) {
          setTimeout(() => {
            dispatch(cardFlippedAndFollowUp(card.key));
          }, delay);
        }
      }
    }
  };
}
