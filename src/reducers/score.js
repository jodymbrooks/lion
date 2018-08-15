import * as actions from '../actions/score';

var initialStoreState = {
  sets: 0,
  points: 0,
  possPoints: 0,
  matchingAttrs: []
};

export default function (scoreState = initialStoreState, action) {
      var newState = { ...scoreState };

      if (action.type === actions.INCREMENT_SCORE) {
          if (typeof (action.sets) !== "undefined") {
              newState.sets += action.sets;
          }
          if (typeof (action.points) !== "undefined") {
              newState.points += action.points;
          }
          if (typeof (action.possPoints) !== "undefined") {
              newState.possPoints += action.possPoints;
          }
      }
      else if (action.type === actions.SET_SCORE) {
          if (typeof (action.sets) !== "undefined") {
              newState.sets = action.sets;
          }
          if (typeof (action.points) !== "undefined") {
              newState.points = action.points;
          }
          if (typeof (action.possPoints) !== "undefined") {
              newState.possPoints = action.possPoints;
          }
          if (typeof (action.matchingAttrs) !== "undefined") {
              newState.matchingAttrs = action.matchingAttrs;
          }
      }
      else if (action.type === actions.KEEP_SCORE) {
          if (typeof (newState.possPoints) !== "undefined") {
              newState.points += newState.possPoints;
          }
          newState.possPoints = 0;
          newState.matchingAttrs = [];
      }

      return newState;
  }
