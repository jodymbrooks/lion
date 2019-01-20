import { showOverlay, hideOverlay } from "./commonActions";
import {
  checkGameOver,
  clearKeptCards,
  dealCards,
  switchUserAndFollowUp
} from "./cardsActions";

export const UPDATE_PLAYER_NAME = "UPDATE_PLAYER_NAME";
export const updatePlayerName = (user, index) => ({
  type: UPDATE_PLAYER_NAME,
  user,
  index
});

export const SWITCH_USER = "SWITCH_USER";
export const switchUser = () => ({ type: SWITCH_USER });

export const UPDATE_SCORE_FROM_MATCHES = "UPDATE_SCORE_FROM_MATCHES";
export const updateScoreFromMatches = (tableCards, matchingAttrs) => ({
  type: UPDATE_SCORE_FROM_MATCHES,
  tableCards,
  matchingAttrs
});

export const KEEP_SCORE = "KEEP_SCORE";
export const keepScore = () => ({ type: KEEP_SCORE });

export function keepScoreAndFollowUp() {
  return (dispatch, getState) => {
    dispatch(keepScore());
    dispatch(clearKeptCards());
    dispatch(showOverlay());
    setTimeout(() => {
      dispatch(dealCards());
      dispatch(checkGameOver());
      const { gameOver } = getState().cards;
      if (gameOver) {
        dispatch(hideOverlay());
      } else {
        dispatch(switchUserAndFollowUp());
      }
    }, 300);
  };
}
