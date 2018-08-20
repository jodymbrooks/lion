import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../App.css';
import Card from './Card';
import Overlay from './Overlay';
import { showOverlay, hideOverlay } from '../actions/commonActions';
import { keepScore } from '../actions/scoreActions';
import utilities from '../utilities';

class Table extends Component {

  cardInfos = null;
  cards = null;

  constructor(props) {
    super(props);

    //     document.body.addEventListener("click", this.handleClick);
    if (!this.cardInfos) {
      this.cardInfos = utilities.createCardInfos();
    }
  }

  keepMatches = () => {
    this.props.dispatch(keepScore());

    // Remove each selected (matched) card's cardInfo peer
    this.state.selectedCards.forEach((card) => {
      var index = this.cards.indexOf(card); // the index of the card is the same index of cardInfo to remove
      if (index !== -1) {
        this.cardInfos.splice(index, 1); // remove the card
      }
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
      this.hideCard(card);
    });


    this.setState({
      //cards: cards,
      selectedCards: []
    });

    this.hideOverlay();
  }

  removeSet = () => {

  }

  getCards = (count) => {
    this.cards = [];
    this.cardInfos.slice(0, count).map((cardInfo) => {
      const { key, color, size, container, pattern } = cardInfo;

      var card = (
        <div key={key} className="Table_grid_item">
          <Card cardKey={key} color={color} size={size} container={container} pattern={pattern} />
        </div>
      );
      this.cards.push(card);
      return card;
    })
  }

  render() {
    this.getCards(20);

    return (
      <div className="Table">
        <Overlay />
        <div className="Table_grid">
          {this.cards}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    common: state.common,
    score: state.score,
    cards: state.cards
  };
}

export default connect(mapStateToProps)(Table);
