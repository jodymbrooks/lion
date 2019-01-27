import * as cardsActions from "./cardsActions";
import cardUtilities from "../cardUtilities";

export const initialStoreState = {
  tableCards: [],
  tableCardsCount: null,
  deckCards: [],
  seenCards: {},
  matchingAttrs: [],
  highlight: "none",
  gameOver: false
};

export default function(cardsState = initialStoreState, action) {
  var newState = { ...cardsState };

  switch (action.type) {
    case cardsActions.DEBUG_REMOVE_BUNCH_OF_CARDS:
      {
        let count = Math.floor(Math.random() * cardsState.tableCardsCount) + 1;

        newState.tableCards.forEach((card, idx) => {
          if (card !== null && count-- > 0) {
            newState.tableCards[idx] = { ...card, index: idx, faceDown: false };
          }
        });
        // newState.deckCards = [ ...cardsState.deckCards ];
        // newState.deckCards.splice(0, Math.floor(Math.random() * cardsState.deckCards.length)+1);
      }
      break;

    case cardsActions.DEAL_CARDS:
      {
        const { deckCards, tableCards } = cardsState;
        const dealInfo = cardUtilities.dealCards(deckCards, tableCards);

        newState.deckCards = dealInfo.deckCards;
        newState.tableCards = dealInfo.tableCards;
        newState.tableCardsCount = dealInfo.tableCardsCount;
      }
      break;

    case cardsActions.CHECK_GAME_OVER:
      newState.gameOver = cardsState.tableCardsCount < 2; // If 1 or fewer cards, no chance for a match so game over

      if (!newState.gameOver) {
        // If enough cards, then check for matches
        const foundAvailableMatch = cardUtilities.checkForMatches(cardsState.tableCards);
        newState.gameOver = !foundAvailableMatch;
      }
      break;

    case cardsActions.CARD_FLIPPED:
      {
        const { cardKey } = action;
        const { tableCards } = cardsState;
        const card = cardUtilities.getCardFromKey(tableCards, cardKey);
        if (card != null) {
          const newTableCards = [...tableCards];

          const newCard = { ...card, faceDown: !card.faceDown };
          newTableCards[newCard.index] = newCard;
          newState.tableCards = newTableCards;

          if (!newCard.faceDown) {
            newState.seenCards = { ...cardsState.seenCards };
            newState.seenCards[card.key] = { ...newCard };
          }
        }
      }
      break;

    case cardsActions.CHECK_MATCHES:
      {
        const { tableCards } = action;
        const selectedCards = cardUtilities.getSelectedCards(tableCards);

        // const numSelectedCards = Object.keys(selectedCards).length;
        const matchingAttrs = cardUtilities.getMatchingAttrs(selectedCards);
        const allMatch = matchingAttrs !== null && matchingAttrs.length > 0;
        newState.highlight =
          matchingAttrs === null || allMatch ? "highlight-match" : "highlight-mismatch";

        if (allMatch /*&& numSelectedCards > 1*/) {
          newState.matchingAttrs = matchingAttrs;
        } else {
          newState.matchingAttrs = [];
        }
      }
      break;

    case cardsActions.RESET_FLIPPED_CARDS:
      newState.matchingAttrs = [];
      // newState.seenCards = { ...cardsState.seenCards };
      newState.tableCards = cardsState.tableCards.map(card => {
        if (card) {
          if (card.faceDown) {
            return card;
          } else {
            const faceDownCard = { ...card, faceDown: true };
            // newState.seenCards[card.key] = { ...faceDownCard };
            return faceDownCard;
          }
        } else {
          return null;
        }
      });
      newState.highlight = "none";
      break;

    case cardsActions.CLEAR_KEPT_CARDS:
      {
        const { tableCards, seenCards } = cardsState;
        const newTableCards = [...tableCards];
        const newSeenCards = { ...seenCards };
        const selectedCards = cardUtilities.getSelectedCards(tableCards);
        selectedCards.forEach(card => {
          // clear the card from the tableCards
          newTableCards[card.index] = null;

          // clear the card from the seenCards
          delete newSeenCards[card.key];
        });
        newState.tableCards = newTableCards;
        newState.seenCards = newSeenCards;
        newState.matchingAttrs = [];
      }
      break;

    default:
      break;
  }

  return newState;
}
