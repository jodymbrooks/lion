export default class computerPlayer {
  static chooseACard(availableCards, allMatchesFromSeenCards) {
    /*  Rules for choosing a card
        - If a "seen" match exists with more than two cards, select one of its cards
        - If a "seen" match exists with only two cards, select a random card in hopes that it matches these two cards, then select these
        - If a match is selected and a "seen" card matches, select it
        - Otherwise select a random card
     */
    let card = computerPlayer.chooseCardFromSeenCardsMatches(
      allMatchesFromSeenCards,
      availableCards
    );

    if (!card) {
      // Else choose a random card
      const cardsLen = availableCards.length;
      if (cardsLen > 0) {
        const randomIndex = Math.floor(Math.random() * cardsLen);
        card = availableCards[randomIndex];
      }
    }

    return card;
  }

  static chooseCardFromSeenCardsMatches(allMatchesFromSeenCards, availableCards) {
    let card = null;
    if (allMatchesFromSeenCards && allMatchesFromSeenCards.length > 0) {
      const firstMatch = allMatchesFromSeenCards[0];
      card = firstMatch.cards.find(fmc => availableCards.find(ac => ac.key === fmc.key));
    }
    return card;
  }

  static keepOrChoose(possPoints, matchingAttrs, availableCards, allMatchesFromSeenCards) {
    let card = computerPlayer.chooseCardFromSeenCardsMatches(
      allMatchesFromSeenCards,
      availableCards
    );

    // If there's a card remaining in a seen match, then choose it
    if (card) return "choose";

    // Otherwise if there are possible points but only either a single matching attr or no cards left to choose, then keep; else choose
    return possPoints > 0 && (matchingAttrs.length === 1 || availableCards.length === 0)
      ? "keep"
      : "choose";
  }
}
