// import * as computerPlayerActions from "./computerPlayerActions";
// import computerPlayer from "../computerPlayer";

export const initialStoreState = {
  seenCards: []
};

// export default function(cardsState = initialStoreState, action) {
//   var newState = { ...cardsState };

//   switch (action.type) {
//     case computerPlayerActions.PICK_A_CARD:
//       {

//       }
//       break;

//     case computerPlayerActions.DEAL_CARDS:
//       {
//         const { deckCards, tableCards } = cardsState;
//         const dealInfo = cardUtilities.dealCards(deckCards, tableCards);

//         newState.deckCards = dealInfo.deckCards;
//         newState.tableCards = dealInfo.tableCards;
//         newState.tableCardsCount = dealInfo.tableCardsCount;
//       }
//       break;

//     case computerPlayerActions.CHECK_GAME_OVER:
//       newState.gameOver = cardsState.tableCardsCount < 2; // If 1 or fewer cards, no chance for a match so game over

//       if (!newState.gameOver) {
//         // If enough cards, then check for matches
//         let foundAvailableMatch = false;

//         const tableCardsLength = cardsState.tableCards.length;
//         for (
//           let idx1 = 0;
//           idx1 < tableCardsLength && !foundAvailableMatch;
//           idx1++
//         ) {
//           const card1 = cardsState.tableCards[idx1];
//           if (!card1) continue;

//           for (
//             let idx2 = idx1 + 1;
//             idx2 < tableCardsLength && !foundAvailableMatch;
//             idx2++
//           ) {
//             const card2 = cardsState.tableCards[idx2];
//             if (!card2) continue;

//             const cards = [card1, card2];
//             const matchingAttrs = cardUtilities.getMatchingAttrs(cards);
//             if (matchingAttrs && matchingAttrs.length > 0) {
//               foundAvailableMatch = true; // this will cause both loops to break
//             }
//           }
//         }

//         newState.gameOver = !foundAvailableMatch;
//       }
//       break;

//     case computerPlayerActions.CARD_FLIPPED:
//       {
//         const { cardKey } = action;
//         const { tableCards } = cardsState;
//         const card = cardUtilities.getCardFromKey(tableCards, cardKey);
//         if (card != null) {
//           const newTableCards = [...tableCards];

//           const newCard = { ...card, faceDown: !card.faceDown };
//           newTableCards[newCard.index] = newCard;
//           newState.tableCards = newTableCards;
//         }
//       }
//       break;

//     case computerPlayerActions.CHECK_MATCHES:
//       {
//         const { tableCards } = action;
//         const selectedCards = cardUtilities.getSelectedCards(tableCards);

//         // const numSelectedCards = Object.keys(selectedCards).length;
//         const matchingAttrs = cardUtilities.getMatchingAttrs(selectedCards);
//         const allMatch = matchingAttrs !== null && matchingAttrs.length > 0;
//         newState.highlight =
//           matchingAttrs === null
//             ? ""
//             : allMatch
//             ? "highlight-match"
//             : "highlight-mismatch";

//         if (allMatch /*&& numSelectedCards > 1*/) {
//           newState.matchingAttrs = matchingAttrs;
//         } else {
//           newState.matchingAttrs = [];
//         }
//       }
//       break;

//     case computerPlayerActions.RESET_FLIPPED_CARDS:
//       newState.matchingAttrs = [];
//       newState.tableCards = cardsState.tableCards.map(card =>
//         card ? { ...card, faceDown: true } : null
//       );
//       newState.highlight = "none";
//       break;

//     case computerPlayerActions.CLEAR_KEPT_CARDS:
//       {
//         const { tableCards } = cardsState;
//         const selectedCards = cardUtilities.getSelectedCards(tableCards);
//         const newTableCards = [...tableCards];
//         selectedCards.forEach(card => {
//           newTableCards[card.index] = null;
//         });
//         newState.tableCards = newTableCards;
//         newState.matchingAttrs = [];
//       }
//       break;

//     default:
//       break;
//   }

//   return newState;
// }
