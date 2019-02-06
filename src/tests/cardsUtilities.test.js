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

describe("getSelectedCards", () => {
  it("should return empty array if no cards are selected", () => {
    const dealInfo = cardUtilities.dealCards([], []); // [] => empty table
    const selectedCards = cardUtilities.getSelectedCards(dealInfo.tableCards);
    expect(selectedCards).not.toBeNull();
    expect(selectedCards.length).toBe(0);
  });

  it("should return 1 matching card if only 1 card is selected", () => {
    const dealInfo = cardUtilities.dealCards([], []); // [] => empty table
    const cardsToSelect = [10];
    cardsToSelect.map((value, index) => {
      dealInfo.tableCards[value].faceDown = false;
    });
    const selectedCards = cardUtilities.getSelectedCards(dealInfo.tableCards);
    expect(selectedCards).not.toBeNull();
    expect(selectedCards.length).toBe(cardsToSelect.length);
    cardsToSelect.map((value, index) => {
      expect(selectedCards[index]).toBe(dealInfo.tableCards[value]);
    });
  });

  it("should return 2 matching cards if 2 cards are selected", () => {
    const dealInfo = cardUtilities.dealCards([], []); // [] => empty table
    const cardsToSelect = [10, 11];
    cardsToSelect.map((value, index) => {
      dealInfo.tableCards[value].faceDown = false;
    });
    const selectedCards = cardUtilities.getSelectedCards(dealInfo.tableCards);
    expect(selectedCards).not.toBeNull();
    expect(selectedCards.length).toBe(cardsToSelect.length);
    cardsToSelect.map((value, index) => {
      expect(selectedCards[index]).toBe(dealInfo.tableCards[value]);
    });
  });

  it("should return 5 matching cards if 5 cards are selected", () => {
    const dealInfo = cardUtilities.dealCards([], []); // [] => empty table
    const cardsToSelect = [0, 4, 8, 12, 19];
    cardsToSelect.map((value, index) => {
      dealInfo.tableCards[value].faceDown = false;
    });
    const selectedCards = cardUtilities.getSelectedCards(dealInfo.tableCards);
    expect(selectedCards).not.toBeNull();
    expect(selectedCards.length).toBe(cardsToSelect.length);
    cardsToSelect.map((value, index) => {
      expect(selectedCards[index]).toBe(dealInfo.tableCards[value]);
    });
  });
});

describe("getMatches", () => {
  it("should see 3 items matching between adjacent ordered cards", () => {
    // get orderedDeck so we know which cards we have
    const deckCards = cardUtilities.getOrderedDeckCards();
    const card1 = deckCards[0];
    const card2 = deckCards[1];
    const matches = cardUtilities.getMatches(card1, card2, null);
    expect(matches).not.toBeNull();
    expect(matches.count).toBe(3);
    expect(matches.matchingAttrs).toEqual(["color", "count", "shape"]);
  });

  it("should see 2 items matching between choice cards", () => {
    // get orderedDeck so we know which cards we have
    const deckCards = cardUtilities.getOrderedDeckCards();
    const card1 = deckCards[0];
    const card2 = deckCards[19];
    const matches = cardUtilities.getMatches(card1, card2, null);
    expect(matches).not.toBeNull();
    expect(matches.count).toBe(2);
    expect(matches.matchingAttrs).toEqual(["color", "shape"]);
  });

  it("should see 1 item matching between choice cards", () => {
    // get orderedDeck so we know which cards we have
    let deckCards = cardUtilities.getOrderedDeckCards();
    const card1 = deckCards[0];
    const card2 = deckCards[37];
    const matches = cardUtilities.getMatches(card1, card2, null);
    expect(matches).not.toBeNull();
    expect(matches.count).toBe(1);
    expect(matches.matchingAttrs).toEqual(["shape"]);
  });

  it("should see 0 items matching between choice cards", () => {
    // get orderedDeck so we know which cards we have
    let deckCards = cardUtilities.getOrderedDeckCards();
    const card1 = deckCards[0];
    const card2 = deckCards[80];
    const matches = cardUtilities.getMatches(card1, card2, null);
    expect(matches).not.toBeNull();
    expect(matches.count).toBe(0);
    expect(matches.matchingAttrs).toEqual([]);
  });

  it("should see 3 items matching between adjacent ordered cards, then 2, then 1, then 0 as choice cards are added", () => {
    // get orderedDeck so we know which cards we have
    const deckCards = cardUtilities.getOrderedDeckCards();
    const card1 = deckCards[0];
    let card2 = deckCards[1];
    let matches = cardUtilities.getMatches(card1, card2, null);
    expect(matches).not.toBeNull();
    expect(matches.count).toBe(3);
    expect(matches.matchingAttrs).toEqual(["color", "count", "shape"]);

    card2 = deckCards[19];
    matches = cardUtilities.getMatches(card1, card2, matches);
    expect(matches).not.toBeNull();
    expect(matches.count).toBe(2);
    expect(matches.matchingAttrs).toEqual(["color", "shape"]);

    card2 = deckCards[37];
    matches = cardUtilities.getMatches(card1, card2, matches);
    expect(matches).not.toBeNull();
    expect(matches.count).toBe(1);
    expect(matches.matchingAttrs).toEqual(["shape"]);

    card2 = deckCards[80];
    matches = cardUtilities.getMatches(card1, card2, matches);
    expect(matches).not.toBeNull();
    expect(matches.count).toBe(0);
    expect(matches.matchingAttrs).toEqual([]);
  });
});

