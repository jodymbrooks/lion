import React, { Component } from "react";
import { connect } from "react-redux";

import "../App.css";
import { cardClickedAndFollowUp } from "../actions/cardsActions";
import cardUtilities from "../cardUtilities";

class Card extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.dispatch(cardClickedAndFollowUp(this.props.cardKey));
  }

  render() {
    const attr1 = cardUtilities.decodeAttr(0, this.props.attr1);
    const attr2 = cardUtilities.decodeAttr(1, this.props.attr2);
    const attr3 = cardUtilities.decodeAttr(2, this.props.attr3);
    const attr4 = cardUtilities.decodeAttr(3, this.props.attr4);

    // const { attr1, attr2, attr3, attr4 } = this.state;
    const { index, isEmpty, selected, highlight } = this.props;

    const keyboardKey = String.fromCharCode(index + 65);

    if (isEmpty) {
      let imgSrc = "images/cards/lion/CardEmpty.png";
      return (
        <div className="Card is-empty">
          <img alt="" src={imgSrc} />
        </div>
      );
    } else {
      const faceDescription = `${attr1.name} ${attr2.name} ${attr3.name} ${attr4.name}`;
      const imgName = `${attr1.name}-${attr2.name}-${attr3.name}-${attr4.name}.png`;

      const alt = faceDescription;
      const imgSrc = `images/cards/lion/${imgName}`;

      return (
        <div
          className={"Card " + highlight}
          data-selected={selected}
          data-card-label={faceDescription}
          onClick={this.handleClick}
        >
          <span className="keyboard-key">{keyboardKey}</span>
          <img src={imgSrc} alt={alt} />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    common: state.common,
    highlight: state.cards.highlight
  };
}

export default connect(mapStateToProps)(Card);
