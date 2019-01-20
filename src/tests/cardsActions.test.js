import * as cardsActions from "../actions/cardsActions";

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
