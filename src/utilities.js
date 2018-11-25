export default class utilities {
  static attrs = [
    {
      name: 'color',
      values: ['green', 'purple', 'red'],
      colorMap: { 'green': '#00C000', 'purple': '#C000C0', 'red': '#FF0000' }
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

  static attrNames = utilities.attrs.map(attr => attr.name);
  static colorAttr = utilities.attrs.filter(attr => typeof(attr.colorMap) !== "undefined");

  static cardCache = [];

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
      }
      else {
        if (matches.attrs[index] !== null && matches.attrs[index] !== card2attr)
          matches.attrs[index] = null;
      }
    });

    matches.count = 0
    matches.matchingAttrs = [];

    matches.attrs.forEach((attr, index) => {
      if (attr !== null) {
        matches.count++;
        matches.matchingAttrs.push(utilities.attrs[index].name);
      }  
    });

    return matches;
  }

  static getMatchingAttrs = (selectedCards) => {
    var matchingAttrs = utilities.attrNames;

    var selectedCardsCount = selectedCards.length;
    if (selectedCardsCount < 1)
      return [];

    if (selectedCardsCount === 1)
      return matchingAttrs;

    var matches = {
      attrs: [null, null, null, null],
      matchingAttrs: [],
      count: null
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

    let numAttr1Values = utilities.attrs[0].values.length;
    let numAttr2Values = utilities.attrs[0].values.length;
    let numAttr3Values = utilities.attrs[0].values.length;
    let numAttr4Values = utilities.attrs[0].values.length;


    for (var attr1 = 0; attr1 < numAttr1Values; attr1++) {
      for (var attr2 = 0; attr2 < numAttr2Values; attr2++) {
        for (var attr3 = 0; attr3 < numAttr3Values; attr3++) {
          for (var attr4 = 0; attr4 < numAttr4Values; attr4++) {
            const key = utilities.getKey(attr1, attr2, attr3, attr4);

            var cardInfo = {
              attrs: [attr1, attr2, attr3, attr4],
              key
            };
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

  // static decodeColor(colorProp) {
  //   var color = {
  //     index: null,
  //     name: null,
  //     value: null
  //   };

  //   var colorName;

  //   if (typeof (colorProp) === "string") {
  //     var colorIndex = utilities.colorAttr.values.indexOf(colorProp.toLowerCase());
  //     if (colorIndex !== -1) {
  //       colorName = utilities.colorAttr.values[colorIndex]; // get it from the array so it's normalized
  //       color = {
  //         index: colorIndex,
  //         name: colorName,
  //         value: utilities.colorAttr.colorMap[colorName]
  //       }
  //     }
  //   } else if (typeof (colorProp === "number")) {
  //     colorName = utilities.colorAttrs.name[colorProp];
  //     if (typeof (colorName) !== "undefined") {
  //       color = {
  //         index: colorProp,
  //         name: colorName,
  //         value: utilities.colorAttr.colorMap[colorName]
  //       }
  //     }
  //   }

  //   return color;
  // }

  static decodeAttr(index, value) {
    var attr = {
      index: null,
      name: null
    };

    var valueIndex;
    var valueName;

    if (typeof (value) === "string") {
      valueIndex = utilities.attrs[index].values.indexOf(value.toLowerCase());
      if (valueIndex !== -1) {
        valueName = utilities.attrs[index].name[valueIndex]; // get it from the array so it's normalized
        attr = {
          index: valueIndex,
          name: valueName
        }
      }
    } else if (typeof (value === "number")) {
      valueIndex = value;
      valueName = utilities.attrs[index].values[value];
      if (typeof (valueName) !== "undefined") {
        attr = {
          index: valueIndex,
          name: valueName
        }
      }
    }

    if (utilities.attrs[index].colorMap) {
      attr.value = utilities.attrs[index].colorMap[attr.name];
    }

    return attr;
  }

  // static decodePattern(patternProp) {
  //   var pattern = {
  //     index: null,
  //     name: null
  //   };

  //   var patternName;

  //   if (typeof (patternProp) === "string") {
  //     var patternIndex = utilities.attrs[3]s.indexOf(patternProp.toLowerCase());
  //     if (patternIndex !== -1) {
  //       patternName = utilities.attrs[3]s[patternIndex]; // get it from the array so it's normalized
  //       pattern = {
  //         index: patternIndex,
  //         name: patternName
  //       }
  //     }
  //   } else if (typeof (patternProp === "number")) {
  //     patternName = utilities.attrs[3]s[patternProp];
  //     if (typeof (patternName) !== "undefined") {
  //       pattern = {
  //         index: patternProp,
  //         name: patternName
  //       }
  //     }
  //   }

  //   return pattern;
  // }

  // static decodeSize(sizeProp) {
  //   var size = {
  //     index: null,
  //     name: null
  //   };

  //   var sizeName;

  //   if (typeof (sizeProp) === "string") {
  //     var sizeIndex = utilities.attrs[1]s.indexOf(sizeProp.toLowerCase());
  //     if (sizeIndex !== -1) {
  //       sizeName = utilities.attrs[1]s[sizeIndex]; // get it from the array so it's normalized
  //       size = {
  //         index: sizeIndex,
  //         name: sizeName
  //       }
  //     }
  //   } else if (typeof (sizeProp === "number")) {
  //     sizeName = utilities.attrs[1]s[sizeProp];
  //     if (typeof (sizeName) !== "undefined") {
  //       size = {
  //         index: sizeProp,
  //         name: sizeName
  //       }
  //     }
  //   }

  //   return size;
  // }

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
