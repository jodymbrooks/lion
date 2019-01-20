export default class computerPlayer {
  static chooseACard(deckCards) {
    let card = null;
    const deckCardsLen = deckCards.length;
    while (deckCardsLen > 0 && card === null) {
      const randomIndex = Math.floor(Math.random() * deckCardsLen);
      card = deckCards[randomIndex];
    }

    return card;
  }
}
