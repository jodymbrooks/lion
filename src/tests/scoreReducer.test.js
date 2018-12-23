import scoreReducer from '../actions/scoreReducer';
import * as scoreActions from '../actions/scoreActions';
import cardUtilities from '../cardUtilities';
import testUtilities from './testUtilities';


describe('score reducer', () => {

  const initialState = {
    userScores: [{
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

  it('should return the initial state', () => {
    expect(scoreReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle UPDATE_PLAYER_NAME for first player', () => {
    const newState = scoreReducer(undefined, {
      type: scoreActions.UPDATE_PLAYER_NAME,
      user: 'Bubba',
      index: 0
    });
    expect(newState.userScores[0].user).toBe('Bubba');
  });

  it('should handle UPDATE_PLAYER_NAME for second player', () => {
    const newState = scoreReducer(undefined, {
      type: scoreActions.UPDATE_PLAYER_NAME,
      user: 'Jim Bob',
      index: 1
    });
    expect(newState.userScores[1].user).toBe('Jim Bob');
  });

  it('should handle SWITCH_USER from 1st to 2nd', () => {
    const startingState = { ...initialState, activeUserIndex: 0 };
    const newState = scoreReducer(startingState, {
      type: scoreActions.SWITCH_USER
    });
    expect(newState.activeUserIndex).toBe(1);
    expect(newState.possPoints).toBe(0);
  });

  it('should handle SWITCH_USER from 2nd to 1st', () => {
    const startingState = { ...initialState, activeUserIndex: 1 };
    const newState = scoreReducer(startingState, {
      type: scoreActions.SWITCH_USER
    });
    expect(newState.activeUserIndex).toBe(0);
    expect(newState.possPoints).toBe(0);
  });

  it('should handle UPDATE_SCORE_FROM_MATCHES with 1 card selected', () => {
    const startingState = { ...initialState, activeUserIndex: 0 };
    const testUtils = new testUtilities();

    const dealInfo = cardUtilities.dealCards(testUtils.orderedDeck, []);
    const { tableCards } = dealInfo;
    tableCards[0].faceDown = false;
    const selectedCards = cardUtilities.getSelectedCards(tableCards);
    const matchingAttrs = cardUtilities.getMatchingAttrs(selectedCards);
    const newState = scoreReducer(startingState, {
      type: scoreActions.UPDATE_SCORE_FROM_MATCHES,
      tableCards,
      matchingAttrs
    });
    console.log("newState...: ");
    console.log(newState);
    expect(newState.possPoints).toBe(0);
  });

  it('should handle UPDATE_SCORE_FROM_MATCHES with multiple cards selected but no matches', () => {

  });

  it('should handle UPDATE_SCORE_FROM_MATCHES with multiple cards selected with one matching attr', () => {});
  
  it('should handle UPDATE_SCORE_FROM_MATCHES with multiple cards selected with two matching attrs', () => {});
  
  it('should handle UPDATE_SCORE_FROM_MATCHES with multiple cards selected with three matching attrs', () => {});

  it('should handle KEEP_SCORE with a 2-card set', () => {});
  
  it('should handle KEEP_SCORE with a 3-card set', () => {});
  
  it('should handle KEEP_SCORE with a 4-card set', () => {});
  
  it('should handle KEEP_SCORE with a 5-card set', () => {});
  
  it('should handle KEEP_SCORE with a 6-card set', () => {});
  
  it('should handle KEEP_SCORE with a 7-card set', () => {});
  
  it('should handle KEEP_SCORE with a 8-card set', () => {});

});