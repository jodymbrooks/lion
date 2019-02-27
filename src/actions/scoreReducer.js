import * as scoreActions from "./scoreActions";
import cardUtilities from "../cardUtilities";

const initialStoreState = {
  userScores: [
    {
      user: "Player1",
      sets: 0,
      points: 0
    },
    {
      user: "Player2",
      sets: 0,
      points: 0
    }
  ],
  activeUserIndex: 0,
  possPoints: 0
};

export default function(scoreState = initialStoreState, action) {
  var newState = { ...scoreState };

  switch (action.type) {
    case scoreActions.UPDATE_PLAYER_NAME:
      {
        const { user, index } = action;
        if (index === 0 || index === 1) {
          newState.userScores[index].user = user;
        }
      }
      break;

    case scoreActions.SWITCH_USER:
      newState.possPoints = 0;
      newState.activeUserIndex = (scoreState.activeUserIndex + 1) % 2;
      break;

    case scoreActions.UPDATE_SCORE_FROM_MATCHES:
      {
        const { tableCards, matchingAttrs } = action;
        const selectedCards = cardUtilities.getSelectedCards(tableCards);
        const numSelectedCards = Object.keys(selectedCards).length;
        if (matchingAttrs !== null && matchingAttrs.length > 0) {
          var possPoints = numSelectedCards * numSelectedCards;
          newState.possPoints = possPoints;
        } else {
          newState.possPoints = 0;
        }
      }
      break;

    case scoreActions.KEEP_SCORE:
      {
        const { activeUserIndex } = scoreState;
        const activeUser = { ...scoreState.userScores[activeUserIndex] };

        if (typeof newState.possPoints !== "undefined") {
          activeUser.points += scoreState.possPoints;
          activeUser.sets++;
          newState.userScores = [...scoreState.userScores];
          newState.userScores[activeUserIndex] = activeUser;
        }
        // newState.activeUserIndex = (activeUserIndex + 1) % 2;
        // newState.possPoints = 0;
      }
      break;

    default:
      break;
  }

  return newState;
}
