import React, { Component } from 'react';
import { connect } from 'react-redux';
// import FlipCard from 'react-flipcard-2';

import '../App.css';
import { cardFlippedAndFollowup } from '../actions/scoreActions';
import utilities from '../utilities';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attr1: utilities.decodeAttr(0, props.attr1),
      attr2: utilities.decodeAttr(1, props.attr2),
      attr3: utilities.decodeAttr(2, props.attr3),
      attr4: utilities.decodeAttr(3, props.attr4),
      // faceDown: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    // this.setState({ faceDown: !this.state.faceDown });

    this.props.dispatch(cardFlippedAndFollowup(this.props.cardKey));
  }

  render() {
    const { attr1, attr2, attr3, attr4/*, faceDown*/ } = this.state;
    const faceDown = this.props.faceDown;
    const { /*cardKey,*/ highlight } = this.props;
    const faceDescription = `${attr1.name} ${attr2.name} ${attr3.name} ${attr4.name}`;
    const imgName = `${attr1.name}-${attr2.name}-${attr3.name}-${attr4.name}.png`;
    // <FlipCard flipped={!faceDown} disabled={true}>
    // </FlipCard>

    let alt = "card back";
    let imgSrc = "/images/cards/CardBack.png";

    if (!faceDown) {
      alt = faceDescription;
      imgSrc = `/images/cards/brave/${imgName}`;
      // imgSrc = "/images/cards/CardFaceBlank.png";
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

function mapStateToProps(state) {
  return {
    common: state.common,
    highlight: state.score.highlight
  };
}

export default connect(mapStateToProps)(Card);
