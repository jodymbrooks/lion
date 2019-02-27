import cardUtilities from "../cardUtilities";

describe("dealCards", () => {
  it("should deal 20 cards to an empty table and leave 61 cards in the deck", () => {
    let dealInfo = cardUtilities.dealCards([], []); // [] => empty table
    expect(dealInfo.tableCardsCount).toEqual(20);
    expect(dealInfo.deckCards.length).toEqual(61);
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
      dealInfo.tableCards[value].selected = true;
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
      dealInfo.tableCards[value].selected = true;
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
      dealInfo.tableCards[value].selected = true;
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

describe("getCardInfoFromAttrs", () => {
  it("should create the expected card from the given all 0 attr values", () => {
    const cardInfo = cardUtilities.getCardInfoFromAttrs(0, 0, 0, 0);
    expect(cardInfo).not.toBeNull();
    expect(cardInfo).toEqual({
      attrs: [0, 0, 0, 0],
      selected: false,
      index: null,
      key: "0000"
    });
  });

  it("should create the expected card from the given mixed attr values", () => {
    const cardInfo = cardUtilities.getCardInfoFromAttrs(0, 1, 2, 1);
    expect(cardInfo).not.toBeNull();
    expect(cardInfo).toEqual({
      attrs: [0, 1, 2, 1],
      selected: false,
      index: null,
      key: "0121"
    });
  });
});

describe("getOrderedDeckCards", () => {
  it("should create the expected deck of ordered cards", () => {
    const deckCards = cardUtilities.getOrderedDeckCards();
    expect(deckCards).not.toBeNull();
    expect(deckCards.length).toBe(81);
    expect(deckCards[0].key).toBe("0000");
    expect(deckCards[1].key).toBe("0001");
    expect(deckCards[2].key).toBe("0002");
    expect(deckCards[3].key).toBe("0010");
    expect(deckCards[4].key).toBe("0011");
    expect(deckCards[5].key).toBe("0012");
  });
});

describe("getShuffledDeckCards", () => {
  it("should create a deck of shuffled cards and first few cards should not be in order", () => {
    const deckCards = cardUtilities.getShuffledDeckCards();
    // Not much to reliably check on shuffled cards, but these things:
    // - got a non-null deck with 81 cards
    // - enough cards are out-of-order to verify shuffle occurred
    expect(deckCards).not.toBeNull();
    expect(deckCards.length).toBe(81);
    const firstFewAreStillOrdered =
      deckCards[0].key === "0000" &&
      deckCards[1].key === "0001" &&
      deckCards[2].key === "0002" &&
      deckCards[3].key === "0010";
    expect(firstFewAreStillOrdered).toBe(false);
  });
});

describe("getCardFromKey", () => {
  it("should return an expected card from a known key", () => {
    const deckCards = cardUtilities.getOrderedDeckCards();
    let card = cardUtilities.getCardFromKey(deckCards, "0000");
    expect(card).not.toBeNull();
    expect(card).toBe(deckCards[0]);

    card = cardUtilities.getCardFromKey(deckCards, "0001");
    expect(card).not.toBeNull();
    expect(card).toBe(deckCards[1]);

    card = cardUtilities.getCardFromKey(deckCards, "blah");
    expect(card).toBeNull();
    card = cardUtilities.getCardFromKey(deckCards, null);
    expect(card).toBeNull();
    card = cardUtilities.getCardFromKey(deckCards, "blahasdfasdf");
    expect(card).toBeNull();
  });
});

describe("decodeAttr", () => {
  it("should return the expected attributes for given attr codes", () => {
    let attr;

    attr = cardUtilities.decodeAttr(0, 0);
    expect(attr.index).toBe(0);
    expect(attr.name).toBe("green");

    attr = cardUtilities.decodeAttr(0, 1);
    expect(attr.index).toBe(1);
    expect(attr.name).toBe("purple");

    attr = cardUtilities.decodeAttr(0, 2);
    expect(attr.index).toBe(2);
    expect(attr.name).toBe("red");

    attr = cardUtilities.decodeAttr(1, 0);
    expect(attr.index).toBe(0);
    expect(attr.name).toBe("1");

    attr = cardUtilities.decodeAttr(1, 1);
    expect(attr.index).toBe(1);
    expect(attr.name).toBe("2");

    attr = cardUtilities.decodeAttr(1, 2);
    expect(attr.index).toBe(2);
    expect(attr.name).toBe("3");

    attr = cardUtilities.decodeAttr(2, 0);
    expect(attr.index).toBe(0);
    expect(attr.name).toBe("diamond");

    attr = cardUtilities.decodeAttr(2, 1);
    expect(attr.index).toBe(1);
    expect(attr.name).toBe("oval");

    attr = cardUtilities.decodeAttr(2, 2);
    expect(attr.index).toBe(2);
    expect(attr.name).toBe("rectangle");

    attr = cardUtilities.decodeAttr(3, 0);
    expect(attr.index).toBe(0);
    expect(attr.name).toBe("empty");

    attr = cardUtilities.decodeAttr(3, 1);
    expect(attr.index).toBe(1);
    expect(attr.name).toBe("striped");

    attr = cardUtilities.decodeAttr(3, 2);
    expect(attr.index).toBe(2);
    expect(attr.name).toBe("solid");

    attr = cardUtilities.decodeAttr(-1, 2);
    expect(attr).toBeNull();
    attr = cardUtilities.decodeAttr(4, 2);
    expect(attr).toBeNull();
    attr = cardUtilities.decodeAttr("asdf", 2);
    expect(attr).toBeNull();
    attr = cardUtilities.decodeAttr(0, 3);
    expect(attr).toBeNull();
  });
});

describe("getKeyFromAttrs", () => {
  it("should produce the expected keys from given attrs", () => {});
  expect(cardUtilities.getKeyFromAttrs(0, 0, 0, 0)).toBe("0000");
  expect(cardUtilities.getKeyFromAttrs(0, 0, 0, 1)).toBe("0001");
  expect(cardUtilities.getKeyFromAttrs(0, 0, 1, 0)).toBe("0010");
  expect(cardUtilities.getKeyFromAttrs(2, 1, 0, 1)).toBe("2101");
  expect(cardUtilities.getKeyFromAttrs(2, 2, 2, 2)).toBe("2222");
});

// cardUtilities.shuffleArray(arr) - basically a COTS function - already tested in getShuffledDeckCards

describe("getUnselectedCards", () => {
  const dealInfo = cardUtilities.dealCards([], []); // [] => empty table
  const { tableCards } = dealInfo;
  it("should find all table cards from a fresh deal", () => {
    expect(cardUtilities.getUnselectedCards(tableCards).length).toBe(20); // none selected from fesh deal
  });
  it("should find 19 cards after selecting 1 from a fresh deal", () => {
    tableCards[0].selected = true;
    expect(cardUtilities.getUnselectedCards(tableCards).length).toBe(19); // one selected
  });
  it("should find 18 cards after selecting 2 cards from a fresh deal", () => {
    tableCards[10].selected = true;
    expect(cardUtilities.getUnselectedCards(tableCards).length).toBe(18); // second one selected
  });
  it("should find no cards when the table is empty", () => {
    expect(cardUtilities.getUnselectedCards([]).length).toBe(0); // empty table
  });
});

// cardUtilities.checkForMatches(cards)
describe("checkForMatches", () => {
  let deckCards = cardUtilities.getOrderedDeckCards(); // ordered doesn't really matter here
  const dealInfo = cardUtilities.dealCards(deckCards, []); // [] => empty table
  const { tableCards } = dealInfo;
  it("should see matches from a full table of ordered cards", () => {
    expect(cardUtilities.checkForMatches(tableCards)).toBe(true);
  });
  it("should a match when only first two of ordered deck are left on the table", () => {
    tableCards.splice(2, 18);
    expect(cardUtilities.checkForMatches(tableCards)).toBe(true);
  });
  it("should see no matches when only 1 card is left on the table", () => {
    tableCards.splice(0, 1);
    expect(cardUtilities.checkForMatches(tableCards)).toBe(false);
  });
  it("should see no match from two selective cards that don't match", () => {
    const testCards = [deckCards[0], deckCards[80]];
    expect(cardUtilities.checkForMatches(testCards)).toBe(false);
  });
  it("should see no match from three selective cards that don't match", () => {
    const testCards = [deckCards[0], deckCards[40], deckCards[80]];
    expect(cardUtilities.checkForMatches(testCards)).toBe(false);
  });
});

describe("getAllMatches", () => {
  let deckCards = cardUtilities.getOrderedDeckCards(); // ordered doesn't really matter here
  const dealInfo = cardUtilities.dealCards(deckCards, []); // [] => empty table
  const { tableCards } = dealInfo;
  let allMatches = cardUtilities.getAllMatches(tableCards);
  it("should see 190 matches from an ordered deck's first deal", () => {
    expect(allMatches).not.toBe(null);
    expect(allMatches.length).toBe(190);
  });
  it("should see all 20 table cards match on a single attr from an ordered deck's first deal", () => {
    expect(allMatches[0].cards.length).toBe(20);
    expect(allMatches[0].matchingAttrs.length).toBe(1);
  });
  it("should see a select match towards the end matches on 2 cards and 3 attrs", () => {
    expect(allMatches[172].cards.length).toBe(2);
    expect(allMatches[172].matchingAttrs.length).toBe(3);
  });
  it("should see a select match further towards the end matches on 2 cards and 2 attrs", () => {
    expect(allMatches[177].cards.length).toBe(2);
    expect(allMatches[177].matchingAttrs.length).toBe(2);
  });
  it("should see the last match matches on 2 cards and 1 attr", () => {
    expect(allMatches[189].cards.length).toBe(2);
    expect(allMatches[189].matchingAttrs.length).toBe(1);
  });
});
