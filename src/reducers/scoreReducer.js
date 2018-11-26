import * as scoreActions from '../actions/scoreActions';
import utilities from '../utilities';

var initialStoreState = {
  cardInfos: [],
  sets: 0,
  points: 0,
  possPoints: 0,
  matchingAttrs: [],
  selectedCards: [],
  highlight: "none"
};

export default function (scoreState = initialStoreState, action) {
  var newState = { ...scoreState };

  switch (action.type) {
    case scoreActions.CARD_FLIPPED:
      const { cardKey } = action;
      const { cardInfos } = scoreState;
      const selectedCards = [...scoreState.selectedCards];
      const idx = selectedCards.indexOf(cardKey);
      if (idx === -1) {
        selectedCards.push(cardKey);
      } else {
        selectedCards.splice(idx, 1);
      }

      newState.selectedCards = selectedCards;

      const numSelectedCards = selectedCards.length;
      const matchingAttrs = utilities.getMatchingAttrs(selectedCards, cardInfos);
      const allMatch = (matchingAttrs.length > 0);

      if (allMatch && numSelectedCards > 1) {
        var possPoints = numSelectedCards * numSelectedCards;
        newState.possPoints = possPoints;
        newState.matchingAttrs = matchingAttrs;
      }
      else {
        newState.possPoints = 0;
        newState.matchingAttrs = [];
      }

      newState.highlight = (allMatch ? "highlight-match" : "highlight-mismatch");
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
      newState.selectedCards = [];

      const newCardInfos = [...scoreState.cardInfos];
      newState.cardInfos = newCardInfos;

      // Mark each selected (matched) card's cardInfo peer as kept so it's removed from the table
      scoreState.selectedCards.forEach((cardKey) => {
        const cardInfoIndex = utilities.getCardInfoIndexFromKey(cardKey);
        if (cardInfoIndex !== null) {
          newCardInfos[cardInfoIndex].kept = true;
        }
      });
      break;


    case scoreActions.RESET_FLIPPED_CARDS:
      newState.selectedCards = [];
      newState.possPoints = 0;
      newState.matchingAttrs = [];
      break;

    case scoreActions.CLEAR_KEPT_CARDS:
      console.log("scoreReducer: CLEAR_KEPT_CARDS");



      break;

    case scoreActions.SET_CARD_INFOS:
      {
        const { cardInfos } = action;
        newState.cardInfos = [...cardInfos];
      }
      break;

    default:
      break;
  }

  return newState;
}










