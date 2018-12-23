import cardsReducer from '../actions/cardsReducer';
import * as cardsActions from '../actions/cardsActions';


describe('cards reducer', () => {
    it('should return the initial state', () => {
        expect(cardsReducer(undefined, {})).toEqual({
            tableCards: [],
            deckCards: [],
            matchingAttrs: [],
            highlight: "none",
            gameOver: false
        })
    });

    it('should handle DEAL_CARDS', () => {
        const newState = cardsReducer(undefined, {
            type: cardsActions.DEAL_CARDS
        });
        expect(newState.tableCards.length).toBe(20);
        expect(newState.deckCards.length).toBe(61);
    });
});