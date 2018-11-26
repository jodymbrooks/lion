export default class utilities {
  static colors = ['orange', 'teal', 'yellow'];
  static colorMap = { 'orange': '#FF752D', 'teal': '#02A4B7', 'yellow': '#D1BC13' };
  static sizes = ['small', 'medium', 'large'];
  static containers = ['jug', 'bottle', 'cup'];
  static patterns = ['stripes', 'dots', 'stars'];


  // static colors = ['green', 'purple', 'red'];
  // static counts = ['1', '2', '3'];
  // static patterns = ['empty', 'fenced', 'solid'];
  // static shapes = ['diamond', 'ellipse', 'rectangle'];

  static attrs = [
    {
      name: 'color',
      values: ['orange', 'teal', 'yellow'],
      colorMap: { 'orange': '#FF752D', 'teal': '#02A4B7', 'yellow': '#D1BC13' }
    },

    {
      name: 'size',
      values: ['small', 'medium', 'large']
    },

    {
      name: 'container',
      values: ['jug', 'bottle', 'cup']
    },

    {
      name: 'pattern',
      values: ['stripes', 'dots', 'stars']
    }
  ];



  static cardCache = [];

  static getMatches(card1, card2, matches) {

    // For first test, any matches will do;
    // However for subsequent tests, only match against what's already matched
    var firstTest = (matches.count === null);

    // color
    if (firstTest) {
      if (card1.color === card2.color) {
        matches.color = card1.color;
      }
    }
    else {
      if (matches.color !== null && matches.color !== card2.color)
        matches.color = null;
    }

    // size
    if (firstTest) {
      if (card1.size === card2.size) {
        matches.size = card1.size;
      }
    }
    else {
      if (matches.size !== null && matches.size !== card2.size) {
        matches.size = null;
      }
    }

    // container
    if (firstTest) {
      if (card1.container === card2.container) {
        matches.container = card1.container;
      }
    }
    else {
      if (matches.container !== null && matches.container !== card2.container) {
        matches.container = null;
      }
    }

    // pattern
    if (firstTest) {
      if (card1.pattern === card2.pattern) {
        matches.pattern = card1.pattern;
      }
    }
    else {
      if (matches.pattern !== null && matches.pattern !== card2.pattern) {
        matches.pattern = null;
      }
    }

    matches.count = 0
    matches.matchingAttrs = [];
    if (matches.color !== null) {
      matches.count++;
      matches.matchingAttrs.push('color');
    }
    if (matches.size !== null) {
      matches.count++;
      matches.matchingAttrs.push('size');
    }
    if (matches.container !== null) {
      matches.count++;
      matches.matchingAttrs.push('container');
    }
    if (matches.pattern !== null) {
      matches.count++;
      matches.matchingAttrs.push('pattern');
    }

    return matches;
  }

  static getMatchingAttrs = (selectedCards) => {
    var matchingAttrs = [
      'color',
      'size',
      'container',
      'pattern'
    ];

    var selectedCardsCount = selectedCards.length;
    if (selectedCardsCount < 1)
      return [];

    if (selectedCardsCount === 1)
      return matchingAttrs;

    var matches = {
      color: null,
      size: null,
      container: null,
      pattern: null,
      count: null,
      matchingAttrs: []
    };

    var cardKey1 = selectedCards[0];
    var card1 = utilities.cardCache[cardKey1];

    for (var idx = 1; idx < selectedCardsCount; idx++) {
      var cardKey2 = selectedCards[idx];
      var card2 = utilities.cardCache[cardKey2];
      matches = utilities.getMatches(card1, card2, matches);

      if (matches.count === 0)
        break;
    }

    return matches.matchingAttrs;
  }

  static createCardInfos() {
    var cardInfos = [];
    var numColors = utilities.colors.length;
    var numSizes = utilities.sizes.length;
    var numContainers = utilities.containers.length;
    var numPatterns = utilities.patterns.length;

    for (var color = 0; color < numColors; color++) {
      for (var size = 0; size < numSizes; size++) {
        for (var container = 0; container < numContainers; container++) {
          for (var pattern = 0; pattern < numPatterns; pattern++) {
            const key = utilities.getKey(color, size, container, pattern);

            var cardInfo = { color, size, container, pattern, key };
            cardInfos.push(cardInfo);
            utilities.cardCache[key] = cardInfo;
          }
        }
      }
    }

    this.shuffleArray(cardInfos);

    return cardInfos;
  }

  // static decodeKey(key) {
  //   var attrs = JSON.parse(atob(key));
  //   return attrs;
  // }

  static decodeColor(colorProp) {
    var color = {
      index: null,
      name: null,
      value: null
    };

    var colorName;

    if (typeof (colorProp) === "string") {
      var colorIndex = utilities.colors.indexOf(colorProp.toLowerCase());
      if (colorIndex !== -1) {
        colorName = utilities.colors[colorIndex]; // get it from the array so it's normalized
        color = {
          index: colorIndex,
          name: colorName,
          value: utilities.colorMap[colorName]
        }
      }
    } else if (typeof (colorProp === "number")) {
      colorName = utilities.colors[colorProp];
      if (typeof (colorName) !== "undefined") {
        color = {
          index: colorProp,
          name: colorName,
          value: utilities.colorMap[colorName]
        }
      }
    }

    return color;
  }

  static decodeContainer(containerProp) {
    var container = {
      index: null,
      name: null
    };

    var containerName;

    if (typeof (containerProp) === "string") {
      var containerIndex = utilities.containers.indexOf(containerProp.toLowerCase());
      if (containerIndex !== -1) {
        containerName = utilities.containers[containerIndex]; // get it from the array so it's normalized
        container = {
          index: containerIndex,
          name: containerName
        }
      }
    } else if (typeof (containerProp === "number")) {
      containerName = utilities.containers[containerProp];
      if (typeof (containerName) !== "undefined") {
        container = {
          index: containerProp,
          name: containerName
        }
      }
    }

    return container;
  }

  static decodePattern(patternProp) {
    var pattern = {
      index: null,
      name: null
    };

    var patternName;

    if (typeof (patternProp) === "string") {
      var patternIndex = utilities.patterns.indexOf(patternProp.toLowerCase());
      if (patternIndex !== -1) {
        patternName = utilities.patterns[patternIndex]; // get it from the array so it's normalized
        pattern = {
          index: patternIndex,
          name: patternName
        }
      }
    } else if (typeof (patternProp === "number")) {
      patternName = utilities.patterns[patternProp];
      if (typeof (patternName) !== "undefined") {
        pattern = {
          index: patternProp,
          name: patternName
        }
      }
    }

    return pattern;
  }

  static decodeSize(sizeProp) {
    var size = {
      index: null,
      name: null
    };

    var sizeName;

    if (typeof (sizeProp) === "string") {
      var sizeIndex = utilities.sizes.indexOf(sizeProp.toLowerCase());
      if (sizeIndex !== -1) {
        sizeName = utilities.sizes[sizeIndex]; // get it from the array so it's normalized
        size = {
          index: sizeIndex,
          name: sizeName
        }
      }
    } else if (typeof (sizeProp === "number")) {
      sizeName = utilities.sizes[sizeProp];
      if (typeof (sizeName) !== "undefined") {
        size = {
          index: sizeProp,
          name: sizeName
        }
      }
    }

    return size;
  }

  static getKey(attr1, attr2, attr3, attr4) {
    const key = `${attr1}${attr2}${attr3}${attr4}`;
    // const attrsObj = {
    //   attr1: attr1,
    //   attr2: attr2,
    //   attr3: attr3,
    //   attr4: attr4
    // }
    // var key = btoa(JSON.stringify(attrsObj)); // base64 encoded key so can put on DOM element and not be obvious which card it is
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
}
