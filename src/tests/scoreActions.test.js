import * as scoreActions from '../actions/scoreActions'

describe('scoreActions', () => {
    it('should create an action to deal the cards', () => {
        const expectedAction = {
            type: scoreActions.DEAL_CARDS
        }
        expect(scoreActions.dealCards()).toEqual(expectedAction)
    });

    it('should create an action to flip a card', () => {
        const cardKey = '1102';
        const expectedAction = {
            type: scoreActions.CARD_FLIPPED,
            cardKey
        }
        expect(scoreActions.cardFlipped(cardKey)).toEqual(expectedAction)
    });




})