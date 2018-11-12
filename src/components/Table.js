import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../App.css';
import Card from './Card';
import Overlay from './Overlay';
import { showOverlay, hideOverlay } from '../actions/commonActions';
import utilities from '../utilities';

class Table extends Component {

  cardInfos = null;
  cards = null;

  constructor(props) {
    super(props);

    if (!this.cardInfos) {
      this.cardInfos = utilities.createCardInfos();
    }
  }

  showOverlay = () => {
    this.props.dispatch(showOverlay());
  }

  hideOverlay = () => {
    this.props.dispatch(hideOverlay());
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
    score: state.score
  };
}

export default connect(mapStateToProps)(Table);