describe("getMatchingAttrs", () => {
  it("should see 3 items matching between adjacent ordered cards", () => {
    // get orderedDeck so we know which cards we have
    const deckCards = cardUtilities.getOrderedDeckCards();
    const selectedCards = [deckCards[0], deckCards[1]];
    const matchingAttrs = cardUtilities.getMatchingAttrs(selectedCards);
    expect(matchingAttrs).not.toBeNull();
    expect(matchingAttrs.length).toBe(3);
    expect(matchingAttrs).toEqual(["color", "count", "shape"]);
  });

  it("should see 2 items matching between choice cards", () => {
    // get orderedDeck so we know which cards we have
    const deckCards = cardUtilities.getOrderedDeckCards();
    const selectedCards = [deckCards[0], deckCards[19]];
    const matchingAttrs = cardUtilities.getMatchingAttrs(selectedCards);
    expect(matchingAttrs).not.toBeNull();
    expect(matchingAttrs.length).toBe(2);
    expect(matchingAttrs).toEqual(["color", "shape"]);
  });

  it("should see 1 item matching between choice cards", () => {
    // get orderedDeck so we know which cards we have
    const deckCards = cardUtilities.getOrderedDeckCards();
    const selectedCards = [deckCards[0], deckCards[37]];
    const matchingAttrs = cardUtilities.getMatchingAttrs(selectedCards);
    expect(matchingAttrs).not.toBeNull();
    expect(matchingAttrs.length).toBe(1);
    expect(matchingAttrs).toEqual(["shape"]);
  });

  it("should see 0 items matching between choice cards", () => {
    // get orderedDeck so we know which cards we have
    const deckCards = cardUtilities.getOrderedDeckCards();
    const selectedCards = [deckCards[0], deckCards[80]];
    const matchingAttrs = cardUtilities.getMatchingAttrs(selectedCards);
    expect(matchingAttrs).not.toBeNull();
    expect(matchingAttrs.length).toBe(0);
    expect(matchingAttrs).toEqual([]);
  });

  it("should see 3 items matching between adjacent ordered cards, then 2, then 1, then 0 as choice cards are added", () => {
    // get orderedDeck so we know which cards we have
    const deckCards = cardUtilities.getOrderedDeckCards();
    const selectedCards = [deckCards[0], deckCards[1], deckCards[19], deckCards[37]];
    const matchingAttrs = cardUtilities.getMatchingAttrs(selectedCards);
    expect(matchingAttrs).not.toBeNull();
    expect(matchingAttrs.length).toBe(1);
    expect(matchingAttrs).toEqual(["shape"]);
  });

  it("should see 2 items matching between 7 adjacent, ordered cards", () => {
    // get orderedDeck so we know which cards we have
    const deckCards = cardUtilities.getOrderedDeckCards();
    const selectedCards = deckCards.slice(0, 6); // pick the first 7 cards of the ordered deck
    const matchingAttrs = cardUtilities.getMatchingAttrs(selectedCards);
    expect(matchingAttrs).not.toBeNull();
    expect(matchingAttrs.length).toBe(2);
    expect(matchingAttrs).toEqual(["color", "count"]);
  });
});

// cardUtilities.getCardInfoFromAttrs(attr1, attr2, attr3, attr4)
// cardUtilities.getOrderedDeckCards()
// cardUtilities.getShuffledDeckCards()
// cardUtilities.getCardFromKey(cards, key)
// cardUtilities.decodeAttr(index, value)
// cardUtilities.getKeyFromAttrs(attr1, attr2, attr3, attr4)
// cardUtilities.shuffleArray(arr)
// cardUtilities.getFaceDownCards(tableCards)
// cardUtilities.checkForMatches(cards)
// cardUtilities.getAllMatches(cards)
