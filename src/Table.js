import React, { Component } from 'react';
import Card from './Card';
import Overlay from './Overlay';
import './App.css';

class Table extends Component {

    cardInfos = null;
    cards = null;

    constructor(props) {
        super(props);

        this.state = {
            selectedCards: [],
            overlayShown: false,
            highlight: "none",
            cardKeyJustShown: null,
            cardKeyJustHid: null,
        };

        document.body.addEventListener("click", this.handleClick);
    }

    handleClick = event => {
        console.log("Clicked");
        console.log(event);

        var cardElement = event.target.closest('.Card');
        if (!cardElement)
            return;

        var card = this.cards.find(card => {
            return cardElement.classList.contains(card.props.cardKey);
        });

        if (!card)
            return;

        this.showCard(card);

        event.stopPropagation();
    }

    showOverlay = () => {
        this.setState({ overlayShown: true });
    }

    hideOverlay = () => {
        this.setState({ overlayShown: false });
    }

    resetFlippedCards = () => {
        //var cards = [...this.cards];
        this.state.selectedCards.forEach(card => {
            this.hideCard(card/*, cards*/);
        });


        this.setState({
            //cards: cards,
            selectedCards: []
        });

        this.hideOverlay();
    }

    showCard = (card) => {
        var newSelectedCards = [...this.state.selectedCards, card];
        var numNewSelectedCards = newSelectedCards.length;
        var matchingAttrs = this.checkShownCards(newSelectedCards);
        var allMatch = (matchingAttrs.length > 0);

        if (allMatch && numNewSelectedCards > 1) {
            var possPoints = numNewSelectedCards * numNewSelectedCards;
            this.props.scoreStore.dispatch({
                type: 'SET',
                possPoints: possPoints,
                matchingAttrs: matchingAttrs
            });
        }
        else {
            this.props.scoreStore.dispatch({
                type: 'SET',
                possPoints: 0,
                matchingAttrs: []
            });
        }

        var highlight = (allMatch ? "highlight-match" : "highlight-mismatch");
        
        this.setState({
            cardKeyJustShown: card.props.cardKey,
            carKeyJustHid: null,
            highlight: highlight,
            selectedCards: newSelectedCards
        });

        if (!allMatch) {
            this.showOverlay();
            window.setTimeout(this.resetFlippedCards.bind(this), 2000);
        }

    }

    hideCard = (card/*, cards*/) => {
        this.setState({
            cardKeyJustShown: null,
            cardKeyJustHid: card.props.cardKey
        });
    }

    checkShownCards = (selectedCards) => {
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

        var card1 = selectedCards[0];

        for (var idx = 1; idx < selectedCardsCount; idx++) {
            var card2 = selectedCards[idx];
            matches = this.checkForMatch(card1, card2, matches);

            if (matches.count === 0)
                break;
        }

        return matches.matchingAttrs;
    }

    checkForMatch = (card1, card2, matches) => {

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

    shuffleArray(arr) {
        for (var idx = arr.length - 1; idx >= 0; idx--) {
            var randomIndex = Math.floor(Math.random() * (idx + 1));
            var itemAtIndex = arr[randomIndex];

            arr[randomIndex] = arr[idx];
            arr[idx] = itemAtIndex;
        }

        return arr;
    }

    createCard(color, size, container, pattern) {
        var key = Card.GetKey(color, size, container, pattern);
        var card = (<Card key={key} cardKey={key} color={color} size={size} container={container} pattern={pattern} cardKeyJustShown={this.state.cardKeyJustShown} cardKeyJustHid={this.state.cardKeyJustHid} highlight={this.state.highlight} />);

        return card;
    }

    createCardInfos() {
        var cardInfos = [];
        var numColors = Card.colors.length;
        var numSizes = Card.sizes.length;
        var numContainers = Card.containers.length;
        var numPatterns = Card.patterns.length;

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

    render() {
        if (!this.cardInfos) {
            this.cardInfos = this.createCardInfos();
            this.cards = [];
        }

        return (
            <div className="Table" data-cardkeyjustshown={this.state.cardKeyJustShown} data-cardkeyjusthid={this.state.cardKeyJustHid} data-highlight={this.state.highlight} >

                {
                    this.cardInfos.slice(0, 12).map((cardInfo) => {
                        var card = this.createCard(cardInfo.color, cardInfo.size, cardInfo.container, cardInfo.pattern);
                        this.cards.push(card);
                        return card;
                    })
                }

                <Overlay shown={this.state.overlayShown} />
            </div>
        );
    }
}

export default Table;
