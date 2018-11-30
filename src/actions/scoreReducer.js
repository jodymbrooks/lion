import * as scoreActions from './scoreActions';
import utilities from '../utilities';

var initialStoreState = {
  tableCards: [],
  deckCards: [],
  matchingAttrs: [],
  sets: 0,
  points: 0,
  possPoints: 0,
  highlight: "none",
  gameOver: false,
};

export default function (scoreState = initialStoreState, action) {
  var newState = { ...scoreState };

  switch (action.type) {
    case scoreActions.DEAL_CARDS:
      {
        const count = 78;

        let { deckCards } = scoreState;

        if (scoreState.tableCards.length === 0) {
          newState.tableCards = new Array(count).fill(null);

          if (deckCards.length === 0) {
            newState.deckCards = utilities.shuffleDeckCards();
            deckCards = newState.deckCards;
          }

        } else {
          newState.tableCards = [...scoreState.tableCards];
        }

        let stillHaveTableCards = false;

        newState.tableCards.forEach((tableCard, idx) => {
          // Replace empty table slots (null values) with the next available deck card, if any
          if (tableCard === null) {
            if (deckCards.length > 0) {
              const [card] = deckCards.splice(0, 1); // returns an array of the spliced entries which is just one entry
              newState.tableCards[idx] = { ...card, index: idx };
              stillHaveTableCards = true;
            }
          } else {
            stillHaveTableCards = true;
          }
        });
        newState.gameOver = !stillHaveTableCards;
      }
      break;

    case scoreActions.CARD_FLIPPED:
      {
        const { cardKey } = action;
        const { tableCards } = scoreState;
        const card = utilities.getCardFromKey(tableCards, cardKey);
        const newTableCards = [...tableCards];

        const newCard = { ...card, faceDown: !card.faceDown };
        newTableCards[newCard.index] = newCard;
        newState.tableCards = newTableCards;
      }
      break;

    case scoreActions.CHECK_MATCHES:
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

    case scoreActions.UPDATE_SCORE_FROM_MATCHES:
      const { tableCards } = action;
      const selectedCards = utilities.getSelectedCards(tableCards);
      const { matchingAttrs } = scoreState;
      if (matchingAttrs.length > 0) {
        const numSelectedCards = Object.keys(selectedCards).length;
        var possPoints = numSelectedCards * numSelectedCards;
        newState.possPoints = possPoints;
      }
      else {
        newState.possPoints = 0;
      }
      break;

    case scoreActions.INCREMENT_SCORE:
      if (typeof (action.sets) !== 'undefined') {
        newState.sets += action.sets;
      }
      if (typeof (action.points) !== 'undefined') {
        newState.points += action.points;
      }
      if (typeof (action.possPoints) !== 'undefined') {
        newState.possPoints += action.possPoints;
      }
      break;

    case scoreActions.SET_SCORE:
      if (typeof (action.sets) !== 'undefined') {
        newState.sets = action.sets;
      }
      if (typeof (action.points) !== 'undefined') {
        newState.points = action.points;
      }
      if (typeof (action.possPoints) !== 'undefined') {
        newState.possPoints = action.possPoints;
      }
      if (typeof (action.matchingAttrs) !== 'undefined') {
        newState.matchingAttrs = action.matchingAttrs;
      }
      break;

    case scoreActions.KEEP_SCORE:
      if (typeof (newState.possPoints) !== 'undefined') {
        newState.points += newState.possPoints;
      }
      newState.possPoints = 0;
      newState.matchingAttrs = [];
      newState.highlight = 'none';
      break;


    case scoreActions.RESET_FLIPPED_CARDS:
      newState.possPoints = 0;
      newState.matchingAttrs = [];
      newState.tableCards = scoreState.tableCards.map(card => { return { ...card, faceDown: true } });
      break;

    case scoreActions.CLEAR_KEPT_CARDS:
      {
        const { tableCards } = scoreState;
        const selectedCards = utilities.getSelectedCards(tableCards);
        const newTableCards = [...tableCards];
        selectedCards.forEach(card => { newTableCards[card.index] = null });
        newState.tableCards = newTableCards;
      }
      break;

    default:
      break;
  }

  return newState;
}










