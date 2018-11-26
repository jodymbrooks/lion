import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../App.css';
import Card from './Card';
import Overlay from './Overlay';
import utilities from '../utilities';
import { setCardInfos } from '../actions/scoreActions';

class Table extends Component {

  // cardInfos = null;
  cards = null;

  constructor(props) {
    super(props);

    if (!this.props.cardInfos) {
      this.props.dispatch(setCardInfos(utilities.createCardInfos()));
    }
  }

  getCards = (count) => {
    this.cards = [];
    this.props.score.cardInfos.some((cardInfo) => {
      const { key, attrs, kept } = cardInfo;

      if (!kept) {
        const faceDown = !this.props.score.selectedCards.includes(key);

        var card = (
          <div key={key} className="Table_grid_item">
            <Card cardKey={key} attr1={attrs[0]} attr2={attrs[1]} attr3={attrs[2]} attr4={attrs[3]} faceDown={faceDown} />
          </div>
        );
        this.cards.push(card);
      }

      return this.cards.length >= count;
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
    score: state.score
  };
}

export default connect(mapStateToProps)(Table);
