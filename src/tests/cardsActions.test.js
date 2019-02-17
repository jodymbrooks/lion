import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as cardsActions from "../actions/cardsActions";
import cardsReducer from "../actions/cardsReducer";
import scoreReducer from "../actions/scoreReducer";
import cardUtilities from "../cardUtilities";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("dealCards", () => {
  it("should update the store's deckCards and tableCards", () => {
    let store = mockStore({});
    const action = store.dispatch(cardsActions.dealCards());
    expect(action).toEqual({ type: cardsActions.DEAL_CARDS });
    const newState = cardsReducer(undefined, action);

    expect(newState.deckCards.length).toEqual(61);
    expect(newState.tableCards.length).toEqual(20);
    store = mockStore({ cards: newState });
    expect(store.getState().cards.deckCards.length).toEqual(61);
  });
});

// from here: https://redux.js.org/recipes/writing-tests
describe("async actions", () => {
  it("creates various actions when a card is clicked from face down", () => {
    const startingState = {
      cards: cardsReducer(undefined, {}),
      score: scoreReducer(undefined, {})
    };
    let deckCards = cardUtilities.getOrderedDeckCards();
    const dealInfo = cardUtilities.dealCards(deckCards, []);
    startingState.cards.deckCards = dealInfo.deckCards;
    startingState.cards.tableCards = dealInfo.tableCards;
    expect(startingState.cards.deckCards.length).toBe(61);
    expect(startingState.cards.tableCards.length).toBe(20);

    // const cardKey = "0000";
    // const expectedActions = [
    //   { type: cardsActions.CARD_FLIPPED, cardKey },
    //   { type: cardsActions.CHECK_MATCHES }
    // ];

    // const store = mockStore(startingState);
    // store.dispatch(cardsActions.cardClickedAndFollowUp(cardKey)).then(blah => {
    //   expect(blah).toBe(null);
    //   // return of async actions
    //   expect(store.getActions()).toEqual(expectedActions);
    // });
  });
});

describe("cardsActions", () => {
  it("should create an action to deal the cards", () => {
    const expectedAction = {
      type: cardsActions.DEAL_CARDS
    };
    expect(cardsActions.dealCards()).toEqual(expectedAction);
  });

  it("should create an action to flip a card", () => {
    const cardKey = "1102";
    const expectedAction = {
      type: cardsActions.CARD_FLIPPED,
      cardKey
    };
    expect(cardsActions.cardFlipped(cardKey)).toEqual(expectedAction);
  });
});

// cardClickedAndFollowUp
describe("cardClickedAndFollowUp", () => {
  it("should create an action to flip a card", () => {
    // expect(cardsActions.cardClickedAndFollowUp()).toEqual();
  });
});

// cardFlippedAndFollowUp

// switchUserAndFollowUp

// debugRemoveBunchOfCardsAndFollowUp
