import * as cardsActions from './cardsActions';
import utilities from '../utilities';

const initialStoreState = {
  tableCards: [],
  deckCards: [],
  matchingAttrs: [],
  highlight: "none",
  gameOver: false
};

export default function (cardsState = initialStoreState, action) {
  var newState = { ...cardsState };

  switch (action.type) {


    case cardsActions.TEST_REMOVE_BUNCH_OF_CARDS:
      let count = Math.floor(Math.random() * cardsState.tableCardsCount) + 1;

      newState.tableCards.forEach((card, idx) => {
        if (card !== null && count-- > 0) {
          newState.tableCards[idx] = { ...card, index: idx, faceDown: false };
        }
      });
      // newState.deckCards = [ ...cardsState.deckCards ];
      // newState.deckCards.splice(0, Math.floor(Math.random() * cardsState.deckCards.length)+1);
      break;

    case cardsActions.DEAL_CARDS:
      {
        const count = 20;

        let { deckCards } = cardsState;

        if (cardsState.tableCards.length === 0) {
          newState.tableCards = new Array(count).fill(null);

          if (deckCards.length === 0) {
            newState.deckCards = utilities.shuffleDeckCards();
            deckCards = newState.deckCards;
          }

        } else {
          newState.tableCards = [...cardsState.tableCards];
        }

        let tableCardsCount = 0;
        newState.tableCards.forEach((tableCard, idx) => {
          // Replace empty table slots (null values) with the next available deck card, if any
          if (tableCard === null) {
            if (deckCards.length > 0) {
              const [card] = deckCards.splice(0, 1); // returns an array of the spliced entries which is just one entry
              newState.tableCards[idx] = { ...card, index: idx };
              tableCardsCount++;
            }
          }
          else {
            tableCardsCount++;
          }
        });
        newState.tableCardsCount = tableCardsCount;
      }
      break;

    case cardsActions.CHECK_GAME_OVER:
      newState.gameOver = cardsState.tableCardsCount < 2; // If 1 or fewer cards, no chance for a match so game over

      if (!newState.gameOver) { // If enough cards, then check for matches
        let foundAvailableMatch = false;

        const tableCardsLength = cardsState.tableCards.length;
        for (let idx1 = 0; idx1 < tableCardsLength && !foundAvailableMatch; idx1++) {
          const card1 = cardsState.tableCards[idx1];
          if (!card1) continue;

          for (let idx2 = idx1 + 1; idx2 < tableCardsLength && !foundAvailableMatch; idx2++) {
            const card2 = cardsState.tableCards[idx2];
            if (!card2) continue;

            const cards = [card1, card2];
            const matchingAttrs = utilities.getMatchingAttrs(cards);
            if (matchingAttrs && matchingAttrs.length > 0) {
              foundAvailableMatch = true; // this will cause both loops to break
            }
          }
        }

        newState.gameOver = !foundAvailableMatch;
      }
      break;

    case cardsActions.CARD_FLIPPED:
      {
        const { cardKey } = action;
        const { tableCards } = cardsState;
        const card = utilities.getCardFromKey(tableCards, cardKey);
        if (card != null) {
          const newTableCards = [...tableCards];

          const newCard = { ...card, faceDown: !card.faceDown };
          newTableCards[newCard.index] = newCard;
          newState.tableCards = newTableCards;
        }
      }
      break;

    case cardsActions.CHECK_MATCHES:
      {
        const { tableCards } = action;
        const selectedCards = utilities.getSelectedCards(tableCards);

        const numSelectedCards = Object.keys(selectedCards).length;
        const matchingAttrs = utilities.getMatchingAttrs(selectedCards);
        const allMatch = (matchingAttrs.length > 0);
        newState.highlight = (allMatch ? "highlight-match" : "highlight-mismatch");

        if (allMatch && numSelectedCards > 1) {
          newState.matchingAttrs = matchingAttrs;
        }
        else {
          newState.matchingAttrs = [];
        }

      }
      break;

    case cardsActions.RESET_FLIPPED_CARDS:
      newState.matchingAttrs = [];
      newState.tableCards = cardsState.tableCards.map(card => (card ? { ...card, faceDown: true } : null));
      newState.highlight = 'none';
      break;

    case cardsActions.CLEAR_KEPT_CARDS:
      {
        const { tableCards } = cardsState;
        const selectedCards = utilities.getSelectedCards(tableCards);
        const newTableCards = [...tableCards];
        selectedCards.forEach(card => { newTableCards[card.index] = null });
        newState.tableCards = newTableCards;
        newState.matchingAttrs = [];
      }
      break;

    default:
      break;
  }

  return newState;
}
