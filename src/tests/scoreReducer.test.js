import scoreReducer from '../actions/scoreReducer';
import * as scoreActions from '../actions/scoreActions';


describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(scoreReducer(undefined, {})).toEqual({
      userScores: [
        {
          user: "Player 1",
          sets: 0,
          points: 0
        },
        {
          user: "Player 2",
          sets: 0,
          points: 0
        }
      ],
      activeUserIndex: 0,
      possPoints: 0,
    })
  });

  it('should handle DEAL_CARDS', () => {
    const newState = scoreReducer(undefined, { type: scoreActions.DEAL_CARDS });
    expect(newState.tableCards.length).toBe(20);
  });
})

