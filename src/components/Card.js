import React, { Component } from 'react';
import { connect } from 'react-redux';
// import FlipCard from 'react-flipcard-2';

import '../App.css';
import { cardFlippedAndFollowUp } from '../actions/scoreActions';
import utilities from '../utilities';

class Card extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {

    this.props.dispatch(cardFlippedAndFollowUp(this.props.cardKey));
  }

  render() {
    const attr1 = utilities.decodeAttr(0, this.props.attr1);
    const attr2 = utilities.decodeAttr(1, this.props.attr2);
    const attr3 = utilities.decodeAttr(2, this.props.attr3);
    const attr4 = utilities.decodeAttr(3, this.props.attr4);

    // const { attr1, attr2, attr3, attr4 } = this.state;
    const { isEmpty, faceDown, highlight } = this.props;
    const faceDescription = `${attr1.name} ${attr2.name} ${attr3.name} ${attr4.name}`;
    const imgName = `${attr1.name}-${attr2.name}-${attr3.name}-${attr4.name}.png`;
    // <FlipCard flipped={!faceDown} disabled={true}>
    // </FlipCard>

    if (isEmpty) {
      let imgSrc = "/images/cards/CardEmpty.png";
      return (
        <div className="Card is-empty">
          <img alt="" src={imgSrc} />
        </div >
      );
    } else {
      let alt = "card back";
      let imgSrc = "/images/cards/CardBack.png";

      if (!faceDown) {
        alt = faceDescription;
        imgSrc = `/images/cards/brave/${imgName}`;
        // imgSrc = "/images/cards/C ardFaceBlank.png";
      }

      if (faceDown) {
        return (
          <div className={"Card " + highlight} data-facedown={faceDown} onClick={this.handleClick}>
            <img src={imgSrc} alt={alt} />
          </div >
        );
      }
      // else ...
      return (
        <div className={"Card " + highlight} data-facedown={faceDown} data-card-label={faceDescription} onClick={this.handleClick}>
          <img src={imgSrc} alt={alt} />
          <div className="card-label"></div>
        </div >
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    common: state.common,
    highlight: state.score.highlight
  };
}

export default connect(mapStateToProps)(Card);
