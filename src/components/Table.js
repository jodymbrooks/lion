import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../App.css';
import Overlay from './Overlay';
import { showOverlay, hideOverlay } from '../actions/common';
import { keepScore, setScore } from '../actions/score';
import utilities from '../utilities';

class Table extends Component {

    cardInfos = null;
    cards = null;

    constructor(props) {
        super(props);

        this.state = {
            selectedCards: [],
            highlight: "none",
            cardKeyJustShown: null,
            cardKeyJustHid: null,
        };

        document.body.addEventListener("click", this.handleClick);

    }

    handleClick = event => {
        console.log("Clicked");
        console.log(event);

        if (event.target.id === 'keepButton') {
            this.keepMatches();
            return;
        }

        var cardElement = event.target.closest('.Card');
        if (!cardElement)
            return;

        var card = this.cards.find(card => {
            return cardElement.getAttribute("data-key") === card.props.cardKey;
        });

        if (!card)
            return;

        this.showCard(card);

        event.stopPropagation();
    }

    keepMatches = () => {
        this.props.dispatch(keepScore());

        // Remove each selected (matched) card's cardInfo peer
        this.state.selectedCards.forEach((function(card) {
            var index = this.cards.indexOf(card); // the index of the card is the same index of cardInfo to remove
            if (index !== -1) {
                this.cardInfos.splice(index, 1); // remove the card
            }
        }).bind(this));

        // Reset the proper state items
        this.setState({
            selectedCards: [],
            overlayShown: false,
            highlight: "none",
            cardKeyJustShown: null,
            cardKeyJustHid: null,
        });
    }

    showOverlay = () => {
        this.props.dispatch(showOverlay());
    }

    hideOverlay = () => {
      this.props.dispatch(hideOverlay());
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

    removeSet = () => {

    }

    showCard = (card) => {
        var newSelectedCards = [...this.state.selectedCards, card];
        var numNewSelectedCards = newSelectedCards.length;
        var matchingAttrs = this.checkShownCards(newSelectedCards);
        var allMatch = (matchingAttrs.length > 0);

        if (allMatch && numNewSelectedCards > 1) {
            var possPoints = numNewSelectedCards * numNewSelectedCards;
            this.props.dispatch(setScore(possPoints, matchingAttrs));
        }
        else {
            this.props.dispatch(setScore(0, []));
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
            matches = utilities.checkForMatch(card1, card2, matches);

            if (matches.count === 0)
                break;
        }

        return matches.matchingAttrs;
    }

    render() {
        if (!this.cardInfos) {
            this.cardInfos = utilities.createCardInfos();
        }
        this.cards = [];

        return (
            <div className="Table" data-cardkeyjustshown={this.state.cardKeyJustShown} data-cardkeyjusthid={this.state.cardKeyJustHid} data-highlight={this.state.highlight} >
                <Overlay />

                {
                    this.cardInfos.slice(0, 12).map((cardInfo) => {
                        var card = utilities.createCard(cardInfo.color, cardInfo.size, cardInfo.container, cardInfo.pattern, this.state.cardKeyJustShown, this.state.cardKeyJustHid, this.state.highlight);
                        this.cards.push(card);
                        return card;
                    })
                }

            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    common: state.common,
    score: state.score
  };
}

export default connect(mapStateToProps)(Table);
