import scoreReducer from "../actions/scoreReducer";
import * as scoreActions from "../actions/scoreActions";
import cardUtilities from "../cardUtilities";
import testUtilities from "./testUtilities";

describe("score reducer", () => {
  const initialState = {
    userScores: [
      {
        user: "Player1",
        sets: 0,
        points: 0
      },
      {
        user: "Computer",
        sets: 0,
        points: 0
      }
    ],
    activeUserIndex: 0,
    possPoints: 0
  };

  it("should return the initial state", () => {
    expect(scoreReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle UPDATE_PLAYER_NAME for first player", () => {
    const newState = scoreReducer(undefined, {
      type: scoreActions.UPDATE_PLAYER_NAME,
      user: "Bubba",
      index: 0
    });
    expect(newState.userScores[0].user).toBe("Bubba");
  });

  it("should handle UPDATE_PLAYER_NAME for second player", () => {
    const newState = scoreReducer(undefined, {
      type: scoreActions.UPDATE_PLAYER_NAME,
      user: "Jim Bob",
      index: 1
    });
    expect(newState.userScores[1].user).toBe("Jim Bob");
  });

  it("should handle SWITCH_USER from 1st to 2nd", () => {
    const startingState = {
      ...initialState,
      activeUserIndex: 0
    };
    const newState = scoreReducer(startingState, {
      type: scoreActions.SWITCH_USER
    });
    expect(newState.activeUserIndex).toBe(1);
    expect(newState.possPoints).toBe(0);
  });

  it("should handle SWITCH_USER from 2nd to 1st", () => {
    const startingState = {
      ...initialState,
      activeUserIndex: 1
    };
    const newState = scoreReducer(startingState, {
      type: scoreActions.SWITCH_USER
    });
    expect(newState.activeUserIndex).toBe(0);
    expect(newState.possPoints).toBe(0);
  });

  it("should handle UPDATE_SCORE_FROM_MATCHES with 1 card selected as 0 possible points", () => {
    const startingState = { ...initialState, activeUserIndex: 0 };
    const testUtils = new testUtilities();

    const dealInfo = cardUtilities.dealCards(testUtils.orderedDeck, []);
    const { tableCards } = dealInfo;
    tableCards[0].selected = true;
    const selectedCards = cardUtilities.getSelectedCards(tableCards);
    const matchingAttrs = cardUtilities.getMatchingAttrs(selectedCards);
    const newState = scoreReducer(startingState, {
      type: scoreActions.UPDATE_SCORE_FROM_MATCHES,
      tableCards,
      matchingAttrs
    });
    expect(newState.possPoints).toBe(0);
  });

  it("should handle UPDATE_SCORE_FROM_MATCHES with 2 unmatching cards selected as 0 possible points", () => {
    const testUtils = new testUtilities();

    const dealInfo = cardUtilities.dealCards(testUtils.orderedDeck, []);
    const { deckCards, tableCards } = dealInfo;
    tableCards[0].selected = true; // selects this card

    // Replace a table card with one that doesn't match
    const [card] = deckCards.splice(deckCards.length - 1, 1);
    tableCards[1] = card;
    tableCards[1].selected = true; // selects this card
    const selectedCards = cardUtilities.getSelectedCards(tableCards);
    const matchingAttrs = cardUtilities.getMatchingAttrs(selectedCards);
    const newState = scoreReducer(initialState, {
      type: scoreActions.UPDATE_SCORE_FROM_MATCHES,
      tableCards,
      matchingAttrs
    });
    expect(newState.possPoints).toBe(0);
  });

  it("should handle UPDATE_SCORE_FROM_MATCHES with 2 matching cards selected as 4 possible points", () => {
    const testUtils = new testUtilities();

    const dealInfo = cardUtilities.dealCards(testUtils.orderedDeck, []);
    const { tableCards } = dealInfo;
    tableCards[0].selected = true; // selects this card
    tableCards[1].selected = true; // selects this card
    const selectedCards = cardUtilities.getSelectedCards(tableCards);
    const matchingAttrs = cardUtilities.getMatchingAttrs(selectedCards);
    const newState = scoreReducer(initialState, {
      type: scoreActions.UPDATE_SCORE_FROM_MATCHES,
      tableCards,
      matchingAttrs
    });
    expect(newState.possPoints).toBe(4);
  });

  it("should handle UPDATE_SCORE_FROM_MATCHES with 3 matching cards selected as 9 possible points", () => {
    const testUtils = new testUtilities();

    const dealInfo = cardUtilities.dealCards(testUtils.orderedDeck, []);
    const { tableCards } = dealInfo;
    tableCards[0].selected = true; // selects this card
    tableCards[1].selected = true; // selects this card
    tableCards[2].selected = true; // selects this card
    const selectedCards = cardUtilities.getSelectedCards(tableCards);
    const matchingAttrs = cardUtilities.getMatchingAttrs(selectedCards);
    const newState = scoreReducer(initialState, {
      type: scoreActions.UPDATE_SCORE_FROM_MATCHES,
      tableCards,
      matchingAttrs
    });
    expect(newState.possPoints).toBe(9);
  });

  it("should handle UPDATE_SCORE_FROM_MATCHES with 4 matching cards selected as 16 possible points", () => {
    const testUtils = new testUtilities();

    const dealInfo = cardUtilities.dealCards(testUtils.orderedDeck, []);
    const { tableCards } = dealInfo;
    tableCards[0].selected = true; // selects this card
    tableCards[1].selected = true; // "
    tableCards[2].selected = true; // "
    tableCards[3].selected = true; // "
    const selectedCards = cardUtilities.getSelectedCards(tableCards);
    const matchingAttrs = cardUtilities.getMatchingAttrs(selectedCards);
    const newState = scoreReducer(initialState, {
      type: scoreActions.UPDATE_SCORE_FROM_MATCHES,
      tableCards,
      matchingAttrs
    });
    expect(newState.possPoints).toBe(16);
  });

  it("should handle KEEP_SCORE with a 2-card set", () => {
    const testUtils = new testUtilities();
    const dealInfo = cardUtilities.dealCards(testUtils.orderedDeck, []);
    const { tableCards } = dealInfo;
    tableCards[0].selected = true; // selects this card
    tableCards[1].selected = true; // "
    const selectedCards = cardUtilities.getSelectedCards(tableCards);
    const matchingAttrs = cardUtilities.getMatchingAttrs(selectedCards);
    const nextState = scoreReducer(initialState, {
      type: scoreActions.UPDATE_SCORE_FROM_MATCHES,
      tableCards,
      matchingAttrs
    });

    const newState = scoreReducer(nextState, {
      type: scoreActions.KEEP_SCORE
    });
    expect(newState.userScores[0].sets).toBe(1);
    expect(newState.userScores[0].points).toBe(4);
  });

  it("should handle KEEP_SCORE with a 3-card set", () => {
    const startingState = {
      userScores: [
        {
          user: "Player1",
          sets: 0,
          points: 0
        },
        {
          user: "Player2",
          sets: 4,
          points: 20
        }
      ],
      activeUserIndex: 1,
      possPoints: 9
    };
    const newState = scoreReducer(startingState, {
      type: scoreActions.KEEP_SCORE
    });
    expect(newState.userScores[1].sets).toBe(5);
    expect(newState.userScores[1].points).toBe(29);
  });
});
