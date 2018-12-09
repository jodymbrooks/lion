import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../App.css';
import Card from './Card';
import Overlay from './Overlay';
import { dealCards } from '../actions/scoreActions';

class Table extends Component {

  constructor(props) {
    super(props);

    this.cards = null;

    if (!this.props.deckCards) {
      this.props.dispatch(dealCards());
    }
  }

  getCards = () => {
    this.cards = [];

    this.props.score.tableCards.forEach((cardInfo, index) => {
      let card = null;

      if (cardInfo) {
        const { key, attrs, faceDown } = cardInfo;

        if (attrs && attrs.length === 4) {
          card = (
            <div key={index + "." + key} className="Table_grid_item">
              <Card cardKey={key} attr1={attrs[0]} attr2={attrs[1]} attr3={attrs[2]} attr4={attrs[3]} faceDown={faceDown} />
            </div>
          );
        }
        else {
          console.log("cardInfo @ index " + index + " = ");
          console.log(cardInfo);
        }
      }

      if (!card) {
        card = (
          <div key={index + ".empty"} className="Table_grid_item">
            <Card isEmpty={true} />
          </div>
        );
      }

      this.cards.push(card);
    })
  }

  render() {
    this.getCards();

    if (this.props.score.gameOver) {
      return (
        <div className="Table">
          <Overlay />
          <div className="game-over-message">Congratulations!<br/>All possible combinations have been played!</div>
          <button className='ui button primary new-game-button' onClick={() => {document.location.reload()}}>
            New Game
          </button>

        </div>
      );
    }
    // else ...

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
    score: state.score
  };
}

export default connect(mapStateToProps)(Table);
