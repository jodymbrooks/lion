import React from 'react';

import Card from './components/Card';

export default class utilities {
  static colors = ['orange', 'teal', 'yellow'];
  static colorMap = { 'orange': '#FF752D', 'teal': '#02A4B7', 'yellow': '#D1BC13' };
  static sizes = ['small', 'medium', 'large'];
  static patterns = ['stripes', 'dots', 'stars'];
  static containers = ['jug', 'bottle', 'cup'];

  static checkForMatch = (card1, card2, matches) => {

    // For first test, any matches will do;
    // However for subsequent tests, only match against what's already matched
    var firstTest = (matches.count === null);

    // color
    if (firstTest) {
      if (card1.props.color === card2.props.color) {
        matches.color = card1.props.color;
      }
    }
    else {
      if (matches.color !== null && matches.color !== card2.props.color)
        matches.color = null;
    }

    // size
    if (firstTest) {
      if (card1.props.size === card2.props.size) {
        matches.size = card1.props.size;
      }
    }
    else {
      if (matches.size !== null && matches.size !== card2.props.size) {
        matches.size = null;
      }
    }

    // container
    if (firstTest) {
      if (card1.props.container === card2.props.container) {
        matches.container = card1.props.container;
      }
    }
    else {
      if (matches.container !== null && matches.container !== card2.props.container) {
        matches.container = null;
      }
    }

    // pattern
    if (firstTest) {
      if (card1.props.pattern === card2.props.pattern) {
        matches.pattern = card1.props.pattern;
      }
    }
    else {
      if (matches.pattern !== null && matches.pattern !== card2.props.pattern) {
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

  static GetKey(attr1, attr2, attr3, attr4) {
    var attrsObj = {
      attr1: attr1,
      attr2: attr2,
      attr3: attr3,
      attr4: attr4
    }
    var key = btoa(JSON.stringify(attrsObj)); // base64 encoded key so can put on DOM element and not be obvious which card it is
    return key;
  }

  static DecodeKey(key) {
    var attrs = JSON.parse(atob(key));
    return attrs;
  }

  static colorPropToState(colorProp) {
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

  static sizePropToState(sizeProp) {
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

  static containerPropToState(containerProp) {
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

  static patternPropToState(patternProp) {
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

  static shuffleArray(arr) {
    for (var idx = arr.length - 1; idx >= 0; idx--) {
      var randomIndex = Math.floor(Math.random() * (idx + 1));
      var itemAtIndex = arr[randomIndex];

      arr[randomIndex] = arr[idx];
      arr[idx] = itemAtIndex;
    }

    return arr;
  }

  static createCard(color, size, container, pattern, cardKeyJustShown, cardKeyJustHid, highlight) {
    var key = utilities.GetKey(color, size, container, pattern);
    var card = (
      <Card key={key} cardKey={key} color={color} size={size} container={container} pattern={pattern} cardKeyJustShown={cardKeyJustShown} cardKeyJustHid={cardKeyJustHid} highlight={highlight} />
    );

    return card;
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
            var cardInfo = {
              color: color,
              size: size,
              container: container,
              pattern: pattern
            };
            cardInfos.push(cardInfo);
          }
        }
      }
    }

    this.shuffleArray(cardInfos);

    return cardInfos;
  }




}