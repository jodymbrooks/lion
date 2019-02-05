import cardUtilities from "../cardUtilities";

describe("dealCards", () => {
  it("should deal 20 cards to an empty table", () => {
    let dealInfo = cardUtilities.dealCards([], []); // [] => empty table

    expect(dealInfo.deckCards.length).toEqual(61);
    expect(dealInfo.tableCardsCount).toEqual(20);
  });

  it("should deal 2 cards to 2 empty slots if enough cards are left", () => {
    // Deal the initial table of cards
    let dealInfo = cardUtilities.dealCards([], []);
    let { tableCards, deckCards } = dealInfo;

    // Clear two cards from the table as if kept
    tableCards[0] = null;
    tableCards[19] = null;

    // Deal to fill out the 2 empty slots
    dealInfo = cardUtilities.dealCards(deckCards, tableCards);

    // Should be back to a full table including filling two slots that were empty
    expect(dealInfo.tableCardsCount).toEqual(20);
    expect(dealInfo.tableCards[0]).not.toBeNull();
    expect(dealInfo.tableCards[19]).not.toBeNull();
  });

  it("should deal 1 card to 2 empty slots if only one card is left", () => {
    // remove all but 21 cards, then deal 20 of them so only 1 card remains
    let deckCards = cardUtilities.getOrderedDeckCards(); // ordered doesn't really matter here
    deckCards.splice(0, 60);
    let dealInfo = cardUtilities.dealCards(deckCards, []); // deals 20 cards from the 21
    let { tableCards } = dealInfo;
    deckCards = dealInfo.deckCards;
    expect(deckCards.length).toEqual(1);

    // Clear two cards from the table as if kept
    tableCards[0] = null;
    tableCards[19] = null;

    // Deal to try to fill the empty 2 slots but only 1 will be filled
    dealInfo = cardUtilities.dealCards(deckCards, tableCards);

    // Should have only 19 cards now and 1 empty slot still
    expect(dealInfo.tableCardsCount).toEqual(19);
    expect(dealInfo.tableCards[0]).not.toBeNull();
    expect(dealInfo.tableCards[19]).toBeNull();
  });

  it("should not deal any more cards if none are left", () => {
    // remove all but 10 cards, then attempt to deal and see no more cards are dealt
    let deckCards = cardUtilities.getOrderedDeckCards(); // ordered doesn't really matter here
    deckCards.splice(0, 71);
    let dealInfo = cardUtilities.dealCards(deckCards, []); // deals only 10 cards as that's all that are left
    expect(dealInfo.tableCardsCount).toEqual(10); // only 10 could be dealt
    let { tableCards } = dealInfo;
    deckCards = dealInfo.deckCards;

    // No nead to clear any cards as there are already empty spots

    // Deal to try to fill the empty slots but none will be filled
    dealInfo = cardUtilities.dealCards(deckCards, tableCards);

    // Should have only 10 cards still
    expect(dealInfo.tableCardsCount).toEqual(10);
  });
});
