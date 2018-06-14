import React, { Component } from 'react';
import Card from './Card';
import Overlay from './Overlay';
import './App.css';

class Table extends Component {

    constructor(props) {
        super(props);

        var cards = this.createCards();

        this.state = {
            cards: cards,
            selectedCards: [],
            overlayShown: false,
        };

        document.body.addEventListener("click", this.handleClick);
    }

    handleClick = event => {
        console.log("Clicked");
        console.log(event);

        var cardElement = event.target.closest('.Card');
        if (!cardElement)
            return;

        var card = this.state.cards.find(card => {
            return cardElement.classList.contains(card.key);
        });

        if (!card)
            return;

        var faceDown = card.props.facedown;
        if (!faceDown)
            return;

        this.showCard(card);

        var allMatch = this.checkShownCards();
        this.highlightSelectedCards(allMatch);

        if (!allMatch) {
            this.showOverlay();
            window.setTimeout(this.resetFlippedCards.bind(this), 2000);
        }

        event.stopPropagation();
    }

    showOverlay = () => {
        this.setState({ overlayShown: true });
    }

    hideOverlay = () => {
        this.setState({ overlayShown: false });
    }

    resetFlippedCards = () => {
        var cards = [...this.state.cards];
        this.state.selectedCards.forEach(card => {
            this.hideCard(card, cards);
        });


        this.setState({
            cards: cards,
            selectedCards: []
        });

        this.hideOverlay();
    }

    showCard = (card) => {
        var cardIndex = this.state.cards.indexOf(card);

        var newCard = this.createCard(card.props.color, card.props.size, card.props.container, card.props.pattern, false);
        var cards = [...this.state.cards];
        cards[cardIndex] = newCard;

        this.setState({
            cards: cards,
            selectedCards: [...this.state.selectedCards, newCard]
        })
    }

    hideCard = (card, cards) => {
        var cardIndex = this.state.cards.indexOf(card);
        if (cardIndex === -1) return;

        var newCard = this.createCard(card.props.color, card.props.size, card.props.container, card.props.pattern, true);
        cards[cardIndex] = newCard;
    }

    highlightSelectedCards = (allMatch) => {
        var highlight = (allMatch ? "match" : "mismatch");

        var cards = [...this.state.cards];

        this.state.selectedCards.forEach(card => {
            var cardIndex = this.state.cards.indexOf(card);

            var newCard = this.createCard(card.props.color, card.props.size, card.props.container, card.props.pattern, card.props.faceDown, highlight);
            cards[cardIndex] = newCard;
        });

        this.setState({
            cards: cards
        })
    }

    checkShownCards = () => {
        var allMatch = true;

        var selectedCardsCount = this.state.selectedCards.length;
        if (selectedCardsCount <= 1)
            return allMatch;

        var matches = {
            color: null,
            size: null,
            container: null,
            pattern: null,
            count: null
        };

        var card1 = this.state.selectedCards[0];

        for (var idx = 1; idx < selectedCardsCount; idx++) {
            var card2 = this.state.selectedCards[idx];
            matches = this.checkForMatch(card1, card2, matches);

            if (matches.count === 0)
                break;
        }

        allMatch = matches.count > 0;

        return allMatch;
    }

    checkForMatch = (card1, card2, matches) => {

        // For first test, any matches will do;
        // However for subsequent tests, only match against what's already matched
        var firstTest = (matches.count === null);

        // color
        if (firstTest) {
            if (card1.props.color === card2.props.color)
                matches.color = card1.props.color;
        }
        else {
            if (matches.color !== null && matches.color !== card2.props.color)
                matches.color = null;
        }

        // size
        if (firstTest) {
            if (card1.props.size === card2.props.size)
                matches.size = card1.props.size;
        }
        else {
            if (matches.size !== null && matches.size !== card2.props.size)
                matches.size = null;
        }

        // container
        if (firstTest) {
            if (card1.props.container === card2.props.container)
                matches.container = card1.props.container;
        }
        else {
            if (matches.container !== null && matches.container !== card2.props.container)
                matches.container = null;
        }

        // pattern
        if (firstTest) {
            if (card1.props.pattern === card2.props.pattern)
                matches.pattern = card1.props.pattern;
        }
        else {
            if (matches.pattern !== null && matches.pattern !== card2.props.pattern)
                matches.pattern = null;
        }

        matches.count = 0
        matches.count += (matches.color !== null ? 1 : 0);
        matches.count += (matches.size !== null ? 1 : 0);
        matches.count += (matches.container !== null ? 1 : 0);
        matches.count += (matches.pattern !== null ? 1 : 0);

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

    createCard(color, size, container, pattern, faceDown, highlight) {
        if (!highlight) {
            highlight = "none";
        }
        var key = Card.GetKey(color, size, container, pattern);
        var card = (<Card key={key} color={color} size={size} container={container} pattern={pattern} facedown={faceDown} highlight={highlight} />);

        return card;
    }

    createCards() {
        var cards = [];
        var numColors = Card.colors.length;
        var numSizes = Card.sizes.length;
        var numContainers = Card.containers.length;
        var numPatterns = Card.patterns.length;

        for (var color = 0; color < numColors; color++) {
            for (var size = 0; size < numSizes; size++) {
                for (var container = 0; container < numContainers; container++) {
                    for (var pattern = 0; pattern < numPatterns; pattern++) {
                        var card = this.createCard(color, size, container, pattern, true);

                        cards.push(card);
                    }
                }
            }
        }

        this.shuffleArray(cards);

        return cards;
    }


    render() {
        return (
            <div className="Table">
                {this.state.cards.slice(0, 12)}
                <Overlay shown={this.state.overlayShown} />
            </div>
        );
    }
}

export default Table;
