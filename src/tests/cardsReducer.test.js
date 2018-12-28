import cardsReducer, { initialStoreState } from '../actions/cardsReducer';
import * as cardsActions from '../actions/cardsActions';
// import cardUtilities, { tableMaxCards } from '../cardUtilities';


describe('cards reducer', () => {

    const initialState = {...initialStoreState };
      
    it('should return the initial state', () => {
        expect(cardsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle the initial DEAL_CARDS', () => {
        const newState = cardsReducer(undefined, {
            type: cardsActions.DEAL_CARDS
        });
        expect(newState.tableCards.length).toBe(20);
        expect(newState.deckCards.length).toBe(61);
    });

    it('should handle DEAL_CARDS with no more cards left in the deck', () => {
        const startingState = { ...initialState };
        startingState.tableCards = new Array(20).fill(null);
        // startingState.tableCards[0] = null;
        // startingState.tableCards[1] = null;
        // startingState.tableCards[2] = cardUtilities.getCardInfoFromAttrs(0,0,0,0);
        // startingState.tableCards[3] = null;
        // startingState.tableCards[4] = cardUtilities.getCardInfoFromAttrs(2,2,2,2);
        // startingState.tableCards[5] = cardUtilities.getCardInfoFromAttrs(0,0,0,1);
        const newState = cardsReducer(startingState, {
            type: cardsActions.DEAL_CARDS
        });
        expect(newState.tableCards.length).toBe(20);
        expect(newState.deckCards.length).toBe(0);
    });

});
