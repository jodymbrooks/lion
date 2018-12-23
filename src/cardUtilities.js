export const tableMaxCards = 20;

export default class cardUtilities {
  static attrs = [{
      name: 'color',
      values: ['green', 'purple', 'red'],
      colorMap: {
        'green': '#00C000',
        'purple': '#C000C0',
        'red': '#FF0000'
      }
    },

    {
      name: 'count',
      values: ['1', '2', '3'],
      isColor: false
    },

    {
      name: 'shape',
      values: ['diamond', 'oval', 'rectangle'],
      isColor: false
    },

    {
      name: 'pattern',
      values: ['empty', 'striped', 'solid'],
      isColor: false
    }
  ];

  static attrNames = cardUtilities.attrs.map(attr => attr.name);
  static colorAttr = cardUtilities.attrs.filter(attr => typeof (attr.colorMap) !== "undefined");

  static getSelectedCards(tableCards) {
    const selectedCards = tableCards.filter(card => card !== null && !card.faceDown);
    return selectedCards;
  }

  static getMatches(card1, card2, matches) {

    // For first test, any matches will do;
    // However for subsequent tests, only match against what's already matched
    var firstTest = (matches.count === null);

    card1.attrs.forEach((card1attr, index) => {
      let card2attr = card2.attrs[index];
      if (firstTest) {
        if (card1attr === card2attr) {
          matches.attrs[index] = card1attr;
        }
      } else {
        if (matches.attrs[index] !== null && matches.attrs[index] !== card2attr)
          matches.attrs[index] = null;
      }
    });

    matches.count = 0
    matches.matchingAttrs = [];

    matches.attrs.forEach((attr, index) => {
      if (attr !== null) {
        matches.count++;
        matches.matchingAttrs.push(cardUtilities.attrs[index].name);
      }
    });

    return matches;
  }

  static getMatchingAttrs = (selectedCards) => {
    // var matchingAttrs = cardUtilities.attrNames;

    var selectedCardsCount = selectedCards.length;
    if (selectedCardsCount < 1)
      return [];

    if (selectedCardsCount === 1)
      return null;

    var matches = {
      attrs: [null, null, null, null],
      matchingAttrs: [],
      count: null
    };

    var card1 = selectedCards[0];

    for (var idx = 1; idx < selectedCardsCount; idx++) {
      var card2 = selectedCards[idx];
      matches = cardUtilities.getMatches(card1, card2, matches);

      if (matches.count === 0)
        break;
    }

    return matches.matchingAttrs;
  }

  static getCardInfoFromAttrs(attr1, attr2, attr3, attr4) {
    const key = cardUtilities.getKeyFromAttrs(attr1, attr2, attr3, attr4);

    var cardInfo = {
      attrs: [attr1, attr2, attr3, attr4],
      key,
      faceDown: true,
      index: null // used when dealt to table
    };

    return cardInfo;
  }

  static getOrderedDeckCards() {
    var deckCards = [];

    let numAttr1Values = cardUtilities.attrs[0].values.length;
    let numAttr2Values = cardUtilities.attrs[0].values.length;
    let numAttr3Values = cardUtilities.attrs[0].values.length;
    let numAttr4Values = cardUtilities.attrs[0].values.length;


    for (var attr1 = 0; attr1 < numAttr1Values; attr1++) {
      for (var attr2 = 0; attr2 < numAttr2Values; attr2++) {
        for (var attr3 = 0; attr3 < numAttr3Values; attr3++) {
          for (var attr4 = 0; attr4 < numAttr4Values; attr4++) {
            var cardInfo = cardUtilities.getCardInfoFromAttrs(attr1, attr2, attr3, attr4);
            deckCards.push(cardInfo);
          }
        }
      }
    }

    return deckCards;
  }

  static getShuffledDeckCards() {
    var deckCards = cardUtilities.getOrderedDeckCards();

    const timesToShuffle = Math.floor(Math.random() * 50) + 10; // At least 10
    for (let idx = 0; idx < timesToShuffle; idx++) {
      this.shuffleArray(deckCards);
    }

    return deckCards;
  }

  static getCardFromKey(cards, key) {
    const card = cards.find(card => card !== null && card.key === key);

    return card ? card : null;
  }

  static decodeAttr(index, value) {
    var attr = {
      index: null,
      name: null
    };

    var valueIndex;
    var valueName;

    if (typeof (value) === "string") {
      valueIndex = cardUtilities.attrs[index].values.indexOf(value.toLowerCase());
      if (valueIndex !== -1) {
        valueName = cardUtilities.attrs[index].name[valueIndex]; // get it from the array so it's normalized
        attr = {
          index: valueIndex,
          name: valueName
        }
      }
    } else if (typeof (value === "number")) {
      valueIndex = value;
      valueName = cardUtilities.attrs[index].values[value];
      if (typeof (valueName) !== "undefined") {
        attr = {
          index: valueIndex,
          name: valueName
        }
      }
    }

    if (cardUtilities.attrs[index].colorMap) {
      attr.value = cardUtilities.attrs[index].colorMap[attr.name];
    }

    return attr;
  }

  static getKeyFromAttrs(attr1, attr2, attr3, attr4) {
    const key = `${attr1}${attr2}${attr3}${attr4}`;
    return key;
  }

  static shuffleArray(arr) {
    for (var idx = arr.length - 1; idx >= 0; idx--) {
      var randomIndex = Math.floor(Math.random() * (idx + 1));
      var itemAtIndex = arr[randomIndex];

      arr[randomIndex] = arr[idx];
      arr[idx] = itemAtIndex;
    }

    return arr;
  }

  static dealCards(deckCards, tableCards) {
    let newTableCards;
    let newDeckCards;

    if (tableCards.length === 0) {
      newTableCards = new Array(tableMaxCards).fill(null);
    } else {
      newTableCards = [...tableCards];
    }

    if (deckCards.length === 0) {
      newDeckCards = cardUtilities.getShuffledDeckCards();
    } else {
      newDeckCards = [...deckCards];
    }



    let tableCardsCount = 0;
    newTableCards.forEach((tableCard, idx) => {
      // Replace empty table slots (null values) with the next available deck card, if any
      if (tableCard === null) {
        if (newDeckCards.length > 0) {
          const [card] = newDeckCards.splice(0, 1); // returns an array of the spliced entries which is just one entry
          newTableCards[idx] = { ...card, index: idx };
          tableCardsCount++;
        }
      }
      else {
        tableCardsCount++;
      }
    });

    return { 
      deckCards: newDeckCards,
      tableCards: newTableCards,
      tableCardsCount
    };
  }





}